// 29181 -> "29.181"
// am i overthinking the fuck out of this??
export function addDecimalPoint(n) {
  const t = String(n);

  return t
    .split('')
    .reverse()
    .map((s, i) => {
      if ((i + 1) % 3 === 0) {
        return '.' + s;
      }

      return s;
    })
    .reverse()
    .join('')
    .replace(/^\./, '');
}
