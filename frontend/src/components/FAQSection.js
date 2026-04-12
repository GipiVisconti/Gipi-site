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

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
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
    </section>
  );
};

export default FAQSection;