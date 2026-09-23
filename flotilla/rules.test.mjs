import test from 'node:test';
import assert from 'node:assert/strict';
import {workingDays, reportingKpi, fuelMetrics, attentionCount} from './rules.mjs';

test('working days exclude Sundays and reporting counts distinct unit and day', () => {
  const dates = workingDays(2026, 9);
  assert.equal(dates.length, 26);
  const one = {date:dates[0], unit:'A'};
  assert.deepEqual(reportingKpi(2026, 9, ['A'], [one, one, {date:dates[0],unit:'B'}]), {
    days:26, expected:26, reported:1, missing:25, withinThreshold:false
  });
});

test('threshold and fuel divisions handle boundaries', () => {
  const dates = workingDays(2026, 9);
  const records = dates.slice(0,-3).map(date => ({unit:'A',date}));
  assert.equal(reportingKpi(2026, 9, ['A'], records).withinThreshold, true);
  assert.deepEqual(fuelMetrics({fuelSpend:200,sales:10000,firstOdometer:1000,lastOdometer:1200,liters:40}), {
    fuelSharePct:2, distanceKm:200, kmPerLiter:5
  });
  assert.equal(fuelMetrics({fuelSpend:0,sales:0,firstOdometer:0,lastOdometer:0,liters:0}).fuelSharePct, null);
  assert.throws(() => fuelMetrics({fuelSpend:0,sales:1,firstOdometer:10,lastOdometer:9,liters:1}));
  assert.equal(attentionCount([{status:'Needs attention'},{status:'OK'}]),1);
});
