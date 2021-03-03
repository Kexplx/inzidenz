export function formatDate(date) {
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
  const year = date.getFullYear();

  const hours = date.getUTCHours() < 10 ? '0' + date.getUTCHours() : date.getUTCHours();
  const minutes = date.getUTCMinutes() < 10 ? '0' + date.getUTCMinutes() : date.getUTCMinutes();

  return `${day}.${month}.${year}, ${hours}:${minutes} Uhr`;
}
