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
    slug: 'salsa-baul',
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
    category: 'Historia',
    title: 'Adolescentes Orquesta: la huella de Porfi Baloa en la salsa romántica',
    excerpt:
      'Una lectura del proyecto creado por Porfi Baloa y de por qué su sonido sigue siendo referencia obligada cuando se habla de salsa romántica hecha desde Venezuela.',
    description:
      'Adolescentes Orquesta y Porfi Baloa: una historia clave para entender la salsa romántica venezolana y su impacto en Latinoamérica.',
    featuredRank: 3,
    readingTime: '7 min',
    archiveLabel: 'Historia recuperada',
    updatedLabel: 'Actualizado en abril de 2026',
    sections: [
      {
        title: 'Un proyecto que marcó una época',
        paragraphs: [
          'Adolescentes Orquesta se convirtió en una referencia inevitable para entender la salsa romántica hecha desde Venezuela. Más que una agrupación de moda, fue un proyecto con dirección clara, identidad melódica y una producción que logró entrar en la conversación salsera continental.',
          'Detrás de esa identidad aparece el nombre de Porfi Baloa, arreglista, músico y arquitecto de un sonido que conectó con una generación completa de oyentes en América Latina.',
        ],
      },
      {
        title: 'La firma de Porfi Baloa',
        paragraphs: [
          'Hablar de Porfi Baloa es hablar de oído, criterio y dirección musical. Su papel no se limitó a producir canciones. También ayudó a estructurar una forma de hacer salsa romántica con intención comercial, sí, pero sin perder oficio musical.',
          'Ese equilibrio entre melodía, sentimiento y factura sonora es parte de lo que explica por qué Adolescentes Orquesta sigue apareciendo en búsquedas, homenajes y listas esenciales del género.',
        ],
      },
      {
        title: 'Por qué sigue importando hoy',
        paragraphs: [
          'La historia de Adolescentes Orquesta importa porque muestra cómo una agrupación puede construir repertorio, identidad y permanencia más allá del momento del hit. También recuerda que la salsa romántica no fue un fenómeno superficial, sino una escuela de interpretación, producción y conexión con la audiencia.',
          'En esa memoria compartida, Porfi Baloa sigue ocupando un lugar central.',
        ],
      },
    ],
  },
  {
    slug: 'bares-salsa-medellin',
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
          'Dentro de esa cartografía salsera aparecen referencias que durante años ayudaron a formar públicos y escenas: Tíbiri, Son Havana, El Eslabón Prendido, Oye Bonita y otros espacios que, en distintos momentos, sirvieron de punto de encuentro para melómanos, bailadores y promotores del género.',
          'El valor de esos lugares no es solo comercial. También es simbólico: muchos ayudaron a sostener una forma muy particular de vivir la salsa en Medellín.',
        ],
      },
      {
        title: 'Cómo armar tu propia ruta salsera',
        paragraphs: [
          'Si vas a recorrer la ciudad con criterio salsero, busca tres cosas: programación consistente, selección musical con identidad y público que realmente escuche el género. Un buen bar de salsa no es solo un lugar para ir de rumba; también es una escuela informal para oír mejor.',
        ],
        bullets: [
          'Empieza por lugares con tradición y comunidad melómana.',
          'Busca programación especial alrededor de conciertos y ferias locales.',
          'Pregunta por las noches de descarga, salsa romántica o colección.',
          'Sigue la conversación en plataformas y medios especializados de la ciudad.',
        ],
      },
    ],
  },
  {
    slug: 'yo-me-llamo-frankie-ruiz',
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
    ],
  },
  {
    slug: 'mimi-ibarra-cantautora',
    category: 'Perfiles',
    title: 'Mimi Ibarra: una cantautora que convirtió sensibilidad y carácter en sello propio',
    excerpt:
      'Una mirada a la trayectoria de Mimi Ibarra, su lugar dentro de la salsa romántica y la forma en que su voz sigue siendo referencia para muchas oyentes.',
    description:
      'Perfil de Mimi Ibarra y su aporte a la salsa romántica: una voz con identidad propia, sensibilidad y permanencia dentro del género.',
    featuredRank: 6,
    readingTime: '6 min',
    archiveLabel: 'Perfil recuperado',
    updatedLabel: 'Actualizado en abril de 2026',
    sections: [
      {
        title: 'Una voz con identidad propia',
        paragraphs: [
          'Mimi Ibarra ocupa un lugar especial dentro de la salsa romántica porque supo construir una identidad reconocible en un territorio muchas veces dominado por voces masculinas. Su repertorio conectó con oyentes que encontraron en ella sensibilidad, firmeza y una forma distinta de contar el amor y el desamor.',
          'Ese valor sigue siendo importante hoy, cuando cada vez más artistas buscan un lugar propio dentro del género sin renunciar a la emoción ni a la narrativa popular.',
        ],
      },
      {
        title: 'Más que intérprete',
        paragraphs: [
          'Hablar de Mimi Ibarra como cantautora también permite reconocer una dimensión autoral que a veces se pasa por alto. No es solo una voz vinculada a un momento de la salsa romántica. También es una artista que ayudó a construir lenguaje, repertorio y conexión emocional desde su propia mirada.',
        ],
      },
      {
        title: 'Por qué sigue siendo una referencia',
        paragraphs: [
          'Su presencia en búsquedas y archivos demuestra que todavía hay una audiencia que vuelve a su música para reencontrarse con una sensibilidad específica dentro del género. Esa permanencia es, justamente, una de las señales que distinguen a los nombres que realmente dejan huella.',
        ],
      },
    ],
  },
  {
    slug: 'internacional-grupo-gale-toda-una-historia-musical',
    category: 'Perfiles',
    title: 'Grupo Gale: una historia musical que ayudó a consolidar el sonido salsero de Medellín',
    excerpt:
      'Repasamos el lugar de Grupo Gale dentro de la salsa hecha en Medellín y por qué su historia sigue siendo una referencia clave para el circuito local.',
    description:
      'Grupo Gale y su historia musical: una referencia central para entender el desarrollo del sonido salsero en Medellín.',
    featuredRank: 7,
    readingTime: '6 min',
    archiveLabel: 'Perfil recuperado',
    updatedLabel: 'Actualizado en abril de 2026',
    sections: [
      {
        title: 'Un nombre que pesa en la historia local',
        paragraphs: [
          'Grupo Gale forma parte de la conversación obligada cuando se intenta narrar cómo Medellín se convirtió en una plaza salsera tan fuerte. Su historia conecta producción, repertorio, trabajo de orquesta y una relación muy estrecha con el público de la ciudad.',
          'En torno al proyecto también aparece la figura de Diego Gale, indispensable para entender buena parte de la producción salsera hecha desde Medellín en las últimas décadas.',
        ],
      },
      {
        title: 'Más que una orquesta de temporada',
        paragraphs: [
          'Lo que vuelve importante a Grupo Gale no es solo un puñado de éxitos, sino su capacidad para sostener una narrativa musical con identidad, disciplina y presencia en el circuito de la ciudad.',
          'Ese tipo de continuidad es parte de lo que hace que ciertas agrupaciones se conviertan en referentes y no simplemente en recuerdos de un momento puntual.',
        ],
      },
      {
        title: 'Una historia que sigue dialogando con el presente',
        paragraphs: [
          'En el archivo salsero de Medellín, Grupo Gale aparece una y otra vez porque su recorrido ayuda a leer la evolución de la ciudad como territorio musical. No se trata solo de mirar atrás: también se trata de entender por qué algunos proyectos siguen siendo brújula para lo que viene.',
        ],
      },
    ],
  },
  {
    slug: 'tito-rojas',
    category: 'Perfiles',
    title: 'Tito Rojas: la fuerza de una voz que sigue marcando a la salsa romántica',
    excerpt:
      'Tito Rojas dejó carácter, repertorio y una presencia vocal que todavía pesa en la memoria de cualquier oyente de salsa romántica.',
    description:
      'Tito Rojas sigue siendo una referencia mayor de la salsa romántica por su voz, su repertorio y la conexión emocional que construyó con el público.',
    featuredRank: 8,
    readingTime: '6 min',
    archiveLabel: 'Perfil recuperado',
    updatedLabel: 'Actualizado en abril de 2026',
    sections: [
      {
        title: 'Un intérprete de peso propio',
        paragraphs: [
          'Tito Rojas pertenece a ese grupo de cantantes que no necesitan presentación larga entre salseros. Su voz, su carácter escénico y la manera en que asumió el repertorio romántico lo convirtieron en una figura de referencia para distintas generaciones.',
          'Más que un cantante exitoso, fue un intérprete con presencia. Y esa presencia sigue sintiéndose incluso años después, en búsquedas, homenajes y memorias compartidas.',
        ],
      },
      {
        title: 'La huella de sus canciones',
        paragraphs: [
          'Buena parte de su permanencia está en la fuerza de un cancionero que todavía conecta con el público. Tito Rojas hizo de la emoción una herramienta poderosa, pero siempre sostenida por una voz con peso, claridad y sello propio.',
        ],
      },
      {
        title: 'Por qué sigue tan presente',
        paragraphs: [
          'Cuando una figura como Tito Rojas continúa apareciendo entre las búsquedas más fuertes del género, lo que se confirma es que su legado no quedó detenido en la nostalgia. Sigue operando como referencia viva dentro del mapa salsero.',
        ],
      },
    ],
  },
];

const pressCollections = [
  {
    key: 'destacados',
    title: 'Destacados',
    description: 'Guías, archivo y perfiles que abren la sala con las búsquedas más fuertes del universo salsero.',
    slugs: [
      'cantantes-de-salsa',
      'salsa-baul',
      'adolescentes-orquesta-la-historia-verdadera-de-porfi-baloa',
      'bares-salsa-medellin',
    ],
  },
  {
    key: 'perfiles',
    title: 'Perfiles y legado',
    description: 'Nombres que siguen sosteniendo conversación, memoria y escucha activa dentro del género.',
    slugs: [
      'mimi-ibarra-cantautora',
      'internacional-grupo-gale-toda-una-historia-musical',
      'tito-rojas',
      'yo-me-llamo-frankie-ruiz',
    ],
  },
];

module.exports = { pressArticles, pressCollections };
