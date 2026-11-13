/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import {
  BookingRecord,
  EarlyAccessRecord,
  PageRoute,
} from './data/courtifyData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { BookingView } from './components/BookingView';
import { PackagesView } from './components/PackagesView';
import { AppView } from './components/AppView';

const BOOKINGS_STORAGE_KEY = 'courtify_bookings_v1';
const WAITLIST_STORAGE_KEY = 'courtify_early_access_v1';

function parseHashRoute(): PageRoute {
  const hash = window.location.hash.replace('#', '');
  if (hash === 'book' || hash === 'packages' || hash === 'app' || hash === 'home') {
    return hash;
  }
  return 'home';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>(parseHashRoute);

  const [quickFilters, setQuickFilters] = useState<{
    city?: string;
    date?: string;
    window?: string;
  }>({});

  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);

  const [bookings, setBookings] = useState<BookingRecord[]>(() => {
    try {
      const saved = localStorage.getItem(BOOKINGS_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as BookingRecord[]) : [];
    } catch {
      return [];
    }
  });

  const [earlyAccessSignups, setEarlyAccessSignups] = useState<EarlyAccessRecord[]>(() => {
    try {
      const saved = localStorage.getItem(WAITLIST_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as EarlyAccessRecord[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
  }, [bookings]);

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

  const handleQuickSearch = (city: string, date: string, windowPeriod: string) => {
    setQuickFilters({ city, date, window: windowPeriod });
    navigate('book');
  };

  const handleSelectPackageFromHome = (packageId: string) => {
    setSelectedPackageId(packageId);
    navigate('packages');
  };

  const handleCreateBooking = (
    data: Omit<BookingRecord, 'id' | 'code' | 'createdAt'>
  ): BookingRecord => {
    const record: BookingRecord = {
      ...data,
      id: `bk-${Date.now()}`,
      code: `CTY-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
    };
    setBookings((prev) => [record, ...prev]);
    return record;
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
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
    <div className="min-h-screen flex flex-col bg-[#FCFFEB] text-[#172819]">
      <Header
        currentPage={currentPage}
        onNavigate={(page) => {
          if (page !== 'packages') setSelectedPackageId(null);
          navigate(page);
        }}
        onQuickBook={() => {
          setQuickFilters({});
          navigate('book');
        }}
      />

      <main className="flex-1 pb-12">
        {currentPage === 'home' && (
          <HomeView
            onNavigate={navigate}
            onQuickSearch={handleQuickSearch}
            onSelectPackage={handleSelectPackageFromHome}
          />
        )}

        {currentPage === 'book' && (
          <BookingView
            key={`${quickFilters.city ?? 'all'}-${quickFilters.date ?? 'today'}-${quickFilters.window ?? 'all'}`}
            initialCity={quickFilters.city}
            initialDate={quickFilters.date}
            initialWindow={quickFilters.window}
            bookings={bookings}
            onCreateBooking={handleCreateBooking}
            onCancelBooking={handleCancelBooking}
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
            onJoinWaitlist={handleJoinWaitlist}
          />
        )}
      </main>

      <Footer onNavigate={navigate} />
    </div>
  );
}
