# -*- coding: utf-8 -*-
import json
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

logs_path = r"C:\Users\as200\.gemini\antigravity\brain\c04c58ce-d925-490b-a4f5-952631ac9521\.system_generated\logs\transcript.jsonl"

with open(logs_path, "r", encoding="utf-8") as f:
    for idx, line in enumerate(f):
        if "getDYCompatibilityInfo" in line and "isDUnsupported" in line:
            # Let's print the line index
            print(f"Line {idx} matches getDYCompatibilityInfo and isDUnsupported")
            try:
                data = json.loads(line)
                # Print keys of data
                print("  Keys:", list(data.keys()))
                if "type" in data:
                    print("  Type:", data["type"])
                if "tool_calls" in data:
                    print("  Tool calls:", [t.get("name") for t in data["tool_calls"]])
            except:
                pass
