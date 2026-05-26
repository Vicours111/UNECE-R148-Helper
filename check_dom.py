import re
import os
import sys

try:
    current_dir = os.path.dirname(os.path.abspath(__file__))
    js_path = os.path.join(current_dir, 'app.js')
    html_path = os.path.join(current_dir, 'index.html')
    
    with open(js_path, "r", encoding="utf-8") as f:
        js_content = f.read()

    with open(html_path, "r", encoding="utf-8") as f:
        html_content = f.read()

    # Extract all document.getElementById("...") or '...'
    js_ids = set(re.findall(r'document\.getElementById\([\'"]([a-zA-Z0-9_-]+)[\'"]\)', js_content))

    # Also look for querySelector or check all IDs in HTML
    html_ids = set(re.findall(r'id=[\'"]([a-zA-Z0-9_-]+)[\'"]', html_content))

    output = []
    output.append(f"Total IDs found in JS: {len(js_ids)}")
    output.append(f"Total IDs found in HTML: {len(html_ids)}")

    missing_in_html = js_ids - html_ids
    if missing_in_html:
        output.append(f"CRITICAL WARNING: These IDs are in JS but MISSING in HTML: {missing_in_html}")
    else:
        output.append("SUCCESS: All JS DOM element IDs exist in HTML!")
        
    result_str = "\n".join(output)
    print(result_str)
    
    output_path = os.path.join(current_dir, 'output.txt')
    with open(output_path, "w", encoding="utf-8") as out_f:
        out_f.write(result_str)
except Exception as e:
    print(f"ERROR: {str(e)}")
    sys.exit(1)

