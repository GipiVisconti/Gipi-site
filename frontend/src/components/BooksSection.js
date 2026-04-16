import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { books, getBookUrl } from '../data/books';

const BookCard = ({ book }) => {
  const { language } = useLanguage();

  const firstPage = book.pages?.[language]?.[0];
  const bookUrl = getBookUrl(language, book.slug);

  return (
    <div
      className="book-card group bg-white rounded-xl overflow-hidden border border-[#E8E4DB] shadow-sm"
      data-testid={`book-card-${book.id}`}
    >
      <Link
        to={bookUrl}
        className="block"
        aria-label={`Apri il libro ${book.title}`}
      >
        <div className="relative overflow-hidden">
          {firstPage ? (
            <img
              src={firstPage}
              alt={book.title}
              className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.02]"
              loading="lazy"
            />
          ) : (
            <div
              className={`aspect-[3/4] ${book.gradient} flex flex-col items-center justify-center p-4 text-center`}
            >
              <span className="absolute top-2 right-2 bg-white/90 text-[#2C2A29] text-[10px] font-bold px-2 py-0.5 rounded-full">
                {language}
              </span>

              <h3 className="font-heading text-base font-semibold text-[#2C2A29] leading-tight">
                {book.title}
              </h3>
            </div>
          )}
        </div>
      </Link>

      <div className="p-3">
        <h4 className="font-heading text-sm font-medium text-[#2C2A29] line-clamp-1">
          {book.title}
        </h4>
      </div>
    </div>
  );
};

const BooksSection = () => {
  const { t } = useLanguage();

  return (
    <section
      id="books"
      className="py-20 md:py-32 bg-[#F2EFE9]"
      data-testid="books-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <p className="text-xs md:text-sm uppercase tracking-[0.2em] font-bold text-[#C18C5D] mb-4">
            {t.books.collection}
          </p>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl tracking-tight font-medium text-[#2C2A29] mb-4">
            {t.books.title}
          </h2>

          <p className="text-base md:text-lg leading-relaxed text-[#75736E] max-w-2xl mx-auto">
            {t.books.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {books.map((book, index) => (
            <div
              key={book.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <BookCard book={book} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BooksSection;
