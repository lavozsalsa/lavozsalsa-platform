const WP_MEDIA_BASE = 'https://www.lavozsalsa.com/wp-content/uploads/2018/07';
const wpImage = (fileName) => `${WP_MEDIA_BASE}/${fileName}`;
const legacyProfile = (name, fileName, text) => ({
  name,
  image: wpImage(fileName),
  alt: name,
  text,
});

const pressArticles = [
  {
    slug: 'cantantes-de-salsa',
    legacyUrl: 'https://www.lavozsalsa.com/cantantes-de-salsa/',
    category: 'Guía',
    title: 'Cantantes de salsa: nombres, imágenes y artistas famosos del género',
    excerpt:
      'Te traemos una lista con los más reconocidos intérpretes y músicos del género, imágenes y los nombres de cantantes de salsa que pusieron en lo más alto la música latina.',
    description:
      'Lista de cantantes de salsa con nombres, imágenes y reseñas de artistas históricos, figuras de la salsa romántica y referentes colombianos del género.',
    featuredRank: 1,
    readingTime: '18 min',
    archiveLabel: 'Guía recuperada',
    updatedLabel: 'Recuperado y actualizado en abril de 2026',
    coverImage: '/media/covers/cantantes-de-salsa-photo.jpg',
    coverAlt: 'Cantantes de salsa famosos en una foto promocional para la guía de Pulso Salsero',
    shareImage: '/media/covers/cantantes-de-salsa-social.jpg',
    sections: [
      {
        title: 'Cantantes de salsa',
        paragraphs: [
          'Te traemos una lista con los más reconocidos intérpretes y músicos del género, imágenes y los nombres de cantantes de salsa que pusieron en lo más alto la música latina.',
          'Y finalmente sus nacionalidades y una reseña acerca de sus vidas.',
          'La salsa nace en Nueva York en la década de los años 60 y 70. Su origen es una combinación de ritmos caribeños y cubanos: la guaracha, el guaguancó, el mambo, el chachachá y el boogaloo. Desde entonces surgió un nuevo movimiento con letras e inspiraciones propias y, con él, los mejores compositores, músicos, productores y cantantes de salsa que hicieron historia a base de éxitos.',
        ],
        bullets: [
          'Cantantes de salsa vieja',
          'Intérpretes de salsa romántica',
          'Artistas de salsa choke',
          'Mujeres cantantes de salsa',
          'Cantantes de salsa que ya fallecieron',
        ],
      },
      {
        title: 'Cantantes de Salsa Vieja',
        paragraphs: [
          'Esta parte de la lista reúne algunas de las voces, soneros y orquestas más representativas del movimiento salsero clásico. Aquí están muchos de los nombres que ayudaron a definir la historia grande del género.',
        ],
        profiles: [
          legacyProfile(
            'Héctor Lavoe',
            'genero-salsa-emisoras-en-vivo-la-voz-salsa-hector-lavoe-225x300.jpg',
            'Héctor Juan Pérez Martínez, conocido como Héctor Lavoe, cantante de salsa puertorriqueño, nació en Ponce el 30 de septiembre de 1946 y falleció el 29 de junio de 1993 en Queens, Nueva York. Considerado una de las grandes leyendas de la salsa y apodado “el cantante de los cantantes”, hizo parte de la Fania All Stars y dejó uno de los legados musicales más escuchados del planeta.'
          ),
          legacyProfile(
            'Willie Colón',
            'genero-salsa-emisoras-en-vivo-la-voz-salsa-willie-colon-225x300.jpg',
            'William Anthony Colón Román nació en El Bronx, Nueva York, el 28 de abril de 1950. Más conocido como Willie Colón, “el malo del Bronx”, es cantante, músico, compositor y activista político puertorriqueño. Comenzó su carrera como trombonista, se unió a Héctor Lavoe y luego hizo parte de la Fania All Stars.'
          ),
          legacyProfile(
            'Rubén Blades',
            'genero-salsa-emisoras-en-vivo-la-voz-salsa-ruben-blades-225x300.jpg',
            'Rubén Blades Bellido de Luna, más conocido como Rubén Blades, “el poeta de la salsa”, nació en Ciudad de Panamá el 16 de julio de 1948. Cantante, compositor, músico, actor, abogado y político, desarrolló gran parte de su carrera en Nueva York. Sus discos más exitosos los realizó junto a Willie Colón para el sello Fania.'
          ),
          legacyProfile(
            'Celia Cruz',
            'genero-salsa-emisoras-en-vivo-la-voz-salsa-celia-cruz-225x300.jpg',
            'Celia Caridad Cruz Alfonso nació en La Habana el 21 de octubre de 1925 y murió el 16 de julio de 2003. Más conocida como Celia Cruz, fue una cantante cubana llamada mundialmente “La reina de la salsa” y “La Guarachera de Cuba”, una de las voces más queridas y recordadas de la historia del género.'
          ),
          legacyProfile(
            'Ismael Rivera',
            'genero-salsa-emisoras-en-vivo-ismael-rivera-225x300.jpg',
            'Ismael Rivera nació en San Mateo de Cangrejos, Santurce, Puerto Rico, el 5 de octubre de 1931 y murió el 13 de mayo de 1987. Conocido como Maelo, “el Sonero Mayor” y “el Brujo de Borinquen”, es una de las referencias esenciales de la salsa clásica.'
          ),
          legacyProfile(
            'Cheo Feliciano',
            'genero-salsa-emisoras-en-vivo-la-voz-salsa-cheo-feliciano-225x300.jpg',
            'José Luis Feliciano Vega nació en Ponce, Puerto Rico, el 3 de julio de 1935 y murió el 17 de abril de 2014. Más conocido como Cheo Feliciano, fue una figura de peso dentro de la Fania All Stars y su música sigue siendo uno de los grandes legados de la salsa.'
          ),
          legacyProfile(
            'Richie Ray & Bobby Cruz',
            'genero-salsa-emisoras-en-vivo-la-voz-salsa-riche-ray-y-bobby-cruz-225x300.jpg',
            'Richie Ray & Bobby Cruz es un grupo de salsa estadounidense integrado por el pianista Ricardo “Richie” Ray y el cantante Roberto “Bobby” Cruz. El dúo se formó en 1963 y alcanzó la fama a mediados de los años 70, convirtiéndose en uno de los intérpretes más famosos de la salsa.'
          ),
          legacyProfile(
            'Ismael Miranda',
            'genero-salsa-emisoras-en-vivo-la-voz-salsa-ismael-miranda-225x300.jpg',
            'Ismael Miranda nació en Aguada, Puerto Rico, el 20 de febrero de 1950. Compositor y cantante puertorriqueño de salsa, fue uno de los cantantes favoritos de la Fania All Stars y es conocido como “el niño bonito de la salsa”.'
          ),
          legacyProfile(
            'Willie Rosario',
            'genero-salsa-emisoras-en-vivo-la-voz-salsa-willie-rosario-225x300.jpg',
            'Willie Rosario, también conocido como “Mister Afinque”, nació en Coamo, Puerto Rico, el 6 de mayo de 1930. Es músico, compositor y director de orquesta, considerado una de las leyendas vivientes de la salsa. Por su institución pasaron figuras como Tony Vega, Gilberto Santa Rosa y Chamaco Rivera.'
          ),
          legacyProfile(
            'La Sonora Ponceña',
            'genero-salsa-emisoras-en-vivo-la-voz-salsa-sonora-ponceña-225x300.jpg',
            'La Sonora Ponceña es una orquesta puertorriqueña fundada por Quique Lucca en 1954 y dirigida luego por Papo Lucca. Es una de las agrupaciones más importantes del género y dejó a la industria nombres como Yolanda Rivera, Tito Gómez, Luigi Texidor y Luisito Carrión.'
          ),
          legacyProfile(
            'Óscar D’León',
            'genero-salsa-emisoras-en-vivo-la-voz-salsa-oscar-d-leon-225x300.jpg',
            'Óscar Emilio León Simosa nació en Caracas, Venezuela, el 11 de julio de 1943. Más conocido como Óscar D’León, es uno de los máximos exponentes de la salsa en toda la historia y es reconocido como “El Sonero del Mundo” y “El León de la Salsa”.'
          ),
          legacyProfile(
            'El Gran Combo de Puerto Rico',
            'genero-salsa-emisoras-en-vivo-la-voz-salsa-gran-combo-225x300.jpg',
            'El Gran Combo de Puerto Rico, conocido como “La Universidad de la Salsa”, fue fundado por Rafael Ithier en mayo de 1962. Es una de las instituciones más importantes del género y su repertorio incluye clásicos como “Un verano en Nueva York”, “Me liberé” y “No hay cama pa’ tanta gente”.'
          ),
        ],
      },
      {
        title: 'Cantantes de Salsa Romántica',
        paragraphs: [
          'La salsa romántica consolidó voces inolvidables y un repertorio que sigue dominando búsquedas, dedicatorias y memoria colectiva. Aquí reunimos varios de los intérpretes más representativos de esa corriente.',
        ],
        profiles: [
          legacyProfile(
            'Frankie Ruiz',
            'genero-salsa-emisoras-en-vivo-la-voz-salsa-frankie-ruiz-225x300.jpg',
            'José Antonio Torresola Ruiz Paterson, conocido artísticamente como Frankie Ruiz, “El Papa de la Salsa”, nació el 10 de marzo de 1958 y murió el 9 de agosto de 1998. Fue uno de los grandes exponentes de la salsa romántica y dejó una huella imborrable en la música latina.'
          ),
          legacyProfile(
            'Ray de la Paz',
            'genero-salsa-emisoras-en-vivo-la-voz-salsa-ray-de-la-paz-225x300.jpg',
            'Ray Hernández, conocido como Ray de la Paz, nació en el Bronx de Nueva York el 20 de agosto de 1949. Es considerado uno de los pioneros de la salsa romántica.'
          ),
          legacyProfile(
            'Willie González',
            'genero-salsa-emisoras-en-vivo-la-voz-salsa-willie-gonzalez-225x300.jpg',
            'Wilberto González nació en Bayamón, Puerto Rico, el 13 de mayo de 1958. Más conocido como Willie González, “el sensual de la salsa”, es uno de los pioneros del género de la salsa romántica.'
          ),
          legacyProfile(
            'Eddie Santiago',
            'genero-salsa-emisoras-en-vivo-la-voz-eddie-santiago-225x300.jpg',
            'Eduardo Santiago Rodríguez nació en Toa Alta, Puerto Rico, el 18 de agosto de 1955. Más conocido como Eddie Santiago, es uno de los pioneros de la salsa romántica y en su repertorio aparecen temas como “Lluvia”, “Tú me haces falta” y “Veneno”.'
          ),
          legacyProfile(
            'Rey Ruiz',
            'genero-salsa-emisoras-en-vivo-la-voz-salsa-rey-ruiz-225x300.jpg',
            'Rey Ruiz nació en Marianao, La Habana, el 21 de junio de 1966. Es un cantante cubano conocido como “El Bombón de la Salsa” y uno de los nombres fuertes de la salsa romántica.'
          ),
          legacyProfile(
            'Jerry Rivera',
            'genero-salsa-emisoras-en-vivo-la-voz-salsa-jerry-rivera-225x300.jpg',
            'Gerardo Rivera Rodríguez, más conocido como Jerry Rivera, nació en Santurce, Puerto Rico, el 31 de julio de 1973. Es uno de los cantantes que convirtió varias canciones en clásicos de la salsa romántica y sigue vigente hasta hoy.'
          ),
          legacyProfile(
            'Paquito Guzmán',
            'genero-salsa-emisoras-en-vivo-la-voz-salsa-paquito-guzman-225x300.jpg',
            'Frank Guzmán Géigel, popularmente conocido como Paquito Guzmán, nació en Santurce, Puerto Rico, el 20 de noviembre de 1939. Es uno de los máximos exponentes de la salsa romántica y tuvo gran éxito en toda Sudamérica.'
          ),
          legacyProfile(
            'Tito Rojas',
            'genero-salsa-emisoras-en-vivo-la-voz-salsa-tito-rojas-225x300.jpg',
            'Julio César Rojas López nació en Humacao, Puerto Rico, el 14 de junio de 1955. Más conocido como Tito Rojas, “El Gallo Salsero”, sigue siendo una de las figuras más emblemáticas de la salsa y formó parte de la Internacional de Pedro Conga y la Puerto Rican Power.'
          ),
          legacyProfile(
            'Gilberto Santa Rosa',
            'genero-salsa-emisoras-en-vivo-la-voz-salsa-gilberto-santa-rosa-225x300.jpg',
            'Gilberto Santa Rosa nació en Santurce, Puerto Rico, el 21 de agosto de 1962. Es un cantante puertorriqueño de salsa apodado “El Caballero de la Salsa” y una de las figuras más influyentes del género.'
          ),
          legacyProfile(
            'Tony Vega',
            'genero-salsa-emisoras-en-vivo-la-voz-salsa-tony-vega-225x300.jpg',
            'Eladio Antonio “Tony” Vega Ayala nació en Salinas, Puerto Rico, el 13 de julio de 1957. Conocido como “el romántico de la salsa”, es un cantante puertorriqueño y ex vocalista de Willie Rosario.'
          ),
          legacyProfile(
            'Víctor Manuelle',
            'genero-salsa-emisoras-en-vivo-la-voz-salsa-victor-manuelle-225x300.jpg',
            'Víctor Manuel Ruiz Velázquez, más conocido como Víctor Manuelle, nació en Nueva York el 27 de septiembre de 1968. Apodado “el sonero de la juventud”, es una de las voces más representativas de la salsa romántica.'
          ),
          legacyProfile(
            'Luis Enrique',
            'genero-salsa-emisoras-en-vivo-luis-enrique-225x300.jpg',
            'Luis Enrique Mejía López nació en Somoto, Nicaragua, el 28 de septiembre de 1962. Más conocido como Luis Enrique, “El Príncipe de la Salsa”, desarrolló una exitosa carrera entre la salsa, el pop y el jazz.'
          ),
          legacyProfile(
            'Lalo Rodríguez',
            'genero-salsa-emisoras-en-vivo-la-voz-salsa-lalo-rodriguez-225x300.jpg',
            'Lalo Rodríguez nació en Carolina, Puerto Rico, el 16 de mayo de 1958. Es un cantante puertorriqueño de salsa recordado por éxitos como “Ven devórame otra vez” y “Después de hacer el amor”.'
          ),
          legacyProfile(
            'Tito Nieves',
            'genero-salsa-emisoras-en-vivo-la-voz-salsa-tito-nieves-225x300.jpg',
            'Humberto Nieves nació en Río Piedras, Puerto Rico, el 4 de junio de 1958. Más conocido como Tito Nieves, es un cantante puertorriqueño de salsa conocido con el apodo de “El Pavarotti de la Salsa”.'
          ),
          legacyProfile(
            'Nino Segarra',
            'genero-salsa-emisoras-en-vivo-la-voz-salsa-nino-segarra-225x300.jpg',
            'Nino Segarra, nacido el 23 de noviembre de 1954, es cantante, compositor, músico y arreglista. Es una de las voces emblemáticas de la salsa romántica con canciones como “Porque te amo” y “Entre la espada y la pared”.'
          ),
          legacyProfile(
            'Maelo Ruiz',
            'genero-salsa-emisoras-en-vivo-la-voz-salsa-maelo-ruiz-225x300.jpg',
            'Ismael Ruiz Hernández, más conocido como Maelo Ruiz, nació en Nueva York el 22 de octubre de 1966. Es un cantante y compositor estadounidense de género salsa con una trayectoria muy ligada a la corriente romántica.'
          ),
        ],
      },
      {
        title: 'Mujeres cantantes de salsa',
        paragraphs: [
          'Dentro de esta lista también aparecen mujeres que dejaron una huella enorme en la música latina. Celia Cruz abrió un camino inmenso, y más adelante voces como La India y Mimi Ibarra reforzaron ese lugar desde repertorios y estilos muy distintos.',
        ],
        bullets: [
          'Celia Cruz fue llamada mundialmente “La reina de la salsa” y “La Guarachera de Cuba”.',
          'La India es una de las mujeres con más éxitos dentro del Billboard Tropical/Salsa.',
          'Mimi Ibarra se destacó como cantautora colombiana con sello propio dentro del género.',
        ],
      },
      {
        title: 'Cantantes de Salsa Colombianos',
        paragraphs: [
          'La salsa colombiana también tiene instituciones, voces y nombres fundamentales. Estas agrupaciones y artistas ayudaron a consolidar a Colombia como uno de los territorios más importantes del movimiento salsero en América.',
        ],
        profiles: [
          legacyProfile(
            'Grupo Niche',
            'genero-salsa-emisoras-en-vivo-la-voz-salsa-grupo-niche-salsa-colombiana-225x300.jpg',
            'El Grupo Niche fue fundado en 1979 en Bogotá por Jairo Varela y Alexis Lozano. Es considerado una de las agrupaciones salseras más importantes de América y una referencia obligada de la salsa hecha en Colombia.'
          ),
          legacyProfile(
            'Guayacán Orquesta',
            'genero-salsa-emisoras-en-vivo-la-voz-salsa-guayacan-orquesta-225x300.jpg',
            'Guayacán Orquesta es una de las orquestas más importantes de salsa en Colombia y América Latina. Es dirigida musicalmente por Alexis Lozano, arreglista, productor y una figura clave dentro del movimiento salsero colombiano.'
          ),
          legacyProfile(
            'Grupo Galé',
            'genero-salsa-emisoras-en-vivo-la-voz-salsa-grupo-gale.jpg',
            'El Grupo Galé es de origen colombiano y fue fundado por el percusionista y productor Diego Galé, quien además ha trabajado con artistas como Marc Anthony, Tito Nieves, Tony Vega, Willie González y Maelo Ruiz.'
          ),
          legacyProfile(
            'Mimi Ibarra',
            'genero-salsa-emisoras-en-vivo-la-voz-mimi-ibarra-225x300.jpg',
            'Elizabeth “Mimi” Ibarra es una cantautora colombiana y una de las compositoras más solicitadas y exitosas. Sus letras y melodías la convirtieron en una voz con sello propio dentro del repertorio romántico.'
          ),
          legacyProfile(
            'Joe Arroyo',
            'genero-salsa-emisoras-en-vivo-la-voz-salsa-joe-arroyo-salsa-colombiana-225x300.jpg',
            'Álvaro José Arroyo González nació en Cartagena de Indias el 1 de noviembre de 1955 y murió en Barranquilla el 26 de julio de 2011. Más conocido como Joe Arroyo, fue uno de los más grandes intérpretes de música tropical y salsa en Colombia.'
          ),
          legacyProfile(
            '“Fruko” Julio Ernesto Estrada',
            'genero-salsa-emisoras-en-vivo-la-voz-salsa-fruko-y-sus-tesos-225x300.jpg',
            'Julio Ernesto Estrada, conocido como “Fruko”, nació en Medellín el 7 de julio de 1951. Es compositor, productor, intérprete y director de orquesta, y una pieza clave para entender la historia de la salsa colombiana.'
          ),
        ],
      },
      {
        title: 'Cantantes de salsa que ya fallecieron y siguen vigentes',
        paragraphs: [
          'Varios de los nombres que aparecen en esta guía ya no están físicamente, pero siguen completamente vigentes en la memoria del público, en las emisoras y en la historia del género.',
        ],
        bullets: [
          'Héctor Lavoe, fallecido en 1993, sigue siendo “el cantante de los cantantes”.',
          'Cheo Feliciano dejó uno de los legados más importantes de la salsa clásica.',
          'Frankie Ruiz permanece como uno de los mayores referentes de la salsa romántica.',
          'Joe Arroyo sigue siendo una figura inmensa de la salsa y la música tropical colombiana.',
          'Tito Gómez, Raphy Leavitt y Mariano Cívico continúan siendo nombres de consulta permanente entre melómanos.',
        ],
      },
      {
        title: 'Una lista abierta para seguir sumando voces',
        paragraphs: [
          'Esta es una lista de cantantes de salsa que realizamos para seguir aportando cultura al género de la música salsa. Esperamos que haya sido de tu agrado; sabemos que se nos quedan muchos por fuera.',
          'Déjanos en los comentarios qué artista deberíamos incluir para seguir ampliándola. También iremos sumando voces de la nueva generación de la salsa dentro de Pulso Salsero.',
        ],
      },
    ],
  },
  {
    slug: 'exitos-de-la-salsa-romantica',
    legacyUrl: 'https://www.lavozsalsa.com/exitos-de-la-salsa-romantica/',
    category: 'Guía',
    title: 'Éxitos de la salsa romántica: clásicos, historia y cantantes del género',
    excerpt:
      'Una guía amplia de la salsa romántica con sus clásicos, artistas esenciales, contexto histórico y varias canciones que siguen sonando con fuerza en la memoria salsera.',
    description:
      'Éxitos de la salsa romántica, sus cantantes más recordados, el origen del género, sus pioneros y una selección amplia de clásicos que todavía siguen vigentes.',
    featuredRank: 2,
    readingTime: '22 min',
    archiveLabel: 'Guía recuperada',
    updatedLabel: 'Recuperado y actualizado en abril de 2026',
    coverImage: '/media/covers/historia-salsa-romantica.jpg',
    coverAlt: 'Artistas asociados a la salsa romántica en una portada de Pulso Salsero',
    shareImage: '/media/covers/historia-salsa-romantica.jpg',
    sections: [
      {
        title: 'Éxitos de la salsa romántica',
        paragraphs: [
          'Presentamos una selección amplia de los mejores éxitos de la salsa romántica, con clásicos de cantantes como Eddie Santiago, Willie González, Frankie Ruiz, Rey Ruiz, Tito Rojas, Víctor Manuelle, Gilberto Santa Rosa, Adolescentes Orquesta y Tony Vega, entre otros nombres que terminaron definiendo una época.',
          'Todos ellos hicieron parte de la década de los 80, cuando la salsa romántica, también llamada salsa sensual o erótica, comenzaba a tomar forma y a elevar el género con canciones que hoy ya son clásicos.',
        ],
        links: [
          { label: 'Ver la guía de cantantes de salsa', href: '/cantantes-de-salsa/' },
          { label: 'Volver a Salsa Baúl', href: '/salsa-baul/' },
        ],
      },
      {
        title: 'Acerca de la salsa romántica',
        paragraphs: [
          'La salsa romántica tomó su nombre como una estrategia comercial, aunque en distintos países también fue llamada “salsa monga”, “salsa cama”, “salsa catre”, “salsa sensual” o “erótica”.',
          'Más allá de los calificativos, se trata de una corriente que tomó prestada parte de la sensibilidad de la balada romántica y la adaptó al lenguaje salsero. Muchas de las primeras letras venían precisamente de canciones románticas ya conocidas, regrabadas bajo el formato de la salsa.',
          'De ahí surgió una línea más enfocada en el amor, el deseo, la intimidad y el drama sentimental, sin dejar de lado la estructura musical que sostenía la tradición del género.',
        ],
      },
      {
        title: 'Primer álbum de salsa romántica',
        paragraphs: [
          'Cuando la salsa romántica encontró un rumbo más claro, uno de los discos que terminó marcando el camino fue “Lo Mejor de Noche Caliente Vol. 1”, donde la línea melódica de la balada apareció con toda claridad y encontró en Ray de la Paz una voz decisiva.',
          'De esa etapa también quedaron canciones como “O me quieres o me dejas”, “Preso” y “Estar enamorado”. Más adelante llegaron producciones como “Con Caché” y “Alegres y Románticos”, donde Louie Ramírez y Ray de la Paz consolidaron varios de los temas más fuertes de la primera ola romántica.',
        ],
        images: [
          {
            src: 'https://www.lavozsalsa.com/wp-content/uploads/2018/04/louie-ramirez-y-ray-de-la-paz-salsa-romantica-300x300.jpg',
            alt: 'Louie Ramírez y Ray de la Paz en una imagen asociada a la salsa romántica',
            caption: 'Louie Ramírez y Ray de la Paz aparecen entre las referencias más importantes del arranque de la salsa romántica.',
          },
        ],
        bullets: [
          'Todo se derrumbó',
          'Ladrón de tu amor',
          'Yo soy aquel',
          'Solo tú y yo',
          'Todavía',
          'Preso',
          'Desahogo',
        ],
        links: [
          { label: 'Leer la historia general de la salsa', href: '/' },
        ],
      },
      {
        title: 'Ray de la Paz: pionero de la salsa romántica',
        paragraphs: [
          'Ray de la Paz aparece como una de las voces pioneras en la consolidación de este sonido. Su trabajo junto a Louie Ramírez ayudó a fijar un repertorio elegante, sentimental y muy influyente para lo que vendría después.',
        ],
        images: [
          {
            src: 'https://www.lavozsalsa.com/wp-content/uploads/2018/11/ray-de-la-paz-salsa-romantica.jpg',
            alt: 'Ray de la Paz en una imagen asociada a la salsa romántica',
          },
        ],
      },
      {
        title: 'Salsa romántica antigua',
        paragraphs: [
          'Willie González y Eddie Santiago compartieron escenario en sus primeras épocas y también pasaron por el Conjunto Chaney bajo la dirección de Nicolás Vivas antes de consolidarse como solistas. Ese cruce de trayectorias ayuda a entender cómo se fue armando el mapa de la salsa romántica antigua.',
          'En esa misma conversación también entra El Conjunto del Amor con “Amigos”, en la voz de Cheo Andújar, una de esas canciones que todavía aparecen cuando se habla de salsa romántica vieja.',
        ],
        images: [
          {
            src: 'https://www.lavozsalsa.com/wp-content/uploads/2018/04/willie-gonzalez-el-sensual-de-la-salsa-romantica-212x300.jpg',
            alt: 'Willie González en una foto asociada a la salsa romántica',
            caption: 'Willie González, una de las voces más reconocidas de la salsa sensual.',
          },
          {
            src: 'https://www.lavozsalsa.com/wp-content/uploads/2018/11/eddie-santiago-300x161.jpg',
            alt: 'Eddie Santiago en una imagen promocional',
            caption: 'Eddie Santiago, otro nombre decisivo para la consolidación del género.',
          },
        ],
      },
      {
        title: 'Willie González y Eddie Santiago',
        paragraphs: [
          'Willie González desarrolló una línea vocal cargada de emoción, historias de amor y una sensibilidad muy marcada, mientras Eddie Santiago irrumpió con fuerza en 1986 gracias al álbum “Atrevido y Diferente”, del cual salieron clásicos como “Tú me quemas”, “De profesión tu amante”, “Qué locura enamorarme de ti”, “Quiero amarte en la hierba” y “Nadie mejor que tú”.',
          'Años después siguieron sonando temas como “Lluvia” y “Todo empezó”, confirmando que su repertorio ya había entrado en el centro de la memoria salsera.',
        ],
        bullets: [
          'Éxitos Willie González: “Quiero morir en tu piel”, “No es casualidad”, “Devuélveme”, “Pequeñas cosas”, “Cómo se queda”, “Seda”, “Amantes cobardes”, “En la intimidad”, “Solos tú y yo” y “Quiero”.',
          'Éxitos Eddie Santiago: “Tú me haces falta”, “Mía”, “Tú me quemas”, “Qué locura enamorarme de ti”, “Todo empezó”, “De profesión tú amante”, “Me fallaste”, “Necesito”, “Nadie mejor que tú” y “Antídoto y veneno”.',
        ],
      },
      {
        title: 'Frankie Ruiz dentro de la salsa romántica',
        paragraphs: [
          'Frankie Ruiz inició al lado de Tommy Olivencia y de la Orquesta La Solución, donde comenzó a grabar algunos de sus primeros temas y a construir la identidad que lo llevaría después a una carrera solista llena de éxitos.',
          'Dentro de esa primera etapa quedaron canciones como “La Rueda” con La Solución y “Lo dudo” con Tommy Olivencia. Luego, ya como solista, surgirían himnos como “La Cura”, “Tú con él”, “Desnúdate mujer”, “Imposible amor”, “Quiero llenarte” y “Deseándote”.',
          'La nota original recordaba en 2018 que se cumplían 20 años de su muerte. Hoy la mejor forma de mantener vigente esa memoria es volver a su obra con contexto, no solo con nostalgia.',
        ],
        images: [
          {
            src: 'https://www.lavozsalsa.com/wp-content/uploads/2018/11/frankie-ruiz.jpg',
            alt: 'Frankie Ruiz en una imagen de archivo',
          },
        ],
        bullets: [
          'Lo Dudo',
          'Anda y Ve',
          'Tú Con Él',
          'La Rueda',
          'La Cura',
          'Desnúdate Mujer',
          'Si Te Entregas a Mí',
          'Imposible Amor',
          'Quiero Llenarte',
          'Mi Libertad',
          'Deseándote',
        ],
        links: [
          { label: 'Leer el perfil de Frankie Ruiz', href: '/frankie-ruiz-el-papa-de-la-salsa/' },
          { label: 'Leer Yo me llamo Frankie Ruiz', href: '/yo-me-llamo-frankie-ruiz/' },
        ],
      },
      {
        title: 'Paquito Guzmán',
        paragraphs: [
          'Paquito Guzmán no puede quedar por fuera cuando se habla de clásicos de salsa romántica. Después de su etapa junto a Tommy Olivencia, desarrolló una carrera solista fuerte y elegante con canciones como “25 rosas”, “Cinco noches”, “Ser amantes”, “Necesito”, “Tu amante”, “Deja la luz encendida” y “Se nos rompió el amor”.',
          'Su voz y su estilo contribuyeron a ampliar el repertorio sentimental del género y a sostenerlo con una gran calidad interpretativa.',
        ],
        images: [
          {
            src: 'https://www.lavozsalsa.com/wp-content/uploads/2018/04/paquito-guzman-salsa-romantica.jpg',
            alt: 'Paquito Guzmán en una imagen asociada a la salsa romántica',
          },
        ],
        bullets: [
          '25 Rosas',
          'Cinco Noches',
          'Ser Amantes',
          'Necesito',
          'Tu Amante',
          'Deja La Luz Encendida',
          'Se Nos Rompió El Amor',
        ],
      },
      {
        title: 'Cantantes de salsa romántica',
        paragraphs: [
          'Con el paso de los años se sumó una oleada enorme de artistas que terminaron fortaleciendo esta línea: Héctor Tricoche, Omar Alfanno, Gilberto Santa Rosa, Tony Vega, Tito Gómez, Tito Rojas, Cano Estremera, José Alberto “El Canario”, Lalo Rodríguez, Pedro Arroyo y Víctor Manuelle, entre muchos otros.',
          'A esa conversación también se unieron Viti Ruiz, Luis Enrique, Jerry Rivera, La India, Marc Anthony, Johnny Rivera, Mickey Taveras, Amílcar Boscán, Pedro Conga, Maelo Ruiz, Puerto Rican Power, Orquesta Isla Bonita, Rey Ruiz, Charlie Cruz y varios intérpretes más que terminaron haciendo de la salsa romántica una corriente inmensa y diversa.',
        ],
        images: [
          {
            src: 'https://www.lavozsalsa.com/wp-content/uploads/2018/07/genero-salsa-emisoras-en-vivo-la-voz-salsa-gilberto-santa-rosa-225x300.jpg',
            alt: 'Gilberto Santa Rosa en una imagen de archivo',
          },
        ],
        links: [
          { label: 'Leer la guía de cantantes de salsa', href: '/cantantes-de-salsa/' },
          { label: 'Leer sobre Tito Rojas', href: '/tito-rojas/' },
        ],
      },
      {
        title: 'Salsa colombiana',
        paragraphs: [
          'En Colombia también hubo nombres e instituciones fundamentales para la expansión del género. Fruko y sus Tesos, Joe Arroyo y The Latin Brothers sembraron una base decisiva para la cultura salsera del país.',
          'A eso se suman agrupaciones memorables como Grupo Niche, Guayacán Orquesta y Grupo Galé, que ayudaron a proyectar internacionalmente la salsa hecha en Colombia y a sostener una identidad propia dentro de la música latina.',
        ],
        images: [
          {
            src: 'https://www.lavozsalsa.com/wp-content/uploads/2015/01/Diego-Gale-3-200x300.jpg',
            alt: 'Diego Galé en una foto de archivo',
          },
          {
            src: 'https://www.lavozsalsa.com/wp-content/uploads/2018/08/exitos-de-grupo-niche-jairo-varela.jpg',
            alt: 'Grupo Niche en una imagen promocional',
          },
          {
            src: 'https://www.lavozsalsa.com/wp-content/uploads/2018/07/genero-salsa-emisoras-en-vivo-la-voz-salsa-guayacan-orquesta.jpg',
            alt: 'Guayacán Orquesta en una imagen de archivo',
          },
          {
            src: 'https://www.lavozsalsa.com/wp-content/uploads/2018/07/genero-salsa-emisoras-en-vivo-la-voz-salsa-joe-arroyo-salsa-colombiana.jpg',
            alt: 'Joe Arroyo en una imagen de archivo',
          },
        ],
        links: [
          { label: 'Leer la historia de Grupo Galé', href: '/internacional-grupo-gale-toda-una-historia-musical/' },
          { label: 'Leer la historia de Adolescentes Orquesta', href: '/adolescentes-orquesta-la-historia-verdadera-de-porfi-baloa/' },
        ],
      },
      {
        title: 'Salsa romántica viejita',
        paragraphs: [
          'Este artículo también funciona como una lista de canciones viejitas de salsa romántica que siguen sonando con fuerza. Allí aparecen artistas y temas que marcaron los años 80, 90 y buena parte de los 2000, demostrando que el género consiguió instalar clásicos duraderos.',
          '“Pequeñas cosas” de Willie González, “Qué hay de malo” de Jerry Rivera, “Caricias prohibidas” de Viti Ruiz, “Siempre seré” de Tito Rojas, “Aquel viejo motel” de David Pabón y “A dónde irás” de Puerto Rican Power son solo algunos de esos títulos que todavía activan recuerdos inmediatos entre los oyentes.',
        ],
        images: [
          {
            src: 'https://www.lavozsalsa.com/wp-content/uploads/2018/07/genero-salsa-emisoras-en-vivo-la-voz-salsa-jerry-rivera-225x300.jpg',
            alt: 'Jerry Rivera en una imagen de archivo',
          },
        ],
      },
      {
        title: 'Las mejores 50 canciones de música salsa para dedicar',
        paragraphs: [
          'Como cierre de esta guía, recuperamos una lista amplia de canciones de salsa para dedicar. Aquí conviven himnos románticos, canciones de despecho, clásicos bailables y varios títulos que siguen apareciendo en dedicatorias, playlists y conversaciones salseras.',
        ],
        images: [
          {
            src: 'https://www.lavozsalsa.com/wp-content/uploads/2018/04/gilberto-santa-rosa-victor-manuelle-rey-ruiz-jerry-rivera-salsa-romantica.jpg',
            alt: 'Gilberto Santa Rosa, Víctor Manuelle, Rey Ruiz y Jerry Rivera en una imagen asociada a la salsa romántica',
          },
        ],
        orderedBullets: [
          'Vivir mi vida - Marc Anthony',
          'Pequeñas cosas - Willie González',
          'Sin sentimiento - Grupo Niche',
          'La cita - Galy Galiano',
          'Conteo regresivo - Gilberto Santa Rosa',
          'Qué hay de malo - Jerry Rivera',
          'Tengo ganas - Víctor Manuelle',
          'El gran varón - Willie Colón',
          'Amor y control - Rubén Blades',
          'Qué locura enamorarme de ti - Eddie Santiago',
          'Caricias prohibidas - Viti Ruiz',
          'Me vas a extrañar - Yiyo Sarante',
          'Vivir lo nuestro - La India y Marc Anthony',
          'La negra tiene tumbao - Celia Cruz',
          'Te amo te extraño - Guayacán Orquesta',
          'Te va a doler - Maelo Ruiz',
          'El amor de mi vida - Grupo Galé',
          'Persona ideal - Adolescentes',
          'Mi media mitad - Rey Ruiz',
          'Llorarás - Óscar D’León',
          'Rebelión - Joe Arroyo',
          'Casi te envidio - Andy Montañez',
          'Cómo te hago entender - Roberto Roena',
          'Qué pena - Los Hermanos Lebrón',
          'Siempre seré - Tito Rojas',
          'Amor a medio tiempo - Bobby Valentín',
          'Un montón de estrellas - Polo Montañez',
          'Ya no regreso contigo - Roberto Blades',
          'Esa mujer - Tony Vega',
          'La juma de ayer - Henry Fiol',
          'Fabricando fantasías - Tito Nieves',
          'Juanito Alimaña - Héctor Lavoe',
          'Un verano en Nueva York - El Gran Combo',
          'Porque te amo - Nino Segarra',
          'Las tumbas - Ismael Rivera',
          'He decidido olvidarte - Pedro Arroyo',
          'Extrañándote - Michel El Buenón',
          'El preso - Fruko y sus Tesos',
          'Página de amor - Tito Gómez',
          'El ratón - Cheo Feliciano',
          'Sobre las olas - The Latin Brothers',
          'De qué callada manera - La Sonora Ponceña',
          'La noche más linda - Adalberto Santiago',
          'Desnúdate mujer - Frankie Ruiz',
          'Yo no sé mañana - Luis Enrique',
          'A fuego lento - Mario Ortiz',
          'Corazón embustero - La Grande de Madrid',
          'Sonido bestial - Richie Ray y Bobby Cruz',
          'Aquel viejo motel - David Pabón',
          'A dónde irás - Puerto Rican Power',
        ],
      },
      {
        title: 'Reflexión salsera',
        paragraphs: [
          'En definitiva, la salsa romántica llegó para complementar el mapa del género y abrirlo hacia nuevos públicos. Hay quienes la aman, quienes la discuten y quienes la entienden como una desviación del camino más duro de la salsa, pero su impacto histórico es innegable.',
          'Sea guaracha, son cubano, cha cha chá, boogaloo, salsa dura o salsa romántica, lo que queda claro es que la música latina ha sabido crecer, transformarse y permanecer en el tiempo. A muchos de los que ya no nos acompañan los seguimos escuchando como si nunca se hubieran ido.',
        ],
      },
    ],
  },
  {
    slug: 'descargar-salsa',
    legacyUrl: 'https://www.lavozsalsa.com/descargar-salsa/',
    category: 'Descargas',
    title: 'Descargar salsa gratis: MP3 de salsa romántica, salsa baúl y éxitos para móvil o PC',
    excerpt:
      'Escucha y descarga salsa desde una biblioteca pensada para móvil o PC: salsa romántica, salsa baúl, clásicos del género y archivo recuperado de La Voz Salsa.',
    description:
      'Descargar salsa gratis en MP3 desde móvil o PC: salsa romántica, salsa baúl, éxitos del género y una biblioteca recuperada del archivo de La Voz Salsa.',
    featuredRank: 3,
    readingTime: '12 min',
    archiveLabel: 'Biblioteca recuperada',
    updatedLabel: 'Recuperado y reorganizado en abril de 2026',
    sections: [
      {
        title: 'Descargar salsa romántica y salsa baúl',
        paragraphs: [
          'Esta página fue pensada para quienes todavía disfrutan guardar canciones, revisarlas con calma y tener a mano una buena selección de salsa en MP3. Aquí reunimos audios que circularon durante años dentro del archivo de La Voz Salsa y los ordenamos en una biblioteca más clara para escuchar y descargar desde móvil o PC.',
          'La selección mezcla salsa romántica, salsa baúl, sencillos independientes y canciones que siguen apareciendo entre oyentes, coleccionistas y seguidores de La Voz Salsa. La idea no es dejar enlaces sueltos, sino abrir una biblioteca que de verdad se pueda usar.',
        ],
      },
      {
        title: 'Cómo usar esta biblioteca',
        paragraphs: [
          'Cada tarjeta te deja escuchar el tema desde el navegador antes de bajarlo. Así puedes revisar la pista, confirmar cuál quieres guardar y descargar solo lo que de verdad te interesa.',
        ],
        bullets: [
          'Escucha previa dentro de la misma página.',
          'Descarga individual por canción en formato MP3.',
          'Experiencia pensada para móvil y escritorio.',
          'Archivo recuperado sin depender del WordPress viejo.',
        ],
      },
      {
        title: 'Sigue explorando el archivo salsero',
        paragraphs: [
          'Esta biblioteca convive con otras rutas que ya están activas dentro de Pulso Salsero. Si quieres seguir por estilos, artistas o memoria salsera, aquí tienes tres entradas que conectan muy bien con estas descargas.',
        ],
        links: [
          { label: 'Abrir la guía de éxitos de la salsa romántica', href: '/exitos-de-la-salsa-romantica/' },
          { label: 'Entrar a Salsa Baúl', href: '/salsa-baul/' },
          { label: 'Ver la guía de cantantes de salsa', href: '/cantantes-de-salsa/' },
        ],
      },
    ],
  },
  {
    slug: 'salsa-baul',
    legacyUrl: 'https://www.lavozsalsa.com/salsa-baul/',
    category: 'Archivo',
    title: 'Salsa Baúl: el archivo emocional donde siguen respirando los clásicos',
    excerpt:
      'Una mirada a ese repertorio que siempre vuelve: canciones, discos y voces que siguen apareciendo en la memoria de cualquier salsero serio.',
    description:
      'Salsa Baúl es una ruta por los clásicos que siguen vivos en la memoria salsera: canciones, discos y voces que resisten el paso del tiempo.',
    featuredRank: 2,
    readingTime: '6 min',
    archiveLabel: 'Archivo recuperado',
    updatedLabel: 'Actualizado en abril de 2026',
    sections: [
      {
        title: 'El baúl no es nostalgia vacía',
        paragraphs: [
          'Cuando un salsero habla del baúl, no está hablando solo de canciones viejas. Está hablando de piezas que siguen activando conversación, baile, memoria y criterio. Son temas que todavía sirven para medir arreglos, interpretar una época o reconocer la firma de una voz.',
          'Por eso Salsa Baúl vive tan cerca de la identidad de La Voz Salsa: porque el género no se sostiene únicamente con novedades. También se sostiene con ese archivo emocional que sigue explicando por qué ciertas canciones nunca se van.',
        ],
      },
      {
        title: 'Cómo reconocer un clásico que de verdad quedó',
        paragraphs: [
          'No toda canción antigua se convierte en pieza de baúl. Las que permanecen suelen compartir algo: personalidad sonora, una interpretación memorable y una relación muy fuerte con la experiencia del oyente.',
        ],
        bullets: [
          'Coro y fraseo que se quedan en la memoria.',
          'Un arreglo que sigue sonando vivo con el paso del tiempo.',
          'Interpretaciones que marcaron escuelas dentro del género.',
          'Capacidad de volver a sonar en cualquier generación.',
        ],
      },
      {
        title: 'Un punto de partida para volver al archivo',
        paragraphs: [
          'Si quieres regresar al baúl con intención, empieza por nombres como Héctor Lavoe, Willie Colón, Frankie Ruiz, Ismael Rivera, La Sonora Ponceña, El Gran Combo, Rubén Blades y Celia Cruz. Cada uno abre una puerta distinta dentro del mapa salsero.',
          'Esa es la apuesta de esta nueva sala de prensa: no tratar el archivo como museo, sino como una herramienta viva para escuchar mejor el presente.',
        ],
      },
    ],
  },
  {
    slug: 'adolescentes-orquesta-la-historia-verdadera-de-porfi-baloa',
    legacyUrl: 'https://www.lavozsalsa.com/adolescentes-orquesta-la-historia-verdadera-de-porfi-baloa/',
    category: 'Historia',
    title: 'Adolescentes Orquesta: la historia verdadera de Porfi Baloa y sus 20 años de historia',
    excerpt:
      'Porfi Baloa, creador de Adolescentes Orquesta, repasa el origen del proyecto, sus 20 años de historia, la disputa por el nombre y la discografía que convirtió a la agrupación en referencia de la salsa romántica.',
    description:
      'La historia verdadera de Porfi Baloa y Adolescentes Orquesta: 20 años de historia, cantantes reconocidos, origen del proyecto, discografía y legado dentro de la salsa romántica venezolana.',
    featuredRank: 3,
    readingTime: '11 min',
    archiveLabel: 'Historia recuperada',
    updatedLabel: 'Actualizado en abril de 2026',
    coverImage: 'https://www.lavozsalsa.com/wp-content/uploads/2015/08/porfi-baloa.jpg',
    coverAlt: 'Porfi Baloa en una foto histórica asociada a Adolescentes Orquesta',
    sections: [
      {
        title: 'Porfi Baloa y sus Adolescentes Orquesta',
        paragraphs: [
          '“20 Años de Historia” fue presentado por el músico venezolano Porfi Baloa como un trabajo de recopilación que reúne buena parte de los éxitos de Adolescentes Orquesta a lo largo de dos décadas de carrera artística.',
          'Más que una simple antología, este material funciona como una puerta de entrada al recorrido de una agrupación que marcó a varias generaciones de oyentes de salsa romántica en América Latina.',
        ],
      },
      {
        title: 'Cantantes reconocidos en los 20 años de historia',
        paragraphs: [
          'En esta producción Porfi Baloa reunió a varias figuras reconocidas del género. Entre los nombres mencionados en el proyecto aparecen Óscar D’ León, Vladimir Lozano, Rodrigo Mendoza, Joseíto Rodríguez, Elio Pacheco, Memo Morales, Charlie Cardona, El Montuno, Marcial Istúriz y Ángel Flores, entre otros.',
          'También participan voces ligadas directamente al catálogo histórico de Adolescentes Orquesta, lo que convierte esta recopilación en un material de colección para melómanos, activistas y defensores de la salsa romántica.',
        ],
        bullets: [
          'Óscar D’ León',
          'Vladimir Lozano',
          'Rodrigo Mendoza',
          'Joseíto Rodríguez',
          'Elio Pacheco',
          'Memo Morales',
          'Charlie Cardona',
          'Marcial Istúriz',
        ],
      },
      {
        title: 'Álbum 20 años de historia',
        paragraphs: [
          'El álbum “20 Años de Historia” fue grabado entre 2014 y 2015 en el estudio personal Vereda 61, en Caracas, Venezuela. Allí Porfi Baloa decidió revisar parte del repertorio que acompañó el crecimiento internacional de la agrupación.',
          'La selección recupera clásicos como “Latino”, “Dame una oportunidad”, “Señorita”, “Persona ideal”, “Si te marchas”, “Me negó”, “Virgen”, “Búscame”, “Mentirosa” y “Si supieras”, entre otros títulos muy ligados a la memoria del público salsero.',
        ],
        bullets: [
          'Disco 1: Latino, Dame una oportunidad, Clase social, Paco, Decisión cruel, Ni llanto ni flores, Señorita, Me gusta, Mi error, Mosaico 3, Corazón corazón, Persona ideal y Mosaico 2.',
          'Disco 2: Si te marchas / Hoy voy a tomar, Se acabó el amor, Mosaico 1, Panamericana, Virgen, Borrar, Búscame, Aquel lugar, Mentirosa, Pensar, Millón de primaveras, Confianza, Confesiones y Si supieras.',
        ],
      },
      {
        title: 'La historia de Porfi Baloa',
        paragraphs: [
          'Porfi Baloa, conocido como “El Beethoven de la Salsa”, creció bajo la influencia de la salsa gorda, la música cubana, la Fania y la Dimensión Latina. Entre sus referencias también estuvieron intérpretes populares como Juan Gabriel.',
          'Según su propio relato, desde muy joven soñaba con construir una orquesta que respetara los arreglos, la clave y el sonido grande de la salsa. Por eso estudió música en el conservatorio, desarrolló habilidades de escritura y comenzó a tocar de noche mientras observaba cómo reaccionaba el público.',
        ],
      },
      {
        title: 'Salserín y el origen de Los Adolescentes',
        paragraphs: [
          'Porfi Baloa explicó que una de sus primeras grandes decepciones en la música estuvo relacionada con Salserín. Ese episodio terminó empujándolo a crear un nuevo proyecto con las canciones que había venido guardando para cuando tuviera su propio grupo.',
          'A los 18 años comenzó a darle forma a la idea. El 15 de diciembre de 1993 sonó por primera vez Adolescentes Orquesta en la radio con la canción “Anhelo”, interpretada por Wilmer Lozano. La respuesta fue inmediata y confirmó que había un camino claro para seguir.',
        ],
      },
      {
        title: 'Persona Ideal y la narrativa de las canciones',
        paragraphs: [
          'Dentro del repertorio histórico, “Persona Ideal” aparece como una de las piezas más recordadas. Porfi Baloa contó que la canción surgió al imaginar la historia de una joven de buena posición económica que se enamora de un muchacho sin dinero y debe vivir la relación a escondidas por presión familiar.',
          'Esa forma de construir relatos sentimentales, cercanos y fácilmente reconocibles ayudó a consolidar el lenguaje de Adolescentes Orquesta dentro de la salsa romántica.',
        ],
      },
      {
        title: 'El Negro Mendoza y el salto internacional',
        paragraphs: [
          'Porfi Baloa contó que conoció a Rodrigo “El Negro” Mendoza en Barranquilla, durante un concierto en el que también estaba Celia Cruz. Allí le mostró un cassette con “Anhelo” y Mendoza se interesó de inmediato por el proyecto.',
          'De acuerdo con ese relato, fue Mendoza quien propuso el nombre “Adolescent’s Orquesta” y defendió la idea de que sonara en inglés porque el proyecto estaba destinado a volverse internacional.',
        ],
      },
      {
        title: 'La sociedad, la ruptura y el sonido original',
        paragraphs: [
          'Después de asociarse y trabajar juntos, Mendoza se encargó de mover canciones en radio mientras Porfi seguía concentrado en partituras, letras y dirección musical. Con el tiempo, Baloa afirmó que el nombre de la agrupación fue registrado a sus espaldas y que allí comenzó la fractura más conocida alrededor de Adolescentes Orquesta.',
          'En su versión de los hechos, los músicos se quedaron con él y el otro proyecto siguió adelante con nuevos cantantes, pero usando arreglos, letras y canciones que él consideraba de su autoría. Porfi Baloa sostuvo que el sonido original de la agrupación nació de su visión creativa.',
        ],
      },
      {
        title: 'Entrevista a Porfi Baloa sobre Adolescentes Orquesta',
        paragraphs: [
          'Parte de esta historia se apoya en entrevistas y material de investigación recopilado por La Voz Salsa, incluyendo una conversación realizada en Medellín y otra emitida en México. Ese registro ayuda a entender cómo el propio Porfi Baloa quiso contar el origen y la evolución de la agrupación.',
        ],
        videoUrl: 'https://www.youtube.com/embed/o7THwMACs5o',
      },
      {
        title: 'Integrantes que han hecho parte de Adolescentes Orquesta',
        paragraphs: [
          'A lo largo de los años, por Adolescentes Orquesta pasaron varias voces e integrantes que ayudaron a construir su identidad. Esta es parte de la lista que se mencionaba en el archivo original.',
        ],
        bullets: [
          'William Lozano',
          'Charly Villegas',
          'Sócrates Cariaco',
          'Armando Davalillo',
          'Néstor Rivero',
          'Everson Hernández',
          'Ángel Delgado',
          'Óscar Arriaga',
          'Alex Gil',
          'Julio Antillano',
          'Edwards Pimentel',
          'Eliécer Dabuy',
          'Jesús “Godo” Puente',
          'Johan “Condi” Muñoz',
          'David González Jr.',
          'César “Albóndiga” Monge',
        ],
      },
      {
        title: 'Discografía de Adolescentes Orquesta',
        paragraphs: [
          'La discografía histórica de la agrupación ayuda a seguir la evolución del proyecto y a entender por qué varias de sus canciones todavía siguen apareciendo entre las más recordadas del repertorio romántico.',
        ],
        bullets: [
          'Reclamando Nuestro Espacio (1995): “Anhelo”, “Hoy aprendí”, “Dame una oportunidad”, “Amiga”, “No puedo ser tu amigo”, “Tú serás”, “Cruel decisión” y “Señorita”.',
          'Persona Ideal (1996): “Persona ideal”, “Arrepentida”, “Dame un poco más”, “Celos y distancia”, “Clase social”, “Frente a mi ventana”, “Horas lindas” y “Mi error”.',
          'La Misma Pluma (1998): “Huellas”, “Si te marchas”, “Mírame”, “Me negó”, “Confesiones”, “Corazón, corazón”, “Comencemos hoy” y “Llámame”.',
          'Grandes Éxitos (1999): “Persona ideal”, “Anhelo”, “Dame un poco más”, “Hoy aprendí”, “Arrepentida”, “Si te marchas”, “Clase social”, “Me negó” y “Recuerdos”.',
          'Ahora Más Que Nunca (2001): “Recuerdos”, “Latino”, “Envidioso”, “Virgen”, “Chico vacilón”, “Dos inocentes”, “No te burles” y “Me gusta”.',
          'Búscame (2005): “Se acabó el amor”, “Ponte pila”, “Si supieras”, “Cuerpo sin alma”, “Aquel lugar”, “Amor amargo”, “Búscame” y “Mentirosa”.',
          'Lo Nuevo y Lo Mejor (2007): “Se acabó el amor”, “Virgen”, “Me negó”, “Persona ideal”, “Aquel lugar”, “Anhelo”, “Recuerdos” y “Si supieras”.',
          'Clásico en Vivo (2008): “Ponte pila”, “Anhelo”, “Envidioso”, “Se acabó el amor”, “Amor amargo”, “Persona ideal”, “Virgen”, “Recuerdos” y “Me negó / Arrepentida”.',
        ],
      },
      {
        title: 'También puedes ver',
        paragraphs: [
          'Si te interesa seguir explorando este mapa de la salsa romántica, aquí tienes otras lecturas relacionadas dentro del ecosistema de La Voz Salsa.',
        ],
        links: [
          { label: 'Cantantes de salsa', href: '/cantantes-de-salsa/' },
          { label: 'Tito Rojas', href: '/tito-rojas/' },
          { label: 'Grupo Galé', href: '/internacional-grupo-gale-toda-una-historia-musical/' },
          { label: 'Portada de Pulso Salsero', href: '/' },
        ],
      },
    ],
  },
  {
    slug: 'bares-salsa-medellin',
    legacyUrl: 'https://www.lavozsalsa.com/bares-salsa-medellin/',
    category: 'Ciudad',
    title: 'Bares de salsa en Medellín: una ruta para escuchar la ciudad con otros oídos',
    excerpt:
      'Medellín sigue siendo una capital salsera. Esta guía recupera su espíritu melómano y propone una ruta para entender por qué la salsa suena distinto en la ciudad.',
    description:
      'Una guía para recorrer bares de salsa en Medellín y entender por qué la ciudad sigue siendo uno de los territorios salseros más activos de Colombia.',
    featuredRank: 4,
    readingTime: '7 min',
    archiveLabel: 'Guía de ciudad',
    updatedLabel: 'Actualizado en abril de 2026',
    sections: [
      {
        title: 'Medellín no escucha salsa de la misma manera que otras ciudades',
        paragraphs: [
          'La relación de Medellín con la salsa no se explica únicamente por conciertos o moda. Se explica por coleccionistas, pistas de barrio, discotecas históricas y una cultura de escucha que convirtió la música en parte de la vida cotidiana.',
          'Por eso una guía de bares salseros en Medellín no puede limitarse a una lista de lugares. También tiene que leerse como una ruta cultural donde conviven la rumba, la memoria, la melomanía y el baile.',
        ],
      },
      {
        title: 'Lugares y nombres que han marcado conversación',
        paragraphs: [
          'Dentro de esa cartografía salsera aparecen referencias más concretas y vivas de la ciudad. Son Havana en San Juan con la 73, Mulenze y Sarabanda Salsa Bar en la 33, Charrupí Salsa Bar en Manrique la 45 y La Clave en Aranjuez ayudan a dibujar una ruta mucho más real para entender cómo suena la salsa en Medellín.',
          'El valor de esos lugares no es solo comercial. También es simbólico: ayudan a sostener una forma muy particular de vivir la salsa en la ciudad. Y más allá de esos nombres, casi en cada barrio puedes encontrar bares de salsa que mantienen encendida esa tradición.',
        ],
      },
      {
        title: 'Cómo armar tu propia ruta salsera',
        paragraphs: [
          'Si vas a recorrer Medellín con criterio salsero, busca tres cosas: programación consistente, selección musical con identidad y público que realmente escuche el género. Un buen bar de salsa no es solo un lugar para ir de rumba; también es una escuela informal para oír mejor.',
        ],
        bullets: [
          'Empieza por zonas y bares con tradición salsera reconocible, como San Juan, la 33, Manrique y Aranjuez.',
          'Busca programación especial alrededor de conciertos y ferias locales.',
          'Pregunta por las noches de descarga, salsa romántica o colección.',
          'Recuerda que la escena no vive solo en los lugares más conocidos: en muchos barrios hay bares de salsa con identidad propia.',
        ],
      },
    ],
  },
  {
    slug: 'frankie-ruiz-el-papa-de-la-salsa',
    legacyUrl: 'https://www.lavozsalsa.com/frankie-ruiz-el-papa-de-la-salsa/',
    category: 'Perfiles',
    title: 'Frankie Ruiz, el Papá de la Salsa: biografía, éxitos y legado de una voz irrepetible',
    excerpt:
      'Frankie Ruiz sigue siendo uno de los nombres más importantes de la salsa romántica por su voz, sus canciones y el impacto emocional que dejó en varias generaciones.',
    description:
      'Biografía de Frankie Ruiz, el Papá de la Salsa: sus etapas con La Solución y Tommy Olivencia, sus grandes éxitos, su carrera como solista y su legado dentro del género.',
    featuredRank: 5,
    readingTime: '8 min',
    archiveLabel: 'Perfil recuperado',
    updatedLabel: 'Actualizado en abril de 2026',
    coverImage: '/media/covers/frankie-ruiz-el-papa-de-la-salsa.jpg',
    coverAlt: 'Frankie Ruiz en una imagen promocional sobre fondo rojo',
    shareImage: '/media/covers/frankie-ruiz-el-papa-de-la-salsa.jpg',
    sections: [
      {
        title: 'Una voz que marcó la salsa romántica',
        paragraphs: [
          'José Antonio Torresola Ruiz Paterson, conocido artísticamente como Frankie Ruiz y recordado como “El Papá de la Salsa”, nació el 10 de marzo de 1958 en Paterson, Nueva Jersey, y murió el 9 de agosto de 1998 a los 40 años. Su nombre quedó ligado para siempre a una forma de cantar intensa, callejera y profundamente emocional.',
          'Desde muy joven, todavía en la adolescencia, hizo sus primeras grabaciones acompañado de Charlie López y su orquesta. Esa experiencia temprana fue moldeando una voz que más adelante se volvería decisiva para la explosión de la salsa romántica.',
        ],
      },
      {
        title: 'Frankie Ruiz y la Orquesta La Solución',
        paragraphs: [
          'En 1977, cuando la salsa romántica comenzaba a expandirse con más fuerza, Frankie Ruiz se unió a la delantera de la Orquesta La Solución. De esa etapa salieron dos producciones claves, “Frankie Ruiz y La Solución” y “Orquesta La Solución”, que ayudaron a poner su nombre en circulación dentro del género.',
          'Allí quedó uno de los clásicos más recordados de toda su carrera: “La Rueda”. Ese tema ayudó a consolidar una relación muy fuerte entre Frankie y el público salsero, incluso antes de su etapa definitiva como solista.',
        ],
      },
      {
        title: 'Frankie Ruiz y Tommy Olivencia',
        paragraphs: [
          'En la década de los 80 se unió a la orquesta de Tommy Olivencia, otra estación fundamental dentro de su crecimiento artístico. En esa etapa se destacó “Lo Dudo”, incluido en el álbum “Celebrando otro aniversario”, una grabación que reforzó todavía más su potencia interpretativa.',
          'Ese paso por orquestas importantes fue clave porque le dio repertorio, oficio y visibilidad, pero sobre todo le permitió llegar a la carrera solista con una experiencia escénica y vocal ya muy sólida.',
        ],
      },
      {
        title: 'Canciones y éxitos de Frankie Ruiz',
        paragraphs: [
          'La grandeza de Frankie Ruiz también se explica por un repertorio que sigue sonando en emisoras, fiestas, homenajes y colecciones salseras. Estos son algunos de los títulos más recordados de su carrera.',
          'Temas como “Deseándote” condensan muy bien su costado más íntimo y dramático: una forma de cantar el deseo, la pérdida y la intensidad amorosa que lo volvió inconfundible dentro de la salsa romántica.',
        ],
        bullets: [
          'La Rueda',
          'La Cura',
          'Desnúdate Mujer',
          'Tú Con Él',
          'Deseándote',
          'Tú Me Vuelves Loco',
          'Quiero Llenarte',
          'Imposible Amor',
          'Ironía',
          'Lo Dudo',
          'Mi Libertad',
          'Como Lo Hacen',
          'Bailando',
          'Si Te Entregas a Mí',
          'Anda y Ve',
        ],
      },
      {
        title: 'Frankie Ruiz solista',
        paragraphs: [
          'Para 1985 emprendió definitivamente su carrera como solista, ya con una experiencia formada y varios temas emblemáticos que comenzaban a instalarse como parte de un repertorio exitoso. A partir de ahí su popularidad se disparó y su nombre quedó definitivamente asociado a la primera línea de la salsa romántica.',
          'En 1987 fue elegido artista del año en la categoría tropical por Billboard gracias al álbum “Voy Pa’ Encima”, una producción que incluyó temas tan fuertes como “Mi Libertad” y “Desnúdate Mujer”. Ese reconocimiento confirmó que Frankie ya no era solo una gran promesa: era una figura central de la música latina.',
          'Después de atravesar un periodo duro ligado al alcohol y las drogas, logró seguir adelante con discos como “Más Grande Que Nunca”, “Puerto Rico Soy Tuyo” y “Mirándote”, trabajos que sostuvieron su nombre en las primeras posiciones de la radio latina durante los años 90.',
        ],
      },
      {
        title: '¿De qué murió Frankie Ruiz?',
        paragraphs: [
          'Frankie Ruiz murió a causa de cirrosis hepática, después de una carrera tan brillante como dolorosa. Su partida ocurrió poco tiempo después de grabar el álbum “Nacimiento y Recuerdos”, producción que incluso alcanzó a presentar en uno de los escenarios más famosos del mundo: el Madison Square Garden.',
          'Su final fue triste, como también lo fue el de otras grandes figuras de la salsa. Pero más allá de esa herida, lo que permanece es el valor inmenso de una obra que ayudó a definir la sensibilidad de la salsa romántica y que todavía hoy sigue encontrando nuevas generaciones de oyentes.',
        ],
      },
      {
        title: 'Seguir leyendo a Frankie Ruiz en Pulso Salsero',
        paragraphs: [
          'Si quieres seguir explorando cómo reaparece el legado de Frankie Ruiz dentro del archivo de La Voz Salsa, aquí tienes dos historias relacionadas que amplían su influencia en tributos recientes y memoria salsera.',
        ],
        links: [
          {
            label: 'Yo me llamo Frankie Ruiz',
            href: '/yo-me-llamo-frankie-ruiz/',
          },
          {
            label: 'David Zahan y su homenaje a Frankie Ruiz',
            href: '/david-zahan-y-frankie-ruiz-reviviendo-al-papa-de-la-salsa/',
          },
          {
            label: 'Volver a la guía de cantantes de salsa',
            href: '/cantantes-de-salsa/',
          },
        ],
      },
    ],
  },
  {
    slug: 'yo-me-llamo-frankie-ruiz',
    legacyUrl: 'https://www.lavozsalsa.com/yo-me-llamo-frankie-ruiz/',
    category: 'Homenajes',
    title: 'Yo me llamo Frankie Ruiz: por qué su figura sigue reapareciendo en la memoria salsera',
    excerpt:
      'Frankie Ruiz no solo dejó canciones. Dejó una forma de cantar y de doler que sigue apareciendo en homenajes, imitaciones y búsquedas constantes dentro del universo salsero.',
    description:
      'Frankie Ruiz sigue siendo una figura central de la salsa romántica, capaz de reaparecer una y otra vez en homenajes, tributos y búsquedas masivas.',
    featuredRank: 5,
    readingTime: '6 min',
    archiveLabel: 'Archivo de homenajes',
    updatedLabel: 'Actualizado en abril de 2026',
    sections: [
      {
        title: 'Un nombre que nunca sale del radar',
        paragraphs: [
          'Pocas voces siguen despertando tanta identificación como la de Frankie Ruiz. Su repertorio, su intensidad interpretativa y la forma en que encarnó la salsa romántica hicieron que su nombre se mantuviera vivo en varias generaciones de oyentes.',
          'Por eso no sorprende que su figura reaparezca de manera constante en programas, tributos, concursos de imitación y búsquedas digitales. Frankie Ruiz no es solo un recuerdo: es una presencia activa dentro de la cultura salsera.',
        ],
      },
      {
        title: 'El peso de una voz inconfundible',
        paragraphs: [
          'Lo que sostiene su vigencia no es únicamente la nostalgia. También es la fuerza de un repertorio que todavía se escucha en fiestas, emisoras, playlists y homenajes. Canciones como “La cura”, “Deseándote” o “Mi libertad” siguen funcionando como marcas emocionales para el público salsero.',
          'Eso lo convierte en una referencia inevitable cuando se habla de herencia romántica dentro del género.',
        ],
      },
      {
        title: 'Más que imitación, un termómetro cultural',
        paragraphs: [
          'Cada vez que el nombre de Frankie Ruiz regresa a la conversación, lo que realmente se activa es una pregunta más profunda: qué tanto sigue pesando la salsa romántica en la memoria colectiva. Y la respuesta, por ahora, parece clara: pesa muchísimo.',
        ],
      },
      {
        title: 'Uno de los tributos recientes: David Zahan',
        paragraphs: [
          'Dentro de esa cadena de homenajes recientes, una de las historias que más llamó la atención fue la de David Zahan, cantautor salsero colombiano que construyó un proyecto entero alrededor de la admiración que siente por Frankie Ruiz.',
          'Ese caso ayuda a entender que la vigencia de Frankie no se sostiene solo en la nostalgia, sino también en la forma en que nuevos intérpretes siguen encontrando en su legado una referencia artística y emocional.',
        ],
        links: [
          {
            label: 'Leer el perfil principal de Frankie Ruiz',
            href: '/frankie-ruiz-el-papa-de-la-salsa/',
          },
          {
            label: 'Leer la historia de David Zahan y su homenaje a Frankie Ruiz',
            href: '/david-zahan-y-frankie-ruiz-reviviendo-al-papa-de-la-salsa/',
          },
        ],
      },
    ],
  },
  {
    slug: 'david-zahan-y-frankie-ruiz-reviviendo-al-papa-de-la-salsa',
    legacyUrl: 'https://www.lavozsalsa.com/david-zahan-y-frankie-ruiz-reviviendo-al-papa-de-la-salsa/',
    category: 'Homenajes',
    title: 'David Zahan y Frankie Ruiz: un homenaje que volvió a encender la memoria salsera',
    excerpt:
      'David Zahan llevó su admiración por Frankie Ruiz a un proyecto de alcance internacional y se convirtió en uno de los tributos recientes más visibles alrededor del legado del Papá de la Salsa.',
    description:
      'David Zahan, cantante salsero colombiano, convirtió su homenaje a Frankie Ruiz en un proyecto de amplio alcance y en uno de los tributos recientes más comentados dentro de la salsa romántica.',
    featuredRank: 9,
    readingTime: '6 min',
    archiveLabel: 'Tributo recuperado',
    updatedLabel: 'Actualizado en abril de 2026',
    coverImage: '/media/covers/david-zahan-frankie-ruiz-cover.jpg',
    coverAlt: 'David Zahan en la portada de Reviviendo a Frankie Ruiz',
    shareImage: '/media/covers/david-zahan-frankie-ruiz-cover.jpg',
    sections: [
      {
        title: 'Un cantante colombiano marcado por Frankie Ruiz',
        paragraphs: [
          'Andrés David Saldarriaga Salazar, conocido artísticamente como David Zahan, es un cantautor salsero colombiano nacido en Medellín. Su gusto por la salsa comenzó desde pequeño, cuando en su casa sonaban los LP que escuchaba su padre.',
          'Entre todas esas influencias, el nombre que terminó marcándolo con más fuerza fue Frankie Ruiz. Se volvió su gran inspiración y su principal referente musical, al punto de que con trabajo, disciplina y constancia terminó construyendo una de las voces más cercanas al timbre del Papá de la Salsa que hoy pueden encontrarse dentro del circuito salsero.',
        ],
      },
      {
        title: 'Reviviendo a Frankie Ruiz',
        paragraphs: [
          'David Zahan alcanzó reconocimiento internacional con su homenaje “Reviviendo a Frankie Ruiz”, un proyecto que ayudó a poner su nombre en circulación mucho más allá de Colombia. Según la nota original, ese trabajo superó los 100 millones de reproducciones en YouTube en menos de un año.',
          'Más allá de la cifra, lo importante es lo que ese fenómeno revela: Frankie Ruiz sigue teniendo una presencia tan fuerte dentro de la memoria salsera que todavía puede mover audiencias masivas a través de nuevos tributos.',
        ],
      },
      {
        title: 'Yo me llamo Frankie Ruiz y el salto masivo en televisión',
        paragraphs: [
          'Una parte importante de esa visibilidad llegó con su participación en el reality “Yo me llamo” del Canal Caracol, uno de los formatos más populares de la televisión colombiana. Allí apareció como “Yo me llamo Frankie Ruiz” y logró cautivar al jurado con una interpretación que reforzó todavía más la relación entre su voz y el legado del cantante boricua.',
          'En su presentación del 25 de septiembre de 2018, David Zahan interpretó “La Rueda”, uno de los clásicos asociados a Frankie Ruiz en su etapa con La Solución. Esa noche recibió tres sí del jurado conformado por Amparo Grisales, Pipe Bueno y César Escola, junto con varios elogios por la fuerza de su interpretación.',
        ],
        links: [
          {
            label: 'Volver a la nota de Yo me llamo Frankie Ruiz',
            href: '/yo-me-llamo-frankie-ruiz/',
          },
        ],
      },
      {
        title: 'Una carrera propia más allá del tributo',
        paragraphs: [
          'Aunque el homenaje a Frankie Ruiz le dio una enorme exposición, la historia de David Zahan no empezó allí. Según el archivo original, inició su carrera como solista en 2006 y ganó visibilidad con “Te Echo de Menos”, un tema que sonó con fuerza dentro de la salsa romántica en emisoras de Colombia y México.',
          'Desde entonces ha seguido lanzando material propio, trabajando con exponentes y productores reconocidos de la salsa y llevando su estilo romántico a distintos países de Latinoamérica. Eso le da otra dimensión a la historia: el tributo a Frankie Ruiz no fue solo una imitación celebrada por el público, sino también una plataforma desde la cual Zahan consolidó su propia carrera dentro del género.',
        ],
      },
      {
        title: 'Mantener vivo el legado del Papá de la Salsa',
        paragraphs: [
          'En la nota original, David Zahan decía que daba gracias a Dios por el don de interpretar y mantener vivo el legado de su ídolo. También aclaraba que nunca se trató de reemplazar a Frankie Ruiz, sino de rendirle homenaje con respeto y dedicación.',
          'Ese matiz es importante porque explica por qué ciertos tributos sí conectan con el público salsero: no funcionan como sustitución, sino como una manera de volver a activar la memoria alrededor de una figura inmensa de la salsa romántica.',
          'La historia también recuerda que Frankie Ruiz murió en 1998, a los 40 años, a causa de cirrosis hepática. Se fue en un momento muy alto de su carrera, pero dejó un legado que todavía es citado por artistas de la salsa, el reguetón y otros géneros musicales.',
        ],
      },
      {
        title: 'Fuentes y enlaces relacionados',
        paragraphs: [
          'Estas referencias ayudan a contextualizar mejor la historia de David Zahan y su homenaje a Frankie Ruiz.',
        ],
        links: [
          { label: 'Leer el perfil de Frankie Ruiz en Pulso Salsero', href: '/frankie-ruiz-el-papa-de-la-salsa/' },
          { label: 'Volver a la nota de Yo me llamo Frankie Ruiz', href: '/yo-me-llamo-frankie-ruiz/' },
        ],
      },
    ],
  },
  {
    slug: 'mimi-ibarra-cantautora',
    legacyUrl: 'https://www.lavozsalsa.com/mimi-ibarra-cantautora/',
    category: 'Perfiles',
    title: 'Mimi Ibarra, cantautora colombiana y compositora de grandes éxitos de la salsa',
    excerpt:
      'Mimi Ibarra se convirtió en una de las compositoras más solicitadas de la salsa romántica y luego llevó esa sensibilidad a su propia carrera como intérprete.',
    description:
      'Biografía de Mimi Ibarra, cantautora colombiana y autora de canciones grabadas por Tito Rojas, Puerto Rican Power, Anthony Cruz, Maelo Ruiz y otros nombres de la salsa.',
    featuredRank: 6,
    readingTime: '8 min',
    archiveLabel: 'Perfil recuperado',
    updatedLabel: 'Actualizado en abril de 2026',
    coverImage: '/media/covers/mimi-ibarra-cantautora-colombiana.jpg',
    coverAlt: 'Mimi Ibarra en una foto promocional sobre fondo gris',
    shareImage: '/media/covers/mimi-ibarra-cantautora-colombiana.jpg',
    sections: [
      {
        title: 'Una cantautora colombiana con sello propio',
        paragraphs: [
          'Mimi Ibarra, cantautora colombiana, es hoy por hoy una de las compositoras más solicitadas y exitosas dentro del universo salsero. Sus letras y melodías dejaron una huella propia en la salsa romántica, con un estilo que mezcla sensibilidad, fuerza femenina y una manera muy particular de narrar el amor.',
          'Esa identidad la convirtió en una referencia especial dentro del género. Primero se abrió camino como autora de canciones grabadas por grandes intérpretes y más adelante llevó esa misma sensibilidad a su faceta como cantante.',
        ],
      },
      {
        title: 'Biografía Mimi Ibarra: primero compositora, luego intérprete',
        paragraphs: [
          'Desde niña soñó con incursionar en la música como intérprete, aunque su reconocimiento internacional comenzó primero por otra puerta: la composición. Mimi empezó escribiendo canciones y encontró en ese ejercicio una vocación que ella misma ha descrito como un regalo de Dios.',
          'Después de sus primeros pasos en Colombia, su obra encontró un espacio decisivo en Puerto Rico con el sello Musical Productions. Allí escribió canciones para distintos artistas y terminó conquistando al público salsero con talento, creatividad y una capacidad especial para convertir emociones cotidianas en himnos románticos.',
        ],
      },
      {
        title: 'Mimi Ibarra: cantautora de grandes éxitos',
        paragraphs: [
          'Entre las composiciones de Mimi Ibarra aparecen títulos que siguen muy presentes en la memoria del público: "Señora", "Juguete de nadie", "Déjala", "Morena linda", "Dile a él" y "Te propongo". Su catálogo terminó en voces de gran peso como Tito Rojas, La Puerto Rican Power, Tito Gómez, Anthony Cruz, Maelo Ruiz y Oscar D’ León.',
          'También se suman otros temas muy recordados dentro del circuito salsero, como "Te necesito mi amor", "Por qué te quiero tanto", "Por esa mujer", "También nos duele", "Lloraré", "No pude evitarlo", "Eres la única", "Ganas" y "Nunca te fallé". Todo ese recorrido reafirma algo importante: Mimi no fue una autora de una sola canción exitosa, sino una compositora capaz de sostener repertorio, identidad y permanencia.',
        ],
        links: [
          {
            label: 'Leer también: Tito Rojas en Pulso Salsero',
            href: '/tito-rojas/',
          },
        ],
      },
      {
        title: 'Romántica por excelencia y dueña de su propia voz',
        paragraphs: [
          'Mimi Ibarra es una romántica por excelencia. Esa misma capacidad para escribir grandes canciones la llevó a hacer realidad su sueño más personal: lanzar su carrera como intérprete con temas de su propia inspiración y una voz que conserva cercanía, sutileza y mucha intención emocional.',
          'En esa faceta aparecen canciones como "Qué tiene ella", "Marinero de amor", "Descarado", "Paso, paso" y "No puede ser", tema con el que ganó un premio Diplo en Puerto Rico. Más adelante llegarían producciones en las que también sobresalen "Duele", a dúo con Tito Rojas, "Si no estás junto a mí", "Que nadie se entere" y su interpretación de la balada pop "Quién eres tú".',
        ],
      },
      {
        title: 'Una presencia que sigue vigente dentro y fuera de Colombia',
        paragraphs: [
          'Su música y su voz han sonado en países como República Dominicana, Venezuela, Ecuador, Puerto Rico, Colombia, Canadá, Europa y Estados Unidos, donde reside actualmente. En concierto, Mimi Ibarra conecta con el público desde frases cargadas de pasión, ilusión y realismo, con una puesta en escena marcada por carisma, ternura y experiencia.',
          'Por eso sigue siendo una referencia valiosa cuando se habla de mujeres que escribieron, cantaron y dejaron huella dentro de la salsa. Su trayectoria no solo enriquece la historia del género: también demuestra que detrás de muchos éxitos inolvidables hubo una compositora colombiana con voz propia y una visión muy clara de lo que quería decir.',
        ],
        links: [
          {
            label: 'Ver la guía de cantantes de salsa',
            href: '/cantantes-de-salsa/',
          },
        ],
      },
    ],
  },
  {
    slug: 'internacional-grupo-gale-toda-una-historia-musical',
    legacyUrl: 'https://www.lavozsalsa.com/internacional-grupo-gale-toda-una-historia-musical/',
    category: 'Perfiles',
    title: 'Grupo Galé: una historia musical que ayudó a consolidar el sonido salsero de Medellín',
    excerpt:
      'Repasamos la historia de Grupo Galé, su discografía, el papel de Diego Galé y la manera en que la agrupación se convirtió en una referencia internacional de la salsa hecha en Colombia.',
    description:
      'Grupo Galé y su historia musical: una referencia central para entender el desarrollo del sonido salsero en Medellín, Colombia y su proyección internacional.',
    featuredRank: 7,
    readingTime: '11 min',
    archiveLabel: 'Perfil recuperado',
    updatedLabel: 'Actualizado en abril de 2026',
    coverImage: '/media/covers/diego-gale-y-su-grupo-gale.jpg',
    coverAlt: 'Diego Galé y varios integrantes de Grupo Galé en una foto promocional',
    shareImage: '/media/covers/diego-gale-y-su-grupo-gale.jpg',
    sections: [
      {
        title: 'Un nombre que pesa en la historia local',
        paragraphs: [
          'En 1989 Diego Galé creó el Grupo Galé y lo convirtió con el tiempo en una de las agrupaciones salseras más exitosas de Colombia a nivel internacional. Su historia conecta producción, repertorio, trabajo de orquesta y una relación muy estrecha con el público de Medellín, ciudad clave para entender su crecimiento.',
          'A partir de 1992, Diego Galé también se consolidó como compositor, arreglista y productor musical de artistas de renombre, de modo que la historia del grupo no puede separarse de la figura del músico que le dio dirección, sonido e identidad.',
          'Dentro de ese recorrido destaca “El amor de mi vida”, tema de la producción “Auténtico” de 2007, que recibió nominación a los premios Grammy y se convirtió en una de las insignias de la agrupación y en una de las canciones favoritas del público.',
        ],
      },
      {
        title: 'Éxitos Grupo Galé y discografía',
        paragraphs: [
          'Lo que vuelve importante a Grupo Galé no es solo un puñado de éxitos, sino la continuidad de una discografía amplia que fue marcando distintas etapas de la salsa hecha en Medellín. Esa constancia explica por qué la agrupación terminó convirtiéndose en institución y no solo en una orquesta de temporada.',
        ],
        bullets: [
          '1989. Frívolo',
          '1990. Nuestra Salsa',
          '1991. Sensitivo',
          '1992. A Conciencia',
          '1993. Sin Apariencias',
          '1994. Afirmando',
          '1996. Dominando La Salsa',
          '1997. Grandes Hits / Salsadicción',
          '1998. En Su Sitio',
          '1999. Grupo Galé 10 Años',
          '2000. Con El Mismo Swing',
          '2002. 20 De Julio',
          '2004. Esencia Latina',
          '2004. Los Mejores 30',
          '2005. 15 Aniversario CD/DVD En Vivo',
          '2007. Auténtico',
          '2009. Instinto',
          '2011. Deluxe',
          '2012. Diego Galé… Entre Amigos',
          '2015. Mi Mundo Perfecto',
        ],
      },
      {
        title: 'Noticias Grupo Galé: Después del Silencio y Mi Mundo Perfecto',
        paragraphs: [
          'En Medellín, Grupo Galé grabó el DVD de la producción “Después del Silencio”, también conocida como “Mi Mundo Perfecto”, en una noche romántica a la que asistieron medios, amigos y seguidores del grupo. Allí quedó registrada una de las producciones más importantes de su trayectoria reciente.',
          'Con George Valencia, Carlos Llamosa, David Carl y Diego Giraldo al frente de las voces, más una banda de gran formato, el grupo interpretó uno a uno los temas de este álbum. La noche combinó el costado romántico de Galé con el sabor del Pacífico y la presencia de invitados cercanos al universo musical de Diego Galé.',
          '“Después del Silencio” significó una pausa creativa y espiritual para Diego Galé, y al mismo tiempo un nuevo impulso para una agrupación que regresó con una producción cargada de sentimiento romántico, energía bailable y reafirmación sonora.',
        ],
        bullets: [
          'Temas destacados del DVD: “Después del Silencio”, “Síguele el paso”, “Mi mundo perfecto”, “Dicen de ella”, “Qué pasa corazón”, “Mujer de fantasía”, “Tan solo tú”, “Recuerdo que te amé”, “Y un día te fuiste”, “Kilele”, “Te quiero para mí”, “Mi Colombia” y “El vacilón”.',
          'Voces del proyecto: George Valencia, David Carl, Carlos Llamosa y Jaime Galé.',
          'Músicos presentes: Giovanny Montoya, Ostual Serna, Julián Arias, Andrés Ríos, Diego Galé, Luis Vélez “Petato”, Jimmy Galé, Oscar Abueta, Hernán “Tato” Benítez, Diego Laverde, Javier Aponza, Juan Pablo Castaño, Ismael Jauregui, Morist Jiménez, Juan Pablo Valencia, Leo Morales, Fredy Galé y Yeison Garzón.',
        ],
      },
      {
        title: 'Grandes éxitos, aniversario y La Gente Pide',
        paragraphs: [
          'En el Casino Hollywood de Medellín, Grupo Galé presentó una noche construida sobre sus éxitos y clásicos de la salsa romántica, evento que sirvió como punto de partida para la grabación de un DVD internacional de grandes éxitos con motivo de su aniversario 27. Esa escena reafirmó el lugar del grupo como orgullo salsero colombiano con alcance latinoamericano y europeo.',
          'Años después llegaría “La Gente Pide”, producción presentada en 2020 como una respuesta directa al gusto del público. El proyecto mantuvo la apuesta por las melodías románticas, pero con una energía renovada, nuevas voces y un sonido alineado con la identidad histórica de la agrupación.',
          'En esa etapa apareció la incorporación del venezolano Marcial Istúriz, además del trabajo vocal de Carlos Llamosa, Tatán Betancur y Tiko Bermúdez. La producción fue grabada entre estudios de Miami y Colombia, con autoría compartida entre Diego Galé y varios compositores cercanos al proyecto.',
        ],
      },
      {
        title: 'Acerca de Diego Galé',
        paragraphs: [
          'Hablar de Grupo Galé también obliga a detenerse en Diego Galé, uno de los nombres más importantes de la música tropical hecha en Medellín. Productor, compositor, director, percusionista e instrumentista, ha dedicado su vida artística al conocimiento y la integración de ritmos afrocubanos, puertorriqueños, neoyorquinos y tropicales colombianos.',
          'Su carrera comenzó desde muy joven bajo la influencia del Caribe y del ambiente musical que lo rodeaba. Hijo del bolerista Jaime Galé, inició en la orquesta de su padre y luego hizo parte de agrupaciones como Wanda Kenya y Fruko y sus Tesos, antes de seguir profundizando su formación musical.',
          'Ya en Miami, estudió música y se proyectó como percusionista de alto nivel. Más adelante regresó a Colombia para trabajar con Jairo Varela y Grupo Niche, participando en algunas de las grabaciones más importantes de esa agrupación y consolidando una reputación que lo llevó a múltiples estudios y escenarios.',
        ],
      },
      {
        title: 'Diego Galé como productor, músico y director',
        paragraphs: [
          'La carrera de Diego Galé como productor es inmensa. Ha trabajado en discos de Maelo Ruiz, Richie Ray y Bobby Cruz, Tito Nieves, Tony Vega, Andy Montañez, David Pabón, Ismael Miranda, Luisito Carrión, Willie González, Frankie Negrón, Tito Gómez, Pedro Arroyo y muchos otros nombres del género.',
          'Como músico y percusionista, también ha compartido proyectos y conciertos con artistas como Luis Enrique, D.L.G., Marc Anthony, Olga Tañón, Yuri Buenaventura, Los Titanes, Grupo Niche, Alejandro Fernández, N’Klabe, Víctor Manuelle, La India, Sergio George, Cheo Feliciano, Óscar D’León y Celia Cruz.',
          'Entre los hitos de su carrera aparecen la dirección de Colombia All Star y Grupo Galé en el Madison Square Garden, participaciones en festivales de Europa y Curazao, su trabajo con Sergio George and his All Stars, dos invitaciones como percusionista de la Fania All Star y la producción de materiales didácticos como “Percusivo”.',
          'A esto se suma su paso por Discos Fuentes como productor exclusivo entre 2001 y 2003, y por Codiscos como vicepresidente de A&R de salsa entre 2004 y 2010, además de su faceta como productor de música católica y cristiana.',
        ],
      },
      {
        title: 'Diego Galé entre amigos y una historia que sigue dialogando con el presente',
        paragraphs: [
          'En 2012, Diego Galé concentró su atención en “Diego Galé… Entre Amigos”, un proyecto grabado en Medellín con una larga lista de invitados y pensado como una celebración de su disciplina, constancia y respeto ganado dentro del mundo salsero. Allí participaron voces y músicos como Tito Nieves, Oswaldo Román, Wichy Camacho, Julio Voltio, Fruko, Mauro Mosquera, Ángeles, Jaime Galé padre, Willie González y Johnny Rivera, entre otros.',
          'Ese mismo periodo lo encontró activo en producciones como la de Yan Collazo, en la grabación del DVD de Salsa Giants en Curazao y en sesiones para el álbum “3.0” de Marc Anthony como percusionista. Para los Latin Grammy 2013 recibió mención por su trabajo como músico ejecutante en producciones premiadas como Salsa Giants y el proyecto de Marc Anthony.',
          'Por todo eso, Grupo Galé y Diego Galé siguen apareciendo una y otra vez dentro del archivo salsero de Medellín. No se trata solo de mirar hacia atrás: se trata de entender por qué esta historia sigue siendo una brújula para leer la salsa colombiana en clave de presente y de futuro.',
        ],
      },
    ],
  },
  {
    slug: 'tito-rojas',
    legacyUrl: 'https://www.lavozsalsa.com/tito-rojas/',
    category: 'Perfiles',
    title: 'Tito Rojas: la fuerza de una voz que sigue marcando a la salsa romántica',
    excerpt:
      'Tito Rojas, “El Gallo Salsero”, dejó canciones, discos y una presencia vocal que todavía pesa en la memoria de cualquier oyente de salsa romántica.',
    description:
      'Canciones, biografía y discografía de Tito Rojas, uno de los grandes referentes de la salsa romántica y una voz esencial del repertorio latino.',
    featuredRank: 8,
    readingTime: '10 min',
    archiveLabel: 'Perfil recuperado',
    updatedLabel: 'Actualizado en abril de 2026',
    coverImage: '/media/covers/tito-rojas-el-gallo-de-la-salsa.jpg',
    coverAlt: 'Tito Rojas con traje gris y micrófono en una imagen promocional',
    shareImage: '/media/covers/tito-rojas-el-gallo-de-la-salsa.jpg',
    sections: [
      {
        title: 'Un intérprete de peso propio',
        paragraphs: [
          'Tito Rojas, uno de los exponentes de la salsa más cotizados dentro del género, construyó una carrera de más de cuatro décadas en las que convirtió varios de sus temas en clásicos obligados del repertorio salsero. Por eso, cuando se habla de “El Gallo Salsero”, no se habla solo de popularidad: se habla de una voz con sello, carácter y permanencia.',
          'Tito Rojas pertenece a ese grupo de cantantes que no necesitan una presentación larga entre salseros. Su presencia escénica, la manera en que asumió el repertorio romántico y la conexión emocional que lograba con el público lo convirtieron en una figura de referencia para distintas generaciones.',
        ],
      },
      {
        title: 'Canciones Tito Rojas',
        paragraphs: [
          'Buena parte de su permanencia está en la fuerza de un cancionero que todavía conecta con el público. Estos son algunos de los éxitos más recordados de Tito Rojas dentro de una discografía que sigue sonando con fuerza entre melómanos, bailadores y oyentes de salsa romántica.',
        ],
        bullets: [
          'Siempre seré',
          'Es mi mujer',
          'Señora',
          'Condéname a tu amor',
          'Señora de madrugada',
          'Claro',
          'Amigo',
          'Sensual',
          'Lloro',
          'Quiero hacerte el amor',
          'A ti volveré',
          'Déjala',
          'Ella se hizo deseo',
          'Esperándote',
          'He chocado con la vida',
          'Lo que te queda',
          'Nadie es eterno',
          'Por mujeres como tú',
          'Te prefiero a ti',
          'Dime si eres feliz',
        ],
      },
      {
        title: 'Biografía Tito Rojas',
        paragraphs: [
          'Tito Rojas hizo sus comienzos en la Internacional del maestro Pedro Conga, una etapa decisiva para su formación profesional dentro del circuito salsero. Más adelante se dio el encuentro con Justo Betancourt, padrino de su hija Kitsha, y de allí surgió el apodo que lo acompañaría durante toda la vida artística: “El Gallo Salsero”.',
          'Después de grabar producciones junto a Betancourt, Tito Rojas creó su Conjunto Borincano y siguió abriendo camino con una voz cada vez más reconocible. Ese recorrido fue marcando el inicio de una etapa de mayor visibilidad y preparó el terreno para su expansión internacional.',
        ],
      },
      {
        title: 'Tito Rojas con la Puerto Rican Power',
        paragraphs: [
          'En la década de los 80 se unió a Luisito Ayala y su Puerto Rican Power, una alianza que llevó su voz a un nuevo nivel de reconocimiento en varios países. Allí quedaron grabaciones que en Colombia, Puerto Rico y otras plazas salseras siguen siendo muy apetecidas por el público.',
          'De esa etapa quedaron títulos que ayudaron a consolidar su nombre antes de la explosión definitiva como solista.',
        ],
        bullets: [
          'Amar no se puede apurar',
          'No puedo prescindir de ti',
          'Noche de bodas',
          'Con ella',
        ],
      },
      {
        title: 'El Gallo Salsero como solista',
        paragraphs: [
          'En los años 90, Tito Rojas dio un giro definitivo a su carrera y se lanzó como solista con un estilo ya completamente definido. Ahí obtuvo el más alto reconocimiento nacional e internacional, con canciones que cruzaron generaciones y todavía hoy siguen presentes en emisoras, fiestas, colecciones y búsquedas del género.',
          'También grabó con el maestro Julio Gunda Merced y dejó huella con una forma de cantar que combinaba fuerza, drama y cercanía popular. A eso se suman composiciones de la colombiana Mimi Ibarra que se convirtieron en éxitos de su repertorio, como “Por qué te quiero tanto”, “Señora” y el dúo “Duele”.',
        ],
      },
      {
        title: 'Tito Rojas discografía esencial',
        paragraphs: [
          'La discografía de Tito Rojas muestra por qué su legado no depende de una sola época. Hay discos de orquesta, etapas de consolidación, colecciones en vivo, recopilaciones y producciones tardías que siguieron nutriendo su repertorio.',
          'Esta selección resume buena parte de los álbumes más recordados que circularon entre salseros y coleccionistas a lo largo de su carrera.',
        ],
        bullets: [
          '1980. Tito Rojas y El Conjunto Borincano: “El vendedor”, “Huye pa’ lla”, “Dile la verdad”, “Laile”, “Con velo y corona”, “Miedo me da”, “Mejor que siempre”, “A la montaña” y “Me mata la soledad”.',
          '1990. Sensual: “Doble”, “Me voy o me quedo”, “Tormenta de amor”, “Ella se hizo deseo”, “Sensual”, “Siempre seré” y “Este amor”.',
          '1991. Tres Mujeres: “Amor de mentira”, “No estoy”, “Contigo aprendí”, “Quiéreme tal como soy”, “Tres mujeres”, “Piel con piel”, “Te arrancaré de mí” y “Noche de boda”.',
          '1992. Condéname: “Porque este amor”, “Quiero llenar tu vida”, “Amor del bueno”, “Nadie es eterno”, “Condéname a tu amor”, “Señora”, “Ahora contigo” y “A ti volveré”.',
          '1994. Curacao Salsa: “Señora de madrugada”, “Enamórame”, “Lo que te queda” y “Nadie es eterno”.',
          '1994. A Mi Estilo: “Señora de madrugada”, “Dime si eres feliz”, “Por qué te quiero tanto”, “Quiero ser tuyo”, “Enamórame”, “He chocado con la vida” y “Lo que te queda”.',
          '1995. Derecho Propio: “Esperándote”, “Enamorado de ti”, “Lloraré”, “Te quedarás conmigo”, “Cuando estoy contigo”, “Claro” y “Usted”.',
          '1997. Pal Pueblo: “Lloro”, “Si ella supiera”, “Ayúdame a olvidarla”, “Es mi mujer”, “Yo no te olvido”, “Soñando con tu nombre”, “Me lleva, me lleva” y “Sin ti”.',
          '1999. Navidad con Tito Rojas: “Cantemos todos cantemos”, “Tiempos navideños”, “Voy a parrandear”, “Cuando den las doce”, “El julepe”, “Yo no puedo”, “Ponle por nombre Jesús” y “Medley navideño”.',
          '1999. Alegrías y Penas: “Siempre seré”, “Te quiero para mí”, “Te amo tanto”, “América”, “Por mujeres como tú”, “Definitivamente” y “No me dejes solo”.',
          '2000. Rompiendo Noches: “Qué más tú quieres de mí”, “Como tú”, “Perdóname”, “A todas las mujeres”, “El amor que tú me das”, “No lo olvido”, “Hoy se lo digo a esa mujer”, “Qué te vaya bonito”, “Lo que vivo con ella” y “La gente dice”.',
          '2001. Quiero Llegar a Casa: “Quiero llegar a casa”, “Así como tú”, “Pensarás en mí”, “Vivir sin tu amor”, “Nada es posible sin ti”, “Te lo pido Señor” y “Cuánto te quiero”.',
          '2001. Auténticamente En Vivo: recoge títulos como “Quiéreme tal como soy”, “Dime si eres feliz”, “Lloraré”, “Tormenta de amor”, “Ella se hizo deseo”, “Es mi mujer”, “Nadie es eterno” y “Por mujeres como tú”.',
          '2002. 10 Anniversario: repasa canciones como “Tres mujeres”, “Quiéreme tal como soy”, “Porque este amor”, “Siempre seré”, “Amar no se puede apurar”, “Amigo”, “Claro”, “Te quedarás conmigo” y “Condéname a tu amor”.',
          '2003. Doble Platino: “Todo ha cambiado”, “Libre soy”, “Cárcel de amor”, “Amor de cristal”, “Volver volver” y una revisión amplia de repertorio anterior.',
          '2003. Canta El Gallo y El De Siempre: dos producciones que mantuvieron en circulación éxitos como “Por mujeres como tú”, “Siempre seré”, “Lloraré”, “Condéname a tu amor”, “El gallo no olvida” y “Estoy rendido”.',
          '2004. Tradicional: “Todita tú”, “Quiero”, “Mi gallinita”, “Me quedé con las ganas”, “Bésame”, “Las mujeres” y “Si tú vas”.',
          '2005. Borrón y Cuenta Nueva: “Si me faltas tú”, “Yo soy el malo”, “Las quiero a las dos”, “Qué locura”, “Cuando un hombre se enamora” y “Esa clase de mujer”.',
          '2007. Sin Comentarios y Éxitos y Más: una etapa donde convivieron canciones nuevas y recopilaciones con títulos como “Quédate conmigo”, “No me abandones”, “Dígame señora”, “Nadie es eterno”, “Cuídala” y “Después de Dios, las mujeres”.',
          '2014. El Viajero: “Ven y ven”, “Esa clase de mujer”, “Sigo pa’ lante”, “Caray, caray”, “Por ella”, “Agúzate y come berro”, “Rebeldía” y “Muchachas de Guatire”.',
          '2015. 1: una compilación que reúne “Lo que te queda”, “Siempre seré”, “Señora de madrugada”, “Condéname a tu amor”, “Nadie es eterno”, “Por mujeres como tú”, “Señora”, “A ti volveré”, “Esperándote” y “Es mi mujer”, entre otras.',
        ],
      },
      {
        title: 'Por qué sigue tan presente',
        paragraphs: [
          'Cuando una figura como Tito Rojas continúa apareciendo entre las búsquedas más fuertes del género, lo que se confirma es que su legado no quedó detenido en la nostalgia. Sigue operando como referencia viva dentro del mapa salsero.',
          'Su cancionero, su timbre y la memoria colectiva que dejó explican por qué “El Gallo Salsero” sigue siendo uno de los nombres más consultados, cantados y recordados dentro de la salsa romántica.',
        ],
      },
    ],
  },
];

