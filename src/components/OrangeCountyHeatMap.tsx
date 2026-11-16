import { useMemo, useState } from 'react';
import * as d3 from 'd3';
import { ExternalLink, MapPin } from 'lucide-react';
import {
  COURTIFY_APP_URL,
  LiveCourtLocation,
  OC_BOUNDARY_GEOJSON,
  OC_CITY_HUBS,
} from '../data/courtifyData';

interface OrangeCountyHeatMapProps {
  courts: LiveCourtLocation[];
  selectedCity: string;
  onSelectCity: (city: string) => void;
}

type HeatMetric = 'total' | 'open';

interface ProjectedPoint {
  court: LiveCourtLocation;
  x: number;
  y: number;
  weight: number;
}

const MAP_WIDTH = 760;
const MAP_HEIGHT = 440;

const HEAT_INTERPOLATOR = d3.interpolateRgbBasis([
  '#F5FBE4',
  '#A1CEA7',
  '#77AD78',
  '#627F65',
  '#172E1B',
]);

export function OrangeCountyHeatMap({
  courts,
  selectedCity,
  onSelectCity,
}: OrangeCountyHeatMapProps) {
  const [metric, setMetric] = useState<HeatMetric>('total');
  const [hoveredCourtId, setHoveredCourtId] = useState<string | null>(null);

  const {
    countyPath,
    coastGridLines,
    contours,
    colorScale,
    projectedCourts,
    projectedCityHubs,
    citySummaries,
  } = useMemo(() => {
    const projection = d3
      .geoMercator()
      .fitExtent(
        [
          [34, 24],
          [MAP_WIDTH - 34, MAP_HEIGHT - 24],
        ],
        OC_BOUNDARY_GEOJSON as d3.GeoPermissibleObjects
      );

    const pathGenerator = d3.geoPath(projection);
    const countyPathStr =
      pathGenerator(OC_BOUNDARY_GEOJSON as d3.GeoPermissibleObjects) ?? '';

    // Subtle geographic graticule lines for architectural map orientation
    const graticule = d3
      .geoGraticule()
      .step([0.1, 0.1])
      .extent([
        [-118.25, 33.35],
        [-117.35, 34.0],
      ]);
    const gridStr = pathGenerator(graticule()) ?? '';

    const pts: ProjectedPoint[] = courts
      .map((court) => {
        const projected = projection(court.coords);
        if (!projected) return null;
        const weight = metric === 'total' ? court.totalCourts : court.openCourts;
        return {
          court,
          x: projected[0],
          y: projected[1],
          weight,
        };
      })
      .filter((p): p is ProjectedPoint => p !== null);

    // Weighted density sample points for smooth D3 contour heatmap
    const weightedSamples: [number, number][] = [];
    for (const pt of pts) {
      const copies = Math.max(metric === 'total' ? 1 : 0, Math.round(pt.weight));
      for (let i = 0; i < copies; i++) {
        weightedSamples.push([pt.x, pt.y]);
      }
    }

    const densityContours =
      weightedSamples.length > 0
        ? d3
            .contourDensity<[number, number]>()
            .x((d) => d[0])
            .y((d) => d[1])
            .size([MAP_WIDTH, MAP_HEIGHT])
            .bandwidth(34)
            .thresholds(14)(weightedSamples)
        : [];

    const maxDensity = d3.max(densityContours, (d) => d.value) ?? 1;
    const scale = d3.scaleSequential(HEAT_INTERPOLATOR).domain([0, maxDensity || 1]);

    const hubs = OC_CITY_HUBS.map((hub) => {
      const projected = projection(hub.coords) ?? [0, 0];
      return {
        ...hub,
        x: projected[0],
        y: projected[1],
      };
    });

    const summaryMap = new Map<
      string,
      { city: string; totalCourts: number; openCourts: number; venues: number }
    >();
    for (const c of courts) {
      const existing = summaryMap.get(c.city) ?? {
        city: c.city,
        totalCourts: 0,
        openCourts: 0,
        venues: 0,
      };
      existing.totalCourts += c.totalCourts;
      existing.openCourts += c.openCourts;
      existing.venues += 1;
      summaryMap.set(c.city, existing);
    }

    const summaries = Array.from(summaryMap.values()).sort(
      (a, b) => b.totalCourts - a.totalCourts
    );

    return {
      countyPath: countyPathStr,
      coastGridLines: gridStr,
      contours: densityContours,
      colorScale: scale,
      projectedCourts: pts,
      projectedCityHubs: hubs,
      citySummaries: summaries,
    };
  }, [courts, metric]);

  const contourPath = useMemo(() => d3.geoPath(), []);

  const hoveredPoint = useMemo(
    () => projectedCourts.find((p) => p.court.id === hoveredCourtId) ?? null,
    [projectedCourts, hoveredCourtId]
  );

  const handleCityToggle = (city: string) => {
    if (selectedCity === city) {
      onSelectCity('All OC');
    } else {
      onSelectCity(city);
    }
  };

  return (
    <section
      aria-label="Orange County Court Density Heat Map"
      className="bg-white border border-[#A1CEA7]/75 rounded-2xl overflow-hidden shadow-xs"
    >
      {/* Top Bar */}
      <div className="px-5 sm:px-6 py-4 border-b border-[#A1CEA7]/50 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#FCFFEB]/60">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#627F65]">
            <MapPin className="w-3.5 h-3.5 text-[#627F65]" />
            <span>Courtify App Map Location System · Orange County, CA</span>
          </div>
          <h2 className="font-display text-lg sm:text-xl font-bold text-[#172E1B]">
            Court Density Heat Map by City
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Metric Toggle */}
          <div
            role="group"
            aria-label="Heat map density weighting"
            className="inline-flex items-center p-1 bg-[#A1CEA7]/25 rounded-lg"
          >
            <button
              type="button"
              onClick={() => setMetric('total')}
              aria-pressed={metric === 'total'}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                metric === 'total'
                  ? 'bg-white text-[#172E1B] shadow-xs'
                  : 'text-[#172819]/75 hover:text-[#172E1B]'
              }`}
            >
              Total Courts
            </button>
            <button
              type="button"
              onClick={() => setMetric('open')}
              aria-pressed={metric === 'open'}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                metric === 'open'
                  ? 'bg-white text-[#172E1B] shadow-xs'
                  : 'text-[#172819]/75 hover:text-[#172E1B]'
              }`}
            >
              Live Open Now
            </button>
          </div>

          <a
            href={COURTIFY_APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#FCFFEB] bg-[#172E1B] hover:bg-[#627F65] rounded-lg transition-colors whitespace-nowrap"
          >
            <span>Open Map in App</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Map + City Density Breakdown Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* D3 SVG Heat Map (8 cols) */}
        <div className="lg:col-span-8 relative bg-[#EDF5E4] border-b lg:border-b-0 lg:border-r border-[#A1CEA7]/50">
          <svg
            viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
            role="img"
            aria-label="D3 heat map of pickleball court density across Orange County cities"
            className="w-full h-auto block select-none"
          >
            <defs>
              <clipPath id="oc-county-clip">
                <path d={countyPath} />
              </clipPath>
            </defs>

            {/* Geographic coordinate grid */}
            <path
              d={coastGridLines}
              fill="none"
              stroke="#627F65"
              strokeOpacity={0.14}
              strokeWidth={0.8}
            />

            {/* Pacific Ocean label */}
            <text
              x={92}
              y={334}
              fill="#627F65"
              fillOpacity={0.55}
              fontSize={11}
              fontWeight={600}
              letterSpacing="0.14em"
            >
              PACIFIC OCEAN
            </text>

            {/* Orange County base polygon */}
            <path
              d={countyPath}
              fill="#FCFFEB"
              stroke="#627F65"
              strokeOpacity={0.45}
              strokeWidth={1.5}
            />

            {/* D3 Contour Density Heat Layer clipped to Orange County */}
            <g clipPath="url(#oc-county-clip)">
              {contours.map((contour, index) => (
                <path
                  key={`${contour.value}-${index}`}
                  d={contourPath(contour) ?? ''}
                  fill={colorScale(contour.value)}
                  fillOpacity={0.72}
                  stroke="#627F65"
                  strokeOpacity={0.12}
                  strokeWidth={0.5}
                />
              ))}
            </g>

            {/* County outline crisp border above contours */}
            <path
              d={countyPath}
              fill="none"
              stroke="#172E1B"
              strokeOpacity={0.38}
              strokeWidth={1.25}
            />

            {/* City Hub Labels */}
            <g>
              {projectedCityHubs.map((hub) => {
                const isSelected = selectedCity === hub.city;
                return (
                  <g
                    key={hub.city}
                    transform={`translate(${hub.x + hub.labelOffset[0]}, ${hub.y + hub.labelOffset[1]})`}
                    onClick={() => handleCityToggle(hub.city)}
                    className="cursor-pointer"
                  >
                    <rect
                      x={-54}
                      y={-10}
                      width={108}
                      height={19}
                      rx={4}
                      fill={isSelected ? '#172E1B' : '#FCFFEB'}
                      fillOpacity={isSelected ? 0.96 : 0.9}
                      stroke={isSelected ? '#172E1B' : '#627F65'}
                      strokeOpacity={isSelected ? 1 : 0.45}
                      strokeWidth={1}
                    />
                    <text
                      textAnchor="middle"
                      y={3}
                      fontSize={10}
                      fontWeight={700}
                      fill={isSelected ? '#FCFFEB' : '#172E1B'}
                    >
                      {hub.city}
                    </text>
                  </g>
                );
              })}
            </g>

            {/* Individual OC Facility Markers */}
            <g>
              {projectedCourts.map(({ court, x, y, weight }) => {
                const isCityActive = selectedCity === 'All OC' || court.city === selectedCity;
                const isHovered = hoveredCourtId === court.id;
                const radius = Math.max(5, Math.min(12, 4 + Math.sqrt(weight) * 1.45));
                const isClosed = court.availability === 'Closed';

                return (
                  <g
                    key={court.id}
                    transform={`translate(${x}, ${y})`}
                    onMouseEnter={() => setHoveredCourtId(court.id)}
                    onMouseLeave={() => setHoveredCourtId(null)}
                    onClick={() => handleCityToggle(court.city)}
                    className="cursor-pointer"
                  >
                    {/* Invisible larger hit target for reliable pointer hover */}
                    <circle r={16} fill="transparent" />
                    <circle
                      r={isHovered ? radius + 2.5 : radius}
                      fill={isClosed ? '#627F65' : '#FCFFAD'}
                      fillOpacity={isCityActive ? 0.95 : 0.4}
                      stroke="#172E1B"
                      strokeOpacity={isCityActive ? 0.95 : 0.35}
                      strokeWidth={isHovered ? 2.2 : 1.5}
                    />
                    <text
                      textAnchor="middle"
                      y={3.5}
                      fontSize={9}
                      fontWeight={700}
                      fill="#172E1B"
                      fillOpacity={isCityActive ? 1 : 0.5}
                      className="pointer-events-none font-mono"
                    >
                      {metric === 'total' ? court.totalCourts : court.openCourts}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>

          {/* Interactive Hover Readout Card */}
          {hoveredPoint ? (
            <div className="pointer-events-none absolute left-4 bottom-4 right-4 sm:right-auto sm:max-w-xs bg-[#172E1B]/95 text-[#FCFFEB] border border-[#A1CEA7]/50 rounded-xl px-4 py-3 shadow-md space-y-1">
              <div className="flex items-center justify-between gap-3 text-[11px] text-[#FCFFAD] font-semibold">
                <span>{hoveredPoint.court.city}, CA</span>
                <span className="font-mono tabular-nums">
                  {hoveredPoint.court.openCourts} / {hoveredPoint.court.totalCourts} open
                </span>
              </div>
              <p className="font-display text-sm font-bold leading-snug">
                {hoveredPoint.court.name}
              </p>
              <p className="text-[11px] text-[#FCFFEB]/80">
                {hoveredPoint.court.lighting} · Click marker to filter {hoveredPoint.court.city}
              </p>
            </div>
          ) : (
            <div className="pointer-events-none absolute left-4 bottom-4 bg-[#FCFFEB]/90 backdrop-blur-xs border border-[#A1CEA7]/70 rounded-lg px-3 py-1.5 text-[11px] font-medium text-[#172E1B]">
              Hover any court node for live counts · Click a city to filter list below
            </div>
          )}
        </div>

        {/* Right Panel: Density Legend + City Breakdown (4 cols) */}
        <div className="lg:col-span-4 p-5 sm:p-6 flex flex-col justify-between gap-6 bg-white">
          <div className="space-y-4">
            {/* Density Scale Legend */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-[#172E1B]">
                <span>
                  {metric === 'total' ? 'Court Capacity Density' : 'Live Open Court Density'}
                </span>
                <span className="font-mono text-[11px] text-[#627F65] tabular-nums">
                  OC Geo Contour
                </span>
              </div>
              <div
                aria-hidden="true"
                className="h-2.5 w-full rounded-full border border-[#A1CEA7]/60"
                style={{
                  background:
                    'linear-gradient(90deg, #F5FBE4 0%, #A1CEA7 25%, #77AD78 50%, #627F65 75%, #172E1B 100%)',
                }}
              />
              <div className="flex items-center justify-between text-[11px] text-[#627F65] font-medium">
                <span>Lower Concentration</span>
                <span>Peak Hub</span>
              </div>
            </div>

            {/* City-by-City Court Density List */}
            <div className="pt-3 border-t border-[#A1CEA7]/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#627F65]">
                  Cities Ranked by Total Courts
                </span>
                {selectedCity !== 'All OC' && (
                  <button
                    type="button"
                    onClick={() => onSelectCity('All OC')}
                    className="text-[11px] font-semibold text-[#172E1B] hover:text-[#627F65] underline underline-offset-2 cursor-pointer"
                  >
                    Show All OC
                  </button>
                )}
              </div>

              <div className="space-y-2">
                {citySummaries.map((item) => {
                  const isActive = selectedCity === item.city;
                  const sharePct = Math.round((item.totalCourts / 91) * 100);
                  const openPct =
                    item.totalCourts > 0
                      ? Math.round((item.openCourts / item.totalCourts) * 100)
                      : 0;

                  return (
                    <button
                      key={item.city}
                      type="button"
                      onClick={() => handleCityToggle(item.city)}
                      className={`w-full text-left p-2.5 rounded-lg border transition-colors cursor-pointer space-y-1.5 ${
                        isActive
                          ? 'border-[#172E1B] bg-[#FCFFEB]'
                          : 'border-[#A1CEA7]/50 hover:border-[#627F65] bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 text-xs">
                        <span className="font-semibold text-[#172E1B]">{item.city}</span>
                        <span className="font-mono text-[#172E1B] font-semibold tabular-nums">
                          {item.openCourts}/{item.totalCourts} open
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-[#A1CEA7]/25 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#627F65] rounded-full transition-all duration-300"
                          style={{
                            width: `${metric === 'total' ? sharePct : openPct}%`,
                          }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-[#627F65]">
                        <span>
                          {item.venues} {item.venues === 1 ? 'park' : 'parks'}
                        </span>
                        <span className="font-mono tabular-nums">
                          {metric === 'total'
                            ? `${sharePct}% of OC courts`
                            : `${openPct}% currently open`}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <p className="text-[11px] text-[#627F65] leading-relaxed border-t border-[#A1CEA7]/40 pt-3">
            Circle numbers show {metric === 'total' ? 'total courts' : 'open courts right now'} at
            each Courtify-tracked OC park location.
          </p>
        </div>
      </div>
    </section>
  );
}
