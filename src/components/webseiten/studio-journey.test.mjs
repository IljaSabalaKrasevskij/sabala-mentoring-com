import test from 'node:test';
import assert from 'node:assert/strict';
import { APPROACH_SCREENS, caseSlot, journeyProgress, windowView, cinemaShot, filmAt, stillShot, cameraShot, doorAngle, eaglePosition, ROOM_PROGRESS, roomAt } from './studio-journey.ts';

const samples = Array.from({ length: 1001 }, (_, i) => i / 1000);
test('the camera enters through both door openings, never through a wall', () => {
  let previous = cameraShot(0).position;
  for (const p of samples) {
    const position = cameraShot(p).position;
    for (const wallZ of [0, -11]) {
      if (previous[2] >= wallZ && position[2] < wallZ) {
        assert.ok(position[0] > 2.85 && position[0] < 5.1, `Door missed at z=${wallZ}: x=${position[0]}`);
        assert.ok(position[1] > 0.1 && position[1] < 4.2);
        if (wallZ === 0) assert.ok(Math.abs(doorAngle(p)) > Math.PI / 2, 'Front door must be open before entering');
      }
    }
    previous = position;
  }
});

test('camera and guide paths stay finite and continuous over a full forward and reverse journey', () => {
  let previousCamera = cameraShot(0).position;
  let previousEagle = eaglePosition(0);
  for (const p of [...samples, ...samples.toReversed()]) {
    const shot = cameraShot(p), eagle = eaglePosition(p);
    assert.ok([...shot.position, ...shot.target, ...eagle].every(Number.isFinite));
    assert.ok(Math.hypot(...shot.position.map((v, i) => v - previousCamera[i])) < 0.15, `Camera jumps at ${p}`);
    assert.ok(Math.hypot(...eagle.map((v, i) => v - previousEagle[i])) < 0.15, `Guide jumps at ${p}`);
    previousCamera = shot.position; previousEagle = eagle;
  }
});

test('all navigation stops land in the intended room', () => {
  for (const [room, p] of Object.entries(ROOM_PROGRESS)) assert.equal(roomAt(p), room);
  assert.deepEqual(cameraShot(-10), cameraShot(0));
  assert.deepEqual(cameraShot(10), cameraShot(1));
});

test('the guide reaches the counter before the reception stop and walks around it to leave', () => {
  assert.deepEqual(eaglePosition(ROOM_PROGRESS.reception), [-1.65, 0, -7.9]);
  for (const p of samples) {
    const [x, , z] = eaglePosition(p);
    assert.ok(!(x > -4.05 && x < 0.75 && z > -7.65 && z < -6.15), `Guide intersects counter at ${p}`);
  }
  assert.ok(eaglePosition(ROOM_PROGRESS.gallery)[2] < -19);
});


test('photographic navigation stops show exactly their intended room and no transition film', () => {
  for (const [room, p] of Object.entries(ROOM_PROGRESS)) {
    const shot = cinemaShot(p);
    for (const key of ['window', 'reception', 'gallery']) assert.equal(shot[key].opacity, key === room ? 1 : 0);
    assert.equal(filmAt(p).active, false);
    assert.equal(stillShot(room)[room], 1);
  }
});

test('film scrubbing follows scroll in either direction without running during room interaction', () => {
  for (const [start, end, index] of [[.105, .405, 0], [.535, .88, 1]]) {
    const times = samples.map(t => filmAt(start + (end - start) * t).time);
    for (let i = 1; i < times.length; i++) assert.ok(times[i] >= times[i - 1]);
    for (const t of [.1, .25, .5, .75, .9]) {
      const moment = filmAt(start + (end - start) * t);
      assert.equal(moment.index, index);
      assert.ok(Math.abs(moment.time - t) < 1e-10);
      assert.equal(moment.active, true);
    }
    assert.equal(filmAt(start).opacity, 0);
    assert.equal(filmAt(end).opacity, 0);
  }
});

test('reduced motion removes all camera translation, scale and door rotation', () => {
  for (const p of samples) {
    const shot = cinemaShot(p, true);
    assert.equal(shot.door, 0);
    for (const key of ['window', 'reception', 'gallery']) {
      assert.equal(shot[key].scale, 1); assert.equal(shot[key].x, 0);
      assert.ok(shot[key].opacity >= 0 && shot[key].opacity <= 1);
    }
  }
});


test('arrival reserves space to inspect the close window before any entrance film starts', () => {
  for (const distance of [0, .25, .5, .85, APPROACH_SCREENS]) {
    assert.equal(journeyProgress(distance, false), 0);
    assert.equal(filmAt(journeyProgress(distance, false)).active, false);
  }
  // Once the close view has settled, less than one additional screen starts the entrance.
  assert.equal(filmAt(journeyProgress(.85, false)).active, false);
  assert.equal(filmAt(journeyProgress(1.5, false)).active, true);
  assert.equal(windowView(1, 0).scale, windowView(2, 0).scale);
  assert.ok(windowView(1, 0).scale > 1.5);
  assert.equal(journeyProgress(20, false), .48);
  assert.equal(journeyProgress(20, true), 1);
});

test('mouse look pans toward either side and settles into the existing film framing', () => {
  assert.ok(windowView(1, 0, -1).x > windowView(1, 0, 1).x);
  const end = windowView(3.2, .24, 1);
  assert.equal(end.scale, 1); assert.equal(end.x, 0); assert.equal(end.y, -0);
  for (const distance of [0, .5, 1, 2]) {
    const reduced = windowView(distance, 0, 1, true);
    assert.equal(reduced.scale, 1); assert.equal(reduced.x, 0); assert.equal(reduced.y, 0);
  }
});

test('the gallery carousel always shows exactly one neighbour on each side', () => {
  for (const n of [3, 5, 6, 7]) {
    for (let active = 0; active < n; active++) {
      const slots = Array.from({ length: n }, (_, i) => caseSlot(i, active, n));
      assert.equal(slots[active], 0, `n=${n}, active=${active}: the selected work must sit in the middle`);
      assert.equal(slots.filter(s => s === -1).length, 1, `n=${n}, active=${active}: exactly one work on the left`);
      assert.equal(slots.filter(s => s === 1).length, 1, `n=${n}, active=${active}: exactly one work on the right`);
      // It wraps: from the last work the arrow leads back to the first one.
      assert.equal(caseSlot((active + 1) % n, active, n), 1);
      assert.equal(caseSlot((active - 1 + n) % n, active, n), -1);
    }
  }
});
