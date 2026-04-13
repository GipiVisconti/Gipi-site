import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Hero from '../components/Hero';
import BooksSection from '../components/BooksSection';
import AboutSection from '../components/AboutSection';
import FAQSection from '../components/FAQSection';
import ContactSection from '../components/ContactSection';

const HomePage = () => {
  const location = useLocation();
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

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://www.gipivisconti.com/');
    }
  }, [language]);

  useEffect(() => {
    if (!location.hash) return;

    const sectionId = location.hash.replace('#', '');

    const timer = setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 120);

    return () => clearTimeout(timer);
  }, [location.hash]);

  return (
    <>
      <Hero />
      <BooksSection />
      <AboutSection />
      {false && <ContactSection />}
    </>
  );
};

export default HomePage;