# -*- coding: utf-8 -*-
import os

logs_dir = r"C:\Users\as200\.gemini\antigravity\brain\c04c58ce-d925-490b-a4f5-952631ac9521\.system_generated\logs"
print("Checking logs dir:", logs_dir)
if os.path.exists(logs_dir):
    print("Files in logs dir:", os.listdir(logs_dir))
else:
    print("Logs dir does not exist!")
