import re

with open('files/Brandguide-Export.html', 'r', encoding='utf-8') as f:
    text = f.read()

# Fix Image on Page 10 (Layout-Prinzipien)
text = text.replace('Bilder Sabala/7 - 36_CH_Sehnde_.jpg" class="object-cover w-full h-full grayscale"', 'Bilder Sabala/7 - 36_CH_Sehnde_.jpg" class="object-cover w-full h-full"')

# Fix Interface Design Page (04 / Interface Design) to ensure zero contrast issues
old_interface_design = re.search(r'(<div class="page p-8 relative">.*?04 / Interface Design.*?)<div class="page', text, flags=re.DOTALL)
if old_interface_design:
    old_html = old_interface_design.group(1)
    
    # Let's completely nuke the contrast ambiguity. The box is white, text is black.
    # If the user saw no text, let's explicitly style it.
    new_html = re.sub(
        r'<div class="p-8 border border-whisper-border bg-\[#FAF8F5\].*?</div>\s*</div>',
        '''<div class="p-8 border border-whisper-border bg-pure-surface rounded-[2.5rem] relative overflow-hidden group mb-10 shadow-warm-shadow">
        <div class="font-instrument text-4xl mb-4 text-deep-charcoal z-10 relative">Navigation Pill</div>
        <p class="text-warm-steel mb-6 z-10 relative">Glassmorphism Floating Pill, dezente Border, CTA immer sichtbar.</p>
        <div class="bg-warm-canvas border border-whisper-border p-3 rounded-full flex justify-between items-center w-full max-w-md">
           <span class="pl-4 font-instrument text-xl text-deep-charcoal">Sabala</span>
           <button class="bg-night-gold text-deep-charcoal px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider">Menu</button>
        </div>
      </div>''',
        old_html,
        flags=re.DOTALL
    )
    
    # Also explicitly fix the secondary pills
    new_html = re.sub(
        r'<div class="flex justify-between items-center bg-\[#1A1A18\]/5 border border-whisper-border p-6 rounded-2xl">',
        '<div class="flex justify-between items-center bg-pure-surface border border-whisper-border shadow-sm p-6 rounded-[2rem]">',
        new_html
    )

    text = text.replace(old_html, new_html)

with open('files/Brandguide-Export.html', 'w', encoding='utf-8') as f:
    f.write(text)
