// UN R148 Car Lighting Design Helper - Application Logic & Database

// Comprehensive UN R148 Spec Database
const R148_DATABASE = {
    // Front Position, End-outline & Motorcycle Position
    "A": {
        symbol: "A",
        nameZh: "前位置燈 (Front Position Lamp)",
        nameEn: "Front Position Lamp",
        color: "White",
        colorZh: "白色 (White)",
        minIntensity: 4.0,
        maxIntensitySingle: 140.0,
        maxIntensityD: 70.0,
        horizOutboard: 80,
        horizInboard: 45,
        vertAbove: 15,
        vertBelow: 15,
        testTime: 4.0,
        photometricGrid: "Figure A3-I",
        notesZh: "安裝高度小於 750 mm 時，垂直下方角度可收縮至 5°。若安裝於大燈或前霧燈內，最大光度不受 D-lamp 限制。",
        notesEn: "Vertical below angle reduces to 5° if h < 750 mm. If incorporated in a headlamp or front fog lamp, D-lamp restriction is N.A."
    },
    "AM": {
        symbol: "AM",
        nameZh: "前輪廓邊界燈 (Front End-outline Marker)",
        nameEn: "Front End-outline Marker Lamp",
        color: "White",
        colorZh: "白色 (White)",
        minIntensity: 4.0,
        maxIntensitySingle: 140.0,
        maxIntensityD: 70.0,
        horizOutboard: 80,
        horizInboard: 0,
        vertAbove: 15,
        vertBelow: 15,
        testTime: 4.0,
        photometricGrid: "Figure A3-I",
        notesZh: "安裝在車輛最高處。若安裝高度大於 2100 mm，垂直上方角度可收縮至 5°，下方為 15°。",
        notesEn: "Installed at vehicle's highest point. Vertical above angle reduces to 5° if h > 2100 mm."
    },
    "MA": {
        symbol: "MA",
        nameZh: "機車前位置燈 (Motorcycle Front Position)",
        nameEn: "Motorcycle Front Position Lamp (L-cat)",
        color: "White",
        colorZh: "白色 (White)",
        minIntensity: 4.0,
        maxIntensitySingle: 140.0,
        maxIntensityD: 140.0, // N.A.
        horizOutboard: 80,
        horizInboard: 80, // For singular, if pair it's 20
        vertAbove: 15,
        vertBelow: 10,
        testTime: 4.0,
        photometricGrid: "Figure A3-I",
        notesZh: "若為單個安裝，左右可視角均為 80°；若成對安裝，內側可視角可縮至 20°。垂直下方角度標準為 10°，若高度小於 750 mm 則為 5°。",
        notesEn: "Horizontal inboard 80° for singular, 20° for pair. Vertical below is 10° standard, 5° if h < 750 mm."
    },

    // Rear Position, End-outline & Motorcycle Position (Steady & Variable)
    "R1": {
        symbol: "R1",
        nameZh: "後位置燈 - 穩態 (Rear Position Steady)",
        nameEn: "Rear Position Lamp (Steady)",
        color: "Red",
        colorZh: "紅色 (Red)",
        minIntensity: 4.0,
        maxIntensitySingle: 17.0,
        maxIntensityD: 8.5,
        horizOutboard: 80,
        horizInboard: 45,
        vertAbove: 15,
        vertBelow: 15,
        testTime: 4.0,
        photometricGrid: "Figure A3-I",
        notesZh: "穩態紅色定位光源。高度小於 750 mm 時，垂直下方角度可縮至 5°；若安裝於可活動組件上，垂直上方角度可改為 5°。",
        notesEn: "Steady red source. Vertical below reduces to 5° if h < 750 mm. Vertical above reduces to 5° if on a movable component."
    },
    "R2": {
        symbol: "R2",
        nameZh: "後位置燈 - 可變亮度 (Rear Position Variable)",
        nameEn: "Rear Position Lamp (Variable)",
        color: "Red",
        colorZh: "紅色 (Red)",
        minIntensity: 4.0,
        maxIntensitySingle: 42.0,
        maxIntensityD: 21.0,
        horizOutboard: 80,
        horizInboard: 45,
        vertAbove: 15,
        vertBelow: 15,
        testTime: 4.0,
        photometricGrid: "Figure A3-I",
        notesZh: "光度可隨環境亮度自動調節（可變亮度光度）。最大光度上限提高至 42 cd 以適應日間強光，夜間減弱以防眩光。",
        notesEn: "Luminous intensity adjusts dynamically. Max limit increased to 42 cd to ensure daytime visibility."
    },
    "RM1": {
        symbol: "RM1",
        nameZh: "後輪廓邊界燈 - 穩態 (Rear End-outline Steady)",
        nameEn: "Rear End-outline Marker (Steady)",
        color: "Red",
        colorZh: "紅色 (Red)",
        minIntensity: 4.0,
        maxIntensitySingle: 17.0,
        maxIntensityD: 8.5,
        horizOutboard: 80,
        horizInboard: 0,
        vertAbove: 15,
        vertBelow: 15,
        testTime: 4.0,
        photometricGrid: "Figure A3-I",
        notesZh: "安裝於後方車頂處。高度大於 2100 mm 時，垂直上方角度可收縮至 5°，下方為 15°。",
        notesEn: "Installed on rear roof. Vertical above angle reduces to 5° if h > 2100 mm."
    },
    "RM2": {
        symbol: "RM2",
        nameZh: "後輪廓邊界燈 - 可變亮度 (Rear End-outline Variable)",
        nameEn: "Rear End-outline Marker (Variable)",
        color: "Red",
        colorZh: "紅色 (Red)",
        minIntensity: 4.0,
        maxIntensitySingle: 42.0,
        maxIntensityD: 21.0,
        horizOutboard: 80,
        horizInboard: 0,
        vertAbove: 15,
        vertBelow: 15,
        testTime: 4.0,
        photometricGrid: "Figure A3-I",
        notesZh: "後輪廓邊界燈的可變亮度光度版本。最大光度可在 42 cd（日間）與低光（夜間）間自動切換。",
        notesEn: "Variable intensity version of rear end-outline lamp. Automatically swappable."
    },
    "MR": {
        symbol: "MR",
        nameZh: "機車後位置燈 (Motorcycle Rear Position)",
        nameEn: "Motorcycle Rear Position Lamp (L-cat)",
        color: "Red",
        colorZh: "紅色 (Red)",
        minIntensity: 4.0,
        maxIntensitySingle: 17.0,
        maxIntensityD: 17.0, // N.A.
        horizOutboard: 80,
        horizInboard: 80, // For singular, 20 for pair
        vertAbove: 15,
        vertBelow: 10,
        testTime: 4.0,
        photometricGrid: "Figure A3-I",
        notesZh: "機車定位紅色光源。若單個安裝，左右可視角均為 80°；若成對安裝，內側為 20°。垂直下方標準為 10°，高度低於 750 mm 時為 5°。",
        notesEn: "Motorcycle red positioning. Inboard 80° for singular, 20° for pair. Vertical below is 10° standard, 5° if h < 750 mm."
    },

    // Stop Lamps (S1, S2, S3, S4, MS)
    "S1": {
        symbol: "S1",
        nameZh: "煞車燈 - 穩態 (Stop Lamp Steady)",
        nameEn: "Stop Lamp (Steady)",
        color: "Red",
        colorZh: "紅色 (Red)",
        minIntensity: 60.0,
        maxIntensitySingle: 260.0,
        maxIntensityD: 130.0,
        horizOutboard: 45,
        horizInboard: 45,
        vertAbove: 15,
        vertBelow: 15,
        testTime: 0.2, // Instant-on!
        photometricGrid: "Figure A3-I",
        notesZh: "【關鍵】點亮反應時間測試基準為 0.2 秒。高度小於 750 mm 時，垂直下方角度可縮至 5°。",
        notesEn: "Transient ignition test measured at 0.2s. Vertical below angle reduces to 5° if h < 750 mm."
    },
    "S2": {
        symbol: "S2",
        nameZh: "煞車燈 - 可變亮度 (Stop Lamp Variable)",
        nameEn: "Stop Lamp (Variable)",
        color: "Red",
        colorZh: "紅色 (Red)",
        minIntensity: 60.0,
        maxIntensitySingle: 730.0,
        maxIntensityD: 365.0,
        horizOutboard: 45,
        horizInboard: 45,
        vertAbove: 15,
        vertBelow: 15,
        testTime: 0.2,
        photometricGrid: "Figure A3-I",
        notesZh: "【關鍵】點亮時間 0.2 秒。最大光度上限達 730 cd（日間強光環境），夜間可自動降低以防眩光。",
        notesEn: "Measured at 0.2s. Dynamic max range up to 730 cd in bright daytime conditions."
    },
    "S3": {
        symbol: "S3",
        nameZh: "第三煞車燈 - 穩態 (CHMSL Steady)",
        nameEn: "Central High Mounted Stop (Steady)",
        color: "Red",
        colorZh: "紅色 (Red)",
        minIntensity: 25.0,
        maxIntensitySingle: 110.0,
        maxIntensityD: 55.0,
        horizOutboard: 10,
        horizInboard: 10,
        vertAbove: 10,
        vertBelow: 5,
        testTime: 0.2,
        photometricGrid: "Figure A3-III",
        notesZh: "中央高位煞車燈（CHMSL）。幾何可視角度較小（左右各 10°，垂直上方 10° 下方 5°）。點亮測試為 0.2 秒。",
        notesEn: "Central High Mounted Stop Lamp (CHMSL). Narrower geometric visibility cone."
    },
    "S4": {
        symbol: "S4",
        nameZh: "第三煞車燈 - 可變亮度 (CHMSL Variable)",
        nameEn: "Central High Mounted Stop (Variable)",
        color: "Red",
        colorZh: "紅色 (Red)",
        minIntensity: 25.0,
        maxIntensitySingle: 160.0,
        maxIntensityD: 80.0,
        horizOutboard: 10,
        horizInboard: 10,
        vertAbove: 10,
        vertBelow: 5,
        testTime: 0.2,
        photometricGrid: "Figure A3-III",
        notesZh: "中央高位煞車燈的可變亮度光度版本。日間強光最大上限為 160 cd，點亮時間 0.2 秒。",
        notesEn: "Variable version of CHMSL. Max limit increased to 160 cd in bright day conditions."
    },
    "MS": {
        symbol: "MS",
        nameZh: "機車煞車燈 (Motorcycle Stop Lamp)",
        nameEn: "Motorcycle Stop Lamp (L-cat)",
        color: "Red",
        colorZh: "紅色 (Red)",
        minIntensity: 40.0,
        maxIntensitySingle: 260.0,
        maxIntensityD: 260.0, // N.A.
        horizOutboard: 45,
        horizInboard: 45, // For singular, 0 for pair
        vertAbove: 15,
        vertBelow: 10,
        testTime: 0.2,
        photometricGrid: "Figure A3-I",
        notesZh: "點亮時間 0.2 秒。若成對安裝，內側可視角可為 0°。垂直下方標準角度為 10°，高度 < 750 mm 時縮至 5°。",
        notesEn: "Transient test at 0.2s. Inboard 45° for singular, 0° for pair. Vertical below reduces to 5° if h < 750 mm."
    },

    // Direction Indicators (Cat 1, 1a, 1b, 2a, 2b, 5, 6, 11s, 12)
    "1": {
        symbol: "1",
        nameZh: "前方向燈 (距離大燈 >= 40 mm)",
        nameEn: "Front Direction Indicator (dist >= 40mm)",
        color: "Amber",
        colorZh: "琥珀色 (Amber)",
        minIntensity: 175.0,
        maxIntensitySingle: 1000.0,
        maxIntensityD: 500.0,
        horizOutboard: 80,
        horizInboard: 45,
        vertAbove: 15,
        vertBelow: 15,
        testTime: 0.2,
        photometricGrid: "Figure A3-I",
        notesZh: "安裝於車前且離近光大燈/前霧燈距離至少 40 mm。點亮反應測試基準為 0.2 秒。高度低於 750 mm 下可視角改為 5°。",
        notesEn: "Installed >= 40mm from passing beam or front fog lamp. Ignition tested at 0.2s."
    },
    "1a": {
        symbol: "1a",
        nameZh: "前方向燈 (距離大燈 >= 20 mm)",
        nameEn: "Front Direction Indicator (dist >= 20mm)",
        color: "Amber",
        colorZh: "琥珀色 (Amber)",
        minIntensity: 250.0,
        maxIntensitySingle: 1200.0,
        maxIntensityD: 600.0,
        horizOutboard: 80,
        horizInboard: 45,
        vertAbove: 15,
        vertBelow: 15,
        testTime: 0.2,
        photometricGrid: "Figure A3-I",
        notesZh: "【關鍵】由於距離大燈較近 (>= 20 mm且 < 40 mm)，為了防止被大燈光芒掩蓋，最小光度提高至 250 cd，最大光度上限 1200 cd。點亮 0.2 秒。",
        notesEn: "Closer to headlamp. Minimum intensity increased to 250 cd to overcome headlamp glare."
    },
    "1b": {
        symbol: "1b",
        nameZh: "前方向燈 (無距離限制 / < 20 mm)",
        nameEn: "Front Direction Indicator (Any distance / < 20mm)",
        color: "Amber",
        colorZh: "琥珀色 (Amber)",
        minIntensity: 400.0,
        maxIntensitySingle: 1200.0,
        maxIntensityD: 600.0,
        horizOutboard: 80,
        horizInboard: 45,
        vertAbove: 15,
        vertBelow: 15,
        testTime: 0.2,
        photometricGrid: "Figure A3-I",
        notesZh: "【關鍵】與大燈極近或整合在一起 (距離 < 20 mm)。為了確保方向信號辨識度，最小光度大幅提高至 400 cd！點亮測試 0.2 秒。",
        notesEn: "Integrated or extremely close to headlamp. Min intensity significantly increased to 400 cd."
    },
    "2a": {
        symbol: "2a",
        nameZh: "後方向燈 - 穩態",
        nameEn: "Rear Direction Indicator (Steady)",
        color: "Amber",
        colorZh: "琥珀色 (Amber)",
        minIntensity: 50.0,
        maxIntensitySingle: 500.0,
        maxIntensityD: 250.0,
        horizOutboard: 80,
        horizInboard: 45,
        vertAbove: 15,
        vertBelow: 15,
        testTime: 0.2,
        photometricGrid: "Figure A3-I",
        notesZh: "穩態琥珀色後方向信號燈。反應時間測試 0.2 秒。高度低於 750 mm 下可視角改為 5°。",
        notesEn: "Steady amber rear indicator. Transient tested at 0.2s. Vertical below is 5° if h < 750 mm."
    },
    "2b": {
        symbol: "2b",
        nameZh: "後方向燈 - 可變亮度",
        nameEn: "Rear Direction Indicator (Variable)",
        color: "Amber",
        colorZh: "琥珀色 (Amber)",
        minIntensity: 50.0,
        maxIntensitySingle: 1000.0,
        maxIntensityD: 500.0,
        horizOutboard: 80,
        horizInboard: 45,
        vertAbove: 15,
        vertBelow: 15,
        testTime: 0.2,
        photometricGrid: "Figure A3-I",
        notesZh: "可變光度的後方向燈。在日間環境中，最大上限光度增加至 1000 cd，大幅強化烈日下的行車安全，點亮時間 0.2 秒。",
        notesEn: "Variable rear indicator. Max limit raised to 1000 cd in bright ambient light."
    },
    "5": {
        symbol: "5",
        nameZh: "側方向燈 (M1/N1與長度 <= 6米車輛)",
        nameEn: "Side Direction Indicator (Cat 5)",
        color: "Amber",
        colorZh: "琥珀色 (Amber)",
        minIntensity: 0.6,
        maxIntensitySingle: 280.0,
        maxIntensityD: 140.0,
        horizOutboard: 55, // Outboard rearward is 55, forward is 5
        horizInboard: 5,
        vertAbove: 15,
        vertBelow: 15,
        testTime: 0.2,
        photometricGrid: "Table A2-2",
        notesZh: "側邊方向指示燈。水平幾何能見角專為車側盲區設計：後向為 55°，前向為 5°。點亮時間為 0.2 秒。",
        notesEn: "Side indicator for small vehicles. Horizontal asymmetrical angle: 5° forward to 55° rearward."
    },
    "6": {
        symbol: "6",
        nameZh: "側方向燈 (N2/N3與長度 > 6米大車)",
        nameEn: "Side Direction Indicator (Cat 6)",
        color: "Amber",
        colorZh: "琥珀色 (Amber)",
        minIntensity: 50.0,
        maxIntensitySingle: 280.0,
        maxIntensityD: 140.0,
        horizOutboard: 55,
        horizInboard: 5,
        vertAbove: 30, // 30 for high vehicles!
        vertBelow: 5,
        testTime: 0.2,
        photometricGrid: "Figure A3-IV",
        notesZh: "大車與長車專用側方向燈。最小光度要求高達 50 cd。幾何可視角度特殊：垂直上方 30°（適應大卡車高駕駛視線），下方 5°。點亮時間 0.2 秒。",
        notesEn: "Side indicator for heavy/long vehicles. Min 50 cd. Vertical visibility: 30° above, 5° below."
    },

    // Side Marker Lamps (SM1, SM2)
    "SM1": {
        symbol: "SM1",
        nameZh: "側方標誌燈 (所有車型)",
        nameEn: "Side Marker Lamp (SM1 - All Vehicles)",
        color: "Amber",
        colorZh: "琥珀色 (後部可為紅色) (Amber/Red)",
        minIntensity: 4.0, // In reference axis, within field other than axis is 0.6
        maxIntensitySingle: 25.0,
        maxIntensityD: 25.0, // N.A.
        horizOutboard: 45,
        horizInboard: 45,
        vertAbove: 10,
        vertBelow: 10,
        testTime: 4.0,
        photometricGrid: "Figure A3-VII",
        notesZh: "水平可視角為前向/後向各 45°。基準軸上最小光度為 4.0 cd，其餘法規區域為 0.6 cd。最大上限為 25.0 cd。若與後紅光燈具整合，後部側標誌燈可發紅光。",
        notesEn: "Horizontal visibility 45° forward/rearward. Axis min is 4.0 cd, angular field min is 0.6 cd."
    },
    "SM2": {
        symbol: "SM2",
        nameZh: "側方標誌燈 (M1乘用車)",
        nameEn: "Side Marker Lamp (SM2 - M1 Cars)",
        color: "Amber",
        colorZh: "琥珀色 (後部可為紅色) (Amber/Red)",
        minIntensity: 0.6, // Reference axis and within field both 0.6
        maxIntensitySingle: 25.0,
        maxIntensityD: 25.0,
        horizOutboard: 30,
        horizInboard: 30,
        vertAbove: 10,
        vertBelow: 10,
        testTime: 4.0,
        photometricGrid: "Figure A3-VIII",
        notesZh: "M1 類乘用車專用，可視角與光度要求較低。水平可視角為前/後各 30°。基準軸與其餘區域最小光度皆為 0.6 cd，上限為 25.0 cd。",
        notesEn: "Lower spec side marker for M1 cars. Horizontal visibility 30° forward/rearward."
    },

    // Daytime Running Lamp (RL)
    "RL": {
        symbol: "RL",
        nameZh: "日間行車燈 (Daytime Running Lamp)",
        nameEn: "Daytime Running Lamp (DRL)",
        color: "White",
        colorZh: "白色 (White)",
        minIntensity: 400.0,
        maxIntensitySingle: 1200.0,
        maxIntensityD: 600.0,
        horizOutboard: 20,
        horizInboard: 20,
        vertAbove: 10,
        vertBelow: 5,
        testTime: 4.0,
        photometricGrid: "Figure A3-II",
        notesZh: "【關鍵】設計高強度白色發光體，最小光度為 400 cd，上限為 1200 cd。幾何可視角度：左右各 20°，上方 10°，下方 5°。當大燈點亮時，日行燈必須自動熄滅或減光至位置燈級別。",
        notesEn: "High-intensity white source. Min 400 cd, Max 1200 cd. Must turn off or dim to position level when headlamps turn on."
    },

    // Reversing Lamp (AR)
    "AR": {
        symbol: "AR",
        nameZh: "倒車燈 (Reversing Lamp)",
        nameEn: "Reversing Lamp",
        color: "White",
        colorZh: "白色 (White)",
        minIntensity: 80.0,
        maxIntensitySingle: 600.0, // 300 above H-plane, 600 below H-plane down to 5D, 8000 below 5D
        maxIntensityD: 600.0,
        horizOutboard: 45, // 45 for single, if pair: outboard 45, inboard 30
        horizInboard: 45,
        vertAbove: 15,
        vertBelow: 5,
        testTime: 0.2,
        photometricGrid: "Figure A3-V",
        notesZh: "光學上限分區限制：水平線（H線）以上最大為 300 cd；水平線以下至 5°D 區間最大為 600 cd；5°D 以下地面反射方向最大可達 8000 cd！點亮測試為 0.2 秒。",
        notesEn: "Zoned max limits: 300 cd above H, 600 cd from H to 5D, 8000 cd below 5D to ground. Tested at 0.2s."
    },

    // Rear Fog Lamps (F1, F2)
    "F1": {
        symbol: "F1",
        nameZh: "後霧燈 - 穩態 (Rear Fog Steady)",
        nameEn: "Rear Fog Lamp (Steady)",
        color: "Red",
        colorZh: "紅色 (Red)",
        minIntensity: 150.0,
        maxIntensitySingle: 300.0,
        maxIntensityD: 300.0, // N.A.
        horizOutboard: 25,
        horizInboard: 25,
        vertAbove: 5,
        vertBelow: 5,
        testTime: 4.0,
        photometricGrid: "Figure A3-VI",
        notesZh: "高亮紅色濃霧警示光源。最小光度 150 cd，最大上限 300 cd。可視角度窄（左右各 25°，上下各 5°）。與大燈/前霧燈連動開啟。",
        notesEn: "High-intensity red. Min 150 cd, Max 300 cd. Narrow visibility angles (±25° H, ±5° V)."
    },
    "F2": {
        symbol: "F2",
        nameZh: "後霧燈 - 可變亮度 (Rear Fog Variable)",
        nameEn: "Rear Fog Lamp (Variable)",
        color: "Red",
        colorZh: "紅色 (Red)",
        minIntensity: 150.0,
        maxIntensitySingle: 840.0,
        maxIntensityD: 840.0,
        horizOutboard: 25,
        horizInboard: 25,
        vertAbove: 5,
        vertBelow: 5,
        testTime: 4.0,
        photometricGrid: "Figure A3-VI",
        notesZh: "後霧燈的可變亮度光度版本。日間或強光背景下，光度上限可自動調高至 840 cd 以增強穿透力，夜間自動減弱。",
        notesEn: "Variable intensity version of rear fog. Max limit extends to 840 cd in daytime."
    },

    // Parking Lamps (Forward and Rearward)
    "77R_F": {
        symbol: "77R",
        nameZh: "前駐車燈 (Parking Lamp Forward)",
        nameEn: "Forward facing Parking Lamp",
        color: "White",
        colorZh: "白色 (White)",
        minIntensity: 2.0,
        maxIntensitySingle: 60.0,
        maxIntensityD: 60.0,
        horizOutboard: 45,
        horizInboard: 0, // 0 for singular, 45 for pair
        vertAbove: 15,
        vertBelow: 15,
        testTime: 4.0,
        photometricGrid: "Figure A3-I",
        notesZh: "車輛靜止駐車時前方白色指示燈。最小光度僅 2 cd，最大為 60 cd。高度低於 750 mm 時垂直下方角度縮至 5°。",
        notesEn: "Forward white indicator for stationary parking. Min 2 cd, Max 60 cd. Downward vertical decreases to 5° if h < 750 mm."
    },
    "77R_R": {
        symbol: "77R",
        nameZh: "後駐車燈 (Parking Lamp Rearward)",
        nameEn: "Rearward facing Parking Lamp",
        color: "Red",
        colorZh: "紅色 (Red)",
        minIntensity: 2.0,
        maxIntensitySingle: 30.0,
        maxIntensityD: 30.0,
        horizOutboard: 45,
        horizInboard: 0,
        vertAbove: 15,
        vertBelow: 15,
        testTime: 4.0,
        photometricGrid: "Figure A3-I",
        notesZh: "車輛靜止駐車時後方紅色指示燈。最小光度僅 2 cd，最大光度上限 30 cd。高度低於 750 mm 下可視角改為 5°。",
        notesEn: "Rearward red indicator. Min 2 cd, Max 30 cd. Downward vertical decreases to 5° if h < 750 mm."
    }
};

