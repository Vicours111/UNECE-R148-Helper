# -*- coding: utf-8 -*-
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

with open("apparent_surface_analysis.txt", "r", encoding="utf-8") as f:
    content = f.read()

# Print around 130000 to 135000
start = 130000
end = 136000
print("--- Content between 130000 and 136000 ---")
print(content[start:end].replace('\xa0', ' ').replace('\u2011', '-'))
