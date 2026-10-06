/**
 * Pasa los borradores por el editor de bloques REAL de WordPress:
 * parsea, regenera cada bloque con createBlock() y serializa.
 * Resultado: marcado canónico (idéntico al que guarda el editor).
 *
 * Uso: node normalize.js http://127.0.0.1:8080 admin pass
 */
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs');
const path = require('path');

(async () => {
	const [base, user, pass] = process.argv.slice(2);
	const drafts = JSON.parse(fs.readFileSync(path.join(__dirname, 'drafts.json'), 'utf8'));
	const browser = await chromium.launch({ args: ['--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE 127.0.0.1'] });
	const page = await browser.newPage();
	page.on('pageerror', (e) => console.error('pageerror', e.message));
	await page.goto(base + '/wp-login.php');
	await page.fill('#user_login', user);
	await page.fill('#user_pass', pass);
	await page.click('#wp-submit');
	await page.waitForLoadState('domcontentloaded');
	await page.goto(base + '/wp-admin/post-new.php?post_type=page', { waitUntil: 'domcontentloaded' });
	await page.waitForFunction(() => window.wp && wp.blocks && wp.blocks.getBlockType('core/paragraph'), null, { timeout: 120000 });

	const result = { pages: [], parts: [] };
	drafts.parts = [{ slug: 'pie', title: 'Pie de página', tree: drafts.footer }];
	let totalIssues = 0;
	for (const kind of ['pages', 'parts']) {
		for (const item of drafts[kind]) {
			const r = await page.evaluate((tree) => {
				const issues = [];
				const walk = (bs, fn) => bs.forEach((b) => { fn(b); walk(b.innerBlocks, fn); });
				const build = (n) => {
					const type = wp.blocks.getBlockType(n.name);
					if (!type) { issues.push({ name: n.name, msg: 'TIPO DE BLOQUE INEXISTENTE' }); }
					else {
						Object.keys(n.attributes).forEach((k) => {
							if (!(k in type.attributes)) issues.push({ name: n.name, msg: 'ATRIBUTO DESCONOCIDO: ' + k });
						});
					}
					return wp.blocks.createBlock(n.name, n.attributes, n.innerBlocks.map(build));
				};
				const built = tree.map(build);
				const parts = built.map((b) => wp.blocks.serialize([b]));
				const out = parts.join('\n\n');
				const re = wp.blocks.parse(out);
				walk(re, (b) => {
					if (['core/freeform', 'core/missing'].includes(b.name)) issues.push({ name: b.name, msg: 'BLOQUE DESCONOCIDO' });
				});
				walk(re, (b) => {
					if (!b.isValid) issues.push({ name: b.name, msg: 'INVÁLIDO TRAS NORMALIZAR', detail: (b.validationIssues || []).map((i) => i.args && i.args.slice(1).map(String).join(' | ')).join('\n') });
				});
				// Atributos "perdidos": comparar cantidad de bloques
				let n2 = 0; walk(re, () => n2++);
				// Comprobación de ida y vuelta: los atributos re-parseados deben coincidir con los pedidos.
				const flat = []; const flatTree = (ns) => ns.forEach((n) => { flat.push(n); flatTree(n.innerBlocks); }); flatTree(tree);
				const flatRe = []; walk(re, (b) => flatRe.push(b));
				const norm = (v) => (v && typeof v === 'object' && 'toHTMLString' in v) ? v.toHTMLString() : (v && v.toString && v.constructor && v.constructor.name === 'RichTextData' ? v.toString() : v);
				flat.forEach((n, i) => {
					const b = flatRe[i];
					if (!b || b.name !== n.name) { issues.push({ name: n.name, msg: 'ORDEN DE BLOQUES DISTINTO' }); return; }
					Object.entries(n.attributes).forEach(([k, v]) => {
						const got = norm(b.attributes[k]);
						if (JSON.stringify(got) !== JSON.stringify(v)) issues.push({ name: n.name, msg: 'ATRIBUTO CAMBIÓ: ' + k, detail: JSON.stringify(v).slice(0, 160) + '\n   => ' + JSON.stringify(got).slice(0, 160) });
					});
				});
				return { out, parts, issues, count: n2 };
			}, item.tree);
			totalIssues += r.issues.length;
			console.log(`${kind}/${item.slug}: ${r.count} bloques, ${r.issues.length} problemas`);
			r.issues.slice(0, 15).forEach((i) => console.log('   -', i.name, i.msg, i.detail ? '\n' + i.detail.slice(0, 600) : ''));
			const { tree, ...rest } = item;
			result[kind].push({ ...rest, markup: r.out, parts: r.parts, names: tree.map((n) => (n.attributes.metadata && n.attributes.metadata.name) || '') });
		}
	}
	fs.writeFileSync(path.join(__dirname, 'normalized.json'), JSON.stringify(result, null, 1));
	console.log('TOTAL PROBLEMAS:', totalIssues);
	await browser.close();
})();
