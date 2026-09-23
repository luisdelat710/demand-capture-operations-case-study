// Portfolio recreation with synthetic records. Calendar uses local date components.
export const UNITS = ['Unit A · delivery', 'Unit B · delivery', 'Unit C · yard'];
export const ALLOWED_MISSING = 3;

export function workingDays(year, month) {
  const dates = [];
  const count = new Date(year, month, 0).getDate();
  for (let day = 1; day <= count; day++) {
    const date = new Date(year, month - 1, day);
    if (date.getDay() !== 0) dates.push(`${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`);
  }
  return dates;
}

export function reportingKpi(year, month, units, records) {
  const dates = workingDays(year, month);
  const valid = new Set(records.filter(r => dates.includes(r.date) && units.includes(r.unit)).map(r => `${r.unit}|${r.date}`));
  const expected = dates.length * units.length;
  const reported = valid.size;
  const missing = expected - reported;
  return {days:dates.length, expected, reported, missing, withinThreshold:missing <= ALLOWED_MISSING};
}

export function fuelMetrics({fuelSpend, sales, firstOdometer, lastOdometer, liters}) {
  const values = [fuelSpend, sales, firstOdometer, lastOdometer, liters];
  if (values.some(v => !Number.isFinite(v) || v < 0)) throw new Error('Use nonnegative numbers.');
  if (lastOdometer < firstOdometer) throw new Error('Review odometer readings: final is below initial.');
  return {
    fuelSharePct: sales > 0 ? fuelSpend / sales * 100 : null,
    distanceKm: lastOdometer - firstOdometer,
    kmPerLiter: liters > 0 ? (lastOdometer - firstOdometer) / liters : null
  };
}

export function attentionCount(records) {
  return records.filter(r => r.status === 'Needs attention').length;
}
