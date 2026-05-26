# -*- coding: utf-8 -*-
import sys
import re

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

with open("apparent_surface_analysis.txt", "r", encoding="utf-8") as f:
    content = f.read()

# Let's search for "6.7.5. Geometric visibility" and print the next 2000 characters
pos = content.find("6.7.5. Geometric visibility")
if pos != -1:
    print("--- 6.7.5 Section ---")
    print(content[pos:pos+2000].replace('\xa0', ' ').replace('\u2011', '-'))
else:
    # Try searching for "6.7.5"
    matches = [m.start() for m in re.finditer(r"6\.7\.5", content)]
    if matches:
        print(f"Found {len(matches)} matches, printing from first:")
        print(content[matches[0]:matches[0]+2000].replace('\xa0', ' ').replace('\u2011', '-'))
