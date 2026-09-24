export function capitalize(str) {
  const firstLetterCap = str.charAt(0).toUpperCase();

  const remainingLetters = str.slice(1);

  return firstLetterCap + remainingLetters;
}

export function camelCaseToPhrase(str) {
  return str.replace(/([A-Z])/g, ' $1');
}

export function parseAmount(str) {
  return Number(str.replace(/[$,\s]/g, ''));
}

export function formatAmount(amount) {
  const sign = amount < 0 ? '-' : '';

  return `${sign}$${Math.abs(amount).toFixed(2)}`;
}

export function formatDate(date) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${month}-${day}-${date.getFullYear()}`;
}
