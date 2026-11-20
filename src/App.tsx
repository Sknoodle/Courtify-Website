/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { PageRoute } from './data/courtifyData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { AboutView } from './components/AboutView';
import { PackagesView } from './components/PackagesView';
import { FaqView } from './components/FaqView';
import { AppView } from './components/AppView';

function parseHashRoute(): PageRoute {
  const hash = window.location.hash.replace('#', '');
  if (hash === 'frq') {
    return 'faq';
  }
  if (
    hash === 'about' ||
    hash === 'packages' ||
    hash === 'faq' ||
    hash === 'app' ||
    hash === 'home'
  ) {
    return hash;
  }
  return 'home';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>(parseHashRoute);
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);
  const [packageSearchQuery, setPackageSearchQuery] = useState<string>('');

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

  const handleSearchPackagesFromHome = (query: string) => {
    setSelectedPackageId(null);
    setPackageSearchQuery(query);
    navigate('packages');
  };

  const handleSelectPackageFromHome = (packageId: string) => {
    setPackageSearchQuery('');
    setSelectedPackageId(packageId);
    navigate('packages');
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
            if (page !== 'packages') {
              setSelectedPackageId(null);
              setPackageSearchQuery('');
            }
            navigate(page);
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
                  onSearchPackages={handleSearchPackagesFromHome}
                  onSelectPackage={handleSelectPackageFromHome}
                />
              )}

              {currentPage === 'about' && <AboutView onNavigate={navigate} />}

              {currentPage === 'packages' && (
                <PackagesView
                  key={`${selectedPackageId ?? 'catalog'}-${packageSearchQuery}`}
                  initialSelectedPackageId={selectedPackageId}
                  initialSearchQuery={packageSearchQuery}
                />
              )}

              {currentPage === 'faq' && <FaqView onNavigate={navigate} />}

              {currentPage === 'app' && <AppView />}
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer onNavigate={navigate} />
      </motion.div>
    </MotionConfig>
  );
}
