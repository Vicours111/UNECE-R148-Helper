# -*- coding: utf-8 -*-
import zipfile
import xml.etree.ElementTree as ET
import re
import os

def find_docx_files(root_dir):
    docx_files = []
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith(".docx"):
                docx_files.append(os.path.join(root, file))
    return docx_files

root_dir = r"C:\Users\as200\Downloads\Antigravity TEST_v20260521\參考依據-E-mark"
docx_files = find_docx_files(root_dir)
print("Found docx files:")
for f in docx_files:
    print("  -", f)

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
        print(f"Error reading {filename}: {e}")
        return ""

for docx_path in docx_files:
    if "148" in os.path.basename(docx_path) and "Light Signalling" in os.path.basename(docx_path):
        text = extract_text_from_docx(docx_path)
        print(f"\nAnalyzing {os.path.basename(docx_path)} (Length: {len(text)}):")
        
        matches = [m.start() for m in re.finditer(r"apparent\s+surface", text, re.IGNORECASE)]
        print(f"Found {len(matches)} matches for 'apparent surface':")
        for m in matches[:10]:
            print("--- MATCH ---")
            print(text[max(0, m-150):m+250])
            
        matches_12_5 = [m.start() for m in re.finditer(r"12\.5", text)]
        print(f"\nFound {len(matches_12_5)} matches for '12.5':")
        for m in matches_12_5[:10]:
            print("--- MATCH 12.5 ---")
            print(text[max(0, m-150):m+250])

        matches_25 = [m.start() for m in re.finditer(r"25", text)]
        print(f"\nFound {len(matches_25)} matches for '25':")
        for m in matches_25[:10]:
            print("--- MATCH 25 ---")
            print(text[max(0, m-150):m+250])
