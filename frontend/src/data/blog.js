const posts = [
  {
    id: 1,
    slug: 'valentina-tereshkova',
    date: '2026-06-30',
    type: 'character',
    content: {
      IT: {
        title: 'Valentina Tereshkova: la prima donna nello spazio',
        excerpt:
          'Nel 1963 Valentina Tereshkova salì su una navicella spaziale e orbito attorno alla Terra per tre giorni, diventando la prima donna ad andare nello spazio. La sua storia comincia però molto prima, tra i campi di una piccola città russa e una passione silenziosa per il cielo.',
        body: `<p>Valentina Tereshkova nacque nel 1937 in un piccolo villaggio della Russia, in una famiglia semplice che lavorava la terra. Suo padre morì quando lei era ancora bambina, e sua madre cresceva tre figli con quello che riusciva a guadagnare in fabbrica. Non c'era molto spazio per i sogni grandi, eppure Valentina aveva imparato a guardare in alto.</p>

<p>Da adolescente iniziò a praticare il paracadutismo, prima quasi per gioco, poi con una dedizione che sorprendeva tutti quelli che la conoscevano. Si lanciava dall'aereo e mentre cadeva guardava la terra dall'alto, quella striscia di campi e fiumi che da lassù sembrava un'altra cosa, più silenziosa e più vasta. Fece centinaia di salti, e ogni volta che atterrava aveva voglia di risalire.</p>

<p>Quando l'Unione Sovietica cercò candidati per il primo volo spaziale femminile, Valentina si presentò. Non era un'ingegnera, non era un'astronauta di professione. Era una giovane operaia tessile con una passione per il volo. E fu proprio lei ad essere scelta, tra più di quattrocento candidate.</p>

<p>Il 16 giugno 1963 partì a bordo della Vostok 6 e trascorse quasi tre giorni in orbita attorno alla Terra, completando quarantotto giri. Guardò il pianeta dall'oblò della navicella, quello stesso pianeta che aveva sempre guardato dall'alto durante i lanci col paracadute, e capì che il confine tra ciò che è possibile e ciò che non lo è dipende spesso solo da dove si è disposti ad arrivare.</p>

<p>Valentina Tereshkova rimase per decenni l'unica donna ad aver pilotato da sola una missione spaziale. La sua storia è nel libro <em>Valentina Tereshkova</em> della collana Piccoli Grandi Eroi, scritto con parole semplici per i bambini che stanno imparando a leggere.</p>`,
      },
      EN: {
        title: 'Valentina Tereshkova: the first woman in space',
        excerpt:
          'In 1963, Valentina Tereshkova boarded a spacecraft and orbited the Earth for three days, becoming the first woman to travel into space. Her story begins much earlier, though, among the fields of a small Russian town and a quiet love for the sky.',
        body: `<p>Valentina Tereshkova was born in 1937 in a small Russian village, in a simple family that worked the land. Her father died when she was still a child, and her mother raised three children on what she could earn at a factory. There was not much room for big dreams, and yet Valentina had learned to look up.</p>

<p>As a teenager she began practising parachute jumping, at first almost for fun, then with a dedication that surprised everyone who knew her. She would leap from the plane and as she fell she looked at the earth below, that strip of fields and rivers that from up there seemed like something else entirely, quieter and wider. She made hundreds of jumps, and each time she landed she wanted to go back up.</p>

<p>When the Soviet Union sought candidates for the first female spaceflight, Valentina put her name forward. She was not an engineer, not a professional astronaut. She was a young textile worker with a passion for flying. And she was the one chosen, from more than four hundred candidates.</p>

<p>On 16 June 1963 she departed aboard Vostok 6 and spent nearly three days in orbit around the Earth, completing forty-eight circuits. She looked at the planet through the porthole of the spacecraft, the same planet she had always looked down at during her parachute jumps, and understood that the boundary between what is possible and what is not often depends simply on how far you are willing to go.</p>

<p>Valentina Tereshkova remained for decades the only woman to have piloted a solo space mission. Her story is told in the book <em>Valentina Tereshkova</em> from the Little Great Heroes series, written in simple language for children who are learning to read.</p>`,
      },
      ES: {
        title: 'Valentina Tereshkova: la primera mujer en el espacio',
        excerpt:
          'En 1963, Valentina Tereshkova subió a una nave espacial y orbitó alrededor de la Tierra durante tres días, convirtiéndose en la primera mujer en ir al espacio. Su historia comienza mucho antes, entre los campos de una pequeña ciudad rusa y un amor silencioso por el cielo.',
        body: `<p>Valentina Tereshkova nació en 1937 en un pequeño pueblo de Rusia, en una familia sencilla que trabajaba la tierra. Su padre murió cuando ella aún era niña, y su madre criaba a tres hijos con lo que podía ganar en una fábrica. No había mucho espacio para los grandes sueños, y sin embargo Valentina había aprendido a mirar hacia arriba.</p>

<p>De adolescente empezó a practicar el paracaidismo, al principio casi por diversión, y después con una dedicación que sorprendía a todos los que la conocían. Se lanzaba del avión y mientras caía miraba la tierra desde lo alto, esa franja de campos y ríos que desde allí arriba parecía otra cosa, más silenciosa y más vasta. Hizo cientos de saltos, y cada vez que aterrizaba tenía ganas de volver a subir.</p>

<p>Cuando la Unión Soviética buscó candidatas para el primer vuelo espacial femenino, Valentina se presentó. No era ingeniera, no era astronauta de profesión. Era una joven obrera textil con una pasión por el vuelo. Y fue precisamente ella quien fue elegida, entre más de cuatrocientas candidatas.</p>

<p>El 16 de junio de 1963 partió a bordo de la Vostok 6 y pasó casi tres días en órbita alrededor de la Tierra, completando cuarenta y ocho vueltas. Miró el planeta a través de la ventanilla de la nave, el mismo planeta que siempre había mirado desde lo alto durante sus saltos en paracaídas, y comprendió que la frontera entre lo que es posible y lo que no lo es depende muchas veces solo de hasta dónde se está dispuesto a llegar.</p>

<p>Valentina Tereshkova fue durante décadas la única mujer que había pilotado sola una misión espacial. Su historia está en el libro <em>Valentina Tereshkova</em> de la colección Pequeños Grandes Valientes, escrito con palabras sencillas para los niños que están aprendiendo a leer.</p>`,
      },
    },
  },
  {
    id: 2,
    slug: 'come-sono-fatti-i-libri-piccoli-grandi-eroi',
    date: '2026-06-30',
    type: 'advice',
    content: {
      IT: {
        title: 'Come sono fatti i libri di Piccoli Grandi Eroi (e perché ogni scelta grafica ha un motivo)',
        excerpt:
          'Un bambino, che sta imparando a leggere, non ha bisogno di un libro più difficile degli altri per sentirsi sfidato. Ha bisogno di un libro che non lo faccia sentire in difetto fin dalla prima pagina.',
        body: `<p>Un bambino, che sta imparando a leggere, non ha bisogno di un libro più difficile degli altri per sentirsi sfidato. Ha bisogno di un libro che non lo faccia sentire in difetto fin dalla prima pagina.</p>

<p>Ogni volume della collana Piccoli Grandi Eroi nasce da questa idea, e si vede nelle scelte concrete che lo compongono: il carattere tipografico, la dimensione delle lettere, il modo in cui il testo e le illustrazioni si trovano sulla pagina.</p>

<p>Il font scelto per la collana è pensato per favorire la lettura autonoma nei primi anni di scolarizzazione. Le lettere sono grandi, nere su sfondo bianco, senza decorazioni che possano rallentare l'occhio di chi ancora impara a distinguere una "b" da una "d" o una "p" da una "q". Non è una questione estetica: è una questione di accessibilità concreta.</p>

<p>E poi ci sono le illustrazioni. In molti albi illustrati il testo e le figure si intrecciano, si sovrappongono, si inseguono sulla pagina. In Piccoli Grandi Eroi stanno separate: le illustrazioni sono sempre a lato del testo, mai dentro. Questo non significa che abbiano un ruolo minore. Al contrario, servono a sostenere l'immaginazione del lettore senza interferire con la concentrazione che la lettura richiede. Chi legge può guardare l'immagine quando sente che ne ha bisogno, non perché la pagina glielo imponga.</p>

<p>I testi sono scritti con frasi brevi e strutture sintattiche semplici, ma senza rinunciare alla complessità delle storie raccontate. Perché una storia può essere grande anche se le parole con cui è scritta sono accessibili a un bambino di sei anni.</p>

<p>Ogni libro è disponibile in tre lingue: italiano, spagnolo e inglese. Questo significa che lo stesso volume può accompagnare un bambino che legge in più di una lingua, in una famiglia bilingue, in una classe multiculturale, o semplicemente nella curiosità di sentire come suona la stessa storia in un'altra lingua.</p>

<p>Le scelte che stanno dietro a questi libri non sono ornamentali. Sono il modo in cui un libro decide a chi appartiene.</p>`,
      },
      EN: {
        title: 'How the Little Great Heroes books are designed (and why every choice matters)',
        excerpt:
          'A child who is learning to read does not need a harder book to feel challenged. They need a book that does not make them feel inadequate from the very first page.',
        body: `<p>A child who is learning to read does not need a harder book to feel challenged. They need a book that does not make them feel inadequate from the very first page.</p>

<p>Every volume in the Little Great Heroes series is built around this idea, and it shows in the specific decisions that shape each book: the typeface, the size of the letters, the way text and illustrations sit on the page.</p>

<p>The font chosen for the series is designed to support independent reading in the early years of schooling. The letters are large, black on white, without decorative elements that might slow down an eye still learning to tell a "b" from a "d" or a "p" from a "q". This is not an aesthetic choice. It is a practical one, made in the service of accessibility.</p>

<p>And then there are the illustrations. In many picture books, text and images interweave, overlap, and chase each other across the page. In Little Great Heroes they are kept apart: the illustrations always sit beside the text, never within it. This does not make them secondary. On the contrary, they are there to support the reader's imagination without competing with the concentration that reading requires. A child can look at the image when they feel the need to, not because the page forces them to.</p>

<p>The texts are written with short sentences and simple grammatical structures, but without sacrificing the depth of the stories being told. A story can be large even when the words used to tell it are accessible to a six-year-old.</p>

<p>Each book is available in three languages: Italian, Spanish, and English. This means the same volume can follow a child who reads in more than one language, whether in a bilingual family, a multicultural classroom, or simply out of curiosity about how the same story sounds in another tongue.</p>

<p>The choices behind these books are not decorative. They are the way a book decides who it belongs to.</p>`,
      },
      ES: {
        title: 'Cómo están hechos los libros de Pequeños Grandes Valientes (y por qué cada decisión tiene un motivo)',
        excerpt:
          'Un niño, que está aprendiendo a leer, no necesita un libro más difícil para sentirse desafiado. Necesita un libro que no le haga sentir en falta desde la primera página.',
        body: `<p>Un niño, que está aprendiendo a leer, no necesita un libro más difícil para sentirse desafiado. Necesita un libro que no le haga sentir en falta desde la primera página.</p>

<p>Cada volumen de la colección Pequeños Grandes Valientes nace de esta idea, y se nota en las decisiones concretas que lo componen: el tipo de letra, el tamaño de los caracteres, la forma en que el texto y las ilustraciones conviven en la página.</p>

<p>La fuente tipográfica elegida para la colección está pensada para favorecer la lectura autónoma en los primeros años de escolarización. Las letras son grandes, negras sobre fondo blanco, sin elementos decorativos que puedan frenar la mirada de quien todavía aprende a distinguir una "b" de una "d" o una "p" de una "q". No es una decisión estética: es una decisión de accesibilidad concreta.</p>

<p>Y luego están las ilustraciones. En muchos álbumes ilustrados el texto y las imágenes se entrelazan, se superponen, se persiguen por la página. En Pequeños Grandes Valientes están separados: las ilustraciones están siempre al lado del texto, nunca dentro de él. Esto no significa que tengan un papel menor. Al contrario, están ahí para sostener la imaginación del lector sin interferir con la concentración que exige la lectura. Quien lee puede mirar la imagen cuando siente que la necesita, no porque la página se lo imponga.</p>

<p>Los textos están escritos con frases cortas y estructuras sintácticas sencillas, pero sin renunciar a la complejidad de las historias que se cuentan. Porque una historia puede ser grande aunque las palabras con las que está escrita sean accesibles para un niño de seis años.</p>

<p>Cada libro está disponible en tres idiomas: italiano, español e inglés. Esto significa que el mismo volumen puede acompañar a un niño que lee en más de una lengua, en una familia bilingüe, en un aula multicultural, o simplemente en la curiosidad de escuchar cómo suena la misma historia en otra lengua.</p>

<p>Las decisiones que están detrás de estos libros no son ornamentales. Son la forma en que un libro decide a quién pertenece.</p>`,
      },
    },
  },
];

export const getAllPosts = () =>
  [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));

export const getPostBySlug = (slug) => posts.find((p) => p.slug === slug) || null;
