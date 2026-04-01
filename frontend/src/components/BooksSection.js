import { useLanguage } from '../context/LanguageContext';
import { books } from '../data/books';
import { ShoppingCart, ExternalLink } from 'lucide-react';

const BookCard = ({ book }) => {
  const { language, t } = useLanguage();
  
  // Check if book has real cover images
  const hasCoverImage = book.coverImages && book.coverImages[language];
  const coverImage = hasCoverImage ? book.coverImages[language] : null;

  return (
    <div 
      className="book-card group bg-white rounded-xl overflow-hidden border border-[#E8E4DB] shadow-sm"
      data-testid={`book-card-${book.id}`}
    >
      {/* Book Cover */}
      <div className="relative overflow-hidden">
        {hasCoverImage ? (
          /* Real cover image */
          <img 
            src={coverImage} 
            alt={book.title}
            className="w-full h-auto"
          />
        ) : (
          /* Placeholder cover */
          <div className={`aspect-[3/4] ${book.gradient} flex flex-col items-center justify-center p-4 text-center`}>
            {/* Language badge */}
            <span className="absolute top-2 right-2 bg-white/90 text-[#2C2A29] text-[10px] font-bold px-2 py-0.5 rounded-full">
              {language}
            </span>
            
            {/* Book title */}
            <h3 className="font-heading text-base font-semibold text-[#2C2A29] leading-tight">
              {book.title}
            </h3>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[#2C2A29]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-2">
          <a
            href={book.amazonLinks[language]}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#C18C5D] text-white px-3 py-2 rounded-full text-xs font-medium flex items-center gap-1 hover:bg-[#A6754B] transition-colors"
            data-testid={`amazon-link-${book.id}`}
          >
            <ShoppingCart className="w-3 h-3" />
            Amazon
          </a>
        </div>
      </div>

      {/* Book Info */}
      <div className="p-3">
        <h4 className="font-heading text-sm font-medium text-[#2C2A29] mb-1 line-clamp-1">
          {book.title}
        </h4>
        <a
          href={book.amazonLinks[language]}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-medium text-[#C18C5D] hover:text-[#A6754B] transition-colors"
          data-testid={`amazon-link-text-${book.id}`}
        >
          {t.books.buyOnAmazon}
          <ExternalLink className="w-3 h-3" />
        </a>
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
        {/* Section Header */}
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

        {/* Books Grid */}
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
