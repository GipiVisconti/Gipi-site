import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const PrivacyPolicyPage = () => {
  const { language, t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.title =
      language === 'IT'
        ? 'Privacy Policy | Gipi Visconti'
        : language === 'EN'
        ? 'Privacy Policy | Gipi Visconti'
        : 'Política de Privacidad | Gipi Visconti';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        language === 'IT'
          ? 'Informativa sulla privacy del sito di Gipi Visconti: dati raccolti, finalità del trattamento e diritti degli utenti.'
          : language === 'EN'
          ? 'Privacy Policy for the Gipi Visconti website: data collected, purposes of processing and user rights.'
          : 'Política de Privacidad del sitio web de Gipi Visconti: datos recogidos, finalidades del tratamiento y derechos de los usuarios.'
      );
    }

    const langSlug = language === 'IT' ? 'it' : language === 'EN' ? 'en' : 'es';
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', `https://www.gipivisconti.com/${langSlug}/privacy-policy`);
    }
  }, [language]);

  return (
    <section className="pt-16 pb-20 md:pt-20 md:pb-28 bg-[#FAF9F6]">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <p className="text-xs md:text-sm uppercase tracking-[0.2em] font-bold text-[#C18C5D] mb-4">
            {t.privacy.eyebrow}
          </p>

          <h1 className="font-heading text-4xl sm:text-5xl tracking-tight font-medium text-[#2C2A29] mb-4">
            {t.privacy.title}
          </h1>

          <p className="text-sm text-[#75736E]">{t.privacy.lastUpdated}</p>
        </div>

        <p className="text-base md:text-lg leading-relaxed text-[#75736E] mb-10">
          {t.privacy.intro}
        </p>

        <div className="space-y-8">
          {t.privacy.sections.map((section, index) => (
            <div key={index}>
              <h2 className="font-heading text-xl md:text-2xl text-[#2C2A29] mb-2">
                {section.heading}
              </h2>
              <p className="text-base leading-relaxed text-[#75736E]">{section.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicyPage;
