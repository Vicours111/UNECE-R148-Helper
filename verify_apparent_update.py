# -*- coding: utf-8 -*-
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

js_path = r"c:\Users\as200\Downloads\Antigravity TEST_v20260521\Projects\r148-lighting-design-helper\app.js"

with open(js_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

for idx, line in enumerate(lines):
    if "function getApparentSurfaceInfo" in line:
        print(f"VERIFY at line {idx+1}:")
        for i in range(40):
            if idx + i < len(lines):
                print(f"{idx+i+1}: {lines[idx+i].strip()}")
        break
