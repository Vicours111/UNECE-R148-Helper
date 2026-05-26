# -*- coding: utf-8 -*-
import sys

# Read the broken app.js
js_path = r"c:\Users\as200\Downloads\Antigravity TEST_v20260521\Projects\r148-lighting-design-helper\app.js"

with open(js_path, "r", encoding="utf-8") as f:
    content = f.read()

# We want to find the start of getDYCompatibilityInfo and the end of getApparentSurfaceInfo
# Start index
start_target = "function getDYCompatibilityInfo(lampId, lamp) {"
start_idx = content.find(start_target)

# End target
end_target = "return {\n        area: \"無特定限制 (Exempt)\",\n        advisory: advText\n    };\n}"
# Let's search from start_idx
end_idx = content.find(end_target, start_idx) + len(end_target)

if start_idx == -1 or end_idx == -1:
    print("Error: Could not find start or end index in app.js!")
    sys.exit(1)

print(f"Replacing content from index {start_idx} to {end_idx}...")

# The corrected block
corrected_block = """function getDYCompatibilityInfo(lampId, lamp) {
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
    const requiresMinArea12_5 = ["A", "R1", "R2", "1", "1a", "1b", "2a", "2b"];
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
    } else if (["S1", "S2", "S3", "S4", "MS"].includes(lampId) || ["S1", "S2", "S3", "S4", "MS"].includes(symbol)) {
        advText = "🟡 <strong style='color:var(--warning);'>煞車燈法規豁免：</strong>根據 R148 與 R48 安裝法規，所有煞車燈（穩態 S1、可變 S2、高置 S3/S4、機車 MS）均無最小發光視表面投影面積 12.5 cm² 的強制性硬性限制，主要著重於指定可視角度內的光學強度分佈與 CoP 點亮反應時間 (0.2秒)。";
    } else if (["AM", "RM1", "RM2"].includes(lampId) || ["AM", "RM1", "RM2"].includes(symbol)) {
        advText = "🟡 <strong style='color:var(--warning);'>輪廓邊界燈豁免：</strong>輪廓邊界燈（前 AM/後 RM1/RM2）在 R148 與 R48 中無最小發光視表面投影面積限制，其安裝位置主要著重於必須位於車頂最高處且儘可能靠近車側外緣。";
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
}"""

fixed_content = content[:start_idx] + corrected_block + content[end_idx:]

with open(js_path, "w", encoding="utf-8") as f:
    f.write(fixed_content)

print("SUCCESSFULLY REPAIRED!")
