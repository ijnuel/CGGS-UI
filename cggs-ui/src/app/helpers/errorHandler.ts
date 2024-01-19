
export function errorHandler(err: any) {
  if (err.status == 401) {
    location.href = "/";
  }
  else if (err.status == 403) {
    location.href = "/home";
  }

  return {
    error: true,
    message:
      err?.error?.ExceptionMessage ||
      err?.error?.Message ||
      err?.Message ||
      "An error occurred.",
  };
}
