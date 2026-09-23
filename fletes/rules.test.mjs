import test from 'node:test';
import assert from 'node:assert/strict';
import {vehicleFor, consolidationCandidates, nextStatus} from './rules.mjs';

test('vehicle boundary and external service', () => {
  assert.equal(vehicleFor(1230), 'Light truck');
  assert.equal(vehicleFor(1230.01), 'Heavy truck');
  assert.equal(vehicleFor(200, 'external'), 'External carrier');
  assert.throws(() => vehicleFor(0));
});

test('consolidation needs matching date, zone, vehicle, time and combined weight', () => {
  const newOrder = {id:'NEW', weightKg:700, date:'2026-10-06', time:'11:00', zone:'Local', service:'own'};
  const base = {weightKg:620, date:'2026-10-06', time:'09:00', zone:'Local', vehicle:'Light truck'};
  assert.deepEqual(consolidationCandidates(newOrder, [
    {id:'YES', ...base},
    {id:'TIME', ...base, time:'08:59'},
    {id:'ZONE', ...base, zone:'Regional'},
    {id:'DATE', ...base, date:'2026-10-07'},
    {id:'WEIGHT', ...base, weightKg:500},
    {id:'VEHICLE', ...base, vehicle:'Heavy truck'}
  ]).map(x => x.id), ['YES']);
  assert.equal(consolidationCandidates({...newOrder, service:'external'}, [{id:'YES', ...base}]).length, 0);
});

test('status moves forward and ends at delivered', () => {
  assert.equal(nextStatus('To prepare'), 'En route');
  assert.equal(nextStatus('En route'), 'Delivered');
  assert.equal(nextStatus('Delivered'), 'Delivered');
});
