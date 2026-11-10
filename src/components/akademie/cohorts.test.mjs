import test from 'node:test';
import assert from 'node:assert/strict';
import { sessionZeiten } from './cohorts.ts';

test('Session-Zeiten tragen den Berliner Versatz: Winter +01:00, Sommer +02:00', () => {
  assert.deepEqual(sessionZeiten({ date: '2026-11-27', time: '14:00–16:30 Uhr MEZ' }), {
    start: '2026-11-27T14:00:00+01:00',
    ende: '2026-11-27T16:30:00+01:00',
  });
  assert.equal(sessionZeiten({ date: '2026-07-09', time: '16:00–18:30 Uhr' }).start, '2026-07-09T16:00:00+02:00');
});

test('eine unlesbare Uhrzeit bricht ab, statt einen falschen Termin zu liefern', () => {
  assert.throws(() => sessionZeiten({ date: '2026-07-09', time: 'nachmittags' }));
});
