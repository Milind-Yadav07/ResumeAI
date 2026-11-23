/**
 * Extracts a safe, user-friendly error message from unknown catch errors.
 * Masks raw JavaScript/network engine errors while preserving intentional backend messages.
 */
export function getErrorMessage(error: unknown): string {
  const rawMessage =
    error instanceof Error
      ? error.message
      : typeof error === 'string'
        ? error
        : '';

  if (!rawMessage) {
    return 'An unexpected error occurred. Please try again.';
  }

  // Mask raw browser JSON parse errors (e.g. HTML 404/502 responses)
  if (
    error instanceof SyntaxError ||
    rawMessage.includes('Unexpected token') ||
    rawMessage.includes('is not valid JSON')
  ) {
    return 'Service is temporarily unavailable. Please try again in a moment.';
  }

  // Mask raw browser fetch/network failure strings
  if (
    rawMessage === 'Failed to fetch' ||
    rawMessage.includes('NetworkError') ||
    rawMessage.includes('Load failed')
  ) {
    return 'Unable to connect to the server. Please check your internet connection and try again.';
  }

  return rawMessage;
}
