import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Calendar, ArrowRight } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Default blog posts (when no posts in DB)
const defaultPosts = [
  {
    id: '1',
    title_it: 'Nuova uscita: Yayoi Kusama',
    title_en: 'New Release: Yayoi Kusama',
    title_es: 'Nuevo lanzamiento: Yayoi Kusama',
    excerpt_it: 'Scopri la storia dell\'artista giapponese famosa per i suoi pois infiniti, raccontata ai bambini.',
    excerpt_en: 'Discover the story of the Japanese artist famous for her infinite polka dots, told to children.',
    excerpt_es: 'Descubre la historia de la artista japonesa famosa por sus lunares infinitos, contada a los niños.',
    image_url: 'https://images.pexels.com/photos/6146645/pexels-photo-6146645.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    created_at: '2024-12-01T10:00:00Z',
  },
  {
    id: '2',
    title_it: 'Come aiutare i bambini a leggere',
    title_en: 'How to help children learn to read',
    title_es: 'Cómo ayudar a los niños a leer',
    excerpt_it: 'Consigli pratici per genitori e educatori per rendere la lettura un piacere quotidiano.',
    excerpt_en: 'Practical tips for parents and educators to make reading a daily pleasure.',
    excerpt_es: 'Consejos prácticos para padres y educadores para hacer de la lectura un placer diario.',
    image_url: 'https://images.pexels.com/photos/1767016/pexels-photo-1767016.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    created_at: '2024-11-15T10:00:00Z',
  },
];

const BlogCard = ({ post }) => {
  const { language, t } = useLanguage();

  const title = post[`title_${language.toLowerCase()}`] || post.title_it;
  const excerpt = post[`excerpt_${language.toLowerCase()}`] || post.excerpt_it;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    const locale = language === 'IT' ? 'it-IT' : language === 'ES' ? 'es-ES' : 'en-US';
    return date.toLocaleDateString(locale, options);
  };

  return (
    <article 
      className="group bg-white rounded-2xl overflow-hidden border border-[#E8E4DB] shadow-sm hover:shadow-md transition-shadow duration-300"
      data-testid={`blog-card-${post.id}`}
    >
      {/* Image */}
      {post.image_url && (
        <div className="aspect-video overflow-hidden">
          <img 
            src={post.image_url}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Date */}
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="w-4 h-4 text-[#C18C5D]" />
          <span className="font-accent text-lg text-[#C18C5D]">
            {formatDate(post.created_at)}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-heading text-xl md:text-2xl font-medium text-[#2C2A29] mb-3 group-hover:text-[#C18C5D] transition-colors">
          {title}
        </h3>

        {/* Excerpt */}
        <p className="text-[#75736E] leading-relaxed mb-4 line-clamp-3">
          {excerpt}
        </p>

        {/* Read more */}
        <button 
          className="inline-flex items-center gap-2 text-[#C18C5D] font-medium hover:gap-3 transition-all"
          data-testid={`blog-read-more-${post.id}`}
        >
          {t.blog.readMore}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </article>
  );
};

const BlogSection = () => {
  const { t } = useLanguage();
  const [posts, setPosts] = useState(defaultPosts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API}/blog`);
        if (response.data && response.data.length > 0) {
          setPosts(response.data);
        }
      } catch (error) {
        console.log('Using default blog posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section 
      id="blog" 
      className="py-20 md:py-32 bg-[#F2EFE9]"
      data-testid="blog-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-xs md:text-sm uppercase tracking-[0.2em] font-bold text-[#C18C5D] mb-4">
            Blog
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl tracking-tight font-medium text-[#2C2A29] mb-4">
            {t.blog.title}
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-[#75736E] max-w-2xl mx-auto">
            {t.blog.subtitle}
          </p>
        </div>

        {/* Blog Grid */}
        {loading ? (
          <div className="flex justify-center">
            <div className="w-8 h-8 border-4 border-[#C18C5D] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : posts.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8">
            {posts.slice(0, 4).map((post, index) => (
              <div 
                key={post.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-[#75736E]">{t.blog.noArticles}</p>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
