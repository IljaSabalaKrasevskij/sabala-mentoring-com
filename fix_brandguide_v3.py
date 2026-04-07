import re

with open('files/Brandguide-Export.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update the `.gold` CSS
style_gold = """
    .gold { background-color: #FAF8F5; color: #1A1A18; }
    .gold::before { content: ""; position: absolute; inset: 0; background-color: rgba(184,150,62,0.06); z-index: 0; pointer-events: none; }
"""
content = re.sub(r'\.gold\s*\{.*?\}', style_gold.strip(), content, flags=re.DOTALL)
# Also remove any previous injected style to be safe, then inject cleanly
content = content.replace('.night { background-color: #1A1A18; color: #F5EFE0; }', 
                          '.night { background-color: #1A1A18; color: #F5EFE0; }\n' + style_gold.strip())

# Clean old logos entirely
content = re.sub(r'<img src="\.\./public/images/logo-sabala-mentoring\.png".*?>', '', content)

# 2. Split by pages
pages = re.split(r'(<!-- PAGE \d+:.*?\n  <div.*?class="page.*?>)', content)

# Define exact requested rhythm
# Dunkel = 'night', Gold-Warm = 'gold', Hell = 'light'
rhythm_list = [
    'night', # 1. Cover
    'gold',  # 2. Brand Essence
    'light', # 3. Color Palette
    'night', # 4. Typography
    'light', # 5. Interface Design
    'gold',  # 6. Bildsprache & Mood
    'night', # 7. Dark Palette
    'light', # 8. Akzent & Verbotene Farben
    'night', # 9. Verbotene Fonts
    'gold',  # 10. Tone of Voice
    'night', # 11. Layout-Prinzipien
    'light', # 12. Hero-Section
    'night', # 13. Komponenten
    'gold',  # 14. Motion & Animation
    'night', # 15. Anti-Patterns
    'light'  # 16. Anwendung & Kontakt
]

diamond_styles = [
    # 0: Large background screen (Light themes use multiply, Dark use screen)
    '<img src="../public/images/Schwebender Kristall mit goldenen Einschlüssen.png" class="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-auto object-contain {opacity} z-0 {blend} pointer-events-none blur-[1px]" />',
    # 1: Bottom right subtle
    '<img src="../public/images/Schwebender Kristall mit goldenen Einschlüssen.png" class="absolute -bottom-20 -right-20 w-[400px] h-[400px] object-cover {opacity} z-0 {blend} rotate-45 pointer-events-none" />',
    # 2: Top right geometric accent
    '<img src="../public/images/Schwebender Kristall mit goldenen Einschlüssen.png" class="absolute top-10 right-10 w-24 h-24 object-contain opacity-[0.25] z-0 pointer-events-none rotate-12" />',
    # 3: Huge half cut off on left
    '<img src="../public/images/Schwebender Kristall mit goldenen Einschlüssen.png" class="absolute top-1/4 -left-32 w-[600px] h-[600px] object-cover {opacity} z-0 {blend} pointer-events-none -rotate-12" />',
    # 4: Center subtle watermark
    '<img src="../public/images/Schwebender Kristall mit goldenen Einschlüssen.png" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-auto object-contain {opacity} z-0 {blend} pointer-events-none" />',
]

def make_dark(html):
    html = html.replace('text-deep-charcoal', 'text-white')
    html = html.replace('text-warm-steel', 'text-night-secondary')
    html = html.replace('text-refined-gold', 'text-night-gold')
    html = html.replace('border-whisper-border', 'border-white/10')
    html = html.replace('bg-[#FAF8F5]', 'bg-[#1A1A18]')
    return html

def make_light(html):
    html = html.replace('text-white', 'text-deep-charcoal')
    html = html.replace('text-night-secondary', 'text-warm-steel')
    html = html.replace('text-night-gold', 'text-refined-gold')
    html = html.replace('border-white/10', 'border-whisper-border')
    html = html.replace('bg-[#1A1A18]', 'bg-[#FAF8F5]')
    html = html.replace('bg-white/[0.02]', 'bg-[#1A1A18]/[0.02]')
    html = html.replace('bg-white/5', 'bg-[#1A1A18]/5')
    return html

new_content = [pages[0]]

page_index = 0

for i in range(1, len(pages), 2):
    header_tag = pages[i]
    page_html = pages[i+1]
    
    # Check if this is the "Logomark" page that needs to be deleted completely
    if '02 / Logomark' in page_html or 'Die <span class="italic text-refined-gold">Signatur.</span>' in page_html:
        continue
    
    # We apply the sequence
    if page_index < len(rhythm_list):
        target_theme = rhythm_list[page_index]
    else:
        target_theme = 'light'

    # Mutate Text Classes
    is_natively_dark = 'text-white' in page_html or 'text-night-text' in page_html
    if target_theme == 'night' and not is_natively_dark:
        page_html = make_dark(page_html)
    elif target_theme in ('light', 'gold') and is_natively_dark:
        page_html = make_light(page_html)
        
    # Construct wrapper
    if target_theme == 'night':
        header_tag = '<div class="page night p-8 relative">'
        logo_filter = 'brightness-0 invert opacity-90'
        blend = 'mix-blend-screen'
        opacity = 'opacity-[0.05]'
    elif target_theme == 'gold':
        header_tag = '<div class="page gold p-8 relative">'
        logo_filter = '' # Original gold logo
        blend = 'mix-blend-multiply'
        opacity = 'opacity-[0.10]' # Slightly more present on gold!
    else: # light
        header_tag = '<div class="page p-8 relative">'
        logo_filter = '' # Original gold logo
        blend = 'mix-blend-multiply'
        opacity = 'opacity-[0.06]'

    is_cover = page_index == 0
    logo_size = 'h-[70px]' if is_cover else 'h-[48px]'
    logo = f'<img src="../public/images/logo-sabala-mentoring.png" class="absolute top-12 right-12 {logo_size} w-auto z-50 {logo_filter} pointer-events-none" alt="Sabala Logo" />'
   
    dia_style = diamond_styles[page_index % len(diamond_styles)].replace('{blend}', blend).replace('{opacity}', opacity)

    # Clean old diamonds
    page_html = re.sub(r'<img src="\.\./public/images/Schwebender Kristall.*?/>', '', page_html)
    
    page_index += 1
    
    combined = header_tag + "\n    " + logo + "\n    " + dia_style + "\n" + page_html
    new_content.append(combined)

with open('files/Brandguide-Export.html', 'w', encoding='utf-8') as f:
    f.write("".join(new_content))
