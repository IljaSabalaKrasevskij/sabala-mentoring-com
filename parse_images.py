from PIL import Image
import glob
import os

for path in glob.glob("public/Sabalas Story/*.png"):
    try:
        img = Image.open(path)
        bbox = img.getbbox()
        if bbox:
            w = bbox[2] - bbox[0]
            h = bbox[3] - bbox[1]
            t = "landscape" if w > h else ("portrait" if h > w else "square")
            print(f"{os.path.basename(path)}: {w}x{h} ({t})")
    except Exception as e:
        pass
