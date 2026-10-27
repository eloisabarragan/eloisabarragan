// Conexión con la planilla de Google a través del Apps Script publicado como aplicación web
// (ver backend/florlatte-apps-script.gs). Variables de entorno: SHEETS_URL y SHEETS_SECRET.

function endpoint() {
  const url = process.env.SHEETS_URL;
  if (!url) throw new Error('Falta configurar SHEETS_URL en Netlify.');
  return url;
}

async function parse(res) {
  const text = await res.text();
  let data;
  try { data = JSON.parse(text); } catch { throw new Error(`La planilla respondió algo inesperado (${res.status}): ${text.slice(0, 160)}`); }
  if (data && data.error) throw new Error(`Planilla: ${data.error}`);
  return data;
}

async function post(action, payload) {
  const secret = process.env.SHEETS_SECRET;
  if (!secret) throw new Error('Falta configurar SHEETS_SECRET en Netlify.');
  // Apps Script responde con una redirección; fetch la sigue y devuelve el resultado.
  const res = await fetch(endpoint(), {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ secret, action, ...payload }),
    redirect: 'follow'
  });
  return parse(res);
}

export const sheets = {
  async products() {
    const url = new URL(endpoint());
    url.searchParams.set('action', 'products');
    const data = await parse(await fetch(url, { redirect: 'follow' }));
    return Array.isArray(data.products) ? data.products : [];
  },
  createOrder(order) { return post('createOrder', { order }); },
  paymentUpdate(update) { return post('paymentUpdate', update); },
  orderStatus(id) { return post('orderStatus', { id }); }
};
