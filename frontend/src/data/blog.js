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
  {
    id: 4,
    slug: 'michael-phelps-bambino-nuotatore-piu-decorato',
    date: '2026-07-08',
    type: 'character',
    content: {
      IT: {
        title: 'Michael Phelps da bambino: come nasce il nuotatore più decorato della storia olimpica',
        excerpt:
          'Un\'insegnante lo aveva dato per spacciato: troppo irrequieto, incapace di stare fermo. Michael Phelps era un bambino con l\'ADHD, e in una piscina trovò lo spazio per trasformare quell\'energia in disciplina, fino a diventare l\'atleta più decorato della storia olimpica.',
        body: `<p>A scuola, un'insegnante disse a sua madre che quel bambino non sarebbe mai riuscito a concentrarsi su niente. Michael Phelps aveva pochi anni e in classe non stava fermo un istante, si agitava, interrompeva, sembrava incapace di seguire una lezione fino alla fine. A nove anni arrivò la diagnosi: disturbo da deficit di attenzione e iperattività, l'ADHD.</p>

<p>Nato a Baltimora, nel Maryland, il 30 giugno 1985, Michael era il più piccolo di tre figli. Sua madre Debbie era preside di una scuola media e non si arrese all'idea che quell'energia incontenibile fosse solo un problema da correggere. Cercò un modo per incanalarla, e lo trovò in una piscina.</p>

<p>A sette anni Michael iniziò a nuotare, spinto anche dall'esempio delle sorelle maggiori, già atlete. All'inizio non amava mettere la faccia sott'acqua e imparò prima il dorso. E fu in acqua che quell'energia, che a scuola sembrava un ostacolo, trovò uno spazio dove diventare qualcosa di utile: la concentrazione necessaria per contare le bracciate e rispettare i tempi, ripetendo lo stesso gesto per ore.</p>

<p>A dieci anni deteneva un record nazionale di categoria nei 100 metri farfalla. A undici iniziò ad allenarsi con Bob Bowman, il coach che lo avrebbe seguito per il resto della carriera al North Baltimore Aquatic Club. Bowman intuì presto che quel ragazzino aveva un talento raro, ma non lo trattò mai come un fenomeno da proteggere. Gli costruì intorno una disciplina fatta di orari fissi e allenamenti quotidiani, lo stesso tipo di struttura che aiuta molti bambini con ADHD a trovare un punto fermo.</p>

<p>Il resto è storia dello sport. Phelps debuttò alle Olimpiadi di Sydney nel 2000, a quindici anni, senza salire sul podio. Quattro anni dopo, ad Atene, tornò a casa con sei ori e due bronzi. Ma fu a Pechino, nel 2008, che scrisse una pagina che nessuno aveva mai scritto prima: otto medaglie d'oro in una singola edizione dei Giochi, un record che superò quello di Mark Spitz, fermo a sette dal 1972. Tra Sydney 2000 e Rio 2016, il conto finale segna 28 medaglie, 23 delle quali d'oro: nessun altro atleta nella storia dei Giochi si è mai avvicinato a questi numeri.</p>

<p>Negli anni successivi al ritiro, Phelps ha parlato apertamente delle difficoltà attraversate anche da adulto, tra ansia e depressione, raccontando quanto lo sport lo avesse aiutato a gestire un disagio che a scuola nessuno sapeva come affrontare. E ha ricordato spesso quella frase dell'insegnante che lo aveva dato per spacciato, non per rivendicarsi una rivincita, ma per raccontare a chi si sente sbagliato che a volte basta trovare il posto giusto per usare bene quello che si ha.</p>

<p>La sua storia è raccontata anche nel libro della collana Piccoli Grandi Eroi, disponibile su Amazon: un racconto pensato per i bambini che stanno imparando a leggere, e che ripercorre gli anni in cui Michael imparò a trasformare l'irrequietezza in energia, e l'energia in disciplina.</p>

<p>Quanti bambini oggi vengono etichettati come "troppo" prima ancora di scoprire dove mettere quella stessa energia?</p>`,
      },
      EN: {
        title: 'Michael Phelps as a child: how the most decorated swimmer in Olympic history was made',
        excerpt:
          'A teacher had written him off: too restless, unable to sit still. Michael Phelps was a child with ADHD, and in a swimming pool he found the space to turn that energy into discipline, going on to become the most decorated athlete in Olympic history.',
        body: `<p>At school, a teacher told his mother that boy would never manage to focus on anything. Michael Phelps was still young, and in the classroom he could not sit still for a moment: he fidgeted, he interrupted, he seemed incapable of following a lesson through to the end. At nine, the diagnosis arrived: attention deficit hyperactivity disorder, ADHD.</p>

<p>Born in Baltimore, Maryland, on 30 June 1985, Michael was the youngest of three children. His mother, Debbie, was a middle school headteacher, and she refused to accept that all that boundless energy was simply a problem to be corrected. She looked for a way to channel it, and she found it in a swimming pool.</p>

<p>At seven, Michael started swimming, encouraged also by the example of his older sisters, who were already competitive athletes. At first, he did not like putting his face under the water, and he learned backstroke first. And it was in the water that this energy, which at school had seemed such a hindrance, found a space to become something useful: the concentration needed to count strokes and keep to the pace, repeating the same movement for hours.</p>

<p>By the age of ten he held an age-group national record in the 100-metre butterfly. At eleven, he began training with Bob Bowman, the coach who would guide him for the rest of his career at the North Baltimore Aquatic Club. Bowman quickly sensed that the boy had a rare talent, but he never treated him as a prodigy to be shielded. He built a discipline around him made of fixed hours and daily training, the same kind of structure that helps many children with ADHD find something solid to hold on to.</p>

<p>The rest is sporting history. Phelps made his Olympic debut at the Sydney Games in 2000, aged fifteen, without reaching the podium. Four years later, in Athens, he came home with six golds and two bronzes. But it was in Beijing, in 2008, that he wrote a page no one had ever written before: eight gold medals at a single edition of the Games, a record that surpassed Mark Spitz's seven, held since 1972. Between Sydney 2000 and Rio 2016, his final tally stands at 28 medals, 23 of them gold: no other athlete in the history of the Games has ever come close to those numbers.</p>

<p>In the years since retiring, Phelps has spoken openly about the difficulties he faced even as an adult, including anxiety and depression, describing how much sport had helped him manage a struggle that no one at school had known how to address. And he has often recalled that teacher's remark, the one that had written him off, not to claim some kind of revenge, but to tell anyone who feels wrong that sometimes all it takes is finding the right place to put to good use what you already have.</p>

<p>His story is also told in the book from the Little Great Heroes collection, available on Amazon: a story written for children who are learning to read, tracing the years in which Michael learned to turn restlessness into energy, and energy into discipline.</p>

<p>How many children today are labelled as "too much" before they even discover where to put that same energy?</p>`,
      },
      ES: {
        title: 'Michael Phelps de niño: así nace el nadador más laureado de la historia olímpica',
        excerpt:
          'Una profesora lo había dado por perdido: demasiado inquieto, incapaz de estarse quieto. Michael Phelps era un niño con TDAH, y en una piscina encontró el espacio para transformar esa energía en disciplina, hasta convertirse en el atleta más laureado de la historia olímpica.',
        body: `<p>En el colegio, una profesora le dijo a su madre que aquel niño nunca conseguiría concentrarse en nada. Michael Phelps era muy pequeño y en clase no paraba quieto ni un instante: se agitaba, interrumpía, parecía incapaz de seguir una lección hasta el final. A los nueve años llegó el diagnóstico: trastorno por déficit de atención e hiperactividad, el TDAH.</p>

<p>Nacido en Baltimore, en Maryland, el 30 de junio de 1985, Michael era el menor de tres hermanos. Su madre, Debbie, era directora de un instituto y no se resignó a la idea de que aquella energía incontenible fuera solo un problema que corregir. Buscó una manera de encauzarla, y la encontró en una piscina.</p>

<p>A los siete años Michael empezó a nadar, animado también por el ejemplo de sus hermanas mayores, que ya eran atletas. Al principio no le gustaba meter la cara bajo el agua, y aprendió antes la espalda. Y fue en el agua donde aquella energía, que en el colegio parecía un obstáculo, encontró un espacio donde convertirse en algo útil: la concentración necesaria para contar las brazadas y respetar los tiempos, repitiendo el mismo gesto durante horas.</p>

<p>A los diez años ostentaba un récord nacional de su categoría en los 100 metros mariposa. A los once empezó a entrenar con Bob Bowman, el entrenador que lo acompañaría el resto de su carrera en el North Baltimore Aquatic Club. Bowman intuyó pronto que aquel chico tenía un talento poco común, pero nunca lo trató como un fenómeno al que había que proteger. Construyó a su alrededor una disciplina hecha de horarios fijos y entrenamientos diarios, el mismo tipo de estructura que ayuda a muchos niños con TDAH a encontrar un punto de apoyo.</p>

<p>El resto es historia del deporte. Phelps debutó en los Juegos Olímpicos de Sídney en 2000, con quince años, sin subir al podio. Cuatro años después, en Atenas, volvió a casa con seis oros y dos bronces. Pero fue en Pekín, en 2008, cuando escribió una página que nadie había escrito antes: ocho medallas de oro en una sola edición de los Juegos, un récord que superó el de Mark Spitz, que se mantenía en siete desde 1972. Entre Sídney 2000 y Río 2016, el balance final es de 28 medallas, 23 de ellas de oro: ningún otro atleta en la historia de los Juegos se ha acercado jamás a estas cifras.</p>

<p>En los años posteriores a su retirada, Phelps ha hablado abiertamente de las dificultades que atravesó también de adulto, entre ansiedad y depresión, contando cuánto le había ayudado el deporte a gestionar un malestar que en el colegio nadie sabía cómo abordar. Y ha recordado a menudo aquella frase de la profesora que lo había dado por perdido, no para reivindicar una revancha, sino para contarle a quien se siente equivocado que a veces basta con encontrar el lugar adecuado para aprovechar bien lo que se tiene.</p>

<p>Su historia se cuenta también en el libro de la colección Pequeños Grandes Valientes, disponible en Amazon: un relato pensado para los niños que están aprendiendo a leer, que recorre los años en que Michael aprendió a transformar la inquietud en energía, y la energía en disciplina.</p>

<p>¿Cuántos niños reciben hoy la etiqueta de "demasiado" antes incluso de descubrir dónde poner esa misma energía?</p>`,
      },
    },
  },
  {
    id: 5,
    slug: 'domande-bambini-disabilita',
    date: '2026-07-08',
    type: 'advice',
    content: {
      IT: {
        title: 'Le domande dei bambini sulla disabilità: perché rispondere conta più che stare zitti',
        excerpt:
          "L'imbarazzo nasce quasi sempre dal silenzio, non dalla differenza. Un bambino nota qualcosa di diverso in una persona e fa una domanda diretta, e l'adulto accanto si affretta a zittirlo, come se la curiosità fosse un errore da correggere invece che un gesto da accompagnare.",
        body: `<p>L'imbarazzo nasce quasi sempre dal silenzio, non dalla differenza. Un bambino nota qualcosa di diverso in una persona e fa una domanda diretta, e l'adulto accanto si affretta a zittirlo, come se la curiosità fosse un errore da correggere invece che un gesto da accompagnare.</p>

<p>E in quel momento si perde un'occasione di relazione. Il messaggio che il bambino riceve non sta nelle parole dell'adulto, ma nel silenzio imposto. Quella differenza diventa un argomento da evitare, qualcosa di cui vergognarsi, anche quando nessuno lo dice ad alta voce.</p>

<p>I bambini chiedono tutto senza filtri, perché non hanno ancora imparato le convenzioni che spingono un adulto ad abbassare la voce o a guardare altrove per educazione. Ed è questa mancanza di sovrastrutture a farli imparare più in fretta di noi: una domanda a cui si risponde con calma resta, mentre un imbarazzo taciuto si trasforma in distanza, e la distanza è più difficile da colmare di qualsiasi risposta scomoda.</p>

<p>Rispondere con serenità non significa avere sempre la risposta perfetta. Significa non trattare la domanda come un problema da chiudere in fretta. Se un bambino chiede perché una persona usa una sedia a rotelle, o perché non vede con gli occhi ma con le mani, basta rispondere con la stessa naturalezza con cui si spiega perché il cielo è blu. Il tono conta più del contenuto: se l'adulto resta tranquillo, il bambino impara che la differenza non è un pericolo, e questa lezione resta più a lungo di qualunque spiegazione tecnica.</p>

<p>Una buona abitudine è lasciare che il bambino finisca di parlare prima di rispondere, senza interromperlo con un cambio di discorso. Il tempo che si prende per ascoltare la domanda intera vale quanto la risposta stessa.</p>

<p>Questo non riguarda soltanto la disabilità. Riguarda ogni volta che un bambino nota qualcosa di diverso da quello che conosce e lo dice ad alta voce, senza il timore che paralizza gli adulti. Il coraggio di fare una domanda sincera resta un ponte anche fuori dall'infanzia: nel lavoro, quando non osiamo chiedere per paura di sembrare impreparati, e nelle relazioni, quando taciamo per non urtare qualcuno che invece vorrebbe solo essere ascoltato.</p>

<p>E lo stesso meccanismo si attiva quando una storia viene letta ad alta voce. Un bambino ascolta il racconto di una persona, che ha vissuto un ostacolo e lo ha trasformato in qualcosa di suo, e da lì nascono le domande più oneste: come faceva, cosa provava. Non serve inventare parole complicate, basta seguire la curiosità del bambino un passo alla volta, senza saltare alla pagina successiva per chiudere l'argomento.</p>

<p>La biografia diventa un terreno neutro: non si parla della persona che si ha davanti, ma di una storia, e da lì la domanda esce più facilmente. Le biografie illustrate nascono anche per questo, per dare ai bambini uno spazio dove le domande sulla differenza trovano una risposta prima ancora di essere fatte ad alta voce davanti a qualcuno che potrebbe sentirsi a disagio.</p>

<p>Forse l'inclusione comincia in un gesto piccolo: lasciare che la domanda venga fatta, senza fretta di chiudere il discorso.</p>`,
      },
      EN: {
        title: "Children's questions about disability: why answering matters more than staying quiet",
        excerpt:
          'Embarrassment almost always comes from silence, not from difference. A child notices something different about a person and asks a direct question, and the adult standing nearby rushes to hush them, as though curiosity were a mistake to correct rather than a gesture to guide.',
        body: `<p>Embarrassment almost always comes from silence, not from difference. A child notices something different about a person and asks a direct question, and the adult standing nearby rushes to hush them, as though curiosity were a mistake to correct rather than a gesture to guide.</p>

<p>And in that moment, a chance for connection is lost. The message the child receives lies not in the adult's words, but in the silence imposed on them. That difference becomes a subject to avoid, something to feel ashamed of, even when no one says so aloud.</p>

<p>Children ask everything without filters, because they have not yet learned the conventions that push an adult to lower their voice or look away out of politeness. And it is this lack of pretence that lets them learn faster than we do: a question answered calmly stays with them, while an embarrassment kept quiet turns into distance, and distance is harder to bridge than any awkward answer.</p>

<p>Answering calmly does not mean always having the perfect answer. It means not treating the question as a problem to be closed quickly. If a child asks why a person uses a wheelchair, or why someone sees with their hands rather than their eyes, it is enough to answer with the same ease used to explain why the sky is blue. Tone matters more than content: if the adult stays calm, the child learns that difference is not a danger, and that lesson lasts longer than any technical explanation.</p>

<p>A good habit is to let the child finish speaking before answering, without cutting them off with a change of subject. The time taken to listen to the whole question matters just as much as the answer itself.</p>

<p>This is not only about disability. It applies every time a child notices something different from what they already know and says it out loud, without the fear that paralyses adults. The courage to ask a sincere question remains a bridge well beyond childhood: at work, when we do not dare to ask for fear of seeming unprepared, and in relationships, when we stay quiet so as not to upset someone who would actually rather just be heard.</p>

<p>And the same mechanism kicks in when a story is read aloud. A child listens to the account of a person, who faced an obstacle and turned it into something of their own, and from there come the most honest questions: how did they manage, what did it feel like. There is no need to invent complicated words, just follow the child's curiosity one step at a time, without skipping to the next page to close the subject.</p>

<p>The biography becomes neutral ground: it is not about the person standing in front of them, but about a story, and from there the question comes out more easily. Illustrated biographies exist for this reason too, to give children a space where questions about difference find an answer before they are even asked aloud in front of someone who might feel uncomfortable.</p>

<p>Perhaps inclusion begins with one small gesture: letting the question be asked, without any hurry to close the conversation.</p>`,
      },
      ES: {
        title: 'Las preguntas de los niños sobre la discapacidad: por qué responder importa más que callar',
        excerpt:
          'La vergüenza casi siempre nace del silencio, no de la diferencia. Un niño se fija en algo distinto en una persona y hace una pregunta directa, y el adulto que tiene al lado se apresura a mandarlo callar, como si la curiosidad fuera un error que corregir en lugar de un gesto que acompañar.',
        body: `<p>La vergüenza casi siempre nace del silencio, no de la diferencia. Un niño se fija en algo distinto en una persona y hace una pregunta directa, y el adulto que tiene al lado se apresura a mandarlo callar, como si la curiosidad fuera un error que corregir en lugar de un gesto que acompañar.</p>

<p>Y en ese momento se pierde una ocasión de relación. El mensaje que recibe el niño no está en las palabras del adulto, sino en el silencio impuesto. Esa diferencia se convierte en un tema que evitar, algo de lo que avergonzarse, aunque nadie lo diga en voz alta.</p>

<p>Los niños preguntan todo sin filtros, porque todavía no han aprendido las convenciones que llevan a un adulto a bajar la voz o mirar hacia otro lado por educación. Y es precisamente esa falta de artificios lo que les hace aprender más rápido que nosotros: una pregunta respondida con calma permanece, mientras que una vergüenza callada se transforma en distancia, y la distancia es más difícil de salvar que cualquier respuesta incómoda.</p>

<p>Responder con serenidad no significa tener siempre la respuesta perfecta. Significa no tratar la pregunta como un problema que cerrar deprisa. Si un niño pregunta por qué una persona usa silla de ruedas, o por qué no ve con los ojos sino con las manos, basta con responder con la misma naturalidad con la que se explica por qué el cielo es azul. El tono importa más que el contenido: si el adulto permanece tranquilo, el niño aprende que la diferencia no es un peligro, y esa lección permanece más tiempo que cualquier explicación técnica.</p>

<p>Una buena costumbre es dejar que el niño termine de hablar antes de responder, sin interrumpirlo con un cambio de tema. El tiempo que se dedica a escuchar la pregunta entera vale tanto como la respuesta misma.</p>

<p>Esto no tiene que ver solo con la discapacidad. Tiene que ver con cada vez que un niño se fija en algo distinto de lo que ya conoce y lo dice en voz alta, sin el miedo que paraliza a los adultos. El valor de hacer una pregunta sincera sigue siendo un puente también fuera de la infancia: en el trabajo, cuando no nos atrevemos a preguntar por miedo a parecer poco preparados, y en las relaciones, cuando callamos para no molestar a alguien que en realidad solo querría que lo escucharan.</p>

<p>Y el mismo mecanismo se activa cuando se lee un cuento en voz alta. Un niño escucha el relato de una persona, que vivió un obstáculo y lo transformó en algo propio, y de ahí nacen las preguntas más honestas: cómo lo hacía, qué sentía. No hace falta inventar palabras complicadas, basta con seguir la curiosidad del niño paso a paso, sin saltar a la página siguiente para cerrar el tema.</p>

<p>La biografía se convierte en un terreno neutral: no se habla de la persona que se tiene delante, sino de una historia, y desde ahí la pregunta surge con más facilidad. Las biografías ilustradas nacen también para esto, para dar a los niños un espacio donde las preguntas sobre la diferencia encuentran una respuesta antes incluso de formularse en voz alta delante de alguien que podría sentirse incómodo.</p>

<p>Quizá la inclusión empiece con un gesto pequeño: dejar que la pregunta se haga, sin prisa por cerrar la conversación.</p>`,
      },
    },
  },
];

export const getAllPosts = () =>
  [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));

export const getPostBySlug = (slug) => posts.find((p) => p.slug === slug) || null;
