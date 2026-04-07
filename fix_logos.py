import re

with open('files/Brandguide-Export.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the broken absolute logos I injected
content = re.sub(r'<img src="\.\./public/images/logo-sabala-mentoring\.png" class="absolute top-12 left-12.*?/>', '', content)

pages = re.split(r'(<!-- PAGE \d+:.*?\n  <div class="page.*?>)', content)

new_content = [pages[0]]

for i in range(1, len(pages), 2):
    header_tag = pages[i]
    page_html = pages[i+1]
    
    # Check if this is the Logo Guidelines page
    is_logo_page = '02 / Logomark' in page_html or 'Die <span class="italic text-refined-gold">Signatur.</span>' in page_html
    
    # Determine the theme to pick the right logo color
    if 'page night' in header_tag:
        logo_filter = 'brightness-0 invert opacity-90'
    elif 'page gold' in header_tag:
        logo_filter = 'brightness-0 opacity-80'
    else:
        logo_filter = 'brightness-0 opacity-85'
        
    logo = f'<img src="../public/images/logo-sabala-mentoring.png" class="absolute top-12 right-12 h-[32px] w-auto z-50 {logo_filter} pointer-events-none" alt="Sabala Logo" />'
    
    if not is_logo_page:
        # Insert logo after exactly the first line break inside the page container logic 
        combined = header_tag + "\n    " + logo + page_html
    else:
        combined = header_tag + page_html
        
    new_content.append(combined)

with open('files/Brandguide-Export.html', 'w', encoding='utf-8') as f:
    f.write("".join(new_content))
