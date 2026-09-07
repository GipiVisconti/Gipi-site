export const CONSENT_STORAGE_KEY = 'gipi_cookie_consent';
export const CONSENT_VERSION = 3;
export const CONSENT_TEXT_VERSION = '2026-09-07.1';
export const CONSENT_MAX_AGE_MS = 390 * 24 * 60 * 60 * 1000;
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

export const readConsent = (storage = window.localStorage, now = Date.now()) => {
  try {
    const preference = JSON.parse(storage.getItem(CONSENT_STORAGE_KEY));
    if (isCurrentConsent(preference, now)) return preference;

    storage.removeItem(CONSENT_STORAGE_KEY);
    return null;
  } catch {
    try {
      storage.removeItem(CONSENT_STORAGE_KEY);
    } catch {
      // Storage can be unavailable in restricted browser contexts.
    }
    return null;
  }
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
  storage = window.localStorage,
  now = new Date()
) => {
  const preference = createConsentPreference(choices, now);
  storage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(preference));
  return preference;
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

  if (preference.analytics) {
    loadTagManager();
    pushGrantedEvents(preference);
  }
};

export const openCookieSettings = () => {
  window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT));
};
