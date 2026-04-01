import { useLanguage } from '../context/LanguageContext';

const AboutSection = () => {
  const { t } = useLanguage();

  // Split bio into paragraphs
  const bioParagraphs = t.about.bio.split('\n\n');

  return (
    <section 
      id="about" 
      className="py-20 md:py-32 bg-[#FAF9F6] relative overflow-hidden"
      data-testid="about-section"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C18C5D]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8A9A86]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20 items-start">
          {/* Image Column */}
          <div className="lg:col-span-2">
            <div className="sticky top-32">
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/1767016/pexels-photo-1767016.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  alt="Gipi Visconti at work"
                  className="w-full rounded-2xl shadow-xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-[#C18C5D] text-white p-6 rounded-2xl shadow-lg">
                  <p className="font-accent text-3xl">15+</p>
                  <p className="text-sm font-medium">
                    {t.nav.books}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className="lg:col-span-3 space-y-8">
            {/* Section Header */}
            <div>
              <p className="text-xs md:text-sm uppercase tracking-[0.2em] font-bold text-[#C18C5D] mb-4">
                {t.nav.about}
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl tracking-tight font-medium text-[#2C2A29]">
                {t.about.title}
              </h2>
            </div>

            {/* Bio Content */}
            <div className="space-y-6">
              {bioParagraphs.map((paragraph, index) => (
                <p 
                  key={index}
                  className="text-base md:text-lg leading-relaxed text-[#75736E]"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Decorative quote */}
            <blockquote className="border-l-4 border-[#C18C5D] pl-6 py-4 mt-8">
              <p className="font-accent text-2xl md:text-3xl text-[#2C2A29]">
                "{t.about.quote}"
              </p>
            </blockquote>

            {/* Signature */}
            <div className="mt-10 flex justify-end">
              <img 
                src="/images/firma gipi visconti .png"
                alt="Gipi Visconti Signature"
                className="h-32 md:h-40 lg:h-48 w-auto"
                style={{ filter: 'invert(64%) sepia(30%) saturate(600%) hue-rotate(350deg) brightness(90%) contrast(90%)' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
