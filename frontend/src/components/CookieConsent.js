import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import {
  activateConsent,
  CONSENT_STORAGE_KEY,
  COOKIE_SETTINGS_EVENT,
  needsReloadForRevocation,
  readConsent,
  revokeAnalytics,
  saveConsent,
} from '../lib/cookieConsent';

const COPY = {
  IT: {
    title: 'Sei tu a scegliere',
    description: 'Usiamo strumenti necessari al funzionamento del sito; solo con il tuo consenso attiviamo anche quelli analitici, per raccogliere statistiche sulle visite. Puoi rifiutarli e continuare a navigare, oppure scegliere in Configura; puoi cambiare idea da Preferenze cookie, in fondo a ogni pagina.',
    accept: 'Accetta',
    reject: 'Rifiuta',
    rejectAll: 'Rifiuta tutto',
    customise: 'Configura',
    save: 'Salva le preferenze',
    preferencesTitle: 'Le tue preferenze cookie',
    necessary: 'Necessari',
    necessaryDescription: 'Permettono il funzionamento e la sicurezza del sito; sono sempre attivi.',
    analytics: 'Analitici',
    analyticsDescription: 'Raccolgono statistiche sulle visite e ci aiutano a migliorare il sito; sono disattivati finché non li accetti.',
    privacyPrefix: 'Leggi l’',
    privacyLink: 'informativa privacy e cookie',
    error: 'Non è stato possibile salvare la scelta. Controlla le impostazioni del browser e riprova.',
  },
  EN: {
    title: 'You decide',
    description: 'We use tools that are necessary for the site to work; only with your consent do we also enable analytics tools to collect statistics about visits. You can reject them and continue browsing, or choose your preferences using Configure; you can change your mind through Cookie preferences at the bottom of every page.',
    accept: 'Accept',
    reject: 'Reject',
    rejectAll: 'Reject all',
    customise: 'Configure',
    save: 'Save preferences',
    preferencesTitle: 'Your cookie preferences',
    necessary: 'Necessary',
    necessaryDescription: 'These support the operation and security of the website; they are always active.',
    analytics: 'Analytics',
    analyticsDescription: 'These collect visit statistics and help us improve the site; they remain disabled until you accept them.',
    privacyPrefix: 'Read the ',
    privacyLink: 'privacy and cookie information',
    error: 'Your choice could not be saved. Check your browser settings and try again.',
  },
  ES: {
    title: 'Tú eliges',
    description: 'Utilizamos herramientas necesarias para el funcionamiento del sitio; solo con tu consentimiento activamos también las de análisis, para recopilar estadísticas sobre las visitas. Puedes rechazarlas y seguir navegando, o elegir tus preferencias con Configurar; puedes cambiar de opinión desde Preferencias de cookies, al pie de cada página.',
    accept: 'Aceptar',
    reject: 'Rechazar',
    rejectAll: 'Rechazar todo',
    customise: 'Configurar',
    save: 'Guardar preferencias',
    preferencesTitle: 'Tus preferencias de cookies',
    necessary: 'Necesarias',
    necessaryDescription: 'Permiten el funcionamiento y la seguridad del sitio; están siempre activas.',
    analytics: 'Analíticas',
    analyticsDescription: 'Recopilan estadísticas sobre las visitas y nos ayudan a mejorar el sitio; permanecen desactivadas hasta que las aceptes.',
    privacyPrefix: 'Consulta la ',
    privacyLink: 'información sobre privacidad y cookies',
    error: 'No se ha podido guardar tu elección. Comprueba la configuración del navegador e inténtalo de nuevo.',
  },
};

