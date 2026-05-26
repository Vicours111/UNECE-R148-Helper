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

if not docx_files:
    print("Could not find R48 07 series docx file!")
    sys.exit(0)

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
print("Extracted text length:", len(text))

# Let's search for "6.7.5. Geometric visibility"
# and find what follows it until the next section "6.8" or "6.7.6"
p_start = text.find("6.7.5. Geometric visibility")
if p_start == -1:
    p_start = text.find("6.7.5.")
if p_start == -1:
    # try with spaces
    p_start = text.lower().find("geometric visibility")
    
if p_start != -1:
    print("\n--- R48 Section 6.7.5 ---")
    print(text[p_start:p_start+1500].replace('\xa0', ' ').replace('\u2011', '-'))
else:
    print("Could not find section 6.7.5 directly in docx text!")
