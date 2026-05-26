# -*- coding: utf-8 -*-
import zipfile
import xml.etree.ElementTree as ET
import re
import os
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

# Find all docx files in E-mark dir
def find_docx_files(root_dir):
    docx_files = []
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith(".docx") and "148" in file:
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
    text = extract_text_from_docx(docx_path)
    if not text:
        continue
    
    matches_12_5 = list(re.finditer(r"12\.5", text))
    if matches_12_5:
        print(f"\n========================================\nFILE: {os.path.basename(docx_path)} (Matches for 12.5: {len(matches_12_5)})\n========================================\n")
        for m in matches_12_5:
            snippet = text[max(0, m.start()-150):min(len(text), m.end()+250)]
            snippet = snippet.replace('\xa0', ' ').replace('\u2011', '-')
            print(f"--- MATCH AT {m.start()} ---\n{snippet}\n")
