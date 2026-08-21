export type Locale = "it" | "en" | "es";

export interface LocaleConfig {
  landingPath: string;
  assetKey: string;
  downloadFilename: string;
  emailSubject: string;
  emailGreeting: (name: string) => string;
  emailThanks: string;
  emailBody: string;
  emailButton: string;
  emailExpiry: string;
  emailFeedback: string;
  emailReply: string;
  emailSignoff: string;
  emailIgnore: string;
  emailCoverAlt: string;
  downloadTitle: string;
  downloadBody: string;
  downloadButton: string;
  downloadExpiredTitle: string;
  downloadExpiredBody: string;
  downloadBack: string;
}

export const LOCALES: Record<Locale, LocaleConfig> = {
  it: {
    landingPath: "/it/libro-gratuito",
    assetKey: "books/it/libro-gratuito-gipi-visconti.pdf",
    downloadFilename: "libro-gratuito-gipi-visconti.pdf",
    emailSubject: "La tua copia digitale di Lionel Messi è pronta",
    emailGreeting: (name) => `Ciao ${name},`,
    emailThanks: "grazie per aver richiesto la tua copia digitale di Lionel Messi!",
    emailBody: "Sono felice di inviarti questo libro, pensato per accompagnare bambine e bambini che stanno iniziando a leggere, attraverso una storia vera raccontata con parole semplici. Spero che questa lettura possa regalare un momento bello da condividere, oppure da vivere in autonomia, pagina dopo pagina.",
    emailButton: "Clicca qui per scaricare il libro",
    emailExpiry: "Il link resterà valido per 72 ore; ti consiglio di scaricare il libro e conservarlo sul tuo dispositivo.",
    emailFeedback: "Se il libro ti piacerà, mi farà molto piacere sapere cosa ne pensi.",
    emailReply: "Se hai domande o vuoi lasciarmi un commento, rispondi liberamente a questa email: sarò felice di leggerti.",
    emailSignoff: "Un caro saluto,",
    emailIgnore: "Se non hai richiesto tu questo libro, puoi ignorare questa email.",
    emailCoverAlt: "Copertina italiana del libro Lionel Messi",
    downloadTitle: "Il tuo libro è pronto",
    downloadBody: "Premi il pulsante per scaricare la versione italiana del libro.",
    downloadButton: "Scarica il libro",
    downloadExpiredTitle: "Il collegamento è scaduto",
    downloadExpiredBody: "Puoi richiedere nuovamente il libro compilando il modulo.",
    downloadBack: "Torna alla pagina del regalo",
  },
  en: {
    landingPath: "/en/free-book",
    assetKey: "books/en/free-book-gipi-visconti.pdf",
    downloadFilename: "free-book-gipi-visconti.pdf",
    emailSubject: "Your digital copy of Lionel Messi is ready",
    emailGreeting: (name) => `Hello ${name},`,
    emailThanks: "thank you for requesting your digital copy of Lionel Messi!",
    emailBody: "I am delighted to send you this book, created for children who are beginning to read through a true story told in clear, engaging language. I hope it offers a lovely moment to share, or to enjoy independently, page after page.",
    emailButton: "Click here to download the book",
    emailExpiry: "The link will remain valid for 72 hours; I recommend downloading the book and saving it to your device.",
    emailFeedback: "If you enjoy the book, I would be very pleased to hear what you think.",
    emailReply: "If you have any questions or would like to share a comment, simply reply to this email: I will be delighted to hear from you.",
    emailSignoff: "Warm regards,",
    emailIgnore: "If you did not request this book, you can ignore this email.",
    emailCoverAlt: "English cover of the Lionel Messi book",
    downloadTitle: "Your book is ready",
    downloadBody: "Use the button to download the English edition of the book.",
    downloadButton: "Download the book",
    downloadExpiredTitle: "This link has expired",
    downloadExpiredBody: "You can request the book again by completing the form.",
    downloadBack: "Return to the gift page",
  },
  es: {
    landingPath: "/es/libro-gratis",
    assetKey: "books/es/libro-gratis-gipi-visconti.pdf",
    downloadFilename: "libro-gratis-gipi-visconti.pdf",
    emailSubject: "Tu copia digital de Lionel Messi ya está lista",
    emailGreeting: (name) => `Hola ${name},`,
    emailThanks: "gracias por solicitar tu copia digital de Lionel Messi.",
    emailBody: "Me alegra enviarte este libro, creado para acompañar a quienes están empezando a leer, a través de una historia real contada con palabras sencillas. Espero que esta lectura pueda ofrecer un bonito momento para compartir, o para disfrutar con autonomía, página a página.",
    emailButton: "Haz clic aquí para descargar el libro",
    emailExpiry: "El enlace permanecerá activo durante 72 horas; te recomiendo descargar el libro y guardarlo en tu dispositivo.",
    emailFeedback: "Si el libro te gusta, me encantará saber qué te ha parecido.",
    emailReply: "Si tienes alguna pregunta o quieres dejarme un comentario, responde con total libertad a este correo: estaré encantada de leerte.",
    emailSignoff: "Un cordial saludo,",
    emailIgnore: "Si no has solicitado este libro, puedes ignorar este correo.",
    emailCoverAlt: "Portada española del libro Lionel Messi",
    downloadTitle: "Tu libro está listo",
    downloadBody: "Pulsa el botón para descargar la versión española del libro.",
    downloadButton: "Descargar el libro",
    downloadExpiredTitle: "El enlace ha caducado",
    downloadExpiredBody: "Puedes solicitar de nuevo el libro completando el formulario.",
    downloadBack: "Volver a la página del regalo",
  },
};

export function isLocale(value: string): value is Locale {
  return value === "it" || value === "en" || value === "es";
}
