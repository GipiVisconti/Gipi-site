import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const translations = {
  IT: {
    nav: {
      home: 'Home',
      books: 'Libri',
      about: 'Chi Sono',
      faq: 'FAQ',
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
   faq: {
  eyebrow: "Domande frequenti",
  title: "Tutto quello che può essere utile sapere",
  subtitle: "Una guida semplice per genitori, insegnanti e piccoli lettori curiosi.",
  highlights: ["3–8 anni", "IT · EN · ES", "prime letture"],
  items: [
    {
      q: "Per chi sono pensati questi libri?",
      a: "Questi libri nascono per bambine e bambini che stanno iniziando a leggere, ma anche per quei momenti belli in cui un adulto legge accanto a loro. Sono pensati per accompagnare i primi passi nella lettura con semplicità, senza fretta e senza far sentire il bambino in difficoltà."
    },
    {
      q: "Cosa significa \"prime letture\"?",
      a: "Significa offrire ai bambini storie che possano davvero affrontare. Frasi brevi, parole chiare, pagine ordinate, un ritmo tranquillo. Quando un libro è costruito bene, leggere non diventa una prova da superare, ma un’esperienza che può dare fiducia e piacere."
    },
    {
      q: "In quali lingue posso trovare i libri?",
      a: "I libri sono disponibili in italiano, inglese e spagnolo. Questa scelta è molto importante per me, perché credo che la lettura debba poter entrare nella vita dei bambini anche attraverso la lingua che sentono più vicina, più familiare, più loro."
    },
    {
      q: "Che tipo di storie raccontano?",
      a: "Racconto biografie semplici di persone reali: figure che hanno fatto qualcosa di importante, che hanno immaginato, costruito, lottato, creato, aiutato. Mi interessa mostrare ai bambini che dietro ogni grande storia c’è sempre un inizio piccolo, umano, vicino a loro."
    },
    {
      q: "Perché proprio delle biografie per bambini?",
      a: "Perché le biografie possono accendere domande profonde in modo semplice. Un bambino scopre che anche una persona straordinaria è stata, prima di tutto, un bambino curioso, timido, coraggioso o pieno di sogni. E forse, leggendo, può sentire che anche il suo cammino conta."
    },
    {
      q: "Sono libri adatti anche a famiglie bilingui o multilingui?",
      a: "Sì, molto. Per molte famiglie la lingua non è una sola, e leggere nella lingua di casa può fare una grande differenza. Può rassicurare, avvicinare, far sentire il bambino accolto. Per questo per me è importante che questi libri possano vivere in più lingue."
    },
    {
      q: "Possono essere usati anche a scuola?",
      a: "Sì, possono trovare spazio anche a scuola, nelle biblioteche, nei percorsi educativi e nei momenti di lettura condivisa. Sono pensati per essere accessibili, chiari e adatti a creare un incontro sereno con la lettura e con storie vere che possono lasciare qualcosa."
    },
    {
      q: "Come sono costruiti i libri?",
      a: "Ogni libro segue un ritmo riconoscibile, perché i bambini si sentono più sicuri quando una storia ha una struttura chiara e familiare. Anche per questo amano ritrovare sempre certi passaggi. Il formato orizzontale è pensato per essere più comodo da tenere in mano, il testo è scritto in nero su sfondo chiaro con un carattere scelto per accompagnare la lettura, e le immagini stanno accanto alle parole per sostenerle senza invaderle."
    },
    {
      q: "Dove posso acquistare i libri?",
      a: "I libri sono disponibili su Amazon. Sul sito puoi conoscere meglio il progetto, scoprire i titoli della collana e trovare i riferimenti per scegliere il libro e la lingua che senti più adatti al tuo bambino o al tuo percorso di lettura."
    },
    {
      q: "Cosa rende speciale questo progetto?",
      a: "Questo progetto nasce da un’idea molto semplice: offrire ai bambini libri che siano davvero leggibili, chiari e accoglienti, senza rinunciare alla forza delle storie vere. Vorrei che ogni libro fosse un piccolo incontro: con una vita straordinaria, con una lingua familiare, con il desiderio di continuare a leggere."
    }
  ]
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
      faq: 'FAQ',
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
    faq: {
  eyebrow: "Frequently Asked Questions",
  title: "Everything that may be helpful to know",
  subtitle: "A simple guide for parents, teachers and curious young readers.",
  highlights: ["Ages 3–8", "IT · EN · ES", "first readers"],
  items: [
    {
      q: "Who are these books for?",
      a: "These books are created for girls and boys who are beginning to read, but also for those lovely moments when an adult reads beside them. They are designed to accompany the first steps into reading with simplicity, without pressure and without making the child feel uneasy."
    },
    {
      q: "What does \"first reading\" mean?",
      a: "It means offering children stories they can genuinely manage. Short sentences, clear words, well-ordered pages and a calm rhythm. When a book is well made, reading does not become a test to pass, but an experience that can bring confidence and pleasure."
    },
    {
      q: "In which languages can I find the books?",
      a: "The books are available in Italian, English and Spanish. This choice is very important to me, because I believe reading should be able to enter children’s lives through the language that feels closest to them, most familiar and most truly theirs."
    },
    {
      q: "What kind of stories do they tell?",
      a: "I write simple biographies of real people: figures who did something meaningful, who imagined, built, struggled, created or helped. What matters to me is showing children that behind every great story there is always a small, human beginning that feels close to them."
    },
    {
      q: "Why biographies for children in particular?",
      a: "Because biographies can spark deep questions in a simple way. A child discovers that even an extraordinary person was, first of all, a curious, shy, brave child or one full of dreams. And perhaps, through reading, they can feel that their own path matters too."
    },
    {
      q: "Are these books also suitable for bilingual or multilingual families?",
      a: "Yes, very much so. For many families, there is not just one language, and reading in the language of home can make a real difference. It can reassure, bring people closer and help the child feel welcomed. That is why it matters to me that these books can live in more than one language."
    },
    {
      q: "Can they also be used at school?",
      a: "Yes, they can also find a place in schools, libraries, educational pathways and shared reading moments. They are designed to be accessible, clear and suitable for creating a calm encounter with reading and with true stories that can leave something behind."
    },
    {
      q: "How are the books structured?",
      a: "Each book follows a familiar rhythm, because children feel more secure when a story has a clear and recognisable structure. That is also why they enjoy finding certain patterns again and again. The landscape format is designed to be easier for little hands to hold, the text is printed in black on a light background using a typeface chosen to support reading, and the illustrations sit beside the words to support them without taking over."
    },
    {
      q: "Where can I buy the books?",
      a: "The books are available on Amazon. On the website you can learn more about the project, discover the titles in the collection and find the information you need to choose the book and language that feel most suitable for your child or for your reading journey."
    },
    {
      q: "What makes this project special?",
      a: "This project comes from a very simple idea: to offer children books that are genuinely readable, clear and welcoming, without giving up the strength of true stories. I would like each book to be a small encounter: with an extraordinary life, with a familiar language and with the desire to keep reading."
    }
  ]
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
      faq: 'FAQ',
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
    faq: {
  eyebrow: "Preguntas frecuentes",
  title: "Todo lo que puede ser útil saber",
  subtitle: "Una guía sencilla para familias, docentes y pequeños lectores curiosos.",
  highlights: ["3–8 años", "IT · EN · ES", "primeras lecturas"],
  items: [
    {
      q: "¿Para quién están pensados estos libros?",
      a: "Estos libros nacen para niñas y niños que están empezando a leer, pero también para esos momentos bonitos en los que un adulto lee a su lado. Están pensados para acompañar los primeros pasos en la lectura con sencillez, sin prisa y sin hacer que el niño se sienta en dificultad."
    },
    {
      q: "¿Qué significa \"primeras lecturas\"?",
      a: "Significa ofrecer a los niños historias que realmente puedan afrontar. Frases cortas, palabras claras, páginas ordenadas y un ritmo tranquilo. Cuando un libro está bien construido, leer no se convierte en una prueba que hay que superar, sino en una experiencia que puede dar confianza y placer."
    },
    {
      q: "¿En qué idiomas puedo encontrar los libros?",
      a: "Los libros están disponibles en italiano, inglés y español. Esta elección es muy importante para mí, porque creo que la lectura debe poder entrar en la vida de los niños también a través de la lengua que sienten más cercana, más familiar, más suya."
    },
    {
      q: "¿Qué tipo de historias cuentan?",
      a: "Cuento biografías sencillas de personas reales: figuras que hicieron algo importante, que imaginaron, construyeron, lucharon, crearon o ayudaron. Me interesa mostrar a los niños que detrás de cada gran historia siempre hay un comienzo pequeño, humano y cercano a ellos."
    },
    {
      q: "¿Por qué precisamente biografías para niños?",
      a: "Porque las biografías pueden despertar preguntas profundas de una manera sencilla. Un niño descubre que incluso una persona extraordinaria fue, antes que nada, un niño curioso, tímido, valiente o lleno de sueños. Y quizá, al leer, pueda sentir que también su propio camino cuenta."
    },
    {
      q: "¿Son libros adecuados también para familias bilingües o multilingües?",
      a: "Sí, mucho. Para muchas familias la lengua no es solo una, y leer en la lengua de casa puede marcar una gran diferencia. Puede tranquilizar, acercar y hacer que el niño se sienta acogido. Por eso para mí es importante que estos libros puedan vivir en varias lenguas."
    },
    {
      q: "¿También pueden usarse en la escuela?",
      a: "Sí, también pueden tener espacio en la escuela, en bibliotecas, en itinerarios educativos y en momentos de lectura compartida. Están pensados para ser accesibles, claros y adecuados para crear un encuentro sereno con la lectura y con historias reales que pueden dejar algo."
    },
    {
      q: "¿Cómo están construidos los libros?",
      a: "Cada libro sigue un ritmo reconocible, porque los niños se sienten más seguros cuando una historia tiene una estructura clara y familiar. También por eso les gusta volver a encontrar ciertos pasos una y otra vez. El formato horizontal está pensado para que sea más fácil de sujetar con sus manos, el texto está escrito en negro sobre un fondo claro con una tipografía elegida para acompañar la lectura, y las imágenes se sitúan al lado de las palabras para sostenerlas sin invadirlas."
    },
    {
      q: "¿Dónde puedo comprar los libros?",
      a: "Los libros están disponibles en Amazon. En la web puedes conocer mejor el proyecto, descubrir los títulos de la colección y encontrar la información necesaria para elegir el libro y la lengua que sientas más adecuados para tu hijo o para tu recorrido de lectura."
    },
    {
      q: "¿Qué hace especial este proyecto?",
      a: "Este proyecto nace de una idea muy sencilla: ofrecer a los niños libros que sean de verdad legibles, claros y acogedores, sin renunciar a la fuerza de las historias reales. Me gustaría que cada libro fuera un pequeño encuentro: con una vida extraordinaria, con una lengua familiar y con el deseo de seguir leyendo."
    }
  ]
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
