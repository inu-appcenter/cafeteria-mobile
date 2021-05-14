export function isHttpRequestSuccessful(statusCode: number) {
  return statusCode >= 200 && statusCode <= 299;
}
