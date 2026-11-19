const {catalog,json}=require('./_shared.cjs');
exports.handler=async()=>{try{return json(200,{products:await catalog()})}catch(e){console.error(e);return json(503,{error:'Catálogo todavía no conectado a Google Sheets'})}};
