export const CONTACT_EMAIL_ADDRESS = 'info@gipivisconti.com';

export const CONTACT_EMAIL_COPY = {
  it: {
    subject: 'Un lettore della collana Piccoli Grandi Eroi',
    body: 'Ciao Gipi,\nVorrei avere maggiori informazioni',
    ariaLabel: 'Scrivi a Gipi',
  },
  en: {
    subject: 'A reader of the Little Great Heroes series',
    body: 'Hello Gipi,\nI would like some more information.',
    ariaLabel: 'Write to Gipi',
  },
  es: {
    subject: 'Un lector de la colección Pequeños Grandes Héroes',
    body: 'Hola, Gipi:\nMe gustaría recibir más información.',
    ariaLabel: 'Escribe a Gipi',
  },
};

export const buildContactEmailHref = (subject, body) =>
  `mailto:${CONTACT_EMAIL_ADDRESS}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
