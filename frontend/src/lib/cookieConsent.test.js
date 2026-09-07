import {
  activateConsent,
  CONSENT_MAX_AGE_MS,
  CONSENT_STORAGE_KEY,
  CONSENT_TEXT_VERSION,
  CONSENT_VERSION,
  createConsentPreference,
  isCurrentConsent,
  needsReloadForRevocation,
  readConsent,
  saveConsent,
} from './cookieConsent';

describe('cookie consent preferences', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.dataLayer = [];
    delete window.__gipiAnalyticsConsentGranted;
    delete window.__gipiConsentDefaultQueued;
    delete window.__gipiLoadTagManager;
    delete window.__gipiTagManagerInitialised;
    delete window.gtag;
    document.getElementById('gipi-google-tag-manager')?.remove();
  });

  test('stores a versioned preference with its language, text version and timestamp', () => {
    const now = new Date('2026-09-05T10:30:00.000Z');
    const preference = saveConsent(
      { analytics: true, language: 'IT' },
      window.localStorage,
      now
    );

    expect(preference).toEqual({
      version: CONSENT_VERSION,
      textVersion: CONSENT_TEXT_VERSION,
      timestamp: now.toISOString(),
      language: 'IT',
      necessary: true,
      analytics: true,
    });
    expect(readConsent(window.localStorage, now.getTime())).toEqual(preference);
  });

  test('ignores a preference saved for an outdated text version', () => {
    const outdated = {
      ...createConsentPreference({
        analytics: true,
        language: 'EN',
      }),
      textVersion: '2026-08-22',
    };
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(outdated));

    expect(isCurrentConsent(outdated)).toBe(false);
    expect(readConsent()).toBeNull();
  });

  test('keeps analytics and advertising storage denied when analytics is rejected', () => {
    const preference = createConsentPreference({
      analytics: false,
      language: 'ES',
    });

    activateConsent(preference);

    expect(Array.from(window.dataLayer[0])).toEqual([
      'consent',
      'default',
      {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      },
    ]);
    expect(Array.from(window.dataLayer[1])).toEqual([
      'consent',
      'update',
      {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      },
    ]);
    expect(document.getElementById('gipi-google-tag-manager')).toBeNull();
  });

  test('emits the analytics event after loading Tag Manager and loads it only once', () => {
    const preference = createConsentPreference({
      analytics: true,
      language: 'IT',
    });

    activateConsent(preference);

    const [defaultConsent, updatedConsent, tagManagerStart, analyticsEvent] = window.dataLayer;
    expect(Array.from(defaultConsent)).toEqual([
      'consent',
      'default',
      {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      },
    ]);
    expect(Array.from(updatedConsent)).toEqual([
      'consent',
      'update',
      {
        analytics_storage: 'granted',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      },
    ]);
    expect(tagManagerStart.event).toBe('gtm.js');
    expect(analyticsEvent.event).toBe('analyticsConsentGranted');

    activateConsent(preference);
    expect(window.dataLayer.filter(({ event }) => event === 'analyticsConsentGranted')).toHaveLength(1);
    expect(window.dataLayer.filter(({ event }) => event === 'gtm.js')).toHaveLength(1);
    expect(document.querySelectorAll('#gipi-google-tag-manager')).toHaveLength(1);
  });

  test('keeps advertising consent denied when analytics is accepted', () => {
    const preference = createConsentPreference({
      analytics: true,
      language: 'EN',
    });

    activateConsent(preference);

    const updatedConsent = Array.from(window.dataLayer[1]);
    expect(updatedConsent).toEqual([
      'consent',
      'update',
      {
        analytics_storage: 'granted',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      },
    ]);
    expect(window.dataLayer[2].event).toBe('gtm.js');
    expect(window.dataLayer[3].event).toBe('analyticsConsentGranted');
  });

  test('invalidates preferences after 390 days', () => {
    const now = new Date('2027-10-01T12:00:00.000Z').getTime();
    const validPreference = createConsentPreference(
      { analytics: true, language: 'IT' },
      new Date(now - CONSENT_MAX_AGE_MS + 1)
    );
    const expiredPreference = {
      ...validPreference,
      timestamp: new Date(now - CONSENT_MAX_AGE_MS).toISOString(),
    };

    expect(isCurrentConsent(validPreference, now)).toBe(true);
    expect(isCurrentConsent(expiredPreference, now)).toBe(false);

    window.localStorage.setItem(
      CONSENT_STORAGE_KEY,
      JSON.stringify(expiredPreference)
    );
    expect(readConsent(window.localStorage, now)).toBeNull();
    expect(window.localStorage.getItem(CONSENT_STORAGE_KEY)).toBeNull();
  });

  test('removes malformed stored preferences', () => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, '{not-json');

    expect(readConsent()).toBeNull();
    expect(window.localStorage.getItem(CONSENT_STORAGE_KEY)).toBeNull();
  });

  test('rejects malformed or future timestamps', () => {
    const now = new Date('2026-09-05T12:00:00.000Z').getTime();
    const preference = createConsentPreference(
      { analytics: false, language: 'IT' },
      new Date(now)
    );

    expect(isCurrentConsent({ ...preference, timestamp: 'not-a-date' }, now)).toBe(false);
    expect(isCurrentConsent({ ...preference, timestamp: new Date(now + 1).toISOString() }, now)).toBe(false);
  });

  test('requires a reload only when a previously granted category is revoked', () => {
    const previous = createConsentPreference({
      analytics: true,
      language: 'IT',
    });
    const analyticsRevoked = createConsentPreference({
      analytics: false,
      language: 'IT',
    });
    const unchanged = createConsentPreference({
      analytics: true,
      language: 'IT',
    });

    expect(needsReloadForRevocation(previous, analyticsRevoked)).toBe(true);
    expect(needsReloadForRevocation(previous, unchanged)).toBe(false);
    expect(needsReloadForRevocation(null, analyticsRevoked)).toBe(false);
  });
});
