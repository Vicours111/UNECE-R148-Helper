import re
import os
import sys

try:
    current_dir = os.path.dirname(os.path.abspath(__file__))
    js_path = os.path.join(current_dir, 'd-lamp.js')
    html_path = os.path.join(current_dir, 'd-lamp.html')
    
    with open(js_path, "r", encoding="utf-8") as f:
        js_content = f.read()

    with open(html_path, "r", encoding="utf-8") as f:
        html_content = f.read()

    # Extract all document.getElementById("...") or '...'
    js_ids = set(re.findall(r'document\.getElementById\([\'"]([a-zA-Z0-9_-]+)[\'"]\)', js_content))

    # Extract all id="..." or '...' in HTML
    html_ids = set(re.findall(r'id=[\'"]([a-zA-Z0-9_-]+)[\'"]', html_content))

    missing_in_html = js_ids - html_ids

    print("========================================")
    print("DOM INTEGRITY REPORT (PYTHON): d-lamp Mode")
    print("========================================")
    print(f"Total Unique IDs queried in JS: {len(js_ids)}")
    print(f"Total Unique IDs defined in HTML: {len(html_ids)}")
    print("----------------------------------------")

    if missing_in_html:
        print("[FAIL] CRITICAL FAILURE: JS references these IDs, but they do NOT exist in HTML:")
        for id_name in missing_in_html:
            print(f"  - {id_name}")
        sys.exit(1)
    else:
        print("[SUCCESS] All JS DOM element query IDs are present in the HTML DOM!")
        sys.exit(0)
except Exception as e:
    print(f"[FATAL] FATAL ERROR running verification: {str(e)}")
    sys.exit(1)
