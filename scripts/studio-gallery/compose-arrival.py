#!/usr/bin/env python3
"""Render the reviewed gallery arrival using the original host and camera movement.
Requires Python, numpy, opencv-python and ffmpeg. No model or API calls.
Run: python3 scripts/studio-gallery/compose-arrival.py --output-dir /tmp/gallery-arrival
"""
import argparse
import json
import subprocess
import tempfile
from pathlib import Path
import cv2
import numpy as np

parser=argparse.ArgumentParser(description=__doc__)
parser.add_argument('--output-dir',type=Path,required=True)
parser.add_argument('--review',action='store_true',help='Also export inspection frames and a contact sheet')
args=parser.parse_args()
root=Path(__file__).resolve().parent
repo=root.parents[1]
output=args.output_dir.resolve()
output.mkdir(parents=True,exist_ok=True)
temporary=tempfile.TemporaryDirectory(prefix='sabala-gallery-')
temp=Path(temporary.name)
cv2.setRNGSeed(0)
tracks={int(n):[np.float32(q) for q in quads] for n,quads in json.loads((root/'arrival-tracks.json').read_text()).items()}
foreground=json.loads((root/'arrival-foreground.json').read_text())
host={int(n):p for n,p in foreground['body'].items()}
arm={int(n):p for n,p in foreground['arm'].items()}
def interp(keys,n):
    ks=sorted(keys)
    if n<=ks[0]: return np.float32(keys[ks[0]])
    if n>=ks[-1]: return np.float32(keys[ks[-1]])
    a=max(k for k in ks if k<=n);b=min(k for k in ks if k>=n)
    return np.float32(keys[a]) if a==b else np.float32(keys[a])+(np.float32(keys[b])-keys[a])*((n-a)/(b-a))
source_names=['rfqtopo','yuna','dielommel','vegaleads','stefan-pons','cyber-sales','rfqtopo']
art=[]
for name in source_names:
 im=cv2.imread(str(repo/f'public/case-studies/{name}.jpg'))
 h,w=im.shape[:2];cw=min(w,round(h*16/9));ch=min(h,round(w*9/16));im=im[:ch,(w-cw)//2:(w+cw)//2]
 im=cv2.resize(im,(1000,562),interpolation=cv2.INTER_AREA).astype(np.float32)
 gray=cv2.cvtColor(im,cv2.COLOR_BGR2GRAY)[:,:,None];art.append((im*.85+gray*.15)*.90)
cap=cv2.VideoCapture(str(repo/'public/webseiten/studio-salon-v2/gallery-doorway-v3.mp4'))
writer=cv2.VideoWriter(str(temp/'gallery-composite.avi'),cv2.VideoWriter_fourcc(*'FFV1'),24,(1280,720))
thumbs=[]
n=0
while True:
 ok,frame=cap.read()
 if not ok:break
 result=frame.astype(np.float32)
 if n>=132:
  gray=cv2.cvtColor(frame,cv2.COLOR_BGR2GRAY)
  foreground=np.zeros(gray.shape,np.uint8)
  if n>=144:
   cv2.fillPoly(foreground,[np.int32(interp(host,n))],255)
   if n>=198:cv2.fillPoly(foreground,[np.int32(interp(arm,n))],255)
   # Refine the small uncertain edge band against the original moving silhouette.
   ys,xs=np.where(foreground>0);x0=max(0,xs.min()-14);x1=min(1280,xs.max()+15);y0=max(0,ys.min()-14);y1=min(720,ys.max()+15)
   fg=foreground[y0:y1,x0:x1]
   mask=np.zeros(fg.shape,np.uint8)
   mask[cv2.dilate(fg,np.ones((15,15),np.uint8))>0]=cv2.GC_PR_BGD
   mask[fg>0]=cv2.GC_PR_FGD
   mask[cv2.erode(fg,np.ones((11,11),np.uint8))>0]=cv2.GC_FGD
   cv2.grabCut(frame[y0:y1,x0:x1],mask,None,np.zeros((1,65)),np.zeros((1,65)),2,cv2.GC_INIT_WITH_MASK)
   foreground[y0:y1,x0:x1]=np.uint8((mask==cv2.GC_FGD)|(mask==cv2.GC_PR_FGD))*255
   foreground=cv2.dilate(foreground,np.ones((3,3),np.uint8))
  # The real door remains in front as each hung piece is revealed.
  if n<154:
   boundary=int(interp({132:839,138:711,144:554,150:241,154:0},n))
   foreground[:,:boundary]=255
  keep=cv2.GaussianBlur(foreground.astype(np.float32)/255,(3,3),.55)
  for i,q in enumerate(tracks[n]):
   if q[:,0].max()<0 or q[:,0].min()>1279:continue
   h=cv2.getPerspectiveTransform(np.float32([[0,0],[999,0],[999,561],[0,561]]),np.float32(q))
   warped=cv2.warpPerspective(art[i],h,(1280,720),flags=cv2.INTER_LINEAR)
   alpha=np.zeros(gray.shape,np.uint8);cv2.fillConvexPoly(alpha,np.int32(q),255)
   alpha=cv2.erode(alpha,np.ones((3,3),np.uint8)).astype(np.float32)/255
   # Gold frame edges and their original warm highlights remain above the picture.
   alpha*=np.clip((68-gray.astype(np.float32))/18,0,1)
   alpha*=1-keep
   alpha=cv2.GaussianBlur(alpha,(3,3),.4)[:,:,None]
   # Keep the artwork bright enough to read, with the room's original illumination.
   illumination=(.95+np.clip(gray.astype(np.float32)-20,-16,35)*.003)[:,:,None]
   result=result*(1-alpha)+warped*illumination*alpha
  if args.review and n in [138,141,144,147,150,156,162,168,174,180,186,192,198,204,210,216,228,240]:
   out=np.uint8(np.clip(result,0,255));cv2.imwrite(str(output/f'composite-{n}.jpg'),out)
   review=out.copy();cv2.putText(review,f'{n} / {n/24:.2f}s',(15,32),0,1,(255,255,255),2);thumbs.append(cv2.resize(review,(640,360)))
 writer.write(np.uint8(np.clip(result,0,255)))
 n+=1
writer.release()
if thumbs: cv2.imwrite(str(output/'composite-review.jpg'),np.vstack([np.hstack(thumbs[i:i+2]) for i in range(0,len(thumbs),2)]))
print(f'Composited {n} frames',flush=True)

if n != 241:
    raise RuntimeError(f'Expected the reviewed 241-frame source, got {n}. Re-register the wall tracks before using a different take.')
for suffix,crf in [('',20),('-mobil',26)]:
    subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-i',str(temp/'gallery-composite.avi'),'-an','-c:v','libx264','-preset','slow','-crf',str(crf),'-g','6','-keyint_min','6','-sc_threshold','0','-bf','2','-pix_fmt','yuv420p','-movflags','+faststart',str(output/f'gallery-hung-v4{suffix}.mp4')],check=True)
temporary.cleanup()
print(f'Desktop and mobile films written to {output}')
