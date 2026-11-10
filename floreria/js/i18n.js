/* FlorLatte — idiomas (español, inglés y portugués).
   La tienda se escribe en español; este archivo traduce lo que se ve en pantalla al vuelo.
   Para agregar o corregir una traducción, sumá una fila [español, inglés, portugués] en T.
   Los números y precios se escriben como {n} y {$}. */
(function (root) {
  'use strict';
  const LANGS = { es: { label: 'ES', locale: 'es-UY' }, en: { label: 'EN', locale: 'en-US' }, pt: { label: 'PT', locale: 'pt-BR' } };

  const T = [
    // Encabezado, navegación y generales
    ['Saltar a la tienda', 'Skip to the shop', 'Ir para a loja'],
    ['Novedades', 'News', 'Novidades'],
    ['Abrir menú', 'Open menu', 'Abrir menu'],
    ['FlorLatte, inicio', 'FlorLatte, home', 'FlorLatte, início'],
    ['Principal', 'Main', 'Principal'],
    ['Tienda', 'Shop', 'Loja'],
    ['Ocasiones', 'Occasions', 'Ocasiões'],
    ['Armá tu ramo', 'Build your bouquet', 'Monte seu buquê'],
    ['Suscripción', 'Subscription', 'Assinatura'],
    ['Atelier', 'Atelier', 'Ateliê'],
    ['Ayuda', 'Help', 'Ajuda'],
    ['Buscar', 'Search', 'Buscar'],
    ['Cambiar tema', 'Change theme', 'Mudar tema'],
    ['Usar tema oscuro', 'Use dark theme', 'Usar tema escuro'],
    ['Usar tema claro', 'Use light theme', 'Usar tema claro'],
    ['Favoritos', 'Favorites', 'Favoritos'],
    ['Carrito', 'Cart', 'Carrinho'],
    ['Idioma', 'Language', 'Idioma'],
    ['Menú', 'Menu', 'Menu'],
    ['Cerrar', 'Close', 'Fechar'],
    ['Cerrar menú', 'Close menu', 'Fechar menu'],
    ['Cerrar carrito', 'Close cart', 'Fechar carrinho'],
    ['Cerrar favoritos', 'Close favorites', 'Fechar favoritos'],
    ['Cerrar búsqueda', 'Close search', 'Fechar busca'],
    ['Cerrar filtros', 'Close filters', 'Fechar filtros'],
    ['Cerrar checkout', 'Close checkout', 'Fechar checkout'],
    ['Volver arriba', 'Back to top', 'Voltar ao topo'],
    ['Escribinos por WhatsApp', 'Message us on WhatsApp', 'Fale conosco pelo WhatsApp'],
    ['Lenguaje de las flores', 'Language of flowers', 'Linguagem das flores'],
    ['Nuestro atelier', 'Our atelier', 'Nosso ateliê'],

    // Anuncios y portada
    ['Envíos a domicilio o', 'Home delivery or', 'Entrega em domicílio ou'],
    ['retiro sin costo', 'free pickup', 'retirada grátis'],
    ['en el atelier', 'at the atelier', 'no ateliê'],
    ['Pedí antes de las {n}:{n} y', 'Order before {n}:{n} and it', 'Peça antes das {n}:{n} e'],
    ['llega hoy', 'arrives today', 'chega hoje'],
    ['Usá', 'Use', 'Use'],
    ['y obtené {n}% off', 'and get {n}% off', 'e ganhe {n}% de desconto'],
    ['Tarjeta con dedicatoria', 'Card with your message', 'Cartão com dedicatória'],
    ['de regalo', 'as a gift', 'de presente'],
    ['en cada pedido', 'with every order', 'em cada pedido'],
    ['Atelier botánico · Las Piedras', 'Botanical atelier · Las Piedras', 'Ateliê botânico · Las Piedras'],
    ['Donde <em>laten</em> las flores.', 'Where flowers <em>come alive</em>.', 'Onde as flores <em>pulsam</em>.'],
    ['Nos encanta acompañarte', 'We love being by your side', 'Adoramos estar com você'],
    ['Ramos, plantas y flores armados a mano en nuestro espacio. Elegí, escribí tu dedicatoria y lo llevamos a quien más querés.', 'Bouquets, plants and flowers handmade in our studio. Choose, write your message and we deliver it to the one you love.', 'Buquês, plantas e flores feitos à mão no nosso espaço. Escolha, escreva sua dedicatória e levamos a quem você mais ama.'],
    ['Comprar flores', 'Shop flowers', 'Comprar flores'],
    ['Pedí en las próximas', 'Order within the next', 'Peça nas próximas'],
    ['{n} h {n} min', '{n} h {n} min', '{n} h {n} min'],
    ['{n} min', '{n} min', '{n} min'],
    ['y llega hoy', 'and it arrives today', 'e chega hoje'],
    ['Pedí ahora y llega', 'Order now and it arrives', 'Peça agora e chega'],
    ['mañana a primera hora', 'first thing tomorrow', 'amanhã logo cedo'],
    ['Floristería', 'Florist', 'Floricultura'],
    ['& vivero', '& nursery', '& viveiro'],
    ['Novias', 'Brides', 'Noivas'],
    ['ramos a medida', 'custom bouquets', 'buquês sob medida'],
    ['Hecho a mano', 'Handmade', 'Feito à mão'],
    ['con amor en nuestro espacio', 'with love in our studio', 'com amor no nosso espaço'],
    ['FlorLatte, donde laten las flores. Nos encanta acompañarte.', 'FlorLatte, where flowers come alive. We love being by your side.', 'FlorLatte, onde as flores pulsam. Adoramos estar com você.'],

    // Beneficios
    ['Beneficios', 'Benefits', 'Benefícios'],
    ['Entrega en el día', 'Same-day delivery', 'Entrega no mesmo dia'],
    ['Pedí antes de las {n}:{n}', 'Order before {n}:{n}', 'Peça antes das {n}:{n}'],
    ['Frescura {n} días', '{n}-day freshness', 'Frescor por {n} dias'],
    ['O te lo reponemos', 'Or we replace it', 'Ou trocamos'],
    ['Tarjeta gratis', 'Free card', 'Cartão grátis'],
    ['Con tu dedicatoria', 'With your message', 'Com sua dedicatória'],
    ['Pago seguro', 'Secure payment', 'Pagamento seguro'],
    ['Tarjetas y Mercado Pago', 'Cards and Mercado Pago', 'Cartões e Mercado Pago'],

    // Ocasiones
    ['Para cada momento', 'For every moment', 'Para cada momento'],
    ['Comprá por', 'Shop by', 'Compre por'],
    ['ocasión', 'occasion', 'ocasião'],
    ['Bodas', 'Weddings', 'Casamentos'],
    ['Amor', 'Love', 'Amor'],
    ['Cumpleaños', 'Birthday', 'Aniversário'],
    ['Aniversario', 'Anniversary', 'Aniversário de casal'],
    ['Nacimiento', 'New baby', 'Nascimento'],
    ['Gracias', 'Thank you', 'Obrigado'],
    ['Condolencias', 'Sympathy', 'Condolências'],
    ['Porque sí', 'Just because', 'Só porque sim'],

    // Tienda y filtros
    ['Nuestra', 'Our', 'Nossa'],
    ['colección', 'collection', 'coleção'],
    ['Categorías', 'Categories', 'Categorias'],
    ['Todo', 'All', 'Tudo'],
    ['Ramos', 'Bouquets', 'Buquês'],
    ['Rosas', 'Roses', 'Rosas'],
    ['Cajas', 'Boxes', 'Caixas'],
    ['En florero', 'In a vase', 'No vaso'],
    ['Plantas', 'Plants', 'Plantas'],
    ['Filtros', 'Filters', 'Filtros'],
    ['Ocasión', 'Occasion', 'Ocasião'],
    ['Color', 'Color', 'Cor'],
    ['Rojo', 'Red', 'Vermelho'],
    ['Rosa', 'Pink', 'Rosa'],
    ['Blanco', 'White', 'Branco'],
    ['Amarillo', 'Yellow', 'Amarelo'],
    ['Naranja', 'Orange', 'Laranja'],
    ['Lila', 'Lilac', 'Lilás'],
    ['Azul', 'Blue', 'Azul'],
    ['Verde', 'Green', 'Verde'],
    ['Mix', 'Mixed', 'Mix'],
    ['Precio máximo', 'Max price', 'Preço máximo'],
    ['Solo entrega hoy', 'Same-day delivery only', 'Só entrega hoje'],
    ['Solo ofertas', 'Deals only', 'Só ofertas'],
    ['Limpiar filtros', 'Clear filters', 'Limpar filtros'],
    ['Ordenar', 'Sort', 'Ordenar'],
    ['Destacados', 'Featured', 'Destaques'],
    ['Menor precio', 'Lowest price', 'Menor preço'],
    ['Mayor precio', 'Highest price', 'Maior preço'],
    ['Mejor valorados', 'Top rated', 'Mais bem avaliados'],
    ['A–Z', 'A–Z', 'A–Z'],
    ['{n} productos', '{n} products', '{n} produtos'],
    ['{n} producto', '{n} product', '{n} produto'],
    ['Hasta', 'Up to', 'Até'],
    ['Entrega hoy', 'Delivered today', 'Entrega hoje'],
    ['Ofertas', 'Deals', 'Ofertas'],
    ['Quitar filtro', 'Remove filter', 'Remover filtro'],
    ['No encontramos flores con esos filtros.', 'No flowers match those filters.', 'Não encontramos flores com esses filtros.'],
    ['Probá quitar alguno o', 'Try removing some or', 'Tente remover algum ou'],
    ['ver todo el catálogo', 'see the whole catalog', 'ver todo o catálogo'],
    ['Vistos recientemente', 'Recently viewed', 'Vistos recentemente'],
    ['Agregar', 'Add', 'Adicionar'],
    ['Vista rápida', 'Quick view', 'Visualização rápida'],
    ['Ver', 'View', 'Ver'],
    ['Agregar a favoritos', 'Add to favorites', 'Adicionar aos favoritos'],
    ['Quitar de favoritos', 'Remove from favorites', 'Remover dos favoritos'],
    ['Llega hoy', 'Arrives today', 'Chega hoje'],
    ['Quedan {n}', '{n} left', 'Restam {n}'],
    ['¡Quedan {n}!', 'Only {n} left!', 'Só restam {n}!'],
    ['Agotado', 'Sold out', 'Esgotado'],
    ['{n} de {n}', '{n} of {n}', '{n} de {n}'],
    ['{n} estrellas', '{n} stars', '{n} estrelas'],
    ['Más vendido', 'Best seller', 'Mais vendido'],
    ['Nuevo', 'New', 'Novo'],
    ['A medida', 'Made to order', 'Sob medida'],
    ['Edición limitada', 'Limited edition', 'Edição limitada'],
    ['Favorito del florista', 'Florist’s pick', 'Favorito da florista'],

    // Ficha de producto
    ['Tocá para hacer zoom', 'Tap to zoom', 'Toque para ampliar'],
    ['Vista {n}', 'View {n}', 'Visualização {n}'],
    ['{n} · {n} reseñas', '{n} · {n} reviews', '{n} · {n} avaliações'],
    ['Tamaño', 'Size', 'Tamanho'],
    ['Clásico', 'Classic', 'Clássico'],
    ['Deluxe', 'Deluxe', 'Deluxe'],
    ['Premium', 'Premium', 'Premium'],
    ['Tal como en la foto', 'Just like the photo', 'Igual à foto'],
    ['+{n}% de flores', '+{n}% more flowers', '+{n}% de flores'],
    ['El doble de impacto', 'Twice the impact', 'O dobro do impacto'],
    ['Completá el regalo', 'Complete the gift', 'Complete o presente'],
    ['opcional', 'optional', 'opcional'],
    ['Florero de vidrio soplado', 'Hand-blown glass vase', 'Vaso de vidro soprado'],
    ['Bombones artesanales ({n}u)', 'Artisan chocolates ({n} pcs)', 'Bombons artesanais ({n} un.)'],
    ['Vela de soja · higo y cedro', 'Soy candle · fig and cedar', 'Vela de soja · figo e cedro'],
    ['Globo metalizado "Te quiero"', '"I love you" foil balloon', 'Balão metalizado "Te amo"'],
    ['Osito de peluche', 'Teddy bear', 'Ursinho de pelúcia'],
    ['Menos', 'Less', 'Menos'],
    ['Más', 'More', 'Mais'],
    ['Agregar · {$}', 'Add · {$}', 'Adicionar · {$}'],
    ['Ya está todo en tu carrito', 'It’s all in your cart already', 'Já está tudo no seu carrinho'],
    ['Ahorrás {$}', 'You save {$}', 'Você economiza {$}'],
    ['Pedilo ahora y', 'Order now and it', 'Peça agora e'],
    ['Llega', 'Arrives', 'Chega'],
    ['mañana', 'tomorrow', 'amanhã'],
    ['a primera hora', 'first thing', 'logo cedo'],
    ['Entrega en {n} a {n} h', 'Delivered in {n} to {n} h', 'Entrega em {n} a {n} h'],
    ['Tarjeta con dedicatoria incluida', 'Card with your message included', 'Cartão com dedicatória incluído'],
    ['¡Últimas {n} unidades!', 'Last {n} left!', 'Últimas {n} unidades!'],
    ['Agotado por ahora. Escribinos y te avisamos cuando vuelva.', 'Sold out for now. Message us and we’ll let you know when it’s back.', 'Esgotado por enquanto. Fale conosco e avisamos quando voltar.'],
    ['Cuidados', 'Care', 'Cuidados'],
    ['Cortá {n} cm de los tallos en diagonal, cambiá el agua cada dos días y alejá el ramo del sol directo y la fruta madura. Así dura hasta {n} días.', 'Trim {n} cm off the stems at an angle, change the water every two days and keep the bouquet away from direct sun and ripe fruit. It will last up to {n} days.', 'Corte {n} cm dos caules na diagonal, troque a água a cada dois dias e mantenha o buquê longe do sol direto e de frutas maduras. Assim dura até {n} dias.'],
    ['Ubicala con luz indirecta y regá cuando el sustrato esté seco al tacto. Evitá el sol directo del mediodía.', 'Place it in indirect light and water when the soil feels dry. Avoid direct midday sun.', 'Coloque em luz indireta e regue quando o substrato estiver seco ao toque. Evite o sol direto do meio-dia.'],
    ['Envío y entrega', 'Shipping and delivery', 'Envio e entrega'],
    ['Envío a domicilio con costo según tu barrio: lo ves al elegirlo en el checkout, antes de pagar. Retiro sin costo en Av. Instrucciones del Año XVII {n}, Las Piedras.', 'Home delivery priced by neighborhood: you’ll see the cost when you choose it at checkout, before paying. Free pickup at Av. Instrucciones del Año XVII {n}, Las Piedras.', 'Entrega em domicílio com custo conforme o bairro: você vê ao escolher no checkout, antes de pagar. Retirada grátis na Av. Instrucciones del Año XVII {n}, Las Piedras.'],
    ['Garantía de frescura', 'Freshness guarantee', 'Garantia de frescor'],
    ['Si algo no llega perfecto, mandanos una foto dentro de las {n} h y lo reponemos sin costo.', 'If something doesn’t arrive perfect, send us a photo within {n} h and we’ll replace it free of charge.', 'Se algo não chegar perfeito, mande uma foto em até {n} h e trocamos sem custo.'],

    // Favoritos, carrito y avisos
    ['Guardado en favoritos', 'Saved to favorites', 'Salvo nos favoritos'],
    ['Todavía no guardaste nada', 'You haven’t saved anything yet', 'Você ainda não salvou nada'],
    ['Tocá el corazón en cualquier producto para guardarlo acá.', 'Tap the heart on any product to save it here.', 'Toque no coração de qualquer produto para salvá-lo aqui.'],
    ['Explorar la tienda', 'Explore the shop', 'Explorar a loja'],
    ['Agregar al carrito', 'Add to cart', 'Adicionar ao carrinho'],
    ['Quitar', 'Remove', 'Remover'],
    ['Agregado al carrito', 'Added to cart', 'Adicionado ao carrinho'],
    ['Ver carrito', 'View cart', 'Ver carrinho'],
    ['Tu carrito', 'Your cart', 'Seu carrinho'],
    ['Tu carrito está vacío', 'Your cart is empty', 'Seu carrinho está vazio'],
    ['Llenalo de flores: tenemos ramos desde {$}', 'Fill it with flowers: bouquets from {$}', 'Encha de flores: buquês a partir de {$}'],
    ['Ver la tienda', 'See the shop', 'Ver a loja'],
    ['Cantidad', 'Quantity', 'Quantidade'],
    ['Quitar uno', 'Remove one', 'Remover um'],
    ['Agregar uno', 'Add one', 'Adicionar um'],
    ['Eliminar', 'Remove', 'Excluir'],
    ['Producto eliminado', 'Item removed', 'Produto removido'],
    ['Deshacer', 'Undo', 'Desfazer'],
    ['Sumá un detalle', 'Add a little extra', 'Adicione um mimo'],
    ['Código de descuento', 'Discount code', 'Código de desconto'],
    ['Aplicar', 'Apply', 'Aplicar'],
    ['Cupón', 'Coupon', 'Cupom'],
    ['aplicado · {n}% de descuento', 'applied · {n}% off', 'aplicado · {n}% de desconto'],
    ['aplicado · Envío gratis', 'applied · Free shipping', 'aplicado · Frete grátis'],
    ['Cupón aplicado', 'Coupon applied', 'Cupom aplicado'],
    ['{n}% de descuento', '{n}% off', '{n}% de desconto'],
    ['{n}% de bienvenida', '{n}% welcome discount', '{n}% de boas-vindas'],
    ['Envío gratis', 'Free shipping', 'Frete grátis'],
    ['Subtotal', 'Subtotal', 'Subtotal'],
    ['Descuento', 'Discount', 'Desconto'],
    ['Envío', 'Shipping', 'Envio'],
    ['Se calcula según tu barrio', 'Calculated by neighborhood', 'Calculado conforme o bairro'],
    ['Total', 'Total', 'Total'],
    ['Finalizar compra', 'Checkout', 'Finalizar compra'],
    ['Producto agotado', 'Sold out', 'Produto esgotado'],
    ['No hay más stock', 'No more stock', 'Sem mais estoque'],

    // Búsqueda
    ['No encontramos', 'We couldn’t find', 'Não encontramos'],
    ['. Probá con "rosas", "plantas" o una ocasión como "cumpleaños".', '. Try "roses", "plants" or an occasion like "birthday".', '. Tente "rosas", "plantas" ou uma ocasião como "aniversário".'],
    ['El código', 'The code', 'O código'],
    ['no existe o ya venció. Revisá que esté bien escrito.', 'doesn’t exist or has expired. Check it’s spelled correctly.', 'não existe ou já venceu. Confira se está escrito corretamente.'],
    ['Buscá rosas, girasoles, cumpleaños…', 'Search roses, sunflowers, birthday…', 'Busque rosas, girassóis, aniversário…'],
    ['Populares:', 'Popular:', 'Populares:'],
    ['Girasoles', 'Sunflowers', 'Girassóis'],
    ['Peonías', 'Peonies', 'Peônias'],
    ['Caja', 'Box', 'Caixa'],

    // Armá tu ramo
    ['Diseñalo vos', 'Design it yourself', 'Crie você mesmo'],
    ['Armá tu', 'Build your', 'Monte seu'],
    ['ramo', 'bouquet', 'buquê'],
    ['Elegí tallo por tallo y mirá cómo queda en tiempo real. Nuestros floristas lo arman tal cual.', 'Choose stem by stem and see it come together live. Our florists make it exactly like that.', 'Escolha haste por haste e veja como fica em tempo real. Nossas floristas montam exatamente assim.'],
    ['Flores', 'Flowers', 'Flores'],
    ['Papel', 'Wrapping', 'Papel'],
    ['{n} tallos', '{n} stems', '{n} hastes'],
    ['{n} tallo', '{n} stem', '{n} haste'],
    ['{$} c/u', '{$} each', '{$} cada'],
    ['flor|Rosa', 'Rose', 'Rosa'],
    ['Peonía', 'Peony', 'Peônia'],
    ['Tulipán', 'Tulip', 'Tulipa'],
    ['Girasol', 'Sunflower', 'Girassol'],
    ['Lilium', 'Lily', 'Lírio'],
    ['Hortensia', 'Hydrangea', 'Hortênsia'],
    ['Margarita', 'Daisy', 'Margarida'],
    ['Anémona', 'Anemone', 'Anêmona'],
    ['Clavel', 'Carnation', 'Cravo'],
    ['Kraft', 'Kraft', 'Kraft'],
    ['Seda marfil', 'Ivory silk', 'Seda marfim'],
    ['Rosa empolvado', 'Dusty pink', 'Rosa antigo'],
    ['Salvia', 'Sage', 'Sálvia'],
    ['Noche', 'Night', 'Noite'],
    ['Total', 'Total', 'Total'],
    ['Sorprendeme', 'Surprise me', 'Me surpreenda'],
    ['Elegí al menos {n} tallos', 'Choose at least {n} stems', 'Escolha pelo menos {n} hastes'],
    ['Sumá flores para ver tu ramo', 'Add flowers to see your bouquet', 'Adicione flores para ver seu buquê'],
    ['{n} tallos · se arma con eucalipto y papel kraft', '{n} stems · made with eucalyptus and kraft paper', '{n} hastes · montado com eucalipto e papel kraft'],
    ['{n} tallos · se arma con eucalipto y papel seda marfil', '{n} stems · made with eucalyptus and ivory silk paper', '{n} hastes · montado com eucalipto e papel seda marfim'],
    ['{n} tallos · se arma con eucalipto y papel rosa empolvado', '{n} stems · made with eucalyptus and dusty pink paper', '{n} hastes · montado com eucalipto e papel rosa antigo'],
    ['{n} tallos · se arma con eucalipto y papel salvia', '{n} stems · made with eucalyptus and sage paper', '{n} hastes · montado com eucalipto e papel sálvia'],
    ['{n} tallos · se arma con eucalipto y papel noche', '{n} stems · made with eucalyptus and night paper', '{n} hastes · montado com eucalipto e papel noite'],
    ['Tu ramo de autor', 'Your signature bouquet', 'Seu buquê autoral'],
    ['Tu ramo está en el carrito', 'Your bouquet is in the cart', 'Seu buquê está no carrinho'],
    ['Lo armamos tal cual lo diseñaste', 'We’ll make it exactly as you designed it', 'Montamos exatamente como você criou'],
    ['Tu ramo personalizado', 'Your custom bouquet', 'Seu buquê personalizado'],
    ['{n} rosa', '{n} rose', '{n} rosa'], ['{n} peonía', '{n} peony', '{n} peônia'], ['{n} tulipán', '{n} tulip', '{n} tulipa'],
    ['{n} girasol', '{n} sunflower', '{n} girassol'], ['{n} lilium', '{n} lily', '{n} lírio'], ['{n} hortensia', '{n} hydrangea', '{n} hortênsia'],
    ['{n} margarita', '{n} daisy', '{n} margarida'], ['{n} anémona', '{n} anemone', '{n} anêmona'], ['{n} clavel', '{n} carnation', '{n} cravo'],
    ['papel kraft', 'kraft paper', 'papel kraft'], ['papel seda marfil', 'ivory silk paper', 'papel seda marfim'], ['papel rosa empolvado', 'dusty pink paper', 'papel rosa antigo'],
    ['papel salvia', 'sage paper', 'papel sálvia'], ['papel noche', 'night paper', 'papel noite'],

    // Suscripción
    ['Flores frescas,', 'Fresh flowers,', 'Flores frescas,'],
    ['siempre', 'always', 'sempre'],
    ['Un ramo de estación diseñado por nuestros floristas, en tu puerta con la frecuencia que elijas. Sin permanencia.', 'A seasonal bouquet designed by our florists, at your door as often as you like. No commitment.', 'Um buquê da estação criado pelas nossas floristas, na sua porta com a frequência que você escolher. Sem fidelidade.'],
    ['El más elegido', 'Most popular', 'O mais escolhido'],
    ['Cada {n} días', 'Every {n} days', 'A cada {n} dias'],
    ['Cada semana', 'Every week', 'Toda semana'],
    ['Una vez al mes', 'Once a month', 'Uma vez por mês'],
    ['Esencial', 'Essential', 'Essencial'],
    ['Florista', 'Florist', 'Florista'],
    ['Detalle', 'Treat', 'Mimo'],
    ['por envío', 'per delivery', 'por entrega'],
    ['Ramo de estación mediano', 'Medium seasonal bouquet', 'Buquê da estação médio'],
    ['Ramo de estación grande', 'Large seasonal bouquet', 'Buquê da estação grande'],
    ['Ramo de autor premium', 'Premium signature bouquet', 'Buquê autoral premium'],
    ['Envío incluido', 'Delivery included', 'Entrega incluída'],
    ['Pausá cuando quieras', 'Pause anytime', 'Pause quando quiser'],
    ['Florero de regalo en el {n}er envío', 'Free vase with your first delivery', 'Vaso de presente na {n}ª entrega'],
    ['{n}% off en la tienda', '{n}% off in the shop', '{n}% de desconto na loja'],
    ['Tarjeta personalizada', 'Personalized card', 'Cartão personalizado'],
    ['Suscribirme', 'Subscribe', 'Assinar'],
    ['Suscripción agregada', 'Subscription added', 'Assinatura adicionada'],
    ['primer envío', 'first delivery', 'primeira entrega'],
    ['cada {n} días', 'every {n} days', 'a cada {n} dias'],
    ['cada semana', 'every week', 'toda semana'],
    ['una vez al mes', 'once a month', 'uma vez por mês'],

    // Significados
    ['El lenguaje de las flores', 'The language of flowers', 'A linguagem das flores'],
    ['¿Qué <em>dice</em> cada flor?', 'What does each flower <em>say</em>?', 'O que cada flor <em>diz</em>?'],
    ['Desde la época victoriana, cada flor tiene un mensaje. Tocá una para descubrirlo.', 'Since Victorian times, every flower carries a message. Tap one to find out.', 'Desde a era vitoriana, cada flor tem uma mensagem. Toque em uma para descobrir.'],
    ['Rosa roja', 'Red rose', 'Rosa vermelha'],
    ['Amor apasionado y admiración profunda.', 'Passionate love and deep admiration.', 'Amor apaixonado e profunda admiração.'],
    ['Alegría, lealtad y buena energía.', 'Joy, loyalty and good energy.', 'Alegria, lealdade e boa energia.'],
    ['Prosperidad, romance y matrimonio feliz.', 'Prosperity, romance and a happy marriage.', 'Prosperidade, romance e casamento feliz.'],
    ['Lilium blanco', 'White lily', 'Lírio branco'],
    ['Pureza, paz y acompañamiento.', 'Purity, peace and support.', 'Pureza, paz e companhia.'],
    ['Amor perfecto y nuevos comienzos.', 'Perfect love and new beginnings.', 'Amor perfeito e novos começos.'],
    ['Gratitud sincera y comprensión.', 'Sincere gratitude and understanding.', 'Gratidão sincera e compreensão.'],

    // Reseñas
    ['Clientes', 'Customers', 'Clientes'],
    ['Lo que', 'What they', 'O que'],
    ['nos dicen', 'tell us', 'nos dizem'],
    ['Anterior', 'Previous', 'Anterior'],
    ['Siguiente', 'Next', 'Próximo'],
    ['Compró', 'Bought', 'Comprou'],
    ['Plan Florista', 'Florist plan', 'Plano Florista'],
    ['“Pedí a las {n} y a las {n} ya estaban en la oficina de mi mamá. Las rosas duraron casi dos semanas.”', '“I ordered at {n} and by {n} they were at my mom’s office. The roses lasted almost two weeks.”', '“Pedi às {n} e às {n} já estavam no escritório da minha mãe. As rosas duraram quase duas semanas.”'],
    ['“Armé mi propio ramo con peonías y tulipanes y llegó idéntico a la vista previa. Impecable.”', '“I built my own bouquet with peonies and tulips and it arrived exactly like the preview. Flawless.”', '“Montei meu próprio buquê com peônias e tulipas e chegou idêntico à prévia. Impecável.”'],
    ['“La suscripción semanal me cambió la casa. Cada viernes es una sorpresa distinta.”', '“The weekly subscription changed my home. Every Friday is a new surprise.”', '“A assinatura semanal mudou a minha casa. Toda sexta-feira é uma surpresa diferente.”'],
    ['“Atención por WhatsApp rapidísima. Me ayudaron a elegir para un aniversario y fue un éxito.”', '“Super fast WhatsApp service. They helped me choose for an anniversary and it was a hit.”', '“Atendimento super rápido pelo WhatsApp. Me ajudaram a escolher para um aniversário de casamento e foi um sucesso.”'],
    ['“La caja es preciosa y la reutilicé. El seguimiento del pedido en tiempo real es un golazo.”', '“The box is gorgeous and I reused it. Real-time order tracking is a winner.”', '“A caixa é linda e eu reutilizei. O acompanhamento do pedido em tempo real é demais.”'],

    // Atelier
    ['Nuestro espacio', 'Our studio', 'Nosso espaço'],
    ['Visitá nuestro', 'Visit our', 'Visite nosso'],
    ['atelier', 'atelier', 'ateliê'],
    ['Somos floristería y vivero. Vení a elegir tus plantas, encargar el ramo de tu boda o simplemente a oler las flores de la semana.', 'We are a florist and plant nursery. Come pick your plants, order your wedding bouquet or simply smell this week’s flowers.', 'Somos floricultura e viveiro. Venha escolher suas plantas, encomendar o buquê do seu casamento ou simplesmente sentir o perfume das flores da semana.'],
    ['Floristería & vivero', 'Florist & nursery', 'Floricultura & viveiro'],
    ['Plantas, flores de estación y ramos de novia a medida', 'Plants, seasonal flowers and custom bridal bouquets', 'Plantas, flores da estação e buquês de noiva sob medida'],
    ['Cómo llegar', 'Get directions', 'Como chegar'],
    ['Florero con peonías, tulipanes y orquídeas', 'Vase with peonies, tulips and orchids', 'Vaso com peônias, tulipas e orquídeas'],
    ['Horario', 'Opening hours', 'Horário'],

    // Preguntas frecuentes
    ['Preguntas', 'Frequently asked', 'Perguntas'],
    ['frecuentes', 'questions', 'frequentes'],
    ['¿No encontrás lo que buscás? Escribinos por WhatsApp y te respondemos en minutos.', 'Can’t find what you’re looking for? Message us on WhatsApp and we’ll reply in minutes.', 'Não encontrou o que procura? Fale conosco pelo WhatsApp e respondemos em minutos.'],
    ['¿Hacen ramos de novia?', 'Do you make bridal bouquets?', 'Vocês fazem buquês de noiva?'],
    ['Sí, es una de nuestras especialidades. Escribinos con al menos {n} semanas de anticipación: coordinamos una charla para conocer tu vestido, tu paleta y tu estilo, y diseñamos el ramo a medida. También hacemos boutonnieres y decoración floral.', 'Yes, it’s one of our specialties. Message us at least {n} weeks ahead: we’ll set up a chat to learn about your dress, palette and style, and design a bouquet just for you. We also make boutonnieres and floral decor.', 'Sim, é uma das nossas especialidades. Fale conosco com pelo menos {n} semanas de antecedência: marcamos uma conversa para conhecer seu vestido, sua paleta e seu estilo, e criamos o buquê sob medida. Também fazemos boutonnières e decoração floral.'],
    ['¿Hasta qué hora puedo pedir para que llegue hoy?', 'What time can I order for same-day delivery?', 'Até que horas posso pedir para chegar hoje?'],
    ['Los pedidos confirmados antes de las {n}:{n} se entregan el mismo día, de lunes a sábado, según disponibilidad.', 'Orders confirmed before {n}:{n} are delivered the same day, Monday to Saturday, subject to availability.', 'Pedidos confirmados antes das {n}:{n} são entregues no mesmo dia, de segunda a sábado, conforme disponibilidade.'],
    ['¿Cuánto cuesta el envío?', 'How much is delivery?', 'Quanto custa a entrega?'],
    ['Depende del barrio: lo elegís en el checkout y ves el costo antes de pagar. Si la entrega es en el día se suman {$} También podés retirar sin costo en nuestro local.', 'It depends on the neighborhood: you choose it at checkout and see the cost before paying. Same-day delivery adds {$} You can also pick up for free at our shop.', 'Depende do bairro: você escolhe no checkout e vê o custo antes de pagar. Entrega no mesmo dia soma {$} Você também pode retirar grátis na nossa loja.'],
    ['¿Puedo elegir la fecha y el horario de entrega?', 'Can I choose the delivery date and time?', 'Posso escolher a data e o horário da entrega?'],
    ['Sí. En el checkout elegís el día (hasta {n} días adelante) y una franja horaria de {n} horas.', 'Yes. At checkout you pick the day (up to {n} days ahead) and a {n}-hour time slot.', 'Sim. No checkout você escolhe o dia (até {n} dias à frente) e uma faixa de {n} horas.'],
    ['¿Las flores pueden ser distintas a la foto?', 'Can the flowers differ from the photo?', 'As flores podem ser diferentes da foto?'],
    ['Trabajamos con flor fresca de estación. Si alguna variedad no está disponible la reemplazamos por otra de igual o mayor valor, respetando la paleta.', 'We work with fresh seasonal flowers. If a variety isn’t available we replace it with one of equal or greater value, keeping the palette.', 'Trabalhamos com flores frescas da estação. Se alguma variedade não estiver disponível, trocamos por outra de valor igual ou maior, respeitando a paleta.'],
    ['¿Qué pasa si el destinatario no está?', 'What if the recipient isn’t home?', 'E se o destinatário não estiver?'],
    ['Te avisamos por WhatsApp y coordinamos una segunda entrega sin costo, o lo dejamos con portería si nos autorizás.', 'We’ll let you know on WhatsApp and arrange a second delivery at no cost, or leave it with the doorman if you allow us.', 'Avisamos pelo WhatsApp e combinamos uma segunda entrega sem custo, ou deixamos na portaria se você autorizar.'],
    ['¿Cuánto duran las flores?', 'How long do the flowers last?', 'Quanto tempo as flores duram?'],
    ['Garantizamos {n} días de frescura. Si algo no está bien, mandanos una foto en las primeras {n} horas y lo reponemos.', 'We guarantee {n} days of freshness. If something isn’t right, send us a photo within the first {n} hours and we’ll replace it.', 'Garantimos {n} dias de frescor. Se algo não estiver bem, mande uma foto nas primeiras {n} horas e trocamos.'],

    // Newsletter y pie
    ['{n}% off en tu primera compra', '{n}% off your first order', '{n}% de desconto na primeira compra'],
    ['Sumate al club FlorLatte: novedades de temporada, cuidados y descuentos exclusivos.', 'Join the FlorLatte club: seasonal news, care tips and exclusive discounts.', 'Entre para o clube FlorLatte: novidades da estação, cuidados e descontos exclusivos.'],
    ['Tu email', 'Your email', 'Seu e-mail'],
    ['tu@email.com', 'you@email.com', 'voce@email.com'],
    ['Quiero mi {n}%', 'I want my {n}%', 'Quero meus {n}%'],
    ['Revisá tu email', 'Check your email', 'Confira seu e-mail'],
    ['Escribilo con el formato nombre@dominio.com', 'Use the format name@domain.com', 'Use o formato nome@dominio.com'],
    ['¡Bienvenida al club!', 'Welcome to the club!', 'Boas-vindas ao clube!'],
    ['Tu código: BIENVENIDA{n} ({n}% off)', 'Your code: BIENVENIDA{n} ({n}% off)', 'Seu código: BIENVENIDA{n} ({n}% de desconto)'],
    ['Atelier botánico. Floristería & vivero en Las Piedras. Hecho con amor en nuestro espacio.', 'Botanical atelier. Florist & plant nursery in Las Piedras. Handmade with love in our studio.', 'Ateliê botânico. Floricultura & viveiro em Las Piedras. Feito com amor no nosso espaço.'],
    ['Instagram de FlorLatte', 'FlorLatte on Instagram', 'FlorLatte no Instagram'],
    ['Threads de FlorLatte', 'FlorLatte on Threads', 'FlorLatte no Threads'],
    ['Envíos y entregas', 'Shipping & delivery', 'Envios e entregas'],
    ['Cuidado de tus flores', 'Flower care', 'Cuidado das suas flores'],
    ['Cambios y garantía', 'Returns & guarantee', 'Trocas e garantia'],
    ['Preguntas frecuentes', 'FAQ', 'Perguntas frequentes'],
    ['Visitanos', 'Visit us', 'Visite-nos'],
    ['Las Piedras, Canelones, Uruguay', 'Las Piedras, Canelones, Uruguay', 'Las Piedras, Canelones, Uruguai'],
    ['FlorLatte Plantas y Flores. Todos los derechos reservados.', 'FlorLatte Plants & Flowers. All rights reserved.', 'FlorLatte Plantas e Flores. Todos os direitos reservados.'],
    ['Medios de pago', 'Payment methods', 'Formas de pagamento'],
    ['Transferencia', 'Bank transfer', 'Transferência'],

    // Pop-up de bienvenida
    ['Bienvenida', 'Welcome', 'Boas-vindas'],
    ['Tu primer ramo con', 'Your first bouquet with', 'Seu primeiro buquê com'],
    ['{n}% off', '{n}% off', '{n}% de desconto'],
    ['Usá este código en el checkout. Vale para toda la tienda.', 'Use this code at checkout. Valid on the whole shop.', 'Use este código no checkout. Vale para toda a loja.'],
    ['Empezar a comprar', 'Start shopping', 'Começar a comprar'],

    // Checkout
    ['Tus datos', 'Your details', 'Seus dados'],
    ['Entrega', 'Delivery', 'Entrega'],
    ['Dedicatoria', 'Message', 'Dedicatória'],
    ['Pago', 'Payment', 'Pagamento'],
    ['¿Quién envía y quién recibe?', 'Who’s sending and who’s receiving?', 'Quem envia e quem recebe?'],
    ['Te mandamos la confirmación y el seguimiento por email y WhatsApp.', 'We’ll send the confirmation and updates by email and WhatsApp.', 'Enviamos a confirmação e o acompanhamento por e-mail e WhatsApp.'],
    ['Nombre y apellido', 'Full name', 'Nome e sobrenome'],
    ['Email', 'Email', 'E-mail'],
    ['Celular', 'Mobile', 'Celular'],
    ['Quién recibe', 'Recipient', 'Quem recebe'],
    ['Nombre del destinatario', 'Recipient’s name', 'Nome do destinatário'],
    ['Celular del destinatario', 'Recipient’s mobile', 'Celular do destinatário'],
    ['(opcional)', '(optional)', '(opcional)'],
    ['Solo lo usamos si no encontramos la dirección.', 'We only use it if we can’t find the address.', 'Só usamos se não encontrarmos o endereço.'],
    ['Completá este campo.', 'Please fill in this field.', 'Preencha este campo.'],
    ['Ingresá un email válido, por ejemplo ana@email.com.', 'Enter a valid email, for example ana@email.com.', 'Digite um e-mail válido, por exemplo ana@email.com.'],
    ['Ingresá un celular de al menos {n} dígitos.', 'Enter a mobile number with at least {n} digits.', 'Digite um celular com pelo menos {n} dígitos.'],
    ['Seguir comprando', 'Keep shopping', 'Continuar comprando'],
    ['Continuar', 'Continue', 'Continuar'],
    ['Volver', 'Back', 'Voltar'],
    ['¿Cuándo y dónde?', 'When and where?', 'Quando e onde?'],
    ['Entregamos de lunes a sábado. Los domingos el taller descansa.', 'We deliver Monday to Saturday. On Sundays the studio rests.', 'Entregamos de segunda a sábado. Aos domingos o ateliê descansa.'],
    ['Día de entrega', 'Delivery day', 'Dia da entrega'],
    ['Hoy', 'Today', 'Hoje'],
    ['Forma de entrega', 'Delivery method', 'Forma de entrega'],
    ['Envío a domicilio', 'Home delivery', 'Entrega em domicílio'],
    ['El costo depende de tu barrio · entrega en el día +{$}', 'Cost depends on your neighborhood · same-day delivery +{$}', 'O custo depende do seu bairro · entrega no mesmo dia +{$}'],
    ['El costo depende de tu barrio', 'Cost depends on your neighborhood', 'O custo depende do seu bairro'],
    ['Por ahora no tenemos envíos online: escribinos por WhatsApp', 'Online delivery isn’t available yet: message us on WhatsApp', 'Por enquanto não temos entregas online: fale conosco pelo WhatsApp'],
    ['Retiro en el local', 'Pickup at the shop', 'Retirada na loja'],
    ['Gratis', 'Free', 'Grátis'],
    ['Barrio de entrega', 'Delivery neighborhood', 'Bairro da entrega'],
    ['¿En qué barrio entregamos?', 'Which neighborhood do we deliver to?', 'Em qual bairro entregamos?'],
    ['Elegí el barrio…', 'Choose the neighborhood…', 'Escolha o bairro…'],
    ['Elegí el barrio de entrega.', 'Choose the delivery neighborhood.', 'Escolha o bairro da entrega.'],
    ['Si la entrega es para hoy se suman {$} ¿Tu barrio no está? Escribinos por WhatsApp y lo coordinamos.', 'Same-day delivery adds {$} Neighborhood not listed? Message us on WhatsApp and we’ll arrange it.', 'Se a entrega for hoje, soma {$} Seu bairro não está? Fale conosco pelo WhatsApp e combinamos.'],
    ['Franja horaria', 'Time slot', 'Faixa de horário'],
    ['Elegí una franja horaria para continuar.', 'Choose a time slot to continue.', 'Escolha uma faixa de horário para continuar.'],
    ['Dirección', 'Address', 'Endereço'],
    ['Calle, número y apartamento', 'Street, number and apartment', 'Rua, número e apartamento'],
    ['Calle {n}, apto {n}', 'Street {n}, apt {n}', 'Rua {n}, apto {n}'],
    ['Indicaciones para el repartidor', 'Notes for the courier', 'Instruções para o entregador'],
    ['Timbre {n}, dejar en portería si no está…', 'Doorbell {n}, leave with the doorman if not home…', 'Campainha {n}, deixar na portaria se não estiver…'],
    ['Envío:', 'Shipping:', 'Envio:'],
    ['Gratis (retiro)', 'Free (pickup)', 'Grátis (retirada)'],
    ['elegí tu barrio', 'choose your neighborhood', 'escolha seu bairro'],
    ['Envío (retiro)', 'Shipping (pickup)', 'Envio (retirada)'],
    ['Según barrio', 'By neighborhood', 'Conforme o bairro'],
    ['Escribí tu dedicatoria', 'Write your message', 'Escreva sua dedicatória'],
    ['La imprimimos en papel de algodón y va en un sobre cerrado.', 'We print it on cotton paper and it goes in a sealed envelope.', 'Imprimimos em papel de algodão e vai em um envelope fechado.'],
    ['Diseño de tarjeta', 'Card design', 'Modelo do cartão'],
    ['Clásica', 'Classic', 'Clássico'],
    ['Botánica', 'Botanical', 'Botânico'],
    ['Celebración', 'Celebration', 'Celebração'],
    ['Mensaje', 'Message', 'Mensagem'],
    ['Escribí algo lindo…', 'Write something lovely…', 'Escreva algo bonito…'],
    ['Ideas: tocá una para usarla', 'Ideas: tap one to use it', 'Ideias: toque em uma para usar'],
    ['Feliz cumpleaños, que este…', 'Happy birthday, may this…', 'Feliz aniversário, que este…'],
    ['Gracias por estar siempre.', 'Thank you for always being there.', 'Obrigado por estar sempre aqui.'],
    ['Te quiero hoy y todos los …', 'I love you today and every …', 'Te amo hoje e todos os …'],
    ['Mucha fuerza. Te abrazo a …', 'Sending strength. A hug from …', 'Muita força. Um abraço de …'],
    ['¡Bienvenido al mundo, chiq…', 'Welcome to the world, little…', 'Bem-vindo ao mundo, pequen…'],
    ['Firma', 'Signature', 'Assinatura'],
    ['Con amor, Ana', 'With love, Ana', 'Com amor, Ana'],
    ['Enviar como anónimo', 'Send anonymously', 'Enviar como anônimo'],
    ['Vista previa', 'Preview', 'Prévia'],
    ['Tu mensaje aparece acá…', 'Your message appears here…', 'Sua mensagem aparece aqui…'],
    ['Alguien que te quiere', 'Someone who loves you', 'Alguém que te ama'],
    ['De', 'From', 'De'],
    ['Tu firma', 'Your signature', 'Sua assinatura'],
    ['Elegí cómo querés pagar.', 'Choose how you want to pay.', 'Escolha como quer pagar.'],
    ['Medio de pago', 'Payment method', 'Forma de pagamento'],
    ['Tarjetas de crédito y débito, saldo de Mercado Pago, Abitab o RedPagos', 'Credit and debit cards, Mercado Pago balance, Abitab or RedPagos', 'Cartões de crédito e débito, saldo do Mercado Pago, Abitab ou RedPagos'],
    ['Recomendado', 'Recommended', 'Recomendado'],
    ['Transferencia bancaria', 'Bank transfer', 'Transferência bancária'],
    ['Te mostramos los datos al confirmar. Preparamos tu pedido cuando recibimos el comprobante.', 'We’ll show you the details when you confirm. We prepare your order once we get the receipt.', 'Mostramos os dados ao confirmar. Preparamos seu pedido quando recebermos o comprovante.'],
    ['Vas a pagar en el sitio seguro de Mercado Pago. Nosotros nunca vemos los datos de tu tarjeta.', 'You’ll pay on Mercado Pago’s secure site. We never see your card details.', 'Você vai pagar no site seguro do Mercado Pago. Nós nunca vemos os dados do seu cartão.'],
    ['Te mandamos la confirmación por email con los datos para transferir.', 'We’ll email you the confirmation with the transfer details.', 'Enviamos a confirmação por e-mail com os dados para transferência.'],
    ['Pagar {$} con Mercado Pago', 'Pay {$} with Mercado Pago', 'Pagar {$} com Mercado Pago'],
    ['Confirmar pedido · {$}', 'Confirm order · {$}', 'Confirmar pedido · {$}'],
    ['Procesando…', 'Processing…', 'Processando…'],
    ['Tu pedido', 'Your order', 'Seu pedido'],
    ['Pago protegido · Garantía de frescura {n} días', 'Secure payment · {n}-day freshness guarantee', 'Pagamento protegido · Garantia de frescor de {n} dias'],
    ['Vista previa sin servidor:', 'Offline preview:', 'Prévia sem servidor:'],
    ['el pago se simula. Publicada en Netlify, este paso te lleva a Mercado Pago.', 'payment is simulated. Once published, this step takes you to Mercado Pago.', 'o pagamento é simulado. Publicada, esta etapa leva você ao Mercado Pago.'],
    ['Procesando tu pago…', 'Processing your payment…', 'Processando seu pagamento…'],
    ['No cierres esta ventana.', 'Don’t close this window.', 'Não feche esta janela.'],
    ['Te llevamos a Mercado Pago…', 'Taking you to Mercado Pago…', 'Levando você ao Mercado Pago…'],
    ['Cuando termines de pagar volvés automáticamente a la tienda.', 'When you finish paying you’ll come back to the shop automatically.', 'Ao terminar de pagar você volta automaticamente para a loja.'],
    ['Confirmando tu pago…', 'Confirming your payment…', 'Confirmando seu pagamento…'],
    ['Estamos verificando el pago con Mercado Pago.', 'We’re checking the payment with Mercado Pago.', 'Estamos verificando o pagamento com o Mercado Pago.'],
    ['No pudimos conectarnos. Revisá tu conexión a internet e intentá de nuevo.', 'We couldn’t connect. Check your internet connection and try again.', 'Não conseguimos conectar. Verifique sua internet e tente de novo.'],
    ['La tienda todavía no está conectada a la planilla. Escribinos para hacer tu pedido.', 'The shop isn’t connected yet. Message us to place your order.', 'A loja ainda não está conectada. Fale conosco para fazer seu pedido.'],
    ['No pudimos crear tu pedido. Intentá de nuevo en unos minutos.', 'We couldn’t create your order. Please try again in a few minutes.', 'Não conseguimos criar seu pedido. Tente de novo em alguns minutos.'],

    ['Entregamos todos los días, también los domingos.', 'We deliver every day, Sundays included.', 'Entregamos todos os dias, inclusive aos domingos.'],
    ['Tarjeta', 'Card', 'Cartão'],
    ['Crédito o débito, a través de Mercado Pago. También saldo de Mercado Pago, Abitab o RedPagos.', 'Credit or debit, through Mercado Pago. Mercado Pago balance, Abitab or RedPagos also accepted.', 'Crédito ou débito, pelo Mercado Pago. Também saldo do Mercado Pago, Abitab ou RedPagos.'],
    ['PayPal', 'PayPal', 'PayPal'],
    ['Pagás en dólares con tu cuenta PayPal o tarjeta internacional.', 'Pay in US dollars with your PayPal account or an international card.', 'Pague em dólares com sua conta PayPal ou cartão internacional.'],
    ['Vas a pagar en el sitio seguro de PayPal. Tipo de cambio: {n} US$ = {$}', 'You’ll pay on PayPal’s secure site. Exchange rate: {n} US$ = {$}', 'Você vai pagar no site seguro do PayPal. Câmbio: {n} US$ = {$}'],
    ['Pagar US{$} con PayPal', 'Pay US{$} with PayPal', 'Pagar US{$} com PayPal'],
    ['Pagar {$} con tarjeta', 'Pay {$} by card', 'Pagar {$} com cartão'],
    ['Te llevamos a PayPal…', 'Taking you to PayPal…', 'Levando você ao PayPal…'],
    ['Estamos verificando el pago con PayPal.', 'We’re checking the payment with PayPal.', 'Estamos verificando o pagamento com o PayPal.'],
    ['El pago con tarjeta todavía no está activado. Escribinos por WhatsApp para hacer tu pedido.', 'Card payments aren’t active yet. Message us on WhatsApp to place your order.', 'O pagamento com cartão ainda não está ativo. Fale conosco pelo WhatsApp para fazer seu pedido.'],
    ['El pago con PayPal todavía no está activado. Elegí tarjeta o escribinos.', 'PayPal payments aren’t active yet. Choose card or message us.', 'O pagamento com PayPal ainda não está ativo. Escolha cartão ou fale conosco.'],
    ['PayPal no respondió. Tu pedido quedó guardado: intentá de nuevo o pagá con tarjeta.', 'PayPal didn’t respond. Your order was saved: try again or pay by card.', 'O PayPal não respondeu. Seu pedido foi salvo: tente de novo ou pague com cartão.'],
    ['Mercado Pago no respondió. Tu pedido quedó guardado: intentá pagar de nuevo o elegí PayPal.', 'Mercado Pago didn’t respond. Your order was saved: try paying again or choose PayPal.', 'O Mercado Pago não respondeu. Seu pedido foi salvo: tente pagar de novo ou escolha PayPal.'],
    ['Los pedidos confirmados antes de las {n}:{n} se entregan el mismo día, todos los días de la semana, según disponibilidad.', 'Orders confirmed before {n}:{n} are delivered the same day, any day of the week, subject to availability.', 'Pedidos confirmados antes das {n}:{n} são entregues no mesmo dia, todos os dias da semana, conforme disponibilidade.'],
    ['No se hizo ningún cobro. Tu carrito sigue guardado: podés intentar de nuevo.', 'You were not charged. Your cart is still saved: you can try again.', 'Nenhuma cobrança foi feita. Seu carrinho continua salvo: você pode tentar de novo.'],

    // Resultado
    ['¡Gracias,', 'Thank you,', 'Obrigado,'],
    ['! Tu pedido', '! Your order', '! Seu pedido'],
    ['está en marcha', 'is on its way', 'está a caminho'],
    ['¡Listo! Tu pedido', 'Done! Your order', 'Pronto! Seu pedido'],
    ['quedó reservado', 'is reserved', 'está reservado'],
    ['Tu pago', 'Your payment', 'Seu pagamento'],
    ['está en proceso', 'is being processed', 'está em processamento'],
    ['El pago', 'The payment', 'O pagamento'],
    ['no se completó', 'didn’t go through', 'não foi concluído'],
    ['Pedido', 'Order', 'Pedido'],
    ['Te enviamos la confirmación a', 'We sent the confirmation to', 'Enviamos a confirmação para'],
    ['. Te avisamos cuando salga a reparto.', '. We’ll let you know when it’s out for delivery.', '. Avisamos quando sair para entrega.'],
    ['Transferí el total y mandanos el comprobante. Apenas lo confirmemos empezamos a preparar tus flores.', 'Transfer the total and send us the receipt. As soon as we confirm it, we’ll start preparing your flowers.', 'Transfira o total e nos envie o comprovante. Assim que confirmarmos, começamos a preparar suas flores.'],
    ['Si pagaste en Abitab o RedPagos puede demorar unas horas. Te avisamos por email cuando se acredite.', 'If you paid at Abitab or RedPagos it may take a few hours. We’ll email you once it clears.', 'Se você pagou no Abitab ou RedPagos pode levar algumas horas. Avisamos por e-mail quando for creditado.'],
    ['No se hizo ningún cobro. Tu carrito sigue guardado: podés intentar de nuevo o elegir transferencia.', 'You were not charged. Your cart is still saved: you can try again or choose bank transfer.', 'Nenhuma cobrança foi feita. Seu carrinho continua salvo: você pode tentar de novo ou escolher transferência.'],
    ['Pagado', 'Paid', 'Pago'],
    ['En preparación', 'Being prepared', 'Em preparação'],
    ['En camino', 'On the way', 'A caminho'],
    ['Entregado', 'Delivered', 'Entregue'],
    ['Banco', 'Bank', 'Banco'],
    ['Cuenta', 'Account', 'Conta'],
    ['Titular', 'Account holder', 'Titular'],
    ['Importe', 'Amount', 'Valor'],
    ['Referencia', 'Reference', 'Referência'],
    ['A completar', 'To be confirmed', 'A confirmar'],
    ['Para', 'To', 'Para'],
    ['Sin mensaje', 'No message', 'Sem mensagem'],
    ['retiro en el local', 'pickup at the shop', 'retirada na loja'],
    ['Intentar de nuevo', 'Try again', 'Tentar de novo'],
    ['Volver a la tienda', 'Back to the shop', 'Voltar para a loja'],

    // Errores que devuelve la planilla
    ['El carrito está vacío.', 'Your cart is empty.', 'Seu carrinho está vazio.'],
    ['Uno de los productos ya no está disponible. Revisá tu carrito.', 'One of the items is no longer available. Please check your cart.', 'Um dos produtos não está mais disponível. Confira seu carrinho.'],
    ['Tu ramo personalizado necesita al menos {n} tallos.', 'Your custom bouquet needs at least {n} stems.', 'Seu buquê personalizado precisa de pelo menos {n} hastes.'],
    ['Elegí un barrio de envío válido.', 'Choose a valid delivery neighborhood.', 'Escolha um bairro de entrega válido.'],
    ['Hiciste muchos pedidos seguidos. Esperá unos minutos o escribinos.', 'You’ve placed many orders in a row. Wait a few minutes or message us.', 'Você fez muitos pedidos seguidos. Aguarde alguns minutos ou fale conosco.'],
    ['El pago con Mercado Pago todavía no está activado. Elegí transferencia o escribinos.', 'Mercado Pago payments aren’t active yet. Choose bank transfer or message us.', 'O pagamento com Mercado Pago ainda não está ativo. Escolha transferência ou fale conosco.'],
    ['No pudimos identificar la tienda. Recargá la página e intentá de nuevo.', 'We couldn’t identify the shop. Reload the page and try again.', 'Não conseguimos identificar a loja. Recarregue a página e tente de novo.'],
    ['Mercado Pago no respondió. Tu pedido quedó guardado: intentá pagar de nuevo o elegí transferencia.', 'Mercado Pago didn’t respond. Your order was saved: try paying again or choose bank transfer.', 'O Mercado Pago não respondeu. Seu pedido foi salvo: tente pagar de novo ou escolha transferência.'],
    ['No pudimos procesar el pedido. Intentá de nuevo en unos minutos.', 'We couldn’t process the order. Please try again in a few minutes.', 'Não conseguimos processar o pedido. Tente de novo em alguns minutos.'],

    // Productos del catálogo
    ['Ramo de Novia Rosé', 'Rosé Bridal Bouquet', 'Buquê de Noiva Rosé'],
    ['Rosas rosa pálido, lisianthus y eucalipto, atado a mano con cinta de raso. Lo diseñamos junto a vos según tu vestido y tu estilo.', 'Pale pink roses, lisianthus and eucalyptus, hand-tied with satin ribbon. We design it with you to match your dress and style.', 'Rosas rosa-claro, lisianthus e eucalipto, amarrado à mão com fita de cetim. Criamos junto com você conforme seu vestido e seu estilo.'],
    ['rosas · lisianthus · eucalipto · cinta de raso', 'roses · lisianthus · eucalyptus · satin ribbon', 'rosas · lisianthus · eucalipto · fita de cetim'],
    ['Ramo de Novia Lilium', 'Lily Bridal Bouquet', 'Buquê de Noiva Lírio'],
    ['Lilium y rosas blancas con verdes de estación. Clásico, luminoso y con un perfume suave que acompaña todo el día.', 'Lilies and white roses with seasonal greenery. Classic, luminous and with a soft scent that lasts all day.', 'Lírios e rosas brancas com folhagens da estação. Clássico, luminoso e com um perfume suave que acompanha o dia todo.'],
    ['lilium · rosas blancas · ruscus', 'lilies · white roses · ruscus', 'lírios · rosas brancas · ruscus'],
    ['Ramo de Novia Orquídeas', 'Orchid Bridal Bouquet', 'Buquê de Noiva Orquídeas'],
    ['Orquídeas, tulipanes y paniculata en tonos blush. Delicado y distinto, inspirado en nuestro logo.', 'Orchids, tulips and baby’s breath in blush tones. Delicate and different, inspired by our logo.', 'Orquídeas, tulipas e mosquitinho em tons blush. Delicado e diferente, inspirado no nosso logo.'],
    ['orquídeas · tulipanes · paniculata · eucalipto', 'orchids · tulips · baby’s breath · eucalyptus', 'orquídeas · tulipas · mosquitinho · eucalipto'],
    ['Rosas Eternas', 'Eternal Roses', 'Rosas Eternas'],
    ['Doce rosas rojas de tallo largo, envueltas en papel kraft con lazo de raso verde botella. El clásico que nunca falla.', 'Twelve long-stemmed red roses wrapped in kraft paper with a bottle-green satin bow. The classic that never fails.', 'Doze rosas vermelhas de haste longa, embrulhadas em papel kraft com laço de cetim verde-garrafa. O clássico que nunca falha.'],
    ['{n} rosas Freedom · eucalipto · gypsophila', '{n} Freedom roses · eucalyptus · gypsophila', '{n} rosas Freedom · eucalipto · gipsófila'],
    ['Jardín de Peonías', 'Peony Garden', 'Jardim de Peônias'],
    ['Peonías Sarah Bernhardt en su punto justo de apertura, con eucalipto plateado. Temporada limitada.', 'Sarah Bernhardt peonies at just the right bloom, with silver eucalyptus. Limited season.', 'Peônias Sarah Bernhardt no ponto certo de abertura, com eucalipto prateado. Temporada limitada.'],
    ['{n} peonías · {n} rosas spray · eucalipto baby blue', '{n} peonies · {n} spray roses · baby blue eucalyptus', '{n} peônias · {n} rosas spray · eucalipto baby blue'],
    ['Sol de Mañana', 'Morning Sun', 'Sol da Manhã'],
    ['Girasoles y margaritas que levantan cualquier día. Ideal para cumpleaños y felicitaciones.', 'Sunflowers and daisies that brighten any day. Perfect for birthdays and congratulations.', 'Girassóis e margaridas que alegram qualquer dia. Ideal para aniversários e parabéns.'],
    ['{n} girasoles · {n} margaritas · follaje de estación', '{n} sunflowers · {n} daisies · seasonal greenery', '{n} girassóis · {n} margaridas · folhagem da estação'],
    ['Blanco Sereno', 'Serene White', 'Branco Sereno'],
    ['Lilium y rosas blancas en una composición sobria y luminosa, para acompañar con respeto.', 'Lilies and white roses in a sober, luminous arrangement, to offer comfort with respect.', 'Lírios e rosas brancas em uma composição sóbria e luminosa, para acompanhar com respeito.'],
    ['{n} lilium · {n} rosas blancas · ruscus', '{n} lilies · {n} white roses · ruscus', '{n} lírios · {n} rosas brancas · ruscus'],
    ['Caja Rosé', 'Rosé Box', 'Caixa Rosé'],
    ['Sombrerera de terciopelo con rosas en tonos blush. Lista para regalar, no necesita florero.', 'Velvet hatbox with blush-toned roses. Ready to give, no vase needed.', 'Chapeleira de veludo com rosas em tons blush. Pronta para presentear, não precisa de vaso.'],
    ['{n} rosas · gypsophila · caja reutilizable', '{n} roses · gypsophila · reusable box', '{n} rosas · gipsófila · caixa reutilizável'],
    ['Tulipanes de Ámsterdam', 'Amsterdam Tulips', 'Tulipas de Amsterdã'],
    ['Tulipanes importados en una paleta alegre de coral, rosa y blanco. Se siguen abriendo en casa.', 'Imported tulips in a cheerful palette of coral, pink and white. They keep opening at home.', 'Tulipas importadas em uma paleta alegre de coral, rosa e branco. Continuam abrindo em casa.'],
    ['{n} tulipanes holandeses', '{n} Dutch tulips', '{n} tulipas holandesas'],
    ['Lavanda & Miel', 'Lavender & Honey', 'Lavanda & Mel'],
    ['Lavanda perfumada con margaritas crema. Un ramo campestre que aromatiza toda la casa.', 'Fragrant lavender with cream daisies. A country bouquet that scents the whole house.', 'Lavanda perfumada com margaridas creme. Um buquê campestre que perfuma a casa toda.'],
    ['lavanda fresca · margaritas · paniculata', 'fresh lavender · daisies · baby’s breath', 'lavanda fresca · margaridas · mosquitinho'],
    ['Orquídea Phalaenopsis', 'Phalaenopsis Orchid', 'Orquídea Phalaenopsis'],
    ['Orquídea de dos varas en maceta de cerámica. Florece durante meses con riego semanal.', 'Two-stem orchid in a ceramic pot. Blooms for months with weekly watering.', 'Orquídea de duas hastes em vaso de cerâmica. Floresce por meses com rega semanal.'],
    ['{n} varas · maceta de cerámica {n}cm', '{n} stems · {n}cm ceramic pot', '{n} hastes · vaso de cerâmica {n}cm'],
    ['Monstera Deliciosa', 'Monstera Deliciosa', 'Monstera Deliciosa'],
    ['La planta de interior favorita: hojas grandes y caladas en maceta de terracota.', 'Everyone’s favorite houseplant: large split leaves in a terracotta pot.', 'A planta de interior favorita: folhas grandes e recortadas em vaso de terracota.'],
    ['planta de {n}cm · maceta de terracota {n}cm', '{n}cm plant · {n}cm terracotta pot', 'planta de {n}cm · vaso de terracota {n}cm'],
    ['Hortensias Azules', 'Blue Hydrangeas', 'Hortênsias Azuis'],
    ['Hortensias de estación en florero de vidrio. Volumen y frescura en una pieza lista para exhibir.', 'Seasonal hydrangeas in a glass vase. Volume and freshness in a piece ready to display.', 'Hortênsias da estação em vaso de vidro. Volume e frescor em uma peça pronta para exibir.'],
    ['{n} hortensias · florero incluido', '{n} hydrangeas · vase included', '{n} hortênsias · vaso incluído'],
    ['Bienvenido Bebé', 'Welcome Baby', 'Bem-vindo Bebê'],
    ['Caja en tonos pastel para celebrar la llegada. Incluye tarjeta de bienvenida ilustrada.', 'Pastel-toned box to celebrate the new arrival. Includes an illustrated welcome card.', 'Caixa em tons pastel para celebrar a chegada. Inclui cartão de boas-vindas ilustrado.'],
    ['hortensias · rosas spray · margaritas', 'hydrangeas · spray roses · daisies', 'hortênsias · rosas spray · margaridas'],
    ['Pasión Infinita', 'Infinite Passion', 'Paixão Infinita'],
    ['Veinticuatro rosas rojas Explorer en caja negra de terciopelo. Para los momentos que se recuerdan.', 'Twenty-four red Explorer roses in a black velvet box. For moments to remember.', 'Vinte e quatro rosas vermelhas Explorer em caixa preta de veludo. Para os momentos inesquecíveis.'],
    ['{n} rosas Explorer · caja de terciopelo', '{n} Explorer roses · velvet box', '{n} rosas Explorer · caixa de veludo'],
    ['Atardecer Toscano', 'Tuscan Sunset', 'Pôr do Sol Toscano'],
    ['Rosas durazno, claveles coral y ranúnculos naranja. Cálido, vibrante y con mucho movimiento.', 'Peach roses, coral carnations and orange ranunculus. Warm, vibrant and full of movement.', 'Rosas pêssego, cravos coral e ranúnculos laranja. Quente, vibrante e cheio de movimento.'],
    ['{n} rosas · {n} claveles · {n} ranúnculos', '{n} roses · {n} carnations · {n} ranunculus', '{n} rosas · {n} cravos · {n} ranúnculos'],
    ['Jardín Silvestre', 'Wild Garden', 'Jardim Silvestre'],
    ['Anémonas, margaritas y lavanda como recién cortadas del campo. Cada ramo es distinto.', 'Anemones, daisies and lavender as if freshly picked from the field. Every bouquet is unique.', 'Anêmonas, margaridas e lavanda como recém-colhidas do campo. Cada buquê é único.'],
    ['anémonas · margaritas · lavanda · follaje silvestre', 'anemones · daisies · lavender · wild greenery', 'anêmonas · margaridas · lavanda · folhagem silvestre'],
    ['Trío de Suculentas', 'Succulent Trio', 'Trio de Suculentas'],
    ['Tres suculentas en una maceta de cerámica blanca. Casi no necesitan cuidados.', 'Three succulents in a white ceramic pot. They need almost no care.', 'Três suculentas em um vaso de cerâmica branca. Quase não precisam de cuidados.'],
    ['{n} suculentas · maceta {n}cm', '{n} succulents · {n}cm pot', '{n} suculentas · vaso {n}cm'],
    ['Sansevieria', 'Snake Plant', 'Espada-de-São-Jorge'],
    ['Purifica el aire y tolera la poca luz. La planta perfecta para oficinas y principiantes.', 'Purifies the air and tolerates low light. The perfect plant for offices and beginners.', 'Purifica o ar e tolera pouca luz. A planta perfeita para escritórios e iniciantes.'],
    ['planta de {n}cm · maceta {n}cm', '{n}cm plant · {n}cm pot', 'planta de {n}cm · vaso {n}cm'],
    ['Lirios Rosados', 'Pink Lilies', 'Lírios Rosados'],
    ['Lilium rosados de perfume intenso en florero de vidrio, con rosas spray y verdes.', 'Intensely fragrant pink lilies in a glass vase, with spray roses and greenery.', 'Lírios rosados de perfume intenso em vaso de vidro, com rosas spray e folhagens.'],
    ['{n} lilium · rosas spray · florero', '{n} lilies · spray roses · vase', '{n} lírios · rosas spray · vaso'],
    ['Mini Gracias', 'Mini Thank You', 'Mini Obrigado'],
    ['Un detalle chiquito con un mensaje enorme. Margaritas y paniculata en papel de seda.', 'A tiny gift with a huge message. Daisies and baby’s breath in tissue paper.', 'Um mimo pequenininho com uma mensagem enorme. Margaridas e mosquitinho em papel de seda.'],
    ['{n} margaritas · paniculata', '{n} daisies · baby’s breath', '{n} margaridas · mosquitinho'],
    ['Docena Blush', 'Blush Dozen', 'Dúzia Blush'],
    ['Doce rosas rosa pálido con eucalipto. Romántico, delicado y moderno.', 'Twelve pale pink roses with eucalyptus. Romantic, delicate and modern.', 'Doze rosas rosa-claro com eucalipto. Romântico, delicado e moderno.'],
    ['{n} rosas Pink Mondial · eucalipto', '{n} Pink Mondial roses · eucalyptus', '{n} rosas Pink Mondial · eucalipto'],
    ['Caja Arcoíris', 'Rainbow Box', 'Caixa Arco-íris'],
    ['Una explosión de color: girasoles, claveles, rosas y hortensias en caja kraft.', 'A burst of color: sunflowers, carnations, roses and hydrangeas in a kraft box.', 'Uma explosão de cores: girassóis, cravos, rosas e hortênsias em caixa kraft.'],
    ['{n} tallos variados · caja kraft', '{n} assorted stems · kraft box', '{n} hastes variadas · caixa kraft'],
    ['Arreglo floral', 'Floral arrangement', 'Arranjo floral'],
    ['Ramo de peonías y rosas', 'Peony and rose bouquet', 'Buquê de peônias e rosas'],
    ['Ramo de autor (armado por el cliente)', 'Signature bouquet (designed by the customer)', 'Buquê autoral (montado pelo cliente)']
  ];

  // Prefijos que se traducen solos y dejan el resto (ej. "Ver Rosas Eternas")
  const PREFIXES = ['Quitar filtro', 'Ver', 'Agregar', 'Quitar', 'Compró', 'Suscripción', 'Pedido', 'Descuento', 'Hasta'];

  const ws = s => s.replace(/\s+/g, ' ').trim();
  const TOK = /\$\s?[\d.]+|\d+(?:[.,]\d+)?/g;
  const keyOf = s => ws(s).replace(/\$\s?[\d.]+/g, '{$}').replace(/\d+(?:[.,]\d+)?/g, '{n}');
  const DICT = { en: new Map(), pt: new Map() };
  T.forEach(([es, en, pt]) => { const k = keyOf(es); if (!DICT.en.has(k)) DICT.en.set(k, en); if (!DICT.pt.has(k)) DICT.pt.set(k, pt); });

  function trCore(core, m, depth, ctx) {
    if (ctx && m.has(ctx + '|' + core)) return m.get(ctx + '|' + core);
    if (m.has(core)) return m.get(core);
    const k = keyOf(core);
    if (m.has(k)) { const toks = core.match(TOK) || []; let i = 0; return m.get(k).replace(/\{\$\}|\{n\}/g, () => toks[i++] ?? ''); }
    if (depth > 2) return null;
    for (const p of PREFIXES) {
      if (core.startsWith(p + ' ') && m.has(p)) { const rest = core.slice(p.length + 1); return m.get(p) + ' ' + (trCore(rest, m, depth + 1, ctx) ?? rest); }
    }
    for (const sep of [' · ', ', ']) {
      if (!core.includes(sep)) continue;
      const parts = core.split(sep), out = parts.map(x => trCore(x, m, depth + 1, ctx));
      if (out.some(x => x != null)) return parts.map((x, i) => out[i] ?? x).join(sep);
    }
    return null;
  }

  let lang = 'es';
  function t(s, ctx) {
    if (lang === 'es' || s == null) return s;
    const str = String(s), core = ws(str);
    if (!core) return str;
    const out = trCore(core, DICT[lang], 0, ctx);
    if (out == null) return str;
    return str.match(/^\s*/)[0] + out + str.match(/\s*$/)[0];
  }

  /* ---------- Traducción de la página ---------- */
  const ATTRS = ['placeholder', 'aria-label', 'title', 'alt'];
  const SKIP = 'script,style,svg,textarea,[data-no-i18n]';
  let busy = false;

  function trText(node) {
    const p = node.parentElement;
    if (!p || p.closest(SKIP) || p.closest('[data-i18n-html]')) return;
    if (node.__es === undefined || (node.nodeValue !== node.__es && node.nodeValue !== node.__tr)) node.__es = node.nodeValue;
    const c = p.closest('[data-i18n-ctx]');
    const v = t(node.__es, c && c.getAttribute('data-i18n-ctx'));
    node.__tr = v;
    if (node.nodeValue !== v) node.nodeValue = v;
  }
  function trEl(el) {
    if (el.closest(SKIP)) return;
    if (el.hasAttribute('data-i18n-html')) {
      if (el.__esHtml === undefined || (el.innerHTML !== el.__esHtml && el.innerHTML !== el.__trHtml)) el.__esHtml = el.innerHTML;
      const v = t(el.__esHtml); el.__trHtml = v;
      if (el.innerHTML !== v) el.innerHTML = v;
      return;
    }
    el.__esA = el.__esA || {}; el.__trA = el.__trA || {};
    const c = el.closest('[data-i18n-ctx]'), ctx = c && c.getAttribute('data-i18n-ctx');
    ATTRS.forEach(a => {
      if (!el.hasAttribute(a)) return;
      const cur = el.getAttribute(a);
      if (el.__esA[a] === undefined || (cur !== el.__esA[a] && cur !== el.__trA[a])) el.__esA[a] = cur;
      const v = t(el.__esA[a], ctx); el.__trA[a] = v;
      if (cur !== v) el.setAttribute(a, v);
    });
  }
  function apply(rootNode) {
    if (!rootNode) return;
    busy = true;
    try {
      if (rootNode.nodeType === 3) { trText(rootNode); return; }
      if (rootNode.nodeType !== 1) return;
      trEl(rootNode);
      rootNode.querySelectorAll('[data-i18n-html]').forEach(trEl);
      rootNode.querySelectorAll('[' + ATTRS.join('],[') + ']').forEach(trEl);
      const w = document.createTreeWalker(rootNode, NodeFilter.SHOW_TEXT);
      while (w.nextNode()) trText(w.currentNode);
    } finally { busy = false; }
  }

  const KEY = 'florlatte:lang';
  function initial() {
    try { const s = localStorage.getItem(KEY); if (LANGS[s]) return s; } catch (e) { /* sin almacenamiento */ }
    const nav = (navigator.language || 'es').slice(0, 2);
    return LANGS[nav] ? nav : 'es';
  }
  function setLang(l) {
    if (!LANGS[l]) l = 'es';
    lang = l;
    try { localStorage.setItem(KEY, l); } catch (e) { /* sin almacenamiento */ }
    document.documentElement.lang = l;
    if (document.__esTitle === undefined) document.__esTitle = document.title;
    document.title = t(document.__esTitle);
    apply(document.body);
    document.dispatchEvent(new CustomEvent('fl:lang', { detail: l }));
  }

  lang = initial();
  root.FL_I18N = { t, setLang, get lang() { return lang; }, get locale() { return LANGS[lang].locale; }, langs: LANGS };

  function start() {
    // Primero se observa la página (así se traduce lo que la tienda redibuja al cambiar de idioma)
    new MutationObserver(list => {
      if (busy || lang === 'es') return;
      for (const m of list) {
        if (m.type === 'childList') m.addedNodes.forEach(apply);
        else if (m.type === 'characterData') apply(m.target);
        else if (m.type === 'attributes') { busy = true; try { trEl(m.target); } finally { busy = false; } }
      }
    }).observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS });
    setLang(lang);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})(window);
