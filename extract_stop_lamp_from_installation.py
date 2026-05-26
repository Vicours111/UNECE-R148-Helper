# -*- coding: utf-8 -*-
import sys
import re

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

with open("apparent_surface_analysis.txt", "r", encoding="utf-8") as f:
    content = f.read()

# Let's find the section for:
# FILE: UN Regulation No. 48 - Rev.13 - Installation of lighting and light-signalling devices - 07 series.docx
# and find 6.7.5 inside that file portion only!

file_marker = "FILE: UN Regulation No. 48 - Rev.13 - Installation of lighting and light-signalling devices - 07 series.docx"
start_pos = content.find(file_marker)
if start_pos != -1:
    sub_content = content[start_pos:]
    # Now find "6.7.5" in this sub_content
    pos_6_7_5 = sub_content.find("6.7.5. Geometric visibility")
    if pos_6_7_5 == -1:
        # Try finding "6.7.5" case insensitive or just "6.7.5"
        pos_6_7_5 = sub_content.lower().find("6.7.5")
        
    if pos_6_7_5 != -1:
        print("--- R48 Section 6.7.5 and surrounding ---")
        # Print 1500 chars from matches
        print(sub_content[pos_6_7_5:pos_6_7_5+2000].replace('\xa0', ' ').replace('\u2011', '-'))
    else:
        print("Could not find 6.7.5 in R48 07 series portion")
else:
    print("Could not find R48 07 series file marker")
