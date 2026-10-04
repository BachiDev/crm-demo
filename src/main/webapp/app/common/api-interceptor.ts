import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { throwError, timer } from 'rxjs';
import { retry, timeout } from 'rxjs/operators';


const REQUEST_TIMEOUT_MS = 15000;
const COLD_START_RETRY_DELAY_MS = 3000;

/** Statuses worth one retry: Render free tier sleeps and answers 502/503/504 (or drops) while waking. */
function isWakeUpFailure(error: unknown): boolean {
  if (!(error instanceof HttpErrorResponse)) {
    return false;
  }
  return error.status === 0 || error.status === 502 || error.status === 503 || error.status === 504;
}

/**
 * Cold-start-aware HTTP behavior: every request times out after 15 s; safe
 * (GET/HEAD) requests get exactly one retry after a short delay when the
 * backend looks asleep. Mutations are never retried (no double-create risk).
 */
export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const safe = req.method === 'GET' || req.method === 'HEAD';
  const withTimeout = next(req).pipe(timeout(REQUEST_TIMEOUT_MS));
  if (!safe) {
    return withTimeout;
  }
  return withTimeout.pipe(
    retry({
      count: 1,
      delay: (error) => (isWakeUpFailure(error) ? timer(COLD_START_RETRY_DELAY_MS) : throwError(() => error))
    })
  );
};
