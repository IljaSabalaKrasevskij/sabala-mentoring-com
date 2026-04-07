import re

with open('files/Brandguide-Export.html', 'r', encoding='utf-8') as f:
    text = f.read()

# We need to find the page containing "12 / Motion" and fix its diamond
pages = re.split(r'(<div[^>]*class="page[^>]*>)', text)

new_text = pages[0]
for i in range(1, len(pages), 2):
    header = pages[i]
    content = pages[i+1]
    
    if '12 / Motion' in content:
        # Replace the top-1/4 class with top-auto -bottom-20
        content = re.sub(r'top-1/4 -left-32', 'top-auto -bottom-20 -left-20', content)
        content = re.sub(r'top-\[75%\]', 'top-auto -bottom-20', content)
        
    new_text += header + content

with open('files/Brandguide-Export.html', 'w', encoding='utf-8') as f:
    f.write(new_text)
