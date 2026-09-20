import test from 'node:test';
import assert from 'node:assert/strict';
import { ART_SIZE, artworkMatrix, consultationCamera, galleryCamera, GALLERY_STATIONS, nextStation, project } from './studio-gallery.ts';

test('every artwork registers at all four corners of its own wall frame',()=>{
  const source=[[0,0],[ART_SIZE[0],0],[ART_SIZE[0],ART_SIZE[1]],[0,ART_SIZE[1]]];
  for(const station of GALLERY_STATIONS) {
    const h=artworkMatrix(station.corners);
    for(let i=0;i<4;i++) {
      const actual=project(h,source[i]);
      assert.ok(Math.hypot(actual[0]-station.corners[i][0],actual[1]-station.corners[i][1])<1e-6);
    }
  }
});

test('each camera stop faces its artwork and keeps the complete image in the viewport',()=>{
  for(const [w,h] of [[1280,720],[1920,1080],[807,467],[390,844],[360,640]]) {
    for(let i=0;i<GALLERY_STATIONS.length;i++) {
      const camera=galleryCamera(i,w,h);
      const corners=GALLERY_STATIONS[i].corners.map(p=>project(camera,p));
      for(const [x,y] of GALLERY_STATIONS[i].corners) assert.ok(camera[6]*x+camera[7]*y+camera[8]>0,'CSS must not clip the selected artwork behind its camera');
      for(const [x,y] of corners) { assert.ok(Number.isFinite(x+y)); assert.ok(x>=0&&x<=w&&y>=0&&y<=h); }
      assert.ok(Math.abs(corners[0][1]-corners[1][1])<1e-6);
      assert.ok(Math.abs(corners[0][0]-corners[3][0])<1e-6);
      const aspect=(corners[1][0]-corners[0][0])/(corners[3][1]-corners[0][1]);
      assert.ok(Math.abs(aspect-16/9)<1e-6);
    }
  }
});

test('arrows start at the first piece from the overview and wrap the six-work collection',()=>{
  assert.equal(nextStation(null,1),0);
  assert.equal(nextStation(null,-1),5);
  assert.equal(nextStation(0,-1),5);
  assert.equal(nextStation(5,1),0);
  assert.equal(new Set(GALLERY_STATIONS.map(s=>s.id)).size,6);
});


test('the consultation approach stays inside the photograph and centers the passage', () => {
  for (const [w, h] of [[1280,720],[1920,1080],[390,844],[360,640]]) {
    const camera = consultationCamera(w,h);
    const center = project(camera,[836,455]);
    assert.ok(Math.abs(center[0]-w/2)<1e-6);
    assert.ok(Math.abs(center[1]-h/2)<1e-6);
    const topLeft = project(camera,[0,0]);
    const bottomRight = project(camera,[1672,941]);
    assert.ok(topLeft[0]<=0 && topLeft[1]<=0);
    assert.ok(bottomRight[0]>=w && bottomRight[1]>=h);
    assert.ok(camera.every(Number.isFinite));
  }
});

test('mobile artwork clears the two navigation rows and short desktop artwork clears the thumbnails',()=>{
  for(let i=0;i<GALLERY_STATIONS.length;i++) {
    const mobile=GALLERY_STATIONS[i].corners.map(p=>project(galleryCamera(i,390,844),p));
    assert.ok(Math.min(...mobile.map(p=>p[1]))>=164.9);
    const landscape=GALLERY_STATIONS[i].corners.map(p=>project(galleryCamera(i,807,467),p));
    assert.ok(Math.min(...landscape.map(p=>p[1]))>=111.9);
    assert.ok(Math.max(...landscape.map(p=>p[1]))<300);
  }
});
