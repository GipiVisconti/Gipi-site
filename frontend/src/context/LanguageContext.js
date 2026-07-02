import { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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
      q: "Cos’è la scheda didattica?",
      a: "La scheda didattica è un piccolo materiale pensato per accompagnare la lettura in modo semplice. Include un’immagine in bianco e nero da colorare e tre brevi domande che aiutano il bambino a ricordare ciò che ha letto."
    },
    {
      q: "A chi è rivolta la scheda didattica?",
      a: "È pensata per genitori, educatori e insegnanti. Può essere usata dopo la lettura per colorare, leggere ad alta voce le domande e lasciare che il bambino risponda, a voce o per iscritto, secondo la sua età."
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
      types: {
        character: 'Personaggio',
        advice: 'Consigli',
        project: 'Il Progetto',
      },
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
      consent: {
        prefix: 'Accetto le ',
        linkText: 'Condizioni Generali',
        suffix: ' e di ricevere la newsletter. Puoi annullare l’iscrizione in qualsiasi momento tramite il link presente nelle email.',
      },
      },
      footer: {
      rights: 'Tutti i diritti riservati',
      madeWith: 'Fatto con',
      forChildren: 'per i piccoli lettori',
      siteTitle: 'Sito',
      privacyPolicy: 'Privacy Policy',
    },
    privacy: {
      eyebrow: 'Informativa legale',
      title: 'Privacy Policy',
      lastUpdated: 'Ultimo aggiornamento: 2 luglio 2026',
      intro: 'La presente informativa descrive le modalità con cui vengono trattati i dati personali raccolti attraverso il sito gipivisconti.com, in particolare tramite il modulo di iscrizione alla newsletter disponibile nella sezione Regalo. Il trattamento avviene nel rispetto del Regolamento (UE) 2016/679 (GDPR) e della normativa applicabile in materia di protezione dei dati personali.',
      sections: [
        {
          heading: '1. Titolare del trattamento',
          body: 'Il Titolare del trattamento dei dati personali raccolti attraverso questo sito è Gipi Visconti, autrice e ideatrice della collana Piccoli Grandi Eroi. Per qualsiasi richiesta relativa al trattamento dei dati personali è possibile scrivere all\'indirizzo email info@gipivisconti.com.',
        },
        {
          heading: '2. Dati raccolti',
          body: 'Attraverso il modulo presente nella sezione Regalo vengono raccolti il nome del bambino o della bambina, l\'indirizzo email del genitore o del tutore che effettua l\'iscrizione e la data di nascita del bambino o della bambina. Questi dati vengono forniti volontariamente dal genitore o dal tutore al momento della compilazione del modulo. Il sito raccoglie inoltre, in forma automatica, alcuni dati tecnici di navigazione, come l\'indirizzo IP, il tipo di browser e le pagine visitate, attraverso i normali log di funzionamento del server e strumenti di terze parti eventualmente utilizzati.',
        },
        {
          heading: '3. Finalità del trattamento',
          body: 'I dati raccolti vengono utilizzati per inviare la biografia illustrata offerta gratuitamente e richiesta tramite il modulo, per iscrivere l\'indirizzo email alla newsletter di Gipi Visconti, attraverso la quale vengono comunicati aggiornamenti sui libri e sui progetti della collana Piccoli Grandi Eroi, e per personalizzare, dove previsto, i contenuti inviati in base all\'età del bambino o della bambina indicata in fase di iscrizione.',
        },
        {
          heading: '4. Base giuridica',
          body: 'Il trattamento dei dati è basato sul consenso esplicito prestato dal genitore o dal tutore al momento della compilazione del modulo, ai sensi dell\'articolo 6, paragrafo 1, lettera a) del GDPR. Il consenso può essere revocato in qualsiasi momento, senza pregiudicare la liceità del trattamento effettuato prima della revoca.',
        },
        {
          heading: '5. Dati relativi ai minori',
          body: 'Il modulo di iscrizione richiede la data di nascita del bambino o della bambina a cui è destinata la biografia illustrata offerta gratuitamente. Questo dato viene fornito e il relativo trattamento viene autorizzato esclusivamente dal genitore o dal tutore legale del minore, che dichiara di avere titolo per farlo al momento dell\'iscrizione. Gipi Visconti non raccoglie autonomamente dati relativi a minori né si rivolge direttamente a bambini attraverso il modulo di iscrizione.',
        },
        {
          heading: '6. Conservazione dei dati',
          body: 'I dati raccolti vengono conservati per tutta la durata dell\'iscrizione alla newsletter, fino a quando l\'interessato non richiede la cancellazione o revoca il proprio consenso. In assenza di revoca, i dati vengono comunque sottoposti a verifica periodica e cancellati qualora non risultino più necessari rispetto alle finalità per cui sono stati raccolti, salvi eventuali obblighi di conservazione previsti dalla legge.',
        },
        {
          heading: '7. Modalità di trattamento e destinatari dei dati',
          body: 'I dati personali vengono trattati con strumenti informatici e conservati su piattaforme di terze parti utilizzate per la gestione della newsletter e l\'invio delle comunicazioni via email, in qualità di responsabili del trattamento nominati ai sensi dell\'articolo 28 del GDPR. Tali piattaforme possono avere sede all\'interno dello Spazio Economico Europeo o garantire comunque un livello di protezione adeguato dei dati anche in caso di trasferimento verso paesi terzi, in conformità con quanto previsto dal GDPR. I dati non vengono venduti, ceduti o comunicati a terzi per finalità di marketing diverse da quelle indicate nella presente informativa.',
        },
        {
          heading: '8. Cookie e tecnologie simili',
          body: 'Al momento della pubblicazione, questo sito non utilizza cookie di profilazione né cookie di analisi di terze parti. Vengono utilizzati solo cookie tecnici strettamente necessari al funzionamento del sito. Qualora questa situazione dovesse cambiare in futuro, verranno introdotti un apposito banner e una specifica cookie policy.',
        },
        {
          heading: '9. Diritti dell\'interessato',
          body: 'In qualità di interessato, il genitore o il tutore che ha fornito i dati ha diritto di accedere ai dati personali che lo riguardano e a quelli del minore, richiederne la rettifica o l\'aggiornamento, richiederne la cancellazione, opporsi al trattamento o richiederne la limitazione, richiedere la portabilità dei dati quando applicabile, e revocare in qualsiasi momento il consenso prestato, senza che questo pregiudichi la liceità del trattamento svolto prima della revoca. Questi diritti possono essere esercitati in qualsiasi momento scrivendo all\'indirizzo email info@gipivisconti.com, oppure utilizzando il link di cancellazione presente in ciascuna email della newsletter. È inoltre possibile proporre reclamo all\'Autorità di controllo per la protezione dei dati personali del proprio paese di residenza.',
        },
        {
          heading: '10. Sicurezza dei dati',
          body: 'Vengono adottate misure tecniche e organizzative adeguate a proteggere i dati personali da accessi non autorizzati, perdita, distruzione o divulgazione non consentita, in conformità con quanto previsto dal GDPR.',
        },
        {
          heading: '11. Modifiche alla presente informativa',
          body: 'La presente informativa può essere aggiornata nel tempo, ad esempio in seguito a modifiche normative o a cambiamenti nelle modalità di trattamento dei dati. Eventuali modifiche saranno pubblicate su questa pagina, con indicazione della data di ultimo aggiornamento.',
        },
        {
          heading: '12. Contatti',
          body: 'Per qualsiasi domanda relativa alla presente informativa o al trattamento dei dati personali è possibile scrivere a info@gipivisconti.com.',
        },
      ],
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
      q: "What is the educational worksheet?",
      a: "The educational worksheet is a small resource designed to accompany reading in a simple way. It includes a black-and-white picture to colour in and three short questions that help the child remember what they have read."    
    },
    {
      q: "Who is the educational worksheet for?",
      a: "It is designed for parents, educators and teachers. It can be used after reading to colour in, read the questions aloud and allow the child to answer, either orally or in writing, according to their age."
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
      types: {
        character: 'Character',
        advice: 'Advice',
        project: 'The Project',
      },
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
      consent: {
        prefix: 'I accept the ',
        linkText: 'Terms and Conditions',
        suffix: ' and agree to receive the newsletter. You can unsubscribe at any time through the link included in the emails.',
      },
    },
    footer: {
      rights: 'All rights reserved',
      madeWith: 'Made with',
      forChildren: 'for little readers',
      siteTitle: 'Site',
      privacyPolicy: 'Privacy Policy',
    },
    privacy: {
      eyebrow: 'Legal information',
      title: 'Privacy Policy',
      lastUpdated: 'Last updated: 2 July 2026',
      intro: 'This Privacy Policy explains how personal data collected through the website gipivisconti.com is processed, in particular through the newsletter sign-up form available in the Gift section. Processing is carried out in compliance with Regulation (EU) 2016/679 (GDPR) and any other applicable data protection law.',
      sections: [
        {
          heading: '1. Data Controller',
          body: 'The Data Controller for the personal data collected through this website is Gipi Visconti, author and creator of the Little Great Heroes series. For any request concerning the processing of personal data, you can write to info@gipivisconti.com.',
        },
        {
          heading: '2. Data collected',
          body: 'Through the form available in the Gift section, the following data is collected: the child\'s name, the email address of the parent or legal guardian completing the form, and the child\'s date of birth. This data is provided voluntarily by the parent or legal guardian when filling in the form. The website also automatically collects some technical browsing data, such as the IP address, browser type and pages visited, through standard server logs and any third-party tools that may be used.',
        },
        {
          heading: '3. Purpose of processing',
          body: 'The data collected is used to send the illustrated biography offered free of charge and requested through the form, to subscribe the email address to the Gipi Visconti newsletter, through which updates on the books and on the Little Great Heroes series are shared, and to personalise, where applicable, the content sent based on the age of the child indicated at sign-up.',
        },
        {
          heading: '4. Legal basis',
          body: 'Processing is based on the explicit consent given by the parent or legal guardian when completing the form, pursuant to Article 6(1)(a) of the GDPR. Consent can be withdrawn at any time, without affecting the lawfulness of processing carried out before withdrawal.',
        },
        {
          heading: '5. Data relating to minors',
          body: 'The sign-up form requests the date of birth of the child for whom the free illustrated biography is intended. This data is provided, and its processing is authorised, exclusively by the parent or legal guardian of the child, who confirms having the authority to do so at the time of sign-up. Gipi Visconti does not independently collect data relating to minors, nor does it address children directly through the sign-up form.',
        },
        {
          heading: '6. Data retention',
          body: 'The data collected is kept for as long as the newsletter subscription remains active, until the data subject requests its deletion or withdraws consent. In the absence of a withdrawal request, the data is nonetheless reviewed periodically and deleted where no longer necessary for the purposes for which it was collected, subject to any retention obligations required by law.',
        },
        {
          heading: '7. Processing methods and data recipients',
          body: 'Personal data is processed using electronic tools and stored on third-party platforms used to manage the newsletter and send email communications, acting as data processors appointed pursuant to Article 28 of the GDPR. These platforms may be based within the European Economic Area or otherwise guarantee an adequate level of data protection in the event of transfer to third countries, in accordance with the GDPR. Data is not sold, shared or disclosed to third parties for marketing purposes other than those described in this Privacy Policy.',
        },
        {
          heading: '8. Cookies and similar technologies',
          body: 'At the time of publication, this website does not use profiling cookies or third-party analytics cookies. Only technical cookies strictly necessary for the website to function may be used. Should this change in the future, a dedicated cookie banner and a specific cookie policy will be introduced.',
        },
        {
          heading: '9. Rights of the data subject',
          body: 'As the data subject, the parent or legal guardian who provided the data has the right to access the personal data concerning them and the child, to request its rectification or update, to request its deletion, to object to processing or request its restriction, to request data portability where applicable, and to withdraw consent at any time, without affecting the lawfulness of processing carried out before withdrawal. These rights can be exercised at any time by writing to info@gipivisconti.com, or by using the unsubscribe link included in every newsletter email. A complaint can also be lodged with the data protection supervisory authority of your country of residence.',
        },
        {
          heading: '10. Data security',
          body: 'Appropriate technical and organisational measures are adopted to protect personal data from unauthorised access, loss, destruction or unlawful disclosure, in accordance with the GDPR.',
        },
        {
          heading: '11. Changes to this Privacy Policy',
          body: 'This Privacy Policy may be updated over time, for example following regulatory changes or changes in data processing practices. Any changes will be published on this page, along with the date of the last update.',
        },
        {
          heading: '12. Contact',
          body: 'For any question regarding this Privacy Policy or the processing of personal data, please write to info@gipivisconti.com.',
        },
      ],
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
      q: "¿Qué es la ficha didáctica?",
      a: "La ficha didáctica es un pequeño material pensado para acompañar la lectura de forma sencilla. Incluye una imagen en blanco y negro para colorear y tres preguntas breves que ayudan al niño a recordar lo que ha leído."
    },
    {
      q: "¿A quién va dirigida la ficha didáctica?",
      a: "Está pensada para padres, educadores y docentes. Puede utilizarse después de la lectura para colorear, leer las preguntas en voz alta y dejar que el niño responda, de forma oral o por escrito, según su edad."
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
      types: {
        character: 'Personaje',
        advice: 'Consejos',
        project: 'El Proyecto',
      },
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
      consent: {
        prefix: 'Acepto las ',
        linkText: 'Condiciones Generales',
        suffix: ' y recibir la newsletter. Puedes darte de baja en cualquier momento mediante el enlace presente en los correos electrónicos.',
      },
    },
    footer: {
      rights: 'Todos los derechos reservados',
      madeWith: 'Hecho con',
      forChildren: 'para pequeños lectores',
      siteTitle: 'Sitio',
      privacyPolicy: 'Política de Privacidad',
    },
    privacy: {
      eyebrow: 'Información legal',
      title: 'Política de Privacidad',
      lastUpdated: 'Última actualización: 2 de julio de 2026',
      intro: 'Esta Política de Privacidad explica cómo se tratan los datos personales recogidos a través del sitio web gipivisconti.com, en particular mediante el formulario de suscripción a la newsletter disponible en la sección Regalito. El tratamiento se realiza de conformidad con el Reglamento (UE) 2016/679 (RGPD) y con la normativa aplicable en materia de protección de datos.',
      sections: [
        {
          heading: '1. Responsable del tratamiento',
          body: 'La responsable del tratamiento de los datos personales recogidos a través de este sitio web es Gipi Visconti, autora y creadora de la colección Pequeños Grandes Valientes. Para cualquier solicitud relacionada con el tratamiento de datos personales, puedes escribir a info@gipivisconti.com.',
        },
        {
          heading: '2. Datos recogidos',
          body: 'A través del formulario disponible en la sección Regalito se recogen el nombre del niño o de la niña, la dirección de email del padre, madre o tutor legal que realiza la suscripción, y la fecha de nacimiento del niño o de la niña. Estos datos son proporcionados voluntariamente por el padre, madre o tutor legal al completar el formulario. El sitio web también recoge de forma automática algunos datos técnicos de navegación, como la dirección IP, el tipo de navegador y las páginas visitadas, a través de los registros habituales del servidor y de posibles herramientas de terceros utilizadas.',
        },
        {
          heading: '3. Finalidad del tratamiento',
          body: 'Los datos recogidos se utilizan para enviar la biografía ilustrada ofrecida de forma gratuita y solicitada a través del formulario, para suscribir la dirección de email a la newsletter de Gipi Visconti, a través de la cual se comunican novedades sobre los libros y sobre los proyectos de la colección Pequeños Grandes Valientes, y para personalizar, cuando corresponda, los contenidos enviados en función de la edad del niño o de la niña indicada en el momento de la suscripción.',
        },
        {
          heading: '4. Base jurídica',
          body: 'El tratamiento de los datos se basa en el consentimiento explícito prestado por el padre, madre o tutor legal al completar el formulario, de conformidad con el artículo 6, apartado 1, letra a) del RGPD. El consentimiento puede revocarse en cualquier momento, sin que ello afecte a la licitud del tratamiento realizado antes de la revocación.',
        },
        {
          heading: '5. Datos relativos a menores',
          body: 'El formulario de suscripción solicita la fecha de nacimiento del niño o de la niña al que está destinada la biografía ilustrada ofrecida de forma gratuita. Este dato es proporcionado y su tratamiento es autorizado exclusivamente por el padre, madre o tutor legal del menor, quien declara tener la potestad para hacerlo en el momento de la suscripción. Gipi Visconti no recoge de forma autónoma datos relativos a menores ni se dirige directamente a niños a través del formulario de suscripción.',
        },
        {
          heading: '6. Conservación de los datos',
          body: 'Los datos recogidos se conservan mientras permanezca activa la suscripción a la newsletter, hasta que la persona interesada solicite su cancelación o revoque su consentimiento. En ausencia de revocación, los datos se someten igualmente a una revisión periódica y se eliminan cuando ya no resulten necesarios para las finalidades por las que fueron recogidos, sin perjuicio de las obligaciones de conservación que puedan derivarse de la ley.',
        },
        {
          heading: '7. Modalidades de tratamiento y destinatarios de los datos',
          body: 'Los datos personales se tratan mediante herramientas informáticas y se conservan en plataformas de terceros utilizadas para la gestión de la newsletter y el envío de comunicaciones por email, en calidad de encargados del tratamiento designados de conformidad con el artículo 28 del RGPD. Dichas plataformas pueden tener su sede dentro del Espacio Económico Europeo o garantizar en cualquier caso un nivel de protección adecuado de los datos también en caso de transferencia a terceros países, de conformidad con el RGPD. Los datos no se venden, ceden ni comunican a terceros con fines de marketing distintos de los indicados en esta Política de Privacidad.',
        },
        {
          heading: '8. Cookies y tecnologías similares',
          body: 'En el momento de la publicación, este sitio web no utiliza cookies de perfilado ni cookies de análisis de terceros. Solo pueden utilizarse cookies técnicas estrictamente necesarias para el funcionamiento del sitio web. Si esto cambiara en el futuro, se introducirá un aviso de cookies específico y una política de cookies dedicada.',
        },
        {
          heading: '9. Derechos de la persona interesada',
          body: 'Como persona interesada, el padre, madre o tutor legal que ha proporcionado los datos tiene derecho a acceder a los datos personales que le conciernen y a los del menor, a solicitar su rectificación o actualización, a solicitar su supresión, a oponerse al tratamiento o solicitar su limitación, a solicitar la portabilidad de los datos cuando proceda, y a revocar en cualquier momento el consentimiento prestado, sin que ello afecte a la licitud del tratamiento realizado antes de la revocación. Estos derechos pueden ejercerse en cualquier momento escribiendo a info@gipivisconti.com, o utilizando el enlace de baja incluido en cada email de la newsletter. También es posible presentar una reclamación ante la autoridad de control en materia de protección de datos del país de residencia.',
        },
        {
          heading: '10. Seguridad de los datos',
          body: 'Se adoptan medidas técnicas y organizativas adecuadas para proteger los datos personales frente a accesos no autorizados, pérdida, destrucción o divulgación no permitida, de conformidad con el RGPD.',
        },
        {
          heading: '11. Modificaciones de esta Política de Privacidad',
          body: 'Esta Política de Privacidad puede actualizarse con el tiempo, por ejemplo a raíz de cambios normativos o de modificaciones en las modalidades de tratamiento de los datos. Cualquier cambio se publicará en esta página, indicando la fecha de la última actualización.',
        },
        {
          heading: '12. Contacto',
          body: 'Para cualquier pregunta relacionada con esta Política de Privacidad o con el tratamiento de datos personales, puedes escribir a info@gipivisconti.com.',
        },
      ],
    },
  },
};

const urlToLang = { it: 'IT', en: 'EN', es: 'ES' };

export const LanguageProvider = ({ children }) => {
  const location = useLocation();
  const [language, setLanguage] = useState('IT');

  useEffect(() => {
    const match = location.pathname.match(/^\/(it|en|es)(\/|$)/);
    if (match) {
      const detected = urlToLang[match[1]];
      if (detected) setLanguage(detected);
    }
  }, [location.pathname]);

  const t = translations[language];

  useEffect(() => {
    const langMap = { IT: 'it', EN: 'en', ES: 'es' };
    document.documentElement.lang = langMap[language] || 'it';
  }, [language]);
  
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
