# -*- coding: utf-8 -*-
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

with open("apparent_surface_analysis.txt", "r", encoding="utf-8") as f:
    lines = f.readlines()

# Let's find matches that mention "cm 2" or "cm2" or "area"
for line in lines:
    if ("cm" in line or "area" in line or "not less than" in line) and ("12" in line or "25" in line or "apparent" in line):
        # Print matching lines, make sure to replace or ignore encoding errors
        print(line.strip())
