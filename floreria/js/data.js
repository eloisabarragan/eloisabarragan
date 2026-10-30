/* FlorLatte — catálogo y configuración de la tienda.
   Los productos, precios, stock y fotos se manejan desde la planilla de Google (hoja "Productos").
   Este archivo tiene el catálogo de respaldo, las ilustraciones y las reglas de precios (tamaños,
   extras, envíos y cupones). Lo usan tanto la web como el servidor, así los precios siempre coinciden. */
(function (root) {
const DATA = {
  config: {
    storeName: 'FlorLatte',
    fullName: 'FlorLatte Plantas y Flores',
    tagline: 'Donde laten las flores',
    currency: 'UYU',
    locale: 'es-UY',
    freeShippingFrom: 3500,
    shipping: { standard: 290, express: 490, pickup: 0 },
    sameDayCutoffHour: 16,          // pedidos antes de esta hora se entregan hoy
    whatsapp: '',                   // número con código de país, ej. '+598 99 123 456' (vacío = se oculta el botón)
    email: '',                      // opcional
    instagram: 'florlatte.uy',
    address: 'Av. Instrucciones del Año XVII 472, Las Piedras',
    city: 'Las Piedras, Canelones, Uruguay',
    hours: '',                      // ej. 'Lun a sáb 9:00–19:00' (vacío = no se muestra)
    bank: { name: 'A completar', account: 'A completar', holder: 'FlorLatte Plantas y Flores' },
    sheetsUrl: 'https://script.google.com/macros/s/AKfycbyClG0cDGRrBM8n5-EhH2Oqhskm5SFdOQFHI5aghuY0bqhep78GXZmCqgfzZx7I0exR/exec',                  // dirección de la planilla publicada (termina en /exec)
    lowStockFrom: 3,                // mostrar "¡Quedan N!" desde esta cantidad
    coupons: {
      LATTE10: { type: 'percent', value: 10, label: '10% de descuento' },
      BIENVENIDA15: { type: 'percent', value: 15, label: '15% de bienvenida' },
      ENVIOGRATIS: { type: 'shipping', value: 0, label: 'Envío gratis' }
    }
  },

  categories: [
    { id: 'ramos', name: 'Ramos' },
    { id: 'novias', name: 'Novias' },
    { id: 'rosas', name: 'Rosas' },
    { id: 'cajas', name: 'Cajas' },
    { id: 'floreros', name: 'En florero' },
    { id: 'plantas', name: 'Plantas' }
  ],

  occasions: [
    { id: 'boda', name: 'Bodas', art: { flowers: ['peony', 'rose', 'orchid'], palette: ['#fbf6f0', '#f6dfe2', '#f0c9cf'], bg: '#f3ebe4', count: 7, seed: 23 } },
    { id: 'amor', name: 'Amor', art: { flowers: ['rose'], palette: ['#b3122e', '#c7365f'], bg: '#f7dfe4', count: 7, seed: 3 } },
    { id: 'cumpleanos', name: 'Cumpleaños', art: { flowers: ['sunflower', 'daisy'], palette: ['#f5c518', '#ffffff'], bg: '#fbefc9', count: 6, seed: 5 } },
    { id: 'aniversario', name: 'Aniversario', art: { flowers: ['peony', 'rose'], palette: ['#f4a6b8', '#e86a92'], bg: '#f9e3ea', count: 6, seed: 8 } },
    { id: 'nacimiento', name: 'Nacimiento', art: { flowers: ['hydrangea', 'daisy'], palette: ['#a9c6ea', '#fdfbf6'], bg: '#e3eef9', count: 5, seed: 11 } },
    { id: 'agradecimiento', name: 'Gracias', art: { flowers: ['daisy', 'anemone'], palette: ['#fdfbf6', '#f7e7b0'], bg: '#ecf1e4', count: 6, seed: 13 } },
    { id: 'condolencias', name: 'Condolencias', art: { flowers: ['lily', 'rose'], palette: ['#fbf8f2', '#f1ece2'], bg: '#e9ece8', count: 6, seed: 17 } },
    { id: 'porque-si', name: 'Porque sí', art: { flowers: ['tulip', 'anemone'], palette: ['#ff7f6a', '#f4a6b8', '#fdfbf6'], bg: '#fde6de', count: 7, seed: 19 } }
  ],

  colors: [
    { id: 'rojo', name: 'Rojo', hex: '#b3122e' },
    { id: 'rosa', name: 'Rosa', hex: '#e86a92' },
    { id: 'blanco', name: 'Blanco', hex: '#f4f1ea' },
    { id: 'amarillo', name: 'Amarillo', hex: '#f5c518' },
    { id: 'naranja', name: 'Naranja', hex: '#f08a24' },
    { id: 'lila', name: 'Lila', hex: '#9a7fd1' },
    { id: 'azul', name: 'Azul', hex: '#7fa6d9' },
    { id: 'verde', name: 'Verde', hex: '#3d7d55' },
    { id: 'mix', name: 'Mix', hex: 'conic-gradient(#e86a92, #f5c518, #7fa6d9, #e86a92)' }
  ],

  sizes: [
    { id: 'clasico', name: 'Clásico', mult: 1, extra: 0, note: 'Tal como en la foto' },
    { id: 'deluxe', name: 'Deluxe', mult: 1.35, extra: 4, note: '+40% de flores' },
    { id: 'premium', name: 'Premium', mult: 1.7, extra: 8, note: 'El doble de impacto' }
  ],

  addons: [
    { id: 'florero', name: 'Florero de vidrio soplado', price: 890 },
    { id: 'bombones', name: 'Bombones artesanales (12u)', price: 650 },
    { id: 'vela', name: 'Vela de soja · higo y cedro', price: 720 },
    { id: 'globo', name: 'Globo metalizado "Te quiero"', price: 390 },
    { id: 'osito', name: 'Osito de peluche', price: 790 }
  ],

  products: [
    { id: 'novia-rose', name: 'Ramo de Novia Rosé', cat: 'novias', occasions: ['boda'], color: 'rosa', price: 4900, rating: 5.0, reviews: 38, badge: 'A medida', stock: null, sameDay: false,
      desc: 'Rosas rosa pálido, lisianthus y eucalipto, atado a mano con cinta de raso. Lo diseñamos junto a vos según tu vestido y tu estilo.',
      stems: 'rosas · lisianthus · eucalipto · cinta de raso',
      art: { flowers: ['rose', 'peony', 'rose'], palette: ['#f6c9d1', '#f9dfe3', '#fbf3ee'], wrap: '#fbf6f0', ribbon: '#e9c9c3', bg: '#f3ebe4', count: 13, seed: 2101, eucalyptus: true } },
    { id: 'novia-blanca', name: 'Ramo de Novia Lilium', cat: 'novias', occasions: ['boda'], color: 'blanco', price: 5200, rating: 5.0, reviews: 24, badge: null, stock: null, sameDay: false,
      desc: 'Lilium y rosas blancas con verdes de estación. Clásico, luminoso y con un perfume suave que acompaña todo el día.',
      stems: 'lilium · rosas blancas · ruscus',
      art: { flowers: ['lily', 'rose', 'rose'], palette: ['#fbf8f2', '#f4efe6', '#ffffff'], wrap: '#fbf6f0', ribbon: '#d8c6b8', bg: '#efe7df', count: 11, seed: 2202, eucalyptus: true } },
    { id: 'novia-orquideas', name: 'Ramo de Novia Orquídeas', cat: 'novias', occasions: ['boda'], color: 'rosa', price: 5900, rating: 5.0, reviews: 17, badge: 'Nuevo', stock: null, sameDay: false,
      desc: 'Orquídeas, tulipanes y paniculata en tonos blush. Delicado y distinto, inspirado en nuestro logo.',
      stems: 'orquídeas · tulipanes · paniculata · eucalipto',
      art: { flowers: ['orchid', 'tulip', 'daisy'], palette: ['#f2c7d3', '#f6dfe2', '#fbf6f0'], wrap: '#fbf6f0', ribbon: '#6b2433', bg: '#f4e6e6', count: 11, seed: 2303, eucalyptus: true } },
    { id: 'rosas-eternas', name: 'Rosas Eternas', cat: 'rosas', occasions: ['amor', 'aniversario'], color: 'rojo', price: 2890, rating: 4.9, reviews: 412, badge: 'Más vendido', stock: 24, sameDay: true,
      desc: 'Doce rosas rojas de tallo largo, envueltas en papel kraft con lazo de raso verde botella. El clásico que nunca falla.',
      stems: '12 rosas Freedom · eucalipto · gypsophila',
      art: { flowers: ['rose'], palette: ['#b3122e', '#9d0b28', '#c41a3a'], wrap: '#e8d6c3', ribbon: '#1f3b2d', bg: '#f6dfe3', count: 12, seed: 101, eucalyptus: true } },
    { id: 'jardin-peonias', name: 'Jardín de Peonías', cat: 'ramos', occasions: ['aniversario', 'amor', 'porque-si'], color: 'rosa', price: 3990, rating: 5.0, reviews: 128, badge: 'Nuevo', stock: 6, sameDay: true,
      desc: 'Peonías Sarah Bernhardt en su punto justo de apertura, con eucalipto plateado. Temporada limitada.',
      stems: '7 peonías · 3 rosas spray · eucalipto baby blue',
      art: { flowers: ['peony', 'peony', 'rose'], palette: ['#f4a6b8', '#f7c4cf', '#e86a92'], wrap: '#fbf3ee', ribbon: '#c7365f', bg: '#f9e6ec', count: 10, seed: 202, eucalyptus: true } },
    { id: 'sol-de-manana', name: 'Sol de Mañana', cat: 'ramos', occasions: ['cumpleanos', 'agradecimiento', 'porque-si'], color: 'amarillo', price: 2190, rating: 4.8, reviews: 236, badge: null, stock: 30, sameDay: true,
      desc: 'Girasoles y margaritas que levantan cualquier día. Ideal para cumpleaños y felicitaciones.',
      stems: '5 girasoles · 8 margaritas · follaje de estación',
      art: { flowers: ['sunflower', 'daisy', 'daisy'], palette: ['#f5c518', '#ffffff', '#f7d34a'], wrap: '#d9c2a3', ribbon: '#3d7d55', bg: '#fbf0cf', count: 11, seed: 303 } },
    { id: 'blanco-sereno', name: 'Blanco Sereno', cat: 'ramos', occasions: ['condolencias', 'agradecimiento'], color: 'blanco', price: 3290, rating: 4.9, reviews: 97, badge: null, stock: 14, sameDay: true,
      desc: 'Lilium y rosas blancas en una composición sobria y luminosa, para acompañar con respeto.',
      stems: '4 lilium · 8 rosas blancas · ruscus',
      art: { flowers: ['lily', 'rose', 'rose'], palette: ['#fbf8f2', '#f3efe6', '#ffffff'], wrap: '#dfe3dc', ribbon: '#6b7f72', bg: '#e8ece7', count: 11, seed: 404, eucalyptus: true } },
    { id: 'caja-rose', name: 'Caja Rosé', cat: 'cajas', occasions: ['amor', 'aniversario', 'cumpleanos'], color: 'rosa', price: 3490, rating: 4.9, reviews: 189, badge: 'Más vendido', stock: 9, sameDay: true,
      desc: 'Sombrerera de terciopelo con rosas en tonos blush. Lista para regalar, no necesita florero.',
      stems: '18 rosas · gypsophila · caja reutilizable',
      art: { kind: 'box', flowers: ['rose'], palette: ['#f4a6b8', '#f7c4cf', '#e86a92'], wrap: '#2c2a2e', ribbon: '#e8c39e', bg: '#f6e3e7', count: 16, seed: 505 } },
    { id: 'tulipanes-amsterdam', name: 'Tulipanes de Ámsterdam', cat: 'ramos', occasions: ['porque-si', 'cumpleanos'], color: 'mix', price: 2590, oldPrice: 2990, rating: 4.7, reviews: 154, badge: '-13%', stock: 18, sameDay: true,
      desc: 'Tulipanes importados en una paleta alegre de coral, rosa y blanco. Se siguen abriendo en casa.',
      stems: '15 tulipanes holandeses',
      art: { flowers: ['tulip'], palette: ['#ff7f6a', '#f4a6b8', '#fdfbf6', '#e86a92'], wrap: '#f1e5d8', ribbon: '#ff7f6a', bg: '#fde6de', count: 13, seed: 606, filler: false } },
    { id: 'lavanda-miel', name: 'Lavanda & Miel', cat: 'ramos', occasions: ['agradecimiento', 'porque-si'], color: 'lila', price: 1990, rating: 4.8, reviews: 88, badge: null, stock: 21, sameDay: true,
      desc: 'Lavanda perfumada con margaritas crema. Un ramo campestre que aromatiza toda la casa.',
      stems: 'lavanda fresca · margaritas · paniculata',
      art: { flowers: ['daisy', 'daisy', 'anemone'], palette: ['#f7efd8', '#ffffff'], wrap: '#e7e0f1', ribbon: '#7e57c2', bg: '#ece6f6', count: 9, seed: 707, lavender: '#8e71c9' } },
    { id: 'orquidea-phalaenopsis', name: 'Orquídea Phalaenopsis', cat: 'plantas', occasions: ['agradecimiento', 'nacimiento', 'porque-si'], color: 'rosa', price: 2790, rating: 4.9, reviews: 203, badge: null, stock: 11, sameDay: true,
      desc: 'Orquídea de dos varas en maceta de cerámica. Florece durante meses con riego semanal.',
      stems: '2 varas · maceta de cerámica 14cm',
      art: { kind: 'pot', flowers: ['orchidPot'], palette: ['#d9479a'], wrap: '#f3f0ea', bg: '#f4e4ef', seed: 808 } },
    { id: 'monstera', name: 'Monstera Deliciosa', cat: 'plantas', occasions: ['porque-si', 'agradecimiento'], color: 'verde', price: 2490, rating: 4.8, reviews: 76, badge: null, stock: 8, sameDay: false,
      desc: 'La planta de interior favorita: hojas grandes y caladas en maceta de terracota.',
      stems: 'planta de 60cm · maceta de terracota 20cm',
      art: { kind: 'pot', flowers: ['monstera'], wrap: '#c66b3d', bg: '#e6efe6', seed: 909 } },
    { id: 'hortensias-azules', name: 'Hortensias Azules', cat: 'floreros', occasions: ['nacimiento', 'agradecimiento', 'porque-si'], color: 'azul', price: 3190, rating: 4.7, reviews: 64, badge: null, stock: 12, sameDay: true,
      desc: 'Hortensias de estación en florero de vidrio. Volumen y frescura en una pieza lista para exhibir.',
      stems: '5 hortensias · florero incluido',
      art: { kind: 'vase', flowers: ['hydrangea'], palette: ['#8fb3e0', '#a9c6ea', '#b7a6e0'], wrap: '#cfe3ee', bg: '#e3edf7', count: 6, seed: 1010, filler: false } },
    { id: 'bienvenido-bebe', name: 'Bienvenido Bebé', cat: 'cajas', occasions: ['nacimiento'], color: 'azul', price: 2690, rating: 5.0, reviews: 52, badge: null, stock: 10, sameDay: true,
      desc: 'Caja en tonos pastel para celebrar la llegada. Incluye tarjeta de bienvenida ilustrada.',
      stems: 'hortensias · rosas spray · margaritas',
      art: { kind: 'box', flowers: ['hydrangea', 'daisy', 'rose'], palette: ['#a9c6ea', '#fdfbf6', '#f7c4cf'], wrap: '#f4f1ea', ribbon: '#a9c6ea', bg: '#e5eef8', count: 11, seed: 1111 } },
    { id: 'pasion-infinita', name: 'Pasión Infinita', cat: 'cajas', occasions: ['amor', 'aniversario'], color: 'rojo', price: 5490, rating: 5.0, reviews: 71, badge: 'Edición limitada', stock: 3, sameDay: true,
      desc: 'Veinticuatro rosas rojas Explorer en caja negra de terciopelo. Para los momentos que se recuerdan.',
      stems: '24 rosas Explorer · caja de terciopelo',
      art: { kind: 'box', flowers: ['rose'], palette: ['#9d0b28', '#b3122e', '#c41a3a'], wrap: '#1c1a1d', ribbon: '#c9a15b', bg: '#f1d9dc', count: 22, seed: 1212 } },
    { id: 'atardecer-toscano', name: 'Atardecer Toscano', cat: 'ramos', occasions: ['cumpleanos', 'porque-si'], color: 'naranja', price: 2790, rating: 4.8, reviews: 113, badge: null, stock: 16, sameDay: true,
      desc: 'Rosas durazno, claveles coral y ranúnculos naranja. Cálido, vibrante y con mucho movimiento.',
      stems: '6 rosas · 5 claveles · 4 ranúnculos',
      art: { flowers: ['rose', 'carnation', 'peony'], palette: ['#f7b59a', '#f08a24', '#ff7f6a'], wrap: '#efe3d6', ribbon: '#c45a1f', bg: '#fde8d8', count: 12, seed: 1313, eucalyptus: true } },
    { id: 'jardin-silvestre', name: 'Jardín Silvestre', cat: 'ramos', occasions: ['porque-si', 'agradecimiento', 'cumpleanos'], color: 'mix', price: 2390, rating: 4.9, reviews: 142, badge: 'Favorito del florista', stock: 13, sameDay: true,
      desc: 'Anémonas, margaritas y lavanda como recién cortadas del campo. Cada ramo es distinto.',
      stems: 'anémonas · margaritas · lavanda · follaje silvestre',
      art: { flowers: ['anemone', 'daisy', 'carnation'], palette: ['#fdfbf6', '#f4a6b8', '#b39ddb'], wrap: '#e9dfd2', ribbon: '#5b8a68', bg: '#eef0e2', count: 11, seed: 1414, lavender: '#9a7fd1' } },
    { id: 'trio-suculentas', name: 'Trío de Suculentas', cat: 'plantas', occasions: ['agradecimiento', 'porque-si'], color: 'verde', price: 1290, rating: 4.6, reviews: 59, badge: null, stock: 40, sameDay: true,
      desc: 'Tres suculentas en una maceta de cerámica blanca. Casi no necesitan cuidados.',
      stems: '3 suculentas · maceta 16cm',
      art: { kind: 'pot', flowers: ['succulent'], wrap: '#eeeae3', bg: '#e8efe4', seed: 1515 } },
    { id: 'sansevieria', name: 'Sansevieria', cat: 'plantas', occasions: ['porque-si'], color: 'verde', price: 1890, rating: 4.7, reviews: 44, badge: null, stock: 15, sameDay: false,
      desc: 'Purifica el aire y tolera la poca luz. La planta perfecta para oficinas y principiantes.',
      stems: 'planta de 50cm · maceta 18cm',
      art: { kind: 'pot', flowers: ['sansevieria'], wrap: '#2f3a35', bg: '#e9ede4', seed: 1616 } },
    { id: 'lirios-rosados', name: 'Lirios Rosados', cat: 'floreros', occasions: ['cumpleanos', 'aniversario'], color: 'rosa', price: 2990, rating: 4.8, reviews: 81, badge: null, stock: 9, sameDay: true,
      desc: 'Lilium rosados de perfume intenso en florero de vidrio, con rosas spray y verdes.',
      stems: '5 lilium · rosas spray · florero',
      art: { kind: 'vase', flowers: ['lily', 'lily', 'rose'], palette: ['#f29bb8', '#f7c4cf', '#e86a92'], wrap: '#e6eef2', bg: '#f8e5ec', count: 9, seed: 1717 } },
    { id: 'mini-gracias', name: 'Mini Gracias', cat: 'ramos', occasions: ['agradecimiento', 'porque-si'], color: 'blanco', price: 1290, rating: 4.7, reviews: 167, badge: null, stock: 50, sameDay: true,
      desc: 'Un detalle chiquito con un mensaje enorme. Margaritas y paniculata en papel de seda.',
      stems: '10 margaritas · paniculata',
      art: { flowers: ['daisy'], palette: ['#ffffff', '#fdf6e3'], wrap: '#f5efe6', ribbon: '#e8c39e', bg: '#f2f0e6', count: 7, seed: 1818 } },
    { id: 'docena-blush', name: 'Docena Blush', cat: 'rosas', occasions: ['amor', 'cumpleanos', 'aniversario'], color: 'rosa', price: 2890, rating: 4.9, reviews: 221, badge: null, stock: 19, sameDay: true,
      desc: 'Doce rosas rosa pálido con eucalipto. Romántico, delicado y moderno.',
      stems: '12 rosas Pink Mondial · eucalipto',
      art: { flowers: ['rose'], palette: ['#f7c4cf', '#f4a6b8', '#fbdde4'], wrap: '#f4ece6', ribbon: '#c7365f', bg: '#f9e8ec', count: 12, seed: 1919, eucalyptus: true } },
    { id: 'caja-arcoiris', name: 'Caja Arcoíris', cat: 'cajas', occasions: ['cumpleanos', 'porque-si'], color: 'mix', price: 3790, rating: 4.8, reviews: 66, badge: 'Nuevo', stock: 7, sameDay: true,
      desc: 'Una explosión de color: girasoles, claveles, rosas y hortensias en caja kraft.',
      stems: '20 tallos variados · caja kraft',
      art: { kind: 'box', flowers: ['sunflower', 'carnation', 'rose', 'hydrangea'], palette: ['#f5c518', '#e86a92', '#ff7f6a', '#9a7fd1'], wrap: '#c8a27a', ribbon: '#1f3b2d', bg: '#fbefd6', count: 15, seed: 2020 } }
  ],

  /* Flores sueltas para "Armá tu ramo" (precio por tallo) */
  builderFlowers: [
    { type: 'rose', name: 'Rosa', price: 190, colors: ['#b3122e', '#f4a6b8', '#fdfbf6', '#f7b59a'] },
    { type: 'peony', name: 'Peonía', price: 420, colors: ['#f4a6b8', '#fbe7ea', '#c7365f'] },
    { type: 'tulip', name: 'Tulipán', price: 160, colors: ['#ff7f6a', '#f5c518', '#fdfbf6', '#9a7fd1'] },
    { type: 'sunflower', name: 'Girasol', price: 210, colors: ['#f5c518'] },
    { type: 'lily', name: 'Lilium', price: 260, colors: ['#fbf8f2', '#f29bb8'] },
    { type: 'hydrangea', name: 'Hortensia', price: 340, colors: ['#8fb3e0', '#b7a6e0', '#f4f1ea'] },
    { type: 'daisy', name: 'Margarita', price: 90, colors: ['#ffffff'] },
    { type: 'anemone', name: 'Anémona', price: 180, colors: ['#fdfbf6', '#e86a92'] },
    { type: 'carnation', name: 'Clavel', price: 110, colors: ['#e86a92', '#f08a24', '#b3122e'] }
  ],
  wraps: [
    { id: 'kraft', name: 'Kraft', hex: '#d9c2a3' },
    { id: 'seda', name: 'Seda marfil', hex: '#f5efe6' },
    { id: 'rosa', name: 'Rosa empolvado', hex: '#f1d3d9' },
    { id: 'salvia', name: 'Salvia', hex: '#c9d8c5' },
    { id: 'noche', name: 'Noche', hex: '#2c2a2e' }
  ],

  plans: [
    { id: 'quincenal', name: 'Esencial', freq: 'Cada 15 días', price: 1690, perks: ['Ramo de estación mediano', 'Envío incluido', 'Pausá cuando quieras'] },
    { id: 'semanal', name: 'Florista', freq: 'Cada semana', price: 1490, perks: ['Ramo de estación grande', 'Envío incluido', 'Florero de regalo en el 1er envío', '10% off en la tienda'], featured: true },
    { id: 'mensual', name: 'Detalle', freq: 'Una vez al mes', price: 1890, perks: ['Ramo de autor premium', 'Envío incluido', 'Tarjeta personalizada'] }
  ],

  testimonials: [
    { name: 'Lucía F.', text: 'Pedí a las 11 y a las 14 ya estaban en la oficina de mi mamá. Las rosas duraron casi dos semanas.', product: 'Rosas Eternas', stars: 5 },
    { name: 'Martín G.', text: 'Armé mi propio ramo con peonías y tulipanes y llegó idéntico a la vista previa. Impecable.', product: 'Armá tu ramo', stars: 5 },
    { name: 'Sofía R.', text: 'La suscripción semanal me cambió la casa. Cada viernes es una sorpresa distinta.', product: 'Plan Florista', stars: 5 },
    { name: 'Diego P.', text: 'Atención por WhatsApp rapidísima. Me ayudaron a elegir para un aniversario y fue un éxito.', product: 'Caja Rosé', stars: 5 },
    { name: 'Valentina M.', text: 'La caja es preciosa y la reutilicé. El seguimiento del pedido en tiempo real es un golazo.', product: 'Pasión Infinita', stars: 5 }
  ],

  meanings: [
    { type: 'rose', color: '#b3122e', name: 'Rosa roja', text: 'Amor apasionado y admiración profunda.' },
    { type: 'sunflower', color: '#f5c518', name: 'Girasol', text: 'Alegría, lealtad y buena energía.' },
    { type: 'peony', color: '#f4a6b8', name: 'Peonía', text: 'Prosperidad, romance y matrimonio feliz.' },
    { type: 'lily', color: '#fbf8f2', name: 'Lilium blanco', text: 'Pureza, paz y acompañamiento.' },
    { type: 'tulip', color: '#ff7f6a', name: 'Tulipán', text: 'Amor perfecto y nuevos comienzos.' },
    { type: 'hydrangea', color: '#8fb3e0', name: 'Hortensia', text: 'Gratitud sincera y comprensión.' }
  ],

  faqs: [
    { q: '¿Hacen ramos de novia?', a: 'Sí, es una de nuestras especialidades. Escribinos con al menos 3 semanas de anticipación: coordinamos una charla para conocer tu vestido, tu paleta y tu estilo, y diseñamos el ramo a medida. También hacemos boutonnieres y decoración floral.' },
    { q: '¿Hasta qué hora puedo pedir para que llegue hoy?', a: 'Los pedidos confirmados antes de las 16:00 se entregan el mismo día, de lunes a sábado. Con Envío Express llega en menos de 2 horas.' },
    { q: '¿Cuánto cuesta el envío?', a: 'El envío estándar cuesta $290 y es gratis en compras desde $3.500. El Envío Express cuesta $490. También podés retirar sin costo en nuestro local.' },
    { q: '¿Puedo elegir la fecha y el horario de entrega?', a: 'Sí. En el checkout elegís el día (hasta 10 días adelante) y una franja horaria de 3 horas.' },
    { q: '¿Las flores pueden ser distintas a la foto?', a: 'Trabajamos con flor fresca de estación. Si alguna variedad no está disponible la reemplazamos por otra de igual o mayor valor, respetando la paleta.' },
    { q: '¿Qué pasa si el destinatario no está?', a: 'Te avisamos por WhatsApp y coordinamos una segunda entrega sin costo, o lo dejamos con portería si nos autorizás.' },
    { q: '¿Cuánto duran las flores?', a: 'Garantizamos 7 días de frescura. Si algo no está bien, mandanos una foto en las primeras 48 horas y lo reponemos.' }
  ]
};
root.FLORLATTE = DATA;
if (typeof module === 'object' && module.exports) module.exports = DATA;
})(typeof window !== 'undefined' ? window : globalThis);
