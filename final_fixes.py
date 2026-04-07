import re

with open('files/Brandguide-Export.html', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Remove all Top-Right Diamonds that clash with the Logo
# Search for: class="absolute top-10 right-10 ... Kristall ..."
# We will just nuke any element containing `top-10 right-10` and `Kristall`
text = re.sub(r'<img [^>]*top-10 right-10[^>]*Kristall[^>]*/>', '', text)

# 2. Fix the "Grauer Balken" on Interface Design (Secondary Buttons container)
# We will find the elements wrapping "Primary Button" and "Secondary Tag" and make them transparent
text = re.sub(
    r'<div class="flex justify-between items-center bg-pure-surface border border-whisper-border shadow-sm p-6 rounded-\[2rem\]">',
    '<div class="flex justify-between items-center bg-transparent py-4 w-full border-b border-whisper-border last:border-b-0">',
    text
)
# Just in case my previous regex didn't perfectly map the output of those divs, let's also catch any left-over variants:
text = re.sub(
    r'<div class="flex justify-between items-center bg-\[#1A1A18\]/5 border border-whisper-border p-6 rounded-2xl">',
    '<div class="flex justify-between items-center bg-transparent py-4 w-full border-b border-whisper-border last:border-b-0">',
    text
)

# 3. Move the Diamond further down on "Seite 12" (Motion & Animation)
# First extract the Motion page block
motion_match = re.search(r'(<!-- PAGE \d+:.*?Motion & Animation.*?</div>\s*</div>)', text, flags=re.DOTALL | re.IGNORECASE)
if motion_match:
    motion_html = motion_match.group(1)
    # The diamond on this page has something like: top-1/4 -left-32
    new_motion_html = re.sub(r'top-1/4', 'top-[75%]', motion_html)
    # If the diamond is top-[40%] or top-1/2 or something else, let's also aggressively shift it down
    new_motion_html = re.sub(r'top-\[40%\]', 'top-[75%]', new_motion_html)
    new_motion_html = re.sub(r'top-1/2', 'top-[80%]', new_motion_html)
    
    text = text.replace(motion_html, new_motion_html)

with open('files/Brandguide-Export.html', 'w', encoding='utf-8') as f:
    f.write(text)
