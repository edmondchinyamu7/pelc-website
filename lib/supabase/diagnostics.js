export function isNetworkAuthError(error) {
  if (!error) return false;
  const name = typeof error.name === 'string' ? error.name : '';
  const message = typeof error.message === 'string' ? error.message.toLowerCase() : '';
  const status = typeof error.status === 'number' ? error.status : null;

  return (
    name === 'AuthRetryableFetchError' ||
    status === 0 ||
    message.includes('failed to fetch') ||
    message.includes('fetch failed') ||
    message.includes('networkerror') ||
    message.includes('load failed') ||
    message.includes('enotfound') ||
    message.includes('name or service not known')
  );
}

export function logSafeAuthDiagnostic({
  location,
  operation,
  error = null,
  reason = null,
  extra = null,
}) {
  const payload = {
    location,
    operation,
    ...(reason ? { reason } : {}),
    ...(error
      ? {
          name: error.name ?? undefined,
          code: error.code ?? undefined,
          status: error.status ?? undefined,
          message: error.message ?? String(error),
        }
      : {}),
    ...(extra && typeof extra === 'object' ? extra : {}),
  };

  console.error('[NEOPAD AUTH DIAGNOSTIC]', JSON.stringify(payload));
}
