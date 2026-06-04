export interface Choice {
  text: string;
  nextId: string;
  effects?: {
    sats?: number;
    maxiScore?: number;
    shitcoinFomo?: number;
  };
}

export interface ScriptNode {
  id: string;
  chapter: number;
  speaker: string;
  text: string;
  background: string;
  character?: string | null;
  expression?: 'normal' | 'happy' | 'panico' | 'concentrado' | 'misterioso' | 'friendly' | null;
  isSatoshiNode?: boolean;
  choices?: Choice[];
  nextId?: string;
  minigame?: 'exchange' | 'wallet' | null;
}

export const characters = {
  protagonist: 'Nico',
  shitcoinBro: 'Shitcoin Bro',
  satoshi: 'Satoshi Nakamoto',
  barista: 'Valeria (Barista)',
  gorilla: 'Gorila Rojo',
  narrator: 'Narrador',
  system: 'Sistema',
};

// Background Image names (keys to generate or load)
export const backgrounds = {
  exchange: 'exchange_room',
  dream: 'dream_satoshi',
  cafe: 'coffee_shop',
  cryptaDoor: 'la_crypta_door',
  cryptaInterior: 'la_crypta_interior',
  gameover: 'game_over_scene',
};

export const script: Record<string, ScriptNode> = {
  // --- CAPÍTULO 1 ---
  c1_start: {
    id: 'c1_start',
    chapter: 1,
    speaker: characters.narrator,
    text: 'Año 2026. Nico es un joven trader atrapado en el frenesí de los mercados cripto. Sentado frente a tres monitores, busca desesperadamente dar el golpe de su vida.',
    background: backgrounds.exchange,
    character: null,
    nextId: 'c1_01',
  },
  c1_01: {
    id: 'c1_01',
    chapter: 1,
    speaker: characters.protagonist,
    text: '¡Mira esa vela verde! LunaSafeDoge acaba de subir un 45% en cinco minutos. Si pongo mis últimos 50,000 sats apalancado a 100x...',
    background: backgrounds.exchange,
    character: 'nico',
    expression: 'happy',
    nextId: 'c1_02',
  },
  c1_02: {
    id: 'c1_02',
    chapter: 1,
    speaker: characters.shitcoinBro,
    text: '¡Es tu momento, bro! Si no te apalancas eres un cobarde. Ese token va directo a la luna. ¡Compra ya o quédate pobre para siempre!',
    background: backgrounds.exchange,
    character: 'shitcoin_bro',
    expression: 'normal',
    nextId: 'c1_choices_01',
  },
  c1_choices_01: {
    id: 'c1_choices_01',
    chapter: 1,
    speaker: characters.system,
    text: '¿Qué debería hacer Nico en este momento crítico?',
    background: backgrounds.exchange,
    character: null,
    choices: [
      {
        text: '¡Entrar con todo! Apalancamiento 100x en LunaSafeDoge.',
        nextId: 'c1_panic_enter',
        effects: { shitcoinFomo: 10, sats: -50000 },
      },
      {
        text: 'Tengo dudas. El mercado parece inestable, mejor no operar ahora.',
        nextId: 'c1_cautious',
        effects: { maxiScore: 5 },
      },
    ],
  },
  
  // Rama de pánico y liquidación
  c1_panic_enter: {
    id: 'c1_panic_enter',
    chapter: 1,
    speaker: characters.protagonist,
    text: '¡Listo! Compré con todo mi capital disponible. ¡¡A la luna!!',
    background: backgrounds.exchange,
    character: 'nico',
    expression: 'happy',
    nextId: 'c1_minigame_exchange',
  },
  c1_minigame_exchange: {
    id: 'c1_minigame_exchange',
    chapter: 1,
    speaker: characters.system,
    text: '¡Alerta de mercado! LunaSafeDoge está experimentando una alta volatilidad extrema.',
    background: backgrounds.exchange,
    character: null,
    minigame: 'exchange',
  },
  c1_liquidation: {
    id: 'c1_liquidation',
    chapter: 1,
    speaker: characters.narrator,
    text: 'En un parpadeo, el gráfico se derrumbó un 99.9%. Ocurrió un rugpull masivo. La cuenta de Nico fue completamente liquidada.',
    background: backgrounds.exchange,
    character: 'nico',
    expression: 'panico',
    nextId: 'c1_gameover_fomo',
  },
  c1_gameover_fomo: {
    id: 'c1_gameover_fomo',
    chapter: 1,
    speaker: characters.narrator,
    text: 'Te has quedado en bancarrota persiguiendo memecoins sin valor. Has caído en el abismo de las shitcoins.',
    background: backgrounds.gameover,
    character: null,
    choices: [
      {
        text: 'Reiniciar Capítulo 1 (Aprender de los errores)',
        nextId: 'c1_start',
      }
    ]
  },

  // Rama cautelosa
  c1_cautious: {
    id: 'c1_cautious',
    chapter: 1,
    speaker: characters.protagonist,
    text: 'No sé... esto tiene pinta de estafa. Mejor me quedo al margen y observo.',
    background: backgrounds.exchange,
    character: 'nico',
    expression: 'concentrado',
    nextId: 'c1_crash_witness',
  },
  c1_crash_witness: {
    id: 'c1_crash_witness',
    chapter: 1,
    speaker: characters.narrator,
    text: 'De repente, las pantallas parpadean en rojo. El gráfico de LunaSafeDoge cae verticalmente a cero de forma instantánea. ¡Es un Rugpull!',
    background: backgrounds.exchange,
    character: 'nico',
    expression: 'panico',
    nextId: 'c1_cautious_02',
  },
  c1_cautious_02: {
    id: 'c1_cautious_02',
    chapter: 1,
    speaker: characters.shitcoinBro,
    text: 'No puede ser... ¡Mi portafolio! Se esfumó todo... ¡El creador del token borró su cuenta de Twitter!',
    background: backgrounds.exchange,
    character: 'shitcoin_bro',
    expression: 'panico',
    nextId: 'c1_cautious_03',
  },
  c1_cautious_03: {
    id: 'c1_cautious_03',
    chapter: 1,
    speaker: characters.protagonist,
    text: 'Uff... me salvé por poco. Esto es una locura. Todo este casino digital no tiene sentido. ¿Acaso no existe algo real en este ecosistema?',
    background: backgrounds.exchange,
    character: 'nico',
    expression: 'concentrado',
    nextId: 'c1_cautious_04',
  },
  c1_cautious_04: {
    id: 'c1_cautious_04',
    chapter: 1,
    speaker: characters.narrator,
    text: 'Buscando respuestas, Nico ignora las llamadas de su mentor de trading y abre un enlace que le envió un viejo desarrollador hace meses.',
    background: backgrounds.exchange,
    character: null,
    nextId: 'c1_whitepaper_intro',
  },
  c1_whitepaper_intro: {
    id: 'c1_whitepaper_intro',
    chapter: 1,
    speaker: characters.protagonist,
    text: '¿"Bitcoin: Un Sistema de Efectivo Electrónico de Usuario a Usuario"? Escrito por un tal Satoshi Nakamoto... Veamos de qué se trata.',
    background: backgrounds.exchange,
    character: 'nico',
    expression: 'normal',
    nextId: 'c1_whitepaper_read',
  },
  c1_whitepaper_read: {
    id: 'c1_whitepaper_read',
    chapter: 1,
    speaker: characters.narrator,
    text: 'Nico empieza a leer. Las palabras sobre escasez matemática, firmas digitales y red peer-to-peer descentralizada resuenan en su cabeza mientras el cansancio lo vence y cae en un sueño profundo...',
    background: backgrounds.exchange,
    character: null,
    nextId: 'c2_dream_start',
  },

  // --- CAPÍTULO 2 ---
  c2_dream_start: {
    id: 'c2_dream_start',
    chapter: 2,
    speaker: characters.narrator,
    text: 'Capítulo 2: La Madriguera del Conejo. Nico despierta en un espacio abstracto, bañado por una tenue luz azul. Frente a él, la imponente silueta de un programador oculto entre las sombras.',
    background: backgrounds.dream,
    character: null,
    nextId: 'c2_satoshi_01',
  },
  c2_satoshi_01: {
    id: 'c2_satoshi_01',
    chapter: 2,
    speaker: characters.satoshi,
    text: 'Bienvenido, Nico. Has estado buscando valor en los espejismos de la codicia, ignorando la verdadera revolución que se gesta en el código.',
    background: backgrounds.dream,
    character: 'satoshi',
    expression: 'misterioso',
    isSatoshiNode: true,
    nextId: 'c2_satoshi_02',
  },
  c2_satoshi_02: {
    id: 'c2_satoshi_02',
    chapter: 2,
    speaker: characters.protagonist,
    text: '¿Eres... Satoshi? No entiendo. He perdido tanto tiempo y dinero. ¿Cómo se supone que Bitcoin es diferente de todas esas otras monedas?',
    background: backgrounds.dream,
    character: 'nico',
    expression: 'concentrado',
    nextId: 'c2_satoshi_03',
  },
  c2_satoshi_03: {
    id: 'c2_satoshi_03',
    chapter: 2,
    speaker: characters.satoshi,
    text: 'El dinero fiat que usas se basa en la confianza de bancos centrales que han roto esa confianza una y otra vez mediante la inflación. Bitcoin elimina la necesidad de intermediarios mediante las matemáticas y la prueba de trabajo. Pero dime, ¿qué le da valor real a una moneda?',
    background: backgrounds.dream,
    character: 'satoshi',
    expression: 'misterioso',
    isSatoshiNode: true,
    nextId: 'c2_choices_01',
  },
  c2_choices_01: {
    id: 'c2_choices_01',
    chapter: 2,
    speaker: characters.system,
    text: 'Satoshi espera tu respuesta filosófica sobre el valor del dinero.',
    background: backgrounds.dream,
    character: null,
    choices: [
      {
        text: 'La coerción del gobierno, la imposición fiscal y su estatus de curso legal.',
        nextId: 'c2_wrong_answer_1',
      },
      {
        text: 'Su escasez absoluta, la imposibilidad de censura, y la energía real que valida la red.',
        nextId: 'c2_correct_answer_1',
        effects: { maxiScore: 10 },
      },
    ],
  },

  // Respuesta incorrecta 1 (Game Over)
  c2_wrong_answer_1: {
    id: 'c2_wrong_answer_1',
    chapter: 2,
    speaker: characters.satoshi,
    text: 'Veo que sigues atrapado en los grilletes del viejo sistema. Si crees que el valor nace de la fuerza y el decreto, jamás entenderás la soberanía.',
    background: backgrounds.dream,
    character: 'satoshi',
    expression: 'misterioso',
    isSatoshiNode: true,
    nextId: 'c2_gameover_fiat',
  },
  c2_gameover_fiat: {
    id: 'c2_gameover_fiat',
    chapter: 2,
    speaker: characters.narrator,
    text: 'El sueño se transforma en una pesadilla inflacionaria. El banco central imprime billetes hasta que te ahogas en ellos. Game Over.',
    background: backgrounds.gameover,
    character: null,
    choices: [
      {
        text: 'Reiniciar Capítulo 2 (Volver a hablar con Satoshi)',
        nextId: 'c2_dream_start',
      }
    ]
  },

  // Respuesta correcta 1 -> Pregunta 2
  c2_correct_answer_1: {
    id: 'c2_correct_answer_1',
    chapter: 2,
    speaker: characters.satoshi,
    text: 'Correcto. La escasez física o matemática combinada con el trabajo es lo que nos previene de la devaluación. Ahora, si un gobernante te promete imprimir dinero ilimitado para "estimular la economía", ¿qué sucede en realidad?',
    background: backgrounds.dream,
    character: 'satoshi',
    expression: 'misterioso',
    isSatoshiNode: true,
    nextId: 'c2_choices_02',
  },
  c2_choices_02: {
    id: 'c2_choices_02',
    chapter: 2,
    speaker: characters.system,
    text: 'Satoshi te interroga sobre los efectos de la inflación artificial.',
    background: backgrounds.dream,
    character: null,
    choices: [
      {
        text: 'Es un beneficio general porque hay más liquidez circulando para todos.',
        nextId: 'c2_wrong_answer_2',
      },
      {
        text: 'Se confisca el poder adquisitivo de los ahorradores y beneficia a quienes reciben el dinero primero (Efecto Cantillon).',
        nextId: 'c2_correct_answer_2',
        effects: { maxiScore: 15 },
      },
    ],
  },

  // Respuesta incorrecta 2 (Game Over)
  c2_wrong_answer_2: {
    id: 'c2_wrong_answer_2',
    chapter: 2,
    speaker: characters.satoshi,
    text: 'Lamentable. Sigues creyendo en la magia del dinero gratis. La riqueza se produce con trabajo e ingenio, no presionando un botón en un banco.',
    background: backgrounds.dream,
    character: 'satoshi',
    expression: 'misterioso',
    isSatoshiNode: true,
    nextId: 'c2_gameover_fiat',
  },

  // Respuesta correcta 2 -> Despertar Orange-pilled
  c2_correct_answer_2: {
    id: 'c2_correct_answer_2',
    chapter: 2,
    speaker: characters.satoshi,
    text: 'Excelente, Nico. Has comprendido las leyes fundamentales de la economía sólida. Toma esta semilla. Guarda tus llaves privadas, sé soberano de tu propio valor.',
    background: backgrounds.dream,
    character: 'satoshi',
    expression: 'misterioso',
    isSatoshiNode: true,
    nextId: 'c2_wake_up',
  },
  c2_wake_up: {
    id: 'c2_wake_up',
    chapter: 2,
    speaker: characters.narrator,
    text: 'La silueta de Satoshi se desvanece en una deslumbrante luz dorada. Nico despierta sobresaltado en su escritorio. Las pantallas ya no muestran memecoins, sino la consola con el Whitepaper. Se siente diferente. Acaba de tomar la pastilla naranja.',
    background: backgrounds.exchange,
    character: 'nico',
    expression: 'normal',
    nextId: 'c3_cafe_start',
  },

  // --- CAPÍTULO 3 ---
  c3_cafe_start: {
    id: 'c3_cafe_start',
    chapter: 3,
    speaker: characters.narrator,
    text: 'Capítulo 3: La Chispa de Lightning. Ha pasado el tiempo. Nico es ahora un bitcoiner convencido. Camina por la ciudad y decide comprar un café en una cafetería de especialidad que acepta Bitcoin.',
    background: backgrounds.cafe,
    character: null,
    nextId: 'c3_01',
  },
  c3_01: {
    id: 'c3_01',
    chapter: 3,
    speaker: characters.protagonist,
    text: 'Hola, Valeria. Me gustaría un Espresso Doble y pagar con Bitcoin. Tengo mi billetera on-chain lista.',
    background: backgrounds.cafe,
    character: 'nico',
    expression: 'normal',
    nextId: 'c3_02',
  },
  c3_02: {
    id: 'c3_02',
    chapter: 3,
    speaker: characters.barista,
    text: '¿On-chain? Oye, las comisiones de la red principal están en 45 sats/vB hoy por la congestión. Pagarías más de comisión que por el café, ¡y tendrías que esperar 10 minutos para la confirmación!',
    background: backgrounds.cafe,
    character: 'barista',
    expression: 'normal',
    nextId: 'c3_03',
  },
  c3_03: {
    id: 'c3_03',
    chapter: 3,
    speaker: characters.protagonist,
    text: '¿Eh? Pero Satoshi diseñó Bitcoin como efectivo electrónico. ¿Cómo puedo pagar cosas pequeñas del día a día de forma rápida y barata?',
    background: backgrounds.cafe,
    character: 'nico',
    expression: 'concentrado',
    nextId: 'c3_04',
  },
  c3_04: {
    id: 'c3_04',
    chapter: 3,
    speaker: characters.barista,
    text: '¡Para eso está **Lightning Network**! Es una segunda capa. Creamos canales de pago y enviamos sats de forma instantánea con comisiones de fracción de centavo. Déjame generar un código QR y verás.',
    background: backgrounds.cafe,
    character: 'barista',
    expression: 'happy',
    nextId: 'c3_choices_01',
  },
  c3_choices_01: {
    id: 'c3_choices_01',
    chapter: 3,
    speaker: characters.system,
    text: '¿Cómo debe reaccionar Nico para realizar su primer pago instantáneo?',
    background: backgrounds.cafe,
    character: null,
    choices: [
      {
        text: 'Descargar una wallet de Lightning (ej. Phoenix/Alby), fondearla y escanear el QR.',
        nextId: 'c3_wallet_sim',
        effects: { maxiScore: 10 },
      },
      {
        text: 'Insistir en pagar on-chain y esperar sentado en la barra.',
        nextId: 'c3_onchain_fail',
      },
    ],
  },

  // Fallo on-chain
  c3_onchain_fail: {
    id: 'c3_onchain_fail',
    chapter: 3,
    speaker: characters.narrator,
    text: 'Nico envía la transacción on-chain pagando una comisión absurda de 25,000 sats. Pasan los minutos... el café se enfría. Valeria le informa que la transacción sigue sin confirmar en el mempool debido a la congestión.',
    background: backgrounds.cafe,
    character: 'nico',
    expression: 'panico',
    nextId: 'c3_gameover_cold_coffee',
  },
  c3_gameover_cold_coffee: {
    id: 'c3_gameover_cold_coffee',
    chapter: 3,
    speaker: characters.narrator,
    text: 'Tu café se enfrió por completo y malgastaste tus sats en comisiones de red innecesarias por no usar capas de escalabilidad.',
    background: backgrounds.gameover,
    character: null,
    choices: [
      {
        text: 'Reiniciar Capítulo 3 (Aprender sobre Lightning)',
        nextId: 'c3_cafe_start',
      }
    ]
  },

  // Simulador de Wallet Lightning
  c3_wallet_sim: {
    id: 'c3_wallet_sim',
    chapter: 3,
    speaker: characters.system,
    text: 'Simulación de Billetera Lightning iniciada. Completa el pago escaneando el código QR generado por la cafetería.',
    background: backgrounds.cafe,
    character: null,
    minigame: 'wallet',
  },
  c3_wallet_success: {
    id: 'c3_wallet_success',
    chapter: 3,
    speaker: characters.barista,
    text: '¡Listo! Me llegó el pago de 8,000 sats al instante. Aquí tienes tu café bien caliente. Es mágico, ¿verdad?',
    background: backgrounds.cafe,
    character: 'barista',
    expression: 'happy',
    nextId: 'c3_after_payment',
  },
  c3_after_payment: {
    id: 'c3_after_payment',
    chapter: 3,
    speaker: characters.protagonist,
    text: 'Increíble... fue instantáneo y la comisión fue de apenas 1 sat. Esto realmente es el futuro del dinero diario.',
    background: backgrounds.cafe,
    character: 'nico',
    expression: 'happy',
    nextId: 'c3_crypta_tip',
  },
  c3_crypta_tip: {
    id: 'c3_crypta_tip',
    chapter: 3,
    speaker: characters.barista,
    text: 'Totalmente. Si quieres conocer a la verdadera resistencia de programadores y bitcoiners en la ciudad, debes ir a **La Crypta**. Hoy hay una hackatón de desarrollo. Te paso la coordenada firmada con su llave pública.',
    background: backgrounds.cafe,
    character: 'barista',
    expression: 'normal',
    nextId: 'c4_crypta_arrival',
  },

  // --- CAPÍTULO 4 ---
  c4_crypta_arrival: {
    id: 'c4_crypta_arrival',
    chapter: 4,
    speaker: characters.narrator,
    text: 'Capítulo 4: La Puerta de La Crypta. Nico sigue las instrucciones y llega a un callejón oculto bajo luces de neón en Buenos Aires. Frente a él, una puerta de acero con una terminal inteligente parpadeante.',
    background: backgrounds.cryptaDoor,
    character: null,
    nextId: 'c4_riddle_01',
  },
  c4_riddle_01: {
    id: 'c4_riddle_01',
    chapter: 4,
    speaker: characters.system,
    text: 'SISTEMA DE SEGURIDAD DE LA CRYPTA: Ingrese la respuesta correcta para abrir la compuerta. PREGUNTA 1: ¿Cuál es el límite absoluto de emisión de Bitcoin?',
    background: backgrounds.cryptaDoor,
    character: null,
    choices: [
      {
        text: '21,000,000 sats / monedas.',
        nextId: 'c4_riddle_02',
      },
      {
        text: 'No tiene límite, se emite de forma infinita para incentivar la minería.',
        nextId: 'c4_wrong_riddle',
      },
    ],
  },
  c4_wrong_riddle: {
    id: 'c4_wrong_riddle',
    chapter: 4,
    speaker: characters.system,
    text: 'ACCESO DENEGADO. Intruso detectado. Alarmas silenciosas activadas.',
    background: backgrounds.cryptaDoor,
    character: null,
    nextId: 'c4_gameover_locked',
  },
  c4_gameover_locked: {
    id: 'c4_gameover_locked',
    chapter: 4,
    speaker: characters.narrator,
    text: 'Has fallado la pregunta básica de Bitcoin. Las puertas de la comunidad permanecerán selladas para ti.',
    background: backgrounds.gameover,
    character: null,
    choices: [
      {
        text: 'Reiniciar Capítulo 4 (Intentar resolver el acertijo de nuevo)',
        nextId: 'c4_crypta_arrival',
      }
    ]
  },

  // Pregunta 2 de la puerta
  c4_riddle_02: {
    id: 'c4_riddle_02',
    chapter: 4,
    speaker: characters.system,
    text: 'PREGUNTA 2: ¿Qué tecnología permite la apertura de canales de pago bidireccionales fuera de la cadena para micropagos?',
    background: backgrounds.cryptaDoor,
    character: null,
    choices: [
      {
        text: 'Lightning Network (red de canales de pago)',
        nextId: 'c4_crypta_open',
        effects: { maxiScore: 10 },
      },
      {
        text: 'Ethereum Virtual Machine (contratos inteligentes de Turing completo)',
        nextId: 'c4_wrong_riddle',
      },
    ],
  },

  // Puerta abierta y final bueno
  c4_crypta_open: {
    id: 'c4_crypta_open',
    chapter: 4,
    speaker: characters.system,
    text: 'ACCESO CONCEDIDO. Bienvenido a la zona de soberanía libre.',
    background: backgrounds.cryptaDoor,
    character: null,
    nextId: 'c4_enter_bar',
  },
  c4_enter_bar: {
    id: 'c4_enter_bar',
    chapter: 4,
    speaker: characters.narrator,
    text: 'La compuerta se abre con un siseo neumático. Nico da un paso adelante y es recibido por un ambiente cyberpunk cálido y ruidoso. Hay música lofi de fondo, risas de desarrolladores y pantallas mostrando commits de código.',
    background: backgrounds.cryptaInterior,
    character: null,
    nextId: 'c4_gorilla_welcome',
  },
  c4_gorilla_welcome: {
    id: 'c4_gorilla_welcome',
    chapter: 4,
    speaker: characters.gorilla,
    text: '¡Epa! ¡Bienvenido a La Crypta, Nico! Te estábamos observando desde que dejaste atrás el fomo de las shitcoins.',
    background: backgrounds.cryptaInterior,
    character: 'gorilla',
    expression: 'friendly',
    nextId: 'c4_gorilla_talk_02',
  },
  c4_gorilla_talk_02: {
    id: 'c4_gorilla_talk_02',
    chapter: 4,
    speaker: characters.gorilla,
    text: 'Aquí construimos el futuro sobre bases sólidas. En la barra, al fondo, puedes ver al Capitán Pirata con cervezas bien frías en la mano charlando con el Oso. Esos muchachos sí que saben debatir de canales Lightning.',
    background: backgrounds.cryptaInterior,
    character: 'gorilla',
    expression: 'happy',
    nextId: 'c4_gorilla_talk_03',
  },
  c4_gorilla_talk_03: {
    id: 'c4_gorilla_talk_03',
    chapter: 4,
    speaker: characters.protagonist,
    text: '¡Wow! Esto es increíble. Es un honor estar aquí. Vengo a aprender y a aportar en la hackatón.',
    background: backgrounds.cryptaInterior,
    character: 'nico',
    expression: 'happy',
    nextId: 'c4_score_evaluation',
  },
  c4_score_evaluation: {
    id: 'c4_score_evaluation',
    chapter: 4,
    speaker: characters.gorilla,
    text: '¡Esa es la actitud! Déjame ver cómo te fue en tu viaje de aprendizaje... Has demostrado ser un bitcoiner con convicción al evitar las trampas del fomo centralizado y dominar la Lightning Network.',
    background: backgrounds.cryptaInterior,
    character: 'gorilla',
    expression: 'friendly',
    nextId: 'c4_final_zap',
  },
  c4_final_zap: {
    id: 'c4_final_zap',
    chapter: 4,
    speaker: characters.gorilla,
    text: 'Toma, escanea este QR. Te invito tu primer mate o cerveza fría en La Crypta, pagada por Lightning. ¡Bienvenido a la resistencia, bitcoiner!',
    background: backgrounds.cryptaInterior,
    character: 'gorilla',
    expression: 'happy',
    nextId: 'c4_credits',
  },
  c4_credits: {
    id: 'c4_credits',
    chapter: 4,
    speaker: characters.narrator,
    text: 'Nico escanea el QR y siente por fin que forma parte de algo real y trascendente. La verdadera revolución no está en el casino digital, sino en construir un dinero libre. FIN DE LA AVENTURA.',
    background: backgrounds.cryptaInterior,
    character: null,
    nextId: 'game_finished_reset',
  },
};
