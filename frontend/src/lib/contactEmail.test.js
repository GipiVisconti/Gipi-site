import {
  buildContactEmailHref,
  CONTACT_EMAIL_ADDRESS,
  CONTACT_EMAIL_COPY,
} from './contactEmail';

describe('contact email link', () => {
  const expectedCopy = {
    it: {
      subject: 'Un lettore della collana Piccoli Grandi Eroi',
      body: 'Ciao Gipi,\nVorrei avere maggiori informazioni',
    },
    en: {
      subject: 'A reader of the Little Great Heroes series',
      body: 'Hello Gipi,\nI would like some more information.',
    },
    es: {
      subject: 'Un lector de la colección Pequeños Grandes Héroes',
      body: 'Hola, Gipi:\nMe gustaría recibir más información.',
    },
  };

  Object.entries(expectedCopy).forEach(([language, expected]) => {
    it(`preserves the ${language} subject, punctuation and line break`, () => {
      const copy = CONTACT_EMAIL_COPY[language];
      const href = buildContactEmailHref(copy.subject, copy.body);
      const url = new URL(href);

      expect(url.pathname).toBe(CONTACT_EMAIL_ADDRESS);
      expect(url.searchParams.get('subject')).toBe(expected.subject);
      expect(url.searchParams.get('body')).toBe(expected.body);
    });
  });
});
