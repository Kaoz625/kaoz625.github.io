// NYC Tailblazers — Subdomain Router Worker
// Maps *.nyctailblazers.com subdomains → kaoz625.github.io/{subdomain}/
//
// To add a new site: just add a DNS CNAME record (proxied) + a folder in the repo.
// No changes needed here.

const PASSTHROUGH = new Set(['www', 'mission', 'brevo1', 'brevo2', 'cf2024-1', '_dmarc', 'blazingtails'])
const GITHUB_PAGES = 'https://kaoz625.github.io'

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const subdomain = url.hostname.split('.')[0]

  if (PASSTHROUGH.has(subdomain)) {
    return fetch(request)
  }

  let path = url.pathname === '/' ? '' : url.pathname
  const targetUrl = `${GITHUB_PAGES}/${subdomain}${path}${url.search}`

  const response = await fetch(targetUrl, {
    method: request.method,
    headers: {
      ...Object.fromEntries(request.headers),
      'Host': 'kaoz625.github.io',
    },
    body: ['GET', 'HEAD'].includes(request.method) ? undefined : request.body,
    redirect: 'manual',
  })

  // Strip the /{subdomain} prefix from any redirect locations
  if (response.status >= 300 && response.status < 400) {
    const location = response.headers.get('location')
    if (location && location.startsWith(`/${subdomain}/`)) {
      const newHeaders = new Headers(response.headers)
      newHeaders.set('location', location.replace(`/${subdomain}`, ''))
      return new Response(response.body, { status: response.status, headers: newHeaders })
    }
  }

  return new Response(response.body, {
    status: response.status,
    headers: response.headers,
  })
}
