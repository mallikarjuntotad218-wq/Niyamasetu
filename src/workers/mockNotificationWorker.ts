/**
 * Mock Notification Worker Setup & Fallback Client Interceptor
 *
 * Ensures simulated email delivery via `/api/notifications/dispatch-email`
 * succeeds in all browser environments (direct window, strict sandboxes, or iframe).
 */

export interface MockWorkerStatus {
  isServiceWorkerRegistered: boolean;
  isClientInterceptorActive: boolean;
  mode: 'service_worker' | 'client_interceptor' | 'dual';
  totalIntercepted: number;
  lastInterceptedAt: string | null;
}

let isInitialized = false;
let swRegistration: ServiceWorkerRegistration | null = null;
let totalInterceptedCount = 0;
let lastInterceptedTimestamp: string | null = null;
let nativeFetchRef: ((input: RequestInfo | URL, init?: RequestInit) => Promise<Response>) | null = null;

type WorkerEventListener = (status: MockWorkerStatus) => void;
const listeners = new Set<WorkerEventListener>();

function notifyListeners() {
  const status = getMockWorkerStatus();
  listeners.forEach((fn) => {
    try {
      fn(status);
    } catch {
      // Ignore listener error
    }
  });
}

export function subscribeWorkerStatus(listener: WorkerEventListener): () => void {
  listeners.add(listener);
  listener(getMockWorkerStatus());
  return () => {
    listeners.delete(listener);
  };
}

export function getMockWorkerStatus(): MockWorkerStatus {
  const isSW = Boolean(swRegistration && swRegistration.active);
  return {
    isServiceWorkerRegistered: isSW,
    isClientInterceptorActive: true,
    mode: isSW ? 'dual' : 'client_interceptor',
    totalIntercepted: totalInterceptedCount,
    lastInterceptedAt: lastInterceptedTimestamp
  };
}

/**
 * Handles simulated email notification delivery and mock API routes.
 */
export async function dispatchNotificationApi(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const urlString = typeof input === 'string' ? input : input instanceof URL ? input.toString() : (input as Request).url;

  if (urlString.includes('/api/notifications/')) {
    totalInterceptedCount++;
    lastInterceptedTimestamp = new Date().toISOString();
    notifyListeners();

    // Simulate network delay
    await new Promise((r) => setTimeout(r, 260));

    if (urlString.includes('/dispatch-email') || urlString.includes('/send-email')) {
      try {
        let bodyData: any = {};
        if (init && init.body) {
          bodyData = typeof init.body === 'string' ? JSON.parse(init.body) : init.body;
        }

        const messageId = 'msg_msw_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 8);
        const nowIso = new Date().toISOString();

        const simulatedResponse = {
          success: true,
          status: 'delivered',
          messageId,
          provider: 'MockServiceWorker SMTP Relay v2.4 (Simulated Daemon)',
          dispatchedAt: nowIso,
          deliveredAt: nowIso,
          recipient: bodyData.recipientEmail || 'compliance@apextech.co.in',
          subject: bodyData.subject || 'Statutory Deadline Alert',
          noticeId: bodyData.noticeId,
          referenceNumber: bodyData.referenceNumber,
          urgency: bodyData.urgency || 'urgent',
          daysRemaining: bodyData.daysRemaining,
          milestone: bodyData.milestone || 'scheduled_scan',
          latencyMs: 260,
          smtpResponseCode: '250 2.0.0 OK: queued as ' + messageId,
          headers: {
            'X-Mailer': 'NiyamSetu Automated Compliance Dispatcher v2.4',
            'X-Priority': bodyData.urgency === 'urgent' || bodyData.urgency === 'overdue' ? '1 (Highest)' : '3 (Normal)',
            'X-Mock-Service-Worker': 'Active-ClientInterceptor',
            'Content-Type': 'application/json'
          }
        };

        return new Response(JSON.stringify(simulatedResponse), {
          status: 200,
          statusText: 'OK',
          headers: {
            'Content-Type': 'application/json',
            'X-Intercepted-By': 'MockNotificationWorker'
          }
        });
      } catch (e: any) {
        return new Response(
          JSON.stringify({ success: false, error: e?.message || 'Failed to dispatch email' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    if (urlString.includes('/status')) {
      return new Response(
        JSON.stringify({
          active: true,
          version: '2.4.0',
          engine: 'MockNotificationWorker Interceptor',
          timestamp: new Date().toISOString()
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }

  // Fallback to native fetch for standard requests
  const fallback = nativeFetchRef || (typeof window !== 'undefined' && typeof window.fetch === 'function' ? window.fetch.bind(window) : fetch);
  return fallback(input, init);
}

/**
 * Initializes the Mock Service Worker and client-side fallback interceptor.
 * Safely guards against non-writable/getter-only window.fetch properties in sandbox iframes.
 */
export async function initMockNotificationWorker(): Promise<void> {
  if (isInitialized) return;
  isInitialized = true;

  // 1. Attempt Service Worker registration if available
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    try {
      swRegistration = await navigator.serviceWorker.register('/mockServiceWorker.js', {
        scope: '/'
      });
      console.log('[MockServiceWorker] Registered successfully:', swRegistration.scope);
      notifyListeners();
    } catch (err) {
      console.warn('[MockServiceWorker] Native Service Worker registration bypassed (likely iframe sandbox), using client-side fallback interceptor:', err);
    }
  }

  // 2. Install client-side fetch interceptor safely without breaking on getter-only window.fetch
  if (typeof window !== 'undefined' && typeof window.fetch === 'function') {
    try {
      nativeFetchRef = window.fetch.bind(window);

      const interceptedFetch = async function (input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
        const urlString = typeof input === 'string' ? input : input instanceof URL ? input.toString() : (input as Request).url;
        if (urlString && urlString.includes('/api/notifications/')) {
          return dispatchNotificationApi(input, init);
        }
        return nativeFetchRef ? nativeFetchRef(input, init) : fetch(input, init);
      };

      // Attempt to patch window.fetch safely with defineProperty
      try {
        const descriptor = Object.getOwnPropertyDescriptor(window, 'fetch') || Object.getOwnPropertyDescriptor(Window.prototype, 'fetch');
        if (!descriptor || descriptor.configurable !== false) {
          Object.defineProperty(window, 'fetch', {
            value: interceptedFetch,
            writable: true,
            configurable: true
          });
        } else {
          // If not configurable, try direct assignment with catch
          (window as any).fetch = interceptedFetch;
        }
      } catch (patchErr) {
        // In iframe environments where window.fetch has only a getter and cannot be modified,
        // we log gracefully. All notification services use dispatchNotificationApi directly.
        console.warn('[MockServiceWorker] Global window.fetch cannot be overwritten in this environment. Direct dispatchNotificationApi will be used:', patchErr);
      }
    } catch (err) {
      console.warn('[MockServiceWorker] Failed to capture native fetch:', err);
    }
  }
}
