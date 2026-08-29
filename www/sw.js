/* Lamplight service worker. Bump CACHE_VERSION for every public release. */
const CACHE_PREFIX = "lamplight-shell-";
const CACHE_VERSION = "1.2.1-d42e9e8328fd";
const CACHE_NAME = `${CACHE_PREFIX}${CACHE_VERSION}`;
const APP_SHELL = new URL("./index.html", self.registration.scope).href;
const PRECACHE_URLS = [
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon-180.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
].map(asset => new URL(asset, self.registration.scope).href);

function isSameOriginResponse(response) {
  try {
    return response.ok
      && response.type !== "opaque"
      && new URL(response.url).origin === self.location.origin;
  } catch {
    return false;
  }
}

async function precacheShell() {
  const cache = await caches.open(CACHE_NAME);
  const results = await Promise.allSettled(PRECACHE_URLS.map(async assetUrl => {
    const response = await fetch(assetUrl, { cache: "reload" });
    if (!isSameOriginResponse(response)) {
      throw new Error(`Precache failed (${response.status}) for ${assetUrl}`);
    }
    await cache.put(assetUrl, response);
  }));
  const failure = results.find(result => result.status === "rejected");
  if (failure) {
    await caches.delete(CACHE_NAME);
    throw failure.reason;
  }
}

self.addEventListener("install", event => {
  event.waitUntil(precacheShell().then(() => self.skipWaiting()));
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames
      .filter(name => name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME)
      .map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});

async function networkFirstNavigation(request, event) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const response = await fetch(request);
    const contentType = response.headers.get("Content-Type") || "";
    if (!isSameOriginResponse(response) || !contentType.toLowerCase().includes("text/html")) {
      throw new Error(`Navigation returned ${response.status}`);
    }
    event.waitUntil(cache.put(APP_SHELL, response.clone()));
    return response;
  } catch (error) {
    const exact = await cache.match(request, { ignoreSearch: true });
    const shell = exact || await cache.match(APP_SHELL);
    if (shell) return shell;
    return new Response(
      "Lamplight is offline and its app shell has not been cached yet. Reconnect once, then try again.",
      {
        status: 503,
        headers: { "Content-Type": "text/plain; charset=utf-8" }
      }
    );
  }
}

async function cacheFirstAsset(request, event) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request, { ignoreSearch: true });
  const update = fetch(request).then(async response => {
    if (isSameOriginResponse(response)) {
      await cache.put(request, response.clone());
    }
    return response;
  });

  if (cached) {
    event.waitUntil(update.catch(() => undefined));
    return cached;
  }

  try {
    return await update;
  } catch (error) {
    return new Response("Offline", {
      status: 503,
      headers: { "Content-Type": "text/plain; charset=utf-8" }
    });
  }
}

self.addEventListener("fetch", event => {
  const { request } = event;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin) return;

  if (request.mode === "navigate" || url.href === APP_SHELL) {
    event.respondWith(networkFirstNavigation(request, event));
    return;
  }

  event.respondWith(cacheFirstAsset(request, event));
});

self.addEventListener("message", event => {
  if (event.data?.type === "SKIP_WAITING") {
    event.waitUntil(self.skipWaiting());
  }
});
