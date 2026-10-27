// Consulta un pago a Mercado Pago y actualiza la planilla. La planilla se encarga de que
// el stock y los emails se procesen una sola vez aunque el aviso llegue repetido.
import { getPayment, stateFor } from './mercadopago.mjs';
import { sheets } from './sheets.mjs';

export async function syncPayment(paymentId) {
  const p = await getPayment(paymentId);
  if (!p.external_reference) return { skipped: true };
  return sheets.paymentUpdate({
    orderId: String(p.external_reference),
    estado: stateFor(p.status),
    status: p.status,
    paymentId: String(p.id),
    amount: Number(p.transaction_amount) || 0,
    method: p.payment_method_id || ''
  });
}
