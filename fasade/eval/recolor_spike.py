"""Spike v2: e2 demo house (clear color separation) + bbox-restricted mask.
Goal: judge the RECOLOR transform quality. Production mask = SAM-class model."""
import numpy as np
from PIL import Image, ImageFilter, ImageDraw
import os

M = '/tmp/claude-0/-home-user-Claude/4e4bb2d4-b51a-5d47-9451-4638e34b7387/scratchpad/matrix'
K = os.path.dirname(os.path.abspath(__file__))

im = Image.open(os.path.join(M, 'orig_e2.jpg')).convert('RGB')
rgb = np.asarray(im, dtype=np.float64) / 255.0
H, W, _ = rgb.shape
r, g, b = rgb[...,0], rgb[...,1], rgb[...,2]
mx = rgb.max(axis=2); mn = rgb.min(axis=2)
v = mx

# warm dark-brown cladding: r>g>b, moderate value, not green foliage, not sky
warm = (r > g) & (g > b) & (r - b > 0.02)
darkish = (v > 0.05) & (v < 0.55)
not_green = g < r + 0.02
cand = warm & darkish & not_green

# restrict to house + garage bboxes (read off the photo; SAM replaces this)
mask = np.zeros((H, W), dtype=bool)
Hs, Ws = H/900.0, W/1200.0  # image is 1200x900-based coords
def box(x0,y0,x1,y1):
    mask[int(y0*Hs):int(y1*Hs), int(x0*Ws):int(x1*Ws)] = True
bb = np.zeros((H,W), dtype=bool)
for x0,y0,x1,y1 in [(400,290,850,585), (860,415,1160,560)]:
    bb[int(y0*Hs):int(y1*Hs), int(x0*Ws):int(x1*Ws)] = True
mask = cand & bb

# exclude roof: roof plane = above wall line; approx via per-column top cut inside bbox
# roof tiles are grayer (low saturation); refine: cladding saturation moderate
s = np.where(mx > 0, (mx - mn) / np.maximum(mx, 1e-6), 0)
mask = mask & (s > 0.18)

mimg = Image.fromarray((mask*255).astype(np.uint8)).filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(1.5))
mask_f = np.asarray(mimg, dtype=np.float64)/255.0

def recolor(rgb, mask_f, target_rgb, target_L=None, contrast=1.0):
    L = 0.299*rgb[...,0]+0.587*rgb[...,1]+0.114*rgb[...,2]
    mL = (L*mask_f).sum()/max(mask_f.sum(),1e-6)
    tr = np.array(target_rgb)/255.0
    tL = 0.299*tr[0]+0.587*tr[1]+0.114*tr[2] if target_L is None else target_L
    Ln = np.clip(tL + (L-mL)*contrast, 0, 1)
    out = rgb.copy()
    for c in range(3):
        chan = np.clip(tr[c]*(Ln/max(tL,1e-6)), 0, 1)
        out[...,c] = rgb[...,c]*(1-mask_f) + chan*mask_f
    return out

variants = {
    'hvit': recolor(rgb, mask_f, (240,238,232), target_L=0.86, contrast=1.35),
    'rorosrod': recolor(rgb, mask_f, (128,44,36), contrast=1.1),
    'kystgra': recolor(rgb, mask_f, (172,168,158), target_L=0.64, contrast=1.2),
}
Image.fromarray((mask_f*255).astype(np.uint8)).save(os.path.join(K,'mask2.png'))
for n,a in variants.items():
    Image.fromarray((np.clip(a,0,1)*255).astype(np.uint8)).save(os.path.join(K,f're2_{n}.jpg'), quality=90)

Wt=800
items=[(os.path.join(M,'orig_e2.jpg'),'FØR'),(os.path.join(K,'mask2.png'),'maske v2 (farge+bbox — prod: SAM)'),
       (os.path.join(K,'re2_hvit.jpg'),'recolor hvit'),(os.path.join(K,'re2_rorosrod.jpg'),'recolor rørosrød'),
       (os.path.join(K,'re2_kystgra.jpg'),'recolor kystgrå')]
ims=[]
for p,l in items:
    i2=Image.open(p).convert('RGB'); h=int(i2.height*Wt/i2.width); ims.append((i2.resize((Wt,h)),l))
rowh=max(i.height for i,_ in ims)+26
sheet=Image.new('RGB',(Wt*3,rowh*2),'white'); d=ImageDraw.Draw(sheet)
for i,(img,l) in enumerate(ims):
    x,y=(i%3)*Wt,(i//3)*rowh
    sheet.paste(img,(x,y)); d.text((x+8,y+img.height+5),l,fill='black')
sheet.save(os.path.join(K,'spike2_strip.jpg'),quality=84)
print('ok')
