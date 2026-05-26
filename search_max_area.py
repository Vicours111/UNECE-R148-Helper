# -*- coding: utf-8 -*-
import zipfile
import xml.etree.ElementTree as ET
import re
import os
import sys

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

for docx_path in docx_files:
    basename = os.path.basename(docx_path)
    if "148" in basename or "48" in basename:
        text = extract_text_from_docx(docx_path)
        if not text:
            continue
        
        # Search for cm2/cm 2/square centimetre preceded by "more than" or "exceed" or similar
        # E.g. "not more than ... cm", "shall not exceed ... cm"
        matches = [m.start() for m in re.finditer(r"not\s+more\s+than\s+.*?cm", text, re.IGNORECASE)]
        matches_exceed = [m.start() for m in re.finditer(r"not\s+exceed\s+.*?cm", text, re.IGNORECASE)]
        matches_max = [m.start() for m in re.finditer(r"maximum\s+.*?cm", text, re.IGNORECASE)]
        
        all_matches = sorted(list(set(matches + matches_exceed + matches_max)))
        
        if all_matches:
            print(f"\n========================================")
            print(f"FILE: {basename} ({len(all_matches)} matches)")
            print(f"========================================")
            for m in all_matches:
                snippet = text[max(0, m-100):m+250].replace('\xa0', ' ').replace('\u2011', '-').strip()
                if "cm" in snippet and ("area" in snippet.lower() or "surface" in snippet.lower() or "square" in snippet.lower() or "limit" in snippet.lower()):
                    print(f"--- MATCH ---")
                    print(snippet)
