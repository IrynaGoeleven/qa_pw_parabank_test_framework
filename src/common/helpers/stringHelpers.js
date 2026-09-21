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
  const absolute = Math.abs(amount).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `${sign}$${absolute}`;
}
