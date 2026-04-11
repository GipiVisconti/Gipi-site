import { useLanguage } from '../context/LanguageContext';
import { Heart, BookOpen, Instagram, Mail, Linkedin } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#2C2A29] text-white py-16" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C18C5D] flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading text-2xl font-medium">
                Gipi Visconti
              </span>
            </div>
            <p className="text-white/60 max-w-xs">
              {t.hero.subtitle}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-medium">{t.nav.books}</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#books" 
                  className="text-white/60 hover:text-[#C18C5D] transition-colors"
                >
                  {t.books.title}
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  className="text-white/60 hover:text-[#C18C5D] transition-colors"
                >
                  {t.nav.about}
                </a>
              </li>
             <li>
                <a
                  href="#faq"
                  className="text-white/60 hover:text-[#C18C5D] transition-colors"
                >
                  {t.nav.faq}
               </a>
              </li> 
             <li>
                {false && (
                <a 
                  href="#contact" 
                  className="text-white/60 hover:text-[#C18C5D] transition-colors"
                >
                  {t.nav.contact}
                </a>
                )}
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-medium">Social</h4>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/gipi_visconti?igsh=ZGJ0azFnOTUzbXJn&utm_source=qr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#C18C5D] transition-colors"
                data-testid="footer-instagram-link"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/gipi-visconti" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#C18C5D] transition-colors"
                data-testid="footer-linkedin-link"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              {false && (
              <a 
                href="#contact"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#C18C5D] transition-colors"
                data-testid="footer-email-link"
              >
                <Mail className="w-5 h-5" />
              </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/60 text-sm">
            &copy; {currentYear} Gipi Visconti. {t.footer.rights}.
          </p>
          <p className="text-white/60 text-sm flex items-center gap-1">
            {t.footer.madeWith} <Heart className="w-4 h-4 text-[#C18C5D]" /> {t.footer.forChildren}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
