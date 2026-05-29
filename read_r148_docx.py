# -*- coding: utf-8 -*-
import zipfile
import xml.etree.ElementTree as ET
import os
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

docx_path = r"C:\Users\as200\Downloads\Antigravity TEST_v20260521\參考依據-E-mark\R148_光訊號裝置(LSD)\UN Regulation No. 148 - Amend.5.docx"

if not os.path.exists(docx_path):
    print("Docx file does not exist at:", docx_path)
    sys.exit(0)

print("Found docx file at:", docx_path)

def extract_paragraphs_and_tables(filename):
    paragraphs = []
    tables_data = []
    
    with zipfile.ZipFile(filename) as z:
        xml_content = z.read("word/document.xml")
        root = ET.fromstring(xml_content)
        
        namespace = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
        
        # We walk through elements
        for elem in root.iter():
            # If it's a paragraph
            if elem.tag.endswith('}p'):
                p_text = []
                for t in elem.findall('.//w:t', namespace):
                    if t.text:
                        p_text.append(t.text)
                if p_text:
                    paragraphs.append("".join(p_text))
            
            # If it's a table
            elif elem.tag.endswith('}tbl'):
                rows_data = []
                for row in elem.findall('.//w:tr', namespace):
                    row_cells = []
                    for cell in row.findall('.//w:tc', namespace):
                        cell_text = []
                        for t in cell.findall('.//w:t', namespace):
                            if t.text:
                                cell_text.append(t.text)
                        row_cells.append("".join(cell_text))
                    rows_data.append(row_cells)
                tables_data.append(rows_data)
                
    return paragraphs, tables_data

paragraphs, tables = extract_paragraphs_and_tables(docx_path)
print(f"Extracted {len(paragraphs)} paragraphs and {len(tables)} tables.")

# Search in tables for "Table 8" or keywords related to intensity
print("\n--- Searching Tables for Table 8 or Luminous Intensity ---")
for idx, tbl in enumerate(tables):
    # Check if table contains keywords
    flattened_text = " ".join([" ".join(row) for row in tbl])
    if "Table 8" in flattened_text or "Luminous intensities" in flattened_text or "intensity in cd" in flattened_text:
        print(f"\n[Table Index {idx}] found with Table 8 keywords!")
        for row_idx, row in enumerate(tbl[:15]): # Print first 15 rows
            print(f"  Row {row_idx}: {row}")

# Search in paragraphs for "Figure A3-I" etc.
print("\n--- Searching Paragraphs for Figure A3 references ---")
figures_found = []
for p in paragraphs:
    if "Figure A3-" in p or "Table A2-" in p:
        figures_found.append(p)

for f in figures_found[:20]:
    print("Paragraph:", f)
