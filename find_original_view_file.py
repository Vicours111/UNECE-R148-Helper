# -*- coding: utf-8 -*-
import json
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

logs_path = r"C:\Users\as200\.gemini\antigravity\brain\c04c58ce-d925-490b-a4f5-952631ac9521\.system_generated\logs\transcript.jsonl"

with open(logs_path, "r", encoding="utf-8") as f:
    for idx, line in enumerate(f):
        if "getDYCompatibilityInfo" in line and "isDUnsupported" in line:
            # We want to find a version that does NOT contain "requiresMinArea12_5" inside "getDYCompatibilityInfo"
            if "requiresMinArea12_5" in line and line.count("getDYCompatibilityInfo") == 1:
                # This could be the broken one if requiresMinArea12_5 is inside getDYCompatibilityInfo
                pass
            
            try:
                data = json.loads(line)
                def recursive_search(obj):
                    if isinstance(obj, dict):
                        for k, v in obj.items():
                            if k == "content" and "function getDYCompatibilityInfo" in v:
                                # Check if it is the clean one
                                if "requiresMinArea12_5" not in v[v.find("function getDYCompatibilityInfo"):v.find("function getDYCompatibilityInfo")+500]:
                                    print(f"Found clean version in line {idx}!")
                                    print(v)
                                    raise KeyboardInterrupt
                            recursive_search(v)
                    elif isinstance(obj, list):
                        for item in obj:
                            recursive_search(item)
                recursive_search(data)
            except KeyboardInterrupt:
                break
            except Exception as e:
                pass
print("Finished search.")
