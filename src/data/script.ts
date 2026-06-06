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
  protagonist: '{playerName}',
  shitcoinBro: 'Shitcoin Bro',
  satoshi: 'Satoshi Nakamoto',
  barista: 'Valeria (Barista)',
  gorilla: 'Gorila Rojo',
  captain: 'Capitan del Escabio',
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
    text: 'Son las 3:15 AM. Tus ojos están inyectados en sangre pero no podés pestañear. En la pantalla, $ELONPEPE, una memecoin que compraste hace dos horas, está subiendo un 400%. Estás apalancad{o/a} x50.',
    background: backgrounds.exchange,
    character: null,
    nextId: 'c1_01',
  },
  c1_01: {
    id: 'c1_01',
    chapter: 1,
    speaker: characters.protagonist,
    text: '¡Es ahora o nunca! Si meto el resto de mis ahorros acá, en dos días me compro un descapotable. El análisis técnico no miente, mirá esa vela verde gigante...',
    background: backgrounds.exchange,
    character: 'nico',
    expression: 'happy',
    nextId: 'c1_02',
  },
  c1_02: {
    id: 'c1_02',
    chapter: 1,
    speaker: characters.shitcoinBro,
    text: '¡Es tu momento, bro! Telegram destila euforia pura. ¡A la luna! ¡Todo el mundo va a renunciar a sus trabajos mañana! ¡Compra más o quédate pobre!',
    background: backgrounds.exchange,
    character: 'shitcoin_bro',
    expression: 'normal',
    nextId: 'c1_dec_1',
  },
  c1_dec_1: {
    id: 'c1_dec_1',
    chapter: 1,
    speaker: characters.system,
    text: '[Decisión 1] ¿Qué hacés con tu posición actual de $ELONPEPE?',
    background: backgrounds.exchange,
    character: null,
    choices: [
      {
        text: 'Asegurar ganancias. Cerrar el 50% de la posición y retirar la inversión inicial.',
        nextId: 'c1_escena_1_2_safe',
        effects: { sats: 20000, maxiScore: 5 },
      },
      {
        text: '¡Todo al rojo! Subir el apalancamiento a x100 e inyectar los últimos USDT para el alquiler.',
        nextId: 'c1_escena_1_2_risky',
        effects: { sats: -40000, shitcoinFomo: 10 },
      },
    ],
  },

  // Escena 1.2
  c1_escena_1_2_safe: {
    id: 'c1_escena_1_2_safe',
    chapter: 1,
    speaker: characters.narrator,
    text: 'Aseguras parte del capital, pero el precio empieza a titubear. La gran vela verde se frena en seco y absorbe la mitad de la última subida.',
    background: backgrounds.exchange,
    character: null,
    nextId: 'c1_escena_1_2_common',
  },
  c1_escena_1_2_risky: {
    id: 'c1_escena_1_2_risky',
    chapter: 1,
    speaker: characters.narrator,
    text: '¡Aumentas el riesgo al límite! Justo en ese instante, el precio titubea. La vela verde se frena en seco y un violento mechazo rojo absorbe la subida. Estás al borde de la liquidación.',
    background: backgrounds.exchange,
    character: null,
    nextId: 'c1_escena_1_2_common',
  },
  c1_escena_1_2_common: {
    id: 'c1_escena_1_2_common',
    chapter: 1,
    speaker: characters.shitcoinBro,
    text: '¡No se asusten, es solo una corrección saludable antes del próximo impulso! ¡Compren la caída! ¡Buy the dip, muchachos!',
    background: backgrounds.exchange,
    character: 'shitcoin_bro',
    expression: 'normal',
    nextId: 'c1_03_common',
  },
  c1_03_common: {
    id: 'c1_03_common',
    chapter: 1,
    speaker: characters.protagonist,
    text: 'Uf, se movió feo. Mi precio de liquidación quedó peligrosamente cerca si arriesgué de más...',
    background: backgrounds.exchange,
    character: 'nico',
    expression: 'concentrado',
    nextId: 'c1_dec_2',
  },
  c1_dec_2: {
    id: 'c1_dec_2',
    chapter: 1,
    speaker: characters.system,
    text: '[Decisión 2] El mercado muestra volatilidad extrema. ¿Cómo reaccionás?',
    background: backgrounds.exchange,
    character: null,
    choices: [
      {
        text: 'Ignorar el pánico, cerrar Telegram y confiar en un bot de trading que recomendó un desconocido.',
        nextId: 'c1_escena_1_3_panic',
        effects: { shitcoinFomo: 5 },
      },
      {
        text: 'Poner un Stop-Loss estricto para proteger lo que queda, aunque signifique asumir una pequeña pérdida.',
        nextId: 'c1_escena_1_3_stoploss',
        effects: { maxiScore: 10 },
      },
    ],
  },

  // Escena 1.3: El Rugpull
  c1_escena_1_3_panic: {
    id: 'c1_escena_1_3_panic',
    chapter: 1,
    speaker: characters.narrator,
    text: 'Decides no mirar. De repente, el monitor principal se congela por un segundo. La vela verde se transforma en una línea vertical roja que atraviesa el piso del gráfico.',
    background: backgrounds.exchange,
    character: null,
    nextId: 'c1_rugpull_action',
  },
  c1_escena_1_3_stoploss: {
    id: 'c1_escena_1_3_stoploss',
    chapter: 1,
    speaker: characters.narrator,
    text: 'Tu Stop-Loss se activa salvando un remanente mínimo, pero la caída es tan rápida que el deslizamiento es brutal. El monitor parpadea mientras la vela verde se desploma a cero.',
    background: backgrounds.exchange,
    character: null,
    nextId: 'c1_rugpull_action',
  },
  c1_rugpull_action: {
    id: 'c1_rugpull_action',
    chapter: 1,
    speaker: characters.narrator,
    text: 'El precio cae un 99.9% en tres segundos. La liquidez desapareció. Intentás vender, pero la interfaz del exchange tira: "Error: Price slippage too high". El Telegram ha sido eliminado.',
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
  c1_liquidation: {
    id: 'c1_liquidation',
    chapter: 1,
    speaker: characters.protagonist,
    text: 'No... no puede ser. Todo... se evaporó. ¡Los desarrolladores vendieron todo el pozo de liquidez! Me hicieron un rugpull en la cara...',
    background: backgrounds.exchange,
    character: 'nico',
    expression: 'panico',
    nextId: 'c1_dec_3',
  },
  c1_dec_3: {
    id: 'c1_dec_3',
    chapter: 1,
    speaker: characters.system,
    text: '[Decisión 3] Estás en la ruina absoluta. El orgullo y la desesperación te carcomen. ¿Cuál es tu siguiente movimiento?',
    background: backgrounds.exchange,
    character: null,
    choices: [
      {
        text: 'Buscar revancha inmediata. Invertir lo último de la tarjeta en una preventa llamada $SAFEGALAXY.',
        nextId: 'c1_badending_1a',
      },
      {
        text: 'Sentarte en el piso, respirar hondo, aceptar que perdiste y abrir un mail con un PDF titulado "bitcoin.pdf".',
        nextId: 'c1_escena_1_4',
        effects: { maxiScore: 20 },
      },
    ],
  },

  // BAD ENDING 1.A
  c1_badending_1a: {
    id: 'c1_badending_1a',
    chapter: 1,
    speaker: characters.narrator,
    text: 'Depositás lo último que te quedaba en la tarjeta en $SAFEGALAXY. Dos horas después descubrís que el contrato inteligente tenía una línea maliciosa (Honeypot) que te impide retirar fondos para siempre.',
    background: backgrounds.gameover,
    character: 'nico',
    expression: 'panico',
    nextId: 'c1_gameover_1a_screen',
  },
  c1_gameover_1a_screen: {
    id: 'c1_gameover_1a_screen',
    chapter: 1,
    speaker: characters.system,
    text: '❌ BAD ENDING 1.A: El casino cripto siempre gana si buscás dinero fácil. Reiniciá el capítulo y aprendé a no perseguir espejismos.',
    background: backgrounds.gameover,
    character: null,
    choices: [
      {
        text: 'Reiniciar Capítulo 1',
        nextId: 'c1_start',
        effects: { sats: 50000, maxiScore: -100 },
      }
    ],
  },

  // Escena 1.4: Epifanía
  c1_escena_1_4: {
    id: 'c1_escena_1_4',
    chapter: 1,
    speaker: characters.narrator,
    text: 'Con los ojos cansados y el corazón latiendo despacio, abrís el archivo. Las primeras palabras dicen: "Bitcoin: A Peer-to-Peer Electronic Cash System". No hay fotos de perritos, solo criptografía y matemáticas.',
    background: backgrounds.exchange,
    character: null,
    nextId: 'c1_escena_1_4_read',
  },
  c1_escena_1_4_read: {
    id: 'c1_escena_1_4_read',
    chapter: 1,
    speaker: characters.protagonist,
    text: 'Esto es... diferente. Es una propuesta para eliminar a los intermediarios de confianza de raíz. Interesante.',
    background: backgrounds.exchange,
    character: 'nico',
    expression: 'concentrado',
    nextId: 'c1_dec_4',
  },
  c1_dec_4: {
    id: 'c1_dec_4',
    chapter: 1,
    speaker: characters.system,
    text: '[Decisión 4] Empezás a leer las primeras secciones del documento de Satoshi Nakamoto. ¿Qué investigas primero?',
    background: backgrounds.exchange,
    character: null,
    choices: [
      {
        text: 'El problema del doble gasto y cómo se resuelve de forma descentralizada sin un banco.',
        nextId: 'c2_start',
        effects: { maxiScore: 15 },
      },
      {
        text: 'Saltear la teoría e intentar buscar el código en GitHub para minarlo en tu notebook vieja rápido.',
        nextId: 'c1_badending_1b',
      },
    ],
  },

  // BAD ENDING 1.B
  c1_badending_1b: {
    id: 'c1_badending_1b',
    chapter: 1,
    speaker: characters.narrator,
    text: 'Intentás correr un nodo de minería en tu vieja laptop sin entender la dificultad de la red. La computadora se recalienta, el cooler hace ruido de turbina y la placa madre se quema por completo.',
    background: backgrounds.gameover,
    character: 'nico',
    expression: 'panico',
    nextId: 'c1_gameover_1b_screen',
  },
  c1_gameover_1b_screen: {
    id: 'c1_gameover_1b_screen',
    chapter: 1,
    speaker: characters.system,
    text: '❌ BAD ENDING 1.B: Bitcoin no es un esquema para hacerte rico de la noche a la mañana. Requiere entendimiento técnico. Reiniciá el capítulo.',
    background: backgrounds.gameover,
    character: null,
    choices: [
      {
        text: 'Reiniciar Capítulo 1',
        nextId: 'c1_start',
        effects: { sats: 50000, maxiScore: -100 },
      }
    ],
  },

  // --- CAPÍTULO 2: La Madriguera del Conejo ---
  c2_start: {
    id: 'c2_start',
    chapter: 2,
    speaker: characters.narrator,
    text: '{playerName} despierta en un entorno de ensueño surrealista. Flota en una biblioteca infinita donde los libros son bloques de piedra interconectados por cadenas de luz dorada. Al fondo, una silueta humana difuminada observa.',
    background: backgrounds.dream,
    character: null,
    nextId: 'c2_satoshi_01',
  },
  c2_satoshi_01: {
    id: 'c2_satoshi_01',
    chapter: 2,
    speaker: characters.satoshi,
    text: 'Bienvenid{o/a}, {playerName}. Has gastado mucha energía persiguiendo sombras en el mercado. Pero la verdadera revolución no es el precio; es la arquitectura de la confianza.',
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
    text: 'Yo... solo quería libertad financiera. Pero lo perdí todo. ¿Por qué Bitcoin es diferente de todas esas shitcoins en el exchange?',
    background: backgrounds.dream,
    character: 'nico',
    expression: 'concentrado',
    nextId: 'c2_satoshi_02',
  },
  c2_satoshi_02: {
    id: 'c2_satoshi_02',
    chapter: 2,
    speaker: characters.satoshi,
    text: 'Te pondré a prueba. Respóndeme con honestidad.',
    background: backgrounds.dream,
    character: 'satoshi',
    expression: 'misterioso',
    isSatoshiNode: true,
    nextId: 'c2_dec_5',
  },
  c2_dec_5: {
    id: 'c2_dec_5',
    chapter: 2,
    speaker: characters.system,
    text: '[Decisión 5] Satoshi pregunta: ¿Cuál es el verdadero enemigo que Bitcoin vino a combatir?',
    background: backgrounds.dream,
    character: null,
    choices: [
      {
        text: 'La falta de tecnologías rápidas y blockchains con transacciones por segundo infinitas.',
        nextId: 'c2_badending_2a',
      },
      {
        text: 'La necesidad de confiar en intermediarios que expanden la masa monetaria y confiscan el valor del trabajo mediante la inflación.',
        nextId: 'c2_pow_scene',
        effects: { maxiScore: 20 },
      },
    ],
  },

  // BAD ENDING 2.A
  c2_badending_2a: {
    id: 'c2_badending_2a',
    chapter: 2,
    speaker: characters.satoshi,
    text: 'No has entendido nada. Si sacrificás la descentralización por la velocidad, terminás construyendo un banco más eficiente, pero igual de propenso a la censura.',
    background: backgrounds.dream,
    character: 'satoshi',
    expression: 'misterioso',
    isSatoshiNode: true,
    nextId: 'c2_gameover_2a_screen',
  },
  c2_gameover_2a_screen: {
    id: 'c2_gameover_2a_screen',
    chapter: 2,
    speaker: characters.system,
    text: '❌ BAD ENDING 2.A: La velocidad sin descentralización es solo una base de datos corporativa. Volvé a intentar.',
    background: backgrounds.gameover,
    character: null,
    choices: [
      {
        text: 'Reiniciar Capítulo 2',
        nextId: 'c2_start',
        effects: { maxiScore: -50 },
      }
    ],
  },

  // Escena 2.2: Proof of Work
  c2_pow_scene: {
    id: 'c2_pow_scene',
    chapter: 2,
    speaker: characters.narrator,
    text: 'Los bloques de piedra empiezan a brillar. Satoshi extiende su mano y un cubo de datos empieza a girar, requiriendo un esfuerzo computacional inmenso para mantenerse estable.',
    background: backgrounds.dream,
    character: null,
    nextId: 'c2_pow_satoshi',
  },
  c2_pow_satoshi: {
    id: 'c2_pow_satoshi',
    chapter: 2,
    speaker: characters.satoshi,
    text: 'En el mundo digital inventé el "Proof of Work". Para escribir un bloque en la historia se debe consumir energía real. Une las leyes de la física con el software. ¿Qué pasa si alguien quiere alterar un bloque antiguo?',
    background: backgrounds.dream,
    character: 'satoshi',
    expression: 'misterioso',
    isSatoshiNode: true,
    nextId: 'c2_dec_6',
  },
  c2_dec_6: {
    id: 'c2_dec_6',
    chapter: 2,
    speaker: characters.system,
    text: '[Decisión 6] ¿Cómo responde el protocolo ante un intento de modificar un registro histórico?',
    background: backgrounds.dream,
    character: null,
    choices: [
      {
        text: 'El atacante tendría que rehacer el trabajo de ese bloque y todos los siguientes, compitiendo contra toda la red honesta.',
        nextId: 'c2_keys_scene',
        effects: { maxiScore: 20 },
      },
      {
        text: 'La red detecta el fraude automáticamente mediante un sistema de votación por identidad de los usuarios registrados.',
        nextId: 'c2_badending_2b',
      },
    ],
  },

  // BAD ENDING 2.B
  c2_badending_2b: {
    id: 'c2_badending_2b',
    chapter: 2,
    speaker: characters.satoshi,
    text: 'En internet las identidades son baratas. Si dependiéramos de votación por cuentas, un atacante crearía millones de usuarios falsos (Ataque Sybil) y controlaría la red.',
    background: backgrounds.dream,
    character: 'satoshi',
    expression: 'misterioso',
    isSatoshiNode: true,
    nextId: 'c2_gameover_2b_screen',
  },
  c2_gameover_2b_screen: {
    id: 'c2_gameover_2b_screen',
    chapter: 2,
    speaker: characters.system,
    text: '❌ BAD ENDING 2.B: Un chip, un voto. El poder de cómputo real protege la red, no los perfiles virtuales. Reiniciá el capítulo.',
    background: backgrounds.gameover,
    character: null,
    choices: [
      {
        text: 'Reiniciar Capítulo 2',
        nextId: 'c2_start',
        effects: { maxiScore: -50 },
      }
    ],
  },

  // Escena 2.3: Llaves
  c2_keys_scene: {
    id: 'c2_keys_scene',
    chapter: 2,
    speaker: characters.narrator,
    text: 'La silueta de Satoshi comienza a desvanecerse. Te extiende una caja de hierro fundido con un cerrojo intrincado y una llave de cristal brillante.',
    background: backgrounds.dream,
    character: null,
    nextId: 'c2_keys_satoshi',
  },
  c2_keys_satoshi: {
    id: 'c2_keys_satoshi',
    chapter: 2,
    speaker: characters.satoshi,
    text: 'Este es tu nodo. Esta es tu soberanía. Pero recuerda: la libertad total conlleva una responsabilidad absoluta. Si dejas tus fondos en un exchange, el dinero no es tuyo. ¿Dónde guardarás tus llaves?',
    background: backgrounds.dream,
    character: 'satoshi',
    expression: 'misterioso',
    isSatoshiNode: true,
    nextId: 'c2_dec_7',
  },
  c2_dec_7: {
    id: 'c2_dec_7',
    chapter: 2,
    speaker: characters.system,
    text: '[Decisión 7] Recibís tus primeros Satoshis. ¿Cómo decidís custodiarlos?',
    background: backgrounds.dream,
    character: null,
    choices: [
      {
        text: 'Anotar la frase semilla de 12 palabras en un papel, guardarla físicamente y configurar una wallet no-custodia.',
        nextId: 'c3_start',
        effects: { maxiScore: 25, sats: 10000 },
      },
      {
        text: 'Sacarle una foto a las 12 palabras con el celular y guardarla en Google Drive o enviártela por WhatsApp.',
        nextId: 'c2_badending_2c',
      },
    ],
  },

  // BAD ENDING 2.C
  c2_badending_2c: {
    id: 'c2_badending_2c',
    chapter: 2,
    speaker: characters.narrator,
    text: 'Tres semanas después, un troyano básico accede a tu almacenamiento en la nube. Un bot automatizado escanea la foto de tus 12 palabras y vacía tu billetera en segundos.',
    background: backgrounds.gameover,
    character: 'nico',
    expression: 'panico',
    nextId: 'c2_gameover_2c_screen',
  },
  c2_gameover_2c_screen: {
    id: 'c2_gameover_2c_screen',
    chapter: 2,
    speaker: characters.system,
    text: '❌ BAD ENDING 2.C: El almacenamiento digital de claves privadas es un regalo para los hackers. Not your keys, not your coins. Reiniciá.',
    background: backgrounds.gameover,
    character: null,
    choices: [
      {
        text: 'Reiniciar Capítulo 2',
        nextId: 'c2_start',
        effects: { maxiScore: -50 },
      }
    ],
  },

  // --- CAPÍTULO 3: La Chispa de Lightning ---
  c3_start: {
    id: 'c3_start',
    chapter: 3,
    speaker: characters.narrator,
    text: 'Una tarde soleada. {playerName} camina por la calle. Se detiene frente a una cafetería con un cartel de neón: "Btc Accepted Here".',
    background: backgrounds.cafe,
    character: null,
    nextId: 'c3_01',
  },
  c3_01: {
    id: 'c3_01',
    chapter: 3,
    speaker: characters.barista,
    text: '¡Buenas! Serían un café de especialidad y un tostado. En total son 4,500 sats. ¿Pagás con Lightning o con la red principal (On-Chain)?',
    background: backgrounds.cafe,
    character: 'barista',
    expression: 'normal',
    nextId: 'c3_02',
  },
  c3_02: {
    id: 'c3_02',
    chapter: 3,
    speaker: characters.protagonist,
    text: 'Eh... uso mi billetera principal. Dejame enviar la transacción desde la Capa 1.',
    background: backgrounds.cafe,
    character: 'nico',
    expression: 'normal',
    nextId: 'c3_03',
  },
  c3_03: {
    id: 'c3_03',
    chapter: 3,
    speaker: characters.narrator,
    text: 'Abrís tu billetera. La comisión de red actual es de 15,000 sats por congestión de la Mempool. Pagarías 3 veces más de lo que sale el café, y tardaría 10 minutos en confirmar.',
    background: backgrounds.cafe,
    character: null,
    nextId: 'c3_04',
  },
  c3_04: {
    id: 'c3_04',
    chapter: 3,
    speaker: characters.barista,
    text: 'Tranquilo, no vas a pagar eso por un café. Para eso usamos la Capa 2. Dejame que te explique cómo funciona Lightning Network.',
    background: backgrounds.cafe,
    character: 'barista',
    expression: 'happy',
    nextId: 'c3_dec_8',
  },
  c3_dec_8: {
    id: 'c3_dec_8',
    chapter: 3,
    speaker: characters.system,
    text: '[Decisión 8] El barista te explica los canales de pago. ¿Cómo definirías Lightning de forma simple?',
    background: backgrounds.cafe,
    character: null,
    choices: [
      {
        text: 'Una red de canales abiertos fuera de la cadena principal que realiza pagos instantáneos casi gratuitos y registra solo el balance final al cerrarse.',
        nextId: 'c3_wallet_sim_intro',
        effects: { maxiScore: 20 },
      },
      {
        text: 'Una nueva blockchain separada que emite un token rápido para cambiarlo por Bitcoin en un exchange interno.',
        nextId: 'c3_badending_3a',
      },
    ],
  },

  // BAD ENDING 3.A
  c3_badending_3a: {
    id: 'c3_badending_3a',
    chapter: 3,
    speaker: characters.barista,
    text: 'No, no creamos tokens nuevos ni usamos otra blockchain. Eso destruiría la seguridad de Bitcoin.',
    background: backgrounds.cafe,
    character: 'barista',
    expression: 'normal',
    nextId: 'c3_gameover_3a_screen',
  },
  c3_gameover_3a_screen: {
    id: 'c3_gameover_3a_screen',
    chapter: 3,
    speaker: characters.system,
    text: '❌ BAD ENDING 3.A: Lightning es Bitcoin real viajando a la velocidad de la luz sobre canales inteligentes. Volvé a repasar el concepto.',
    background: backgrounds.gameover,
    character: null,
    choices: [
      {
        text: 'Reiniciar Capítulo 3',
        nextId: 'c3_start',
        effects: { maxiScore: -50 },
      }
    ],
  },

  // Escena 3.2: Wallet
  c3_wallet_sim_intro: {
    id: 'c3_wallet_sim_intro',
    chapter: 3,
    speaker: characters.narrator,
    text: 'Valeria te muestra un código QR dinámico en una tablet. Tu interfaz cambia a la pantalla de una billetera móvil simulada.',
    background: backgrounds.cafe,
    character: null,
    nextId: 'c3_dec_9',
  },
  c3_dec_9: {
    id: 'c3_dec_9',
    chapter: 3,
    speaker: characters.system,
    text: '[Decisión 9] Tenés la factura cargada en la billetera. ¿Qué paso debés verificar antes de confirmar?',
    background: backgrounds.cafe,
    character: null,
    choices: [
      {
        text: 'Verificar que el monto en sats coincida con el precio del café y que empiece con "lnbc" (factura Lightning), luego confirmar.',
        nextId: 'c3_wallet_sim',
        effects: { maxiScore: 10 },
      },
      {
        text: 'Copiar el texto de la factura y pegarlo en una dirección de Capa 1 de un Exchange centralizado para ver si te hacen descuento.',
        nextId: 'c3_badending_3b',
      },
    ],
  },

  // BAD ENDING 3.B
  c3_badending_3b: {
    id: 'c3_badending_3b',
    chapter: 3,
    speaker: characters.narrator,
    text: 'Intentás procesar una factura de Lightning en una red legacy de liquidación pesada. La interfaz tira error crítico e incompatible de protocolos.',
    background: backgrounds.gameover,
    character: 'nico',
    expression: 'panico',
    nextId: 'c3_gameover_3b_screen',
  },
  c3_gameover_3b_screen: {
    id: 'c3_gameover_3b_screen',
    chapter: 3,
    speaker: characters.system,
    text: '❌ BAD ENDING 3.B: No mezcles Capa 1 pura con facturas Lightning fuera de canales activos. Reiniciá el pago.',
    background: backgrounds.gameover,
    character: null,
    choices: [
      {
        text: 'Reiniciar Capítulo 3',
        nextId: 'c3_start',
        effects: { maxiScore: -50 },
      }
    ],
  },

  // Simulación
  c3_wallet_sim: {
    id: 'c3_wallet_sim',
    chapter: 3,
    speaker: characters.system,
    text: 'Simulando transacción Lightning... Confirma el pago de 4,500 sats.',
    background: backgrounds.cafe,
    character: null,
    minigame: 'wallet',
  },
  c3_wallet_success: {
    id: 'c3_wallet_success',
    chapter: 3,
    speaker: characters.barista,
    text: '¡Listo! Pago de 4,500 sats recibido en menos de un segundo con 1 sat de comisión. Aquí tienes tu café caliente.',
    background: backgrounds.cafe,
    character: 'barista',
    expression: 'happy',
    nextId: 'c3_05',
  },
  c3_05: {
    id: 'c3_05',
    chapter: 3,
    speaker: characters.protagonist,
    text: '¡Es increíble! Esto realmente es dinero en efectivo electrónico global. Es instantáneo.',
    background: backgrounds.cafe,
    character: 'nico',
    expression: 'happy',
    nextId: 'c3_06',
  },
  c3_06: {
    id: 'c3_06',
    chapter: 3,
    speaker: characters.barista,
    text: 'Ya estás list{o/a}. Si querés conocer a los verdaderos bitcoiners, busca una casa al norte de la ciudad. Allí encontrarás la entrada a La Crypta.',
    background: backgrounds.cafe,
    character: 'barista',
    expression: 'normal',
    nextId: 'c3_dec_10',
  },
  c3_dec_10: {
    id: 'c3_dec_10',
    chapter: 3,
    speaker: characters.system,
    text: '[Decisión 10] Te preparás para el viaje hacia La Crypta. ¿Qué llevás con vos?',
    background: backgrounds.cafe,
    character: null,
    choices: [
      {
        text: 'Tus llaves privadas bien protegidas y una mente abierta lista para aprender de la comunidad.',
        nextId: 'c4_start',
        effects: { maxiScore: 25 },
      },
      {
        text: 'Un fajo de billetes de la moneda local devaluada para intentar impresionar a los Bitcoiners invitándoles una ronda.',
        nextId: 'c3_badending_3c',
      },
    ],
  },

  // BAD ENDING 3.C
  c3_badending_3c: {
    id: 'c3_badending_3c',
    chapter: 3,
    speaker: characters.narrator,
    text: 'Llegas a la zona pero intentás ostentar con papel devaluado. Los guardias te miran con lástima y te mandan de vuelta al banco más cercano.',
    background: backgrounds.gameover,
    character: 'nico',
    expression: 'panico',
    nextId: 'c3_gameover_3c_screen',
  },
  c3_gameover_3c_screen: {
    id: 'c3_gameover_3c_screen',
    chapter: 3,
    speaker: characters.system,
    text: '❌ BAD ENDING 3.C: En los círculos soberanos, el papel fiat no tiene poder. Regresá con valor real.',
    background: backgrounds.gameover,
    character: null,
    choices: [
      {
        text: 'Reiniciar Capítulo 3',
        nextId: 'c3_start',
        effects: { maxiScore: -50 },
      }
    ],
  },

  // --- CAPÍTULO 4: La Puerta de La Crypta ---
  c4_start: {
    id: 'c4_start',
    chapter: 4,
    speaker: characters.narrator,
    text: 'Luego de mucho buscar, frente a vos hay una pesada puerta de madera con remaches negros y un capitan pirata te detiene.',
    background: backgrounds.cryptaDoor,
    character: null,
    nextId: 'c4_01',
  },
  c4_01: {
    id: 'c4_01',
    chapter: 4,
    speaker: characters.system,
    text: 'Capitan del Escabio: "Deténte, viajer{o/a}. Has aprendido las leyes de Satoshi. Demuestra que controlas tu soberanía. Resuelve el acertijo y dime que buscas."',
    background: backgrounds.cryptaDoor,
    character: 'pirate',
    expression: 'normal',
    nextId: 'c4_dec_11',
  },
  c4_dec_11: {
    id: 'c4_dec_11',
    chapter: 4,
    speaker: characters.system,
    text: '[Decisión 11] El panel muestra el desafío: "Para demostrar propiedad sin revelar tu secreto, ¿con qué debes firmar este mensaje digital generado por la puerta?"',
    background: backgrounds.cryptaDoor,
    character: null,
    choices: [
      {
        text: 'Con mi Clave Pública (Public Key), ya que es la que todos conocen.',
        nextId: 'c4_badending_4a',
      },
      {
        text: 'Con mi Clave Privada (Private Key) de forma matemática interna para generar la firma válida, sin exponer la clave.',
        nextId: 'c4_open',
        effects: { maxiScore: 20 },
      },
    ],
  },

  // BAD ENDING 4.A
  c4_badending_4a: {
    id: 'c4_badending_4a',
    chapter: 4,
    speaker: characters.system,
    text: 'Error: La clave pública verifica, pero no genera la prueba de autoría por sí misma. Acceso denegado. Bloqueo de 24 horas.',
    background: backgrounds.cryptaDoor,
    character: 'pirate',
    expression: 'normal',
    nextId: 'c4_gameover_4a_screen',
  },
  c4_gameover_4a_screen: {
    id: 'c4_gameover_4a_screen',
    chapter: 4,
    speaker: characters.system,
    text: '❌ BAD ENDING 4.A: La clave pública es tu dirección; la clave privada es tu firma. Repasá la criptografía asimétrica y reintenta.',
    background: backgrounds.gameover,
    character: null,
    choices: [
      {
        text: 'Reiniciar Capítulo 4',
        nextId: 'c4_start',
        effects: { maxiScore: -50 },
      }
    ],
  },

  // Escena 4.2
  c4_open: {
    id: 'c4_open',
    chapter: 4,
    speaker: characters.narrator,
    text: 'El capitan te mira con una leve sonrrisa y un gesto satisfactorio.',
    background: backgrounds.cryptaDoor,
    character: 'pirate',
    expression: 'happy',
    nextId: 'c4_dec_12',
  },
  c4_dec_12: {
    id: 'c4_dec_12',
    chapter: 4,
    speaker: characters.system,
    text: '[Decisión 12] El capitan pregunta. ¿Que buscas?',
    background: backgrounds.cryptaDoor,
    character: 'pirate',
    choices: [
      {
        text: 'Conocimiento, con humildad, buscando un lugar en la barra para escuchar a los verdaderos bitcoiners.',
        nextId: 'c4_victory',
        effects: { maxiScore: 30 },
      },
      {
        text: 'Entrando a los gritos, contando cómo perdiste todo en memecoins para ver si alguien te regala satoshis por lástima.',
        nextId: 'c4_badending_4b',
      },
    ],
  },

  // BAD ENDING 4.B
  c4_badending_4b: {
    id: 'c4_badending_4b',
    chapter: 4,
    speaker: characters.narrator,
    text: 'Tu actitud disruptiva interrumpe la taberna. Un enorme guardia te toma del hombro con firmeza y te deposita en el callejón bajo la lluvia. "Acá venimos a construir, no a buscar caridad".',
    background: backgrounds.gameover,
    character: 'nico',
    expression: 'panico',
    nextId: 'c4_gameover_4b_screen',
  },
  c4_gameover_4b_screen: {
    id: 'c4_gameover_4b_screen',
    chapter: 4,
    speaker: characters.system,
    text: '❌ BAD ENDING 4.B: La Crypta premia el esfuerzo y la educación, no los lamentos del trading ludópata. Reiniciá el capítulo.',
    background: backgrounds.gameover,
    character: null,
    choices: [
      {
        text: 'Reiniciar Capítulo 4',
        nextId: 'c4_start',
        effects: { maxiScore: -50 },
      }
    ],
  },

  // Victoria
  c4_victory: {
    id: 'c4_victory',
    chapter: 4,
    speaker: characters.narrator,
    text: 'Caminás hacia el interior. Es una comunidad acogedora con todo tipo de personas dispuestos a ayudarte. El Gorila te mira sonrriente.',
    background: backgrounds.cryptaInterior,
    character: null,
    nextId: 'c4_victory_gorilla',
  },
  c4_victory_gorilla: {
    id: 'c4_victory_gorilla',
    chapter: 4,
    speaker: characters.gorilla,
    text: '¡Mirá quién decidió dejar los exchanges centralizados y terminar el viaje! Te estábamos esperando. El capitan me avisó que completaste las 3 cosas que puedo dar y que quiero de la comunidad en el Discord.',
    background: backgrounds.cryptaInterior,
    character: 'gorilla',
    expression: 'friendly',
    nextId: 'c4_victory_gorilla_offer',
  },
  c4_victory_gorilla_offer: {
    id: 'c4_victory_gorilla_offer',
    chapter: 4,
    speaker: characters.gorilla,
    text: 'Exactamente. Tomá, te preparé un mate con el agua a la temperatura justa, bien curado en madera, o si preferís, una cerveza bien helada. Ya está pagado. Sentate con los chicos, que acá es donde el verdadero trabajo empieza.',
    background: backgrounds.cryptaInterior,
    character: 'gorilla',
    expression: 'happy',
    nextId: 'c4_victory_final',
  },
  c4_victory_final: {
    id: 'c4_victory_final',
    chapter: 4,
    speaker: characters.narrator,
    text: 'Te sentás en la mesa junto al Pirata y el Osillo. Sacás tu dispositivo, list{o/a} para empezar a colaborar. Por primera vez en meses, ya no sentís la ansiedad de mirar precios. Sos dueñ{o/a} de tu destino.',
    background: backgrounds.victory,
    character: null,
    nextId: 'c4_victory_goodending_screen',
  },
  c4_victory_goodending_screen: {
    id: 'c4_victory_goodending_screen',
    chapter: 4,
    speaker: characters.system,
    text: '🏆 GOOD ENDING: Felicidades. Has completado "Camino a La Crypta". Has escapado del sistema fiat y de las estafas cripto. Ahora eres un Bitcoiner soberano. La revolución silenciosa continúa contigo.',
    background: backgrounds.victory,
    character: null,
    nextId: 'game_finished_reset',
  },
};
