import re

with open('files/Brandguide-Export.html', 'r', encoding='utf-8') as f:
    content = f.read()

pages = re.split(r'(<!-- PAGE \d+:.*?\n  <div.*?class="page.*?>)', content)

# Pages array:
# [0] = HTML before first page
# [1] = Header for page 0
# [2] = Content for page 0
# [3] = Header for page 1
# [4] = Content for page 1

print("--- PAGE 2 (index 1) ---")
print(pages[3] + "\n" + pages[4][:300]) 
# Check the diamond image here.

print("\n--- PAGE 4 (index 3) ---")
print(pages[7] + "\n" + pages[8][:400])

print("\n--- PAGE 5 (index 4) - INTERFACE DESIGN ---")
# Interface Design might be index 4
print(pages[9] + "\n" + pages[10][:1000])

print("\n--- PAGE 6 (index 5) ---")
print(pages[11] + "\n" + pages[12][:300])

print("\n--- PAGE 7 (index 6) ---")
print(pages[13] + "\n" + pages[14][:300])

print("\n--- PAGE 12 (index 11) ---")
print(pages[23] + "\n" + pages[24][:800])
