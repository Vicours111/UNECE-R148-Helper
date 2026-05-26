// UN R148 & R48 D-Lamp / Y-Lamp Interactive Visualizer Logic

// Dynamic specifications database
const LAMP_SPECS = {
    "S1": {
        nameZh: "煞車燈 - 穩態 (Stop Lamp S1)",
        minCd: 60.0,
        maxCd: 260.0,
        maxCdD: 130.0,
        explainY: "對於煞車燈 Y 系統，全系統所有發光區塊同時點亮時，總亮度必須介於 60 cd 至 260 cd 之間。",
        explainD: "對於煞車燈 D 系統，為了防止雙邊同時點亮造成後方強烈眩光，單邊每個 D 燈具最大光度限制減半為 130 cd。"
    },
    "R1": {
        nameZh: "後位置燈 - 穩態 (Rear Position R1)",
        minCd: 4.0,
        maxCd: 17.0,
        maxCdD: 8.5,
        explainY: "對於後位置燈 Y 系統，全系統所有發光區塊同時點亮時，總亮度必須介於 4.0 cd 至 17.0 cd 之間。",
        explainD: "對於後位置燈 D 系統，單側每個 D 燈具最大光度限制減半為 8.5 cd，可有效在夜間防範亮斑過度聚集。"
    },
    "F1": {
        nameZh: "後霧燈 - 穩態 (Rear Fog F1)",
        minCd: 150.0,
        maxCd: 300.0,
        maxCdD: 150.0,
        explainY: "後霧燈 Y 系統通常配置在尾門兩側。在尾門開啟時，其餘在固定車身上的後霧燈仍必須滿足 150 cd 下限，或啟用保險桿輔助霧燈。",
        explainD: "後霧燈功能極亮，故不常作雙邊 D-Lamp 宣告。若採取 D 宣告，單體光強限制減半為 150 cd。"
    }
};

// Global Interactive State
let state = {
    mode: 'Y',               // 'Y' = Interdependent Lamp, 'D' = Double Lamps
    tailgateOpen: false,     // tailgate switch
    failureSimulated: false, // bulb failure switch
    selectedSpec: 'S1',      // selected function
    gapDistance: 60          // 75mm playground distance in mm
};

// Initialization on DOM ready
document.addEventListener("DOMContentLoaded", () => {
    initPlayground();
    updateVisualizer();
});

// Switch between Y-Lamp and D-Lamp system modes
function switchSystemMode(modeCode) {
    state.mode = modeCode;
    
    // Toggle active tab buttons
    const tabY = document.getElementById("tabModeY");
    const tabD = document.getElementById("tabModeD");
    const panelY = document.getElementById("panelModeY");
    const panelD = document.getElementById("panelModeD");
    const titleText = document.getElementById("visualizerTitleText");
    const modeTitle = document.getElementById("lblModeTitle");
    const modeSubtitle = document.getElementById("lblModeSubtitle");
    
    if (modeCode === 'Y') {
        tabY.classList.add("active");
        tabD.classList.remove("active");
        panelY.classList.add("active");
        panelD.classList.remove("active");
        titleText.innerText = "相互依賴車燈運行模擬器 (Y-Lamp Mode)";
        modeTitle.innerText = "相互依賴車燈模式 (Y-Lamp Mode)";
        modeSubtitle.innerText = "雙車體區塊分佈，協同點亮與連動控制";
        
        // Reset failure if it was active to prevent weird states
        state.failureSimulated = false;
        document.getElementById("btnToggleFailure").classList.remove("active-danger");
    } else {
        tabY.classList.remove("active");
        tabD.classList.add("active");
        panelY.classList.remove("active");
        panelD.classList.add("active");
        titleText.innerText = "雙燈組合系統運行模擬器 (D-Lamp Mode)";
        modeTitle.innerText = "雙燈組合系統模式 (D-Lamp Mode)";
        modeSubtitle.innerText = "雙獨立燈具並排組裝，提供失效防護與最大光度減半";
    }
    
    updateVisualizer();
}

// Dropdown Spec change listener
function handleSpecSelectorChange() {
    const selector = document.getElementById("lampSpecSelector");
    state.selectedSpec = selector.value;
    
    // Dynamically update specification tables on the right
    const spec = LAMP_SPECS[state.selectedSpec];
    if (spec) {
        document.getElementById("valMinIntensityY").innerText = `${spec.minCd} cd`;
        document.getElementById("valMaxIntensityY").innerText = `${spec.maxCd} cd`;
        document.getElementById("valMaxIntensityD").innerText = `${spec.maxCdD} cd (減半)`;
        document.getElementById("valMinIntensityD").innerText = `滿足 100% 最小強度 (${spec.minCd} cd)`;
    }
    
    updateVisualizer();
}

