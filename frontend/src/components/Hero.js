import { useLanguage } from '../context/LanguageContext';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const { t, language } = useLanguage();

  const scrollToBooks = () => {
    const element = document.getElementById('books');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
   key={language}
   id="hero" 
   className="min-h-[90vh] relative overflow-hidden bg-white"
   data-testid="hero-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[70vh]">
          {/* Left Content */}
          <div className="order-2 lg:order-1 space-y-8">
            <div className="space-y-6">
              <p className="font-accent text-2xl md:text-3xl text-[#C18C5D] animate-fade-in-up">
                {t.hero.greeting}
              </p>
              <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl tracking-tighter leading-tight font-medium text-[#2C2A29] animate-fade-in-up animation-delay-100">
                Gipi Visconti
              </h1>
              <p className="text-xs md:text-sm uppercase tracking-[0.2em] font-bold text-[#C18C5D] animate-fade-in-up animation-delay-200">
                {t.hero.role}
              </p>
              <p className="text-lg md:text-xl leading-relaxed text-[#75736E] max-w-lg animate-fade-in-up animation-delay-300">
                {t.hero.subtitle}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 animate-fade-in-up animation-delay-400">
              <button 
                onClick={scrollToBooks}
                className="btn-primary flex items-center gap-2"
                data-testid="hero-cta-books"
              >
                {t.hero.cta}
                <ArrowDown className="w-4 h-4" />
              </button>
              <button 
                onClick={scrollToAbout}
                className="btn-secondary"
                data-testid="hero-cta-about"
              >
                {t.hero.ctaSecondary}
              </button>
            </div>
          </div>

          {/* Right Content - Illustration */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end animate-fade-in animation-delay-200">
            <div className="relative">
              {/* Reading Illustration */}
              <img 
                src="/images/madre con bambino che legge.png"
                alt="Reading together"
                className="w-[500px] h-[500px] md:w-[800px] md:h-[800px] object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-[#C18C5D]" />
      </div>
    </section>
  );
};

export default Hero;
