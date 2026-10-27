// GET /api/productos — catálogo activo desde la planilla (la web lo usa en lugar del de respaldo).
import { loadCatalog } from '../lib/store.mjs';
import { json, logError } from '../lib/http.mjs';

export default async () => {
  try {
    const products = await loadCatalog();
    return json({ products }, 200, { 'Cache-Control': 'public, max-age=30' });
  } catch (err) {
    logError('productos', err);
    return json({ error: 'No pudimos leer los productos de la planilla.' }, 502);
  }
};

export const config = { path: '/api/productos' };
