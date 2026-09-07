import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import {
  activateConsent,
  COOKIE_SETTINGS_EVENT,
  needsReloadForRevocation,
  readConsent,
  saveConsent,
} from '../lib/cookieConsent';

const COPY = {
  IT: {
    title: 'Sei tu a scegliere',
    description: 'Usiamo tecnologie necessarie per far funzionare il sito. Solo con il tuo consenso possiamo attivare la misurazione analitica dell’uso del sito.',
    accept: 'Accetta',
    reject: 'Rifiuta',
    rejectAll: 'Rifiuta tutto',
    customise: 'Configura',
    save: 'Salva le preferenze',
    close: 'Chiudi senza modificare le preferenze',
    closeAndReject: 'Rifiuta i cookie analitici e chiudi',
    closeNotice: 'Se chiudi con la X, restano attivi soltanto i cookie necessari e quelli analitici vengono rifiutati.',
    necessary: 'Necessari',
    necessaryDescription: 'Permettono il funzionamento e la sicurezza del sito; sono sempre attivi.',
    analytics: 'Analitici',
    analyticsDescription: 'Ci aiutano a capire come viene usato il sito e a migliorarlo.',
    privacyPrefix: 'Per maggiori informazioni consulta la ',
    privacyLink: 'Privacy Policy',
    error: 'Non è stato possibile salvare la scelta. Controlla le impostazioni del browser e riprova.',
  },
  EN: {
    title: 'You’re in control',
    description: 'We use necessary technologies to operate the website. We activate analytics only with your consent.',
    accept: 'Accept',
    reject: 'Reject',
    rejectAll: 'Reject all',
    customise: 'Customise',
    save: 'Save preferences',
    close: 'Close without changing cookie preferences',
    closeAndReject: 'Reject analytics cookies and close',
    closeNotice: 'Closing with the X keeps only necessary cookies active and rejects analytics cookies.',
    necessary: 'Necessary',
    necessaryDescription: 'These support the operation and security of the website; they are always active.',
    analytics: 'Analytics',
    analyticsDescription: 'These help us understand how the website is used and improve it.',
    privacyPrefix: 'For more information, read the ',
    privacyLink: 'Privacy Policy',
    error: 'Your choice could not be saved. Check your browser settings and try again.',
  },
  ES: {
    title: 'Tú decides',
    description: 'Utilizamos tecnologías necesarias para que el sitio web funcione. Solo con tu consentimiento podemos activar la medición analítica del uso del sitio.',
    accept: 'Aceptar',
    reject: 'Rechazar',
    rejectAll: 'Rechazar todo',
    customise: 'Configurar',
    save: 'Guardar preferencias',
    close: 'Cerrar sin cambiar las preferencias',
    closeAndReject: 'Rechazar las cookies analíticas y cerrar',
    closeNotice: 'Al cerrar con la X, solo permanecen activas las cookies necesarias y se rechazan las analíticas.',
    necessary: 'Necesarias',
    necessaryDescription: 'Permiten el funcionamiento y la seguridad del sitio; están siempre activas.',
    analytics: 'Analíticas',
    analyticsDescription: 'Nos ayudan a entender cómo se utiliza el sitio y a mejorarlo.',
    privacyPrefix: 'Para más información, consulta la ',
    privacyLink: 'Política de Privacidad',
    error: 'No se ha podido guardar tu elección. Comprueba la configuración del navegador e inténtalo de nuevo.',
  },
};

const CookieConsent = () => {
  const { language } = useLanguage();
  const initialPreference = readConsent();
  const [isOpen, setIsOpen] = useState(!initialPreference);
  const [hasPreference, setHasPreference] = useState(Boolean(initialPreference));
  const [showDetails, setShowDetails] = useState(false);
  const [analytics, setAnalytics] = useState(initialPreference?.analytics || false);
  const [error, setError] = useState('');
  const titleRef = useRef(null);
  const copy = COPY[language] || COPY.IT;
  const locale = language.toLowerCase();

  useEffect(() => {
    const handleOpenSettings = () => {
      const preference = readConsent();
      setAnalytics(preference?.analytics || false);
      setHasPreference(Boolean(preference));
      setShowDetails(true);
      setError('');
      setIsOpen(true);
    };

    window.addEventListener(COOKIE_SETTINGS_EVENT, handleOpenSettings);
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, handleOpenSettings);
  }, []);

  useEffect(() => {
    if (isOpen) titleRef.current?.focus();
  }, [isOpen]);

  const commitChoice = (choices) => {
    const previous = readConsent();

    try {
      const next = saveConsent({ ...choices, language });

      if (needsReloadForRevocation(previous, next)) {
        window.location.reload();
        return;
      }

      activateConsent(next);
      setHasPreference(true);
      setError('');
      setIsOpen(false);
    } catch {
      setError(copy.error);
    }
  };

  const closeLabel = hasPreference ? copy.close : copy.closeAndReject;
  const handleClose = () => {
    if (hasPreference) {
      setIsOpen(false);
      return;
    }

    commitChoice({ analytics: false });
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
        <button
          type="button"
          className="cookie-consent__close"
          aria-label={closeLabel}
          title={closeLabel}
          onClick={handleClose}
        >
          ×
        </button>

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
          {!hasPreference && (
            <p className="cookie-consent__close-notice">{copy.closeNotice}</p>
          )}
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
            className="cookie-consent__button cookie-consent__button--primary"
            onClick={() => commitChoice({ analytics: true })}
          >
            {copy.accept}
          </button>
        </div>

        {showDetails && (
          <div id="cookie-consent-options" className="cookie-consent__options">
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
                className="cookie-consent__button cookie-consent__button--primary cookie-consent__save"
                onClick={() => commitChoice({ analytics })}
              >
                {copy.save}
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
