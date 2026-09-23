// Portfolio recreation of selected business rules. All inputs are synthetic.
export const SMALL_VEHICLE_LIMIT_KG = 1230;
export const CONSOLIDATION_TRIGGER_KG = 1200;
export const CONSOLIDATION_WINDOW_MIN = 120;

export function vehicleFor(weightKg, service = 'own') {
  if (service === 'external') return 'External carrier';
  if (!Number.isFinite(weightKg) || weightKg <= 0) throw new Error('Enter a positive weight.');
  return weightKg <= SMALL_VEHICLE_LIMIT_KG ? 'Light truck' : 'Heavy truck';
}

function minutes(time) {
  const match = /^(\d{2}):(\d{2})$/.exec(time || '');
  if (!match) throw new Error('Enter a valid time.');
  const hour = Number(match[1]);
  const minute = Number(match[2]);
  if (hour > 23 || minute > 59) throw new Error('Enter a valid time.');
  return hour * 60 + minute;
}

export function consolidationCandidates(order, existing) {
  if (vehicleFor(order.weightKg, order.service) !== 'Light truck') return [];
  const scheduled = minutes(order.time);
  return existing.filter((other) =>
    other.id !== order.id &&
    other.vehicle === 'Light truck' &&
    other.date === order.date &&
    other.zone === order.zone &&
    Math.abs(minutes(other.time) - scheduled) <= CONSOLIDATION_WINDOW_MIN &&
    other.weightKg + order.weightKg > CONSOLIDATION_TRIGGER_KG
  );
}

export const STATUSES = ['To prepare', 'En route', 'Delivered'];
export function nextStatus(status) {
  const index = STATUSES.indexOf(status);
  if (index < 0) throw new Error('Unknown status.');
  return STATUSES[Math.min(index + 1, STATUSES.length - 1)];
}
