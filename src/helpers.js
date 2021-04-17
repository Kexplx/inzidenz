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

/**
 * @example
 * getWeekday(0) // 'Son'
 * getWeekday(1) // 'Mon'
 * getWeekday(1, false) // 'Montag'
 */
export function getWeekday(ds, short = true) {
  const weekdaysShort = ['So.', 'Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.'];
  const weekdaysLong = [
    'Sonntag',
    'Montag',
    'Dienstag',
    'Mittwoch',
    'Donnerstag',
    'Freitag',
    'Samstag',
  ];
  const date = new Date();

  date.setDate(Number(ds.slice(0, 2)));
  date.setMonth(Number(ds.slice(3, 5)) - 1);
  date.setFullYear(new Date().getFullYear());

  if (short) {
    return weekdaysShort[date.getDay()];
  }

  return weekdaysLong[date.getDay()];
}

export function getCountyName(county) {
  let name = county.name;

  if (county.type.includes('Landkreis')) {
    name += ' (LK)';
  }

  return name;
}
