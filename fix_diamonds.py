import re

with open('files/Brandguide-Export.html', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Nuke the top-right diamond globally.
# We'll just replace the exact line.
# Since it could have different opacity based on the theme (opacity-[0.25], opacity-[0.15], etc), 
# we use a safer regex that doesn't care about the order.
text = re.sub(r'<img[^>]*src="[^"]*Kristall[^"]*"[^>]*top-10 right-10[^>]*/>', '', text)
text = re.sub(r'<img[^>]*class="[^"]*top-10 right-10[^"]*"[^>]*src="[^"]*Kristall[^"]*"[^>]*/>', '', text)

# Just to be 1000% sure:
lines = text.split('\n')
new_lines = []
for line in lines:
    if 'Schwebender Kristall' in line and 'top-10 right-10' in line:
        continue # Drop it!
    new_lines.append(line)
text = '\n'.join(new_lines)


# 2. Fix the Motion & Animation diamond.
# Find the Motion page block.
pages = re.split(r'(<div[^>]*class="page[^>]*>)', text)
# pages[0] is preamble, pages[1] is header1, pages[2] is content1, etc.
new_text = pages[0]
for i in range(1, len(pages), 2):
    header = pages[i]
    content = pages[i+1]
    
    if 'Motion & Animation' in content:
        # We find the diamond image which is absolute ...
        # It's the only Kristall image in this content block
        content = re.sub(
            r'top-1/4', 'top-auto -bottom-20', content
        )
        content = re.sub(
            r'top-\[75%\]', 'top-auto -bottom-20', content
        )
        content = re.sub(
            r'top-\[80%\]', 'top-auto -bottom-20', content
        )
    
    new_text += header + content

with open('files/Brandguide-Export.html', 'w', encoding='utf-8') as f:
    f.write(new_text)
