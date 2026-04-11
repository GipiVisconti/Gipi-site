import { useLanguage } from '../context/LanguageContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

const FAQSection = () => {
  const { t } = useLanguage();

  return (
    <section
      id="faq"
      className="py-20 md:py-32 bg-[#F2EFE9] relative overflow-hidden scroll-mt-28"
      data-testid="faq-section"
    >
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#C18C5D]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#8A9A86]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <p className="text-xs md:text-sm uppercase tracking-[0.2em] font-bold text-[#C18C5D] mb-4">
              {t.faq.eyebrow}
            </p>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl tracking-tight font-medium text-[#2C2A29] mb-4">
              {t.faq.title}
            </h2>

            <p className="text-base md:text-lg leading-relaxed text-[#75736E] mb-6">
              {t.faq.subtitle}
            </p>

            <div className="flex flex-wrap gap-3">
              {t.faq.highlights.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-white border border-[#E8E4DB] px-4 py-2 text-sm text-[#2C2A29]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="rounded-[28px] border border-[#E8E4DB] bg-[#FAF9F6] p-3 md:p-4 shadow-sm">
              <Accordion type="single" collapsible className="w-full">
                {t.faq.items.map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="mb-3 rounded-2xl border border-[#E8E4DB] bg-white px-5 md:px-6 data-[state=open]:shadow-sm"
                  >
                    <AccordionTrigger className="py-5 font-heading text-xl md:text-2xl text-[#2C2A29] hover:no-underline">
                      {item.q}
                    </AccordionTrigger>

                    <AccordionContent className="pb-5 text-base leading-relaxed text-[#75736E]">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;