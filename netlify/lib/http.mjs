export function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...headers }
  });
}

export function siteUrl(req) {
  return (process.env.SITE_URL || process.env.URL || new URL(req.url).origin).replace(/\/$/, '');
}

export const clean = (v, max = 200) => String(v ?? '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max);
export const cleanText = (v, max = 400) => String(v ?? '').replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, ' ').trim().slice(0, max);

export function logError(where, err) {
  console.error(`[${where}]`, err && err.stack ? err.stack : err);
}