// CIE 1931 Chromaticity Coordinates for UN R148
const CIE_BOUNDARIES = {
    "Red": [
        {x: 0.690, y: 0.310},
        {x: 0.690, y: 0.290}, // y <= 0.335; z <= 0.008 -> x + y >= 0.992
        {x: 0.665, y: 0.335},
        {x: 0.665, y: 0.335}
    ],
    "Amber": [
        {x: 0.572, y: 0.428}, // y <= 0.429; y >= 0.398; z <= 0.007
        {x: 0.645, y: 0.355},
        {x: 0.612, y: 0.388},
        {x: 0.564, y: 0.429}
    ],
    "White": [
        {x: 0.310, y: 0.348}, // x >= 0.310; x <= 0.500; y >= 0.150 + 0.640x; y <= 0.440; y >= 0.050 + 0.750x; y <= 0.382
        {x: 0.440, y: 0.440},
        {x: 0.500, y: 0.440},
        {x: 0.500, y: 0.382},
        {x: 0.440, y: 0.382},
        {x: 0.310, y: 0.283}
    ]
};

// Global UI State
let uiState = {
    selectedLamp: "S1",
    mountingHeight: 250, // in mm
    dLampEnabled: false,
    variableIntensityEnabled: false,
    cieInputX: 0.33,
    cieInputY: 0.33,
    activeTab: "single"
};

// App Initialization
window.addEventListener("DOMContentLoaded", () => {
    initUI();
    loadLampSelector();
    updateDashboard();
    initCIEChart();
    initCrossRefTab();
});

// Setup Listeners and DOM Bindings
function initUI() {
    // Mounting Height Range Slider
    const heightSlider = document.getElementById("heightSlider");
    const heightValue = document.getElementById("heightValue");
    if(heightSlider && heightValue) {
        heightSlider.addEventListener("input", (e) => {
            uiState.mountingHeight = parseInt(e.target.value);
            heightValue.innerText = uiState.mountingHeight + " mm";
            updateDashboard();
            updateCrossRefTable();
        });
    }

    // Toggle Toggles
    const dLampToggle = document.getElementById("dLampToggle");
    if(dLampToggle) {
        dLampToggle.addEventListener("change", (e) => {
            uiState.dLampEnabled = e.target.checked;
            updateDashboard();
            updateCrossRefTable();
        });
    }



    // Tab Buttons Selection
    const tabBtns = document.querySelectorAll(".tab-btn");
    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            tabBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            const tabName = btn.dataset.tab;
            uiState.activeTab = tabName;
            
            document.querySelectorAll(".tab-panel").forEach(panel => {
                panel.classList.remove("active");
            });
            document.getElementById(tabName + "Tab").classList.add("active");
            
            if(tabName === "cie") {
                // Redraw canvas to fit viewport
                setTimeout(drawCIE, 50);
            }
        });
    });

    // CIE Calculator Bindings
    const btnCheckCie = document.getElementById("btnCheckCie");
    if(btnCheckCie) {
        btnCheckCie.addEventListener("click", performCIECoordinateCheck);
    }
    
    // Search Box in Sidebar
    const searchBox = document.getElementById("searchBox");
    if(searchBox) {
        searchBox.addEventListener("input", (e) => {
            const query = e.target.value.toLowerCase();
            
            // Loop through each category
            const categories = ["cat-front", "cat-side", "cat-rear", "cat-other"];
            categories.forEach(catClass => {
                const header = document.querySelector(`.lamp-category-header.${catClass}`);
                if (!header) return;
                
                let sibling = header.nextElementSibling;
                let visibleCount = 0;
                
                while(sibling && !sibling.classList.contains("lamp-category-header")) {
                    if (sibling.classList.contains("lamp-list-item")) {
                        const text = sibling.innerText.toLowerCase();
                        if (text.includes(query)) {
                            sibling.style.display = "flex";
                            visibleCount++;
                        } else {
                            sibling.style.display = "none";
                        }
                    }
                    sibling = sibling.nextElementSibling;
                }
                
                if (query.trim() !== "") {
                    if (visibleCount === 0) {
                        header.style.display = "none";
                    } else {
                        header.style.display = "flex";
                    }
                } else {
                    header.style.display = "flex";
                }
            });
        });
    }
}

