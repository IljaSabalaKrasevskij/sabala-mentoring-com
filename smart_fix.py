import re

with open('files/Brandguide-Export.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Clean old logo
content = re.sub(r'<img src="\.\./public/images/logo-sabala-mentoring\.png" class="absolute top-12 right-12 h-\[32px\].*?/>\n    ', '', content)

pages = re.split(r'(<!-- PAGE \d+:.*?\n  <div class="page.*?>)', content)
new_content = [pages[0]]

for i in range(1, len(pages), 2):
    header_tag = pages[i]
    page_html = pages[i+1]
    
    # 2. Determine true native theme based on inner content
    if 'text-white' in page_html or 'text-night-secondary' in page_html or 'text-night-gold' in page_html or 'text-night-text' in page_html:
        true_theme = 'night'
        header_tag = re.sub(r'<div class="page.*?>', '<div class="page night p-8 relative">', header_tag)
        logo_filter = 'brightness-0 invert opacity-90'
    else:
        true_theme = 'light'
        header_tag = re.sub(r'<div class="page.*?>', '<div class="page p-8 relative">', header_tag)
        logo_filter = '' # Native Gold logo!
        
    # Check if this is the Cover Page (Page 1)
    is_cover = '<!-- PAGE 1:' in header_tag
    is_logo_page = '02 / Logomark' in page_html or 'Die <span class="italic text-refined-gold">Signatur.</span>' in page_html
    
    logo_size = 'h-[70px]' if is_cover else 'h-[48px]'
    
    # Render correct logo
    logo = f'<img src="../public/images/logo-sabala-mentoring.png" class="absolute top-12 right-12 {logo_size} w-auto z-50 {logo_filter} pointer-events-none" alt="Sabala" />'
    
    if not is_logo_page:
        combined = header_tag + "\n    " + logo + "\n    " + page_html
    else:
        combined = header_tag + "\n    " + page_html

    new_content.append(combined)

with open('files/Brandguide-Export.html', 'w', encoding='utf-8') as f:
    f.write("".join(new_content))
