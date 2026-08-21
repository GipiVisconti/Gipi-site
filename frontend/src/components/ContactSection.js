import { Link } from 'react-router-dom';
import { Gift } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { GIFT_COPY, giftPathForLanguage } from '../lib/gift';

const ContactSection = () => {
  const { language } = useLanguage();
  const copy = GIFT_COPY[language] || GIFT_COPY.IT;

  return (
    <section id="contact" className="relative overflow-hidden bg-[#FAF9F6] py-20 md:py-32" data-testid="contact-section">
      <div className="absolute left-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[#C18C5D]/5 blur-3xl" />
      <div className="absolute right-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[#8A9A86]/5 blur-3xl" />
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center md:px-12">
        <div className="rounded-3xl border border-[#E8E4DB] bg-[#F2EFE9] px-8 py-12 shadow-sm md:px-14 md:py-16">
          <Gift className="mx-auto mb-5 h-10 w-10 text-[#C18C5D]" aria-hidden="true" />
          <h2 className="mb-4 font-heading text-3xl font-medium tracking-tight text-[#2C2A29] sm:text-4xl lg:text-5xl">
            {copy.teaserTitle}
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-[#75736E] md:text-lg">
            {copy.teaserBody}
          </p>
          <Link to={giftPathForLanguage(language)} className="btn-primary inline-flex items-center justify-center" data-testid="gift-landing-link">
            {copy.teaserButton}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
