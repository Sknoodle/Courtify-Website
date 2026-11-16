/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import {
  EarlyAccessRecord,
  PageRoute,
  computeLiveCourts,
  getOrangeCountyTimeInfo,
} from './data/courtifyData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { CourtFinderView } from './components/CourtFinderView';
import { PackagesView } from './components/PackagesView';
import { AppView } from './components/AppView';

const WAITLIST_STORAGE_KEY = 'courtify_early_access_v1';

function parseHashRoute(): PageRoute {
  const hash = window.location.hash.replace('#', '');
  if (hash === 'finder' || hash === 'packages' || hash === 'app' || hash === 'home') {
    return hash;
  }
  return 'home';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>(parseHashRoute);

  const [finderFilters, setFinderFilters] = useState<{
    city?: string;
    filter?: 'All' | 'Open Now';
  }>({});

  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);

  // Live synced clock + court occupancy adjustments shared between Find Courts & App preview
  const [syncTimestamp, setSyncTimestamp] = useState<Date>(() => new Date());
  const [courtAdjustments, setCourtAdjustments] = useState<Record<string, number>>({});

  useEffect(() => {
    const interval = window.setInterval(() => {
      setSyncTimestamp(new Date());
    }, 15000);
    return () => window.clearInterval(interval);
  }, []);

  const liveCourts = useMemo(
    () => computeLiveCourts(syncTimestamp, courtAdjustments),
    [syncTimestamp, courtAdjustments]
  );

  const lastSyncedLabel = useMemo(
    () => `${getOrangeCountyTimeInfo(syncTimestamp).formattedTime} PT`,
    [syncTimestamp]
  );

  const [earlyAccessSignups, setEarlyAccessSignups] = useState<EarlyAccessRecord[]>(() => {
    try {
      const saved = localStorage.getItem(WAITLIST_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as EarlyAccessRecord[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(WAITLIST_STORAGE_KEY, JSON.stringify(earlyAccessSignups));
  }, [earlyAccessSignups]);

  useEffect(() => {
    const onHashChange = () => {
      setCurrentPage(parseHashRoute());
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = (page: PageRoute) => {
    setCurrentPage(page);
    if (window.location.hash !== `#${page}`) {
      window.location.hash = page;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickLocate = (city: string, availabilityFilter: 'All' | 'Open Now') => {
    setFinderFilters({ city, filter: availabilityFilter });
    navigate('finder');
  };

  const handleSelectPackageFromHome = (packageId: string) => {
    setSelectedPackageId(packageId);
    navigate('packages');
  };

  const handleReportCheckIn = (courtId: string, delta: number) => {
    setCourtAdjustments((prev) => ({
      ...prev,
      [courtId]: (prev[courtId] ?? 0) + delta,
    }));
    setSyncTimestamp(new Date());
  };

  const handleJoinWaitlist = (
    data: Omit<EarlyAccessRecord, 'id' | 'inviteCode' | 'createdAt'>
  ): EarlyAccessRecord => {
    const record: EarlyAccessRecord = {
      ...data,
      id: `ea-${Date.now()}`,
      inviteCode: `EA-${Math.floor(10000 + Math.random() * 90000)}`,
      createdAt: new Date().toISOString(),
    };
    setEarlyAccessSignups((prev) => [record, ...prev]);
    return record;
  };

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="min-h-screen flex flex-col bg-[#FCFFEB] text-[#172819]"
      >
        <Header
          currentPage={currentPage}
          onNavigate={(page) => {
            if (page !== 'packages') setSelectedPackageId(null);
            navigate(page);
          }}
          onFindCourts={() => {
            setFinderFilters({ city: 'All OC', filter: 'All' });
            navigate('finder');
          }}
        />

        <main className="flex-1 pb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            >
              {currentPage === 'home' && (
                <HomeView
                  onNavigate={navigate}
                  onQuickLocate={handleQuickLocate}
                  onSelectPackage={handleSelectPackageFromHome}
                />
              )}

              {currentPage === 'finder' && (
                <CourtFinderView
                  key={`${finderFilters.city ?? 'all'}-${finderFilters.filter ?? 'all'}`}
                  initialCity={finderFilters.city}
                  initialFilter={finderFilters.filter}
                  courts={liveCourts}
                  lastSyncedLabel={lastSyncedLabel}
                  onSyncNow={() => setSyncTimestamp(new Date())}
                  onReportCheckIn={handleReportCheckIn}
                  onNavigate={navigate}
                />
              )}

              {currentPage === 'packages' && (
                <PackagesView
                  key={selectedPackageId ?? 'catalog'}
                  initialSelectedPackageId={selectedPackageId}
                />
              )}

              {currentPage === 'app' && (
                <AppView
                  signups={earlyAccessSignups}
                  liveCourts={liveCourts}
                  onJoinWaitlist={handleJoinWaitlist}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer onNavigate={navigate} />
      </motion.div>
    </MotionConfig>
  );
}
