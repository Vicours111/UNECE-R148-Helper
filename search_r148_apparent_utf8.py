# -*- coding: utf-8 -*-
import zipfile
import xml.etree.ElementTree as ET
import re
import os
import sys

# Reconfigure stdout to handle utf-8 if possible
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def find_docx_files(root_dir):
    docx_files = []
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith(".docx"):
                docx_files.append(os.path.join(root, file))
    return docx_files

root_dir = r"C:\Users\as200\Downloads\Antigravity TEST_v20260521\參考依據-E-mark"
docx_files = find_docx_files(root_dir)

def extract_text_from_docx(filename):
    try:
        with zipfile.ZipFile(filename) as z:
            xml_content = z.read("word/document.xml")
            root = ET.fromstring(xml_content)
            texts = []
            namespace = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
            for text_elem in root.findall('.//w:t', namespace):
                if text_elem.text:
                    texts.append(text_elem.text)
            return " ".join(texts)
    except Exception as e:
        return ""

out_lines = []

for docx_path in docx_files:
    # We want to check BOTH R148 and R48 for apparent surface area requirements
    basename = os.path.basename(docx_path)
    if "148" in basename or "48" in basename:
        text = extract_text_from_docx(docx_path)
        if not text:
            continue
        out_lines.append(f"\n========================================\nFILE: {basename}\n========================================\n")
        
        # Search for "apparent surface" and surrounding characters
        matches = [m.start() for m in re.finditer(r"apparent\s+surface", text, re.IGNORECASE)]
        out_lines.append(f"Found {len(matches)} matches for 'apparent surface':\n")
        for m in matches:
            snippet = text[max(0, m-150):m+250]
            # Replace non-breaking spaces and other weird characters to be print-safe
            snippet = snippet.replace('\xa0', ' ').replace('\u2011', '-')
            out_lines.append(f"--- MATCH AT {m} ---\n{snippet}\n")
            
        # Search for "12.5" and surrounding characters
        matches_12_5 = [m.start() for m in re.finditer(r"12\.5", text)]
        out_lines.append(f"Found {len(matches_12_5)} matches for '12.5':\n")
        for m in matches_12_5:
            snippet = text[max(0, m-150):m+250]
            snippet = snippet.replace('\xa0', ' ').replace('\u2011', '-')
            out_lines.append(f"--- MATCH 12.5 AT {m} ---\n{snippet}\n")

        # Search for "25" and surrounding characters
        matches_25 = [m.start() for m in re.finditer(r"25", text)]
        out_lines.append(f"Found {len(matches_25)} matches for '25':\n")
        for m in matches_25:
            snippet = text[max(0, m-150):m+250]
            snippet = snippet.replace('\xa0', ' ').replace('\u2011', '-')
            out_lines.append(f"--- MATCH 25 AT {m} ---\n{snippet}\n")

# Write results to output file
out_path = "apparent_surface_analysis.txt"
with open(out_path, "w", encoding="utf-8") as f:
    f.writelines(out_lines)

print(f"Analysis written to {out_path}")
