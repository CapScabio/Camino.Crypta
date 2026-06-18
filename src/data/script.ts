export interface Choice {
  text: string;
  nextId: string;
  effects?: {
    sats?: number;
    soberaniaScore?: number;
    tradingScore?: number;
    detour?: boolean;
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
  protagonist: '{playerName}',
  shitcoinBro: 'Shitcoin Bro',
  satoshi: 'Satoshi Nakamoto',
  barista: 'Valeria (Barista)',
  yaguar: 'El Panter',
  negro: 'El Negro',
  gorilla: 'Gorila Rojo',
  narrator: 'Narrador',
  system: 'Sistema',
};

export const backgrounds = {
  exchange: 'exchange_room',
  dream: 'dream_satoshi',
  cafe: 'coffee_shop',
  cryptaDoor: 'la_crypta_door',
  cryptaInterior: 'la_crypta_interior',
  gameover: 'game_over_scene',
  victory: 'victory_scene',
};

export const script: Record<string, ScriptNode> = {
  // --- CAPÍTULO 1: El Espejismo del Fomo ---
  c1_start: {
    id: 'c1_start',
    chapter: 1,
    speaker: characters.narrator,
    text: 'Son las 3:15 AM. Un influencer con foto de perfil de un mono tuiteó que $ELONPEPE va a subir un 1000%. Estás apalancad{o/a} x50 en un exchange centralizado. El chat de Telegram destila euforia: "¡A la luna!", "¡El que vende es un cobarde!".',
    background: backgrounds.exchange,
    character: null,
    nextId: 'c1_01',
  },
  c1_01: {
    id: 'c1_01',
    chapter: 1,
    speaker: characters.protagonist,
    text: 'Es mi oportunidad. Si meto los ahorros que tenía separados para el alquiler, duplico todo en un par de horas.',
    background: backgrounds.exchange,
    character: 'nico',
    expression: 'happy',
    nextId: 'c1_dec_1',
  },
  c1_dec_1: {
    id: 'c1_dec_1',
    chapter: 1,
    speaker: characters.system,
    text: '[Decisión 1.1] ¿Qué haces con tu posición inicial ante la euforia?',
    background: backgrounds.exchange,
    character: null,
    choices: [
      {
        text: 'Mantener la cabeza fría, cerrar el 50% de la posición para asegurar la inversión inicial y poner un stop-loss ajustado.',
        nextId: 'c1_02_safe',
        effects: { soberaniaScore: 10, tradingScore: 0 }
      },
      {
        text: 'Dejarte llevar por la adrenalina, subir el apalancamiento a x100 e inyectar los USDT del alquiler.',
        nextId: 'c1_02_risky',
        effects: { soberaniaScore: 0, tradingScore: 20 }
      }
    ],
  },
  c1_02_safe: {
    id: 'c1_02_safe',
    chapter: 1,
    speaker: characters.narrator,
    text: 'La vela verde se detiene bruscamente. Un mechazo rojo gigante absorbe la última subida. El chat de Telegram se llena de mensajes en pánico. El administrador escribe: "¡Están manipulando el mercado! ¡No vendan, compren más barato (Buy the dip)!"',
    background: backgrounds.exchange,
    character: null,
    nextId: 'c1_dec_2',
  },
  c1_02_risky: {
    id: 'c1_02_risky',
    chapter: 1,
    speaker: characters.narrator,
    text: 'La vela verde se detiene bruscamente. Un mechazo rojo gigante absorbe la última subida. El chat de Telegram se llena de mensajes en pánico. El administrador escribe: "¡Están manipulando el mercado! ¡No vendan, compren más barato (Buy the dip)!"',
    background: backgrounds.exchange,
    character: null,
    nextId: 'c1_dec_2',
  },
  c1_dec_2: {
    id: 'c1_dec_2',
    chapter: 1,
    speaker: characters.system,
    text: '[Decisión 1.2] El precio empieza a oscilar violentamente cerca de tu zona de liquidación. ¿Cómo reaccionas?',
    background: backgrounds.exchange,
    character: null,
    choices: [
      {
        text: 'Desesperarte, ignorar las alertas de riesgo y pedir un préstamo rápido con tarjeta de crédito para agregar margen a la posición.',
        nextId: 'c1_03_desperate',
        effects: { soberaniaScore: 0, tradingScore: 30 }
      },
      {
        text: 'Admitir que operaste por pura emoción, asumir la pérdida actual y cerrar la posición manualmente antes de quedar en cero.',
        nextId: 'c1_03_close',
        effects: { soberaniaScore: 10, tradingScore: 0 }
      }
    ],
  },
  c1_03_desperate: {
    id: 'c1_03_desperate',
    chapter: 1,
    speaker: characters.narrator,
    text: 'Decidas lo que decidas, si arriesgaste de más, ocurre el desastre. La pantalla parpadea en rojo. Los desarrolladores de la memecoin acaban de retirar toda la liquidez del pool mediante una función oculta en el contrato inteligente. El canal de Telegram desaparece. El influencer borra sus tuits.',
    background: backgrounds.exchange,
    character: null,
    nextId: 'c1_rugpull_sim',
  },
  c1_03_close: {
    id: 'c1_03_close',
    chapter: 1,
    speaker: characters.narrator,
    text: 'Decidas lo que decidas, si arriesgaste de más, ocurre el desastre. La pantalla parpadea en rojo. Los desarrolladores de la memecoin acaban de retirar toda la liquidez del pool mediante una función oculta en el contrato inteligente. El canal de Telegram desaparece. El influencer borra sus tuits.',
    background: backgrounds.exchange,
    character: null,
    nextId: 'c1_rugpull_sim',
  },
  c1_rugpull_sim: {
    id: 'c1_rugpull_sim',
    chapter: 1,
    speaker: characters.system,
    text: 'ALERTA: Caída de liquidez del 99.99%. Liquidación de margen en proceso.',
    background: backgrounds.exchange,
    character: null,
    minigame: 'exchange',
  },
  c1_liquidated: {
    id: 'c1_liquidated',
    chapter: 1,
    speaker: characters.system,
    text: 'Interfaz en Pantalla: [ACCOUNT LIQUIDATED - BALANCE: 0.00 USDT]',
    background: backgrounds.exchange,
    character: null,
    nextId: 'c1_protagonist_panico',
  },
  c1_protagonist_panico: {
    id: 'c1_protagonist_panico',
    chapter: 1,
    speaker: characters.protagonist,
    text: '(Agarrándose la cabeza) "No... todo se evaporó. Me hicieron un rugpull masivo..."',
    background: backgrounds.exchange,
    character: 'nico',
    expression: 'panico',
    nextId: 'c1_dec_3',
  },
  c1_dec_3: {
    id: 'c1_dec_3',
    chapter: 1,
    speaker: characters.system,
    text: '[Decisión 1.3] Te encontrás en la ruina absoluta, con la pantalla parpadeando en cero. ¿Cuál es tu siguiente paso?',
    background: backgrounds.exchange,
    character: null,
    choices: [
      {
        text: 'Buscar un grupo de "Signals" de Discord que promete recuperar pérdidas invirtiendo en una nueva preventa secreta llamada $SAFEGALAXY.',
        nextId: 'c1_badending_1',
      },
      {
        text: 'Sentarte en el piso, respirar hondo, aceptar que el casino cripto te estafó y abrir un mail viejo de un amigo que contiene un PDF titulado bitcoin.pdf.',
        nextId: 'c1_04_read',
        effects: { soberaniaScore: 15 }
      }
    ],
  },
  c1_badending_1: {
    id: 'c1_badending_1',
    chapter: 1,
    speaker: characters.narrator,
    text: 'Tu obsesión por el dinero fácil te lleva a caer en otra estafa de preventa que bloquea tus fondos para siempre. Tu pantalla se apaga.',
    background: backgrounds.gameover,
    character: 'nico',
    expression: 'panico',
    nextId: 'c1_gameover_1',
  },
  c1_gameover_1: {
    id: 'c1_gameover_1',
    chapter: 1,
    speaker: characters.system,
    text: '❌ GAME OVER: El casino cripto siempre gana si buscas rentabilidad mágica sin entender el protocolo. Reiniciá el capítulo.',
    background: backgrounds.gameover,
    character: null,
    choices: [
      {
        text: 'Reiniciar Capítulo 1',
        nextId: 'c1_start',
        effects: { sats: 50000, soberaniaScore: -100, tradingScore: -100 }
      }
    ],
  },
  c1_04_read: {
    id: 'c1_04_read',
    chapter: 1,
    speaker: characters.narrator,
    text: 'Abrís el documento. No hay avatares de animales graciosos ni promesas de rentabilidad del 1000%. La primera línea dice de forma sobria: "Bitcoin: A Peer-to-Peer Electronic Cash System".',
    background: backgrounds.exchange,
    character: null,
    nextId: 'c1_dec_4',
  },
  c1_dec_4: {
    id: 'c1_dec_4',
    chapter: 1,
    speaker: characters.system,
    text: '[Decisión 1.4] Al leer las primeras páginas del Whitepaper escrito por Satoshi Nakamoto, ¿cuál es el primer concepto que elegís auditar para ver si es real?',
    background: backgrounds.exchange,
    character: null,
    choices: [
      {
        text: 'El problema del doble gasto y cómo se puede solucionar un registro contable sin la necesidad de confiar en un banco central.',
        nextId: 'c2_start',
        effects: { soberaniaScore: 10 }
      },
      {
        text: 'Buscar si el documento explica cómo programar bots automatizados para comprar y vender rápido cuando el precio suba.',
        nextId: 'c1_badending_2',
      }
    ],
  },
  c1_badending_2: {
    id: 'c1_badending_2',
    chapter: 1,
    speaker: characters.narrator,
    text: 'Tu mentalidad de casino e interés exclusivo en el trading automatizado rápido te aleja de entender el protocolo. Terminas registrándote en una plataforma fraudulenta de arbitraje que vacía tu cuenta bancaria.',
    background: backgrounds.gameover,
    character: 'nico',
    expression: 'panico',
    nextId: 'c1_gameover_2',
  },
  c1_gameover_2: {
    id: 'c1_gameover_2',
    chapter: 1,
    speaker: characters.system,
    text: '❌ GAME OVER: La mentalidad de casino destruye tu soberanía. Lee el whitepaper con humildad. Reiniciá el capítulo.',
    background: backgrounds.gameover,
    character: null,
    choices: [
      {
        text: 'Reiniciar Capítulo 1',
        nextId: 'c1_start',
        effects: { sats: 50000, soberaniaScore: -100, tradingScore: -100 }
      }
    ],
  },

  // --- CAPÍTULO 2: La Madriguera del Conejo ---
  c2_start: {
    id: 'c2_start',
    chapter: 2,
    speaker: characters.narrator,
    text: '{playerName} despierta en un entorno de ensueño surrealista. Una biblioteca infinita donde los libros son bloques de piedra interconectados por cadenas de luz dorada. Al fondo, una silueta humana difuminada envuelta en hilos de código verde observa desde un escritorio: es Satoshi Nakamoto.',
    background: backgrounds.dream,
    character: null,
    nextId: 'c2_satoshi_01',
  },
  c2_satoshi_01: {
    id: 'c2_satoshi_01',
    chapter: 2,
    speaker: characters.satoshi,
    text: 'Bienvenido. Has gastado mucha energía en el mercado persiguiendo espejismos. Pero la verdadera revolución no es el precio en dólares; es la arquitectura de la confianza. ¿Estás listo para entender por qué fue diseñado este protocolo?',
    background: backgrounds.dream,
    character: 'satoshi',
    expression: 'misterioso',
    isSatoshiNode: true,
    nextId: 'c2_nico_01',
  },
  c2_nico_01: {
    id: 'c2_nico_01',
    chapter: 2,
    speaker: characters.protagonist,
    text: 'Yo... solo quería libertad financiera. Pero lo perdí todo. ¿Por qué Bitcoin es diferente de todas las promesas que vi en los exchanges?',
    background: backgrounds.dream,
    character: 'nico',
    expression: 'concentrado',
    nextId: 'c2_dec_5',
  },
  c2_dec_5: {
    id: 'c2_dec_5',
    chapter: 2,
    speaker: characters.system,
    text: '[Decisión 2.1] Satoshi te pone a prueba con la primera pregunta fundamental del sistema fiat: ¿Cuál es el verdadero problema del dinero tradicional emitido por los gobiernos?',
    background: backgrounds.dream,
    character: null,
    choices: [
      {
        text: 'Que las transacciones físicas en papel son muy lentas e incómodas para el comercio electrónico moderno.',
        nextId: 'c2_fiat_slow',
        effects: { soberaniaScore: 0 }
      },
      {
        text: 'Que requiere confiar en un banco central que no devalúe la moneda, pero la historia demuestra que esa confianza siempre se rompe al imprimir dinero de la nada, licuando el valor del trabajo humano a través de la inflación.',
        nextId: 'c2_fiat_inflation',
        effects: { soberaniaScore: 15 }
      }
    ],
  },
  c2_fiat_slow: {
    id: 'c2_fiat_slow',
    chapter: 2,
    speaker: characters.satoshi,
    text: 'Ese es solo un problema de conveniencia, no de diseño de confianza. Si solo cambiamos el papel por bits centralizados, seguimos bajo las mismas reglas de devaluación e intermediación del emisor.',
    background: backgrounds.dream,
    character: 'satoshi',
    expression: 'misterioso',
    isSatoshiNode: true,
    nextId: 'c2_fiat_inflation',
  },
  c2_fiat_inflation: {
    id: 'c2_fiat_inflation',
    chapter: 2,
    speaker: characters.satoshi,
    text: 'Exacto. Para que el sistema funcione, estás obligado a confiar en intermediarios que centralizan el poder. Bitcoin introduce la escasez digital absoluta: un límite estricto gobernado por matemáticas, no por humanos.',
    background: backgrounds.dream,
    character: 'satoshi',
    expression: 'friendly',
    isSatoshiNode: true,
    nextId: 'c2_dec_6',
  },
  c2_dec_6: {
    id: 'c2_dec_6',
    chapter: 2,
    speaker: characters.system,
    text: '[Decisión 2.2] Satoshi hace girar un cubo de luz contable: ¿Cuántos bitcoins existirán en total y quién puede cambiar esa regla de emisión?',
    background: backgrounds.dream,
    character: null,
    choices: [
      {
        text: 'Existirán 21 millones de unidades en total, y nadie puede cambiar esa regla de forma unilateral porque requeriría que toda la red distribuida de nodos acepte voluntariamente destruir su propia escasez.',
        nextId: 'c2_21m_fixed',
        effects: { soberaniaScore: 15 }
      },
      {
        text: 'Existirán 21 millones, pero el comité de fundadores originales puede emitir más si ocurre una crisis financiera global para rescatar los nodos.',
        nextId: 'c2_badending_3',
      }
    ],
  },
  c2_badending_3: {
    id: 'c2_badending_3',
    chapter: 2,
    speaker: characters.satoshi,
    text: 'Si existiera un comité con ese poder, no sería descentralizado. Sería idéntico al sistema bancario tradicional que permite la censura y la devaluación de tus fondos. La confianza se rompería.',
    background: backgrounds.dream,
    character: 'satoshi',
    expression: 'misterioso',
    isSatoshiNode: true,
    nextId: 'c2_gameover_3',
  },
  c2_gameover_3: {
    id: 'c2_gameover_3',
    chapter: 2,
    speaker: characters.system,
    text: '❌ GAME OVER: Si introduces intermediarios de confianza, destruyes el principio fundamental de Bitcoin. Reiniciá el capítulo.',
    background: backgrounds.gameover,
    character: null,
    choices: [
      {
        text: 'Reiniciar Capítulo 2',
        nextId: 'c2_start',
        effects: { soberaniaScore: -50 }
      }
    ],
  },
  c2_21m_fixed: {
    id: 'c2_21m_fixed',
    chapter: 2,
    speaker: characters.satoshi,
    text: 'Veo que entendés la inmutabilidad de las reglas. Pero hablemos de la contabilidad. En el viejo mundo, el banco decide qué transacción es válida en su libro privado. En mi protocolo, el libro es público y distribuido. ¿Cómo evitamos que alguien intente gastar dos veces el mismo bitcoin digital?',
    background: backgrounds.dream,
    character: 'satoshi',
    expression: 'friendly',
    isSatoshiNode: true,
    nextId: 'c2_dec_7',
  },
  c2_dec_7: {
    id: 'c2_dec_7',
    chapter: 2,
    speaker: characters.system,
    text: '[Decisión 2.3] El cubo de luz contable se divide en dos hilos de transacciones contradictorias. ¿Cómo resuelve la red este conflicto de doble gasto?',
    background: backgrounds.dream,
    character: null,
    choices: [
      {
        text: 'Los nodos consultan a un servidor horario centralizado de alta precisión que decide cuál llegó primero.',
        nextId: 'c2_badending_4',
      },
      {
        text: 'La red utiliza una cadena de pruebas de trabajo (Proof of Work), donde la historia oficial queda grabada en la cadena lineal que acumule la mayor cantidad de esfuerzo computacional real demostrado.',
        nextId: 'c2_pow_proof',
        effects: { soberaniaScore: 15 }
      }
    ],
  },
  c2_badending_4: {
    id: 'c2_badending_4',
    chapter: 2,
    speaker: characters.satoshi,
    text: 'Un servidor central de marcas de tiempo crea un único punto de fallo y control. Permitiría la censura y el control gubernamental directo. La red caería en segundos.',
    background: backgrounds.dream,
    character: 'satoshi',
    expression: 'misterioso',
    isSatoshiNode: true,
    nextId: 'c2_gameover_4',
  },
  c2_gameover_4: {
    id: 'c2_gameover_4',
    chapter: 2,
    speaker: characters.system,
    text: '❌ GAME OVER: Un servidor centralizado destruye el principio peer-to-peer de la red. Reiniciá el capítulo.',
    background: backgrounds.gameover,
    character: null,
    choices: [
      {
        text: 'Reiniciar Capítulo 2',
        nextId: 'c2_start',
        effects: { soberaniaScore: -50 }
      }
    ],
  },
  c2_pow_proof: {
    id: 'c2_pow_proof',
    chapter: 2,
    speaker: characters.satoshi,
    text: 'Has comprendido las bases de la arquitectura. Pero la teoría no te servirá de nada si no la aplicás en el mundo real. Es hora de que dejes de confiar en las plataformas de otros y construyas tu propia soberanía.',
    background: backgrounds.dream,
    character: 'satoshi',
    expression: 'friendly',
    isSatoshiNode: true,
    nextId: 'c2_dec_8',
  },
  c2_dec_8: {
    id: 'c2_dec_8',
    chapter: 2,
    speaker: characters.system,
    text: '[Decisión 2.4] La silueta de Satoshi empieza a disolverse en código binario, dejándote una advertencia final. ¿Qué lección te llevas grabada en la mente al despertar?',
    background: backgrounds.dream,
    character: null,
    choices: [
      {
        text: 'Que debo buscar un exchange centralizado más grande y seguro para guardar mis bitcoins y evitar que me hagan otro rugpull.',
        nextId: 'c3_start',
        effects: { detour: true, soberaniaScore: 0 }
      },
      {
        text: 'Que la descentralización requiere que yo mismo sea el custodio de mis fondos y el auditor de mis transacciones. No confíes, verificá.',
        nextId: 'c3_start',
        effects: { soberaniaScore: 15 }
      }
    ],
  },

  // --- CAPÍTULO 3: El Guardián Ciego ---
  c3_start: {
    id: 'c3_start',
    chapter: 3,
    speaker: characters.narrator,
    text: 'Te despertás en tu escritorio. Una interfaz limpia de un sistema operativo Linux simulado se muestra en tu monitor. Decidís bajarte una billetera de Bitcoin de código abierto y no-custodia. Al iniciar el proceso de inicialización, el software genera 12 palabras aleatorias en la pantalla: tu frase semilla (Seed Phrase). En ese instante, una notificación del navegador parpadea: "Detectamos palabras de seguridad. ¿Desea guardarlas en su cuenta de Google Drive para mayor comodidad?".',
    background: backgrounds.exchange,
    character: null,
    nextId: 'c3_dec_9',
  },
  c3_dec_9: {
    id: 'c3_dec_9',
    chapter: 3,
    speaker: characters.system,
    text: '[Decisión 3.1] ¿Cómo decidís respaldar tu frase semilla de recuperación?',
    background: backgrounds.exchange,
    character: null,
    choices: [
      {
        text: 'Sacarle una foto rápida con el celular o copiarla en un archivo de texto en la nube para estar seguro de que nunca la vas a perder si se rompe la computadora.',
        nextId: 'c3_badending_5',
      },
      {
        text: 'Tomar un lápiz, escribir las 12 palabras de forma manuscrita en un papel físico y guardarlo en un lugar seguro y privado fuera de cualquier dispositivo con internet.',
        nextId: 'c3_physical_seed',
        effects: { soberaniaScore: 15 }
      }
    ],
  },
  c3_badending_5: {
    id: 'c3_badending_5',
    chapter: 3,
    speaker: characters.narrator,
    text: 'Tres semanas después, un malware básico accede a tus fotos en la nube. Un script automatizado barre tu saldo y deja la billetera en blanco en segundos.',
    background: backgrounds.gameover,
    character: 'nico',
    expression: 'panico',
    nextId: 'c3_gameover_5',
  },
  c3_gameover_5: {
    id: 'c3_gameover_5',
    chapter: 3,
    speaker: characters.system,
    text: '❌ GAME OVER: El almacenamiento digital de claves privadas es un regalo para los hackers. Not your keys, not your coins. Reiniciá el capítulo.',
    background: backgrounds.gameover,
    character: null,
    choices: [
      {
        text: 'Reiniciar Capítulo 3',
        nextId: 'c3_start',
        effects: { soberaniaScore: -50 }
      }
    ],
  },
  c3_physical_seed: {
    id: 'c3_physical_seed',
    chapter: 3,
    speaker: characters.narrator,
    text: 'Las palabras están resguardadas en el mundo físico. El software avanza y te muestra una cadena alfanumérica larga: tu dirección pública de Bitcoin. El programa te explica de manera sutil las leyes de la criptografía asimétrica.',
    background: backgrounds.exchange,
    character: null,
    nextId: 'c3_dec_10',
  },
  c3_dec_10: {
    id: 'c3_dec_10',
    chapter: 3,
    speaker: characters.system,
    text: '[Decisión 3.2] Un usuario desconocido te contacta por Telegram afirmando ser del soporte técnico de la wallet. Te dice que para validar tu saldo entrante debés pasarle tu clave privada por mensaje privado. ¿Qué haces?',
    background: backgrounds.exchange,
    character: null,
    choices: [
      {
        text: 'Bloquear e ignorar al usuario. La dirección pública se comparte para recibir fondos; la clave privada jamás se le muestra a nadie bajo ninguna circunstancia.',
        nextId: 'c3_support_blocked',
        effects: { soberaniaScore: 15 }
      },
      {
        text: 'Pasársela. Al fin y al cabo, si es del soporte técnico del software, necesita la clave para verificar que mi aplicación no tenga errores de sincronización.',
        nextId: 'c3_badending_6',
      }
    ],
  },
  c3_badending_6: {
    id: 'c3_badending_6',
    chapter: 3,
    speaker: characters.narrator,
    text: 'Le entregas tu clave privada al supuesto soporte. En menos de un minuto, el atacante firma una transacción vaciando todo tu capital. Te bloquea del chat.',
    background: backgrounds.gameover,
    character: 'nico',
    expression: 'panico',
    nextId: 'c3_gameover_6',
  },
  c3_gameover_6: {
    id: 'c3_gameover_6',
    chapter: 3,
    speaker: characters.system,
    text: '❌ GAME OVER: Quien tiene tu clave privada controla tus fondos. Jamás compartas tu frase semilla o clave privada. Reiniciá.',
    background: backgrounds.gameover,
    character: null,
    choices: [
      {
        text: 'Reiniciar Capítulo 3',
        nextId: 'c3_start',
        effects: { soberaniaScore: -50 }
      }
    ],
  },
  c3_support_blocked: {
    id: 'c3_support_blocked',
    chapter: 3,
    speaker: characters.narrator,
    text: 'Evitás la estafa de soporte. Ahora, antes de depositar fondos reales en la wallet, decidís verificar la autenticidad del software que acabas de descargar para asegurarte de que no sea una versión modificada por un hacker.',
    background: backgrounds.exchange,
    character: null,
    nextId: 'c3_dec_11',
  },
  c3_dec_11: {
    id: 'c3_dec_11',
    chapter: 3,
    speaker: characters.system,
    text: '[Decisión 3.3] ¿Cómo verificás que el instalador de la billetera que descargaste es legítimo y no contiene código malicioso?',
    background: backgrounds.exchange,
    character: null,
    choices: [
      {
        text: 'Confiar en que si la página web se veía profesional y tenía el candado verde de HTTPS, el archivo es 100% seguro de ejecutar.',
        nextId: 'c3_legit_https',
        effects: { detour: true, soberaniaScore: 0 }
      },
      {
        text: 'Descargar el archivo de firmas del desarrollador, verificar su clave PGP pública y comprobar que la suma de verificación (SHA256 Checksum) del archivo descargado coincida exactamente con la oficial.',
        nextId: 'c3_legit_pgp',
        effects: { soberaniaScore: 15 }
      }
    ],
  },
  c3_legit_https: {
    id: 'c3_legit_https',
    chapter: 3,
    speaker: characters.narrator,
    text: 'Ejecutas el software confiando en la apariencia web. Por esta vez tienes suerte y era el instalador real. Sin embargo, has asumido un riesgo innecesario de seguridad.',
    background: backgrounds.exchange,
    character: null,
    nextId: 'c3_next_step',
  },
  c3_legit_pgp: {
    id: 'c3_legit_pgp',
    chapter: 3,
    speaker: characters.narrator,
    text: 'Verificas con éxito la firma PGP y el SHA256. El software está auditado por ti y es matemáticamente legítimo. El software te explica que las transacciones se firman digitalmente con tu clave privada.',
    background: backgrounds.exchange,
    character: null,
    nextId: 'c3_next_step',
  },
  c3_next_step: {
    id: 'c3_next_step',
    chapter: 3,
    speaker: characters.narrator,
    text: 'Tu billetera está lista y es segura. Entendés que las transacciones en Bitcoin se firman digitalmente. Tu clave privada genera una firma matemática para cada movimiento, demostrando propiedad sin revelar el secreto original.',
    background: backgrounds.exchange,
    character: null,
    nextId: 'c3_dec_12',
  },
  c3_dec_12: {
    id: 'c3_dec_12',
    chapter: 3,
    speaker: characters.system,
    text: '[Decisión 3.4] Querés recibir una pequeña fracción de Bitcoin (satoshis) para probar el sistema. ¿Qué dato debés proporcionarle a la persona que te va a enviar los fondos?',
    background: backgrounds.exchange,
    character: null,
    choices: [
      {
        text: 'Tu clave pública extendida o tu clave privada cifrada.',
        nextId: 'c3_badending_7',
      },
      {
        text: 'Una nueva dirección de recepción generada por tu wallet (que es un derivado seguro y hashificado de tu clave pública).',
        nextId: 'c4_start',
        effects: { soberaniaScore: 15 }
      }
    ],
  },
  c3_badending_7: {
    id: 'c3_badending_7',
    chapter: 3,
    speaker: characters.narrator,
    text: 'Al compartir claves incorrectas o privadas expones el control de tus canales contables. Un script automatizado barre tu saldo y deja la billetera en blanco.',
    background: backgrounds.gameover,
    character: 'nico',
    expression: 'panico',
    nextId: 'c3_gameover_7',
  },
  c3_gameover_7: {
    id: 'c3_gameover_7',
    chapter: 3,
    speaker: characters.system,
    text: '❌ GAME OVER: Compartir datos privados de tu wallet resulta en la pérdida del capital. Not your keys, not your coins. Reiniciá.',
    background: backgrounds.gameover,
    character: null,
    choices: [
      {
        text: 'Reiniciar Capítulo 3',
        nextId: 'c3_start',
        effects: { soberaniaScore: -50 }
      }
    ],
  },

  // --- CAPÍTULO 4: El Gremio de la Energía ---
  c4_start: {
    id: 'c4_start',
    chapter: 4,
    speaker: characters.narrator,
    text: 'Llegas a un galpón industrial inmenso y semiiluminado. Estanterías metálicas alojan miles de mineros ASIC titilando en verde. El calor ambiental es intenso. En primer plano, sentado en una silla de lona, está El Panter: una pantera negra robusta y amigable, que viste un mameluco de trabajo abierto y está tomando mate de un porongo de madera pulida de forma pausada.',
    background: backgrounds.cryptaDoor,
    character: null,
    nextId: 'c4_01',
  },
  c4_01: {
    id: 'c4_01',
    chapter: 4,
    speaker: characters.yaguar,
    text: '¡Buenas, che! Veo que traés cara de haber quemado los componentes de tu computadora intentando minar desde tu pieza. Tomate un mate. Soy el encargado de la termodinámica de este monstruo. Acá atamos el software a las leyes de la física.',
    background: backgrounds.cryptaDoor,
    character: 'yaguar',
    expression: 'friendly',
    nextId: 'c4_02',
  },
  c4_02: {
    id: 'c4_02',
    chapter: 4,
    speaker: characters.protagonist,
    text: 'Casi prendo fuego la casa... No entiendo por qué hace falta todo este consumo de electricidad y cables solo para procesar unos datos en una red.',
    background: backgrounds.cryptaDoor,
    character: 'nico',
    expression: 'normal',
    nextId: 'c4_03',
  },
  c4_03: {
    id: 'c4_03',
    chapter: 4,
    speaker: characters.yaguar,
    text: '¡Ja, ja! Porque en el mundo digital los bits son gratis de copiar y duplicar, chamigo. El Proof of Work (Prueba de Trabajo) obliga a los mineros a gastar energía real del mundo físico para tener el derecho de escribir un bloque en la historia. Si crear monedas fuera tan fácil como apretar un botón, el dinero valdría lo mismo que las promesas de los políticos: absolutamente nada.',
    background: backgrounds.cryptaDoor,
    character: 'yaguar',
    expression: 'happy',
    nextId: 'c4_dec_13',
  },
  c4_dec_13: {
    id: 'c4_dec_13',
    chapter: 4,
    speaker: characters.system,
    text: '[Decisión 4.1] El Panter te extiende el mate y te tira la primera pregunta técnica: ¿Qué pasa si un atacante con mucho dinero intenta modificar una transacción de un bloque de hace tres días para recuperarse de una pérdida?',
    background: backgrounds.cryptaDoor,
    character: null,
    choices: [
      {
        text: 'Tendría que gastar energía real para recalcular el hash de ese bloque y el de todos los bloques subsiguientes de la cadena, compitiendo en tiempo real contra la potencia acumulada de toda la red honesta global del planeta.',
        nextId: 'c4_attack_pow',
        effects: { soberaniaScore: 15 }
      },
      {
        text: 'La red lo detecta y lo banea bloqueando su dirección IP de forma centralizada en la base de datos principal de la red.',
        nextId: 'c4_attack_ip',
        effects: { soberaniaScore: 0 }
      }
    ],
  },
  c4_attack_ip: {
    id: 'c4_attack_ip',
    chapter: 4,
    speaker: characters.yaguar,
    text: 'No hay servidores centrales que manejen listas negras de IPs, chamigo. La red se defiende porque obligás al tramposo a gastar millones de dólares en electricidad para reescribir la historia, haciendo que su trampa sea económicamente inviable.',
    background: backgrounds.cryptaDoor,
    character: 'yaguar',
    expression: 'normal',
    nextId: 'c4_scene_4_2',
  },
  c4_attack_pow: {
    id: 'c4_attack_pow',
    chapter: 4,
    speaker: characters.yaguar,
    text: 'Exactamente. La energía consumida inmutablemente protege la historia pasada contable.',
    background: backgrounds.cryptaDoor,
    character: 'yaguar',
    expression: 'friendly',
    nextId: 'c4_scene_4_2',
  },
  c4_scene_4_2: {
    id: 'c4_scene_4_2',
    chapter: 4,
    speaker: characters.narrator,
    text: 'El felino señala una pantalla que muestra un reloj en reversa de 10 minutos. "Pensá esto ahora. Si mañana entra el doble de mineros con computadoras cuánticas superpotentes a resolver los acertijos criptográficos, ¿los 21 millones de bitcoins se minarían en un par de semanas y el sistema colapsaría por hiperinflación?"',
    background: backgrounds.cryptaDoor,
    character: null,
    nextId: 'c4_dec_14',
  },
  c4_dec_14: {
    id: 'c4_dec_14',
    chapter: 4,
    speaker: characters.system,
    text: '[Decisión 4.2] El reloj de bloques titila en la pantalla del galpón. ¿Cómo responde el protocolo ante un aumento drástico del poder de cómputo (Hash Rate)?',
    background: backgrounds.cryptaDoor,
    character: null,
    choices: [
      {
        text: 'Cada 2016 bloques (aproximadamente dos semanas), el protocolo evalúa el tiempo promedio de minado y ajusta la dificultad matemática del acertijo (Ajuste de Dificultad) para asegurarse de que los bloques sigan saliendo cada 10 minutos.',
        nextId: 'c4_difficulty_adjust',
        effects: { soberaniaScore: 15 }
      },
      {
        text: 'La red reduce el precio del bitcoin de forma automática para que no sea rentable usar máquinas tan potentes.',
        nextId: 'c4_badending_8',
      }
    ],
  },
  c4_badending_8: {
    id: 'c4_badending_8',
    chapter: 4,
    speaker: characters.yaguar,
    text: 'No, el protocolo no puede fijar el precio del mercado libre. Si la dificultad no se ajustara, las monedas se emitirían al instante destruyendo el modelo de escasez.',
    background: backgrounds.gameover,
    character: 'yaguar',
    expression: 'normal',
    nextId: 'c4_gameover_8',
  },
  c4_gameover_8: {
    id: 'c4_gameover_8',
    chapter: 4,
    speaker: characters.system,
    text: '❌ GAME OVER: El ajuste de dificultad es la regla inmutable que mantiene la escasez en el tiempo. Reiniciá el capítulo.',
    background: backgrounds.gameover,
    character: null,
    choices: [
      {
        text: 'Reiniciar Capítulo 4',
        nextId: 'c4_start',
        effects: { soberaniaScore: -50 }
      }
    ],
  },
  c4_difficulty_adjust: {
    id: 'c4_difficulty_adjust',
    chapter: 4,
    speaker: characters.yaguar,
    text: 'Exacto. El protocolo controla el tiempo, no el precio. Ahora miremos el acertijo matemático en sí. Las máquinas intentan encontrar un número llamado Nonce que, al pasarse por la función SHA-256 junto a los datos del bloque, devuelva un hash con una cantidad específica de ceros a la izquierda.',
    background: backgrounds.cryptaDoor,
    character: 'yaguar',
    expression: 'friendly',
    nextId: 'c4_dec_15',
  },
  c4_dec_15: {
    id: 'c4_dec_15',
    chapter: 4,
    speaker: characters.system,
    text: '[Decisión 4.3] ¿Qué propiedad fundamental de la función hash SHA-256 hace que la minería sea un proceso justo y competitivo?',
    background: backgrounds.cryptaDoor,
    character: null,
    choices: [
      {
        text: 'Que es una función matemática de un solo sentido: es imposible predecir el resultado sin intentar trillones de combinaciones al azar (fuerza bruta), pero para los nodos es instantáneo verificar si el resultado encontrado es correcto.',
        nextId: 'c4_hash_fair',
        effects: { soberaniaScore: 15 }
      },
      {
        text: 'Que el acertijo es una ecuación algebraica simple que las computadoras resuelven siguiendo un manual de instrucciones fijo provisto por el nodo central.',
        nextId: 'c4_badending_9',
      }
    ],
  },
  c4_badending_9: {
    id: 'c4_badending_9',
    chapter: 4,
    speaker: characters.yaguar,
    text: 'Si fuera una ecuación simple y predecible, los mineros gigantes monopolizarían la red al instante sin competencia real de azar y consumo físico.',
    background: backgrounds.gameover,
    character: 'yaguar',
    expression: 'normal',
    nextId: 'c4_gameover_9',
  },
  c4_gameover_9: {
    id: 'c4_gameover_9',
    chapter: 4,
    speaker: characters.system,
    text: '❌ GAME OVER: SHA-256 garantiza que la competencia sea probabilística y distribuida de forma honesta. Reiniciá el capítulo.',
    background: backgrounds.gameover,
    character: null,
    choices: [
      {
        text: 'Reiniciar Capítulo 4',
        nextId: 'c4_start',
        effects: { soberaniaScore: -50 }
      }
    ],
  },
  c4_hash_fair: {
    id: 'c4_hash_fair',
    chapter: 4,
    speaker: characters.yaguar,
    text: '¡Tal cual! Es una lotería matemática justa. Gastás energía real para asegurar la red, y a cambio el protocolo te premia con satoshis nuevos en el bloque contable (monedas de subsidio) más las comisiones de los usuarios. Es una simbiosis perfecta entre la física y la economía.',
    background: backgrounds.cryptaDoor,
    character: 'yaguar',
    expression: 'happy',
    nextId: 'c4_dec_16',
  },
  c4_dec_16: {
    id: 'c4_dec_16',
    chapter: 4,
    speaker: characters.system,
    text: '[Decisión 4.4] El Panter termina su termo de mate y te da una palmadita amigable en la espalda. ¿Cuál es la conclusión técnica que te llevás de su galpón industrial?',
    background: backgrounds.cryptaDoor,
    character: null,
    choices: [
      {
        text: 'Que la minería de Bitcoin es un desperdicio de energía innecesario y que el sistema funcionaría mejor si una empresa validara las transacciones de forma gratuita mediante firmas digitales simples.',
        nextId: 'c5_start',
        effects: { detour: true, soberaniaScore: 0 }
      },
      {
        text: 'Que la Prueba de Trabajo es el puente inquebrantable que une el software digital con las leyes de la termodinámica del mundo real, haciendo que la escasez digital sea físicamente verdadera e incorruptible.',
        nextId: 'c5_start',
        effects: { soberaniaScore: 15 }
      }
    ],
  },

  // --- CAPÍTULO 5: El Ejército de los Mil Ojos ---
  c5_start: {
    id: 'c5_start',
    chapter: 5,
    speaker: characters.narrator,
    text: 'Te encontrás en medio de una crisis histórica del protocolo. Una sala de control limpia y moderna. Decenas de pantallas muestran mapas interconectados con hilos de datos P2P globales cruzando fronteras. Un consorcio de empresas mineras gigantes y corporaciones de exchanges que controlan el 80% del poder de cómputo físico emite un comunicado conjunto: "Vamos a bifurcar la red para cambiar las reglas de Bitcoin y aumentar el tamaño de los bloques. Esto obligará a usar servidores masivos que solo las corporaciones pueden pagar, pero agilizará la red principal on-chain. El que no actualice nuestro software modificado se quedará afuera".',
    background: backgrounds.cryptaInterior,
    character: null,
    nextId: 'c5_01',
  },
  c5_01: {
    id: 'c5_01',
    chapter: 5,
    speaker: characters.system,
    text: 'Voz del Terminal: Alerta de consenso: Bloque alternativo detectado con reglas incompatibles.',
    background: backgrounds.cryptaInterior,
    character: null,
    nextId: 'c5_dec_17',
  },
  c5_dec_17: {
    id: 'c5_dec_17',
    chapter: 5,
    speaker: characters.system,
    text: '[Decisión 5.1] Te enfrentás al dilema del poder en la red: ¿Quién tiene realmente la última palabra sobre las reglas de consenso de Bitcoin?',
    background: backgrounds.cryptaInterior,
    character: null,
    choices: [
      {
        text: 'Los mineros con grandes capitales energéticos, porque ellos escriben físicamente los bloques en la cadena y controlan el Hash Rate.',
        nextId: 'c5_badending_10',
      },
      {
        text: 'Los nodos independientes de los usuarios comunes que ejecutan el software de validación en sus casas, ya que ellos auditan cada bloque y rechazan los bloques de los mineros si violan las reglas del protocolo.',
        nextId: 'c5_nodes_power',
        effects: { soberaniaScore: 15 }
      }
    ],
  },
  c5_badending_10: {
    id: 'c5_badending_10',
    chapter: 5,
    speaker: characters.narrator,
    text: 'Las grandes corporaciones imponen sus reglas de emisión y tamaño. Apagas tu nodo y dejas que ellos validen todo. Pronto el sistema requiere servidores de miles de dólares, excluyendo a la gente corriente. El bitcoin pierde su neutralidad.',
    background: backgrounds.gameover,
    character: 'nico',
    expression: 'panico',
    nextId: 'c5_gameover_10',
  },
  c5_gameover_10: {
    id: 'c5_gameover_10',
    chapter: 5,
    speaker: characters.system,
    text: '❌ GAME OVER: Ceder el control a los mineros gigantes resulta en captura corporativa y fin de la descentralización. Reiniciá.',
    background: backgrounds.gameover,
    character: null,
    choices: [
      {
        text: 'Reiniciar Capítulo 5',
        nextId: 'c5_start',
        effects: { soberaniaScore: -50 }
      }
    ],
  },
  c5_nodes_power: {
    id: 'c5_nodes_power',
    chapter: 5,
    speaker: characters.narrator,
    text: 'Entendés que los mineros proponen la historia, pero los nodos dictan las reglas del juego. Si un minero gasta millones de dólares en minar un bloque inválido según las reglas de los nodos, su bloque es rechazado y su recompensa económica se vuelve igual a cero. Tu terminal te pide tomar una acción directa sobre el software de tu nodo local.',
    background: backgrounds.cryptaInterior,
    character: null,
    nextId: 'c5_dec_18',
  },
  c5_dec_18: {
    id: 'c5_dec_18',
    chapter: 5,
    speaker: characters.system,
    text: '[Decisión 5.2] Las pantallas de los exchanges centralizados corporativos empiezan a mostrar pánico y te sugieren cambiar al software modificado de los mineros gigantes. ¿Cómo configuras tu nodo?',
    background: backgrounds.cryptaInterior,
    character: null,
    choices: [
      {
        text: 'Mantener la ejecución de las reglas originales de tu nodo soberano, rechazando de forma automática los bloques gigantes e inválidos de las corporaciones mineras, obligándolos a jugar bajo las reglas de la comunidad si quieren que su Bitcoin tenga valor real.',
        nextId: 'c5_nodes_sovereign',
        effects: { soberaniaScore: 15 }
      },
      {
        text: 'Ceder ante el pánico del mercado, apagar tu nodo local y empezar a usar la versión modificada que proponen las corporaciones para no quedarte en la cadena con menos poder de cómputo inicial.',
        nextId: 'c5_nodes_panic',
        effects: { tradingScore: 5, detour: true }
      }
    ],
  },
  c5_nodes_panic: {
    id: 'c5_nodes_panic',
    chapter: 5,
    speaker: characters.narrator,
    text: 'Apagas tu nodo local y cedes ante las presiones de las corporaciones mineras. Tu soberanía ha disminuido, y has entrado temporalmente en la Ruta del Sobreviviente. Te mantienes a la expectativa.',
    background: backgrounds.cryptaInterior,
    character: null,
    nextId: 'c5_nodes_attack',
  },
  c5_nodes_sovereign: {
    id: 'c5_nodes_sovereign',
    chapter: 5,
    speaker: characters.narrator,
    text: 'Te mantienes firme en la red honesta. Tu nodo empieza a rechazar activamente las transacciones que no cumplen con la estructura contable original.',
    background: backgrounds.cryptaInterior,
    character: null,
    nextId: 'c5_nodes_attack',
  },
  c5_nodes_attack: {
    id: 'c5_nodes_attack',
    chapter: 5,
    speaker: characters.narrator,
    text: 'Un ataque Sybil simulado intenta inundar tu conexión con miles de nodos falsos en la red P2P para aislarte y hacerte creer que estás solo en la red original.',
    background: backgrounds.cryptaInterior,
    character: null,
    nextId: 'c5_dec_19',
  },
  c5_dec_19: {
    id: 'c5_dec_19',
    chapter: 5,
    speaker: characters.system,
    text: '[Decisión 5.3] ¿Cómo se defiende tu nodo independiente frente a un ataque Sybil que intenta rodearlo de identidades digitales falsas?',
    background: backgrounds.cryptaInterior,
    character: null,
    choices: [
      {
        text: 'Solicitar una lista de nodos verificados por el Ministerio de Telecomunicaciones del gobierno local para filtrar las conexiones sospechosas.',
        nextId: 'c5_badending_11',
      },
      {
        text: 'Evaluar las conexiones de forma aleatoria y descentralizada, exigiendo que cada bloque propagado por los pares contenga la Prueba de Trabajo válida adjunta, haciendo que crear bloques falsos sea astronómicamente costoso para el atacante.',
        nextId: 'c5_nodes_defend',
        effects: { soberaniaScore: 15 }
      }
    ],
  },
  c5_badending_11: {
    id: 'c5_badending_11',
    chapter: 5,
    speaker: characters.narrator,
    text: 'Delegas el filtro de conexiones en el gobierno. Rápidamente tu nodo pasa a estar bajo censura y control estatal directo. Las transacciones no aprobadas son confiscadas.',
    background: backgrounds.gameover,
    character: 'nico',
    expression: 'panico',
    nextId: 'c5_gameover_11',
  },
  c5_gameover_11: {
    id: 'c5_gameover_11',
    chapter: 5,
    speaker: characters.system,
    text: '❌ GAME OVER: Confiar en listas centralizadas destruye la neutralidad del protocolo. Reiniciá el capítulo.',
    background: backgrounds.gameover,
    character: null,
    choices: [
      {
        text: 'Reiniciar Capítulo 5',
        nextId: 'c5_start',
        effects: { soberaniaScore: -50 }
      }
    ],
  },
  c5_nodes_defend: {
    id: 'c5_nodes_defend',
    chapter: 5,
    speaker: characters.narrator,
    text: 'El ataque corporativo fracasa de forma estrepitosa. Los mineros descubren que están quemando millones de dólares en electricidad minando bloques gigantes que la red global de nodos independientes rechaza sistemáticamente como basura sin valor de mercado. Los mineros se ven obligados a capitular y regresar a las reglas de consenso originales dictadas por la comunidad.',
    background: backgrounds.cryptaInterior,
    character: null,
    nextId: 'c5_dec_20',
  },
  c5_dec_20: {
    id: 'c5_dec_20',
    chapter: 5,
    speaker: characters.system,
    text: '[Decisión 5.4] Tras presenciar la histórica victoria de la comunidad de nodos sobre los gigantes mineros corporativos (La guerra de los bloques), ¿qué principio fundamental del consenso has verificado por vos mismo?',
    background: backgrounds.cryptaInterior,
    character: null,
    choices: [
      {
        text: 'Que Bitcoin es democrático y las reglas cambian si la mayoría de las empresas grandes se ponen de acuerdo en un almuerzo de negocios en Nueva York.',
        nextId: 'c6_start',
        effects: { detour: true, soberaniaScore: 0 }
      },
      {
        text: 'Que la descentralización radical significa que las reglas de Bitcoin están protegidas por los usuarios individuales que corren sus propios nodos validadores, logrando que el protocolo sea resistente a la captura corporativa, estatal o militar.',
        nextId: 'c6_start',
        effects: { soberaniaScore: 15 }
      }
    ],
  },

  // --- CAPÍTULO 6: Los Canales del Relámpago ---
  c6_start: {
    id: 'c6_start',
    chapter: 6,
    speaker: characters.narrator,
    text: 'Te encontrás en una esquina ciberpunk moderna bajo una lluvia digital leve. Entrás a una cafetería de especialidad donde un panel de cobros electrónicos muestra tarifas fluctuantes en tiempo real. Se escucha el siseo metálico de la máquina de espresso.',
    background: backgrounds.cafe,
    character: null,
    nextId: 'c6_01',
  },
  c6_01: {
    id: 'c6_01',
    chapter: 6,
    speaker: characters.barista,
    text: '¡Buenas! Serían un café de especialidad y un tostado. En total son 4,500 satoshis. Te aviso que la capa base on-chain en este momento está bastante congestionada por congestión en la mempool, y la comisión de red mínima para entrar en el próximo bloque es de 15,000 sats. ¿Pagás on-chain o abrimos un canal en Lightning Network?',
    background: backgrounds.cafe,
    character: 'barista',
    expression: 'normal',
    nextId: 'c6_02',
  },
  c6_02: {
    id: 'c6_02',
    chapter: 6,
    speaker: characters.protagonist,
    text: 'Pagar tres veces más de comisión que el costo del producto por un simple café no tiene ningún sentido común...',
    background: backgrounds.cafe,
    character: 'nico',
    expression: 'normal',
    nextId: 'c6_dec_21',
  },
  c6_dec_21: {
    id: 'c6_dec_21',
    chapter: 6,
    speaker: characters.system,
    text: '[Decisión 6.1] ¿Cómo le explicarías la necesidad técnica de Lightning Network al barista para demostrar que entendés el dilema de escalabilidad de la Capa 1?',
    background: backgrounds.cafe,
    character: null,
    choices: [
      {
        text: 'Que la blockchain principal de Bitcoin está diseñada a nivel de consenso para ser lenta y pesada para priorizar la seguridad y descentralización absoluta global, por lo que registrar transacciones pequeñas de consumo diario requiere una segunda capa que procese transacciones fuera de la cadena base.',
        nextId: 'c6_lightning_correct',
        effects: { soberaniaScore: 15 }
      },
      {
        text: 'Que la blockchain principal tiene un error de programación de fábrica y que Lightning la reemplaza emitiendo un token alternativo más moderno y rápido.',
        nextId: 'c6_badending_12',
      }
    ],
  },
  c6_badending_12: {
    id: 'c6_badending_12',
    chapter: 6,
    speaker: characters.barista,
    text: 'No, no emitimos nuevos tokens. Hacerlo devaluaría la escasez de Bitcoin y crearía otra estafa especulativa de mercado.',
    background: backgrounds.gameover,
    character: 'barista',
    expression: 'normal',
    nextId: 'c6_gameover_12',
  },
  c6_gameover_12: {
    id: 'c6_gameover_12',
    chapter: 6,
    speaker: characters.system,
    text: '❌ GAME OVER: Intentar solucionar la escalabilidad creando altcoins destruye la seguridad del dinero base. Reiniciá.',
    background: backgrounds.gameover,
    character: null,
    choices: [
      {
        text: 'Reiniciar Capítulo 6',
        nextId: 'c6_start',
        effects: { soberaniaScore: -50 }
      }
    ],
  },
  c6_lightning_correct: {
    id: 'c6_lightning_correct',
    chapter: 6,
    speaker: characters.barista,
    text: 'Exactamente. Es una red de canales inteligentes. Dejame mostrarte el código QR dinámico de pago.',
    background: backgrounds.cafe,
    character: 'barista',
    expression: 'happy',
    nextId: 'c6_lightning_wallet_intro',
  },
  c6_lightning_wallet_intro: {
    id: 'c6_lightning_wallet_intro',
    chapter: 6,
    speaker: characters.narrator,
    text: 'El barista te muestra una tablet con un código QR interactivo de factura de Lightning que empieza con los caracteres lnbc.... Abrís la aplicación móvil simulada en la pantalla de la novela visual.',
    background: backgrounds.cafe,
    character: null,
    nextId: 'c6_dec_22',
  },
  c6_dec_22: {
    id: 'c6_dec_22',
    chapter: 6,
    speaker: characters.system,
    text: '[Decisión 6.2] Al interactuar con la interfaz de tu billetera móvil para Lightning Network, notás que tu canal abierto tiene un Balance Local de 10,000 sats y un Balance Entrante (Inbound Liquidity) de 0 sats. ¿Cuál es tu capacidad operativa inmediata en este estado del canal?',
    background: backgrounds.cafe,
    character: null,
    choices: [
      {
        text: 'Puedo enviar pagos instantáneos on-the-fly hasta un máximo de 10,000 sats porque los fondos locales están de mi lado del canal, pero actualmente no tengo capacidad técnica para recibir pagos de terceros en este canal específico.',
        nextId: 'c6_lightning_minigame_start',
        effects: { soberaniaScore: 15 }
      },
      {
        text: 'Puedo recibir pagos de cualquier tamaño porque mi billetera está conectada de forma directa e inalámbrica a la blockchain global de Bitcoin.',
        nextId: 'c6_badending_13',
      }
    ],
  },
  c6_badending_13: {
    id: 'c6_badending_13',
    chapter: 6,
    speaker: characters.barista,
    text: 'No, si tu canal no tiene liquidez entrante (los fondos del otro lado), es técnicamente imposible que te enruten saldos hacia ti. Tu canal se traba.',
    background: backgrounds.gameover,
    character: 'barista',
    expression: 'normal',
    nextId: 'c6_gameover_13',
  },
  c6_gameover_13: {
    id: 'c6_gameover_13',
    chapter: 6,
    speaker: characters.system,
    text: '❌ GAME OVER: Lightning Network es un sistema de canales de balance de liquidez dinámico. Debes entender los flujos de saldos. Reiniciá.',
    background: backgrounds.gameover,
    character: null,
    choices: [
      {
        text: 'Reiniciar Capítulo 6',
        nextId: 'c6_start',
        effects: { soberaniaScore: -50 }
      }
    ],
  },
  c6_lightning_minigame_start: {
    id: 'c6_lightning_minigame_start',
    chapter: 6,
    speaker: characters.system,
    text: 'Simulando transacción Lightning... Confirma el pago de 4,500 sats.',
    background: backgrounds.cafe,
    character: null,
    minigame: 'wallet',
  },
  c6_lightning_success: {
    id: 'c6_lightning_success',
    chapter: 6,
    speaker: characters.barista,
    text: '¡Perfecto! Salió al toque. El pago se liquidó instantáneamente en 0.4 segundos con 1 satoshi de comisión. Ahora pensá en una situación de enrutamiento (Routing). ¿Qué pasa si querés pagarle a un proveedor con el que no tenés un canal abierto directo, pero ambos están conectados a través de nodos intermedios de la red distribuidos en el mapa?',
    background: backgrounds.cafe,
    character: 'barista',
    expression: 'happy',
    nextId: 'c6_dec_23',
  },
  c6_dec_23: {
    id: 'c6_dec_23',
    chapter: 6,
    speaker: characters.system,
    text: '[Decisión 6.3] ¿Cómo viajan tus satoshis a través de Lightning Network cuando utilizás nodos puente intermedios sin que estos intermediarios puedan robar tus fondos en el camino?',
    background: backgrounds.cafe,
    character: null,
    choices: [
      {
        text: 'Los satoshis viajan protegidos mediante contratos HTLC (Hash Time-Locked Contracts) criptográficos, donde cada nodo intermedio procesa el pago de forma segura condicionada a la revelación de un secreto matemático, haciendo imposible que nadie se quede con los fondos a mitad de camino.',
        nextId: 'c6_routing_correct',
        effects: { soberaniaScore: 15 }
      },
      {
        text: 'Los satoshis pasan temporalmente a la custodia legal del nodo puente, confiando en su reputación comercial dentro del software de la app.',
        nextId: 'c6_badending_14',
      }
    ],
  },
  c6_badending_14: {
    id: 'c6_badending_14',
    chapter: 6,
    speaker: characters.narrator,
    text: 'El nodo intermedio decide incautar tus fondos reteniendo tu pago alegando regulaciones del operador. Tus satoshis desaparecen.',
    background: backgrounds.gameover,
    character: 'nico',
    expression: 'panico',
    nextId: 'c6_gameover_14',
  },
  c6_gameover_14: {
    id: 'c6_gameover_14',
    chapter: 6,
    speaker: characters.system,
    text: '❌ GAME OVER: En Lightning la seguridad se basa en criptografía y contratos inteligentes, no en reputación o confianza. Reiniciá.',
    background: backgrounds.gameover,
    character: null,
    choices: [
      {
        text: 'Reiniciar Capítulo 6',
        nextId: 'c6_start',
        effects: { soberaniaScore: -50 }
      }
    ],
  },
  c6_routing_correct: {
    id: 'c6_routing_correct',
    chapter: 6,
    speaker: characters.narrator,
    text: 'Tu café está espectacular y acabas de experimentar la velocidad de la Capa 2 real. Te das cuenta de que Lightning Network no es una blockchain separada, sino Bitcoin real viajando a la velocidad de la luz mediante canales inteligentes de liquidación diferida.',
    background: backgrounds.cafe,
    character: null,
    nextId: 'c6_dec_24',
  },
  c6_dec_24: {
    id: 'c6_dec_24',
    chapter: 6,
    speaker: characters.system,
    text: '[Decisión 6.4] Te preparás para continuar tu camino. ¿Cuál es tu conclusión de diseño sobre el ecosistema de capas de Bitcoin?',
    background: backgrounds.cafe,
    character: null,
    choices: [
      {
        text: 'Que Lightning Network permite que Bitcoin escale de forma infinita a miles de millones de transacciones diarias instantáneas preservando intacta la descentralización y seguridad de la capa base contable.',
        nextId: 'c7_start',
        effects: { soberaniaScore: 15 }
      },
      {
        text: 'Que la Capa 2 es demasiado compleja y que sería mejor aumentar el tamaño de bloque de la Capa 1 cada vez que la red se congestione, sin importar el costo de los servidores centrales.',
        nextId: 'c7_start',
        effects: { detour: true, soberaniaScore: 0 }
      }
    ],
  },

  // --- CAPÍTULO 7: El Rastro de la Niebla ---
  c7_start: {
    id: 'c7_start',
    chapter: 7,
    speaker: characters.narrator,
    text: 'Te encontrás en tu escritorio. Una interfaz oscura llena de árboles de transacciones interconectados por líneas de análisis forense blockchain se muestra en tu pantalla. Una ventana simula un software de rastreo heurístico apuntando a tus movimientos históricos.',
    background: backgrounds.exchange,
    character: null,
    nextId: 'c7_01',
  },
  c7_01: {
    id: 'c7_01',
    chapter: 7,
    speaker: characters.system,
    text: 'Hacker en las Sombras: "Cometiste un error conceptual grave de privacidad en el pasado. Compraste bitcoins en una casa de cambio regulada con KYC (verificación de identidad con pasaporte y selfie) y luego retiraste los fondos hacia tu billetera privada enviando todo el balance a una única dirección pública reutilizada. Una corporación de análisis forense blockchain acaba de enlazar tu nombre real con todo tu balance contable público en el explorador de bloques."',
    background: backgrounds.exchange,
    character: null,
    nextId: 'c7_02',
  },
  c7_02: {
    id: 'c7_02',
    chapter: 7,
    speaker: characters.protagonist,
    text: 'Pará... ¿o sea que si alguien conoce una sola de mis direcciones públicas puede rastrear todo mi balance y saber cuánto dinero tengo guardado en mi billetera?',
    background: backgrounds.exchange,
    character: 'nico',
    expression: 'concentrado',
    nextId: 'c7_dec_25',
  },
  c7_dec_25: {
    id: 'c7_dec_25',
    chapter: 7,
    speaker: characters.system,
    text: '[Decisión 7.1] El hacker te muestra el mapa de tu billetera en la pantalla. ¿Cómo se estructuran los saldos internos dentro de tu billetera soberana de Bitcoin?',
    background: backgrounds.exchange,
    character: null,
    choices: [
      {
        text: 'Bitcoin no funciona con cuentas o balances únicos integrales; funciona mediante un modelo de un conjunto de Salidas de Transacciones No Gastadas (UTXOs), donde cada moneda actúa como un billete físico independiente con su propio historial criptográfico rastreable en el libro contable público.',
        nextId: 'c7_utxo_correct',
        effects: { soberaniaScore: 15 }
      },
      {
        text: 'Funciona mediante un balance contable de cuenta global indexado al nombre de usuario que registraste al instalar la aplicación de la wallet.',
        nextId: 'c7_badending_15',
      }
    ],
  },
  c7_badending_15: {
    id: 'c7_badending_15',
    chapter: 7,
    speaker: characters.system,
    text: 'Error: No existe el concepto de "cuenta" global a nivel de protocolo. Asumir eso te expone a reutilizar direcciones y perder toda tu privacidad al instante.',
    background: backgrounds.gameover,
    character: null,
    nextId: 'c7_gameover_15',
  },
  c7_gameover_15: {
    id: 'c7_gameover_15',
    chapter: 7,
    speaker: characters.system,
    text: '❌ GAME OVER: La falta de comprensión de las UTXOs expone todo tu historial financiero a analistas. Reiniciá el capítulo.',
    background: backgrounds.gameover,
    character: null,
    choices: [
      {
        text: 'Reiniciar Capítulo 7',
        nextId: 'c7_start',
        effects: { soberaniaScore: -50 }
      }
    ],
  },
  c7_utxo_correct: {
    id: 'c7_utxo_correct',
    chapter: 7,
    speaker: characters.system,
    text: 'Hacker en las Sombras: "Exactamente. Son UTXOs. Cada una es un pedazo de historia matemática. Como reutilizaste la dirección y mezclaste monedas de exchange regulado con monedas de consumo, rompiste tu seudónimo. En Bitcoin las direcciones públicas son como seudónimos descartables: jamás se deben volver a usar para recibir un segundo pago si querés preservar tu privacidad financiera básica."',
    background: backgrounds.exchange,
    character: null,
    nextId: 'c7_dec_26',
  },
  c7_dec_26: {
    id: 'c7_dec_26',
    chapter: 7,
    speaker: characters.system,
    text: '[Decisión 7.2] Tenés dos UTXOs en tu inventario simulado en pantalla: una de 1,000,000 de sats vinculada a tu nombre real por el exchange con KYC, y otra de 50,000 sats limpia que te dio un amigo en persona. Querés comprar un libro digital de forma privada. ¿Cómo gestionas tus monedas usando Coin Control?',
    background: backgrounds.exchange,
    character: null,
    choices: [
      {
        text: 'Utilizar la herramienta Coin Control de mi wallet para seleccionar de forma manual únicamente la UTXO limpia de 50,000 sats para realizar el pago, evitando que el destinatario o los ojos analíticos unan esa transacción con mi fondo mayor de un millón de sats.',
        nextId: 'c7_coin_control_correct',
        effects: { soberaniaScore: 15 }
      },
      {
        text: 'Dejar que la wallet gaste de forma automática unificando ambas UTXOs en una sola transacción masiva on-chain para simplificar el proceso del envío.',
        nextId: 'c7_badending_16',
      }
    ],
  },
  c7_badending_16: {
    id: 'c7_badending_16',
    chapter: 7,
    speaker: characters.system,
    text: 'Al consolidar las monedas en una sola transacción P2P, los analistas de blockchain vinculan tus monedas limpias con tu identidad real (KYC) al instante. Tu privacidad total se ha roto.',
    background: backgrounds.gameover,
    character: null,
    nextId: 'c7_gameover_16',
  },
  c7_gameover_16: {
    id: 'c7_gameover_16',
    chapter: 7,
    speaker: characters.system,
    text: '❌ GAME OVER: La consolidación automática une tus monedas limpias con tus datos reales. Reiniciá el capítulo.',
    background: backgrounds.gameover,
    character: null,
    choices: [
      {
        text: 'Reiniciar Capítulo 7',
        nextId: 'c7_start',
        effects: { soberaniaScore: -50 }
      }
    ],
  },
  c7_coin_control_correct: {
    id: 'c7_coin_control_correct',
    chapter: 7,
    speaker: characters.system,
    text: 'Hacker en las Sombras: "Buena selección con Coin Control. Rompiste el enlace inmediato. Ahora, para limpiar el rastro forense heurístico que vincula tu UTXO de un millón de sats con tu documento de identidad en el exchange viejo, debemos aplicar una técnica matemática avanzada P2P de mezcla de monedas sin ceder la custodia de los fondos."',
    background: backgrounds.exchange,
    character: null,
    nextId: 'c7_dec_27',
  },
  c7_dec_27: {
    id: 'c7_dec_27',
    chapter: 7,
    speaker: characters.system,
    text: '[Decisión 7.3] El hacker despliega una terminal de coordinación de privacidad en tu pantalla: ¿Qué proceso decidís ejecutar para recuperar la privacidad de tus UTXOs manchadas con KYC?',
    background: backgrounds.exchange,
    character: null,
    choices: [
      {
        text: 'Enviar todos los satoshis a una billetera multifirma alternativa que maneje una base de datos privada cifrada con contraseña fuerte.',
        nextId: 'c7_multisig_incorrect',
        effects: { soberaniaScore: 0 }
      },
      {
        text: 'Pasar la UTXO por un proceso de CoinJoin, participando en una transacción colaborativa automatizada con decenas de otros usuarios independientes de la red, donde todas las entradas y salidas de la transacción tienen montos idénticos, rompiendo de forma matemática la heurística de rastreo del explorador de bloques.',
        nextId: 'c7_coinjoin_correct',
        effects: { soberaniaScore: 15 }
      }
    ],
  },
  c7_multisig_incorrect: {
    id: 'c7_multisig_incorrect',
    chapter: 7,
    speaker: characters.system,
    text: 'Hacker en las Sombras: "Enviar fondos a otra billetera tuya no altera el historial contable público. Solo gastas comisiones innecesarias y el historial de la transacción sigue estando asociado a tu nombre real. Déjame guiarte al CoinJoin."',
    background: backgrounds.exchange,
    character: null,
    nextId: 'c7_coinjoin_correct',
  },
  c7_coinjoin_correct: {
    id: 'c7_coinjoin_correct',
    chapter: 7,
    speaker: characters.narrator,
    text: 'La transacción CoinJoin se procesa en la pantalla de la novela visual. Las líneas de rastreo forense corporativas que apuntaban a tu billetera se cortan bruscamente, disolviéndose en un mar de salidas idénticas imposibles de correlacionar. Tu privacidad financiera matemática ha sido restaurada.',
    background: backgrounds.exchange,
    character: null,
    nextId: 'c7_dec_28',
  },
  c7_dec_28: {
    id: 'c7_dec_28',
    chapter: 7,
    speaker: characters.system,
    text: '[Decisión 7.4] Completás el proceso de saneamiento de tu billetera contable. ¿Cuál es el aprendizaje clave de privacidad que aplicarás en tus transacciones a partir de ahora?',
    background: backgrounds.exchange,
    character: null,
    choices: [
      {
        text: 'Que Bitcoin es completamente anónimo por defecto y que no importa qué herramientas use ni dónde compre las monedas porque la red oculta los balances de forma automática.',
        nextId: 'c8_start',
        effects: { detour: true, soberaniaScore: 0 }
      },
      {
        text: 'Que Bitcoin es una red transparente y seudónima de código abierto, donde la privacidad es un derecho que se defiende activamente gestionando de forma estricta las UTXOs, evitando la reutilización de direcciones y utilizando herramientas descentralizadas de mezcla matemática P2P.',
        nextId: 'c8_start',
        effects: { soberaniaScore: 15 }
      }
    ],
  },

  // --- CAPÍTULO 8: El Eco de las Llaves Libres ---
  c8_start: {
    id: 'c8_start',
    chapter: 8,
    speaker: characters.narrator,
    text: 'Te encontrás en una oficina de telecomunicaciones minimalista iluminada por tubos de luz neón violeta pálido. Frente a vos se encuentra de pie, con una postura erguida, alta y sumamente formal, El Negro: un avestruz violeta de plumaje intenso y mirada seria, que luce únicamente un collar con el logo de Bitcoin tallado en bronce en su cuello largo.',
    background: backgrounds.cryptaInterior,
    character: null,
    nextId: 'c8_01',
  },
  c8_01: {
    id: 'c8_01',
    chapter: 8,
    speaker: characters.narrator,
    text: 'Las pantallas de tus aplicaciones de redes sociales corporativas tradicionales se bloquean de golpe al mismo tiempo en tu teléfono móvil con un mensaje unificado en la interfaz: ACCOUNT PERMANENTLY SUSPENDED - REASON: VIOLATION OF COMPLIANCE TERMS. Te quedás mirando el teléfono en silencio. El Negro de plumaje violeta intenso gira su largo cuello de forma pausada y te observa con absoluta seriedad analítica.',
    background: backgrounds.cryptaInterior,
    character: null,
    nextId: 'c8_02',
  },
  c8_02: {
    id: 'c8_02',
    chapter: 8,
    speaker: characters.negro,
    text: 'Es un evento sumamente predecible. Construiste toda tu identidad de comunicación digital sobre los servidores privados de una megacorporación estadounidense y ahora te asombrás cuando ejecutan su derecho de admisión arbitrario. Qué tremenda contradicción intelectual usar dinero soberano como Bitcoin pero seguir hablando mediante plataformas cerradas y centralizadas.',
    background: backgrounds.cryptaInterior,
    character: 'negro',
    expression: 'normal',
    nextId: 'c8_03',
  },
  c8_03: {
    id: 'c8_03',
    chapter: 8,
    speaker: characters.protagonist,
    text: '¡Pero solo estaba publicando material educativo de código abierto y compartiendo lo que aprendí en el galpón del Yaguar! ¿Cómo se supone que me comunique libremente si los dueños de los servidores controlan el interruptor de mis palabras?',
    background: backgrounds.cryptaInterior,
    character: 'nico',
    expression: 'concentrado',
    nextId: 'c8_04',
  },
  c8_04: {
    id: 'c8_04',
    chapter: 8,
    speaker: characters.negro,
    text: 'Dejando de pedir permiso, ingresante. En este sector de soberanía no usamos aplicaciones controladas por empresas; usamos protocolos de código abierto. Así como Bitcoin liberó tu valor económico de los bancos centrales, Nostr libera tus ideas del control de los algoritmos corporativos de Silicon Valley. No hay bases de datos centrales, no hay contraseñas que te puedan resetear ni directores ejecutivos que puedan censurar tu clave privada.',
    background: backgrounds.cryptaInterior,
    character: 'negro',
    expression: 'normal',
    nextId: 'c8_dec_29',
  },
  c8_dec_29: {
    id: 'c8_dec_29',
    chapter: 8,
    speaker: characters.system,
    text: '[Decisión 8.1] El Negro te examina con severidad, esperando que identifiques la estructura interna del protocolo Nostr:',
    background: backgrounds.cryptaInterior,
    character: null,
    choices: [
      {
        text: 'Nostr funciona mediante un par de llaves criptográficas (pública y privada); firmo mis notas digitalmente con mi clave privada y las transmito de forma libre a múltiples relés (Relays) independientes repartidos por la red global.',
        nextId: 'c8_nostr_correct',
        effects: { soberaniaScore: 15 }
      },
      {
        text: 'Nostr es una corporación descentralizada alternativa en la nube donde los usuarios votan democráticamente para elegir qué moderador aprueba los posteos de cada cuenta.',
        nextId: 'c8_nostr_incorrect',
        effects: { soberaniaScore: 0 }
      }
    ],
  },
  c8_nostr_incorrect: {
    id: 'c8_nostr_incorrect',
    chapter: 8,
    speaker: characters.negro,
    text: 'La moderación por votación de la mayoría sigue siendo centralización y tiranía encubierta, ingresante. En Nostr no hay votaciones ni moderadores centrales; usted es el dueño absoluto de sus palabras porque posee la clave matemática de su identidad.',
    background: backgrounds.cryptaInterior,
    character: 'negro',
    expression: 'normal',
    nextId: 'c8_nostr_scene_8_2',
  },
  c8_nostr_correct: {
    id: 'c8_nostr_correct',
    chapter: 8,
    speaker: characters.negro,
    text: 'Efectivamente. Eres el dueño absoluto de tus palabras en la red porque posees la clave matemática de tu identidad.',
    background: backgrounds.cryptaInterior,
    character: 'negro',
    expression: 'friendly',
    nextId: 'c8_nostr_scene_8_2',
  },
  c8_nostr_scene_8_2: {
    id: 'c8_nostr_scene_8_2',
    chapter: 8,
    speaker: characters.negro,
    text: 'Ahora conectemos las dos herramientas de soberanía que has aprendido. Dinero libre nativo de internet y comunicación libre nativa de internet. En Nostr, las interacciones valiosas no se premian con un botón de "Me Gusta" superficial que solo enriquece el algoritmo de una corporación; se premian enviando satoshis reales de forma instantánea a través de Lightning Network directo al autor del mensaje, sin pasar por filtros de tarjetas de crédito o pasarelas de pago bancarias bancarias. Lo llamamos Zap.',
    background: backgrounds.cryptaInterior,
    character: 'negro',
    expression: 'normal',
    nextId: 'c8_dec_30',
  },
  c8_dec_30: {
    id: 'c8_dec_30',
    chapter: 8,
    speaker: characters.system,
    text: '[Decisión 8.2] El feed interactivo te muestra la publicación de un programador open source que querés apoyar. ¿Cómo configuras tu perfil de Nostr para integrarlo con la economía P2P?',
    background: backgrounds.cryptaInterior,
    character: null,
    choices: [
      {
        text: 'Añadir mi dirección de Lightning (LNURL / Lightning Address) basada en mi nodo propio a los metadatos de mi clave pública de Nostr para recibir y enviar satoshis de forma directa y nativa sin intermediarios.',
        nextId: 'c8_zaps_correct',
        effects: { soberaniaScore: 15 }
      },
      {
        text: 'Copiar mi número de cuenta bancaria internacional CBU tradicional en el perfil para que la plataforma Nostr procese las liquidaciones a fin de mes.',
        nextId: 'c8_badending_17',
      }
    ],
  },
  c8_badending_17: {
    id: 'c8_badending_17',
    chapter: 8,
    speaker: characters.narrator,
    text: 'Al intentar forzar la entrada de rieles bancarios centralizados heredados en un protocolo puramente criptográfico y distribuido, el sistema de seguridad te rechaza por incompatibilidad de capas y fricción burocrática, dejándote vulnerable a la censura corporativa tradicional de tus redes viejas.',
    background: backgrounds.gameover,
    character: 'nico',
    expression: 'panico',
    nextId: 'c8_gameover_17',
  },
  c8_gameover_17: {
    id: 'c8_gameover_17',
    chapter: 8,
    speaker: characters.system,
    text: '❌ GAME OVER: La libertad de expresión digital requiere herramientas nativas P2P que operen de forma independiente. Reiniciá el capítulo.',
    background: backgrounds.gameover,
    character: null,
    choices: [
      {
        text: 'Reiniciar Capítulo 8',
        nextId: 'c8_start',
        effects: { soberaniaScore: -50 }
      }
    ],
  },
  c8_zaps_correct: {
    id: 'c8_zaps_correct',
    chapter: 8,
    speaker: characters.narrator,
    text: 'Añadís tu dirección de Lightning al perfil. Presionás el ícono del rayo neón en la nota del desarrollador open source y seleccionás la opción Zap 500 sats. La pantalla hace un sonido de estallido de energía estática: ¡ZAP CONFIRMADO! Los satoshis viajan de tu nodo al nodo del autor de forma instantánea sobre la red descentralizada. El Negro asiente de forma pausada, manteniendo su seriedad inmutable.',
    background: backgrounds.cryptaInterior,
    character: null,
    nextId: 'c8_dec_31',
  },
  c8_dec_31: {
    id: 'c8_dec_31',
    chapter: 8,
    speaker: characters.system,
    text: '[Decisión 8.3] Has integrado exitosamente comunicación y valor económico de forma criptográfica libre. ¿Cuál es tu postura final frente al protocolo Nostr antes de buscar la entrada a la comunidad Bitcoiner?',
    background: backgrounds.cryptaInterior,
    character: null,
    choices: [
      {
        text: 'Que Nostr y Bitcoin actúan en simbiosis perfecta como las dos capas fundamentales de la libertad digital: dinero incorruptible sin bancos y comunicación resistente a la censura sin servidores centrales.',
        nextId: 'c9_start',
        effects: { soberaniaScore: 15 }
      },
      {
        text: 'Que prefiero regresar a las redes sociales tradicionales si prometen no volver a suspender mi cuenta a cambio de mis datos personales de navegación.',
        nextId: 'c9_start',
        effects: { detour: true, soberaniaScore: 0 }
      }
    ],
  },

  // --- CAPÍTULO 9: El Umbral de La Crypta ---
  c9_start: {
    id: 'c9_start',
    chapter: 9,
    speaker: characters.narrator,
    text: 'Llegas a la pantalla terminal CLI de entrada física a los laboratorios subterráneos de La Crypta. Las líneas de código verde en cascada se unifican y renderizan el sprite definitivo del Gorila Rojo: facciones masivas y sabias, pelaje denso con destellos carmesí/rojo neón, auriculares profesionales de estudio colgados en el cuello y anteojos de sol naranjas reflejando los prompts de comandos de Linux. Detrás de él se ven racks de servidores parpadeando en azul eléctrico y la mesa de soldadura llena de microcontroladores del Oso.',
    background: backgrounds.cryptaInterior,
    character: null,
    nextId: 'c9_01',
  },
  c9_01: {
    id: 'c9_01',
    chapter: 9,
    speaker: characters.gorilla,
    text: '¡Pará la mano ahí de inmediato, ingresante! El Panter me pasó el reporte de que entendiste la termodinámica de la energía en el galpón de ASICs, y El Negro me acaba de firmar un evento en Nostr confirmando que ya sabés manejar tus llaves asimétricas sin pedirle permiso a Silicon Valley. Pero escuchame bien una cosa: La Crypta es una Comunidad Bitcoiner, un faro de soberanía real en Buenos Aires, y acá adentro desarrollamos productos de código abierto, prototipos y herramientas independientes para proteger la red. No aceptamos espectadores pasivos del precio. Para abrir el canal definitivo con nuestros laboratorios, vas a tener que pasar el examen final de teoría de juegos y auditoría interna del protocolo. No confíes, verificá. Primera pregunta.',
    background: backgrounds.cryptaInterior,
    character: 'gorilla',
    expression: 'friendly',
    nextId: 'c9_dec_32',
  },
  c9_dec_32: {
    id: 'c9_dec_32',
    chapter: 9,
    speaker: characters.system,
    text: '[Decisión 9.1 / Pregunta 1: Vectores de Ataque del 51%] Gorila Rojo: (Tipea una línea de comando y te mira fijo a través de sus anteojos) "Si un gobierno o una coalición de empresas mineras logra concentrar de forma maliciosa el 51% de toda la potencia de cómputo (Hash Rate) de la red global de minería de Bitcoin, ¿qué daño real y técnico pueden causarle al protocolo?"',
    background: backgrounds.cryptaInterior,
    character: 'gorilla',
    choices: [
      {
        text: 'Tienen la capacidad matemática de hackear las claves privadas de los usuarios, modificar los balances históricos de las billeteras frías inactivas y apoderarse de los bitcoins de Satoshi Nakamoto de forma directa.',
        nextId: 'c9_badending_18',
      },
      {
        text: 'No pueden robar fondos ajenos porque carecen de sus claves privadas, pero sí podrían reorganizar bloques recientes para intentar hacer doble gasto de sus propias monedas o censurar transacciones bloqueando temporalmente su inclusión en los nuevos bloques minados bajo su control.',
        nextId: 'c9_51_attack_correct',
        effects: { soberaniaScore: 15 }
      }
    ],
  },
  c9_badending_18: {
    id: 'c9_badending_18',
    chapter: 9,
    speaker: characters.gorilla,
    text: 'Acceso denegado. Las claves privadas son impenetrables mediante simple potencia de cómputo. Errar esto demuestra una falta grave de base criptográfica.',
    background: backgrounds.gameover,
    character: 'gorilla',
    expression: 'normal',
    nextId: 'c9_gameover_18',
  },
  c9_gameover_18: {
    id: 'c9_gameover_18',
    chapter: 9,
    speaker: characters.system,
    text: '❌ GAME OVER: El poder de hash valida y reorganiza bloques; no vulnera claves asimétricas. Reiniciá el capítulo.',
    background: backgrounds.gameover,
    character: null,
    choices: [
      {
        text: 'Reiniciar Capítulo 9',
        nextId: 'c9_start',
        effects: { soberaniaScore: -50 }
      }
    ],
  },
  c9_51_attack_correct: {
    id: 'c9_51_attack_correct',
    chapter: 9,
    speaker: characters.gorilla,
    text: 'Correcto. La criptografía protege tus llaves, el consenso protege el orden de los bloques. Segunda pregunta.',
    background: backgrounds.cryptaInterior,
    character: 'gorilla',
    expression: 'friendly',
    nextId: 'c9_dec_33',
  },
  c9_dec_33: {
    id: 'c9_dec_33',
    chapter: 9,
    speaker: characters.system,
    text: '[Decisión 9.2 / Pregunta 2: Privacidad Avanzada y Taproot] Gorila Rojo: (Ceba un mate virtual de madera pulida en la pantalla, toma un sorbo largo y te lanza la segunda prueba técnica) "Hablemos de la actualización estructural de Taproot. ¿Qué mejora técnica e inigualable introduce respecto a las transacciones de contratos multifirma complejos en la blockchain?"',
    background: backgrounds.cryptaInterior,
    character: 'gorilla',
    choices: [
      {
        text: 'Utiliza las Firmas de Schnorr para agregar y compactar las claves, logrando que un contrato multifirma complejo (como una billetera comunitaria o de canales) luzca exactamente idéntica en la blockchain pública a una transacción simple de una sola firma, reduciendo el consumo de espacio de bloque y mejorando drásticamente la privacidad de la red.',
        nextId: 'c9_taproot_correct',
        effects: { soberaniaScore: 15 }
      },
      {
        text: 'Permite que las transacciones modifiquen el intervalo de tiempo del reloj de Bitcoin, reduciendo de forma dinámica el tiempo de bloque de 10 minutos a un minuto cuando la red sufre congestión de spam.',
        nextId: 'c9_badending_19',
      }
    ],
  },
  c9_badending_19: {
    id: 'c9_badending_19',
    chapter: 9,
    speaker: characters.gorilla,
    text: 'Incorrecto. El tiempo de bloque está atado al ajuste de dificultad termodinámico y al consenso global. Modificarlo unilateralmente rompería la red.',
    background: backgrounds.gameover,
    character: 'gorilla',
    expression: 'normal',
    nextId: 'c9_gameover_19',
  },
  c9_gameover_19: {
    id: 'c9_gameover_19',
    chapter: 9,
    speaker: characters.system,
    text: '❌ GAME OVER: Taproot compacta firmas mediante Schnorr; el tiempo de bloque es inalterable. Reiniciá el capítulo.',
    background: backgrounds.gameover,
    character: null,
    choices: [
      {
        text: 'Reiniciar Capítulo 9',
        nextId: 'c9_start',
        effects: { soberaniaScore: -50 }
      }
    ],
  },
  c9_taproot_correct: {
    id: 'c9_taproot_correct',
    chapter: 9,
    speaker: characters.gorilla,
    text: 'Impecable. Taproot difumina el tipo de transacción en el ledger y optimiza datos. Última pregunta.',
    background: backgrounds.cryptaInterior,
    character: 'gorilla',
    expression: 'friendly',
    nextId: 'c9_dec_34',
  },
  c9_dec_34: {
    id: 'c9_dec_34',
    chapter: 9,
    speaker: characters.system,
    text: '[Decisión 9.3 / Pregunta 3: Incentivos Económicos de Largo Plazo] Gorila Rojo: (El teclado mecánico emite una ráfaga rápida de clics) "Última prueba de teoría de juegos, ingresante. En el año 2140, cuando la emisión programada de Bitcoin llegue a su fin debido al impacto de los Halvings y el subsidio de monedas por bloque sea exactamente igual a cero... ¿cómo se mantendrá la seguridad económica de la red para evitar que los mineros apaguen las máquinas?"',
    background: backgrounds.cryptaInterior,
    character: 'gorilla',
    choices: [
      {
        text: 'El protocolo cambiará su código de forma automática mediante un software de inteligencia artificial centralizado para emitir un token inflacionario de rescate financiero para los mineros.',
        nextId: 'c9_badending_20',
      },
      {
        text: 'La seguridad de la red se sostendrá puramente mediante un mercado competitivo de comisiones por transacción dentro de la mempool, donde los usuarios pagarán tarifas de incentivo a los mineros para asegurar que sus UTXOs soberanas sean incluidas en el siguiente bloque contable inmutable.',
        nextId: 'c10_start',
        effects: { soberaniaScore: 15 }
      }
    ],
  },
  c9_badending_20: {
    id: 'c9_badending_20',
    chapter: 9,
    speaker: characters.gorilla,
    text: 'Acceso denegado. La inflación centralizada es el mal que vinimos a destruir. Alterar el límite de 21 millones destruye el consenso y el valor de la red.',
    background: backgrounds.gameover,
    character: 'gorilla',
    expression: 'normal',
    nextId: 'c9_gameover_20',
  },
  c9_gameover_20: {
    id: 'c9_gameover_20',
    chapter: 9,
    speaker: characters.system,
    text: '❌ GAME OVER: En 2140 las comisiones de transacción sostienen la red. No hay emisión de rescate. Reiniciá.',
    background: backgrounds.gameover,
    character: null,
    choices: [
      {
        text: 'Reiniciar Capítulo 9',
        nextId: 'c9_start',
        effects: { soberaniaScore: -50 }
      }
    ],
  },

  // --- CAPÍTULO 10: La Comunidad de los Verdaderos Bitcoiners ---
  c10_start: {
    id: 'c10_start',
    chapter: 10,
    speaker: characters.narrator,
    text: 'La masiva puerta blindada se desliza por completo hacia un costado con un bufido hidráulico liberador. Entrás triunfalmente a la Taberna-Laboratorio de La Crypta, la Comunidad Bitcoiner. Es un entorno ciberpunk sumamente cálido y acogedor; las paredes están revestidas de madera rústica tallada con diagramas de bloques y circuitos electrónicos integrados que emiten un brillo dorado tenue.',
    background: backgrounds.cryptaInterior,
    character: null,
    nextId: 'c10_01',
  },
  c10_01: {
    id: 'c10_01',
    chapter: 10,
    speaker: characters.gorilla,
    text: '¡Impresionante, ingresante! Pasaste el examen de la madriguera con honores técnicos. Como te dije antes, La Crypta es una Comunidad Bitcoiner, un espacio real de constructores independientes, y te ganaste tu lugar en la mesa de control por tu propio esfuerzo intelectual y ético. Tomá el mate, que está a la temperatura justa. Ya no sos el shitcoiner asustado del Capítulo 1 que dependía de las plataformas centralizadas de otros; ahora sos un builder soberano del software libre. No confíes, verificá.',
    background: backgrounds.cryptaInterior,
    character: 'gorilla',
    expression: 'happy',
    nextId: 'c10_routing_branch',
  },
  c10_routing_branch: {
    id: 'c10_routing_branch',
    chapter: 10,
    speaker: characters.system,
    text: 'Evaluando ruta de consenso basada en tus decisiones pasadas...',
    background: backgrounds.cryptaInterior,
    character: null,
    nextId: 'c10_route_evaluator', // Programmatically routed in NovelEngine based on scores
  },
  c10_route_a: {
    id: 'c10_route_a',
    chapter: 10,
    speaker: characters.narrator,
    text: 'El Gorila Rojo te señala una terminal CLI libre junto al nodo de desarrollo del Oso. Tu impecable comprensión técnica de las UTXOs, las firmas de Taproot y la liquidez de Lightning te integra de forma directa como desarrollador de herramientas open-source de la comunidad para la red distribuida. El Oso te hereda su herramienta de soldadura y el Pirata te aprueba tu primer Commit en vivo en la pantalla de Vercel.',
    background: backgrounds.cryptaInterior,
    character: null,
    nextId: 'c10_victory_final',
  },
  c10_route_b: {
    id: 'c10_route_b',
    chapter: 10,
    speaker: characters.narrator,
    text: 'El Capitán Pirata te hace un espacio en la mesa central compartiéndote una cerveza artesanal bien helada. Tu excelente asimilación de la privacidad, el enrutamiento P2P y el protocolo Nostr te convierte en el educador técnico y activista de la comunidad encargado de levantar nuevos relés y expandir los nodos independientes hacia las fronteras del mapa.',
    background: backgrounds.cryptaInterior,
    character: null,
    nextId: 'c10_victory_final',
  },
  c10_route_c: {
    id: 'c10_route_c',
    chapter: 10,
    speaker: characters.narrator,
    text: 'El Gorila Rojo te ceba el mate de madera con paciencia y te da la bienvenida formal con un fuerte apretón de manos: "Te golpeaste duro al principio con las memecoins, el apalancamiento ludópata y los exchanges centralizados de custodia ajena... pero tuviste el coraje intelectual de parar, estudiar el Whitepaper y auditar el protocolo por tu cuenta con humildad. En La Crypta, la Comunidad Bitcoiner, nadie te va a juzgar por los errores del pasado en el casino cripto; viniste a aprender y a construir de forma honesta, y acá es donde tu verdadero viaje soberano empieza".',
    background: backgrounds.cryptaInterior,
    character: null,
    nextId: 'c10_victory_final',
  },
  c10_victory_final: {
    id: 'c10_victory_final',
    chapter: 10,
    speaker: characters.narrator,
    text: 'Te sentás en tu nuevo puesto de trabajo de la comunidad junto al Pirata, el Oso y el Gorila Rojo, abriendo tu entorno de programación listo para colaborar en la red global. Por primera vez en meses, ya no sentís la ansiedad de mirar precios. Sos dueñ{o/a} de tu destino.',
    background: backgrounds.victory,
    character: null,
    nextId: 'game_finished_badge_trigger',
  },
};
