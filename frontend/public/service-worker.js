const cache = 'tatame-pwa-v2'
const arquivos = ['/', '/index.html', '/manifest.json', '/icone.svg']

self.addEventListener('install', evento => {
  evento.waitUntil(caches.open(cache).then(armazenamento => armazenamento.addAll(arquivos)))
})

self.addEventListener('activate', evento => {
  evento.waitUntil(
    caches.keys().then(chaves => Promise.all(
      chaves.filter(chave => chave !== cache).map(chave => caches.delete(chave))
    ))
  )
})

self.addEventListener('fetch', evento => {
  if (evento.request.method !== 'GET') return

  evento.respondWith(
    fetch(evento.request)
      .then(resposta => {
        const copia = resposta.clone()
        caches.open(cache).then(armazenamento => armazenamento.put(evento.request, copia))
        return resposta
      })
      .catch(() => caches.match(evento.request))
  )
})