// Automatically swap selected lamp steady <-> variable versions based on global switch
function handleIntensityTypeAutoSwap() {
    const swapMap = {
        "R1": "R2", "R2": "R1",
        "RM1": "RM2", "RM2": "RM1",
        "S1": "S2", "S2": "S1",
        "S3": "S4", "S4": "S3",
        "2a": "2b", "2b": "2a",
        "F1": "F2", "F2": "F1"
    };
    
    const cur = uiState.selectedLamp;
    if(uiState.variableIntensityEnabled) {
        // Steady -> Variable
        if(cur === "R1") uiState.selectedLamp = "R2";
        else if(cur === "RM1") uiState.selectedLamp = "RM2";
        else if(cur === "S1") uiState.selectedLamp = "S2";
        else if(cur === "S3") uiState.selectedLamp = "S4";
        else if(cur === "2a") uiState.selectedLamp = "2b";
        else if(cur === "F1") uiState.selectedLamp = "F2";
    } else {
        // Variable -> Steady
        if(cur === "R2") uiState.selectedLamp = "R1";
        else if(cur === "RM2") uiState.selectedLamp = "RM1";
        else if(cur === "S2") uiState.selectedLamp = "S1";
        else if(cur === "S4") uiState.selectedLamp = "S3";
        else if(cur === "2b") uiState.selectedLamp = "2a";
        else if(cur === "F2") uiState.selectedLamp = "F1";
    }
    
    // Highlight list item in sidebar
    document.querySelectorAll(".lamp-list-item").forEach(item => {
        item.classList.remove("selected");
        if(item.dataset.id === uiState.selectedLamp) {
            item.classList.add("selected");
            // Scroll to view
            item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    });
}

// Load List of Lamps in Sidebar
// Load List of Lamps in Sidebar
function loadLampSelector() {
    const listContainer = document.getElementById("lampListContainer");
    if(!listContainer) return;
    
    listContainer.innerHTML = "";
    
    const LAMP_CATEGORIES = [
        {
            title: "前燈類 (Front Lamps)",
            class: "cat-front",
            keys: ["1", "1a", "1b", "A", "AM", "MA", "RL", "77R_F"]
        },
        {
            title: "側燈類 (Side Lamps)",
            class: "cat-side",
            keys: ["5", "6", "SM1", "SM2"]
        },
        {
            title: "尾燈類 (Rear Lamps)",
            class: "cat-rear",
            keys: ["2a", "2b", "R1", "R2", "RM1", "RM2", "MR", "S1", "S2", "S3", "S4", "MS", "F1", "F2", "AR", "77R_R"]
        }
    ];
    
    // Find any key in R148_DATABASE not in the above categories
    const categorizedKeys = new Set();
    LAMP_CATEGORIES.forEach(cat => cat.keys.forEach(k => categorizedKeys.add(k)));
    
    const otherKeys = [];
    Object.keys(R148_DATABASE).forEach(key => {
        if(!categorizedKeys.has(key)) {
            otherKeys.push(key);
        }
    });
    
    if(otherKeys.length > 0) {
        LAMP_CATEGORIES.push({
            title: "其他類別 (Other Lamps)",
            class: "cat-other",
            keys: otherKeys
        });
    }
    
    LAMP_CATEGORIES.forEach(category => {
        const validKeys = category.keys.filter(k => R148_DATABASE[k]);
        if(validKeys.length === 0) return;
        
        // Add Category Header
        const header = document.createElement("div");
        header.className = `lamp-category-header ${category.class}`;
        header.innerHTML = `
            <span class="category-indicator"></span>
            <span>${category.title}</span>
        `;
        listContainer.appendChild(header);
        
        validKeys.forEach(key => {
            const lamp = R148_DATABASE[key];
            
            const item = document.createElement("button");
            item.className = "lamp-list-item";
            if(key === uiState.selectedLamp) {
                item.classList.add("selected");
            }
            item.dataset.id = key;
            
            let colorClass = "tag-white";
            if(lamp.color === "Red") colorClass = "tag-red";
            else if(lamp.color === "Amber") colorClass = "tag-amber";
            
            item.innerHTML = `
                <span class="lamp-symbol-tag ${colorClass}">${lamp.symbol}</span>
                <span class="lamp-name-txt">${lamp.nameZh}</span>
            `;
            
            item.addEventListener("click", () => {
                document.querySelectorAll(".lamp-list-item").forEach(i => i.classList.remove("selected"));
                item.classList.add("selected");
                
                uiState.selectedLamp = key;
                
                // Sync variable intensity state
                const isVariable = ["R2", "RM2", "S2", "S4", "2b", "F2"].includes(key);
                uiState.variableIntensityEnabled = isVariable;
                
                updateDashboard();
            });
            
            listContainer.appendChild(item);
        });
    });
}

// Dynamically Calculate Active Specifications based on Global Modifiers
function calculateActiveSpec(lampId) {
    const base = R148_DATABASE[lampId];
    if(!base) return null;
    
    let spec = { ...base };
    
    // 1. D-Lamp intensity halving (max intensity only)
    if(uiState.dLampEnabled && spec.maxIntensityD !== "N.A.") {
        spec.activeMax = spec.maxIntensityD;
    } else {
        spec.activeMax = spec.maxIntensitySingle;
    }
    
    // 2. Mounting height vertical angle reductions
    // E.g., standard vertical downward (below) is reduced to 5° if h < 750 mm
    if(uiState.mountingHeight < 750) {
        // Except for specific lamps that already have smaller angles or unique requirements
        if(spec.vertBelow > 5) {
            spec.activeVertBelow = 5;
            spec.isHeightReduced = true;
        } else {
            spec.activeVertBelow = spec.vertBelow;
            spec.isHeightReduced = false;
        }
    } else {
        spec.activeVertBelow = spec.vertBelow;
        spec.isHeightReduced = false;
    }
    
    // 3. Mounting height vertical upward reductions for high installed lamps (> 2100mm)
    if(uiState.mountingHeight > 2100 && ["AM", "RM1", "RM2"].includes(lampId)) {
        spec.activeVertAbove = 5;
        spec.isHeightAboveReduced = true;
    } else {
        spec.activeVertAbove = spec.vertAbove;
        spec.isHeightAboveReduced = false;
    }
    
    // Copy active vertical above
    if(spec.activeVertAbove === undefined) {
        spec.activeVertAbove = spec.vertAbove;
    }
    
    return spec;
}

// Get D-Lamp / Y-Lamp compatibility and explanatory text for current selected lamp
function getDYCompatibilityInfo(lampId, lamp) {
    let dStatus = "";
    let yStatus = "";

    // D-Lamp compatibility
    const dUnsupported = ["MA", "MR", "MS", "5", "6", "SM1", "SM2", "77R_F", "77R_R"];
    const isDUnsupported = dUnsupported.includes(lampId) || dUnsupported.includes(lamp.symbol);

    if (isDUnsupported) {
        if (["MA", "MR", "MS"].includes(lampId)) {
            dStatus = `<span style="color:var(--danger); font-weight:600;">🔴 D類燈 (雙燈組合): 不適用</span> (機車 L 類車輛法規無 D 類雙燈宣告)`;
        } else if (["5", "6"].includes(lampId)) {
            dStatus = `<span style="color:var(--danger); font-weight:600;">🔴 D類燈 (雙燈組合): 不適用</span> (側方向指示燈無 D 類雙燈宣告)`;
        } else if (["SM1", "SM2"].includes(lampId)) {
            dStatus = `<span style="color:var(--danger); font-weight:600;">🔴 D類燈 (雙燈組合): 不適用</span> (側標誌燈無 D 類雙燈宣告)`;
        } else if (["77R_F", "77R_R"].includes(lampId)) {
            dStatus = `<span style="color:var(--danger); font-weight:600;">🔴 D類燈 (雙燈組合): 不適用</span> (駐車燈無 D 類雙燈宣告)`;
        } else {
            dStatus = `<span style="color:var(--danger); font-weight:600;">🔴 D類燈 (雙燈組合): 不適用</span>`;
        }
    } else {
        dStatus = `<span style="color:var(--success); font-weight:600;">🟢 D類燈 (雙燈組合): 適用</span> (單個 D 燈具最大光度限制減半為 ${lamp.maxIntensityD} cd，且其中一燈失效時，另一燈仍須能滿足 100% 最小強度)`;
    }

    // Y-Lamp compatibility
    const yUnsupported = ["MA", "MR", "MS", "5", "6", "SM1", "SM2", "77R_F", "77R_R", "AM", "RM1", "RM2"];
    const isYUnsupported = yUnsupported.includes(lampId) || yUnsupported.includes(lamp.symbol);

    if (isYUnsupported) {
        if (["MA", "MR", "MS"].includes(lampId)) {
            yStatus = `<span style="color:var(--danger); font-weight:600;">🔴 Y類燈 (相互依賴): 不適用</span> (機車 L 類車輛法規無 Y 類相互依賴定義)`;
        } else if (["5", "6"].includes(lampId)) {
            yStatus = `<span style="color:var(--danger); font-weight:600;">🔴 Y類燈 (相互依賴): 不適用</span> (側方向指示燈無 Y 類相互依賴定義)`;
        } else if (["SM1", "SM2"].includes(lampId)) {
            yStatus = `<span style="color:var(--danger); font-weight:600;">🔴 Y類燈 (相互依賴): 不適用</span> (側標誌燈無 Y 類相互依賴定義)`;
        } else if (["77R_F", "77R_R"].includes(lampId)) {
            yStatus = `<span style="color:var(--danger); font-weight:600;">🔴 Y類燈 (相互依賴): 不適用</span> (駐車燈無 Y 類相互依賴定義)`;
        } else if (["AM", "RM1", "RM2"].includes(lampId)) {
            yStatus = `<span style="color:var(--danger); font-weight:600;">🔴 Y類燈 (相互依賴): 不適用</span> (端部輪廓邊界燈須位於車身極外側，不可作分散式 Y 燈)`;
        } else {
            yStatus = `<span style="color:var(--danger); font-weight:600;">🔴 Y類燈 (相互依賴): 不適用</span>`;
        }
    } else {
        if (["R1", "R2", "S1", "S2"].includes(lampId)) {
            yStatus = `<span style="color:var(--success); font-weight:600;">🟢 Y類燈 (相互依賴): 適用</span> (極常見於尾門與車身分立的貫穿式尾燈/煞車燈系統，全系統各單元點亮/熄滅須同步連動)`;
        } else if (["2a", "2b"].includes(lampId)) {
            yStatus = `<span style="color:var(--success); font-weight:600;">🟢 Y類燈 (相互依賴): 適用</span> (可用於流水/分段式後方向指示燈，各單元須同步連動且總光強符合上限)`;
        } else {
            yStatus = `<span style="color:var(--success); font-weight:600;">🟢 Y類燈 (相互依賴): 適用</span> (全系統各單元點亮/熄滅須同步連動，總光學強度須小於單一燈具之最大上限)`;
        }
    }

    return `<div style="display:flex; flex-direction:column; gap:6px; font-size:0.82rem; font-weight:normal; line-height:1.4;">
        <div>${dStatus}</div>
        <div>${yStatus}</div>
    </div>`;
}

// Get Apparent Surface Area requirements and advice
function getApparentSurfaceInfo(lampId, lamp) {
    const symbol = lamp.symbol || lampId;
    
    // 1. Daytime Running Lamp (DRL, Cat RL) -> 25 cm²
    if (symbol === "RL") {
        return {
            area: "≧ 25.0 cm²",
            advisory: "🟢 <strong style='color:var(--success);'>符合日間行車燈 (DRL) 法規要求：</strong>R148 規定單一 DRL 燈具之發光視表面投影面積不得低於 <strong>25.0 cm²</strong>。CAD 設計時，強烈建議預留 <strong>28.0 cm²</strong> 以上之安全設計安全裕度，防杜生產公差導致合規判定爭議。"
        };
    }
    
    // 2. Standard Signaling Lamps -> 12.5 cm²
    const requiresMinArea12_5 = ["A", "AM", "R1", "R2", "RM1", "RM2", "S1", "S2", "S4", "1", "1a", "1b", "2a", "2b"];
    if (requiresMinArea12_5.includes(lampId) || requiresMinArea12_5.includes(symbol)) {
        return {
            area: "≧ 12.5 cm²",
            advisory: "🟢 <strong style='color:var(--success);'>符合法規標準面積：</strong>本款車燈投影面積不得低於 12.5 cm²（若為 D 類相互依賴燈具系統，各燈具之總和面積須滿足此要求）。進行 CAD 光學投影設計時，建議至少預留 <strong>15.0 cm²</strong> 以上設計安全裕度，防止射出件公差或組裝公差造成量測不合規。"
        };
    }
    
    // 3. Exempt Lamps
    let advText = "";
    if (["MA", "MR", "MS"].includes(lampId) || ["MA", "MR", "MS"].includes(symbol)) {
        advText = "🟡 <strong style='color:var(--warning);'>機車法規豁免：</strong>L 類二輪機車燈具在 R148 中無特定之視表面積限制，但光學設計仍須嚴格滿足配光光度與 80°/20° 能見度角度要求。";
    } else if (lampId === "S3" || symbol === "S3") {
        advText = "🟡 <strong style='color:var(--warning);'>中高置煞車燈豁免：</strong>第三煞車燈（S3）主要著重於車身中心安裝與幾何角度限制，法規無最小投影面積 12.5 cm² 的硬性規定。";
    } else if (["5", "6"].includes(lampId) || ["5", "6"].includes(symbol)) {
        advText = "🟡 <strong style='color:var(--warning);'>側向方向燈豁免：</strong>側方向指示燈無發光投影面積之最小限制，主要以極限側向能見度（特別是機車與自行車防撞角）之光度覆蓋為首要設計焦點。";
    } else if (["SM1", "SM2"].includes(lampId) || ["SM1", "SM2"].includes(symbol)) {
        advText = "🟡 <strong style='color:var(--warning);'>側邊標誌燈豁免：</strong>側邊標誌燈無最小投影發光表面積限制，但設計時應確保與車體輪廓整合後的側向光強符合法規上限。";
    } else if (["77R_F", "77R_R"].includes(lampId) || ["77R_F", "77R_R"].includes(symbol)) {
        advText = "🟡 <strong style='color:var(--warning);'>駐車燈豁免：</strong>駐車燈無最少投影面積限制，其功能一般容許由前後位置燈在駐車模式下以較低光度啟動共用。";
    } else if (["F1", "F2"].includes(lampId) || ["F1", "F2"].includes(symbol)) {
        advText = "🟡 <strong style='color:var(--warning);'>後霧燈法規豁免：</strong>R148 中後霧燈無發光視表面積之最小限制，但其高強度紅光（最大可達 840 cd）在夜間具高度穿透性，須特別注意配光截止線與可視角度。";
    } else if (lampId === "AR" || symbol === "AR") {
        advText = "🟡 <strong style='color:var(--warning);'>倒車燈法規豁免：</strong>倒車燈（AR）無最少投影面積要求，主要著重於向後方及兩側之照明覆蓋與眩光防制。";
    } else {
        advText = "🟡 <strong style='color:var(--warning);'>法規豁免：</strong>本款燈具在 R148 條款中屬於發光視表面積豁免類別，無最小投影限制，主要著重於指定可視角度內的光學強度覆蓋。";
    }
    
    return {
        area: "無特定限制 (Exempt)",
        advisory: advText
    };
}

// Update UI elements in Detail view (Tab 1)
function updateDashboard() {
    const lamp = calculateActiveSpec(uiState.selectedLamp);
    if(!lamp) return;
    
    // Check D-Lamp compatibility dynamically
    const dUnsupported = ["MA", "MR", "MS", "5", "6", "SM1", "SM2", "77R_F", "77R_R"];
    const isDUnsupported = dUnsupported.includes(uiState.selectedLamp) || dUnsupported.includes(lamp.symbol);
    const dLampToggle = document.getElementById("dLampToggle");
    const dLampToggleWrapper = document.getElementById("dLampToggleWrapper");
    
    if (dLampToggle && dLampToggleWrapper) {
        if (isDUnsupported) {
            uiState.dLampEnabled = false;
            dLampToggle.checked = false;
            dLampToggle.disabled = true;
            dLampToggleWrapper.style.opacity = "0.35";
            dLampToggleWrapper.style.pointerEvents = "none";
            dLampToggleWrapper.title = "本車燈功能依法規無 D-Lamp 雙燈組合定義，禁止啟用";
        } else {
            dLampToggle.disabled = false;
            dLampToggleWrapper.style.opacity = "1";
            dLampToggleWrapper.style.pointerEvents = "auto";
            dLampToggleWrapper.title = "點選啟用/停用 D-Lamp 相互依賴車燈模式";
        }
    }
    
    // Reset spec-main-detail classes
    const detailPanel = document.getElementById("detailPanel");
    if(detailPanel) {
        detailPanel.className = "spec-main-detail";
    }
    
    // Load textual variables
    document.getElementById("lblLampSymbol").innerText = lamp.symbol;
    document.getElementById("lblLampName").innerText = lamp.nameZh;
    document.getElementById("lblLampNameEn").innerText = lamp.nameEn;
    
    // Set color accent class
    let colorAccentClass = "card-white";
    let textAccentClass = "highlight-white";
    if(lamp.color === "Red") { 
        colorAccentClass = "card-red"; 
        textAccentClass = "highlight-red"; 
    } else if(lamp.color === "Amber") { 
        colorAccentClass = "card-amber"; 
        textAccentClass = "highlight-amber"; 
    }
    
    const basicCard = document.getElementById("basicSpecCard");
    if(basicCard) {
        basicCard.className = "spec-card " + colorAccentClass;
    }
    const visCard = document.getElementById("visibilitySpecCard");
    if(visCard) {
        visCard.className = "spec-card card-accent";
    }
    
    // Values loading
    const valColor = document.getElementById("valColor");
    if(valColor) {
        valColor.innerText = lamp.colorZh;
        valColor.className = "val " + textAccentClass;
    }
    
    document.getElementById("valMinCd").innerText = lamp.minIntensity + " cd";
    document.getElementById("valMaxCd").innerText = lamp.activeMax + " cd";
    
    // Highlight if D-lamp enabled
    const dIndicator = document.getElementById("valMaxCdIndicator");
    if(dIndicator) {
        dIndicator.innerText = uiState.dLampEnabled ? "(已套用相互依賴 D 燈具減半)" : "(單一燈具標準值)";
        dIndicator.style.color = uiState.dLampEnabled ? "var(--warning)" : "var(--text-secondary)";
    }
    
    document.getElementById("valTestTime").innerText = lamp.testTime + " 秒";
    document.getElementById("valPhotGrid").innerText = lamp.photometricGrid;
    document.getElementById("valHorizAngle").innerText = `外側 ${lamp.horizOutboard}° / 內側 ${lamp.horizInboard}°`;
    document.getElementById("valVertAngle").innerText = `上方 ${lamp.activeVertAbove}° / 下方 ${lamp.activeVertBelow}°`;
    
    // Update Apparent Surface Info
    const areaEl = document.getElementById("valApparentSurfaceArea");
    const advEl = document.getElementById("valApparentSurfaceAdvisory");
    if(areaEl && advEl) {
        const asInfo = getApparentSurfaceInfo(uiState.selectedLamp, lamp);
        areaEl.innerHTML = asInfo.area;
        advEl.innerHTML = asInfo.advisory;
    }
    
    // Update Photometric Grid Title
    const gridTitleEl = document.getElementById("gridLampTitle");
    if(gridTitleEl) {
        gridTitleEl.innerText = lamp.symbol;
    }
    
    // Dynamic footnotes
    let footnotes = lamp.notesZh;
    if(uiState.dLampEnabled && lamp.maxIntensityD === "N.A.") {
        footnotes += " ❌ 【注意】本款燈具在此設定下無相互依賴(D)版本分類，最大上限比照單一燈具。";
    }
    document.getElementById("valNotes").innerHTML = footnotes;
    
    // Update D/Y compatibility status in Basic Specs
    const compEl = document.getElementById("valDYCompatibility");
    if(compEl) {
        compEl.innerHTML = getDYCompatibilityInfo(uiState.selectedLamp, lamp);
    }
    
    // Render SVGs
    drawSVGConeVisuals(lamp);
    drawPhotometricWeightGrid(lamp);
}

// Helpers to generate beautifully stylized vector cars for the visibility visualizer
function getTopDownCarSVG(category, colorHex) {
    let dx = 140;
    let dy = 140;
    let showHeadlights = false;
    let showTaillights = false;
    
    if (category === "front") {
        dx = 163;
        dy = 184;
        showHeadlights = true;
    } else if (category === "rear") {
        dx = 163;
        dy = 96;
        showTaillights = true;
    } else if (category === "side") {
        dx = 163; // Centered properly
        dy = 140;
        showHeadlights = true;
        showTaillights = true;
    } else { // other / central rear (CHMSL)
        dx = 140;
        dy = 96;
        showTaillights = true;
    }

    const headlightGlow = showHeadlights ? `
        <!-- Headlight Beam Glows -->
        <polygon points="-23,-44 -50,-95 5,-95" fill="url(#headlightBeam)" opacity="0.3"/>
        <polygon points="23,-44 -5,-95 50,-95" fill="url(#headlightBeam)" opacity="0.3"/>
        <circle cx="-23" cy="-44" r="6" fill="#38bdf8" filter="blur(2.5px)"/>
        <circle cx="23" cy="-44" r="6" fill="#38bdf8" filter="blur(2.5px)"/>
    ` : "";

    const taillightGlow = showTaillights ? `
        <!-- Taillight Beam Glows -->
        <polygon points="-23,44 -38,85 -8,85" fill="url(#taillightBeam)" opacity="0.25"/>
        <polygon points="23,44 8,85 38,85" fill="url(#taillightBeam)" opacity="0.25"/>
        <circle cx="-23" cy="44" r="5" fill="#ef4444" filter="blur(2px)"/>
        <circle cx="23" cy="44" r="5" fill="#ef4444" filter="blur(2px)"/>
    ` : "";

    const activeX = (category === "other") ? 0 : -23;
    const activeY = (category === "front") ? -44 : ((category === "side") ? 0 : 44);

    // High-contrast hood and trunk directional badges to make front/rear orientation 100% obvious at a single glance
    const topDownFrontBadge = `
        <g transform="translate(0, -32)">
            <rect x="-16" y="-4" width="32" height="8" rx="2" fill="rgba(7, 10, 19, 0.95)" stroke="#38bdf8" stroke-width="1"/>
            <text x="0" y="2" fill="#38bdf8" font-size="5.5" font-weight="900" text-anchor="middle" font-family="Outfit, system-ui, sans-serif" letter-spacing="0.08em">▲ FRONT</text>
        </g>
    `;

    const topDownRearBadge = `
        <g transform="translate(0, 34)">
            <rect x="-16" y="-4" width="32" height="8" rx="2" fill="rgba(7, 10, 19, 0.95)" stroke="#ef4444" stroke-width="1"/>
            <text x="0" y="2" fill="#ef4444" font-size="5.5" font-weight="900" text-anchor="middle" font-family="Outfit, system-ui, sans-serif" letter-spacing="0.08em">▼ REAR</text>
        </g>
    `;

    return `
        <g transform="translate(${dx}, ${dy})">
            <!-- Wheels with detailed tire treads and alloy rim highlights -->
            <g>
                <!-- Front-Left Wheel -->
                <g transform="translate(-26, -24.5)">
                    <rect x="-3" y="-7.5" width="6" height="15" rx="2" fill="#090d16" stroke="rgba(255,255,255,0.15)" stroke-width="0.5"/>
                    <line x1="-3" y1="-4" x2="3" y2="-4" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/>
                    <line x1="-3" y1="0" x2="3" y2="0" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/>
                    <line x1="-3" y1="4" x2="3" y2="4" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/>
                    <rect x="-1" y="-5" width="2" height="10" rx="0.5" fill="#38bdf8" opacity="0.6"/>
                </g>
                <!-- Front-Right Wheel -->
                <g transform="translate(26, -24.5)">
                    <rect x="-3" y="-7.5" width="6" height="15" rx="2" fill="#090d16" stroke="rgba(255,255,255,0.15)" stroke-width="0.5"/>
                    <line x1="-3" y1="-4" x2="3" y2="-4" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/>
                    <line x1="-3" y1="0" x2="3" y2="0" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/>
                    <line x1="-3" y1="4" x2="3" y2="4" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/>
                    <rect x="-1" y="-5" width="2" height="10" rx="0.5" fill="#38bdf8" opacity="0.6"/>
                </g>
                <!-- Rear-Left Wheel -->
                <g transform="translate(-27, 24.5)">
                    <rect x="-3" y="-7.5" width="6" height="15" rx="2" fill="#090d16" stroke="rgba(255,255,255,0.15)" stroke-width="0.5"/>
                    <line x1="-3" y1="-4" x2="3" y2="-4" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/>
                    <line x1="-3" y1="0" x2="3" y2="0" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/>
                    <line x1="-3" y1="4" x2="3" y2="4" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/>
                    <rect x="-1" y="-5" width="2" height="10" rx="0.5" fill="#ef4444" opacity="0.6"/>
                </g>
                <!-- Rear-Right Wheel -->
                <g transform="translate(27, 24.5)">
                    <rect x="-3" y="-7.5" width="6" height="15" rx="2" fill="#090d16" stroke="rgba(255,255,255,0.15)" stroke-width="0.5"/>
                    <line x1="-3" y1="-4" x2="3" y2="-4" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/>
                    <line x1="-3" y1="0" x2="3" y2="0" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/>
                    <line x1="-3" y1="4" x2="3" y2="4" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/>
                    <rect x="-1" y="-5" width="2" height="10" rx="0.5" fill="#ef4444" opacity="0.6"/>
                </g>
            </g>
            
            <!-- Sleek Aero Side Mirrors with Glossy Fill -->
            <path d="M -25 -17 C -31 -17, -32 -13, -25 -10 Z" fill="url(#carBodyGrd)" stroke="#38bdf8" stroke-width="0.8"/>
            <path d="M 25 -17 C 31 -17, 32 -13, 25 -10 Z" fill="url(#carBodyGrd)" stroke="#38bdf8" stroke-width="0.8"/>

            <!-- Main Body Shadow -->
            <rect x="-26" y="-46" width="52" height="92" rx="14" fill="rgba(0,0,0,0.65)" filter="blur(5px)"/>

            <!-- Tapered Sporty Asymmetric Main Body Outline (Porsche style) -->
            <path d="M 0 -48
                     C 5 -48, 9 -46, 12 -42
                     C 15 -38, 16 -32, 17 -26
                     C 17 -16, 16 -8, 16 0
                     C 16 8, 20 16, 24 24
                     C 25 28, 25 36, 24 40
                     C 23 44, 18 45, 0 45
                     C -18 45, -23 44, -24 40
                     C -25 36, -25 28, -24 24
                     C -20 16, -16 8, -16 0
                     C -16 -8, -17 -16, -17 -26
                     C -16 -32, -15 -38, -12 -42
                     C -9 -46, -5 -48, 0 -48 Z" 
                  fill="url(#carBodyGrd)" stroke="url(#carStrokeGrd)" stroke-width="1.8"/>

            <!-- Sporty Front Grille / Air Intake -->
            <path d="M -12 -45 C -6 -46, 6 -46, 12 -45 L 8 -41 L -8 -41 Z" fill="#090d16" stroke="rgba(255,255,255,0.15)" stroke-width="0.8"/>
            <line x1="-12" y1="-43" x2="12" y2="-43" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/>

            <!-- Front Hood Muscular Contour Lines -->
            <path d="M -12 -41 C -10 -28, -7 -22, -7 -18 M 12 -41 C 10 -28, 7 -22, 7 -18" stroke="rgba(255,255,255,0.15)" stroke-width="1" fill="none"/>
            
            <!-- Glass Windshield (Aggressive forward-curving shape with reflection line) -->
            <path d="M -16 -17 C -16 -22, -9 -24, 0 -24 C 9 -24, 16 -22, 16 -17 L 14 -7 C 14 -7, 8 -10, 0 -10 C -8 -10, -14 -7, -14 -7 Z" 
                  fill="url(#cabinGlassGrd)" stroke="rgba(56, 189, 248, 0.55)" stroke-width="1.2"/>
            <path d="M -10 -22 L 5 -12" stroke="rgba(255, 255, 255, 0.25)" stroke-width="1.5" stroke-linecap="round"/>

            <!-- Cabin Roof with forward-pointing neon chevrons -->
            <path d="M -14 -7 L 14 -7 C 14 -7, 12 15, 12 19 L -12 19 C -12 19, -14 15, -14 -7 Z" 
                  fill="rgba(255, 255, 255, 0.03)" stroke="rgba(255,255,255,0.08)" stroke-width="0.8"/>

            <!-- Cabin ambient glow -->
            <rect x="-14" y="-7" width="28" height="26" rx="4" fill="rgba(56, 189, 248, 0.02)" stroke="none"/>

            <!-- Interior Cabin Details (Faint outline of seats and glowing steering wheel) -->
            <g opacity="0.75">
                <!-- Dashboard line -->
                <path d="M -15 -18 C -8 -20, 8 -20, 15 -18" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="1"/>
                <!-- Glowing steering wheel (Front-Left) -->
                <circle cx="-9" cy="-14" r="3.5" fill="none" stroke="#38bdf8" stroke-width="1.2" filter="drop-shadow(0 0 1px #38bdf8)"/>
                <line x1="-9" y1="-14" x2="-9" y2="-10.5" stroke="#38bdf8" stroke-width="0.8"/>
                <!-- Driver seat -->
                <rect x="-16" y="-3" width="9" height="11" rx="2.5" fill="rgba(56, 189, 248, 0.05)" stroke="rgba(56, 189, 248, 0.3)" stroke-width="0.8"/>
                <rect x="-13.5" y="-6" width="4" height="2.5" rx="0.8" fill="rgba(56, 189, 248, 0.05)" stroke="rgba(56, 189, 248, 0.3)" stroke-width="0.8"/>
                <!-- Passenger seat -->
                <rect x="7" y="-3" width="9" height="11" rx="2.5" fill="rgba(56, 189, 248, 0.05)" stroke="rgba(56, 189, 248, 0.3)" stroke-width="0.8"/>
                <rect x="9.5" y="-6" width="4" height="2.5" rx="0.8" fill="rgba(56, 189, 248, 0.05)" stroke="rgba(56, 189, 248, 0.3)" stroke-width="0.8"/>
            </g>

            <!-- Centered Sleek Roof Arrow pointing to the Front (UP) -->
            <path d="M 0 -19 L 0 8" stroke="#38bdf8" stroke-width="1.5" opacity="0.35" stroke-linecap="round" fill="none"/>
            <path d="M -4 -13 L 0 -19 L 4 -13" stroke="#38bdf8" stroke-width="1.5" opacity="0.35" stroke-linecap="round" stroke-linejoin="round" fill="none"/>

            <!-- Rear Window Glass with reflection line -->
            <path d="M -12 19 C -12 22, -7 24, 0 24 C 7 24, 12 22, 12 19 L 13 22 C 13 22, 7 25, 0 25 C -7 25, -13 22, -13 22 Z" 
                  fill="url(#cabinGlassGrd)" stroke="rgba(56, 189, 248, 0.45)" stroke-width="1"/>
            <path d="M -6 21 L 4 23" stroke="rgba(255, 255, 255, 0.18)" stroke-width="1" stroke-linecap="round"/>

            <!-- Sporty Rear Spoiler Lip -->
            <path d="M -21 42 L -23 44 C -12 45.2, 12 45.2, 23 44 L 21 42 Z" fill="#090d16" stroke="rgba(255,255,255,0.2)" stroke-width="0.8"/>

            <!-- Directional Chevrons pointing to the Front (UP) inside Cabin -->
            <g opacity="0.55" stroke="#38bdf8" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" transform="translate(0, 4)">
                <path d="M -6 4 L 0 -2 L 6 4" />
                <path d="M -6 -4 L 0 -10 L 6 -4" />
                <animate attributeName="opacity" values="0.35;0.85;0.35" dur="2s" repeatCount="indefinite" />
            </g>

            <!-- Futuristic Sleek L-shaped Headlights (White/Blue) -->
            <path d="M -23 -39 C -23 -44, -18 -44, -14 -43 L -13 -39" fill="none" stroke="#e0f2fe" stroke-width="2.5" filter="blur(0.5px)"/>
            <path d="M 23 -39 C 23 -44, 18 -44, 14 -43 L 13 -39" fill="none" stroke="#e0f2fe" stroke-width="2.5" filter="blur(0.5px)"/>
            <path d="M -23 -39 C -23 -44, -18 -44, -14 -43 L -13 -39" fill="none" stroke="#38bdf8" stroke-width="1" opacity="0.85"/>
            <path d="M 23 -39 C 23 -44, 18 -44, 14 -43 L 13 -39" fill="none" stroke="#38bdf8" stroke-width="1" opacity="0.85"/>
            <!-- Front Light Bar connecting headlights -->
            <path d="M -13 -43 Q 0 -45, 13 -43" fill="none" stroke="#38bdf8" stroke-width="1.2" opacity="0.5"/>
            <path d="M -13 -43 Q 0 -45, 13 -43" fill="none" stroke="#ffffff" stroke-width="0.6" opacity="0.8"/>

            <!-- Futuristic Glowing Red Taillight Bar (Across entire rear) -->
            <path d="M -23 43 C -10 44.5, 10 44.5, 23 43" fill="none" stroke="#ef4444" stroke-width="2.2" opacity="0.95" filter="blur(0.5px)"/>
            <path d="M -23 43 C -10 44.5, 10 44.5, 23 43" fill="none" stroke="#f87171" stroke-width="1" opacity="0.9"/>
            <circle cx="-23" cy="43" r="1.5" fill="#ffffff"/>
            <circle cx="23" cy="43" r="1.5" fill="#ffffff"/>

            ${headlightGlow}
            ${taillightGlow}
            
            <!-- High-end Hood and Trunk Direction Badges -->
            ${topDownFrontBadge}
            ${topDownRearBadge}
            
            <!-- Active Node Indicator Ring -->
            <circle cx="${activeX}" cy="${activeY}" r="7" fill="none" stroke="${colorHex}" stroke-width="1.5" stroke-dasharray="2,2">
                <animate attributeName="stroke-dashoffset" values="0;12" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="${activeX}" cy="${activeY}" r="3.5" fill="${colorHex}"/>
        </g>
    `;
}

function getSideViewCarSVG(category, colorHex, dy) {
    let dx = 94; 
    let flipX = 1; 
    let showHeadlight = false;
    let showTaillight = false;
    
    if (category === "front") {
        dx = 94; 
        flipX = 1; // Faces right
        showHeadlight = true;
    } else if (category === "rear") {
        dx = 94; // Align correctly at 140: 94 - (-46) = 140
        flipX = -1; // Faces left
        showTaillight = true;
    } else if (category === "side") {
        dx = 140; // Align correctly at 140: 140 + 0 = 140
        flipX = 1; 
        showHeadlight = true;
        showTaillight = true;
    } else { // other / CHMSL
        dx = 100; // Align correctly at 140: 100 - (-40) = 140
        flipX = -1; // CHMSL at rear top facing left
        showTaillight = true;
    }

    const headlightGlow = showHeadlight ? `
        <!-- Side Headlight Glow -->
        <polygon points="46,-16 95,-35 95,5" fill="url(#sideLightBeam)" opacity="0.22"/>
        <circle cx="46" cy="-16" r="4.5" fill="#38bdf8" filter="blur(1.5px)"/>
    ` : "";

    const taillightGlow = showTaillight ? `
        <!-- Side Taillight Glow -->
        <polygon points="-46,-18 -95,-30 -95,0" fill="url(#taillightBeam)" opacity="0.18"/>
        <circle cx="-46" cy="-18" r="3.5" fill="#ef4444" filter="blur(1.5px)"/>
    ` : "";

    const activeNodeY = (category === "other") ? -36 : ((category === "front") ? -16 : ((category === "side") ? -12 : -18));
    const activeNodeX = (category === "other") ? -40 : ((category === "front") ? 46 : ((category === "side") ? 0 : -46));

    // Dynamic un-flipped direction indicators based on flipX direction to avoid mirrored text, placed in dynamic badges
    const directionBadge = flipX === 1 ? `
        <g transform="scale(${flipX}, 1) translate(0, -28)">
            <rect x="-18" y="-5" width="36" height="10" rx="3" fill="rgba(7, 10, 19, 0.95)" stroke="#38bdf8" stroke-width="1.2"/>
            <text x="0" y="2" fill="#38bdf8" font-size="6" font-weight="900" text-anchor="middle" font-family="Outfit, system-ui, sans-serif" letter-spacing="0.05em">FRONT ➔</text>
        </g>
    ` : `
        <g transform="scale(${flipX}, 1) translate(0, -28)">
            <rect x="-18" y="-5" width="36" height="10" rx="3" fill="rgba(7, 10, 19, 0.95)" stroke="#38bdf8" stroke-width="1.2"/>
            <text x="0" y="2" fill="#38bdf8" font-size="6" font-weight="900" text-anchor="middle" font-family="Outfit, system-ui, sans-serif" letter-spacing="0.05em">◀ FRONT</text>
        </g>
    `;

    return `
        <g transform="translate(${dx}, ${dy}) scale(${flipX}, 1)">
            <!-- Car shadow underbody -->
            <ellipse cx="0" cy="11.5" rx="56" ry="3" fill="rgba(0,0,0,0.65)" filter="blur(2.5px)"/>

            <!-- Wheels with High-end Alloy Rims and red brake calipers -->
            <g transform="translate(-30, 0)">
                <circle cx="0" cy="0" r="12" fill="#090d16" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
                <!-- High-contrast sporty red caliper -->
                <path d="M -6 -6 A 8 8 0 0 1 -2 8" fill="none" stroke="#ef4444" stroke-width="2.2" stroke-linecap="round"/>
                <circle cx="0" cy="0" r="10" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="0.8"/>
                <line x1="-10" y1="0" x2="10" y2="0" stroke="rgba(255,255,255,0.35)" stroke-width="0.8"/>
                <line x1="0" y1="-10" x2="0" y2="10" stroke="rgba(255,255,255,0.35)" stroke-width="0.8"/>
                <line x1="-7" y1="-7" x2="7" y2="7" stroke="rgba(255,255,255,0.2)" stroke-width="0.8"/>
                <line x1="7" y1="-7" x2="-7" y2="7" stroke="rgba(255,255,255,0.2)" stroke-width="0.8"/>
                <circle cx="0" cy="0" r="4.5" fill="#1e293b" stroke="rgba(255,255,255,0.3)" stroke-width="0.5"/>
            </g>
            <g transform="translate(30, 0)">
                <circle cx="0" cy="0" r="12" fill="#090d16" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
                <!-- High-contrast sporty red caliper -->
                <path d="M -6 -6 A 8 8 0 0 1 -2 8" fill="none" stroke="#ef4444" stroke-width="2.2" stroke-linecap="round"/>
                <circle cx="0" cy="0" r="10" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="0.8"/>
                <line x1="-10" y1="0" x2="10" y2="0" stroke="rgba(255,255,255,0.35)" stroke-width="0.8"/>
                <line x1="0" y1="-10" x2="0" y2="10" stroke="rgba(255,255,255,0.35)" stroke-width="0.8"/>
                <line x1="-7" y1="-7" x2="7" y2="7" stroke="rgba(255,255,255,0.2)" stroke-width="0.8"/>
                <line x1="7" y1="-7" x2="-7" y2="7" stroke="rgba(255,255,255,0.2)" stroke-width="0.8"/>
                <circle cx="0" cy="0" r="4.5" fill="#1e293b" stroke="rgba(255,255,255,0.3)" stroke-width="0.5"/>
            </g>

            <!-- Wheel Arches (Fenders) -->
            <path d="M -43 -14 A 13 13 0 0 1 -17 -14" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
            <path d="M 17 -14 A 13 13 0 0 1 43 -14" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>

            <!-- Asymmetric Coupe Body Backing Fill -->
            <path d="M -52 4 
                     L -52 -14 
                     C -48 -16, -44 -16, -42 -16 
                     C -34 -30, -26 -35, -12 -35 
                     L 8 -35 
                     C 22 -35, 32 -25, 38 -12 
                     L 52 -10 
                     L 52 -14 
                     L 52 4 
                     L 43 4 
                     L 43 -14 
                     A 13 13 0 0 0 17 -14 
                     L -17 -14 
                     A 13 13 0 0 0 -43 -14 
                     L -52 -14 
                     Z" 
                  fill="url(#carBodyGrd)" stroke="none"/>
            
            <!-- Chassis / Sleek Lower Body Profile (Asymmetric EV stance) -->
            <path d="M -52 4 
                     L -52 -14 
                     L -43 -14
                     M -17 -14
                     L 17 -14
                     M 43 -14
                     L 52 -14
                     L 52 4" 
                  fill="none" stroke="url(#carSideStrokeGrd)" stroke-width="1.8"/>

            <!-- Upper Body Coupe roofline (Asymmetric Aerodynamic Profile - Perfectly Continuous) -->
            <path d="M -52 -14 
                     C -48 -16, -44 -16, -42 -16 
                     C -34 -30, -26 -35, -12 -35 
                     L 8 -35 
                     C 22 -35, 32 -25, 38 -12 
                     L 52 -10 
                     L 52 -14" 
                  fill="none" stroke="url(#carSideStrokeGrd)" stroke-width="1.8"/>
            
            <!-- Sleek Asymmetric Side Window Glass -->
            <path d="M -20 -17 
                     L 24 -17 
                     C 26 -21, 25 -25, 20 -28 
                     L 6 -28 
                     C -4 -30, -14 -30, -20 -24 
                     Z" 
                  fill="url(#cabinGlassGrd)" stroke="rgba(56, 189, 248, 0.45)" stroke-width="1.2"/>
            
            <!-- B-Pillar highlight -->
            <line x1="2" y1="-17" x2="2" y2="-30" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>

            <!-- Faint Interior Cabin Details in Side View -->
            <g opacity="0.65" transform="translate(0, 0)">
                <!-- Steering wheel (Right side, facing forward) -->
                <circle cx="21" cy="-21" r="3" fill="none" stroke="#38bdf8" stroke-width="0.8"/>
                <line x1="21" y1="-21" x2="19" y2="-18" stroke="#38bdf8" stroke-width="0.6"/>
                <!-- Driver Seat (facing forward) -->
                <path d="M 5 -17 L 8 -26 C 8 -27, 7 -28, 5 -28" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="0.8"/>
                <rect x="4" y="-17" width="6" height="2" rx="0.5" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="0.8"/>
                <!-- Passenger Seat (facing forward, slightly offset) -->
                <path d="M -7 -17 L -4 -26 C -4 -27, -5 -28, -7 -28" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="0.8" opacity="0.7"/>
                <rect x="-8" y="-17" width="6" height="2" rx="0.5" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="0.8" opacity="0.7"/>
            </g>

            <!-- Door Cut Line, Sporty Creases, Carbon Side Skirt & Door Handle -->
            <path d="M -12 -14 L -12 -5 M 12 -14 L 12 -5" stroke="rgba(255,255,255,0.1)" stroke-width="0.8"/>
            <path d="M -22 -6 L 22 -6" stroke="rgba(255,255,255,0.08)" stroke-width="0.8"/>
            <!-- Carbon Side Skirt -->
            <rect x="-17" y="-2.5" width="34" height="2.5" fill="#090d16" stroke="rgba(255,255,255,0.15)" stroke-width="0.5"/>
            <!-- Glossy Door Handle -->
            <rect x="-6" y="-11" width="4" height="1.2" rx="0.5" fill="#38bdf8" opacity="0.8"/>

            <!-- Directional Chevrons pointing to the Front (Right side locally) -->
            <g opacity="0.55" stroke="#38bdf8" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" transform="translate(0, -42)">
                <path d="M -5 -3 L 1 0 L -5 3" />
                <path d="M -11 -3 L -5 0 L -11 3" />
                <animate attributeName="opacity" values="0.35;0.85;0.35" dur="2s" repeatCount="indefinite" />
            </g>

            <!-- Permanent Headlight Glow (Right side) -->
            <path d="M 45 -15 C 48 -15, 50 -12, 47 -8" fill="none" stroke="#38bdf8" stroke-width="2.5" opacity="0.9" filter="blur(0.5px)"/>
            <path d="M 45 -15 C 48 -15, 50 -12, 47 -8" fill="none" stroke="#e0f2fe" stroke-width="1.2" opacity="0.95"/>
            <circle cx="47" cy="-12" r="1.5" fill="#ffffff" filter="blur(0.2px)"/>

            <!-- Permanent Taillight Glow (Left side) -->
            <path d="M -48 -17 C -51 -17, -52 -13, -50 -9" fill="none" stroke="#ef4444" stroke-width="2.5" opacity="0.95" filter="blur(0.5px)"/>
            <path d="M -48 -17 C -51 -17, -52 -13, -50 -9" fill="none" stroke="#f87171" stroke-width="1.2" opacity="0.9"/>
            <circle cx="-49" cy="-13" r="1" fill="#ff8585"/>

            ${headlightGlow}
            ${taillightGlow}
            
            <!-- Dynamic Dashboard Direction Badge (inside Cabin window to prevent flipping text) -->
            ${directionBadge}
            
            <!-- Active Node Ring indicator -->
            <circle cx="${activeNodeX}" cy="${activeNodeY}" r="6" fill="none" stroke="${colorHex}" stroke-width="1.2" stroke-dasharray="2,2">
                <animate attributeName="stroke-dashoffset" values="0;8" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="${activeNodeX}" cy="${activeNodeY}" r="2.5" fill="${colorHex}"/>
        </g>
    `;
}


// Draw dynamic Horiz / Vert visibility fields using SVG
function drawSVGConeVisuals(lamp) {
    const colorHex = lamp.color === "Red" ? "#ef4444" : (lamp.color === "Amber" ? "#f59e0b" : "#f8fafc");
    const glowHex = lamp.color === "Red" ? "rgba(239, 68, 68, 0.25)" : (lamp.color === "Amber" ? "rgba(245, 158, 11, 0.25)" : "rgba(255, 255, 255, 0.2)");
    
    // Resolve dynamic category for visualization placement
    let category = getLampCategory(uiState.selectedLamp, lamp);
    if (uiState.selectedLamp === "S3" || uiState.selectedLamp === "S4") {
        category = "other"; // CHMSL high mounted
    }

    // 1. Horizontal View (Top down car outline)
    const horizSvg = document.getElementById("horizSvgContainer");
    if(horizSvg) {
        const outDeg = lamp.horizOutboard;
        const inDeg = lamp.horizInboard;
        
        // Draw standard horizontal cone dynamically based on lamp category
        let startRad = 0;
        let endRad = 0;
        if (category === "front") {
            startRad = (270 - outDeg) * Math.PI / 180;
            endRad = (270 + inDeg) * Math.PI / 180;
        } else if (category === "side") {
            startRad = (180 - outDeg) * Math.PI / 180;
            endRad = (180 + inDeg) * Math.PI / 180;
        } else { // rear / other
            startRad = (90 - inDeg) * Math.PI / 180;
            endRad = (90 + outDeg) * Math.PI / 180;
        }
        
        const xStart = 140 + 90 * Math.cos(startRad);
        const yStart = 140 + 90 * Math.sin(startRad);
        const xEnd = 140 + 90 * Math.cos(endRad);
        const yEnd = 140 + 90 * Math.sin(endRad);
        
        const arcFlag = (outDeg + inDeg) > 180 ? 1 : 0;
        const pathData = `M 140 140 L ${xStart} ${yStart} A 90 90 0 ${arcFlag} 1 ${xEnd} ${yEnd} Z`;
        
        const carSVG = getTopDownCarSVG(category, colorHex);
        
        horizSvg.innerHTML = `
            <svg viewBox="0 0 280 280">
                <defs>
                    <linearGradient id="carBodyGrd" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="#1e293b"/>
                        <stop offset="40%" stop-color="#0f172a"/>
                        <stop offset="100%" stop-color="#020617"/>
                    </linearGradient>
                    <linearGradient id="carStrokeGrd" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="#38bdf8" stop-opacity="1"/>
                        <stop offset="35%" stop-color="#38bdf8" stop-opacity="0.8"/>
                        <stop offset="70%" stop-color="rgba(255,255,255,0.4)" stop-opacity="0.4"/>
                        <stop offset="100%" stop-color="#ef4444" stop-opacity="1"/>
                    </linearGradient>
                    <linearGradient id="cabinGlassGrd" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="rgba(14, 165, 233, 0.4)"/>
                        <stop offset="100%" stop-color="rgba(14, 165, 233, 0.05)"/>
                    </linearGradient>
                    <linearGradient id="headlightBeam" x1="0%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" stop-color="rgba(56, 189, 248, 0.3)"/>
                        <stop offset="100%" stop-color="rgba(56, 189, 248, 0)"/>
                    </linearGradient>
                    <linearGradient id="taillightBeam" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="rgba(239, 68, 68, 0.25)"/>
                        <stop offset="100%" stop-color="rgba(239, 68, 68, 0)"/>
                    </linearGradient>
                </defs>

                <!-- Grid circle markers -->
                <circle cx="140" cy="140" r="90" fill="none" stroke="rgba(255,255,255,0.06)" stroke-dasharray="4,4"/>
                <circle cx="140" cy="140" r="50" fill="none" stroke="rgba(255,255,255,0.03)"/>
                
                <!-- Axis lines -->
                <line x1="140" y1="20" x2="140" y2="260" stroke="rgba(255,255,255,0.1)"/>
                <line x1="20" y1="140" x2="260" y2="140" stroke="rgba(255,255,255,0.1)"/>
                
                <!-- Beautiful Top-down car outline shifted dynamically -->
                ${carSVG}
                
                <!-- Glowing Cone -->
                <path d="${pathData}" fill="${glowHex}" stroke="${colorHex}" stroke-width="2.5" />
                
                <!-- High-contrast Glowing HUD Capsules for FRONT, REAR, Left & Right -->
                <g transform="translate(140, 16)">
                    <rect x="-48" y="-10" width="96" height="20" rx="10" fill="rgba(56, 189, 248, 0.08)" stroke="#38bdf8" stroke-width="1.2" />
                    <text x="0" y="4" fill="#38bdf8" font-size="9" font-weight="900" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" letter-spacing="0.06em">▲ 車頭 FRONT</text>
                </g>
                <g transform="translate(140, 264)">
                    <rect x="-48" y="-10" width="96" height="20" rx="10" fill="rgba(239, 68, 68, 0.08)" stroke="#ef4444" stroke-width="1.2" />
                    <text x="0" y="4" fill="#ef4444" font-size="9" font-weight="900" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" letter-spacing="0.06em">▼ 車尾 REAR</text>
                </g>
                <g transform="translate(252, 140)">
                    <rect x="-18" y="-8" width="36" height="16" rx="4" fill="rgba(255, 255, 255, 0.03)" stroke="rgba(255, 255, 255, 0.1)" stroke-width="0.8"/>
                    <text x="0" y="3" fill="var(--text-muted)" font-size="8" font-weight="600" text-anchor="middle">右側</text>
                </g>
                <g transform="translate(28, 140)">
                    <rect x="-18" y="-8" width="36" height="16" rx="4" fill="rgba(255, 255, 255, 0.03)" stroke="rgba(255, 255, 255, 0.1)" stroke-width="0.8"/>
                    <text x="0" y="3" fill="var(--text-muted)" font-size="8" font-weight="600" text-anchor="middle">左側</text>
                </g>
                
                <!-- Value Display Capsule -->
                <rect x="80" y="26" width="120" height="24" rx="12" fill="rgba(7, 10, 19, 0.9)" stroke="rgba(255, 255, 255, 0.15)" stroke-width="1.5" />
                <text x="140" y="42" fill="${colorHex}" font-weight="bold" font-size="12" text-anchor="middle" font-family="Outfit" letter-spacing="0.05em">${outDeg}° / ${inDeg}°</text>
            </svg>
        `;
    }
    
    // 2. Vertical View (Side view car outline)
    const vertSvg = document.getElementById("vertSvgContainer");
    if(vertSvg) {
        const aboveDeg = lamp.activeVertAbove;
        const belowDeg = lamp.activeVertBelow;
        
        // Horizontal is straight right (0 degrees)
        const startRad = (-aboveDeg) * Math.PI / 180;
        const endRad = (belowDeg) * Math.PI / 180;
        
        const xStart = 140 + 90 * Math.cos(startRad);
        const yStart = 140 + 90 * Math.sin(startRad);
        const xEnd = 140 + 90 * Math.cos(endRad);
        const yEnd = 140 + 90 * Math.sin(endRad);
        
        const pathData = `M 140 140 L ${xStart} ${yStart} A 90 90 0 0 1 ${xEnd} ${yEnd} Z`;
        
        // Calculate dynamic heights
        const activeNodeY = (category === "other") ? -36 : ((category === "front") ? -16 : ((category === "side") ? -12 : -18));
        const dy = 140 - activeNodeY;
        const groundY = dy + 12;

        const carSVG = getSideViewCarSVG(category, colorHex, dy);
        const flipX = (category === "front" || category === "side") ? 1 : -1;
        let leftBadgeHTML = "";
        let rightBadgeHTML = "";

        if (flipX === 1) {
            // Left is REAR (Red), Right is FRONT (Cyan)
            leftBadgeHTML = `
                <g transform="translate(48, 264)">
                    <rect x="-38" y="-10" width="76" height="20" rx="10" fill="rgba(239, 68, 68, 0.08)" stroke="#ef4444" stroke-width="1.2" />
                    <text x="0" y="4" fill="#ef4444" font-size="8.5" font-weight="900" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" letter-spacing="0.05em">◀ 車尾 REAR</text>
                </g>
            `;
            rightBadgeHTML = `
                <g transform="translate(232, 264)">
                    <rect x="-38" y="-10" width="76" height="20" rx="10" fill="rgba(56, 189, 248, 0.08)" stroke="#38bdf8" stroke-width="1.2" />
                    <text x="0" y="4" fill="#38bdf8" font-size="8.5" font-weight="900" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" letter-spacing="0.05em">車頭 FRONT ➔</text>
                </g>
            `;
        } else {
            // Left is FRONT (Cyan), Right is REAR (Red)
            leftBadgeHTML = `
                <g transform="translate(48, 264)">
                    <rect x="-38" y="-10" width="76" height="20" rx="10" fill="rgba(56, 189, 248, 0.08)" stroke="#38bdf8" stroke-width="1.2" />
                    <text x="0" y="4" fill="#38bdf8" font-size="8.5" font-weight="900" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" letter-spacing="0.05em">◀ 車頭 FRONT</text>
                </g>
            `;
            rightBadgeHTML = `
                <g transform="translate(232, 264)">
                    <rect x="-38" y="-10" width="76" height="20" rx="10" fill="rgba(239, 68, 68, 0.08)" stroke="#ef4444" stroke-width="1.2" />
                    <text x="0" y="4" fill="#ef4444" font-size="8.5" font-weight="900" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" letter-spacing="0.05em">車尾 REAR ➔</text>
                </g>
            `;
        }

        vertSvg.innerHTML = `
            <svg viewBox="0 0 280 280">
                <defs>
                    <linearGradient id="carBodyGrd" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="#1e293b"/>
                        <stop offset="40%" stop-color="#0f172a"/>
                        <stop offset="100%" stop-color="#020617"/>
                    </linearGradient>
                    <linearGradient id="carSideStrokeGrd" x1="100%" y1="0%" x2="0%" y2="0%">
                        <stop offset="0%" stop-color="#38bdf8" stop-opacity="1"/>
                        <stop offset="35%" stop-color="#38bdf8" stop-opacity="0.8"/>
                        <stop offset="70%" stop-color="rgba(255,255,255,0.4)" stop-opacity="0.4"/>
                        <stop offset="100%" stop-color="#ef4444" stop-opacity="1"/>
                    </linearGradient>
                    <linearGradient id="cabinGlassGrd" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="rgba(14, 165, 233, 0.4)"/>
                        <stop offset="100%" stop-color="rgba(14, 165, 233, 0.05)"/>
                    </linearGradient>
                    <linearGradient id="sideLightBeam" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stop-color="rgba(56, 189, 248, 0.2)"/>
                        <stop offset="100%" stop-color="rgba(56, 189, 248, 0)"/>
                    </linearGradient>
                    <linearGradient id="taillightBeam" x1="0%" y1="0%" x2="-100%" y2="0%">
                        <stop offset="0%" stop-color="rgba(239, 68, 68, 0.15)"/>
                        <stop offset="100%" stop-color="rgba(239, 68, 68, 0)"/>
                    </linearGradient>
                </defs>

                <!-- Grid circles -->
                <circle cx="140" cy="140" r="90" fill="none" stroke="rgba(255,255,255,0.06)" stroke-dasharray="4,4"/>
                
                <!-- Axis lines -->
                <line x1="140" y1="20" x2="140" y2="260" stroke="rgba(255,255,255,0.1)"/>
                <line x1="20" y1="140" x2="260" y2="140" stroke="rgba(255,255,255,0.1)"/>
                
                <!-- Ground floor line drawn dynamically based on installation height -->
                <line x1="20" y1="${groundY}" x2="260" y2="${groundY}" stroke="rgba(255,255,255,0.35)" stroke-width="1.5" />
                <text x="240" y="${groundY + 14}" fill="var(--text-muted)" font-size="8">地面</text>
                
                <!-- Dynamic installation height indicator line -->
                <line x1="140" y1="140" x2="140" y2="${groundY}" stroke="${colorHex}" stroke-width="1.2" stroke-dasharray="3,3" opacity="0.6"/>
                <circle cx="140" cy="${groundY}" r="3.5" fill="${colorHex}"/>
                
                <!-- Beautiful Side-view car outline shifted dynamically -->
                ${carSVG}
                
                <!-- Glowing Cone -->
                <path d="${pathData}" fill="${glowHex}" stroke="${colorHex}" stroke-width="2.5" />
                
                <!-- Dynamic Corner HUD Badges -->
                ${leftBadgeHTML}
                ${rightBadgeHTML}
                
                <!-- Text descriptions -->
                <text x="140" y="272" fill="var(--text-secondary)" font-size="9.5" font-weight="700" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" letter-spacing="0.05em">垂直切面 (VERTICAL)</text>
                <text x="252" y="135" fill="var(--text-muted)" font-size="8" text-anchor="end">照射方向</text>
                <text x="32" y="135" fill="var(--text-muted)" font-size="8" text-anchor="start">燈具安裝點</text>
                
                <!-- Value Display Capsule -->
                <rect x="80" y="26" width="120" height="24" rx="12" fill="rgba(7, 10, 19, 0.9)" stroke="rgba(255, 255, 255, 0.15)" stroke-width="1.5" />
                <text x="140" y="42" fill="${colorHex}" font-weight="bold" font-size="12" text-anchor="middle" font-family="Outfit" letter-spacing="0.05em">+${aboveDeg}° / -${belowDeg}°</text>
            </svg>
        `;
    }
}

// Renders the standard weight grid points (Tab 4 / Tab 1 subset)
function drawPhotometricWeightGrid(lamp) {
    const gridMap = document.getElementById("gridMapContainer");
    if(!gridMap) return;
    
    // Let's configure custom standard weights for different grid classes
    // We simplify: Direction Indicators, CHMSL, RL have custom concentrated grids. Stop/Pos have standard grid.
    let gridType = "standard";
    if(lamp.photometricGrid === "Figure A3-III") gridType = "chmsl";
    else if(lamp.symbol === "RL") gridType = "drl";
    else if(lamp.symbol === "AR") gridType = "reversing";
    else if(lamp.photometricGrid === "Figure A3-VI") gridType = "rear-fog";
    
    // Node configuration rows
    // Row U10, U5, H, D5, D10
    const rows = ["10U", "5U", "H", "5D", "10D"];
    const cols = ["20L", "10L", "5L", "V", "5R", "10R", "20R"];
    
    // Core weight percentage calculations (mock weights representation for visual reference)
    let weights = {};
    if(gridType === "chmsl") {
        // Stop lamp S3 and S4 (Figure A3-III) - standard light distribution
        weights = {
            "10U-10L": 32, "10U-V": 64, "10U-10R": 32,
            "5U-10L": 64, "5U-5L": 100, "5U-V": 100, "5U-5R": 100, "5U-10R": 64,
            "H-10L": 64, "H-5L": 100, "H-V": 100, "H-5R": 100, "H-10R": 64,
            "5D-10L": 64, "5D-5L": 100, "5D-V": 100, "5D-5R": 100, "5D-10R": 64
        };
    } else if(gridType === "drl") {
        // Daytime running lamp concentrated
        weights = {
            "H-V": 100, "5U-V": 70, "5D-V": 70, 
            "H-5L": 90, "H-5R": 90, "H-10L": 20, "H-10R": 20,
            "H-20L": 10, "H-20R": 10,
            "5U-5L": 65, "5U-5R": 65, "5D-5L": 65, "5D-5R": 65
        };
    } else if(gridType === "reversing") {
        // Reversing lamp spread below horizon
        weights = {
            "H-V": 10, "5D-V": 100, "10D-V": 80,
            "5D-10L": 50, "5D-10R": 50, "10D-20L": 25, "10D-20R": 25
        };
    } else if(gridType === "rear-fog") {
        // Rear Fog Lamp (Figure A3-VI) - narrow concentration, no 20L/R, no 10U/D
        weights = {
            "H-V": 100, // 150 cd
            "5U-V": 100, "5D-V": 100, // 150 cd
            "H-10L": 100, "H-10R": 100 // 150 cd
        };
    } else {
        // Standard position/stop lamp distributions (Figure A3-I standard)
        weights = {
            "H-V": 100, "5U-V": 70, "5D-V": 70, "10U-V": 20, "10D-V": 20,
            "H-5L": 90, "H-5R": 90, "H-10L": 35, "H-10R": 35, "H-20L": 10, "H-20R": 10,
            "5U-5L": 60, "5U-5R": 60, "5D-5L": 60, "5D-5R": 60,
            "5U-10L": 20, "5U-10R": 20, "5D-10L": 20, "5D-10R": 20
        };
    }
    
    let svgOverlay = "";
    if (gridType === "rear-fog") {
        svgOverlay = `
        <svg style="position:absolute; top:24px; left:24px; width:calc(100% - 48px); height:calc(100% - 48px); pointer-events:none; z-index:1;" viewBox="0 0 100 100" preserveAspectRatio="none">
            <!-- Glowing Diamond Background Area -->
            <polygon points="50,30 78.57,50 50,70 21.43,50" fill="rgba(239, 68, 68, 0.05)" stroke="#ef4444" stroke-dasharray="3,3" stroke-width="1.2" style="filter: drop-shadow(0 0 4px rgba(239, 68, 68, 0.35));" />
            
            <!-- Glowing Solid Axes inside Diamond (150 cd Min Region) -->
            <line x1="50" y1="30" x2="50" y2="70" stroke="#ef4444" stroke-width="2" style="filter: drop-shadow(0 0 3px rgba(239, 68, 68, 0.5));" />
            <line x1="21.43" y1="50" x2="78.57" y2="50" stroke="#ef4444" stroke-width="2" style="filter: drop-shadow(0 0 3px rgba(239, 68, 68, 0.5));" />
            
            <!-- Diamond Vertex Dots -->
            <circle cx="50" cy="30" r="1" fill="#ef4444" style="filter: drop-shadow(0 0 2px #ef4444);" />
            <circle cx="50" cy="70" r="1" fill="#ef4444" style="filter: drop-shadow(0 0 2px #ef4444);" />
            <circle cx="21.43" cy="50" r="1" fill="#ef4444" style="filter: drop-shadow(0 0 2px #ef4444);" />
            <circle cx="78.57" cy="50" r="1" fill="#ef4444" style="filter: drop-shadow(0 0 2px #ef4444);" />
            
            <!-- Sleek Interactive Visual Annotations / Labels -->
            <rect x="60" y="20" width="22" height="5" rx="1.5" fill="rgba(7, 10, 19, 0.85)" stroke="rgba(239, 68, 68, 0.4)" stroke-width="0.6" />
            <text x="71" y="23.5" fill="#fca5a5" font-size="2.4" font-weight="bold" font-family="'Outfit', sans-serif" text-anchor="middle">150 cd 軸線下限</text>
            
            <rect x="18" y="75" width="22" height="5" rx="1.5" fill="rgba(7, 10, 19, 0.85)" stroke="rgba(239, 68, 68, 0.4)" stroke-width="0.6" />
            <text x="29" y="78.5" fill="#ef4444" font-size="2.4" font-weight="bold" font-family="'Outfit', sans-serif" text-anchor="middle">75 cd 菱形區域</text>
        </svg>
        `;
    }
    
    let html = svgOverlay + `
        <div class="grid-h-axis"></div>
        <div class="grid-v-axis"></div>
    `;
    
    rows.forEach(r => {
        html += `<div class="grid-node-row">`;
        cols.forEach(c => {
            const key = `${r}-${c.replace("V", "V")}`;
            // Standardizing clean tags
            let nodeKey = "";
            if(r === "H" && c === "V") nodeKey = "H-V";
            else if(r === "H") nodeKey = `H-${c}`;
            else if(c === "V") nodeKey = `${r}-V`;
            else nodeKey = `${r}-${c}`;
            
            const pct = weights[nodeKey] || 0;
            
            let displayVal = "";
            let activeClass = "";
            if(pct > 0) {
                // Calculate absolute CD
                const absCd = ((pct / 100) * lamp.minIntensity).toFixed(1);
                const maxCd = lamp.activeMax;
                displayVal = `${pct}%`;
                activeClass = `active-point active-${lamp.color.toLowerCase()}`;
                
                // Show CD on hover or inside the small node
                html += `
                    <div class="grid-point ${activeClass}" title="配光測試點 ${nodeKey} | 最小光度比重: ${pct}% | 法定最小光度: ${absCd} cd | 法定最大光度: ${maxCd} cd">
                        <span class="coord">${nodeKey}</span>
                        <span class="val-pct">${pct}%</span>
                        <span class="val-min">Min: ${absCd}cd</span>
                        <span class="val-max">Max: ${maxCd}cd</span>
                    </div>
                `;
            } else {
                html += `<div class="grid-point" style="opacity: 0.15;">
                    <span class="coord" style="font-size:0.5rem;">${nodeKey}</span>
                </div>`;
            }
        });
        html += `</div>`;
    });
    
    gridMap.innerHTML = html;
}

// CIE 1931 Canvas Rendering and Calculation
let canvasContext = null;
let cieCanvas = null;

function initCIEChart() {
    cieCanvas = document.getElementById("cieCanvas");
    if(!cieCanvas) return;
    canvasContext = cieCanvas.getContext("2d");
    
    // Pre-load default inputs
    const inputX = document.getElementById("cieInputX");
    const inputY = document.getElementById("cieInputY");
    if(inputX && inputY) {
        inputX.addEventListener("input", (e) => {
            uiState.cieInputX = parseFloat(e.target.value) || 0.0;
            drawCIE();
        });
        inputY.addEventListener("input", (e) => {
            uiState.cieInputY = parseFloat(e.target.value) || 0.0;
            drawCIE();
        });
    }
    
    drawCIE();
}

// Dynamic Point in Polygon algorithm for checking CIE legal coordinates
function isPointInPolygon(point, polygon) {
    let x = point.x, y = point.y;
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        let xi = polygon[i].x, yi = polygon[i].y;
        let xj = polygon[j].x, yj = polygon[j].y;
        
        let intersect = ((yi > y) !== (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
}

function performCIECoordinateCheck() {
    const x = uiState.cieInputX;
    const y = uiState.cieInputY;
    
    const resultBox = document.getElementById("cieResultBox");
    if(!resultBox) return;
    
    let matchedColor = null;
    Object.keys(CIE_BOUNDARIES).forEach(color => {
        if(isPointInPolygon({x, y}, CIE_BOUNDARIES[color])) {
            matchedColor = color;
        }
    });
    
    let html = "";
    if(matchedColor) {
        const colorNameMap = { "Red": "紅色 (Red)", "Amber": "琥珀色 (Amber)", "White": "白色 (White)" };
        html = `
            <div class="judge-status status-compliant">符合法規 (COMPLIANT)</div>
            <div style="font-size:0.9rem; color:var(--text-secondary);">
                點坐標 <strong>(${x.toFixed(3)}, ${y.toFixed(3)})</strong> 落於 
                <span style="color:var(--secondary); font-weight:bold;">${colorNameMap[matchedColor]}</span> 色度範圍之內。
            </div>
        `;
    } else {
        html = `
            <div class="judge-status status-non-compliant">不符合法規 (NON-COMPLIANT)</div>
            <div style="font-size:0.9rem; color:var(--text-secondary); margin-top:4px;">
                點坐標 <strong>(${x.toFixed(3)}, ${y.toFixed(3)})</strong> 超出 R148 白光、黃光或紅光的標準法定區間！
            </div>
        `;
    }
    resultBox.innerHTML = html;
}

// Draw CIE chart on canvas
function drawCIE() {
    if(!cieCanvas || !canvasContext) return;
    
    const width = 450;
    const height = 450;
    cieCanvas.width = width;
    cieCanvas.height = height;
    
    const ctx = canvasContext;
    ctx.clearRect(0, 0, width, height);
    
    // Margin constants
    const pad = 40;
    const chartW = width - pad * 2;
    const chartH = height - pad * 2;
    
    // Mapping function from (x, y) coordinates to Canvas (X, Y)
    // CIE x range: 0.0 to 0.8, y range: 0.0 to 0.9
    const getCanvasX = (x) => pad + (x / 0.8) * chartW;
    const getCanvasY = (y) => pad + chartH - (y / 0.9) * chartH;
    
    // Draw background grid lines and axis coordinates
    ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
    ctx.lineWidth = 1;
    for(let i=0.1; i<0.8; i+=0.1) {
        // Vertical lines
        ctx.beginPath();
        ctx.moveTo(getCanvasX(i), getCanvasY(0));
        ctx.lineTo(getCanvasX(i), getCanvasY(0.9));
        ctx.stroke();
        
        ctx.fillStyle = "var(--text-muted)";
        ctx.font = "8px sans-serif";
        ctx.fillText(i.toFixed(1), getCanvasX(i) - 5, getCanvasY(0) + 12);
    }
    for(let j=0.1; j<0.9; j+=0.1) {
        // Horizontal lines
        ctx.beginPath();
        ctx.moveTo(getCanvasX(0), getCanvasY(j));
        ctx.lineTo(getCanvasX(0.8), getCanvasY(j));
        ctx.stroke();
        
        ctx.fillStyle = "var(--text-muted)";
        ctx.font = "8px sans-serif";
        ctx.fillText(j.toFixed(1), getCanvasX(0) - 20, getCanvasY(j) + 3);
    }
    
    // Main Axis borders
    ctx.strokeStyle = "rgba(255,255,255,0.2)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(getCanvasX(0), getCanvasY(0));
    ctx.lineTo(getCanvasX(0.8), getCanvasY(0));
    ctx.moveTo(getCanvasX(0), getCanvasY(0));
    ctx.lineTo(getCanvasX(0), getCanvasY(0.9));
    ctx.stroke();
    
    // Horseshoe outline of human vision color spectrum (Approximate standard curve for UI representation)
    const curvePoints = [
        {x: 0.174, y: 0.005}, {x: 0.173, y: 0.023}, {x: 0.160, y: 0.060}, 
        {x: 0.144, y: 0.125}, {x: 0.122, y: 0.200}, {x: 0.093, y: 0.320}, 
        {x: 0.063, y: 0.460}, {x: 0.032, y: 0.600}, {x: 0.008, y: 0.700}, 
        {x: 0.004, y: 0.750}, {x: 0.014, y: 0.780}, {x: 0.038, y: 0.810}, 
        {x: 0.074, y: 0.833}, {x: 0.120, y: 0.835}, {x: 0.170, y: 0.818}, 
        {x: 0.230, y: 0.785}, {x: 0.300, y: 0.730}, {x: 0.380, y: 0.650}, 
        {x: 0.460, y: 0.560}, {x: 0.540, y: 0.470}, {x: 0.620, y: 0.380}, 
        {x: 0.680, y: 0.320}, {x: 0.734, y: 0.265}
    ];
    
    ctx.beginPath();
    ctx.moveTo(getCanvasX(curvePoints[0].x), getCanvasY(curvePoints[0].y));
    for(let k=1; k<curvePoints.length; k++) {
        ctx.lineTo(getCanvasX(curvePoints[k].x), getCanvasY(curvePoints[k].y));
    }
    // Connect base line
    ctx.lineTo(getCanvasX(0.734), getCanvasY(0.265));
    ctx.lineTo(getCanvasX(0.174), getCanvasY(0.005));
    ctx.strokeStyle = "rgba(255,255,255,0.4)";
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // Draw transparent background color inside horseshoe spectrum (visual representation)
    const radGrd = ctx.createRadialGradient(
        getCanvasX(0.33), getCanvasY(0.33), 5,
        getCanvasX(0.33), getCanvasY(0.33), 180
    );
    radGrd.addColorStop(0, "rgba(255, 255, 255, 0.4)");
    radGrd.addColorStop(0.2, "rgba(0, 255, 255, 0.15)");
    radGrd.addColorStop(0.5, "rgba(0, 255, 0, 0.15)");
    radGrd.addColorStop(0.7, "rgba(255, 255, 0, 0.15)");
    radGrd.addColorStop(1, "rgba(255, 0, 0, 0.15)");
    
    ctx.fillStyle = radGrd;
    ctx.fill();
    
    // Draw Legal Polygons (White, Amber, Red)
    Object.keys(CIE_BOUNDARIES).forEach(color => {
        const poly = CIE_BOUNDARIES[color];
        ctx.beginPath();
        ctx.moveTo(getCanvasX(poly[0].x), getCanvasY(poly[0].y));
        for(let l=1; l<poly.length; l++) {
            ctx.lineTo(getCanvasX(poly[l].x), getCanvasY(poly[l].y));
        }
        ctx.closePath();
        
        let fillColor = "rgba(248, 250, 252, 0.12)";
        let strokeColor = "#f8fafc";
        if(color === "Red") { fillColor = "rgba(239, 68, 68, 0.12)"; strokeColor = "#ef4444"; }
        else if(color === "Amber") { fillColor = "rgba(245, 158, 11, 0.12)"; strokeColor = "#f59e0b"; }
        
        ctx.fillStyle = fillColor;
        ctx.fill();
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        
        // Add color boundary names
        ctx.fillStyle = strokeColor;
        ctx.font = "bold 9px sans-serif";
        ctx.fillText(color, getCanvasX(poly[0].x) + 4, getCanvasY(poly[0].y) - 2);
    });
    
    // Draw current active crosshair user coordinate point
    const ptX = uiState.cieInputX;
    const ptY = uiState.cieInputY;
    
    ctx.strokeStyle = "#4f46e5";
    ctx.lineWidth = 1.2;
    // Crosshair Lines
    ctx.beginPath();
    ctx.moveTo(getCanvasX(ptX), getCanvasY(0));
    ctx.lineTo(getCanvasX(ptX), getCanvasY(0.9));
    ctx.moveTo(getCanvasX(0), getCanvasY(ptY));
    ctx.lineTo(getCanvasX(0.8), getCanvasY(ptY));
    ctx.stroke();
    
    // Glow circle around point
    ctx.beginPath();
    ctx.arc(getCanvasX(ptX), getCanvasY(ptY), 6, 0, 2 * Math.PI);
    ctx.fillStyle = "#4f46e5";
    ctx.fill();
    ctx.strokeStyle = "#f8fafc";
    ctx.lineWidth = 1.5;
    ctx.stroke();
}

// Cross-Reference Tab Setup
const COMPARER_LIST = ["A", "1b", "RL"]; // Default checkboxes shown

// Category classification logic using robust English/ASCII property matching to avoid encoding issues
function getLampCategory(key, lamp) {
    const nameEn = (lamp.nameEn || "").toLowerCase();
    
    if (nameEn.includes("front") || nameEn.includes("forward") || nameEn.includes("daytime") || key.includes("_F") || key === "1" || key === "1a" || key === "1b") {
        return "front";
    }
    if (nameEn.includes("side") || key === "5" || key === "6") {
        return "side";
    }
    if (nameEn.includes("rear") || nameEn.includes("stop") || nameEn.includes("reversing") || nameEn.includes("fog") || key.includes("_R") || key === "2a" || key === "2b") {
        return "rear";
    }
    return "other";
}

function initCrossRefTab() {
    const containers = {
        front: document.getElementById("crossRefCheckboxes-front"),
        side: document.getElementById("crossRefCheckboxes-side"),
        rear: document.getElementById("crossRefCheckboxes-rear"),
        other: document.getElementById("crossRefCheckboxes-other")
    };
    
    if(!containers.front || !containers.side || !containers.rear) return;
    
    // Clear all
    Object.keys(containers).forEach(cKey => {
        if(containers[cKey]) containers[cKey].innerHTML = "";
    });
    
    let hasOthers = false;
    
    Object.keys(R148_DATABASE).forEach(key => {
        const lamp = R148_DATABASE[key];
        const label = document.createElement("label");
        
        const isChecked = COMPARER_LIST.includes(key);
        label.className = "checkbox-item" + (isChecked ? " checked" : "");
        label.dataset.id = key;
        
        label.innerHTML = `
            <input type="checkbox" data-id="${key}" ${isChecked ? "checked" : ""}>
            <span>${lamp.symbol} - ${lamp.nameZh.split(" (")[0]}</span>
        `;
        
        const chk = label.querySelector("input");
        chk.addEventListener("change", (e) => {
            if(e.target.checked) {
                label.classList.add("checked");
            } else {
                label.classList.remove("checked");
            }
            updateCrossRefTable();
        });
        
        const category = getLampCategory(key, lamp);
        if(containers[category]) {
            containers[category].appendChild(label);
            if(category === "other") hasOthers = true;
        }
    });
    
    const otherBlock = document.getElementById("category-block-other");
    if(otherBlock) {
        otherBlock.style.display = hasOthers ? "block" : "none";
    }
    
    updateCrossRefTable();
}

// Generate comparison table dynamically
// Get installation specifications under UN R48 and R148 for the comparison table
function getLampInstallationSpecs(lampId, lamp) {
    const symbol = lamp.symbol || lampId;
    
    // Default values (representing standard signaling lamps)
    let minHeight = "350 mm";
    let maxHeight = "1500 mm";
    let minSpacing = "≧ 600 mm";
    let maxEdge = "≦ 400 mm";
    let minArea = "12.5 cm²";
    let maxArea = "無特定限制 (N.A.)";
    let color = lamp.colorZh || "未指定";
    
    // Custom configurations based on lamp categories
    if (symbol === "RL") { // DRL
        minHeight = "250 mm";
        maxHeight = "1500 mm";
        minSpacing = "≧ 600 mm";
        maxEdge = "≦ 400 mm";
        minArea = "25.0 cm²";
        maxArea = "無特定限制 (N.A.)";
    } else if (symbol === "S3" || symbol === "S4") { // CHMSL
        minHeight = "≧ 850 mm (且應置於後擋風玻璃下緣上方，或高於兩側煞車燈 ≧ 150mm)";
        maxHeight = "靠近車頂 (應置於車身中線上部)";
        minSpacing = "置中安裝 (單燈)";
        maxEdge = "置中安裝 (單燈)";
        minArea = "免除限制 (Exempt)";
        maxArea = "無特定限制 (N.A.)";
    } else if (symbol === "F1" || symbol === "F2") { // Rear Fog
        minHeight = "250 mm";
        maxHeight = "1000 mm";
        minSpacing = "對稱安裝 (雙燈) / 置中或偏左 (單燈)";
        maxEdge = "無特定限制 (N.A.)";
        minArea = "免除限制 (Exempt)";
        maxArea = "無特定限制 (N.A.)";
    } else if (symbol === "AR") { // Reversing
        minHeight = "250 mm";
        maxHeight = "1200 mm";
        minSpacing = "無特定限制 (雙燈對稱 / 單燈置中)";
        maxEdge = "無特定限制 (N.A.)";
        minArea = "免除限制 (Exempt)";
        maxArea = "無特定限制 (N.A.)";
    } else if (symbol === "5" || symbol === "6") { // Side Indicator
        minHeight = "350 mm (M1/N1 級車輛結構困難可放寬至 500 mm)";
        maxHeight = "1500 mm (因結構可放寬至 2300 mm)";
        minSpacing = "側邊安裝 (N.A.)";
        maxEdge = "車身前部距前部邊緣 ≦ 1800 mm";
        minArea = "免除限制 (Exempt)";
        maxArea = "無特定限制 (N.A.)";
    } else if (symbol === "SM1" || symbol === "SM2") { // Side Marker
        minHeight = "250 mm (M1/N1 級車輛可放寬至 350 mm)";
        maxHeight = "1500 mm (因結構可放寬至 2100 mm)";
        minSpacing = "側向長度分佈 (每盞間距 ≦ 3 m 或 4 m)";
        maxEdge = "車尾距 ≦ 1000 mm (最前一盞距前部 ≦ 3 m)";
        minArea = "免除限制 (Exempt)";
        maxArea = "無特定限制 (N.A.)";
    } else if (symbol === "AM" || symbol === "RM1" || symbol === "RM2") { // End-outline
        minHeight = "儘可能靠近車頂 (置於車身最大寬度處)";
        maxHeight = "頂部限度";
        minSpacing = "儘可能遠 (兩側對稱對立)";
        maxEdge = "≦ 400 mm";
        minArea = "12.5 cm²";
        maxArea = "無特定限制 (N.A.)";
    } else if (["MA", "MR", "MS"].includes(symbol)) { // Motorcycle
        minHeight = "350 mm (MS 煞車燈為 250 mm)";
        maxHeight = "1200 mm (MS 煞車燈為 1500 mm)";
        minSpacing = "單燈置中 / 雙燈間距 ≦ 240 mm (MS 雙燈對稱)";
        maxEdge = "置中安裝 (N.A.)";
        minArea = "免除限制 (Exempt)";
        maxArea = "無特定限制 (N.A.)";
    } else if (lampId.includes("77R")) { // Parking Lamp
        minHeight = "350 mm";
        maxHeight = "1500 mm (因結構可放寬至 2100 mm)";
        minSpacing = "對稱安裝 (無特定限制)";
        maxEdge = "≦ 400 mm";
        minArea = "12.5 cm²";
        maxArea = "無特定限制 (N.A.)";
    }
    
    return {
        minHeight,
        maxHeight,
        minSpacing,
        maxEdge,
        minArea,
        maxArea,
        color
    };
}

// Calculate mutual requirements between pairs of selected lights under UN R48
function getMutualCrossRefAdvice(selectedIds) {
    let adviceList = [];
    
    const hasRL = selectedIds.includes("RL");
    const hasA = selectedIds.includes("A");
    const hasFrontIndicator = selectedIds.some(id => ["1", "1a", "1b"].includes(id));
    const hasRearFog = selectedIds.some(id => ["F1", "F2"].includes(id));
    const hasStop = selectedIds.some(id => ["S1", "S2"].includes(id));
    const hasRearPos = selectedIds.some(id => ["R1", "R2"].includes(id));
    
    // 1. DRL vs Front Position Lamp
    if (hasRL && hasA) {
        adviceList.push({
            title: "⚡ 日間行車燈 (DRL) 與前位置燈 (Position Lamp) 關聯限制 (UN R48 § 6.19.7)",
            text: "當前照燈或前位置燈開啟時，日間行車燈 (DRL) 必須<b>自動關閉</b>，或將亮度<b>自動減弱至前位置燈級別</b>，以防夜間對對向來車造成強烈眩光。"
        });
    }
    
    // 2. DRL vs Front Direction Indicator
    if (hasRL && hasFrontIndicator) {
        adviceList.push({
            title: "⚡ 日間行車燈 (DRL) 與前方向指示燈 (Indicator) 距離限制 (UN R48 § 6.19.7)",
            text: "若 DRL 與前方向指示燈的相鄰邊緣距離<b>小於 40 mm</b>，則在方向指示燈作動期間，同側的 DRL 必須<b>完全熄滅</b>或<b>衰減至不大於前位置燈之亮度</b>，以避免強烈的 DRL 白光沖刷 (Washout) 琥珀色方向燈信號。"
        });
    }
    
    // 3. Rear Fog Lamp vs Stop Lamp
    if (hasRearFog && hasStop) {
        adviceList.push({
            title: "⚡ 後霧燈 (Rear Fog) 與煞車燈 (Stop Lamp) 距離限制 (UN R48 § 6.11.7)",
            text: "後霧燈與任何煞車燈發光視表面投影邊緣的<b>間距必須大於等於 100 mm</b>。這是強制的安裝安全限制，以防強烈紅光的霧燈掩蓋煞車燈信號，造成後車追撞。"
        });
    }
    
    // 4. Rear Position Lamp vs Stop Lamp
    if (hasRearPos && hasStop) {
        adviceList.push({
            title: "⚡ 後位置燈與煞車燈混合使用限制 (UN R148)",
            text: "若後位置燈與煞車燈共用相同發光本體或視表面，在煞車燈作動時，其總光學強度與單獨後位置燈開啟時的光學強度比值，在所有測試點上<b>必須大於等於 5:1</b>，以確保清晰的煞車高對比警示度。"
        });
    }
    
    return adviceList;
}

// Calculate row-level mutual requirements under UN R48 for remarks
function getRowMutualRequirements(lampId, selectedIds) {
    let mutualAlerts = [];
    const symbol = lampId;

    const hasRL = selectedIds.includes("RL");
    const hasA = selectedIds.includes("A");
    const hasFrontIndicator = selectedIds.some(id => ["1", "1a", "1b"].includes(id));
    const hasRearFog = selectedIds.some(id => ["F1", "F2"].includes(id));
    const hasStop = selectedIds.some(id => ["S1", "S2"].includes(id));
    const hasRearPos = selectedIds.some(id => ["R1", "R2"].includes(id));
    
    // 1. DRL vs Front Position Lamp (RL vs A)
    if ((symbol === "RL" && hasA) || (symbol === "A" && hasRL)) {
        mutualAlerts.push(`
            <div style="padding: 5px 8px; border-radius: 4px; background: rgba(245,158,11,0.08); border: 1px solid rgba(245,158,11,0.2); color: #fbbf24; font-size: 0.7rem; line-height: 1.3; font-weight: 500; margin-top: 4px;">
                ⚡ 聯鎖限制 (R48 §6.19.7)：前位置燈開啟時，DRL 必須自動關閉或減至位置燈級別。
            </div>
        `);
    }
    
    // 2. DRL vs Front Direction Indicator (RL vs 1/1a/1b)
    if ((symbol === "RL" && hasFrontIndicator) || (["1", "1a", "1b"].includes(symbol) && hasRL)) {
        mutualAlerts.push(`
            <div style="padding: 5px 8px; border-radius: 4px; background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.2); color: #f87171; font-size: 0.7rem; line-height: 1.3; font-weight: 500; margin-top: 4px;">
                ⚠️ 距離限制 (R48 §6.19.7)：與方向燈間距 < 40 mm 時，方向燈作動期間同側 DRL 需熄滅或減光。
            </div>
        `);
    }
    
    // 3. Rear Fog Lamp vs Stop Lamp (F1/F2 vs S1/S2)
    if ((["F1", "F2"].includes(symbol) && hasStop) || (["S1", "S2"].includes(symbol) && hasRearFog)) {
        mutualAlerts.push(`
            <div style="padding: 5px 8px; border-radius: 4px; background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.2); color: #f87171; font-size: 0.7rem; line-height: 1.3; font-weight: 500; margin-top: 4px;">
                ⚠️ 間距限制 (R48 §6.11.7)：後霧燈與煞車燈邊緣間距必須 ≧ 100 mm，以防煞車光線被掩蓋。
            </div>
        `);
    }
    
    // 4. Rear Position Lamp vs Stop Lamp (R1/R2 vs S1/S2)
    if ((["R1", "R2"].includes(symbol) && hasStop) || (["S1", "S2"].includes(symbol) && hasRearPos)) {
        mutualAlerts.push(`
            <div style="padding: 5px 8px; border-radius: 4px; background: rgba(14,165,233,0.08); border: 1px solid rgba(14,165,233,0.2); color: #38bdf8; font-size: 0.7rem; line-height: 1.3; font-weight: 500; margin-top: 4px;">
                🔗 混合限制 (R148)：與後位置燈/煞車燈共用相同發光本體時，煞車時總光度與位置燈之比值需 ≧ 5:1。
            </div>
        `);
    }

    return mutualAlerts.join("");
}

// Generate comparison table dynamically
function updateCrossRefTable() {
    const tableBody = document.getElementById("crossRefTableBody");
    if(!tableBody) return;
    
    tableBody.innerHTML = "";
    
    // Get all checked boxes
    const checkedBoxes = document.querySelectorAll(".cross-ref-categories input:checked");
    if(checkedBoxes.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="12" style="text-align:center; color:var(--text-muted); padding: 32px 0;">請勾選上方欲進行交叉比對的車燈功能...</td></tr>`;
        
        // Hide mutual advice
        const mutualContainer = document.getElementById("crossRefMutualContainer");
        if(mutualContainer) mutualContainer.style.display = "none";
        return;
    }
    
    const selectedIds = Array.from(checkedBoxes).map(chk => chk.dataset.id);
    
    checkedBoxes.forEach(chk => {
        const id = chk.dataset.id;
        const lamp = calculateActiveSpec(id);
        if(!lamp) return;
        
        const installSpecs = getLampInstallationSpecs(id, lamp);
        
        let colorClass = "tag-white";
        if(lamp.color === "Red") colorClass = "tag-red";
        else if(lamp.color === "Amber") colorClass = "tag-amber";
        
        const mutualAlertsHtml = getRowMutualRequirements(id, selectedIds);
        
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>
                <span class="symbol-badge ${colorClass}">${lamp.symbol}</span>
            </td>
            <td>
                <div style="font-weight:600; color:var(--text-primary);">${lamp.nameZh.split(" (")[0]}</div>
                <div style="font-size:0.72rem; color:var(--text-muted);">${lamp.nameEn}</div>
            </td>
            <td>
                <span class="val" style="font-size:0.82rem; font-weight:500;">${installSpecs.color}</span>
            </td>
            <td>
                <div style="font-family:'Outfit'; font-size:0.8rem; font-weight:600; color:var(--text-primary);">${installSpecs.minHeight}</div>
            </td>
            <td>
                <div style="font-family:'Outfit'; font-size:0.8rem; font-weight:600; color:var(--text-primary);">${installSpecs.maxHeight}</div>
            </td>
            <td>
                <div style="font-size:0.76rem; line-height:1.3; color:var(--text-primary);">${installSpecs.minSpacing}</div>
            </td>
            <td>
                <div style="font-size:0.76rem; line-height:1.3; color:var(--text-primary);">${installSpecs.maxEdge}</div>
            </td>
            <td>
                <div style="font-family:'Outfit'; font-size:0.8rem; font-weight:500; color:var(--secondary);">${installSpecs.minArea}</div>
            </td>
            <td>
                <div style="font-family:'Outfit'; font-size:0.8rem; font-weight:500; color:var(--secondary);">${installSpecs.maxArea}</div>
            </td>
            <td>
                <div style="font-size:0.8rem;"><span style="color:var(--text-muted);">Min:</span> <span style="font-family:'Outfit'; font-weight:600; color:var(--text-primary);">${lamp.minIntensity}</span> cd</div>
                <div style="font-size:0.8rem;"><span style="color:var(--text-muted);">Max:</span> <span style="font-family:'Outfit'; font-weight:600; color:var(--secondary);">${lamp.activeMax}</span> cd</div>
            </td>
            <td>
                <div style="font-size:0.78rem;"><span style="color:var(--text-muted);">H:</span> 外${lamp.horizOutboard}°/內${lamp.horizInboard}°</div>
                <div style="font-size:0.78rem;"><span style="color:var(--text-muted);">V:</span> 上${lamp.activeVertAbove}°/下${lamp.activeVertBelow}°</div>
            </td>
            <td style="max-width: 280px; font-size: 0.75rem; color: var(--text-secondary); line-height: 1.35; padding: 10px 14px;">
                <div style="margin-bottom: 4px;">${lamp.notesZh}</div>
                ${mutualAlertsHtml ? `<div style="display:flex; flex-direction:column; gap:4px; margin-top:6px;">${mutualAlertsHtml}</div>` : ""}
            </td>
        `;
        tableBody.appendChild(tr);
    });
    
    // Update mutual requirements advice
    const mutualContainer = document.getElementById("crossRefMutualContainer");
    const mutualList = document.getElementById("crossRefMutualList");
    
    if (mutualContainer && mutualList) {
        const selectedIds = Array.from(checkedBoxes).map(chk => chk.dataset.id);
        const adviceList = getMutualCrossRefAdvice(selectedIds);
        
        if (adviceList.length > 0) {
            mutualList.innerHTML = "";
            adviceList.forEach(advice => {
                const item = document.createElement("div");
                item.style.padding = "10px 14px";
                item.style.background = "rgba(255,255,255,0.02)";
                item.style.border = "1px solid rgba(255,255,255,0.05)";
                item.style.borderRadius = "var(--border-radius-sm)";
                item.innerHTML = `
                    <div style="font-weight: 600; color: var(--secondary); font-size: 0.85rem; margin-bottom: 4px;">${advice.title}</div>
                    <div style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4;">${advice.text}</div>
                `;
                mutualList.appendChild(item);
            });
            mutualContainer.style.display = "block";
        } else {
            mutualContainer.style.display = "none";
        }
    }
}
