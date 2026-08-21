import { giftLanguageForPath, giftPathForLanguage } from './gift';

describe('localized gift routes', () => {
  test('returns the route for the selected language', () => {
    expect(giftPathForLanguage('IT')).toBe('/it/libro-gratuito');
    expect(giftPathForLanguage('EN')).toBe('/en/free-book');
    expect(giftPathForLanguage('ES')).toBe('/es/libro-gratis');
  });

  test('recognises gift routes with or without a trailing slash', () => {
    expect(giftLanguageForPath('/es/libro-gratis')).toBe('ES');
    expect(giftLanguageForPath('/es/libro-gratis/')).toBe('ES');
  });
});