// Initialize button click event listeners
function initPlayground() {
    // Tailgate opener trigger
    const btnTailgate = document.getElementById("btnToggleTailgate");
    btnTailgate.addEventListener("click", () => {
        state.tailgateOpen = !state.tailgateOpen;
        
        const svgCar = document.getElementById("svgCarRear");
        const txtBtn = document.getElementById("txtGateBtn");
        const txtIcon = document.getElementById("txtGateIcon");
        
        if (state.tailgateOpen) {
            svgCar.classList.add("tailgate-opened");
            btnTailgate.classList.add("active");
            txtBtn.innerText = "關閉尾門 (Close Tailgate)";
            txtIcon.innerText = "🔒";
        } else {
            svgCar.classList.remove("tailgate-opened");
            btnTailgate.classList.remove("active");
            txtBtn.innerText = "開啟尾門 (Open Tailgate)";
            txtIcon.innerText = "🔓";
        }
        
        updateVisualizer();
    });

    // Fail-safe burner simulator
    const btnFailure = document.getElementById("btnToggleFailure");
    btnFailure.addEventListener("click", () => {
        state.failureSimulated = !state.failureSimulated;
        
        if (state.failureSimulated) {
            btnFailure.classList.add("active-danger");
        } else {
            btnFailure.classList.remove("active-danger");
        }
        
        updateVisualizer();
    });
    
    // Initial rendering of 75mm distance calibration tool
    updateGapPlayground(state.gapDistance);
}

// Drive and synchronize SVG light elements based on current states (Y vs D, Tailgate Open, Bulbs Failed)
function updateVisualizer() {
    // Target SVG nodes
    const lampFixedL = document.getElementById("lampFixedL");
    const lampFixedR = document.getElementById("lampFixedR");
    const lampMovableL = document.getElementById("lampMovableL");
    const lampMovableR = document.getElementById("lampMovableR");
    const bumperReflexL = document.getElementById("bumperReflexL");
    const bumperReflexR = document.getElementById("bumperReflexR");
    
    // Get colors based on selected spec (S1/R1 = Red, F1 = Red)
    let colorClass = "lamp-glow-red";
    
    // Reset all classes
    lampFixedL.className.baseVal = "lamp-source";
    lampFixedR.className.baseVal = "lamp-source";
    lampMovableL.className.baseVal = "lamp-source";
    lampMovableR.className.baseVal = "lamp-source";
    
    bumperReflexL.style.fill = "#ef4444";
    bumperReflexL.style.opacity = "0.4";
    bumperReflexL.style.filter = "none";
    bumperReflexR.style.fill = "#ef4444";
    bumperReflexR.style.opacity = "0.4";
    bumperReflexR.style.filter = "none";

    // 1. Evaluate Y-Lamp Mode
    if (state.mode === 'Y') {
        if (state.tailgateOpen) {
            // Tailgate is opened - movable inner lamps are physically swung up out of view
            // and lose regulatory functionality (we simulate them shutting down or turning off)
            lampMovableL.classList.add("lamp-failure");
            lampMovableR.classList.add("lamp-failure");
            
            if (state.failureSimulated) {
                // Total failure mode - even fixed lamps go black
                lampFixedL.classList.add("lamp-failure");
                lampFixedR.classList.add("lamp-failure");
            } else {
                // In Y-lamp mode: Under UN R48, if inner lamps go out of visibility because tailgate is open,
                // static fixed body lamps must compensate OR auxiliary bumper lamps must activate.
                // We visually activate bumper lights as bright compensatory backup signaling!
                lampFixedL.classList.add(colorClass);
                lampFixedR.classList.add(colorClass);
                
                // Bumper auxiliary lamps light up bright!
                bumperReflexL.style.fill = "#ef4444";
                bumperReflexL.style.opacity = "0.95";
                bumperReflexL.style.filter = "drop-shadow(0 0 8px #ef4444)";
                bumperReflexR.style.fill = "#ef4444";
                bumperReflexR.style.opacity = "0.95";
                bumperReflexR.style.filter = "drop-shadow(0 0 8px #ef4444)";
            }
        } else {
            // Tailgate closed - Normal unified lighting operation
            if (state.failureSimulated) {
                // In Y-lamp interdependent system: failure of one part usually affects the whole circuit
                // We simulate partial loss where movable goes down or whole side shuts down.
                lampFixedL.classList.add("lamp-failure");
                lampMovableL.classList.add("lamp-failure");
                
                lampFixedR.classList.add(colorClass);
                lampMovableR.classList.add(colorClass);
            } else {
                // Normal Y mode: All four light up together as one continuous design
                lampFixedL.classList.add(colorClass);
                lampMovableL.classList.add(colorClass);
                lampFixedR.classList.add(colorClass);
                lampMovableR.classList.add(colorClass);
            }
        }
    }
    
    // 2. Evaluate D-Lamp Mode (Dual independent systems)
    else if (state.mode === 'D') {
        // D-Lamps act as two completely separate units on each side
        // Left Fender (Fixed L) & Left Trunk (Movable L) form the Left Pair.
        // Right Fender (Fixed R) & Right Trunk (Movable R) form the Right Pair.
        
        if (state.failureSimulated) {
            // Fail-safe simulation: Left Trunk (movable L) bulb burns out!
            // According to D-Lamp safety fallback rules, Left Fender (fixed L) MUST still light up
            // at 100% min cd intensity to fulfill the legal lighting function!
            lampMovableL.classList.add("lamp-failure");
            
            // Fixed L glows extra bright (safety fallback)
            lampFixedL.classList.add(colorClass);
            
            // Right side works perfectly
            lampFixedR.classList.add(colorClass);
            lampMovableR.classList.add(colorClass);
        } else {
            // Normal D-Lamp operation: All four work, but their maximum individual intensity is capped at 50%
            // to avoid combined glare.
            lampFixedL.classList.add(colorClass);
            lampMovableL.classList.add(colorClass);
            lampFixedR.classList.add(colorClass);
            lampMovableR.classList.add(colorClass);
        }
    }
}

