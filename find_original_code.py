# -*- coding: utf-8 -*-
import json
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

logs_path = r"C:\Users\as200\.gemini\antigravity\brain\c04c58ce-d925-490b-a4f5-952631ac9521\.system_generated\logs\transcript.jsonl"

with open(logs_path, "r", encoding="utf-8") as f:
    for idx, line in enumerate(f):
        if "getDYCompatibilityInfo" in line:
            # Let's search for the actual raw text in the line
            pos = line.find("function getDYCompatibilityInfo")
            if pos != -1:
                print(f"FOUND raw match on line {idx} at position {pos}!")
                print(line[pos:pos+2500])
                break
            else:
                # If it's a JSON string, let's load it
                try:
                    data = json.loads(line)
                    # Search recursively in json data for string containing getDYCompatibilityInfo
                    def search_dict(d):
                        if isinstance(d, dict):
                            for k, v in d.items():
                                search_dict(v)
                        elif isinstance(d, list):
                            for item in d:
                                search_dict(item)
                        elif isinstance(d, str):
                            if "function getDYCompatibilityInfo" in d:
                                p = d.find("function getDYCompatibilityInfo")
                                print("FOUND IN JSON STRING:")
                                print(d[p:p+2500])
                                raise KeyboardInterrupt # to break out
                    search_dict(data)
                except KeyboardInterrupt:
                    break
                except Exception as e:
                    pass
