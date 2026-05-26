# -*- coding: utf-8 -*-
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

with open("apparent_surface_analysis.txt", "r", encoding="utf-8") as f:
    content = f.read()

# Let's find "6.7.1" or "6.7. Presence"
# The structure of R48 is:
# 6.7. STOP LAMPS
# 6.7.1. Presence
# ...
# 6.7.9. Other requirements

# Let's search for "6.7" and print 5000 characters from the first occurrence of "6.7 " or similar
p1 = content.find("6.7. Presence")
if p1 == -1:
    p1 = content.find("6.7.1. Presence")
if p1 == -1:
    p1 = content.find("6.7.1")
if p1 == -1:
    p1 = content.find("6.7 ")

if p1 != -1:
    print("--- 6.7 Section ---")
    print(content[p1:p1+4000].replace('\xa0', ' ').replace('\u2011', '-'))
else:
    print("Could not find section 6.7")
