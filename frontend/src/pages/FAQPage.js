import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import FAQSection from '../components/FAQSection';

const FAQPage = () => {
  const { language, t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);

    document.title =
      language === 'IT'
        ? 'FAQ | Gipi Visconti'
        : language === 'EN'
        ? 'FAQ | Gipi Visconti'
        : 'Preguntas frecuentes | Gipi Visconti';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        language === 'IT'
          ? 'Domande frequenti sui libri di Gipi Visconti per bambini che iniziano a leggere.'
          : language === 'EN'
          ? 'Frequently asked questions about Gipi Visconti books for children learning to read.'
          : 'Preguntas frecuentes sobre los libros de Gipi Visconti para niños que empiezan a leer.'
      );
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://www.gipivisconti.com/faq');
    }
  }, [language]);

  return (
    <>
      <section className="pt-16 pb-8 md:pt-20 md:pb-10 bg-[#FAF9F6]">
        <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
          <p className="text-xs md:text-sm uppercase tracking-[0.2em] font-bold text-[#C18C5D] mb-4">
            {t.faq.eyebrow}
          </p>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl tracking-tight font-medium text-[#2C2A29] mb-4">
            {t.faq.title}
          </h1>

          <p className="text-base md:text-lg leading-relaxed text-[#75736E] max-w-3xl mx-auto">
            {t.faq.subtitle}
          </p>
        </div>
      </section>

      <FAQSection />
    </>
  );
};

export default FAQPage;