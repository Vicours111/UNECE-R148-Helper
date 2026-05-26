# -*- coding: utf-8 -*-
import sys
import re

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

with open("apparent_surface_analysis.txt", "r", encoding="utf-8") as f:
    content = f.read()

# Let's search for "6.7.1" or "6.7.2" or "6.7.3" or "6.7.4"
# We want to print context from 500 characters before the first match to 3000 characters after.
matches = [m.start() for m in re.finditer(r"6\.7\.\d", content)]
if matches:
    idx = matches[0]
    print(f"Printing 4000 characters from index {idx-500}:")
    print(content[max(0, idx-500):idx+3500].replace('\xa0', ' ').replace('\u2011', '-'))
else:
    print("No matches for 6.7.x")
