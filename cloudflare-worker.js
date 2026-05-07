// NYC Tailblazers — Subdomain Router Worker
// Maps *.nyctailblazers.com subdomains → kaoz625.github.io/{subdomain}/
//
// To add a new site: just add a DNS CNAME record (proxied) + a folder in the repo.
// No changes needed here.
//
// Special cases:
//   clients  → repo root (portfolio index)

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

  // clients subdomain → portfolio index at repo root
  // Always include url.pathname as-is (with trailing slash) so GitHub serves content directly
  const targetUrl = subdomain === 'clients'
    ? `${GITHUB_PAGES}${url.pathname}${url.search}`
    : `${GITHUB_PAGES}/${subdomain}${url.pathname}${url.search}`

  const response = await fetch(targetUrl, {
    method: request.method,
    headers: {
      ...Object.fromEntries(request.headers),
      'Host': 'kaoz625.github.io',
    },
    body: ['GET', 'HEAD'].includes(request.method) ? undefined : request.body,
    redirect: 'manual',
  })

  // Rewrite redirects so kaoz625.github.io never leaks to the browser
  if (response.status >= 300 && response.status < 400) {
    const location = response.headers.get('location')
    if (location) {
      let newLocation = location
      if (subdomain !== 'clients' && location.startsWith(`${GITHUB_PAGES}/${subdomain}/`)) {
        // Absolute redirect: https://kaoz625.github.io/peakprohvac/path → /path
        newLocation = location.replace(`${GITHUB_PAGES}/${subdomain}`, '')
      } else if (subdomain !== 'clients' && location.startsWith(`/${subdomain}/`)) {
        // Relative redirect: /peakprohvac/path → /path
        newLocation = location.replace(`/${subdomain}`, '')
      }
      if (newLocation !== location) {
        const newHeaders = new Headers(response.headers)
        newHeaders.set('location', newLocation)
        return new Response(response.body, { status: response.status, headers: newHeaders })
      }
    }
  }

  return new Response(response.body, {
    status: response.status,
    headers: response.headers,
  })
}
