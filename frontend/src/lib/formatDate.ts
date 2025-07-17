export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString();
}
export function formatDatetimeLocal(dateString: string): string {
  const date = new Date(dateString);
  return date.toISOString().slice(0, 16); // Returns in YYYY-MM-DDTHH:mm format
}
