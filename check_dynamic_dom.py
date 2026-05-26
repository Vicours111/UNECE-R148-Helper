import re
import os
import sys

try:
    current_dir = os.path.dirname(os.path.abspath(__file__))
    js_path = os.path.join(current_dir, 'dynamic-indicator.js')
    html_path = os.path.join(current_dir, 'dynamic-indicator.html')
    
    with open(js_path, "r", encoding="utf-8") as f:
        js_content = f.read()

    with open(html_path, "r", encoding="utf-8") as f:
        html_content = f.read()

    # Extract all document.getElementById("...") or '...'
    js_ids = set(re.findall(r'document\.getElementById\([\'"]([a-zA-Z0-9_-]+)[\'"]\)', js_content))

    # Extract all id="..." or '...' in HTML
    html_ids = set(re.findall(r'id=[\'"]([a-zA-Z0-9_-]+)[\'"]', html_content))

    # Account for dynamically generated IDs in JS: 'led-' + i
    # We should exclude dynamic IDs like 'led-i' from verification if they are constructed dynamically
    # But in our JS, we queried document.getElementById(`led-${i}`) which uses backticks!
    # Let's extract backtick queries: document.getElementById(`...`)
    js_backtick_queries = re.findall(r'document\.getElementById\(`([a-zA-Z0-9_-]+)-\$\{.+?\}`\)', js_content)
    
    # We also query preset buttons using:
    # const activeBtnMap = { 'compliant': 'presetCompliant', ... }
    # Let's extract preset IDs hardcoded in maps
    js_map_ids = set(re.findall(r'[\'"](preset[a-zA-Z0-9_-]+)[\'"]', js_content))
    js_ids = js_ids.union(js_map_ids)

    # Let's remove dynamic template IDs from the expected set, and manually verify them
    # For example, if JS queries `led-${i}`, it expects IDs like led-0 to led-11
    js_filtered_ids = set()
    for id_name in js_ids:
        if '${' not in id_name:
            js_filtered_ids.add(id_name)

    # Add manually verified dynamic targets since they are generated
    dynamic_success = True
    for i in range(10):
        if f"ledL-{i}" not in html_ids:
            print(f"[FAIL] Missing dynamic LEFT segment ID in HTML: ledL-{i}")
            dynamic_success = False
        if f"ledR-{i}" not in html_ids:
            print(f"[FAIL] Missing dynamic RIGHT segment ID in HTML: ledR-{i}")
            dynamic_success = False

    missing_in_html = js_filtered_ids - html_ids
    
    # Filter out template strings if any slipped through
    missing_in_html = {x for x in missing_in_html if not ('$' in x or '{' in x)}

    print("========================================")
    print("DOM INTEGRITY REPORT (PYTHON): Dynamic Indicator")
    print("========================================")
    print(f"Total Unique IDs queried in JS (static): {len(js_filtered_ids)}")
    print(f"Total Unique IDs defined in HTML: {len(html_ids)}")
    print("----------------------------------------")

    if missing_in_html or not dynamic_success:
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