const pressCollections = [
  {
    key: 'guias',
    title: 'Guías esenciales',
    description: 'Grandes puertas de entrada para entender artistas, repertorios y conversaciones que siguen moviendo búsquedas dentro del universo salsero.',
    slugs: ['cantantes-de-salsa', 'exitos-de-la-salsa-romantica', 'descargar-salsa', 'salsa-baul'],
  },
  {
    key: 'archivo',
    title: 'Archivo, ciudad y conversación',
    description: 'Historias donde se cruzan memoria, Medellín, escena local y conversación cultural alrededor de la salsa.',
    slugs: [
      'adolescentes-orquesta-la-historia-verdadera-de-porfi-baloa',
      'bares-salsa-medellin',
      'yo-me-llamo-frankie-ruiz',
      'david-zahan-y-frankie-ruiz-reviviendo-al-papa-de-la-salsa',
    ],
  },
  {
    key: 'perfiles',
    title: 'Perfiles y legado',
    description: 'Perfiles de artistas y referentes que siguen sosteniendo memoria, escucha activa y autoridad dentro del género.',
    slugs: [
      'frankie-ruiz-el-papa-de-la-salsa',
      'mimi-ibarra-cantautora',
      'internacional-grupo-gale-toda-una-historia-musical',
      'tito-rojas',
    ],
  },
];

module.exports = { pressArticles, pressCollections };
