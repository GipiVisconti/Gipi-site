import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Calendar, CheckCircle, Gift, Mail, Send, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import TurnstileWidget from '../components/TurnstileWidget';
import { GIFT_COPY, GIFT_ROUTES } from '../lib/gift';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

const DEFAULT_API_BASE_URL = 'https://gipi-regalo-api.tight-river-419a.workers.dev';
const API_BASE_URL = (process.env.REACT_APP_GIFT_API_URL || DEFAULT_API_BASE_URL).replace(/\/+$/, '');
const TURNSTILE_SITE_KEY =
  process.env.REACT_APP_TURNSTILE_SITE_KEY || '0x4AAAAAAERsb4TkBeTJhi0s';

const emptyForm = {
  name: '',
  email: '',
  birthday: '',
  newsletterConsent: false,
};

const GiftLandingPage = () => {
  const { language } = useLanguage();
  const copy = GIFT_COPY[language] || GIFT_COPY.IT;
  const locale = GIFT_ROUTES[language]?.code || 'it';
  const [formData, setFormData] = useState(emptyForm);
  const [privacyRead, setPrivacyRead] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState('');
  const [resetSignal, setResetSignal] = useState(0);
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const handleTurnstileToken = useCallback((token) => setTurnstileToken(token), []);
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = copy.seoTitle;
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', copy.seoDescription);
  }, [copy]);

  const handleChange = (event) => {
    const { checked, name, type, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');

    if (!turnstileToken) {
      setStatus('error');
      setMessage(copy.turnstileError);
      return;
    }
    if (!API_BASE_URL) {
      setStatus('error');
      setMessage(copy.configError);
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch(`${API_BASE_URL}/v1/gift-requests/${locale}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          birthday: formData.birthday,
          newsletterConsent: formData.newsletterConsent,
          turnstileToken,
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData(emptyForm);
        setPrivacyRead(false);
        return;
      }

      const body = await response.json().catch(() => ({}));
      setStatus('error');
      setMessage(
        response.status === 429
          ? copy.rateLimit
          : body.field === 'turnstile'
          ? copy.turnstileError
          : copy.error
      );
      setResetSignal((value) => value + 1);
    } catch {
      setStatus('error');
      setMessage(copy.error);
      setResetSignal((value) => value + 1);
    }
  };

  const startAgain = () => {
    setStatus('idle');
    setMessage('');
    setResetSignal((value) => value + 1);
  };

  return (
    <section className="relative overflow-hidden bg-[#FAF9F6] py-10 md:py-14">
      <div className="absolute -left-24 top-20 h-80 w-80 rounded-full bg-[#C18C5D]/10 blur-3xl" />
      <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-[#8A9A86]/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-12">
        <div className="mx-auto mb-9 max-w-3xl text-center md:mb-12">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#C18C5D] text-white shadow-sm">
            <Gift className="h-6 w-6" aria-hidden="true" />
          </div>
          <h1 className="mb-4 font-heading text-4xl font-medium tracking-tight text-[#2C2A29] sm:text-5xl lg:text-6xl">
            {copy.title}
          </h1>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-[#75736E] md:text-xl">
            {copy.intro}
          </p>
        </div>

        <div className="mx-auto max-w-2xl rounded-3xl border border-[#E8E4DB] bg-[#F2EFE9] p-7 shadow-sm md:p-12">
          {status === 'success' ? (
            <div className="py-6 text-center" role="status" data-testid="gift-success">
              <CheckCircle className="mx-auto mb-5 h-12 w-12 text-[#8A9A86]" aria-hidden="true" />
              <h2 className="mb-3 font-heading text-3xl text-[#2C2A29]">{copy.successTitle}</h2>
              <p className="mb-7 leading-relaxed text-[#75736E]">{copy.successBody}</p>
              <button type="button" onClick={startAgain} className="btn-secondary">
                {copy.again}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" data-testid="gift-form">
              <div className="space-y-2">
                <Label htmlFor="gift-name" className="flex items-center gap-2 text-[#2C2A29]">
                  <User className="h-4 w-4 text-[#C18C5D]" aria-hidden="true" />
                  {copy.name}
                </Label>
                <Input id="gift-name" name="name" type="text" autoComplete="name" maxLength={80} value={formData.name} onChange={handleChange} placeholder={copy.namePlaceholder} className="bg-white" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gift-email" className="flex items-center gap-2 text-[#2C2A29]">
                  <Mail className="h-4 w-4 text-[#C18C5D]" aria-hidden="true" />
                  {copy.email}
                </Label>
                <Input id="gift-email" name="email" type="email" autoComplete="email" maxLength={254} value={formData.email} onChange={handleChange} placeholder={copy.emailPlaceholder} className="bg-white" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gift-birthday" className="flex items-center gap-2 text-[#2C2A29]">
                  <Calendar className="h-4 w-4 text-[#C18C5D]" aria-hidden="true" />
                  {copy.birthday}
                </Label>
                <Input
                  id="gift-birthday"
                  name="birthday"
                  type="date"
                  autoComplete="bday"
                  min="1900-01-01"
                  max={today}
                  value={formData.birthday}
                  onChange={handleChange}
                  className="bg-white"
                  required
                />
              </div>

              <label className="flex items-start gap-3 text-sm leading-relaxed text-[#75736E]">
                <input type="checkbox" checked={privacyRead} onChange={(event) => setPrivacyRead(event.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-[#C18C5D]" required />
                <span>
                  {copy.privacyPrefix}
                  <Link to={`/${locale}/privacy-policy`} target="_blank" rel="noopener noreferrer" className="underline transition-colors hover:text-[#C18C5D]">
                    {copy.privacyLink}
                  </Link>
                  {copy.privacySuffix}
                </span>
              </label>

              <label className="flex items-start gap-3 text-sm leading-relaxed text-[#75736E]">
                <input
                  type="checkbox"
                  name="newsletterConsent"
                  checked={formData.newsletterConsent}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 shrink-0 accent-[#C18C5D]"
                  data-testid="gift-newsletter-consent"
                />
                <span>{copy.newsletterConsent}</span>
              </label>

              <div>
                <TurnstileWidget siteKey={TURNSTILE_SITE_KEY} language={locale} onToken={handleTurnstileToken} resetSignal={resetSignal} />
                <p className="mt-1 text-xs leading-relaxed text-[#75736E]">{copy.turnstileHint}</p>
              </div>

              {status === 'error' && (
                <div className="flex items-start gap-2 rounded-xl bg-red-50 p-4 text-red-700" role="alert" data-testid="gift-error">
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                  <span>{message}</span>
                </div>
              )}

              <button type="submit" disabled={status === 'sending'} className="btn-primary flex w-full items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-50" data-testid="gift-submit">
                <Send className="h-4 w-4" aria-hidden="true" />
                {status === 'sending' ? copy.sending : copy.submit}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default GiftLandingPage;
