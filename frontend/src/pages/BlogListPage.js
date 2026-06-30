import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { getAllPosts } from '../data/blog';

const BlogListPage = () => {
  const { lang } = useParams();
  const { language, t } = useLanguage();

  const posts = getAllPosts().sort((a, b) => new Date(b.date) - new Date(a.date));

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const localeMap = { IT: 'it-IT', EN: 'en-GB', ES: 'es-ES' };
    return date.toLocaleDateString(localeMap[language] || 'it-IT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const titleMap = {
      IT: 'Blog | Gipi Visconti',
      EN: 'Blog | Gipi Visconti',
      ES: 'Blog | Gipi Visconti',
    };
    const descMap = {
      IT: 'Storie, aggiornamenti e curiosità dal mondo di Piccoli Grandi Eroi.',
      EN: 'Stories, updates and curiosities from the world of Little Great Heroes.',
      ES: 'Historias, novedades y curiosidades del mundo de Pequeños Grandes Valientes.',
    };
    const langSlug = language === 'IT' ? 'it' : language === 'EN' ? 'en' : 'es';

    document.title = titleMap[language];

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', descMap[language]);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `https://www.gipivisconti.com/${langSlug}/blog`);
  }, [language]);

  return (
    <section className="py-16 md:py-20 bg-[#FAF9F6] min-h-[70vh]">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <p className="text-xs md:text-sm uppercase tracking-[0.2em] font-bold text-[#C18C5D] mb-4">
            {t.blog.title}
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl tracking-tight font-medium text-[#2C2A29]">
            Blog
          </h1>
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-[#75736E] text-base md:text-lg">
            {t.blog.noArticles}
          </p>
        ) : (
          <ul className="flex flex-col gap-8">
            {posts.map((post) => {
              const content = post.content[language];
              const typeLabel = t.blog.types?.[post.type] || post.type;
              return (
                <li
                  key={post.id}
                  className="bg-white rounded-2xl border border-[#E8E4DB] shadow-sm p-6 md:p-8"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs uppercase tracking-[0.15em] font-bold text-[#C18C5D]">
                      {typeLabel}
                    </span>
                    <span className="text-[#D8D2C8]">·</span>
                    <span className="text-sm text-[#75736E]">
                      {formatDate(post.date)}
                    </span>
                  </div>

                  <h2 className="font-heading text-2xl md:text-3xl font-medium text-[#2C2A29] mb-3 leading-snug">
                    {content.title}
                  </h2>

                  <p className="text-base leading-relaxed text-[#75736E] mb-5">
                    {content.excerpt}
                  </p>

                  <Link
                    to={`/${lang}/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-[#C18C5D] hover:text-[#A6754B] transition-colors"
                  >
                    {t.blog.readMore} →
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
};

export default BlogListPage;