const CookieConsent = () => {
  const { language } = useLanguage();
  const [initialPreference] = useState(() => readConsent());
  const [isOpen, setIsOpen] = useState(!initialPreference);
  const [showDetails, setShowDetails] = useState(false);
  const [analytics, setAnalytics] = useState(initialPreference?.analytics || false);
  const [error, setError] = useState('');
  const titleRef = useRef(null);
  const openerRef = useRef(null);
  const copy = COPY[language] || COPY.IT;
  const locale = language.toLowerCase();

  useEffect(() => {
    const handleOpenSettings = (event) => {
      const preference = readConsent();
      openerRef.current = event.detail?.opener || null;
      setAnalytics(preference?.analytics || false);
      setShowDetails(true);
      setError('');
      setIsOpen(true);
    };

    window.addEventListener(COOKIE_SETTINGS_EVENT, handleOpenSettings);
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, handleOpenSettings);
  }, []);

  useEffect(() => {
    const syncPreference = (event) => {
      if (event.key && event.key !== CONSENT_STORAGE_KEY) return;

      const preference = readConsent();
      if (window.__gipiAnalyticsConsentGranted && !preference?.analytics) {
        revokeAnalytics();
        window.location.reload();
        return;
      }

      if (preference) {
        activateConsent(preference);
        setAnalytics(preference.analytics);
        setIsOpen(false);
      } else {
        setAnalytics(false);
        setShowDetails(false);
        setIsOpen(true);
      }
    };

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') syncPreference({ key: null });
    };

    window.addEventListener('storage', syncPreference);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      window.removeEventListener('storage', syncPreference);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  useEffect(() => {
    if (isOpen) titleRef.current?.focus({ preventScroll: true });
  }, [isOpen]);

  const commitChoice = (choices) => {
    const previous = readConsent();

    try {
      const next = saveConsent({ ...choices, language });

      if (needsReloadForRevocation(previous, next)) {
        revokeAnalytics();
        window.location.reload();
        return;
      }

      activateConsent(next);
      setError('');
      setIsOpen(false);
      window.setTimeout(() => openerRef.current?.focus(), 0);
    } catch {
      setError(copy.error);
    }
  };

  if (!isOpen) return null;

  return (
    <section
      className="cookie-consent"
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
      data-testid="cookie-consent"
    >
      <div className="cookie-consent__panel">
        <div className="cookie-consent__intro">
          <h2
            id="cookie-consent-title"
            ref={titleRef}
            tabIndex="-1"
            className="font-heading"
          >
            {copy.title}
          </h2>
          <p id="cookie-consent-description">{copy.description}</p>
          <p className="cookie-consent__privacy">
            {copy.privacyPrefix}
            <Link to={`/${locale}/privacy-policy`}>{copy.privacyLink}</Link>.
          </p>
        </div>

        <div className="cookie-consent__actions" aria-label={copy.title}>
          <button
            type="button"
            className="cookie-consent__button"
            onClick={() => commitChoice({ analytics: false })}
          >
            {copy.reject}
          </button>
          <button
            type="button"
            className="cookie-consent__button"
            aria-expanded={showDetails}
            aria-controls="cookie-consent-options"
            onClick={() => setShowDetails((visible) => !visible)}
          >
            {copy.customise}
          </button>
          <button
            type="button"
            className="cookie-consent__button"
            onClick={() => commitChoice({ analytics: true })}
          >
            {copy.accept}
          </button>
        </div>

        {showDetails && (
          <div id="cookie-consent-options" className="cookie-consent__options">
            <h3>{copy.preferencesTitle}</h3>
            <div className="cookie-consent__option">
              <div>
                <span className="cookie-consent__option-title">{copy.necessary}</span>
                <p>{copy.necessaryDescription}</p>
              </div>
              <input type="checkbox" checked disabled aria-label={copy.necessary} />
            </div>

            <label className="cookie-consent__option">
              <span>
                <span className="cookie-consent__option-title">{copy.analytics}</span>
                <span>{copy.analyticsDescription}</span>
              </span>
              <input
                type="checkbox"
                checked={analytics}
                onChange={(event) => setAnalytics(event.target.checked)}
              />
            </label>

            <div className="cookie-consent__option-actions">
              <button
                type="button"
                className="cookie-consent__button"
                onClick={() => commitChoice({ analytics: false })}
              >
                {copy.rejectAll}
              </button>
              <button
                type="button"
                className="cookie-consent__button cookie-consent__save"
                onClick={() => commitChoice({ analytics })}
              >
                {copy.save}
              </button>
              <button
                type="button"
                className="cookie-consent__button"
                onClick={() => commitChoice({ analytics: true })}
              >
                {copy.accept}
              </button>
            </div>
          </div>
        )}

        {error && <p className="cookie-consent__error" role="alert">{error}</p>}
      </div>
    </section>
  );
};

export default CookieConsent;
