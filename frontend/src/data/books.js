const ROUTE_PREFIXES = {
  IT: "/it/libri",
  EN: "/en/books",
  ES: "/es/libros",
};

const buildPages = (slug, extension = "jpg") => ({
  IT: [1, 2, 3, 4].map((page) => `/images/books/${slug}/it/${page}.${extension}`),
  EN: [1, 2, 3, 4].map((page) => `/images/books/${slug}/en/${page}.${extension}`),
  ES: [1, 2, 3, 4].map((page) => `/images/books/${slug}/es/${page}.${extension}`),
});

const buildMetaTitle = (title) => ({
  IT: `${title} | Gipi Visconti`,
  EN: `${title} | Gipi Visconti`,
  ES: `${title} | Gipi Visconti`,
});

const buildMetaDescription = ({ IT, EN, ES }) => ({
  IT: `${IT}. Un libro illustrato di Gipi Visconti pensato per bambine e bambini che iniziano a leggere.`,
  EN: `${EN}. An illustrated book by Gipi Visconti created for children who are beginning to read.`,
  ES: `${ES}. Un libro ilustrado de Gipi Visconti pensado para niñas y niños que empiezan a leer.`,
});

export const books = [
  {
    id: 1,
    slug: "kathrine-switzer",
    title: "Kathrine Switzer",
    category: "sport",
    gradient: "book-gradient-1",
    color: "#F7D1BA",
    pages: buildPages("kathrine-switzer"),
    amazonLinks: {
      IT: "https://www.amazon.it/s?k=Kathrine+Switzer+Gipi+Visconti",
      EN: "https://www.amazon.com/s?k=Kathrine+Switzer+Gipi+Visconti",
      ES: "https://www.amazon.es/s?k=Kathrine+Switzer+Gipi+Visconti",
    },
    description: {
      IT: "La prima donna a correre la maratona di Boston con un pettorale.",
      EN: "The first woman to run the Boston Marathon with a race number.",
      ES: "La primera mujer en correr el maratón de Boston con dorsal.",
    },
    metaTitle: buildMetaTitle("Kathrine Switzer"),
    metaDescription: buildMetaDescription({
      IT: "La prima donna a correre la maratona di Boston con un pettorale",
      EN: "The first woman to run the Boston Marathon with a race number",
      ES: "La primera mujer en correr el maratón de Boston con dorsal",
    }),
  },
  {
    id: 2,
    slug: "valentina-tereshkova",
    title: "Valentina Tereshkova",
    category: "science",
    gradient: "book-gradient-2",
    color: "#B8D4E3",
    pages: buildPages("valentina-tereshkova"),
    amazonLinks: {
      IT: "https://www.amazon.it/s?k=Valentina+Tereshkova+Gipi+Visconti",
      EN: "https://www.amazon.com/s?k=Valentina+Tereshkova+Gipi+Visconti",
      ES: "https://www.amazon.es/s?k=Valentina+Tereshkova+Gipi+Visconti",
    },
    description: {
      IT: "La prima donna nello spazio.",
      EN: "The first woman in space.",
      ES: "La primera mujer en el espacio.",
    },
    metaTitle: buildMetaTitle("Valentina Tereshkova"),
    metaDescription: buildMetaDescription({
      IT: "La prima donna nello spazio",
      EN: "The first woman in space",
      ES: "La primera mujer en el espacio",
    }),
  },
  {
    id: 3,
    slug: "alfred-nobel",
    title: "Alfred Nobel",
    category: "science",
    gradient: "book-gradient-3",
    color: "#D4E2D4",
    pages: buildPages("alfred-nobel"),
    amazonLinks: {
      IT: "https://www.amazon.it/s?k=Alfred+Nobel+Gipi+Visconti",
      EN: "https://www.amazon.com/s?k=Alfred+Nobel+Gipi+Visconti",
      ES: "https://www.amazon.es/s?k=Alfred+Nobel+Gipi+Visconti",
    },
    description: {
      IT: "L'inventore della dinamite e fondatore del Premio Nobel.",
      EN: "The inventor of dynamite and founder of the Nobel Prize.",
      ES: "El inventor de la dinamita y fundador del Premio Nobel.",
    },
    metaTitle: buildMetaTitle("Alfred Nobel"),
    metaDescription: buildMetaDescription({
      IT: "L'inventore della dinamite e fondatore del Premio Nobel",
      EN: "The inventor of dynamite and founder of the Nobel Prize",
      ES: "El inventor de la dinamita y fundador del Premio Nobel",
    }),
  },
  {
    id: 4,
    slug: "nelson-mandela",
    title: "Nelson Mandela",
    category: "activism",
    gradient: "book-gradient-4",
    color: "#E8D4E8",
    pages: buildPages("nelson-mandela"),
    amazonLinks: {
      IT: "https://www.amazon.it/s?k=Nelson+Mandela+Gipi+Visconti",
      EN: "https://www.amazon.com/s?k=Nelson+Mandela+Gipi+Visconti",
      ES: "https://www.amazon.es/s?k=Nelson+Mandela+Gipi+Visconti",
    },
    description: {
      IT: "Il leader che ha combattuto per l'uguaglianza.",
      EN: "The leader who fought for equality.",
      ES: "El líder que luchó por la igualdad.",
    },
    metaTitle: buildMetaTitle("Nelson Mandela"),
    metaDescription: buildMetaDescription({
      IT: "Il leader che ha combattuto per l'uguaglianza",
      EN: "The leader who fought for equality",
      ES: "El líder que luchó por la igualdad",
    }),
  },
  {
    id: 5,
    slug: "hedy-lamarr",
    title: "Hedy Lamarr",
    category: "science",
    gradient: "book-gradient-5",
    color: "#F5E6CC",
    pages: buildPages("hedy-lamarr"),
    amazonLinks: {
      IT: "https://www.amazon.it/s?k=Hedy+Lamarr+Gipi+Visconti",
      EN: "https://www.amazon.com/s?k=Hedy+Lamarr+Gipi+Visconti",
      ES: "https://www.amazon.es/s?k=Hedy+Lamarr+Gipi+Visconti",
    },
    description: {
      IT: "Attrice e inventrice legata alle tecnologie alla base del Wi-Fi.",
      EN: "An actress and inventor linked to the technologies behind Wi-Fi.",
      ES: "Actriz e inventora vinculada a las tecnologías en la base del Wi-Fi.",
    },
    metaTitle: buildMetaTitle("Hedy Lamarr"),
    metaDescription: buildMetaDescription({
      IT: "Attrice e inventrice legata alle tecnologie alla base del Wi-Fi",
      EN: "An actress and inventor linked to the technologies behind Wi-Fi",
      ES: "Actriz e inventora vinculada a las tecnologías en la base del Wi-Fi",
    }),
  },
  {
    id: 6,
    slug: "coco-chanel",
    title: "Coco Chanel",
    category: "art",
    gradient: "book-gradient-6",
    color: "#FFE4E1",
    pages: buildPages("coco-chanel"),
    amazonLinks: {
      IT: "https://www.amazon.it/s?k=Coco+Chanel+Gipi+Visconti",
      EN: "https://www.amazon.com/s?k=Coco+Chanel+Gipi+Visconti",
      ES: "https://www.amazon.es/s?k=Coco+Chanel+Gipi+Visconti",
    },
    description: {
      IT: "La stilista che ha rivoluzionato la moda.",
      EN: "The designer who revolutionised fashion.",
      ES: "La diseñadora que revolucionó la moda.",
    },
    metaTitle: buildMetaTitle("Coco Chanel"),
    metaDescription: buildMetaDescription({
      IT: "La stilista che ha rivoluzionato la moda",
      EN: "The designer who revolutionised fashion",
      ES: "La diseñadora que revolucionó la moda",
    }),
  },
  {
    id: 7,
    slug: "artemisia-gentileschi",
    title: "Artemisia Gentileschi",
    category: "art",
    gradient: "book-gradient-7",
    color: "#E0E7FF",
    pages: buildPages("artemisia-gentileschi"),
    amazonLinks: {
      IT: "https://www.amazon.it/s?k=Artemisia+Gentileschi+Gipi+Visconti",
      EN: "https://www.amazon.com/s?k=Artemisia+Gentileschi+Gipi+Visconti",
      ES: "https://www.amazon.es/s?k=Artemisia+Gentileschi+Gipi+Visconti",
    },
    description: {
      IT: "La pittrice che ha sfidato il suo tempo.",
      EN: "The painter who challenged her time.",
      ES: "La pintora que desafió su tiempo.",
    },
    metaTitle: buildMetaTitle("Artemisia Gentileschi"),
    metaDescription: buildMetaDescription({
      IT: "La pittrice che ha sfidato il suo tempo",
      EN: "The painter who challenged her time",
      ES: "La pintora que desafió su tiempo",
    }),
  },
  {
    id: 8,
    slug: "michael-phelps",
    title: "Michael Phelps",
    category: "sport",
    gradient: "book-gradient-8",
    color: "#FECDD3",
    pages: buildPages("michael-phelps"),
    amazonLinks: {
      IT: "https://www.amazon.it/s?k=Michael+Phelps+Gipi+Visconti",
      EN: "https://www.amazon.com/s?k=Michael+Phelps+Gipi+Visconti",
      ES: "https://www.amazon.es/s?k=Michael+Phelps+Gipi+Visconti",
    },
    description: {
      IT: "Il nuotatore più medagliato della storia olimpica.",
      EN: "The most decorated Olympic swimmer in history.",
      ES: "El nadador más condecorado de la historia olímpica.",
    },
    metaTitle: buildMetaTitle("Michael Phelps"),
    metaDescription: buildMetaDescription({
      IT: "Il nuotatore più medagliato della storia olimpica",
      EN: "The most decorated Olympic swimmer in history",
      ES: "El nadador más condecorado de la historia olímpica",
    }),
  },
  {
    id: 9,
    slug: "ayrton-senna",
    title: "Ayrton Senna",
    category: "sport",
    gradient: "book-gradient-9",
    color: "#A7F3D0",
    pages: buildPages("ayrton-senna"),
    amazonLinks: {
      IT: "https://www.amazon.it/s?k=Ayrton+Senna+Gipi+Visconti",
      EN: "https://www.amazon.com/s?k=Ayrton+Senna+Gipi+Visconti",
      ES: "https://www.amazon.es/s?k=Ayrton+Senna+Gipi+Visconti",
    },
    description: {
      IT: "La leggenda della Formula 1.",
      EN: "The Formula 1 legend.",
      ES: "La leyenda de la Fórmula 1.",
    },
    metaTitle: buildMetaTitle("Ayrton Senna"),
    metaDescription: buildMetaDescription({
      IT: "La leggenda della Formula 1",
      EN: "The Formula 1 legend",
      ES: "La leyenda de la Fórmula 1",
    }),
  },
  {
    id: 10,
    slug: "nadia-comaneci",
    title: "Nadia Comăneci",
    category: "sport",
    gradient: "book-gradient-10",
    color: "#FDE68A",
    pages: buildPages("nadia-comaneci"),
    amazonLinks: {
      IT: "https://www.amazon.it/s?k=Nadia+Comaneci+Gipi+Visconti",
      EN: "https://www.amazon.com/s?k=Nadia+Comaneci+Gipi+Visconti",
      ES: "https://www.amazon.es/s?k=Nadia+Comaneci+Gipi+Visconti",
    },
    description: {
      IT: "La ginnasta del primo 10 perfetto.",
      EN: "The gymnast of the first perfect 10.",
      ES: "La gimnasta del primer 10 perfecto.",
    },
    metaTitle: buildMetaTitle("Nadia Comăneci"),
    metaDescription: buildMetaDescription({
      IT: "La ginnasta del primo 10 perfetto",
      EN: "The gymnast of the first perfect 10",
      ES: "La gimnasta del primer 10 perfecto",
    }),
  },
  {
    id: 11,
    slug: "rafael-nadal",
    title: "Rafael Nadal",
    category: "sport",
    gradient: "book-gradient-11",
    color: "#C4B5FD",
    pages: buildPages("rafael-nadal"),
    amazonLinks: {
      IT: "https://www.amazon.it/s?k=Rafael+Nadal+Gipi+Visconti",
      EN: "https://www.amazon.com/s?k=Rafael+Nadal+Gipi+Visconti",
      ES: "https://www.amazon.es/s?k=Rafael+Nadal+Gipi+Visconti",
    },
    description: {
      IT: "Il re della terra rossa.",
      EN: "The king of clay.",
      ES: "El rey de la tierra batida.",
    },
    metaTitle: buildMetaTitle("Rafael Nadal"),
    metaDescription: buildMetaDescription({
      IT: "Il re della terra rossa",
      EN: "The king of clay",
      ES: "El rey de la tierra batida",
    }),
  },
  {
    id: 12,
    slug: "pablo-picasso",
    title: "Pablo Picasso",
    category: "art",
    gradient: "book-gradient-12",
    color: "#F9A8D4",
    pages: buildPages("pablo-picasso"),
    amazonLinks: {
      IT: "https://www.amazon.it/s?k=Pablo+Picasso+Gipi+Visconti",
      EN: "https://www.amazon.com/s?k=Pablo+Picasso+Gipi+Visconti",
      ES: "https://www.amazon.es/s?k=Pablo+Picasso+Gipi+Visconti",
    },
    description: {
      IT: "Il genio che ha reinventato l'arte.",
      EN: "The genius who reinvented art.",
      ES: "El genio que reinventó el arte.",
    },
    metaTitle: buildMetaTitle("Pablo Picasso"),
    metaDescription: buildMetaDescription({
      IT: "Il genio che ha reinventato l'arte",
      EN: "The genius who reinvented art",
      ES: "El genio que reinventó el arte",
    }),
  },
  {
    id: 13,
    slug: "luka-modric",
    title: "Luka Modrić",
    category: "sport",
    gradient: "book-gradient-13",
    color: "#67E8F9",
    pages: buildPages("luka-modric"),
    amazonLinks: {
      IT: "https://www.amazon.it/s?k=Luka+Modric+Gipi+Visconti",
      EN: "https://www.amazon.com/s?k=Luka+Modric+Gipi+Visconti",
      ES: "https://www.amazon.es/s?k=Luka+Modric+Gipi+Visconti",
    },
    description: {
      IT: "Il mago del centrocampo.",
      EN: "The midfield maestro.",
      ES: "El mago del mediocampo.",
    },
    metaTitle: buildMetaTitle("Luka Modrić"),
    metaDescription: buildMetaDescription({
      IT: "Il mago del centrocampo",
      EN: "The midfield maestro",
      ES: "El mago del mediocampo",
    }),
  },
  {
    id: 14,
    slug: "bebe-vio",
    title: "Bebe Vio",
    category: "sport",
    gradient: "book-gradient-14",
    color: "#FDBA74",
    pages: buildPages("bebe-vio"),
    amazonLinks: {
      IT: "https://www.amazon.it/s?k=Bebe+Vio+Gipi+Visconti",
      EN: "https://www.amazon.com/s?k=Bebe+Vio+Gipi+Visconti",
      ES: "https://www.amazon.es/s?k=Bebe+Vio+Gipi+Visconti",
    },
    description: {
      IT: "La campionessa paralimpica di scherma.",
      EN: "The Paralympic fencing champion.",
      ES: "La campeona paralímpica de esgrima.",
    },
    metaTitle: buildMetaTitle("Bebe Vio"),
    metaDescription: buildMetaDescription({
      IT: "La campionessa paralimpica di scherma",
      EN: "The Paralympic fencing champion",
      ES: "La campeona paralímpica de esgrima",
    }),
  },
  {
    id: 15,
    slug: "yayoi-kusama",
    title: "Yayoi Kusama",
    category: "art",
    gradient: "book-gradient-15",
    color: "#86EFAC",
    pages: buildPages("yayoi-kusama"),
    amazonLinks: {
      IT: "https://www.amazon.it/s?k=Yayoi+Kusama+Gipi+Visconti",
      EN: "https://www.amazon.com/s?k=Yayoi+Kusama+Gipi+Visconti",
      ES: "https://www.amazon.es/s?k=Yayoi+Kusama+Gipi+Visconti",
    },
    description: {
      IT: "L'artista dei pois infiniti.",
      EN: "The artist of infinite polka dots.",
      ES: "La artista de los lunares infinitos.",
    },
    metaTitle: buildMetaTitle("Yayoi Kusama"),
    metaDescription: buildMetaDescription({
      IT: "L'artista dei pois infiniti",
      EN: "The artist of infinite polka dots",
      ES: "La artista de los lunares infinitos",
    }),
  },
  {
    id: 16,
    slug: "madre-teresa-di-calcutta",
    title: "Madre Teresa di Calcutta",
    category: "activism",
    gradient: "book-gradient-16",
    color: "#D4E2D4",
    pages: buildPages("madre-teresa-di-calcutta"),
    amazonLinks: {
      IT: "https://www.amazon.it/s?k=Madre+Teresa+Gipi+Visconti",
      EN: "https://www.amazon.com/s?k=Mother+Teresa+Gipi+Visconti",
      ES: "https://www.amazon.es/s?k=Madre+Teresa+Gipi+Visconti",
    },
    description: {
      IT: "La santa della carità.",
      EN: "The saint of charity.",
      ES: "La santa de la caridad.",
    },
    metaTitle: buildMetaTitle("Madre Teresa di Calcutta"),
    metaDescription: buildMetaDescription({
      IT: "La santa della carità",
      EN: "The saint of charity",
      ES: "La santa de la caridad",
    }),
  },
  {
    id: 17,
    slug: "valentino-rossi",
    title: "Valentino Rossi",
    category: "sport",
    gradient: "book-gradient-17",
    color: "#FDE68A",
    pages: buildPages("valentino-rossi"),
    amazonLinks: {
      IT: "https://www.amazon.it/s?k=Valentino+Rossi+Gipi+Visconti",
      EN: "https://www.amazon.com/s?k=Valentino+Rossi+Gipi+Visconti",
      ES: "https://www.amazon.es/s?k=Valentino+Rossi+Gipi+Visconti",
    },
    description: {
      IT: "Il Dottore della MotoGP.",
      EN: "The Doctor of MotoGP.",
      ES: "El Doctor del MotoGP.",
    },
    metaTitle: buildMetaTitle("Valentino Rossi"),
    metaDescription: buildMetaDescription({
      IT: "Il Dottore della MotoGP",
      EN: "The Doctor of MotoGP",
      ES: "El Doctor del MotoGP",
    }),
  },
  {
    id: 18,
    slug: "seraphine-de-senlis",
    title: "Séraphine de Senlis",
    category: "art",
    gradient: "book-gradient-18",
    color: "#FFE4E1",
    pages: buildPages("seraphine-de-senlis"),
    amazonLinks: {
      IT: "https://www.amazon.it/s?k=Seraphine+Senlis+Gipi+Visconti",
      EN: "https://www.amazon.com/s?k=Seraphine+Senlis+Gipi+Visconti",
      ES: "https://www.amazon.es/s?k=Seraphine+Senlis+Gipi+Visconti",
    },
    description: {
      IT: "La pittrice dei fiori mistici.",
      EN: "The painter of mystic flowers.",
      ES: "La pintora de las flores místicas.",
    },
    metaTitle: buildMetaTitle("Séraphine de Senlis"),
    metaDescription: buildMetaDescription({
      IT: "La pittrice dei fiori mistici",
      EN: "The painter of mystic flowers",
      ES: "La pintora de las flores místicas",
    }),
  },
  {
    id: 19,
    slug: "leonardo-da-vinci",
    title: "Leonardo Da Vinci",
    category: "art",
    gradient: "book-gradient-19",
    color: "#FFE4E1",
    pages: buildPages("leonardo-da-vinci"),
    amazonLinks: {
      IT: "https://www.amazon.it/s?k=Leonardo+Da+Vinci+Gipi+Visconti",
      EN: "https://www.amazon.com/s?k=Leonardo+Da+Vinci+Gipi+Visconti",
      ES: "https://www.amazon.es/s?k=Leonardo+Da+Vinci+Gipi+Visconti",
    },
    description: {
  IT: "L'uomo che immaginava il futuro",
  EN: 'The man who imagined the future',
  ES: 'El hombre que imaginaba el futuro',
},
    metaTitle: buildMetaTitle("Leonardo Da Vinci"),
    metaDescription: buildMetaDescription({
      IT: "L'uomo che immaginava il futuro",
  EN: 'The man who imagined the future',
  ES: 'El hombre que imaginaba el futuro',
    }),
  },
];

export const getBookBySlug = (slug) => {
  return books.find((book) => book.slug === slug);
};

export const getBookUrl = (language, slug) => {
  const prefix = ROUTE_PREFIXES[language] || ROUTE_PREFIXES.IT;
  return `${prefix}/${slug}`;
};

export const getBooksBasePath = (language) => {
  return ROUTE_PREFIXES[language] || ROUTE_PREFIXES.IT;
};