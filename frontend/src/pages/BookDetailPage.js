import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getBookBySlug } from '../data/books';

const routeConfig = {
  it: { section: 'libri', langCode: 'IT' },
  en: { section: 'books', langCode: 'EN' },
  es: { section: 'libros', langCode: 'ES' },
};

const BookDetailPage = () => {
  const { lang, section, slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const [currentPage, setCurrentPage] = useState(0);

  const routeInfo = routeConfig[lang];
  const book = getBookBySlug(slug);

  const isValidRoute =
    !!routeInfo &&
    routeInfo.section === section &&
    !!book;

  const uiText = {
    IT: {
      noImage: 'Nessuna immagine disponibile',
      prev: 'Pagina precedente',
      next: 'Pagina successiva',
      goToPage: 'Vai alla pagina',
      page: 'pagina',
    },
    EN: {
      noImage: 'No image available',
      prev: 'Previous page',
      next: 'Next page',
      goToPage: 'Go to page',
      page: 'page',
    },
    ES: {
      noImage: 'No hay imágenes disponibles',
      prev: 'Página anterior',
      next: 'Página siguiente',
      goToPage: 'Ir a la página',
      page: 'página',
    },
  };

  const text = uiText[language] || uiText.IT;

  useEffect(() => {
    if (!routeInfo) return;

    if (language !== routeInfo.langCode) {
      setLanguage(routeInfo.langCode);
    }
  }, [lang, routeInfo, language, setLanguage]);
  useEffect(() => {
  window.scrollTo(0, 0);
}, [location.pathname]);

  useEffect(() => {
    setCurrentPage(0);
  }, [slug, language]);

  const pages = useMemo(() => {
    if (!book) return [];
    return book.pages?.[language] || [];
  }, [book, language]);

  useEffect(() => {
    if (!isValidRoute) {
      navigate('/', { replace: true });
    }
  }, [isValidRoute, navigate]);

  useEffect(() => {
    if (!book) return;

    const pageTitle = book.metaTitle?.[language] || `${book.title} | Gipi Visconti`;
    const pageDescription =
      book.metaDescription?.[language] ||
      book.description?.[language] ||
      '';

    document.title = pageTitle;

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', pageDescription);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `https://www.gipivisconti.com${location.pathname}`);
  }, [book, language, location.pathname]);

  if (!book || !isValidRoute) {
    return null;
  }

  const goPrev = () => {
    setCurrentPage((prev) => (prev === 0 ? pages.length - 1 : prev - 1));
  };

  const goNext = () => {
    setCurrentPage((prev) => (prev === pages.length - 1 ? 0 : prev + 1));
  };

  const amazonLink = book.amazonLinks?.[language];

  return (
    <section className="py-16 md:py-20 bg-[#FAF9F6] min-h-[70vh]">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="mb-8">
          <Link
            to="/#books"
            className="inline-flex items-center text-sm text-[#C18C5D] hover:text-[#A6754B] transition-colors"
          >
            ← {t.nav.books}
          </Link>
        </div>

        <h1 className="font-heading text-3xl md:text-5xl text-[#2C2A29] text-center mb-10">
          {book.title}
        </h1>

        <div className="max-w-3xl mx-auto">
          <div className="group relative bg-white rounded-2xl overflow-hidden border border-[#E8E4DB] shadow-sm">
            {pages.length > 0 ? (
              <img
                src={pages[currentPage]}
                alt={`${book.title} - ${text.page} ${currentPage + 1}`}
                className="w-full h-auto"
              />
            ) : (
              <div className="aspect-[3/4] flex items-center justify-center p-6 text-center text-[#75736E]">
                {text.noImage}
              </div>
            )}

            {pages.length > 1 && (
              <>
                <button
                  onClick={goPrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#2C2A29] rounded-full p-2 shadow transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100"
                  aria-label={text.prev}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={goNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#2C2A29] rounded-full p-2 shadow transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100"
                  aria-label={text.next}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {pages.length > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {pages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    currentPage === index ? 'bg-[#C18C5D]' : 'bg-[#D8D2C8]'
                  }`}
                  aria-label={`${text.goToPage} ${index + 1}`}
                />
              ))}
            </div>
          )}

          <div className="mt-8 text-center">
            <p className="text-base md:text-lg leading-relaxed text-[#75736E] max-w-2xl mx-auto">
              {book.description?.[language]}
            </p>

            {amazonLink && (
              <a
                href={amazonLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 bg-[#C18C5D] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#A6754B] transition-colors"
              >
                {t.books.buyOnAmazon}
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookDetailPage;