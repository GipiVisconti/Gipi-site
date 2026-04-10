import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Send, CheckCircle, AlertCircle, Mail, User, Calendar } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ContactSection = () => {
  const { language, t } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    birthday: '',
  });

  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState(null); // 'success', 'error', or null
  const [loading, setLoading] = useState(false);

  const showContactSection = false;

  if (!showContactSection) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!consent) {
      setStatus('error');
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      await axios.post(`${API}/subscribe`, {
        ...formData,
        language,
      });

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        birthday: '',
      });
      setConsent(false);
    } catch (error) {
      console.error('Error subscribing:', error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 md:py-32 bg-[#FAF9F6] relative overflow-hidden"
      data-testid="contact-section"
    >
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#C18C5D]/5 rounded-full blur-3xl transform -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#8A9A86]/5 rounded-full blur-3xl transform -translate-y-1/2" />

      <div className="max-w-2xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl tracking-tight font-medium text-[#2C2A29] mb-4">
            {t.contact.title}
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-[#75736E] max-w-xl mx-auto">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="bg-[#F2EFE9] rounded-2xl p-8 md:p-12 border border-[#E8E4DB] shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2 text-[#2C2A29]">
                <User className="w-4 h-4 text-[#C18C5D]" />
                {t.contact.name}
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder={t.contact.namePlaceholder}
                required
                className="bg-white border-[#E8E4DB] focus:ring-[#C18C5D]/20 focus:border-[#C18C5D] rounded-xl"
                data-testid="contact-name-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2 text-[#2C2A29]">
                <Mail className="w-4 h-4 text-[#C18C5D]" />
                {t.contact.email}
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t.contact.emailPlaceholder}
                required
                className="bg-white border-[#E8E4DB] focus:ring-[#C18C5D]/20 focus:border-[#C18C5D] rounded-xl"
                data-testid="contact-email-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthday" className="flex items-center gap-2 text-[#2C2A29]">
                <Calendar className="w-4 h-4 text-[#C18C5D]" />
                {t.contact.birthday}
              </Label>
              <Input
                id="birthday"
                name="birthday"
                type="date"
                value={formData.birthday}
                onChange={handleChange}
                required
                className="bg-white border-[#E8E4DB] focus:ring-[#C18C5D]/20 focus:border-[#C18C5D] rounded-xl"
                data-testid="contact-birthday-input"
              />
            </div>

            {status === 'success' && (
              <div
                className="flex items-center gap-2 text-green-600 bg-green-50 p-4 rounded-xl"
                data-testid="contact-success-message"
              >
                <CheckCircle className="w-5 h-5" />
                <span>{t.contact.success}</span>
              </div>
            )}

            {status === 'error' && (
              <div
                className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-xl"
                data-testid="contact-error-message"
              >
                <AlertCircle className="w-5 h-5" />
                <span>{t.contact.error}</span>
              </div>
            )}

            <label className="flex items-start gap-3 text-xs leading-relaxed text-[#75736E] mt-2">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 accent-[#C18C5D]"
                required
              />
              <span>{t.contact.consent}</span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              data-testid="contact-submit-button"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  {t.contact.send}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;