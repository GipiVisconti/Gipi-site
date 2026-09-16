export const CONSENT_STORAGE_KEY = 'gipi_cookie_consent';
export const CONSENT_VERSION = 4;
export const CONSENT_TEXT_VERSION = '2026-09-16.1';
export const CONSENT_MAX_AGE_MS = 180 * 24 * 60 * 60 * 1000;
export const GTM_CONTAINER_ID = 'GTM-M4HRN5J8';
export const COOKIE_SETTINGS_EVENT = 'gipi:open-cookie-settings';

const GTM_SCRIPT_ID = 'gipi-google-tag-manager';
const LANGUAGES = new Set(['IT', 'EN', 'ES']);
const DENIED_CONSENT = {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
};

export const isCurrentConsent = (preference, now = Date.now()) => {
  const timestamp = Date.parse(preference?.timestamp);
  const age = now - timestamp;

  return Boolean(
    preference &&
      preference.version === CONSENT_VERSION &&
      preference.textVersion === CONSENT_TEXT_VERSION &&
      preference.necessary === true &&
      LANGUAGES.has(preference.language) &&
      typeof preference.analytics === 'boolean' &&
      Number.isFinite(timestamp) &&
      age >= 0 &&
      age < CONSENT_MAX_AGE_MS
  );
};

const browserStorages = () => {
  if (typeof window === 'undefined') return [];

  return ['localStorage', 'sessionStorage'].flatMap((name) => {
    try {
      return window[name] ? [window[name]] : [];
    } catch {
      return [];
    }
  });
};

const candidateStorages = (storage) => (
  storage === undefined ? browserStorages() : storage ? [storage] : []
);

export const readConsent = (storage, now = Date.now()) => {
  for (const candidate of candidateStorages(storage)) {
    try {
      const rawPreference = candidate.getItem(CONSENT_STORAGE_KEY);
      if (!rawPreference) continue;

      const preference = JSON.parse(rawPreference);
      if (isCurrentConsent(preference, now)) return preference;
      candidate.removeItem(CONSENT_STORAGE_KEY);
    } catch {
      try {
        candidate.removeItem(CONSENT_STORAGE_KEY);
      } catch {
        // Storage can be unavailable in restricted browser contexts.
      }
    }
  }

  return null;
};

export const createConsentPreference = ({ analytics, language }, now = new Date()) => ({
  version: CONSENT_VERSION,
  textVersion: CONSENT_TEXT_VERSION,
  timestamp: now.toISOString(),
  language,
  necessary: true,
  analytics: Boolean(analytics),
});

export const saveConsent = (
  choices,
  storage,
  now = new Date()
) => {
  const preference = createConsentPreference(choices, now);
  let lastError;

  for (const candidate of candidateStorages(storage)) {
    try {
      candidate.setItem(CONSENT_STORAGE_KEY, JSON.stringify(preference));
      window.__gipiConsent = preference;
      return preference;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error('consent-storage-unavailable');
};

export const needsReloadForRevocation = (previous, next) =>
  Boolean(previous && previous.analytics && !next.analytics);

const pushGrantedEvents = (preference) => {
  window.dataLayer = window.dataLayer || [];

  if (preference.analytics && !window.__gipiAnalyticsConsentGranted) {
    window.dataLayer.push({ event: 'analyticsConsentGranted' });
    window.__gipiAnalyticsConsentGranted = true;
  }
};

const queueConsentMode = (preference, includeDefault) => {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments);
  };

  if (includeDefault) {
    window.gtag('consent', 'default', DENIED_CONSENT);
    window.__gipiConsentDefaultQueued = true;
  }

  window.gtag('consent', 'update', {
    analytics_storage: preference.analytics ? 'granted' : 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
};

export const removeAnalyticsCookies = () => {
  if (typeof document === 'undefined') return;

  const host = window.location.hostname;
  const domains = ['', host, `.${host}`, '.gipivisconti.com'];
  const names = document.cookie
    .split(';')
    .map((cookie) => cookie.split('=')[0].trim())
    .filter((name) => name === '_ga' || name.startsWith('_ga_'));

  names.forEach((name) => {
    domains.forEach((domain) => {
      const domainAttribute = domain ? `; domain=${domain}` : '';
      document.cookie = `${name}=; Max-Age=0; path=/${domainAttribute}; SameSite=Lax`;
    });
  });
};

export const revokeAnalytics = () => {
  queueConsentMode({ analytics: false }, !window.__gipiConsentDefaultQueued);
  window.__gipiAnalyticsConsentGranted = false;
  removeAnalyticsCookies();
};

const loadTagManager = () => {
  if (window.__gipiLoadTagManager) {
    window.__gipiLoadTagManager();
    return;
  }

  if (document.getElementById(GTM_SCRIPT_ID)) return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js',
  });
  window.__gipiTagManagerInitialised = true;

  const script = document.createElement('script');
  script.async = true;
  script.id = GTM_SCRIPT_ID;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_CONTAINER_ID}`;
  document.head.appendChild(script);
};

export const activateConsent = (preference) => {
  queueConsentMode(preference, !window.__gipiConsentDefaultQueued);
  window.__gipiConsent = preference;

  if (preference.analytics) {
    loadTagManager();
    pushGrantedEvents(preference);
  } else {
    window.__gipiAnalyticsConsentGranted = false;
  }
};

export const openCookieSettings = () => {
  window.dispatchEvent(new CustomEvent(COOKIE_SETTINGS_EVENT, {
    detail: { opener: document.activeElement },
  }));
};
