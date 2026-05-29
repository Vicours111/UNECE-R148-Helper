# -*- coding: utf-8 -*-
import re

app_path = r"c:\Users\as200\Downloads\Antigravity TEST_v20260521\Projects\r148-lighting-design-helper\app.js"

with open(app_path, "r", encoding="utf-8") as f:
    content = f.read()

# Let's search for some patterns like:
# "weights", "photometric", "grid", "Min:", "Max:", "H-", "5R"
print("Length of app.js:", len(content))

# Look for functions related to drawPhotometricWeightGrid or weights
matches = re.findall(r"function\s+\w*drawPhotometric\w*\(.*?\)", content)
print("Found functions:", matches)

# Search for "weights" or similar variable declarations
# e.g., const weights = or let weights =
weights_matches = re.findall(r"(?:const|let|var)\s+weights\s*=.*?\];", content, re.DOTALL)
print(f"Found {len(weights_matches)} weights declarations.")
for idx, m in enumerate(weights_matches):
    print(f"Match {idx} (length {len(m)}):", m[:300] + "...")

# Let's search for "H-5R" in the file to see where it appears.
h5r_matches = [m.start() for m in re.finditer("H-5R", content)]
print("Found H-5R at offsets:", h5r_matches)
for offset in h5r_matches:
    print(f"Context around H-5R (offset {offset}):")
    print(content[max(0, offset-200):min(len(content), offset+300)])
    print("-" * 50)
