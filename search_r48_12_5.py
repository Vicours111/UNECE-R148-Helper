# -*- coding: utf-8 -*-
import zipfile
import xml.etree.ElementTree as ET
import re
import os
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

# Find the file using os.walk
def find_docx_files(root_dir):
    docx_files = []
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith(".docx") and "Regulation No. 48" in file and "07 series" in file:
                docx_files.append(os.path.join(root, file))
    return docx_files

root_dir = r"C:\Users\as200\Downloads\Antigravity TEST_v20260521\參考依據-E-mark"
docx_files = find_docx_files(root_dir)

r48_path = docx_files[0]
print("Found docx file:", r48_path)

def extract_text_from_docx(filename):
    with zipfile.ZipFile(filename) as z:
        xml_content = z.read("word/document.xml")
        root = ET.fromstring(xml_content)
        texts = []
        namespace = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
        for text_elem in root.findall('.//w:t', namespace):
            if text_elem.text:
                texts.append(text_elem.text)
        return " ".join(texts)

text = extract_text_from_docx(r48_path)

# Find all occurrences of "12.5"
matches = [m.start() for m in re.finditer(r"12\.5", text)]
print(f"Found {len(matches)} occurrences of '12.5' in R48:")
for m in matches:
    print("--- OCCURRENCE ---")
    print(text[max(0, m-200):m+300].replace('\xa0', ' ').replace('\u2011', '-'))
