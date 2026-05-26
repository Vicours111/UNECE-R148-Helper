# -*- coding: utf-8 -*-
import sys
import re

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

with open("apparent_surface_analysis.txt", "r", encoding="utf-8") as f:
    content = f.read()

# Let's search for "stop lamp" or "6.7." (which is usually the R48 section for stop lamps)
# and print matches that contain "apparent surface" or "area" or "12.5" or "25".

# R48 section for stop lamps is 6.7.
# Let's search for "6.7.5" (Geometric visibility for stop lamps)
matches_stop = re.finditer(r"6\.7\.5", content)
print("--- Stop Lamp visibility matches ---")
for m in matches_stop:
    start = max(0, m.start() - 100)
    end = min(len(content), m.end() + 250)
    print(content[start:end].replace('\xa0', ' ').replace('\u2011', '-'))

# Also search for "6.11.5" (Geometric visibility for rear fog lamps)
matches_fog = re.finditer(r"6\.11\.5", content)
print("\n--- Rear Fog visibility matches ---")
for m in matches_fog:
    start = max(0, m.start() - 100)
    end = min(len(content), m.end() + 250)
    print(content[start:end].replace('\xa0', ' ').replace('\u2011', '-'))

# Also search for "6.4.5" (Geometric visibility for reversing lamps)
matches_rev = re.finditer(r"6\.4\.5", content)
print("\n--- Reversing Lamp visibility matches ---")
for m in matches_rev:
    start = max(0, m.start() - 100)
    end = min(len(content), m.end() + 250)
    print(content[start:end].replace('\xa0', ' ').replace('\u2011', '-'))
