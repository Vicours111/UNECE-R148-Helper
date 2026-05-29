# -*- coding: utf-8 -*-
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

js_path = r"c:\Users\as200\Downloads\Antigravity TEST_v20260521\Projects\r148-lighting-design-helper\dynamic-indicator.js"

with open(js_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

for idx, line in enumerate(lines):
    if "lineRatioWidth" in line or "lineRatioHeight" in line or "lineGapDimension" in line or "marker-" in line:
        print(f"Line {idx+1}: {line.strip()}")
