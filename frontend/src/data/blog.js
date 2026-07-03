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
  {
    id: 3,
    slug: 'chi-era-madre-teresa-di-calcutta',
    date: '2026-07-01',
    type: 'character',
    content: {
      IT: {
        title: 'Chi era Madre Teresa di Calcutta e perché raccontarla ai bambini',
        excerpt:
          'Si chiamava Anjezë Gonxhe Bojaxhiu, e prima di diventare Madre Teresa era una bambina cresciuta senza padre, in una casa dove il cibo scarseggiava ma non l\'abitudine a condividerlo. La sua storia parte da lì, molto prima di Calcutta.',
        body: `<p>Si chiamava Anjezë Gonxhe Bojaxhiu, e nacque a Skopje il 26 agosto 1910, in una famiglia albanese cattolica. Il nome Gonxhe, scelto dalla madre, significa bocciolo di fiore. Il padre Nikollë era un imprenditore e uno dei consiglieri comunali della città; morì improvvisamente quando lei aveva otto anni, e da quel momento la madre crebbe lei e i suoi fratelli lavorando come ricamatrice, insegnando loro a condividere quel poco che avevano con chi ne aveva ancora meno.</p>

<p>E crebbe in una famiglia profondamente religiosa, tra i canti e le attività della parrocchia. A dodici anni sentì per la prima volta il desiderio di dedicare la vita alla religione, ascoltando i racconti dei missionari che partivano per il Bengala. Ci vollero altri sei anni prima che quel pensiero diventasse una decisione: nel 1928 lasciò casa per entrare nelle Suore di Loreto, un ordine religioso irlandese con missioni in India. Non rivide più sua madre.</p>

<p>Dopo la formazione a Dublino e a Darjeeling, arrivò in India nel gennaio del 1929. Prese i voti e il nome di Teresa, in onore di Teresa di Lisieux, e insegnò per diciassette anni al Saint Mary's High School di Calcutta, diventandone alla fine la direttrice, dietro le mura di un convento che la separava dalla povertà fuori.</p>

<p>Il 10 settembre 1946, in treno verso Darjeeling per il ritiro spirituale annuale, ebbe quella che lei stessa chiamò la chiamata dentro la chiamata: la certezza di dover lasciare il convento per vivere in mezzo ai più poveri, curandoli e stando al loro fianco. Ci vollero due anni per ottenere il permesso della Chiesa. Nel 1948 uscì per la prima volta indossando un sari bianco bordato di blu, che sarebbe diventato il suo abito per il resto della vita.</p>

<p>Nel 1950 fondò le Missionarie della Carità insieme a dodici consorelle, una congregazione dedicata a chi non aveva nessun altro. Nel 1952 aprì a Calcutta la Nirmal Hriday, che significa casa dal cuore puro, un luogo dove le persone trovate morenti per strada potevano essere curate e accompagnate con dignità. La congregazione crebbe negli anni fino a contare migliaia di suore attive in decine di paesi, e oggi le Missionarie della Carità continuano lo stesso lavoro nato quel giorno a Calcutta.</p>

<p>E nel 1979 ricevette il Premio Nobel per la Pace, devolvendo l'intera somma ai poveri di Calcutta e rifiutando il tradizionale banchetto di gala riservato ai vincitori. Morì nella stessa città il 5 settembre 1997. Papa Giovanni Paolo II la proclamò beata il 19 ottobre 2003, e Papa Francesco la canonizzò il 4 settembre 2016, in una cerimonia a cui parteciparono anche millecinquecento persone senza casa, arrivate da tutta Italia.</p>

<p>A questa figura è dedicato uno dei libri della collana Piccoli Grandi Eroi, disponibile in italiano, inglese e spagnolo. Racconta ai bambini la vita di Anjezë fin da quando era una bambina in una casa dove il cibo scarseggiava e l'amore no.</p>

<p>Cosa succederebbe se un bambino iniziasse a guardare, ogni giorno, chi nessuno guarda?</p>`,
      },
      EN: {
        title: 'Who Was Mother Teresa of Calcutta, and Why Tell Her Story to Children',
        excerpt:
          'Her name was Anjezë Gonxhe Bojaxhiu, and before becoming Mother Teresa she was a child growing up without a father, in a home where food was scarce but the habit of sharing it never was. Her story starts there, long before Calcutta.',
        body: `<p>Her name was Anjezë Gonxhe Bojaxhiu, and she was born in Skopje on 26 August 1910, into a Catholic Albanian family. Her mother chose the name Gonxhe, which means flower bud in Albanian. Her father, Nikollë, was a businessman and one of the city's councillors; he died suddenly when she was eight, and from then on her mother raised the children alone, working as an embroiderer and teaching them to share what little they had with those who had even less.</p>

<p>And she grew up in a deeply religious household, amid the hymns and activities of the local parish. At twelve, she first felt the desire to devote her life to religion, having listened to stories told by missionaries setting off for Bengal. It took another six years for that feeling to become a decision: in 1928 she left home to join the Sisters of Loreto, an Irish religious order with missions in India. She never saw her mother again.</p>

<p>After training in Dublin and Darjeeling, she arrived in India in January 1929. She took her vows and the name Teresa, in honour of Thérèse of Lisieux, and taught for seventeen years at St Mary's High School in Calcutta, eventually becoming its headmistress, behind convent walls that kept her apart from the poverty outside.</p>

<p>On 10 September 1946, travelling by train to Darjeeling for her annual retreat, she experienced what she herself called the call within the call: the certainty that she had to leave the convent to live among the poorest, caring for them and staying by their side. It took two years to obtain the Church's permission. In 1948 she stepped out for the first time wearing a plain white sari edged in blue, the habit she would wear for the rest of her life.</p>

<p>In 1950 she founded the Missionaries of Charity together with twelve fellow sisters, a congregation devoted to those who had no one else. In 1952 she opened Nirmal Hriday in Calcutta, meaning home of the pure heart, a place where people found dying in the streets could be cared for and allowed to die with dignity. The congregation grew over the decades to thousands of sisters working in dozens of countries, and the Missionaries of Charity still carry on the same work today.</p>

<p>And in 1979 she received the Nobel Peace Prize, giving the entire sum to the poor of Calcutta and turning down the traditional laureates' banquet. She died in the same city on 5 September 1997. Pope John Paul II beatified her on 19 October 2003, and Pope Francis canonised her on 4 September 2016, at a ceremony attended by fifteen hundred homeless people brought in from across Italy.</p>

<p>One of the books in the Little Great Heroes series is dedicated to her, available in Italian, English and Spanish. It tells children the story of Anjezë's life from when she was a child herself, in a home where food was scarce and love was not.</p>

<p>What might happen if a child started, every day, looking at the people no one else looks at?</p>`,
      },
      ES: {
        title: 'Quién fue la Madre Teresa de Calcuta y por qué contársela a los niños',
        excerpt:
          'Se llamaba Anjezë Gonxhe Bojaxhiu, y antes de convertirse en la Madre Teresa fue una niña que creció sin padre, en una casa donde la comida escaseaba pero no la costumbre de compartirla. Su historia empieza ahí, mucho antes de Calcuta.',
        body: `<p>Se llamaba Anjezë Gonxhe Bojaxhiu, y nació en Skopie el 26 de agosto de 1910, en una familia albanesa católica. Su madre eligió el nombre Gonxhe, que en albanés significa capullo de flor. Su padre, Nikollë, era empresario y uno de los concejales de la ciudad; murió de forma repentina cuando ella tenía ocho años, y desde entonces su madre crió a los hijos trabajando como bordadora, enseñándoles a compartir lo poco que tenían con quienes tenían aún menos.</p>

<p>Y creció en una familia profundamente religiosa, entre los cantos y las actividades de la parroquia. A los doce años sintió por primera vez el deseo de dedicar su vida a la religión, al escuchar los relatos de los misioneros que partían hacia Bengala. Pasaron otros seis años antes de que ese pensamiento se convirtiera en una decisión: en 1928 dejó su casa para entrar en las Hermanas de Loreto, una orden religiosa irlandesa con misiones en la India. No volvió a ver a su madre.</p>

<p>Tras su formación en Dublín y en Darjeeling, llegó a la India en enero de 1929. Tomó los votos y el nombre de Teresa, en honor a Teresa de Lisieux, y enseñó durante diecisiete años en el colegio Saint Mary's de Calcuta, del que llegó a ser directora, tras los muros de un convento que la separaba de la pobreza de fuera.</p>

<p>El 10 de septiembre de 1946, en tren hacia Darjeeling para el retiro espiritual anual, tuvo lo que ella misma llamó la llamada dentro de la llamada: la certeza de que debía dejar el convento para vivir entre los más pobres, cuidándolos y estando a su lado. Pasaron dos años hasta obtener el permiso de la Iglesia. En 1948 salió por primera vez vestida con un sari blanco bordado de azul, el hábito que llevaría el resto de su vida.</p>

<p>En 1950 fundó las Misioneras de la Caridad junto a doce hermanas, una congregación dedicada a quienes no tenían a nadie más. En 1952 abrió en Calcuta el Nirmal Hriday, que significa casa del corazón puro, un lugar donde las personas encontradas agonizando en la calle podían ser atendidas y acompañadas con dignidad. La congregación creció con los años hasta contar miles de hermanas activas en decenas de países, y hoy las Misioneras de la Caridad siguen con el mismo trabajo que nació aquel día en Calcuta.</p>

<p>Y en 1979 recibió el Premio Nobel de la Paz, y donó toda la cantidad a los pobres de Calcuta, rechazando el banquete tradicional reservado a los premiados. Murió en la misma ciudad el 5 de septiembre de 1997. El papa Juan Pablo II la beatificó el 19 de octubre de 2003, y el papa Francisco la canonizó el 4 de septiembre de 2016, en una ceremonia a la que asistieron también mil quinientas personas sin hogar, llegadas de toda Italia.</p>

<p>A esta figura está dedicado uno de los libros de la colección Pequeños Grandes Valientes, disponible en italiano, inglés y español. Cuenta a los niños la vida de Anjezë desde que era una niña, en una casa donde la comida escaseaba y el amor no.</p>

<p>¿Qué pasaría si un niño empezara a mirar, cada día, a quien nadie mira?</p>`,
      },
    },
  },
];

export const getAllPosts = () =>
  [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));

export const getPostBySlug = (slug) => posts.find((p) => p.slug === slug) || null;
