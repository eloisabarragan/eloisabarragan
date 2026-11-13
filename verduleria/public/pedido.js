import { h, api, moneyFormatter, formatQty, STATUS_LABELS, PAYMENT_LABELS } from './common.js';

const content = document.getElementById('content');
const params = new URLSearchParams(location.search);
const code = params.get('c') || '';
let retries = 0;

function whatsappLink(order, config, money) {
  const lines = [
    `¡Hola ${config.store.name}! Hice el pedido N.º ${order.id} por la web.`,
    '',
    ...order.items.map((i) => `• ${formatQty(i.qty, i.unit)} de ${i.name}: ${money(i.line_total)}`),
    '',
    order.shipping ? `Envío: ${money(order.shipping)}` : null,
    `Total: ${money(order.total)}`,
    order.delivery_method === 'envio' ? `Entrega en: ${order.address}` : 'Retiro en el local',
    '',
    order.payment_method === 'transferencia'
      ? 'Quiero pagar por transferencia. ¿Me pasan los datos de la cuenta?'
      : 'Tengo una consulta sobre mi pedido.',
  ].filter((l) => l !== null);
  return `https://wa.me/${config.store.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`;
}

function view(order, config) {
  const money = moneyFormatter(config.currency);
  const byTransfer = order.payment_method === 'transferencia';
  const paid = order.payment_status === 'aprobado';
  const rejected = order.payment_status === 'rechazado';
  const cancelled = order.status === 'cancelado';
  const wa = whatsappLink(order, config, money);

  let title = `¡Gracias, ${order.customer_name.split(' ')[0]}!`;
  let lead = `Recibimos tu pedido N.º ${order.id}.`;
  if (cancelled) {
    title = 'Pedido cancelado';
    lead = `El pedido N.º ${order.id} fue cancelado. Si es un error, escribinos.`;
  } else if (byTransfer && !paid) {
    lead += ' Para terminar, envianos el pedido por WhatsApp y te pasamos los datos para la transferencia.';
  } else if (!byTransfer && rejected) {
    title = 'No pudimos cobrar tu pedido';
    lead = `El pago del pedido N.º ${order.id} fue rechazado. Escribinos por WhatsApp y lo resolvemos.`;
  } else if (!byTransfer && !paid) {
    lead += ' Estamos esperando la confirmación del pago de Mercado Pago; puede demorar unos minutos.';
  } else {
    lead += ' Ya lo estamos preparando.';
  }

  const mainAction =
    byTransfer && !paid && !cancelled
      ? h('a', { class: 'btn btn-whatsapp', href: wa, target: '_blank', rel: 'noopener' }, 'Enviar pedido por WhatsApp')
      : h('a', { class: 'btn btn-ghost', href: wa, target: '_blank', rel: 'noopener' }, 'Consultar por WhatsApp');

  content.replaceChildren(
    h(
      'div',
      { class: 'panel' },
      h('p', { class: 'eyebrow' }, `Pedido N.º ${order.id}`),
      h('h1', {}, title),
      h('p', { class: 'lead' }, lead),
      h(
        'div',
        { class: 'tags' },
        h('span', { class: `tag${cancelled ? ' bad' : ''}` }, STATUS_LABELS[order.status]),
        h('span', { class: `tag${paid ? '' : rejected ? ' bad' : ' warn'}` }, PAYMENT_LABELS[order.payment_status])
      ),
      h('div', { class: 'actions' }, mainAction, h('a', { class: 'btn btn-ghost', href: '/' }, 'Volver a la tienda'))
    ),
    h(
      'div',
      { class: 'panel' },
      h('h2', {}, 'Detalle'),
      h(
        'ul',
        { class: 'lines' },
        order.items.map((i) =>
          h(
            'li',
            {},
            h('span', {}, i.name, ' ', h('small', {}, `· ${formatQty(i.qty, i.unit)}`)),
            h('span', {}, money(i.line_total))
          )
        )
      ),
      h(
        'dl',
        { class: 'totals' },
        h('div', {}, h('dt', {}, 'Subtotal'), h('dd', {}, money(order.subtotal))),
        h(
          'div',
          {},
          h('dt', {}, order.delivery_method === 'envio' ? 'Envío' : 'Entrega'),
          h('dd', {}, order.delivery_method === 'retiro' ? 'Retiro en el local' : order.shipping ? money(order.shipping) : 'Gratis')
        ),
        h('div', { class: 'total' }, h('dt', {}, 'Total'), h('dd', {}, money(order.total)))
      ),
      order.delivery_method === 'envio'
        ? h('p', { class: 'lead' }, `Entrega en: ${order.address}`)
        : h('p', { class: 'lead' }, `Retirás en: ${config.store.address} · ${config.store.hours}`)
    )
  );

  // Con Mercado Pago el aviso de pago puede tardar: volvemos a consultar un par de veces.
  if (!byTransfer && order.payment_status === 'pendiente' && !cancelled && retries++ < 6) setTimeout(load, 5000);
}

async function load() {
  try {
    const paymentId = params.get('payment_id') || params.get('collection_id') || '';
    const query = /^\d+$/.test(paymentId) ? `?payment_id=${paymentId}` : '';
    const [order, config] = await Promise.all([api(`/api/orders/${encodeURIComponent(code)}${query}`), api('/api/config')]);
    view(order, config);
  } catch (error) {
    content.replaceChildren(
      h(
        'div',
        { class: 'panel' },
        h('h1', {}, 'No encontramos el pedido'),
        h('p', { class: 'lead' }, error.message),
        h('a', { class: 'btn btn-primary', href: '/' }, 'Ir a la tienda')
      )
    );
  }
}

load();
