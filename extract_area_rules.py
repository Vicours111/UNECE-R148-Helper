# -*- coding: utf-8 -*-
import sys
import re

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

with open("apparent_surface_analysis.txt", "r", encoding="utf-8") as f:
    content = f.read()

# Let's find matches for "12.5" and "25" and print the surrounding paragraphs
# We want to see which lamps are associated with 12.5 cm2 or 25 cm2
# We also want to check if any other lamps have other surface requirements (like 12.5 or exempt)

matches_12_5 = re.finditer(r"12\.5", content)
print("--- 12.5 cm2 matches ---")
seen = set()
for m in matches_12_5:
    start = max(0, m.start() - 200)
    end = min(len(content), m.end() + 250)
    snippet = content[start:end].strip()
    # clean snippet
    snippet_lines = [l.strip() for l in snippet.split('\n') if l.strip()]
    cleaned = "\n".join(snippet_lines)
    if cleaned[:100] not in seen:
        seen.add(cleaned[:100])
        print("--------------------")
        print(cleaned)

print("\n--- 25 cm2 matches ---")
matches_25 = re.finditer(r"25", content)
seen_25 = set()
for m in matches_25:
    # Look for "25 cm" or "25 square"
    sub = content[max(0, m.start()-50):min(len(content), m.end()+100)]
    if "cm" in sub or "sq" in sub or "area" in sub or "surface" in sub:
        start = max(0, m.start() - 200)
        end = min(len(content), m.end() + 250)
        snippet = content[start:end].strip()
        snippet_lines = [l.strip() for l in snippet.split('\n') if l.strip()]
        cleaned = "\n".join(snippet_lines)
        if cleaned[:100] not in seen_25:
            seen_25.add(cleaned[:100])
            print("--------------------")
            print(cleaned)