// 75mm Spacing Calibration Tool: Dynamic calculations & SVG coordinates translation
function updateGapPlayground(value) {
    state.gapDistance = parseInt(value);
    
    // Update numeric text displays
    document.getElementById("lblGapValue").innerText = `${state.gapDistance} mm`;
    document.getElementById("lblDimensionText").textContent = `${state.gapDistance} mm`;
    
    // Update SVG dynamic elements coordinate spacing
    const dynamicLensGroup = document.getElementById("grp-lens-dynamic");
    const extLineR = document.getElementById("lineExtensionR");
    const dimArrowLine = document.getElementById("lineDimensionGap");
    const dimLabelText = document.getElementById("lblDimensionText");
    
    // Scale factor: 1 mm = 1.2 pixels in SVG coordinate space
    const scale = 1.2;
    const offsetPixels = state.gapDistance * scale;
    
    // Translate the second lens group
    dynamicLensGroup.setAttribute("transform", `translate(${offsetPixels}, 0)`);
    
    // Update right vertical extension line X coordinate
    const targetX = 150 + offsetPixels;
    extLineR.setAttribute("x1", targetX);
    extLineR.setAttribute("x2", targetX);
    
    // Update dimension arrow line ending X coordinate
    dimArrowLine.setAttribute("x2", targetX);
    
    // Update text label coordinate to be centered between the two adjacent edges
    const midX = 150 + offsetPixels / 2;
    dimLabelText.setAttribute("x", midX);
    
    // Perform Compliance checking (75mm limit)
    const judgeCard = document.getElementById("gapJudgeResultCard");
    const statusLabel = document.getElementById("lblGapJudgeStatus");
    const explainLabel = document.getElementById("lblGapJudgeExplain");
    
    if (state.gapDistance <= 75) {
        // Safe: Compliant single lamp
        statusLabel.innerText = "COMPLIANT / 視為單一燈具";
        statusLabel.className = "judge-status status-compliant";
        explainLabel.innerText = `間距 ${state.gapDistance} mm ≦ 75mm，兩相鄰發光表面投影極其貼近。在光學判定上，法規准予宣告為「單一燈具 (Single Lamp)」進行審查，可完美支持流線型、貫穿式一體化尾燈設計。`;
        judgeCard.style.borderColor = "var(--success)";
    } else {
        // Danger: Fails single lamp test, must be treated as independent double lamps
        statusLabel.innerText = "NON-COMPLIANT / 判定為獨立雙燈體";
        statusLabel.className = "judge-status status-non-compliant";
        explainLabel.innerText = `間距 ${state.gapDistance} mm > 75mm，發光表面距離過大。法規禁止將其視為單一燈具，設計必須完全分立並各自滿足左右側獨立車燈的安裝間距與配光，否則認證退件！`;
        judgeCard.style.borderColor = "var(--danger)";
    }
}
