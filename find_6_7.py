# -*- coding: utf-8 -*-
import sys
import re

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

with open("apparent_surface_analysis.txt", "r", encoding="utf-8") as f:
    content = f.read()

# Let's search for "6.7.1. Presence" or just "6.7."
# and print 2000 characters from it.
pos = content.find("6.7.1. Presence")
if pos != -1:
    print("--- 6.7 snippet ---")
    print(content[pos:pos+3000].replace('\xa0', ' ').replace('\u2011', '-'))
else:
    # Try searching for "6.7." and find where it is in the file
    matches = [m.start() for m in re.finditer(r"6\.7\.\d", content)]
    print(f"Found {len(matches)} matches for 6.7.x:")
    for idx, m in enumerate(matches[:5]):
        print(f"--- Match {idx} at {m} ---")
        print(content[m:m+500].replace('\xa0', ' ').replace('\u2011', '-'))
