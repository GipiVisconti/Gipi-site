import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import BooksSection from '../components/BooksSection';
import AboutSection from '../components/AboutSection';
import FAQSection from '../components/FAQSection';
import ContactSection from '../components/ContactSection';

const HomePage = () => {
  const location = useLocation();

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
      <FAQSection />
      {false && <ContactSection />}
    </>
  );
};

export default HomePage;