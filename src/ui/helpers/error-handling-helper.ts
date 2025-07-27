export const handleError = <T>(message: string, err: unknown, fallback: T): T => {
  alert(message);
  console.error(err);
  return fallback;
};