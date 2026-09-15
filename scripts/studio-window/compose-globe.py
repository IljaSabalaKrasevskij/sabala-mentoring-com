"""Replace the first exhibit within the existing entrance film using reviewed tracking.
The globe is from the imagegen-edited plate. Original host, door and remaining frames stay intact.
"""
from pathlib import Path
import argparse
import cv2,numpy as np,json,subprocess
source=Path(__file__).resolve().parent
root=source.parents[1]
parser=argparse.ArgumentParser(description=__doc__)
parser.add_argument('--output-dir',type=Path,required=True)
args=parser.parse_args()
out=args.output_dir.resolve();out.mkdir(parents=True,exist_ok=True)
tracks={t['frame']:np.array(t['matrix']) for t in json.loads((source/'entry-globe-tracks.json').read_text())}
plate=cv2.resize(cv2.imread(str(root/'public/webseiten/studio-london-v1/exterior-globe-v2.webp')),(1280,720),interpolation=cv2.INTER_AREA).astype(np.float32)
# Small feathered replacement, covering both the old dossier and the new globe.
alpha=np.zeros((720,1280),np.float32)
x0,y0,x1,y1=[round(v) for v in (374*1280/1672,455*720/941,470*1280/1672,583*720/941)]
alpha[y0:y1,x0:x1]=1
alpha=cv2.GaussianBlur(alpha,(7,7),1.2)
cap=cv2.VideoCapture(str(root/'public/webseiten/studio-london-v1/entry.mp4'))
writer=cv2.VideoWriter(str(out/'entry-globe.avi'),cv2.VideoWriter_fourcc(*'FFV1'),24,(1280,720))
n=0
while True:
 ok,frame=cap.read()
 if not ok:break
 if n in tracks:
  h=tracks[n]
  overlay=cv2.warpPerspective(plate,h,(1280,720),flags=cv2.INTER_LINEAR)
  a=cv2.warpPerspective(alpha,h,(1280,720),flags=cv2.INTER_LINEAR)[:,:,None]
  frame=np.uint8(np.clip(frame*(1-a)+overlay*a,0,255))
 writer.write(frame);n+=1
writer.release();cap.release()
assert n==192,n
for suffix,crf in [('',20),('-mobil',26)]:
 subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-i',str(out/'entry-globe.avi'),'-an','-c:v','libx264','-preset','slow','-crf',str(crf),'-g','6','-keyint_min','6','-sc_threshold','0','-bf','2','-pix_fmt','yuv420p','-movflags','+faststart',str(out/f'entry-globe-v2{suffix}.mp4')],check=True)
print('Rendered',n,'frames in both encodes')

(out/'entry-globe.avi').unlink()
