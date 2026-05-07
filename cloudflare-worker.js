// NYC Tailblazers — Subdomain Router Worker
// Maps *.nyctailblazers.com subdomains → kaoz625.github.io/{repo}/
//
// To add a new site: add DNS CNAME (proxied) + entry in REPO_MAP if repo name differs from subdomain.
// Sites IN the kaoz625.github.io repo as subfolders need no entry — subdomain matches folder name.

const PASSTHROUGH = new Set(['www', 'mission', 'brevo1', 'brevo2', 'cf2024-1', '_dmarc', 'blazingtails'])
const GITHUB_PAGES = 'https://kaoz625.github.io'

// subdomain → exact GitHub repo name (case-sensitive)
// Only needed when repo name differs from subdomain
const REPO_MAP = {
  'gymbot':              'GymBot-Demo',
  'popspot':             'PopSpot',
  'titan':               'TitanRenovationsNYC',
  'trapables':           'Trapables',
  'afu':                 'afu-website',
  'modern':              'nyctailblazers-modern',
  'tailblazers':         'Tailblazers',
  'missioncontrolsecure':'MissionControl-Secure',
  'missionmobile':       'MissionControlMobile',
  'royalkims':           'RoyalKims',
  'greenlanternink':     'green_lantern_ink_website',
  'cpaintingservices':   'CPaintingServices',
  'cpaintingbrooklyn':   'CPaintingServicesBrooklyn',
  'brains':              'LLM-Brains',
  'clones':              'website-clones',
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const subdomain = url.hostname.split('.')[0]

  if (PASSTHROUGH.has(subdomain)) {
    return fetch(request)
  }

  // clients → portfolio index at repo root
  if (subdomain === 'clients') {
    const targetUrl = `${GITHUB_PAGES}${url.pathname}${url.search}`
    const response = await fetch(targetUrl, {
      method: request.method,
      headers: { ...Object.fromEntries(request.headers), 'Host': 'kaoz625.github.io' },
      body: ['GET', 'HEAD'].includes(request.method) ? undefined : request.body,
      redirect: 'manual',
    })
    return new Response(response.body, { status: response.status, headers: response.headers })
  }

  const repoPath = REPO_MAP[subdomain] || subdomain
  const targetUrl = `${GITHUB_PAGES}/${repoPath}${url.pathname}${url.search}`

  const response = await fetch(targetUrl, {
    method: request.method,
    headers: { ...Object.fromEntries(request.headers), 'Host': 'kaoz625.github.io' },
    body: ['GET', 'HEAD'].includes(request.method) ? undefined : request.body,
    redirect: 'manual',
  })

  // Rewrite redirects — never let kaoz625.github.io leak to the browser
  if (response.status >= 300 && response.status < 400) {
    const location = response.headers.get('location')
    if (location) {
      let newLocation = location
      if (location.startsWith(`${GITHUB_PAGES}/${repoPath}/`)) {
        // GitHub returned absolute github.io URL — strip to just the path
        newLocation = location.replace(`${GITHUB_PAGES}/${repoPath}`, '')
      } else if (location.startsWith(`/${repoPath}/`)) {
        // Relative repo-subfolder redirect — strip subfolder prefix
        newLocation = location.replace(`/${repoPath}`, '')
      } else {
        // Circular redirect guard: GitHub Pages CNAME sends traffic back to our domain
        try {
          const locUrl = new URL(location)
          if (locUrl.hostname.endsWith('.nyctailblazers.com')) {
            // Retry fetch with trailing slash to bypass the CNAME redirect
            const retryPath = locUrl.pathname.endsWith('/') ? locUrl.pathname : locUrl.pathname + '/'
            const retryUrl = `${GITHUB_PAGES}/${repoPath}${retryPath}${locUrl.search}`
            const retryResp = await fetch(retryUrl, {
              method: request.method,
              headers: { ...Object.fromEntries(request.headers), 'Host': 'kaoz625.github.io' },
              body: ['GET', 'HEAD'].includes(request.method) ? undefined : request.body,
              redirect: 'manual',
            })
            return new Response(retryResp.body, { status: retryResp.status, headers: retryResp.headers })
          }
        } catch {}
      }
      if (newLocation !== location) {
        const newHeaders = new Headers(response.headers)
        newHeaders.set('location', newLocation)
        return new Response(response.body, { status: response.status, headers: newHeaders })
      }
    }
  }

  return new Response(response.body, { status: response.status, headers: response.headers })
}
