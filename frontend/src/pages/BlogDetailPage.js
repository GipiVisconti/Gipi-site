import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { getPostBySlug } from '../data/blog';

const BlogDetailPage = () => {
  const { lang, slug } = useParams();
  const navigate = useNavigate();
  const { language, t } = useLanguage();

  const post = getPostBySlug(slug);

  useEffect(() => {
    if (!post) {
      navigate(`/${lang}/blog`, { replace: true });
    }
  }, [post, lang, navigate]);

  useEffect(() => {
    if (!post) return;
    window.scrollTo(0, 0);

    const content = post.content[language];
    const langSlug = language === 'IT' ? 'it' : language === 'EN' ? 'en' : 'es';

    document.title = `${content.title} | Gipi Visconti`;

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', content.excerpt);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute(
      'href',
      `https://www.gipivisconti.com/${langSlug}/blog/${post.slug}`
    );
  }, [post, language]);

  if (!post) return null;

  const content = post.content[language];
  const typeLabel = t.blog.types?.[post.type] || post.type;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const localeMap = { IT: 'it-IT', EN: 'en-GB', ES: 'es-ES' };
    return date.toLocaleDateString(localeMap[language] || 'it-IT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <section className="py-16 md:py-20 bg-[#FAF9F6] min-h-[70vh]">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <div className="mb-8">
          <button
            onClick={() => navigate(`/${lang}/blog`)}
            className="inline-flex items-center text-sm text-[#C18C5D] hover:text-[#A6754B] transition-colors"
          >
            ← Blog
          </button>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs uppercase tracking-[0.15em] font-bold text-[#C18C5D]">
            {typeLabel}
          </span>
          <span className="text-[#D8D2C8]">·</span>
          <span className="text-sm text-[#75736E]">{formatDate(post.date)}</span>
        </div>

        <h1 className="font-heading text-3xl md:text-5xl font-medium text-[#2C2A29] leading-snug mb-6">
          {content.title}
        </h1>

        <p className="text-base md:text-lg leading-relaxed text-[#75736E] mb-8 border-l-2 border-[#C18C5D] pl-4">
          {content.excerpt}
        </p>

        <div
          className="prose prose-lg max-w-none text-[#2C2A29] leading-relaxed
            [&_p]:mb-5 [&_p]:leading-relaxed [&_p]:text-[#3D3B39]
            [&_em]:text-[#2C2A29] [&_em]:not-italic [&_em]:font-medium
            [&_strong]:text-[#2C2A29]"
          dangerouslySetInnerHTML={{ __html: content.body }}
        />
      </div>
    </section>
  );
};

export default BlogDetailPage;
