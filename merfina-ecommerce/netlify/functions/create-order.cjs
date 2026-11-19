const crypto=require('node:crypto');
const {catalog,read,rows,append,json,email,escape}=require('./_shared.cjs');
exports.handler=async(event)=>{
 if(event.httpMethod!=='POST')return json(405,{error:'Método no permitido'});
 if(!process.env.GOOGLE_SHEET_ID||!process.env.MERFINA_OWNER_EMAIL||!process.env.RESEND_API_KEY||!process.env.MERFINA_FROM_EMAIL)return json(503,{error:'La recepción de pedidos todavía no está configurada'});
 if(Buffer.byteLength(event.body||'')>20000)return json(413,{error:'Solicitud demasiado grande'});
 try{
  const x=JSON.parse(event.body||'{}');if(x.website)return json(400,{error:'Solicitud inválida'});
  const c=x.customer||{};const clean=(v,max=200)=>String(v||'').trim().slice(0,max);
  const customer={name:clean(c.name,80),lastName:clean(c.lastName,80),email:clean(c.email,180),phone:clean(c.phone,40),department:clean(c.department,60),city:clean(c.city,100),address:clean(c.address,220),notes:clean(c.notes,600)};
  if(!customer.name||!customer.lastName||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)||customer.phone.replace(/\D/g,'').length<8||!customer.department||!customer.city||!Array.isArray(x.items)||!x.items.length||x.items.length>30)return json(400,{error:'Completá correctamente tus datos y productos'});
  if(!['dom','ret','age'].includes(x.shipping))return json(400,{error:'Entrega inválida'});
  if(x.shipping!=='ret'&&!customer.address)return json(400,{error:'Falta dirección'});
  const all=await catalog();const lines=[];let subtotal=0;
  for(const item of x.items){const p=all.find(z=>z.id===item.id),idx=Number(item.variant),q=Number(item.quantity);if(!p||!Number.isInteger(idx)||!p.opts[idx]||!Number.isInteger(q)||q<1||q>20)return json(400,{error:'Un producto o variante no es válido'});if(p.stock<q)return json(409,{error:`Stock insuficiente: ${p.name}`});const unit=p.opts[idx][1];subtotal+=unit*q;lines.push({id:p.id,name:p.name,variant:p.opts[idx][0],quantity:q,unit,total:unit*q})}
  // Pending requests: do not charge, decrement stock or claim a sale. Sheets isn't transactional.
  const id='MF-'+new Date().toISOString().slice(0,10).replaceAll('-','')+'-'+crypto.randomBytes(4).toString('hex').toUpperCase();
  const date=new Date().toISOString();
  await append('Pedidos!A:Q',[[id,date,'PENDIENTE_CONFIRMACION',customer.name,customer.lastName,customer.email,customer.phone,customer.department,customer.city,customer.address,customer.notes,x.shipping,subtotal,'A CONFIRMAR','SIN PAGAR',JSON.stringify(lines),'WEB']]);
  const html=`<div style="font-family:Georgia,serif;color:#40343b;max-width:560px;margin:auto;padding:32px"><h1 style="letter-spacing:.2em;text-align:center">MERFINA</h1><p style="text-align:center">Una joya que hace la diferencia</p><hr style="border:0;border-top:1px solid #eadbdb"><h2>Recibimos tu solicitud</h2><p>Hola ${escape(customer.name)}, recibimos tu solicitud <b>${escape(id)}</b>.</p><p><b>Estado: pendiente de confirmación.</b> Todavía no realizaste ningún pago y el stock no está reservado. Te contactaremos para confirmar disponibilidad, envío, importe final y forma de pago.</p><ul>${lines.map(l=>`<li>${escape(l.name)} · ${escape(l.variant)} × ${l.quantity}</li>`).join('')}</ul><p>Importe de productos de referencia: $U ${subtotal.toLocaleString('es-UY')}. Envío a confirmar.</p><p>Con cariño, Mercedes ✨</p></div>`;
  const client=await email(customer.email,`Merfina · Recibimos tu solicitud ${id}`,html);
  const owner=await email(process.env.MERFINA_OWNER_EMAIL,`Nuevo pedido pendiente ${id}`,`<h2>Solicitud ${escape(id)}</h2><p>${escape(customer.name+' '+customer.lastName)} · ${escape(customer.email)} · ${escape(customer.phone)}</p><p>${escape(customer.department+', '+customer.city+', '+customer.address)}</p><pre>${escape(JSON.stringify(lines,null,2))}</pre><p>Estado: pendiente, sin pagar. Revisar Google Sheets.</p>`);
  if(!client.sent||!owner.sent)console.error('Pedido guardado, pero uno o más correos fallaron',id,client,owner);
  return json(201,{orderId:id,status:'PENDIENTE_CONFIRMACION',emailNotification:client.sent});
 }catch(e){console.error('create-order',e);return json(503,{error:'No pudimos registrar el pedido. Intentá nuevamente más tarde'})}
};
