/**
 * E-mark 互動式法規資料庫 (regulationsData.js)
 * 收錄 R48 (M/N/O類), R53 (L3重機), R74 (L1輕摩), R65 (特種警示燈) 與 R148/R149/R150 規格。
 * 語言：繁體中文 (Traditional Chinese)
 */

const regulationsData = {
  // ==========================================
  // 1. M1/N1 類別 (轎車 / SUV) - 安裝規範 R48
  // ==========================================
  "DRL_M1": {
    "id": "DRL_M1",
    "vehicleCategory": "M1_N1",
    "categoryLabel": "轎車 / SUV (M1/N1)",
    "name": "日行燈 (M1/N1)",
    "nameEn": "Daytime Running Lamp (DRL)",
    "regulation": "R148 / R48",
    "classSymbol": "RL",
    "position": {
      "width": "間距不小於 600 mm (車寬 < 1300 mm 時可減至 400 mm)",
      "height": "離地高度 250 mm 至 1500 mm",
      "length": "安裝於車輛前方",
      "minHeight": 250,
      "maxHeight": 1500,
      "minSpacing": 600,
      "maxOuterEdge": null
    },
    "optical": {
      "color": "白色 (White)",
      "visAngle": { "out": 20, "in": 20, "up": 10, "down": 10 },
      "minArea": "無特定面積限制，但投影視在表面需符合 60% 規則或 15 mm 間距規則"
    },
    "electrical": {
      "connections": "當發動裝置啟動時必須自動開啟。當大燈(近光/遠光)或前霧燈開啟時，日行燈必須自動熄滅(大燈作短暫閃爍信號除外)。若與方向燈間距小於 40 mm，指示燈閃爍時該側日行燈必須熄滅或減光。",
      "tellTale": "選配 (Closed-circuit green tell-tale optional)"
    },
    "isDCompatible": true,
    "isYCompatible": true,
    "dLampRules": "若做為 D 類燈設計，兩獨立發光表面間距不得超過 15 mm (DRL 特殊規定)。兩單元需對稱並共同滿足單燈性能。",
    "yLampRules": "若做為 Y 類相互依賴燈系統設計，可由 2 個標記 Y 的單元組成。當開啟時所有光源必須同步切換。若跨越活動部件(如尾門)，開啟活動部件時，固定在車體上的部分仍須滿足 DRL 的基本光度與幾何角要求。",
    "integrationRules": {
      "canGroupWith": ["Dipped_Beam_M1", "Main_Beam_M1", "Indicator_Front_M1", "Position_Front_M1"],
      "canReciprocallyIncorporate": ["Position_Front_M1"],
      "prohibitedReciprocallyIncorporate": ["Indicator_Front_M1", "Dipped_Beam_M1", "Main_Beam_M1"],
      "otherRules": "若與前方向燈複合，在方向燈閃爍期間，該側日行燈必須完全熄滅或至少減光至前位置燈亮度。"
    }
  },
  "Dipped_Beam_M1": {
    "id": "Dipped_Beam_M1",
    "vehicleCategory": "M1_N1",
    "categoryLabel": "轎車 / SUV (M1/N1)",
    "name": "近光頭燈 (M1/N1)",
    "nameEn": "Dipped-Beam Headlamp",
    "regulation": "R149 / R48",
    "classSymbol": "C / V",
    "position": {
      "width": "外邊緣距車輛最外側邊緣不超過 400 mm",
      "height": "離地高度 500 mm 至 1200 mm",
      "length": "安裝於車輛前方",
      "minHeight": 500,
      "maxHeight": 1200,
      "minSpacing": null,
      "maxOuterEdge": 400
    },
    "optical": {
      "color": "白色 (White)",
      "visAngle": { "out": 45, "in": 10, "up": 15, "down": 10 },
      "minArea": "無特定發光面積限制，但近光切線 (Cut-off) 需清晰並符合明暗邊界要求"
    },
    "electrical": {
      "connections": "近光燈必須與前/後位置燈、牌照燈同時開啟。切換至遠光燈時近光燈可保持點亮。若配備自動大燈，當環境光低於 1000 lux 時需在 2 秒內自動切換開啟。",
      "tellTale": "選配；但若配備 AFS (適應性前方照明系統) 則其故障警示燈為強制性。"
    },
    "isDCompatible": true,
    "isYCompatible": false,
    "dLampRules": "近光燈通常不建議做為 D 類燈設計。若做為 D 類燈，兩發光單元間距不得超過 75 mm，且兩側需完全對稱。",
    "yLampRules": "近光燈屬於道路照明裝置，禁止做為 Y 類相互依賴燈系統設計，必須單獨保證照射的連續性與明暗截止線。",
    "integrationRules": {
      "canGroupWith": ["Main_Beam_M1", "DRL_M1", "Indicator_Front_M1", "Position_Front_M1"],
      "canReciprocallyIncorporate": ["Main_Beam_M1"],
      "prohibitedReciprocallyIncorporate": ["Indicator_Front_M1", "DRL_M1"],
      "otherRules": "禁止與前方向燈或日行燈共用發光表面。若與前霧燈組合，其光學分佈不得互相干擾。"
    }
  },
  "Main_Beam_M1": {
    "id": "Main_Beam_M1",
    "vehicleCategory": "M1_N1",
    "categoryLabel": "轎車 / SUV (M1/N1)",
    "name": "遠光頭燈 (M1/N1)",
    "nameEn": "Main-Beam Headlamp",
    "regulation": "R149 / R48",
    "classSymbol": "R",
    "position": {
      "width": "對稱安裝，無特殊側向邊界限制，但必須不干擾近光燈對稱性",
      "height": "無特殊限制",
      "length": "安裝於車輛前方",
      "minHeight": 250, // 離地基本高度，無特別限制，實務上同近光
      "maxHeight": 1500,
      "minSpacing": null,
      "maxOuterEdge": null
    },
    "optical": {
      "color": "白色 (White)",
      "visAngle": { "out": 5, "in": 5, "up": 5, "down": 5 },
      "minArea": "無特定面積要求"
    },
    "electrical": {
      "connections": "可以同時或成對開啟。從遠光燈切換回近光時，所有遠光燈必須同時熄滅。可加裝自動避讓/矩陣自適應遠光燈控制 (ADB)，並需通過 Annex 12 道路測試驗證。",
      "tellTale": "強制性，非閃爍藍色指示燈。"
    },
    "isDCompatible": true,
    "isYCompatible": false,
    "dLampRules": "可作為 D 類燈設計，多見於雙透鏡遠光。兩單元間距不得超過 75 mm。",
    "yLampRules": "遠光燈禁止做為 Y 類相互依賴燈系統設計。",
    "integrationRules": {
      "canGroupWith": ["Dipped_Beam_M1", "DRL_M1", "Indicator_Front_M1", "Position_Front_M1"],
      "canReciprocallyIncorporate": ["Dipped_Beam_M1"],
      "prohibitedReciprocallyIncorporate": ["Indicator_Front_M1", "DRL_M1"],
      "otherRules": "可與近光燈共用光源（如雙光單元）。"
    }
  },
  "Indicator_Front_M1": {
    "id": "Indicator_Front_M1",
    "vehicleCategory": "M1_N1",
    "categoryLabel": "轎車 / SUV (M1/N1)",
    "name": "前方向指示燈 (M1/N1)",
    "nameEn": "Front Direction Indicator",
    "regulation": "R148 / R48",
    "classSymbol": "1 / 1a / 1b",
    "position": {
      "width": "外邊緣距車輛最外側邊緣不超過 400 mm；兩發光面間距不小於 600 mm (車寬 < 1300 mm 時可減至 400 mm)",
      "height": "離地高度 350 mm 至 1500 mm",
      "length": "安裝於車輛前方",
      "minHeight": 350,
      "maxHeight": 1500,
      "minSpacing": 600,
      "maxOuterEdge": 400
    },
    "optical": {
      "color": "琥珀色 (Amber)",
      "visAngle": { "out": 80, "in": 45, "up": 15, "down": 15 },
      "minArea": "無特定面積要求，若為流水點亮 (Sequential Activation) 需符合 R148 規定（由內向外延伸，且必須在 200 ms 內全亮）。"
    },
    "electrical": {
      "connections": "必須與其它燈具獨立開啟。同側的方向指示燈必須透過同一個控制開關同時閃爍。閃爍頻率為 90 ± 30 次/分鐘。若一個光源損壞，其餘指示燈需保持閃爍且點亮頻率改變，或儀表故障燈亮起。",
      "tellTale": "強制性，閃爍綠色指示燈，或配合警示聲響。"
    },
    "isDCompatible": true,
    "isYCompatible": true,
    "dLampRules": "若做為 D 類燈設計，兩發光表面間距 $\le 75$ mm，且需同步閃爍。",
    "yLampRules": "若做為 Y 類設計，可由 2 個標記 Y 的單元組成。若跨越活動部件，開啟尾門或引擎蓋時，固定在車體上的部分仍須滿足方向燈的基本光度與向外幾何角要求。",
    "integrationRules": {
      "canGroupWith": ["Dipped_Beam_M1", "Main_Beam_M1", "DRL_M1", "Position_Front_M1"],
      "canReciprocallyIncorporate": [],
      "prohibitedReciprocallyIncorporate": ["DRL_M1", "Position_Front_M1", "Dipped_Beam_M1"],
      "otherRules": "當前方向指示燈與 DRL 的間距小於 40 mm 時，在方向燈工作期間，該側 DRL 必須熄滅或減光至極低亮度以確保方向燈識別度。"
    }
  },
  "Indicator_Rear_M1": {
    "id": "Indicator_Rear_M1",
    "vehicleCategory": "M1_N1",
    "categoryLabel": "轎車 / SUV (M1/N1)",
    "name": "後方向指示燈 (M1/N1)",
    "nameEn": "Rear Direction Indicator",
    "regulation": "R148 / R48",
    "classSymbol": "2a / 2b",
    "position": {
      "width": "外邊緣距車輛最外側邊緣不超過 400 mm；兩發光面間距不小於 600 mm (車寬 < 1300 mm 時可減至 400 mm)",
      "height": "離地高度 350 mm 至 1500 mm",
      "length": "安裝於車輛後方",
      "minHeight": 350,
      "maxHeight": 1500,
      "minSpacing": 600,
      "maxOuterEdge": 400
    },
    "optical": {
      "color": "琥珀色 (Amber)",
      "visAngle": { "out": 80, "in": 45, "up": 15, "down": 15 },
      "minArea": "若為流水點亮需符合 R148 規定（總長度、速度等限制）"
    },
    "electrical": {
      "connections": "同側所有方向燈由單一開關控制同步閃爍，頻率 90 ± 30 次/分。具備失效檢測功能。",
      "tellTale": "強制性，閃爍綠色指示燈或配合警示聲響。"
    },
    "isDCompatible": true,
    "isYCompatible": true,
    "dLampRules": "若做為 D 類燈設計，兩發光表面間距 $\le 75$ mm。",
    "yLampRules": "非常適用於 Y 類設計。多見於將後方向燈拆分為兩部分：一部分在固定車身，一部分在後行李箱蓋（可動件）。行李箱蓋開啟時，固定部分的向外幾何角仍須達到 80°，且光度合規。",
    "integrationRules": {
      "canGroupWith": ["Position_Rear_M1", "Stop_Lamp_M1", "Fog_Rear_M1", "Reversing_Lamp_M1", "Retro_Reflector_Rear_M1"],
      "canReciprocallyIncorporate": [],
      "prohibitedReciprocallyIncorporate": ["Stop_Lamp_M1", "Position_Rear_M1", "Fog_Rear_M1"],
      "otherRules": "禁止與煞車燈或後位置燈共用發光表面，避免紅黃光色混淆。"
    }
  },
  "Stop_Lamp_M1": {
    "id": "Stop_Lamp_M1",
    "vehicleCategory": "M1_N1",
    "categoryLabel": "轎車 / SUV (M1/N1)",
    "name": "煞車燈 (M1/N1)",
    "nameEn": "Stop Lamp (S1/S2)",
    "regulation": "R148 / R48",
    "classSymbol": "S1 / S2",
    "position": {
      "width": "對稱安裝，兩發光面間距不小於 600 mm (車寬 < 1300 mm 時可減至 400 mm)",
      "height": "離地高度 350 mm 至 1500 mm",
      "length": "安裝於車輛後方",
      "minHeight": 350,
      "maxHeight": 1500,
      "minSpacing": 600,
      "maxOuterEdge": null
    },
    "optical": {
      "color": "紅色 (Red)",
      "visAngle": { "out": 45, "in": 45, "up": 15, "down": 15 },
      "minArea": "無特定單獨面積限制，但發光強度必須顯著高於後位置燈"
    },
    "electrical": {
      "connections": "當駕駛人踩下煞車踏板時，所有煞車燈必須立即同步點亮。當車輛發生緊急煞車時（減速度 > 6 m/s²），可觸發緊急煞車信號（ESS - 所有煞車燈或方向燈高速閃爍）。",
      "tellTale": "選配 (Tell-tale optional)"
    },
    "isDCompatible": true,
    "isYCompatible": true,
    "dLampRules": "若做為 D 類燈設計，兩發光表面間距不得超過 75 mm，並共同發光。",
    "yLampRules": "常用於 Y 類設計。若煞車燈被尾門切割成固定側與活動側兩單元，在尾門打開時，固定在車體上的部分必須仍能提供完整的煞車制動信號與幾何可視角。",
    "integrationRules": {
      "canGroupWith": ["Position_Rear_M1", "Indicator_Rear_M1", "Fog_Rear_M1", "Reversing_Lamp_M1", "Retro_Reflector_Rear_M1"],
      "canReciprocallyIncorporate": ["Position_Rear_M1"],
      "prohibitedReciprocallyIncorporate": ["Indicator_Rear_M1"],
      "otherRules": "常與後位置燈混合(Reciprocally Incorporated)，共用同一個發光表面，踩下煞車時，LED 的驅動電流增大以輸出高強度的煞車光度。"
    }
  },
  "Stop_Lamp_S3_M1": {
    "id": "Stop_Lamp_S3_M1",
    "vehicleCategory": "M1_N1",
    "categoryLabel": "轎車 / SUV (M1/N1)",
    "name": "第三煞車燈 (M1/N1)",
    "nameEn": "High-Mounted Stop Lamp (S3/S4)",
    "regulation": "R148 / R48",
    "classSymbol": "S3 / S4",
    "position": {
      "width": "參考中心必須安裝於車輛的縱向對稱面上",
      "height": "下邊緣必須高於後窗下邊緣，或離地高度高於兩側煞車燈上邊緣至少 150 mm",
      "length": "安裝於車輛後方頂部或後檔風玻璃內側",
      "minHeight": 850, // 實務上高度較高
      "maxHeight": 2100,
      "minSpacing": null,
      "maxOuterEdge": null
    },
    "optical": {
      "color": "紅色 (Red)",
      "visAngle": { "out": 10, "in": 10, "up": 10, "down": 5 },
      "minArea": "通常為帶狀，發光面投影面積無特定限制"
    },
    "electrical": {
      "connections": "與兩側煞車燈同步點亮，踩下煞車時立即點亮，不得延遲。",
      "tellTale": "選配 (Tell-tale optional)"
    },
    "isDCompatible": true,
    "isYCompatible": true,
    "dLampRules": "可使用兩個 D 類標記的燈對稱安裝於縱向對稱面兩側以代替單一燈。",
    "yLampRules": "可做為 Y 類相互依賴燈系統設計，通常不常見，但若因車身結構限制（如尾翼阻擋）可以考慮。",
    "integrationRules": {
      "canGroupWith": [],
      "canReciprocallyIncorporate": [],
      "prohibitedReciprocallyIncorporate": ["Position_Rear_M1", "Indicator_Rear_M1", "Stop_Lamp_M1"],
      "otherRules": "第三煞車燈必須完全獨立安裝，禁止與兩側後尾燈組進行任何發光面混合。"
    }
  },
  "Position_Front_M1": {
    "id": "Position_Front_M1",
    "vehicleCategory": "M1_N1",
    "categoryLabel": "轎車 / SUV (M1/N1)",
    "name": "前位置燈 (M1/N1)",
    "nameEn": "Front Position Lamp",
    "regulation": "R148 / R48",
    "classSymbol": "A",
    "position": {
      "width": "外邊緣距車輛最外側邊緣不超過 400 mm；兩發光面間距不小於 600 mm (車寬 < 1300 mm 時可減至 400 mm)",
      "height": "離地高度 250 mm 至 1500 mm",
      "length": "安裝於車輛前方",
      "minHeight": 250,
      "maxHeight": 1500,
      "minSpacing": 600,
      "maxOuterEdge": 400
    },
    "optical": {
      "color": "白色 (White)",
      "visAngle": { "out": 80, "in": 45, "up": 15, "down": 15 },
      "minArea": "無特定限制"
    },
    "electrical": {
      "connections": "前位置燈必須在其他任何大燈開啟前首先亮起。當大燈開啟時，位置燈必須保持點亮。",
      "tellTale": "強制性，非閃爍綠色指示燈，若儀表板背光與大燈開關同步則可省去獨立指示燈。"
    },
    "isDCompatible": true,
    "isYCompatible": true,
    "dLampRules": "若做為 D 類燈設計，兩發光表面間距 $\le 75$ mm。",
    "yLampRules": "若做為 Y 類設計，可由 2 或 3 個單元組成，通常適用於前大燈與前保桿定位燈的整合設計。",
    "integrationRules": {
      "canGroupWith": ["Dipped_Beam_M1", "Main_Beam_M1", "DRL_M1", "Indicator_Front_M1"],
      "canReciprocallyIncorporate": ["DRL_M1"],
      "prohibitedReciprocallyIncorporate": ["Indicator_Front_M1"],
      "otherRules": "常與 DRL 混合。當 DRL 與前位置燈複合時，大燈點亮後，DRL 發光強度必須減弱至前位置燈的要求水準 (通常為 4 ~ 140 cd)。"
    }
  },
  "Position_Rear_M1": {
    "id": "Position_Rear_M1",
    "vehicleCategory": "M1_N1",
    "categoryLabel": "轎車 / SUV (M1/N1)",
    "name": "後位置燈 (M1/N1)",
    "nameEn": "Rear Position Lamp",
    "regulation": "R148 / R48",
    "classSymbol": "R1 / R2",
    "position": {
      "width": "外邊緣距車輛最外側邊緣不超過 400 mm；兩發光面間距不小於 600 mm (車寬 < 1300 mm 時可減至 400 mm)",
      "height": "離地高度 350 mm 至 1500 mm",
      "length": "安裝於車輛後方",
      "minHeight": 350,
      "maxHeight": 1500,
      "minSpacing": 600,
      "maxOuterEdge": 400
    },
    "optical": {
      "color": "紅色 (Red)",
      "visAngle": { "out": 80, "in": 45, "up": 15, "down": 15 },
      "minArea": "無面積限制，但在 3D 設計中通常是貫穿式或分段式尾燈的核心元件"
    },
    "electrical": {
      "connections": "必須與前位置燈、側標記燈及牌照燈同時開啟與關閉。",
      "tellTale": "與前位置燈共用指示燈。"
    },
    "isDCompatible": true,
    "isYCompatible": true,
    "dLampRules": "若做為 D 類燈設計，兩發光表面間距不得超過 75 mm。",
    "yLampRules": "極度常用！現代轎車貫穿式或跨尾門尾燈的標準設計。Y 系統的 2 或 3 個燈具點亮時構成一個後位置燈。當行李箱蓋打開時，留在固定車身側的位置燈必須繼續保持點亮，並提供向外幾何角 80° 的可見性。",
    "integrationRules": {
      "canGroupWith": ["Stop_Lamp_M1", "Indicator_Rear_M1", "Fog_Rear_M1", "Reversing_Lamp_M1", "Retro_Reflector_Rear_M1"],
      "canReciprocallyIncorporate": ["Stop_Lamp_M1", "Fog_Rear_M1"],
      "prohibitedReciprocallyIncorporate": ["Indicator_Rear_M1", "Retro_Reflector_Rear_M1"],
      "otherRules": "可與煞車燈或後霧燈共用表面（共用 LED 光源並切換亮度）。"
    }
  },
  "Fog_Rear_M1": {
    "id": "Fog_Rear_M1",
    "vehicleCategory": "M1_N1",
    "categoryLabel": "轎車 / SUV (M1/N1)",
    "name": "後霧燈 (M1/N1)",
    "nameEn": "Rear Fog Lamp",
    "regulation": "R148 / R48",
    "classSymbol": "F",
    "position": {
      "width": "若為單燈，應安裝在車輛對稱面偏駕駛員一側；若為雙燈，對稱安裝",
      "height": "離地高度 250 mm 至 1000 mm",
      "length": "安裝於車輛後方",
      "minHeight": 250,
      "maxHeight": 1000,
      "minSpacing": null,
      "maxOuterEdge": null
    },
    "optical": {
      "color": "紅色 (Red)",
      "visAngle": { "out": 25, "in": 25, "up": 5, "down": 5 },
      "minArea": "無特定限制，但因高強度可能致盲，與煞車燈的距離必須大於 100 mm"
    },
    "electrical": {
      "connections": "只有在遠光燈、近光燈或前霧燈開啟時，後霧燈才能點亮。必須能獨立於前霧燈進行關閉。當電源關閉後重新啟動時，後霧燈必須自動保持關閉，除非手動重新開啟。",
      "tellTale": "強制性，非閃爍黃色/琥珀色指示燈。"
    },
    "isDCompatible": true,
    "isYCompatible": true,
    "dLampRules": "若做為 D 類燈設計，兩發光表面間距 $\le 75$ mm。",
    "yLampRules": "可做為 Y 類相互依賴燈系統設計（如雙側後霧燈被行李箱割裂的情形）。",
    "integrationRules": {
      "canGroupWith": ["Position_Rear_M1", "Stop_Lamp_M1", "Indicator_Rear_M1", "Reversing_Lamp_M1", "Retro_Reflector_Rear_M1"],
      "canReciprocallyIncorporate": ["Position_Rear_M1"],
      "prohibitedReciprocallyIncorporate": ["Stop_Lamp_M1", "Indicator_Rear_M1"],
      "otherRules": "後霧燈與煞車燈發光面邊緣之淨距離必須大於 100 mm，以避免高亮度紅光互相混淆。"
    }
  },
  "Reversing_Lamp_M1": {
    "id": "Reversing_Lamp_M1",
    "vehicleCategory": "M1_N1",
    "categoryLabel": "轎車 / SUV (M1/N1)",
    "name": "倒車燈 (M1/N1)",
    "nameEn": "Reversing Lamp",
    "regulation": "R148 / R48",
    "classSymbol": "AR",
    "position": {
      "width": "對稱安裝，無特殊側向邊界限制",
      "height": "離地高度 250 mm 至 1200 mm",
      "length": "安裝於車輛後方",
      "minHeight": 250,
      "maxHeight": 1200,
      "minSpacing": null,
      "maxOuterEdge": null
    },
    "optical": {
      "color": "白色 (White)",
      "visAngle": { "out": 45, "in": 45, "up": 15, "down": 5 },
      "minArea": "無特定限制"
    },
    "electrical": {
      "connections": "只有在倒檔已掛入且引擎啟動裝置處於工作狀態時，倒車燈才能點亮。若配備手排變速箱，點火開關開啟且掛入倒檔時點亮。",
      "tellTale": "選配 (Tell-tale optional)"
    },
    "isDCompatible": true,
    "isYCompatible": true,
    "dLampRules": "若做為 D 類燈設計，兩發光表面間距 $\le 75$ mm。",
    "yLampRules": "可做為 Y 類設計（例如跨尾門的倒車燈組，極為常見）。",
    "integrationRules": {
      "canGroupWith": ["Position_Rear_M1", "Stop_Lamp_M1", "Indicator_Rear_M1", "Fog_Rear_M1", "Retro_Reflector_Rear_M1"],
      "canReciprocallyIncorporate": [],
      "prohibitedReciprocallyIncorporate": ["Position_Rear_M1", "Stop_Lamp_M1"],
      "otherRules": "禁止與紅色光源（煞車燈、後位置燈）共用同一個發光表面，因為發光顏色不同且功能性質互斥。"
    }
  },
  "Retro_Reflector_Rear_M1": {
    "id": "Retro_Reflector_Rear_M1",
    "vehicleCategory": "M1_N1",
    "categoryLabel": "轎車 / SUV (M1/N1)",
    "name": "後非三角形反光片 (M1/N1)",
    "nameEn": "Rear Retro-Reflector (Non-Triangular)",
    "regulation": "R150 / R48",
    "classSymbol": "IA / IB",
    "position": {
      "width": "外邊緣距車輛最外側邊緣不超過 400 mm；兩反光片間距不小於 600 mm",
      "height": "離地高度 250 mm 至 900 mm (特殊車型放寬至 1200 mm)",
      "length": "安裝於車輛後方",
      "minHeight": 250,
      "maxHeight": 900,
      "minSpacing": 600,
      "maxOuterEdge": 400
    },
    "optical": {
      "color": "紅色 (Red)",
      "visAngle": { "out": 30, "in": 30, "up": 15, "down": 15 },
      "minArea": "有效反光投影面積不得小於 25 cm² (R150 面積限值)"
    },
    "electrical": {
      "connections": "無（無源器件，依靠反射外來車輛燈光）",
      "tellTale": "無"
    },
    "isDCompatible": true,
    "isYCompatible": false,
    "dLampRules": "可做為兩個獨立反光片(D類或等效)在同一側，但需確保反射性能合規。",
    "yLampRules": "無源反光片禁止做為 Y 類相互依賴燈系統設計，其物理反射面必須保持完整不可分割。",
    "integrationRules": {
      "canGroupWith": ["Position_Rear_M1", "Stop_Lamp_M1", "Indicator_Rear_M1", "Fog_Rear_M1"],
      "canReciprocallyIncorporate": ["Position_Rear_M1"],
      "prohibitedReciprocallyIncorporate": ["Stop_Lamp_M1", "Indicator_Rear_M1"],
      "otherRules": "常與後位置燈的透鏡整合（混合），但反光部分的逆反射特性需單獨通過 R150 認證。禁止使用三角形反光片（那是拖車專屬）。"
    }
  },

  // ==========================================
  // 2. N 類別 (大貨車) - 安裝規範 R48
  // ==========================================
  "End_Outline_Marker_N": {
    "id": "End_Outline_Marker_N",
    "vehicleCategory": "N_Truck",
    "categoryLabel": "大貨車 / 卡車 (Category N)",
    "name": "端廓邊界燈 (Category N)",
    "nameEn": "End-Outline Marker Lamp",
    "regulation": "R148 / R48",
    "classSymbol": "AM",
    "position": {
      "width": "盡可能靠近車輛最外側緣，兩側對稱",
      "height": "前邊界燈：安裝於最頂部；後邊界燈：盡可能高，但不得高於車廂頂緣",
      "length": "前/後各安裝一對",
      "minHeight": 1500, // 實務上位於貨車貨箱頂部
      "maxHeight": 3000,
      "minSpacing": null,
      "maxOuterEdge": 100 // 距邊緣不大於100mm
    },
    "optical": {
      "color": "前方白色 (White) / 後方紅色 (Red)",
      "visAngle": { "out": 80, "in": 80, "up": 5, "down": 20 },
      "minArea": "無特定限制，需滿足高空辨識度"
    },
    "electrical": {
      "connections": "必須與前位置燈、後位置燈及側標記燈同步點亮與熄滅。",
      "tellTale": "選配 (Tell-tale optional)"
    },
    "isDCompatible": true,
    "isYCompatible": false,
    "dLampRules": "可使用 D 類標記的雙端廓燈組合。",
    "yLampRules": "邊界燈通常不開放作為 Y 類系統設計。",
    "integrationRules": {
      "canGroupWith": ["Position_Front_M1", "Position_Rear_M1"],
      "canReciprocallyIncorporate": [],
      "prohibitedReciprocallyIncorporate": ["Indicator_Front_M1", "Indicator_Rear_M1"],
      "otherRules": "此燈專為寬度大於 2.1 m 的大型車輛強制安裝（車寬在 1.8~2.1 m 間為選配），不可干擾大燈視野。"
    }
  },
  "Side_Marker_N": {
    "id": "Side_Marker_N",
    "vehicleCategory": "N_Truck",
    "categoryLabel": "大貨車 / 卡車 (Category N)",
    "name": "側邊標記燈 (Category N)",
    "nameEn": "Side Marker Lamp",
    "regulation": "R148 / R48",
    "classSymbol": "SM1 / SM2",
    "position": {
      "width": "安裝於車身側面兩側",
      "height": "離地高度 250 mm 至 1500 mm (特殊車身結構可放寬至 2100 mm)",
      "length": "第一盞應安裝在距離車頭前緣 3 米內，最後一盞距離車尾 1 米內，相鄰燈具間距不大於 3 米",
      "minHeight": 250,
      "maxHeight": 1500,
      "minSpacing": null,
      "maxOuterEdge": null
    },
    "optical": {
      "color": "琥珀色 (Amber) (若最尾端與後尾燈複合可為紅色)",
      "visAngle": { "out": 45, "in": 45, "up": 10, "down": 10 },
      "minArea": "無特定限制"
    },
    "electrical": {
      "connections": "必須與位置燈同步點亮。對於 N 類大型貨車，側邊標記燈可與方向指示燈同步閃爍以提高側面示廓安全性。",
      "tellTale": "選配，常與位置燈共用。"
    },
    "isDCompatible": true,
    "isYCompatible": false,
    "dLampRules": "不適用於 D 類設計。",
    "yLampRules": "禁止做為 Y 類相互依賴燈系統，因為側面標記必須沿車身長度均勻分佈，以表明車長。",
    "integrationRules": {
      "canGroupWith": ["Retro_Reflector_Rear_M1"],
      "canReciprocallyIncorporate": [],
      "prohibitedReciprocallyIncorporate": [],
      "otherRules": "車長大於 6 米的車輛必須強制安裝側標記燈（且必須配有 SM1 級別）。"
    }
  },

  // ==========================================
  // 3. O 類別 (拖車) - 安裝規範 R48
  // ==========================================
  "Retro_Reflector_Triangular_O": {
    "id": "Retro_Reflector_Triangular_O",
    "vehicleCategory": "O_Trailer",
    "categoryLabel": "拖車 / 掛車 (Category O)",
    "name": "三角形後反光片 (O)",
    "nameEn": "Triangular Rear Retro-Reflector",
    "regulation": "R150 / R48",
    "classSymbol": "IIIA / IIIB",
    "position": {
      "width": "外邊緣距拖車最外側緣不超過 400 mm，兩片間距不小於 600 mm (拖車寬 < 1300 mm 時可減至 400 mm)",
      "height": "離地高度 250 mm 至 900 mm (特殊結構放寬至 1200 mm)",
      "length": "安裝於拖車最尾端",
      "minHeight": 250,
      "maxHeight": 900,
      "minSpacing": 600,
      "maxOuterEdge": 400
    },
    "optical": {
      "color": "紅色 (Red)",
      "visAngle": { "out": 30, "in": 30, "up": 15, "down": 15 },
      "minArea": "必須是三角形（頂點朝上），有效反射面積不小於 25 cm² (R150 限制)"
    },
    "electrical": {
      "connections": "無（無源器件）",
      "tellTale": "無"
    },
    "isDCompatible": false,
    "isYCompatible": false,
    "dLampRules": "無源三角形反光片不適用 D 類組合標記。",
    "yLampRules": "禁止做為 Y 類系統。三角形反射面必須保持完整，以供後車識別該車為「無動力拖車」。",
    "integrationRules": {
      "canGroupWith": [],
      "canReciprocallyIncorporate": [],
      "prohibitedReciprocallyIncorporate": ["Stop_Lamp_M1", "Position_Rear_M1", "Indicator_Rear_M1", "Fog_Rear_M1"],
      "otherRules": "三角形反光片禁止與任何有源燈具共用發光表面。**絕對禁止**安裝於有動力的汽車(M/N類)上！"
    }
  },
  "Trailer_Front_Position": {
    "id": "Trailer_Front_Position",
    "vehicleCategory": "O_Trailer",
    "categoryLabel": "拖車 / 掛車 (Category O)",
    "name": "拖車前位置燈 (O)",
    "nameEn": "Trailer Front Position Lamp",
    "regulation": "R148 / R48",
    "classSymbol": "A",
    "position": {
      "width": "外邊緣距拖車最外側邊緣不超過 150 mm",
      "height": "離地高度 250 mm 至 1500 mm (特殊放寬至 2100 mm)",
      "length": "安裝於拖車前方",
      "minHeight": 250,
      "maxHeight": 1500,
      "minSpacing": null,
      "maxOuterEdge": 150
    },
    "optical": {
      "color": "白色 (White)",
      "visAngle": { "out": 80, "in": 5, "up": 15, "down": 15 },
      "minArea": "無特定限制"
    },
    "electrical": {
      "connections": "通過掛車電纜與牽引車的位置燈同步開啟與關閉。",
      "tellTale": "在牽引車上顯示。"
    },
    "isDCompatible": true,
    "isYCompatible": true,
    "dLampRules": "若做為 D 類燈設計，兩發光表面間距 $\le 75$ mm。",
    "yLampRules": "可做為 Y 類相互依賴燈系統設計。",
    "integrationRules": {
      "canGroupWith": [],
      "canReciprocallyIncorporate": [],
      "prohibitedReciprocallyIncorporate": [],
      "otherRules": "對於寬度大於 1.6 米的拖車為**強制安裝**；寬度小於 1.6 米為選配。"
    }
  },

  // ==========================================
  // 4. L3 類別 (重型機車) - 安裝規範 R53
  // ==========================================
  "DRL_L3": {
    "id": "DRL_L3",
    "vehicleCategory": "L3",
    "categoryLabel": "重型機車 (Category L3)",
    "name": "日行燈 (L3 機車)",
    "nameEn": "Daytime Running Lamp (DRL)",
    "regulation": "R148 / R53",
    "classSymbol": "RL",
    "position": {
      "width": "若是單燈，安裝在機車縱向對稱面上；若是雙燈， reference centres 需對稱面稱",
      "height": "離地高度 250 mm 至 1500 mm",
      "length": "安裝於機車前方，隨轉向把手轉動",
      "minHeight": 250,
      "maxHeight": 1500,
      "minSpacing": null,
      "maxOuterEdge": null
    },
    "optical": {
      "color": "白色 (White)",
      "visAngle": { "out": 20, "in": 20, "up": 10, "down": 10 },
      "minArea": "無面積限制"
    },
    "electrical": {
      "connections": "當發動機啟動時自動點亮。**特別聯動規定**：開啟 DRL 時，後位置燈必須同步強制開啟（R53 6.13.7.1）。當頭燈開啟時，DRL 必須自動熄滅。",
      "tellTale": "選配 (Closed-circuit green tell-tale optional)"
    },
    "isDCompatible": false,
    "isYCompatible": false,
    "dLampRules": "機車燈具不適用 D 類雙燈標記。",
    "yLampRules": "機車燈具禁止使用 Y 類相互依賴燈系統設計，其主要為單體小巧車身設計。",
    "integrationRules": {
      "canGroupWith": ["Dipped_Beam_L3", "Main_Beam_L3"],
      "canReciprocallyIncorporate": [],
      "prohibitedReciprocallyIncorporate": ["Indicator_L3"],
      "otherRules": "為保護騎乘安全，機車 DRL 點亮時後尾燈必須強制點亮（這與房車 DRL 可單獨亮起的前燈不同）。"
    }
  },
  "Dipped_Beam_L3": {
    "id": "Dipped_Beam_L3",
    "vehicleCategory": "L3",
    "categoryLabel": "重型機車 (Category L3)",
    "name": "近光燈 (L3 機車)",
    "nameEn": "Passing Beam Headlamp",
    "regulation": "R149 / R53",
    "classSymbol": "C / V",
    "position": {
      "width": "安裝於機車縱向對稱面，若為雙燈需對稱且發光表面間距不超過 200 mm (R53 6.2.3.4)",
      "height": "離地高度 500 mm 至 1200 mm",
      "length": "安裝於機車前方",
      "minHeight": 500,
      "maxHeight": 1200,
      "minSpacing": null,
      "maxOuterEdge": null
    },
    "optical": {
      "color": "白色 (White)",
      "visAngle": { "out": 15, "in": 15, "up": 15, "down": 10 }, // 機車專屬幾何角
      "minArea": "無特定限制"
    },
    "electrical": {
      "connections": "發動機啟動後必須保持常亮（自動全時點燈 AHO），或與 DRL 自動切換點亮。",
      "tellTale": "選配。"
    },
    "isDCompatible": false,
    "isYCompatible": false,
    "dLampRules": "不適用於機車近光燈。",
    "yLampRules": "禁止做為 Y 類設計。",
    "integrationRules": {
      "canGroupWith": ["Main_Beam_L3", "DRL_L3"],
      "canReciprocallyIncorporate": [],
      "prohibitedReciprocallyIncorporate": ["Indicator_L3"],
      "otherRules": "若為雙近光燈，兩發光表面之最大間距不得大於 200 mm（R53 特有規定，防後車誤判為汽車）。"
    }
  },
  "Indicator_L3": {
    "id": "Indicator_L3",
    "vehicleCategory": "L3",
    "categoryLabel": "重型機車 (Category L3)",
    "name": "方向燈 (L3 機車)",
    "nameEn": "Direction Indicator Lamp",
    "regulation": "R148 / R53",
    "classSymbol": "11 / 12",
    "position": {
      "width": "前方向燈：間距不小於 240 mm；後方向燈： clearance 不小於 180 mm",
      "height": "離地高度 350 mm 至 1200 mm",
      "length": "前後各安裝一對，前方向燈可隨龍頭把手擺動",
      "minHeight": 350,
      "maxHeight": 1200,
      "minSpacing": 240, // 前方向燈240mm，後方向燈180mm
      "maxOuterEdge": null
    },
    "optical": {
      "color": "琥珀色 (Amber)",
      "visAngle": { "out": 80, "in": 20, "up": 15, "down": 15 },
      "minArea": "無面積限制"
    },
    "electrical": {
      "connections": "閃爍頻率為 90 ± 30 次/分鐘。與頭燈或位置燈獨立電路。",
      "tellTale": "強制性，閃爍綠色指示燈，或配合聲響。"
    },
    "isDCompatible": false,
    "isYCompatible": false,
    "dLampRules": "機車不支援 D 標記方向燈。",
    "yLampRules": "機車不支援 Y 標記方向燈系統。",
    "integrationRules": {
      "canGroupWith": [],
      "canReciprocallyIncorporate": [],
      "prohibitedReciprocallyIncorporate": ["DRL_L3", "Dipped_Beam_L3"],
      "otherRules": "前方向燈必須位於大燈發光面的外側。若前方向燈與大燈距離極近，需提高方向燈亮度（R53 6.3.3.1 設有亮度與間距對照表）。"
    }
  },
  "Stop_Lamp_L3": {
    "id": "Stop_Lamp_L3",
    "vehicleCategory": "L3",
    "categoryLabel": "重型機車 (Category L3)",
    "name": "煞車燈 (L3 機車)",
    "nameEn": "Stop Lamp",
    "regulation": "R148 / R53",
    "classSymbol": "Stop",
    "position": {
      "width": "安裝於機車縱向對稱面上，雙燈對稱",
      "height": "離地高度 250 mm 至 1500 mm",
      "length": "安裝於機車尾部",
      "minHeight": 250,
      "maxHeight": 1500,
      "minSpacing": null,
      "maxOuterEdge": null
    },
    "optical": {
      "color": "紅色 (Red)",
      "visAngle": { "out": 45, "in": 45, "up": 15, "down": 15 },
      "minArea": "無特別限制"
    },
    "electrical": {
      "connections": "踩下前輪手煞車或後輪腳煞車時，煞車燈必須立刻同步點亮。",
      "tellTale": "選配。"
    },
    "isDCompatible": false,
    "isYCompatible": false,
    "dLampRules": "機車不支援 D 類設計。",
    "yLampRules": "機車不支援 Y 類相互依賴燈系統。",
    "integrationRules": {
      "canGroupWith": ["Position_Rear_M1"],
      "canReciprocallyIncorporate": ["Position_Rear_M1"],
      "prohibitedReciprocallyIncorporate": ["Indicator_L3"],
      "otherRules": "常與後位置燈複合(同一個發光面，使用不同發光強度)。"
    }
  },

  // ==========================================
  // 5. L1 類別 (輕型機車/Moped) - 安裝規範 R74
  // ==========================================
  "Pedal_Reflector_L1": {
    "id": "Pedal_Reflector_L1",
    "vehicleCategory": "L1",
    "categoryLabel": "輕型機車 / 慢車 (Category L1)",
    "name": "踏板反光片 (L1 輕摩)",
    "nameEn": "Pedal Retro-Reflectors",
    "regulation": "R150 / R74",
    "classSymbol": "Pedal",
    "position": {
      "width": "嵌入腳踏板主體中，左右兩側各一對",
      "height": "隨踏板旋轉（高度呈動態變化，無固定極限）",
      "length": "安裝在左右腳踏板上",
      "minHeight": 100, // 典型踏板離地高度
      "maxHeight": 800,
      "minSpacing": null,
      "maxOuterEdge": null
    },
    "optical": {
      "color": "琥珀色 (Amber)",
      "visAngle": { "out": 30, "in": 30, "up": 15, "down": 15 },
      "minArea": "外表面必須嵌入踏板凹槽內，確保從車輛前方與後方均可清晰看見反射。"
    },
    "electrical": {
      "connections": "無（無源器件）",
      "tellTale": "無"
    },
    "isDCompatible": false,
    "isYCompatible": false,
    "dLampRules": "踏板反光片不適用 D 類標記。",
    "yLampRules": "禁止做為 Y 類系統設計。",
    "integrationRules": {
      "canGroupWith": [],
      "canReciprocallyIncorporate": [],
      "prohibitedReciprocallyIncorporate": ["Stop_Lamp_M1", "Position_Rear_M1"],
      "otherRules": "踏板反光片為設有踩踏曲柄驅動之 L1 輕摩（具備輔助人力腳踏功能）的**強制安裝件**。禁止安裝於無曲柄之標準機車上。"
    }
  },
  "Dipped_Beam_L1": {
    "id": "Dipped_Beam_L1",
    "vehicleCategory": "L1",
    "categoryLabel": "輕型機車 / 慢車 (Category L1)",
    "name": "近光燈 (L1 輕摩)",
    "nameEn": "Passing Beam Headlamp (L1)",
    "regulation": "R149 / R74",
    "classSymbol": "C / V",
    "position": {
      "width": "安裝於輕摩縱向對稱面上",
      "height": "離地高度 500 mm 至 1200 mm",
      "length": "安裝於輕型機車前方",
      "minHeight": 500,
      "maxHeight": 1200,
      "minSpacing": null,
      "maxOuterEdge": null
    },
    "optical": {
      "color": "白色 (White)",
      "visAngle": { "out": 15, "in": 15, "up": 15, "down": 10 }
    },
    "electrical": {
      "connections": "與牽引引擎聯動，啟動時強制開啟，且當切換為遠光燈時，近光燈可同時熄滅（或保持點亮，依電路設計）。",
      "tellTale": "禁止或無特殊要求。"
    },
    "isDCompatible": false,
    "isYCompatible": false,
    "dLampRules": "不適用於輕摩。",
    "yLampRules": "禁止做為 Y 類設計。",
    "integrationRules": {
      "canGroupWith": [],
      "canReciprocallyIncorporate": [],
      "prohibitedReciprocallyIncorporate": []
    }
  },

  // ==========================================
  // 6. R65 特種警示燈類別 (特種/緊急車輛)
  // ==========================================
  "Warning_Beacon_T65": {
    "id": "Warning_Beacon_T65",
    "vehicleCategory": "Emergency",
    "categoryLabel": "特種車 / 緊急車輛 (R65)",
    "name": "特種旋轉閃爍警示燈 (Category T)",
    "nameEn": "Rotating/Stationary Flashing Beacon (Category T)",
    "regulation": "R65",
    "classSymbol": "T (Blue/Amber/Red)",
    "position": {
      "width": "通常安裝於車體中心對稱軸上",
      "height": "通常安裝於車頂最高處，以防止車體結構遮擋，確保四周可見",
      "length": "車頂中央",
      "minHeight": 1200, // 房車/貨車車頂高度
      "maxHeight": 3000,
      "minSpacing": null,
      "maxOuterEdge": null
    },
    "optical": {
      "color": "藍色 (Blue) / 琥珀色 (Amber) / 紅色 (Red) (各國法規用途不同)",
      "visAngle": { "out": 180, "in": 180, "up": 8, "down": 8, "isBeacon": true }, // 特殊：代表 360 度水平可見
      "frequency": "閃爍頻率必須介於 2.0 Hz 至 4.0 Hz 之間 (即每分鐘 120 至 240 次閃爍)。"
    },
    "electrical": {
      "connections": "獨立專用開關控制，可配合特種勤務開啟。Class 2（雙強度等級）警示燈必須具備白天高亮度、夜晚低強度的自動或手動光度切換功能，以防夜間致盲其它用路人。",
      "tellTale": "強制性，儀表板上需有黃色/琥珀色點亮指示燈以提醒駕駛警示燈正在工作。"
    },
    "isDCompatible": false,
    "isYCompatible": false,
    "dLampRules": "不適用於 D 標記，警示燈通常以成套排燈(Bar)或單一燈座形式認證。",
    "yLampRules": "禁止做為 Y 類相互依賴燈系統設計，其必須以獨立完整的單元運作。",
    "integrationRules": {
      "canGroupWith": [],
      "canReciprocallyIncorporate": [],
      "prohibitedReciprocallyIncorporate": ["Stop_Lamp_M1", "Position_Rear_M1", "Indicator_Rear_M1"],
      "otherRules": "必須安裝於車輛頂部，且光學中心射出的光線在周圍 360 度水平範圍內不得受車身結構阻擋。若有局部阻擋，必須加裝第二盞警示燈進行視野補償。"
    }
  },
  "Warning_Directional_X65": {
    "id": "Warning_Directional_X65",
    "vehicleCategory": "Emergency",
    "categoryLabel": "特種車 / 緊急車輛 (R65)",
    "name": "方向性閃爍警示燈 (Category X)",
    "nameEn": "Directional Flashing Warning Lamp (Category X)",
    "regulation": "R65",
    "classSymbol": "X (Blue/Amber/Red)",
    "position": {
      "width": "對稱安裝於車頭水箱護罩、前葉子板、後牌照旁或車身兩側",
      "height": "離地高度 250 mm 至 1500 mm",
      "length": "前部、側面或尾部",
      "minHeight": 250,
      "maxHeight": 1500,
      "minSpacing": 600,
      "maxOuterEdge": null
    },
    "optical": {
      "color": "藍色 (Blue) / 琥珀色 (Amber) / 紅色 (Red)",
      "visAngle": { "out": 45, "in": 45, "up": 10, "down": 10 },
      "frequency": "閃爍頻率必須介於 2.0 Hz 至 4.0 Hz 之間 (每分鐘 120 至 240 次)。"
    },
    "electrical": {
      "connections": "同組方向警示燈可設定為同步閃爍 (Synchronous) 或交替閃爍 (Alternating) 模式。",
      "tellTale": "強制性（有源指示燈或操作狀態顯示）。"
    },
    "isDCompatible": false,
    "isYCompatible": false,
    "dLampRules": "不適用於 D 類獨立設計。",
    "yLampRules": "禁止做為 Y 類設計。",
    "integrationRules": {
      "canGroupWith": ["Indicator_Front_M1", "Indicator_Rear_M1"],
      "canReciprocallyIncorporate": [],
      "prohibitedReciprocallyIncorporate": ["Dipped_Beam_M1", "Main_Beam_M1"],
      "otherRules": "常安裝於消防車、警車的水箱格柵或保險桿兩側。不得遮擋或干擾大燈與方向燈的法規可視角。"
    }
  }
};

// 導出模組
if (typeof module !== 'undefined' && module.exports) {
  module.exports = regulationsData;
}
