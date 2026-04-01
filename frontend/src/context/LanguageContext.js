import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const translations = {
  IT: {
    nav: {
      home: 'Home',
      books: 'Libri',
      about: 'Chi Sono',
      blog: 'Blog',
      contact: 'Regalo',
    },
    hero: {
      greeting: 'Ciao, sono',
      role: 'Autrice & Illustratrice',
      subtitle: 'Creo libri illustrati per bambini che iniziano a leggere',
      cta: 'Scopri i Libri',
      ctaSecondary: 'Chi Sono',
    },
    books: {
      title: 'Piccoli Grandi Eroi',
      subtitle: 'Biografie illustrate multilingue per bambine e bambini dai 3 agli 8 anni',
      buyOnAmazon: 'Acquista su Amazon',
      collection: 'La Collana',
    },
    about: {
      title: 'Chi Sono',
      quote: 'Un piccolo ponte tra storie vere e nuovi lettori',
      bio: `Mi chiamo Gipi Visconti: sono un'autrice e illustratrice italiana e vivo in Spagna. Scrivo libri illustrati per l'infanzia con un'attenzione speciale ai lettori principianti, unendo testo e narrazione visiva per rendere la lettura serena, accessibile e naturale.

Ho iniziato a scrivere questi libri per mio figlio, con il desiderio di aiutarlo ad avvicinarsi alle parole senza pressione; da quell'esigenza personale è nato un progetto editoriale più ampio, pensato per accompagnare e sostenere tutti i bambini che stanno imparando a leggere.

Sono l'ideatrice della collana Piccoli Grandi Eroi, una serie di biografie illustrate multilingue per bambine e bambini dai 3 agli 8 anni. Racconto storie vere di persone straordinarie, scritte da me con un linguaggio semplice e chiaro, adatto a chi inizia a leggere in autonomia: parole essenziali ma mai povere, capaci di agganciare la curiosità e trasformare la lettura in un piacere, non in un dovere.

Invece di elencare successi e date, ogni storia segue un filo emotivo pulito: pochi momenti chiave che mostrano come curiosità, impegno, disciplina e gentilezza possano dare forma a una vita e diventare valori che restano.

Lavoro sulla composizione, sul ritmo e sull'uso dello spazio, creando pagine calme, leggibili e non sovraccariche, pensate per favorire la concentrazione. Ho realizzato decine di libri in italiano, spagnolo e inglese, e queste pagine hanno aiutato e continuano ad aiutare tantissimi bambini a imparare a leggere con più sicurezza, un passo alla volta.

Piccoli Grandi Eroi è un progetto aperto e in continua crescita: un piccolo ponte tra storie vere e nuovi lettori.`,
    },
    blog: {
      title: 'News & Aggiornamenti',
      subtitle: 'Scopri le ultime novità sui miei libri e progetti',
      readMore: 'Leggi di più',
      noArticles: 'Nessun articolo ancora. Torna presto!',
    },
    contact: {
      title: 'Prova un libro',
      subtitle: 'Se desideri far leggere subito al tuo piccolo aspirante lettore un\'esclusiva biografia offerta gratuitamente da Gipi, puoi inserire qui i tuoi dati:',
      name: 'Nome',
      email: 'Email',
      birthday: 'Compleanno',
      send: 'Iscrivimi',
      success: 'Iscrizione completata con successo!',
      error: 'Errore nell\'iscrizione. Riprova.',
      namePlaceholder: 'Il tuo nome',
      emailPlaceholder: 'la.tua@email.com',
      birthdayPlaceholder: 'Data di nascita',
      consent: 'Accetto le Condizioni Generali e di ricevere la newsletter. Puoi annullare l’iscrizione in qualsiasi momento tramite il link presente nelle email.',
      },
      footer: {
      rights: 'Tutti i diritti riservati',
      madeWith: 'Fatto con',
      forChildren: 'per i piccoli lettori',
    },
  },
  EN: {
    nav: {
      home: 'Home',
      books: 'Books',
      about: 'About Me',
      blog: 'Blog',
      contact: 'Gift',
    },
    hero: {
      greeting: 'Hello, I\'m',
      role: 'Author & Illustrator',
      subtitle: 'I create illustrated books for children learning to read',
      cta: 'Discover the Books',
      ctaSecondary: 'About Me',
    },
    books: {
      title: 'Little Great Heroes',
      subtitle: 'Multilingual illustrated biographies for children aged 3 to 8',
      buyOnAmazon: 'Buy on Amazon',
      collection: 'The Collection',
    },
    about: {
      title: 'About Me',
      quote: 'A small bridge between true stories and new readers',
      bio: `My name is Gipi Visconti. I'm an Italian author and illustrator living in Spain. I create illustrated children's books with a special focus on beginner readers, blending text and visual storytelling to make reading feel calm, accessible and natural.

I first began writing these books for my son, hoping to help him approach words without pressure; from that personal need grew a wider publishing project, designed to support and guide all children who are learning to read.

I'm the creator of the Little Great Heroes series, a collection of multilingual illustrated biographies for children aged 3 to 8. I tell true stories about extraordinary people, written by me in clear, simple language for those starting to read independently: words that are pared back but never bland, able to spark curiosity and turn reading into a pleasure rather than a chore.

Instead of listing dates and achievements, each story follows a clean emotional thread — a handful of key moments that show how curiosity, commitment, discipline and kindness can shape a life and become values that stay with us.

I work carefully on composition, rhythm and the use of space, creating pages that are calm, readable and never overcrowded, designed to support concentration. I have produced dozens of books in Italian, Spanish and English, and these pages have helped and continue to help countless children learn to read with greater confidence, one step at a time.

Little Great Heroes is an open project, constantly growing: a small bridge between true stories and new readers.`,
    },
    blog: {
      title: 'News & Updates',
      subtitle: 'Discover the latest news about my books and projects',
      readMore: 'Read more',
      noArticles: 'No articles yet. Come back soon!',
    },
    contact: {
      title: 'Try a book',
      subtitle: 'If you want your little aspiring reader to start reading an exclusive biography offered for free by Gipi, you can enter your details here:',
      name: 'Name',
      email: 'Email',
      birthday: 'Birthday',
      send: 'Sign me up',
      success: 'Successfully subscribed!',
      error: 'Error subscribing. Please try again.',
      namePlaceholder: 'Your name',
      emailPlaceholder: 'your@email.com',
      birthdayPlaceholder: 'Date of birth',
      consent: 'I accept the Terms and Conditions and agree to receive the newsletter. You can unsubscribe at any time through the link included in the emails.',
    },
    footer: {
      rights: 'All rights reserved',
      madeWith: 'Made with',
      forChildren: 'for little readers',
    },
  },
  ES: {
    nav: {
      home: 'Inicio',
      books: 'Libros',
      about: 'Sobre Mí',
      blog: 'Blog',
      contact: 'Regalito',
    },
    hero: {
      greeting: 'Hola, soy',
      role: 'Autora e Ilustradora',
      subtitle: 'Creo libros ilustrados para niños que empiezan a leer',
      cta: 'Descubre los Libros',
      ctaSecondary: 'Sobre Mí',
    },
    books: {
      title: 'Pequeños Grandes Valientes',
      subtitle: 'Biografías ilustradas multilingües para niños de 3 a 8 años',
      buyOnAmazon: 'Comprar en Amazon',
      collection: 'La Colección',
    },
    about: {
      title: 'Sobre Mí',
      quote: 'Un pequeño puente entre historias reales y nuevos lectores',
      bio: `Me llamo Gipi Visconti. Soy autora e ilustradora italiana y vivo en España. Creo libros ilustrados para la infancia con una atención especial a los lectores principiantes, combinando texto y narración visual para que la lectura se sienta tranquila, accesible y natural.

Empecé a escribir estos libros para mi hijo, con la intención de ayudarle a acercarse a las palabras sin presión; de esa necesidad personal nació un proyecto editorial más amplio, pensado para acompañar y apoyar a todos los niños y niñas que están aprendiendo a leer.

Soy la creadora de la colección Pequeños Grandes Valientes, una serie de biografías ilustradas multilingües para niños y niñas de 3 a 8 años. Cuento historias reales de personas extraordinarias, escritas por mí con un lenguaje claro y sencillo, adecuado para quienes empiezan a leer de forma autónoma: palabras esenciales, pero nunca pobres, capaces de despertar la curiosidad y convertir la lectura en un placer y no en una obligación.

En lugar de enumerar fechas y logros, cada historia sigue un hilo emocional limpio: unos pocos momentos clave que muestran cómo la curiosidad, el esfuerzo, la disciplina o la amabilidad pueden dar forma a una vida y convertirse en valores que permanecen.

Trabajo con cuidado la composición, el ritmo y el uso del espacio, creando páginas serenas, legibles y nada recargadas, pensadas para favorecer la concentración. He realizado decenas de libros en italiano, español e inglés, y estas páginas han ayudado y siguen ayudando a muchísimos niños y niñas a aprender a leer con más confianza, paso a paso.

Pequeños Grandes Valientes es un proyecto abierto y en constante crecimiento: un pequeño puente entre historias reales y nuevos lectores.`,
    },
    blog: {
      title: 'Noticias y Novedades',
      subtitle: 'Descubre las últimas novedades sobre mis libros y proyectos',
      readMore: 'Leer más',
      noArticles: 'Aún no hay artículos. ¡Vuelve pronto!',
    },
    contact: {
      title: 'Prueba un libro',
      subtitle: 'Si deseas que tu pequeño aspirante a lector empiece a leer una biografía exclusiva ofrecida gratuitamente por Gipi, puedes ingresar tus datos aquí:',
      name: 'Nombre',
      email: 'Email',
      birthday: 'Cumpleaños',
      send: 'Inscríbete',
      success: '¡Suscripción completada con éxito!',
      error: 'Error en la suscripción. Inténtalo de nuevo.',
      namePlaceholder: 'Tu nombre',
      emailPlaceholder: 'tu@email.com',
      birthdayPlaceholder: 'Fecha de nacimiento',
      consent: 'Acepto las Condiciones Generales y recibir la newsletter. Puedes darte de baja en cualquier momento mediante el enlace presente en los correos electrónicos.',
    },
    footer: {
      rights: 'Todos los derechos reservados',
      madeWith: 'Hecho con',
      forChildren: 'para pequeños lectores',
    },
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('IT');
  
  const t = translations[language];
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
