import { useEffect, useLayoutEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Hero from '../components/Hero';
import BooksSection from '../components/BooksSection';
import AboutSection from '../components/AboutSection';
import FAQSection from '../components/FAQSection';
import ContactSection from '../components/ContactSection';

const HOME_PATH_PATTERN = /^\/(it|en|es)\/?$/;
const HOME_SECTIONS = new Set(['books', 'about']);
const homeScrollPositions = new Map();
let resetInitialHomeDocument =
  typeof window !== 'undefined' && HOME_PATH_PATTERN.test(window.location.pathname);
const initialScrollRestoration =
  typeof window !== 'undefined' && 'scrollRestoration' in window.history
    ? window.history.scrollRestoration
    : null;

if (resetInitialHomeDocument && initialScrollRestoration) {
  window.history.scrollRestoration = 'manual';
}

const HomePage = () => {
  const location = useLocation();
  const navigationType = useNavigationType();
  const { language } = useLanguage();

  useEffect(() => {
    document.title =
      language === 'IT'
        ? 'Libri per bambini che iniziano a leggere | Gipi Visconti'
        : language === 'EN'
        ? 'Books for children learning to read | Gipi Visconti'
        : 'Libros para niños que empiezan a leer | Gipi Visconti';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        language === 'IT'
          ? 'Libri illustrati per bambini che iniziano a leggere, in italiano, inglese e spagnolo.'
          : language === 'EN'
          ? 'Illustrated books for children learning to read, available in Italian, English and Spanish.'
          : 'Libros ilustrados para niños que empiezan a leer, disponibles en italiano, inglés y español.'
      );
    }

  }, [language]);

  useEffect(() => {
    const isInitialHomeDocument = resetInitialHomeDocument;
    resetInitialHomeDocument = false;

    const requestedSection = location.state?.scrollTo;
    const sectionId = HOME_SECTIONS.has(requestedSection)
      ? requestedSection
      : null;

    const clearScrollInstruction = () => {
      const currentHistoryState = window.history.state;
      const currentUserState = currentHistoryState?.usr || location.state || {};
      const nextState = { ...currentUserState };
      delete nextState.scrollTo;

      window.history.replaceState(
        currentHistoryState && Object.prototype.hasOwnProperty.call(currentHistoryState, 'usr')
          ? {
              ...currentHistoryState,
              usr: Object.keys(nextState).length > 0 ? nextState : null,
            }
          : (Object.keys(nextState).length > 0 ? nextState : null),
        ''
      );
    };

    if (requestedSection) {
      const targetSection = sectionId || 'hero';
      const homePath = location.pathname;
      clearScrollInstruction();

      const timer = window.setTimeout(() => {
        if (window.location.pathname !== homePath) return;

        const element = document.getElementById(targetSection);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        }
      }, 100);

      return () => window.clearTimeout(timer);
    }

    if (navigationType !== 'POP' || isInitialHomeDocument) {
      const homePath = location.pathname;
      const scrollToTop = () => {
        if (window.location.pathname === homePath) {
          window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        }
      };

      scrollToTop();
      window.addEventListener('load', scrollToTop, { once: true });
      window.requestAnimationFrame(() => {
        scrollToTop();
        const topResetInterval = isInitialHomeDocument
          ? window.setInterval(scrollToTop, 50)
          : null;
        const interactionEvents = ['keydown', 'pointerdown', 'touchstart', 'wheel'];
        let topResetCancelled = false;
        const restoreAutomaticScrolling = () => {
          if (isInitialHomeDocument && initialScrollRestoration) {
            window.history.scrollRestoration = initialScrollRestoration;
          }
        };
        const cancelTopReset = () => {
          topResetCancelled = true;
          if (topResetInterval) {
            window.clearInterval(topResetInterval);
          }
          interactionEvents.forEach((eventName) => {
            window.removeEventListener(eventName, cancelTopReset);
          });
          window.removeEventListener('load', scrollToTop);
          restoreAutomaticScrolling();
        };

        if (isInitialHomeDocument) {
          interactionEvents.forEach((eventName) => {
            window.addEventListener(eventName, cancelTopReset, {
              once: true,
              passive: true,
            });
          });
        }

        window.setTimeout(() => {
          if (topResetCancelled) return;
          if (topResetInterval) {
            window.clearInterval(topResetInterval);
          }
          interactionEvents.forEach((eventName) => {
            window.removeEventListener(eventName, cancelTopReset);
          });
          scrollToTop();
          window.removeEventListener('load', scrollToTop);
          restoreAutomaticScrolling();
        }, isInitialHomeDocument ? 1500 : 250);
      });
      return;
    }

    const savedPosition = typeof location.state?.homeScrollY === 'number'
      ? location.state.homeScrollY
      : homeScrollPositions.get(location.key);
    if (typeof savedPosition === 'number') {
      const homePath = location.pathname;
      const restoreSavedPosition = () => {
        if (window.location.pathname === homePath) {
          window.scrollTo({ top: savedPosition, left: 0, behavior: 'auto' });
        }
      };

      window.requestAnimationFrame(() => {
        restoreSavedPosition();
        window.setTimeout(restoreSavedPosition, 250);
      });
    }
  }, [
    location.hash,
    location.key,
    location.pathname,
    location.search,
    location.state,
    navigationType,
  ]);

  useLayoutEffect(() => {
    const historyKey = location.key;
    const saveScrollPosition = () => {
      const scrollY = window.scrollY;
      homeScrollPositions.set(historyKey, scrollY);

      const currentHistoryState = window.history.state;
      if (currentHistoryState?.key !== historyKey) return;

      window.history.replaceState(
        {
          ...currentHistoryState,
          usr: {
            ...(currentHistoryState.usr || {}),
            homeScrollY: scrollY,
          },
        },
        ''
      );
    };

    window.addEventListener('scroll', saveScrollPosition, { passive: true });

    return () => {
      window.removeEventListener('scroll', saveScrollPosition);
    };
  }, [location.key]);

  return (
    <>
      <Hero />
      <BooksSection />
      <AboutSection />
      <ContactSection />
    </>
  );
};

export default HomePage;
