const C="pf-v77",F=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","apple-touch-icon.png","qrcode.js","logo-header.webp","favicon-32.png"];
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(F.map(u=>new Request(u,{cache:"reload"})))))});
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
// Alleen eigen bestanden (GoatCounter gc.zgo.at/goatcounter.com ook ongemoeid). Alleen eigen bestanden: Pyodide (cdn.jsdelivr.net) gaat ongemoeid rechtstreeks naar het internet.
self.addEventListener("fetch",e=>{const u=new URL(e.request.url);if(e.request.method!=="GET"||u.origin!==self.location.origin)return;
const rq=e.request.mode==="navigate"?new Request(e.request.url,{cache:"no-cache",credentials:"same-origin"}):e.request;
e.respondWith(fetch(rq).then(r=>{const c=r.clone();caches.open(C).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request,{ignoreSearch:true})))});
