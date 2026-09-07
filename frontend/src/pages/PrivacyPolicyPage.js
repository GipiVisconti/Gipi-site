import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { GIFT_PRIVACY } from '../lib/giftPrivacy';

const POLICY_LINK_HOSTS = new Set([
  'policies.google.com',
]);

const isSafePolicyLink = (href) => {
  try {
    const url = new URL(href);
    return url.protocol === 'https:' && POLICY_LINK_HOSTS.has(url.hostname);
  } catch {
    return false;
  }
};

const PrivacyPolicyPage = () => {
  const { language } = useLanguage();
  const privacy = GIFT_PRIVACY[language] || GIFT_PRIVACY.IT;

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

  }, [language]);

  return (
    <section className="pt-16 pb-20 md:pt-20 md:pb-28 bg-[#FAF9F6]">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <p className="text-xs md:text-sm uppercase tracking-[0.2em] font-bold text-[#C18C5D] mb-4">
            {privacy.eyebrow}
          </p>

          <h1 className="font-heading text-4xl sm:text-5xl tracking-tight font-medium text-[#2C2A29] mb-4">
            {privacy.title}
          </h1>

          <p className="text-sm text-[#75736E]">{privacy.lastUpdated}</p>
        </div>

        <p className="text-base md:text-lg leading-relaxed text-[#75736E] mb-10">
          {privacy.intro}
        </p>

        <aside
          className="mb-10 rounded-2xl border border-[#E8E4DB] bg-[#F2EFE9] p-6 md:p-7"
          aria-labelledby="children-privacy-heading"
        >
          <h2
            id="children-privacy-heading"
            className="mb-2 font-heading text-xl text-[#2C2A29] md:text-2xl"
          >
            {privacy.childrenNotice.heading}
          </h2>
          <p className="text-base leading-relaxed text-[#75736E]">
            {privacy.childrenNotice.body}
          </p>
        </aside>

        <div className="space-y-8">
          {privacy.sections.map((section, index) => (
            <div key={index}>
              <h2 className="font-heading text-xl md:text-2xl text-[#2C2A29] mb-2">
                {section.heading}
              </h2>
              <p className="text-base leading-relaxed text-[#75736E]">{section.body}</p>
              {section.links?.length > 0 && (
                <ul className="mt-3 space-y-2">
                  {section.links.filter(({ href }) => isSafePolicyLink(href)).map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#79522F] font-medium underline underline-offset-4 hover:text-[#604126] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1C6E8C]"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicyPage;
