// Minimal service worker for installability.
// It does NOT cache anything, so tasks, balances and withdrawals are always fresh.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));

self.addEventListener('fetch', (event) => {
  // Only handle page loads: show a simple message if the phone is offline.
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() =>
        new Response(
          '<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1">' +
          '<body style="background:#0a0f1a;color:#f1f5f9;font-family:sans-serif;text-align:center;padding:3rem">' +
          '<h2>You are offline</h2><p>Connect to the internet and reopen Apex Task Studio.</p></body>',
          { headers: { 'Content-Type': 'text/html' } }
        )
      )
    );
  }
});
