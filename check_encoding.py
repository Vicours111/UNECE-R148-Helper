# -*- coding: utf-8 -*-
import sys
import zipfile
import re
import xml.etree.ElementTree as ET

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def search_docx(filename, pattern):
    print(f"Searching in {filename} for '{pattern}'...")
    try:
        with zipfile.ZipFile(filename) as z:
            xml_content = z.read("word/document.xml")
            root = ET.fromstring(xml_content)
            # Find all text elements
            texts = []
            namespace = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
            for text_elem in root.findall('.//w:t', namespace):
                if text_elem.text:
                    texts.append(text_elem.text)
            full_text = " ".join(texts)
            print("Full text length:", len(full_text))
            
            # Find matches
            matches = [m.start() for m in re.finditer(pattern, full_text, re.IGNORECASE)]
            print(f"Found {len(matches)} matches:")
            for m in matches[:10]:
                print(repr(full_text[max(0, m-100):m+150]))
    except Exception as e:
        print("Error:", e)

search_docx(r"c:\Users\as200\Downloads\Antigravity TEST_v20260521\UN Regulation No. 148 - Light Signalling Devices (LSD).docx", "interdependent")
search_docx(r"c:\Users\as200\Downloads\Antigravity TEST_v20260521\UN Regulation No. 148 - Light Signalling Devices (LSD).docx", "double")
