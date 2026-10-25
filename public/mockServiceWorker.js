/**
 * NiyamSetu Mock Service Worker
 * Intercepts /api/notifications/* network calls in the browser to demonstrate
 * automated deadline notification dispatch and simulated email delivery receipt.
 */

const CACHE_NAME = 'niyamsetu-mock-sw-v1';

self.addEventListener('install', (event) => {
  // Activate worker immediately without waiting
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Claim all clients immediately so requests are intercepted without reload
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Intercept notification dispatch requests
  if (url.pathname.startsWith('/api/notifications/')) {
    event.respondWith(handleNotificationApiRequest(event.request, url));
  }
});

async function handleNotificationApiRequest(request, url) {
  // Simulate network delivery latency (250-400ms)
  await new Promise((resolve) => setTimeout(resolve, 300));

  if (url.pathname === '/api/notifications/dispatch-email' || url.pathname === '/api/notifications/send-email') {
    try {
      const payload = await request.json();
      const messageId = 'msg_msw_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 8);
      const timestamp = new Date().toISOString();

      const responsePayload = {
        success: true,
        status: 'delivered',
        messageId,
        provider: 'MockServiceWorker SMTP Gateway v2.4 (Virtual Relay)',
        dispatchedAt: timestamp,
        deliveredAt: timestamp,
        recipient: payload.recipientEmail || 'compliance@apextech.co.in',
        subject: payload.subject || 'Statutory Deadline Alert',
        noticeId: payload.noticeId,
        referenceNumber: payload.referenceNumber,
        urgency: payload.urgency || 'urgent',
        daysRemaining: payload.daysRemaining,
        milestone: payload.milestone || 'scheduled_scan',
        latencyMs: 310,
        smtpResponseCode: '250 2.0.0 OK: queued as ' + messageId,
        headers: {
          'X-Mailer': 'NiyamSetu Automated Compliance Dispatcher v2.4',
          'X-Priority': payload.urgency === 'urgent' || payload.urgency === 'overdue' ? '1 (Highest)' : '3 (Normal)',
          'X-Mock-Service-Worker': 'Active',
          'Content-Type': 'application/json'
        }
      };

      return new Response(JSON.stringify(responsePayload), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'X-Service-Worker-Intercepted': 'true'
        }
      });
    } catch (err) {
      return new Response(
        JSON.stringify({
          success: false,
          status: 'failed',
          error: 'Failed to process notification payload: ' + (err.message || String(err))
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
  }

  if (url.pathname === '/api/notifications/status') {
    return new Response(
      JSON.stringify({
        active: true,
        version: '2.4.0',
        engine: 'MockServiceWorker (Browser Background Worker)',
        uptime: 'Operational',
        timestamp: new Date().toISOString()
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  // Fallback for unknown notification routes
  return new Response(
    JSON.stringify({ error: 'Endpoint not implemented in mock service worker' }),
    { status: 404, headers: { 'Content-Type': 'application/json' } }
  );
}
