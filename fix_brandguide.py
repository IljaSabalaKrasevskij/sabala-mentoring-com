import re

with open('files/Brandguide-Export.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add .gold class to styles
style_insert = "\n    .gold { background-color: #F5EFE0; color: #1A1A18; }\n"
content = content.replace('.night { background-color: #1A1A18; color: #F5EFE0; }', 
                          '.night { background-color: #1A1A18; color: #F5EFE0; }' + style_insert)

# 2. Split by pages
pages = re.split(r'(<!-- PAGE \d+:.*?\n  <div class="page.*?>)', content)

# pages[0] is header
new_content = [pages[0]]

rhythm = ['night', 'gold', 'light', 'night', 'gold', 'light', 'night', 'gold', 'light', 'night', 'gold', 'light', 'night', 'gold', 'light', 'night', 'gold', 'light']

diamond_styles = [
    # 0: Large background screen
    '<img src="../public/images/Schwebender Kristall mit goldenen Einschlüssen.png" class="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-auto object-contain opacity-[0.05] z-0 mix-blend-screen pointer-events-none blur-[1px]" />',
    # 1: Bottom right subtle
    '<img src="../public/images/Schwebender Kristall mit goldenen Einschlüssen.png" class="absolute -bottom-20 -right-20 w-[400px] h-[400px] object-cover opacity-[0.06] z-0 mix-blend-multiply rotate-45 pointer-events-none" />',
    # 2: Top right geometric accent
    '<img src="../public/images/Schwebender Kristall mit goldenen Einschlüssen.png" class="absolute top-10 right-10 w-24 h-24 object-contain opacity-[0.15] z-0 pointer-events-none rotate-12" />',
    # 3: Huge half cut off on left
    '<img src="../public/images/Schwebender Kristall mit goldenen Einschlüssen.png" class="absolute top-1/4 -left-32 w-[600px] h-[600px] object-cover opacity-[0.03] z-0 mix-blend-screen pointer-events-none -rotate-12" />',
    # 4: Center subtle watermark
    '<img src="../public/images/Schwebender Kristall mit goldenen Einschlüssen.png" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-auto object-contain opacity-[0.04] z-0 mix-blend-multiply pointer-events-none" />',
]

def remove_existing_diamonds(page_html):
    # Remove any existing large diamonds so we don't double up
    return re.sub(r'<img src="\.\./public/images/Schwebender Kristall.*?class="absolute.*?/>', '', page_html)

for i in range(1, len(pages), 2):
    header_tag = pages[i]
    page_html = pages[i+1]
    
    page_num = (i // 2)
    theme = rhythm[page_num]
    
    # Rewrite the completely opening tag
    if theme == 'night':
        header_tag = re.sub(r'<div class="page.*?>', '<div class="page night">', header_tag)
        logo_filter = 'brightness-0 invert opacity-90'
        dia_style = diamond_styles[page_num % len(diamond_styles)].replace('mix-blend-multiply', 'mix-blend-screen')
    elif theme == 'gold':
        header_tag = re.sub(r'<div class="page.*?>', '<div class="page gold">', header_tag)
        logo_filter = 'brightness-0 opacity-80'
        dia_style = diamond_styles[page_num % len(diamond_styles)].replace('mix-blend-screen', 'mix-blend-multiply').replace('opacity-[0.05]', 'opacity-[0.08]').replace('opacity-[0.03]', 'opacity-[0.06]')
    else: # light
        header_tag = re.sub(r'<div class="page.*?>', '<div class="page">', header_tag)
        logo_filter = 'brightness-0 opacity-90'
        dia_style = diamond_styles[page_num % len(diamond_styles)].replace('mix-blend-screen', 'mix-blend-multiply')

    # Re-apply padding since we stripped it in the regex 
    header_tag = header_tag.replace('">', ' p-8 relative">')
    
    # 1. Provide Logo
    logo = f'<img src="../public/images/logo-sabala-mentoring.png" class="absolute top-12 left-12 w-[100px] h-auto z-50 {logo_filter} pointer-events-none" alt="Sabala Logo" />'
    
    # 2. Clean out old diamonds
    page_html = remove_existing_diamonds(page_html)
    
    # Note: On page 0 (Cover), we want to preserve the exact structure inside page-content. So we prepend logo and diamond INSIDE the page div, BEFORE page-content.
    combined = header_tag + "\n    " + logo + "\n    " + dia_style + "\n" + page_html
    new_content.append(combined)

with open('files/Brandguide-Export.html', 'w', encoding='utf-8') as f:
    f.write("".join(new_content))
