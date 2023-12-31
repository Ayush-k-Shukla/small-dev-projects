/**
 * return a generic message for status code
 *
 * @param {?number} [status]
 * @return  {string}
 */
export function getStatusMessage(status?: number): string {
  switch (status) {
    case 200:
      return 'OK';
    case 404:
      return 'Not Found';
    case 401:
      return 'Unauthorized';
    case 500:
      return 'Internal Server Error';
  }
  return 'OK';
}
