# -*- coding: utf-8 -*-
import sys
import re

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

with open("apparent_surface_analysis.txt", "r", encoding="utf-8") as f:
    content = f.read()

# Let's search for "6.7.5" and print a larger snippet
pos = content.find("6.7.5. Geometric visibility")
if pos != -1:
    print("--- 6.7.5 snippet ---")
    print(content[pos:pos+600].replace('\xa0', ' ').replace('\u2011', '-'))
else:
    # Try searching case insensitive or just "6.7.5"
    pos = content.lower().find("6.7.5")
    if pos != -1:
        print("--- 6.7.5 snippet (case-insensitive) ---")
        print(content[pos:pos+600].replace('\xa0', ' ').replace('\u2011', '-'))
    else:
        print("Could not find 6.7.5")
