import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Menu, X, BookOpen } from 'lucide-react';

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const languages = ['IT', 'EN', 'ES'];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#FAF9F6]/80 border-b border-[#E8E4DB]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-3 group"
            data-testid="logo-button"
          >
            <div className="w-10 h-10 rounded-full bg-[#C18C5D] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading text-2xl font-medium text-[#2C2A29]">
              Gipi Visconti
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('books')}
              className="nav-link text-[#75736E] hover:text-[#2C2A29] transition-colors"
              data-testid="nav-books"
            >
              {t.nav.books}
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="nav-link text-[#75736E] hover:text-[#2C2A29] transition-colors"
              data-testid="nav-about"
            >
              {t.nav.about}
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="nav-link text-[#75736E] hover:text-[#2C2A29] transition-colors"
              data-testid="nav-contact"
            >
              {t.nav.contact}
            </button>
          </nav>

          {/* Desktop Language Switcher */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center bg-[#F2EFE9] rounded-full p-1" data-testid="language-switcher">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    language === lang
                      ? 'bg-[#C18C5D] text-white'
                      : 'text-[#75736E] hover:text-[#2C2A29]'
                  }`}
                  data-testid={`lang-switch-${lang.toLowerCase()}`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="mobile-menu-button"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-[#2C2A29]" />
            ) : (
              <Menu className="w-6 h-6 text-[#2C2A29]" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-6 border-t border-[#E8E4DB] animate-fade-in">
            <nav className="flex flex-col gap-4 mb-6">
              <button
                onClick={() => scrollToSection('books')}
                className="text-left text-[#75736E] hover:text-[#2C2A29] transition-colors py-2"
                data-testid="mobile-nav-books"
              >
                {t.nav.books}
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-left text-[#75736E] hover:text-[#2C2A29] transition-colors py-2"
                data-testid="mobile-nav-about"
              >
                {t.nav.about}
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-left text-[#75736E] hover:text-[#2C2A29] transition-colors py-2"
                data-testid="mobile-nav-contact"
              >
                {t.nav.contact}
              </button>
            </nav>

            {/* Mobile Language Switcher */}
            <div className="flex items-center gap-2 mb-4">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setLanguage(lang);
                    requestAnimationFrame(() => {
                      setMobileMenuOpen(false);
                    });
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    language === lang
                      ? 'bg-[#C18C5D] text-white'
                      : 'bg-[#F2EFE9] text-[#75736E]'
                  }`}
                  data-testid={`mobile-lang-switch-${lang.toLowerCase()}`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;