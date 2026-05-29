/**
 * UN R148 Dynamic Direction Indicator (Sequential Blinker) Simulator
 * Powered by Antigravity AI
 */

// Global State
let isPlaying = true;
let speedMultiplier = 1.0;
let currentPreset = 'compliant';
let cycleTimeMs = 0; // 0 to 1000ms loop
let lastTimestamp = 0;
let flashingMode = 'sequential'; // 'sequential' or 'static'
let isR48Violation = false;
let warningTimeout = null;

// LED Configuration
const numSegments = 10;
const ledLeftElements = [];
const ledRightElements = [];
let activeSide = 'both'; // 'left', 'right', 'both'

// Timeline Canvas Configuration
const canvas = document.getElementById('canvasTimeline');
const ctx = canvas.getContext('2d');

// Retrieve LED elements from SVG
for (let i = 0; i < numSegments; i++) {
    ledLeftElements.push(document.getElementById(`ledL-${i}`));
    ledRightElements.push(document.getElementById(`ledR-${i}`));
}

// Initialise Application
document.addEventListener('DOMContentLoaded', () => {
    // Start Blinker Loop
    requestAnimationFrame(animLoop);
    
    // Initialise Playgrounds
    updateAspectRatioPlayground();
    updateGapPlayground();
    
    // Set up controls event listeners
    const btnPlayPause = document.getElementById('btnPlayPause');
    const playIcon = document.getElementById('playIcon');
    const btnPlayPauseText = document.getElementById('btnPlayPauseText');
    
    btnPlayPause.addEventListener('click', () => {
        isPlaying = !isPlaying;
        if (isPlaying) {
            btnPlayPause.classList.add('active');
            playIcon.textContent = '⏸️';
            btnPlayPauseText.textContent = '暫停 (Pause)';
            lastTimestamp = performance.now();
        } else {
            btnPlayPause.classList.remove('active');
            playIcon.textContent = '▶️';
            btnPlayPauseText.textContent = '播放 (Play)';
        }
    });

    const btnToggleSpeed = document.getElementById('btnToggleSpeed');
    const lblSpeedText = document.getElementById('lblSpeedText');
    
    btnToggleSpeed.addEventListener('click', () => {
        if (speedMultiplier === 1.0) {
            speedMultiplier = 0.5;
            btnToggleSpeed.classList.add('active');
            lblSpeedText.textContent = '速度: 0.5x (慢動作)';
        } else {
            speedMultiplier = 1.0;
            btnToggleSpeed.classList.remove('active');
            lblSpeedText.textContent = '速度: 1.0x (標準)';
        }
    });
});

// Central Blinker Sequencer Loop
function animLoop(timestamp) {
    if (!lastTimestamp) lastTimestamp = timestamp;
    
    if (isPlaying) {
        const delta = timestamp - lastTimestamp;
        // Progress cycle time based on speed multiplier
        cycleTimeMs += delta * speedMultiplier;
        if (cycleTimeMs >= 1000) {
            cycleTimeMs = cycleTimeMs % 1000;
        }
    }
    
    lastTimestamp = timestamp;
    
    // Compute current LED states based on time and preset
    const states = getLedStatesAt(cycleTimeMs, currentPreset);
    
    // Apply states to SVG elements & handle Vertical Oscillation translation
    applyLedStates(states);
    
    // Draw timeline canvas graph
    drawTimelineGraph(cycleTimeMs);
    
    requestAnimationFrame(animLoop);
}

/**
 * Calculates whether each of the 12 LED segments is ON (true) or OFF (false)
 * at a specific millisecond in the 1000ms flashing cycle.
 */
function getLedStatesAt(time, preset) {
    const states = Array(numSegments).fill(false);
    
    // OFF Cycle (500ms to 1000ms): All off
    if (time >= 500) {
        return states;
    }
    
    // UN R48 § 6.5.7 Traditional Static Mode:
    // If the lamp is configured to flash in traditional static mode, 
    // all LEDs light up simultaneously during the ON-cycle (time < 500ms).
    if (flashingMode === 'static') {
        return Array(numSegments).fill(true);
    }
    
    // ON Cycle (0ms to 500ms): Blinker operates
    switch (preset) {
        
        case 'compliant': {
            // Compliant Sequential: Inside to outside (0 to 11), completes in 200ms
            // Each segment starts lighting up in a uniform 200ms span
            // Segment i lights up at i * (200 / 12) = i * 16.67ms
            // Latching requirement: Once lit, remains lit until the end of the ON cycle (500ms)
            const segmentInterval = 200 / numSegments;
            for (let i = 0; i < numSegments; i++) {
                if (time >= i * segmentInterval) {
                    states[i] = true;
                }
            }
            break;
        }
        
        case 'wave': {
            // Non-Compliant - Knight Rider Wave:
            // LEDs turn ON sequentially, but turn OFF after a short duration (50ms), creating a sweeping scan wave.
            // Breaking: violating latching/retention rule.
            const segmentInterval = 200 / numSegments;
            const ledDuration = 60; // LED stays lit for 60ms
            for (let i = 0; i < numSegments; i++) {
                const startTime = i * segmentInterval;
                const endTime = startTime + ledDuration;
                if (time >= startTime && time < endTime) {
                    states[i] = true;
                }
            }
            break;
        }
        
        case 'reverse': {
            // Non-Compliant - Reverse Direction:
            // Progresses from outboard (11) to inboard (0), completing in 200ms.
            // Breaking: violating progressive inboard-to-outboard rule.
            const segmentInterval = 200 / numSegments;
            for (let i = 0; i < numSegments; i++) {
                const reverseIndex = numSegments - 1 - i;
                if (time >= i * segmentInterval) {
                    states[reverseIndex] = true;
                }
            }
            break;
        }
        
        case 'slow': {
            // Non-Compliant - Timing Violator (Too Slow):
            // Progresses inboard-to-outboard, but takes 500ms to complete the sequence!
            // Segment i lights up at i * (500 / 12) = i * 41.67ms
            // Breaking: violating the strict 200ms completion limit.
            const segmentInterval = 500 / numSegments;
            for (let i = 0; i < numSegments; i++) {
                if (time >= i * segmentInterval) {
                    states[i] = true;
                }
            }
            break;
        }
        
        case 'oscillate': {
            // Non-Compliant - Vertical Oscillation:
            // Correct inboard-to-outboard sequence completing in 200ms,
            // but the LEDs physically bounce up and down during progression.
            // Breaking: violating the vertical oscillation prohibition.
            const segmentInterval = 200 / numSegments;
            for (let i = 0; i < numSegments; i++) {
                if (time >= i * segmentInterval) {
                    states[i] = true;
                }
            }
            break;
        }
    }
    
    return states;
}

// Switches which sides are actively blinking
function setBlinkerSide(side) {
    activeSide = side;
    
    // Update active state of selector buttons in HTML
    document.getElementById('btnActiveLeft').classList.remove('active');
    document.getElementById('btnActiveRight').classList.remove('active');
    document.getElementById('btnActiveBoth').classList.remove('active');
    
    if (side === 'left') {
        document.getElementById('btnActiveLeft').classList.add('active');
    } else if (side === 'right') {
        document.getElementById('btnActiveRight').classList.add('active');
    } else {
        document.getElementById('btnActiveBoth').classList.add('active');
    }
}

// Switches flashing mode (Static vs Sequential) under UN R48 § 6.5.7
function setFlashingMode(mode) {
    if (flashingMode === mode) return;
    
    // Legal check under UN R48 § 6.5.7: 
    // "A direction indicator capable of being activated in different modes (static or sequential), shall not switch between both modes once activated."
    // If the simulator is playing AND we are currently in the active flashing ON-cycle (0ms to 500ms), 
    // switching modes is a flagrant violation!
    if (isPlaying && cycleTimeMs > 0 && cycleTimeMs < 500) {
        isR48Violation = true;
        
        // Display warning banner
        const warningBanner = document.getElementById('divR48Warning');
        if (warningBanner) {
            warningBanner.style.display = 'flex';
            
            // Auto hide warning banner after 3.5 seconds
            if (warningTimeout) clearTimeout(warningTimeout);
            warningTimeout = setTimeout(() => {
                warningBanner.style.display = 'none';
            }, 3500);
        }
    }
    
    flashingMode = mode;
    
    // Toggle active state of buttons
    document.getElementById('btnModeSequential').classList.remove('active');
    document.getElementById('btnModeStatic').classList.remove('active');
    
    if (mode === 'sequential') {
        document.getElementById('btnModeSequential').classList.add('active');
    } else {
        document.getElementById('btnModeStatic').classList.add('active');
    }
    
    // Update compliance card immediately
    updateComplianceChecks(currentPreset);
}

// Applies segment states (true/false) to both left and right SVG elements
function applyLedStates(states) {
    for (let i = 0; i < numSegments; i++) {
        const lit = states[i];
        
        const elL = ledLeftElements[i];
        const elR = ledRightElements[i];
        
        // Left Blinker activation
        if (elL) {
            if (lit && (activeSide === 'left' || activeSide === 'both')) {
                elL.classList.add('lit');
            } else {
                elL.classList.remove('lit');
            }
            
            // Handle Vertical Oscillation for Left
            if (currentPreset === 'oscillate' && lit && (activeSide === 'left' || activeSide === 'both')) {
                const offset = (i % 2 === 0) ? -6 : 6;
                elL.setAttribute('transform', `translate(0, ${offset})`);
            } else {
                elL.removeAttribute('transform');
            }
        }
        
        // Right Blinker activation
        if (elR) {
            if (lit && (activeSide === 'right' || activeSide === 'both')) {
                elR.classList.add('lit');
            } else {
                elR.classList.remove('lit');
            }
            
            // Handle Vertical Oscillation for Right
            if (currentPreset === 'oscillate' && lit && (activeSide === 'right' || activeSide === 'both')) {
                const offset = (i % 2 === 0) ? -6 : 6;
                elR.setAttribute('transform', `translate(0, ${offset})`);
            } else {
                elR.removeAttribute('transform');
            }
        }
    }
}

// Preset Swapping Logic
function selectPreset(preset) {
    currentPreset = preset;
    isR48Violation = false; // Reset warning state on manual preset change
    
    const warningBanner = document.getElementById('divR48Warning');
    if (warningBanner) warningBanner.style.display = 'none';
    if (warningTimeout) clearTimeout(warningTimeout);
    
    // Reset cycle to ensure clean start
    cycleTimeMs = 0;
    
    // Update active button state
    const buttons = document.querySelectorAll('.preset-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    const activeBtnMap = {
        'compliant': 'presetCompliant',
        'wave': 'presetWave',
        'reverse': 'presetReverse',
        'slow': 'presetSlow',
        'oscillate': 'presetOscillate'
    };
    
    document.getElementById(activeBtnMap[preset]).classList.add('active');
    
    // Update Compliance Checklist & Explanations Card
    updateComplianceChecks(preset);
}

// Updates the Right Side Card Checklist and Compliance Status Badges
function updateComplianceChecks(preset) {
    const divSummary = document.getElementById('divComplianceSummary');
    const badge = document.getElementById('lblComplianceBadge');
    const explainText = document.getElementById('lblComplianceExplain');
    
    const checkDir = document.getElementById('check-direction');
    const checkRet = document.getElementById('check-retention');
    const checkTime = document.getElementById('check-timing');
    const checkOsc = document.getElementById('check-oscillation');
    const checkModelock = document.getElementById('check-modelock');
    const checkHazardsym = document.getElementById('check-hazardsym');
    
    const descDir = document.getElementById('desc-direction');
    const descRet = document.getElementById('desc-retention');
    const descTime = document.getElementById('desc-timing');
    const descOsc = document.getElementById('desc-oscillation');
    const descModelock = document.getElementById('desc-modelock');
    const descHazardsym = document.getElementById('desc-hazardsym');

    // Default: Reset all to compliant (green)
    const setCompliant = (el, textEl, text) => {
        if (!el) return;
        el.className = "checklist-item compliant";
        el.querySelector('.check-icon').textContent = "✓";
        if (textEl) textEl.innerHTML = text;
    };
    
    const setNonCompliant = (el, textEl, text) => {
        if (!el) return;
        el.className = "checklist-item non-compliant";
        el.querySelector('.check-icon').textContent = "✗";
        if (textEl) textEl.innerHTML = `<span style="color:var(--danger); font-weight:600;">法規違規：</span>` + text;
    };

    // Compliant explanations texts
    const defaultTexts = {
        dir: "由靠近車輛中心線之內側 (Inboard) 向車外側 (Outboard) 遞進。",
        ret: "點亮的光源必須持續保持點亮，直至該 ON 週期結束，不得有波浪消退或中間熄滅之情形。",
        time: "動態點亮流水過程，必須在 ON 週期開始後的 <strong>200 毫秒 (ms)</strong> 內完全結束並維持全亮。",
        osc: "點亮順序必須是平順的水平遞進，在垂直高度軸向上不得有反覆來回振盪的抖動。",
        modelock: "一旦開啟作動，在該次點亮週期中絕不允許於靜態與序列模式之間來回變更。",
        hazardsym: "雙閃警示燈點亮時，前後左右所有方向指示燈必須操作在完全相同的模式（同為靜態或同為流水）。"
    };

    // Reset items to compliant state
    setCompliant(checkDir, descDir, defaultTexts.dir);
    setCompliant(checkRet, descRet, defaultTexts.ret);
    setCompliant(checkTime, descTime, defaultTexts.time);
    setCompliant(checkOsc, descOsc, defaultTexts.osc);
    setCompliant(checkModelock, descModelock, defaultTexts.modelock);
    setCompliant(checkHazardsym, descHazardsym, defaultTexts.hazardsym);
    
    // Traditional Static Flashing Mode Handling:
    // If flashing mode is set to traditional static flashing, then all dynamic rules (Timing, Retention, etc.)
    // do not apply, and the lamp is perfectly compliant!
    if (flashingMode === 'static') {
        if (isR48Violation) {
            divSummary.className = "compliance-summary-box non-compliant";
            badge.className = "status-badge status-non-compliant";
            badge.textContent = "NON-COMPLIANT / 不符法規限制";
            explainText.innerHTML = "<b>【不合規主因：點亮中變更作動模式】</b><br>偵測到作動中切換！雖然靜態閃爍模式本身合規，但根據 <b>UN R48 § 6.5.7</b> 規定，燈指示器在啟動點亮中途不得在靜態與序列模式之間來回切換。請等待下一次點亮循環或重新選擇演示模式。";
            setNonCompliant(checkModelock, descModelock, "偵測到中途切換！燈具在啟動點亮中途不得在靜態與序列模式之間變更。");
        } else {
            divSummary.className = "compliance-summary-box compliant";
            badge.className = "status-badge status-compliant";
            badge.textContent = "COMPLIANT / 完全合規 (靜態閃爍模式)";
            explainText.innerHTML = "本燈具目前以「傳統靜態閃爍」模式運作，所有 LED 單元同步點亮與熄滅。此模式完全符合 UN R48 的基本方向燈安裝規範，因此<b>不受任何動態流水特殊限制</b>（如 1.7 長寬比、50mm 段間距、200ms 時限等，此時皆標記為合規），依法完全合規！";
        }
        return;
    }
    
    if (preset === 'compliant' && !isR48Violation) {
        divSummary.className = "compliance-summary-box compliant";
        badge.className = "status-badge status-compliant";
        badge.textContent = "COMPLIANT / 完全合規";
        explainText.innerHTML = "本段點亮順序與時序特徵完全符合聯合國 UN R48 安裝規範與 R148 燈具光學標準。車燈從靠近車輛中線內側向車側外側均勻遞進開啟，且在週期內點亮的光源均持續保持開啟（鎖存），並於 200 ms 內完成整個動態流水變化。";
    } 
    else {
        divSummary.className = "compliance-summary-box non-compliant";
        badge.className = "status-badge status-non-compliant";
        badge.textContent = "NON-COMPLIANT / 不符法規限制";
        
        let localExplain = "";
        
        if (isR48Violation) {
            localExplain += "<b>【不合規主因：點亮中變更作動模式】</b><br>偵測到作動中切換！根據 <b>UN R48 § 6.5.7</b> 規定，方向燈一旦啟動點亮，在該次點亮循環中途<b>絕對禁止在靜態與序列流水模式之間來回切換**，必須在單次循環內保持模式一致，以防止後方車輛視覺產生混亂。<br><br>";
            setNonCompliant(checkModelock, descModelock, "偵測到中途切換！方向燈在單次閃爍循環內必須保持模式一致，禁止中途任意切換變更。");
        }
        
        if (preset === 'wave') {
            localExplain += "<b>【不合規主因：波起波落（無鎖存性）】</b><br>此「掃描波浪/霓虹跑馬燈」效果在各LED單元點亮後並未保持開啟，前段光源會隨著流水向外移動而熄滅。這嚴重違反了 <b>UN R148 5.6.1.1</b> 規定（光源一旦點亮必須保持亮起，直到該點亮週期結束），對其他用路人來說，閃爍警示效果被嚴重削弱。";
            setNonCompliant(checkRet, descRet, "檢測到LED單元點亮後隨即熄滅。法規嚴禁任何形式的「波浪前進、後方消退」效果，必須維持累加鎖存！");
        } 
        else if (preset === 'reverse') {
            localExplain += "<b>【不合規主因：方向逆反】</b><br>LED單元是由外側向車輛中線內側遞進點亮。這與 <b>UN R48 6.5.3.9</b> 法規所要求的方向正好相反。法規強制要求必須自<b>車身中心線側（Inboard）朝車身側（Outboard）</b>遞進，才能提供用路人直觀的轉向暗示。";
            setNonCompliant(checkDir, descDir, "方向燈以「由外朝內」點亮。法規要求動態方向燈必須由內向外延伸，否則會誤導轉向方向意圖！");
        } 
        else if (preset === 'slow') {
            localExplain += "<b>【不合規主因：流水反應時間過慢】</b><br>此流水作動完成共耗時 500 ms。法規 <b>UN R48 § 6.5.3.9</b> 為了保障警示即時性，強制規定<b>整個順序開啟的流水變化過程，必須在 ON 週期開始後的 200 毫秒 (ms) 內完全結束</b>，其餘時間必須全亮。若流水拖曳過長，會導致後車駕駛錯失反應黃金時間。";
            setNonCompliant(checkTime, descTime, "動態順序開啟過程共計耗時 500ms（法規限制 ≦ 200ms）。此作動太慢，會延誤警示，判定為不合格！");
        } 
        else if (preset === 'oscillate') {
            localExplain += "<b>【不合規主因：垂直軸向抖動】</b><br>該動態方向燈在由內向外點亮時，LED區段垂直位置反覆上下抖動，這在法規 <b>UN R48 6.5.3.9</b> 中屬於被禁止的<b>垂直振盪 (Vertical Oscillation)</b>。作動路徑至多允許單向垂直爬升，嚴禁上下反覆彈跳。";
            setNonCompliant(checkOsc, descOsc, "點亮路徑在垂直軸上反覆劇烈跳躍（上下彈跳）。法規要求流水路徑必須平滑且無垂直方向反覆振盪！");
        }
        
        explainText.innerHTML = localExplain;
    }
}

// Live Timline Oscilloscope Renderer via HTML5 Canvas
function drawTimelineGraph(currentTime) {
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.fillStyle = '#05080f';
    ctx.fillRect(0, 0, width, height);
    
    // Draw time grid lines (every 100ms from 0 to 1000ms)
    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 1;
    for (let t = 0; t <= 1000; t += 100) {
        const x = (t / 1000) * (width - 40) + 30;
        ctx.beginPath();
        ctx.moveTo(x, 20);
        ctx.lineTo(x, height - 25);
        ctx.stroke();
        
        // Draw grid labels (shifted down to height - 5 = 145px)
        ctx.fillStyle = 'var(--text-muted)';
        ctx.font = '9px Outfit, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`${t}ms`, x, height - 5);
    }

    // Draw grid bounding box (top shifted to 20 to create space for top label)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.strokeRect(30, 20, width - 40, height - 45);
    
    // Draw 200ms Law Boundary Line (Red Dotted)
    const x200 = (200 / 1000) * (width - 40) + 30;
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(x200, 20);
    ctx.lineTo(x200, height - 25);
    ctx.stroke();
    ctx.setLineDash([]); // Reset
    
    // Draw "200ms Limit" tag at the top empty area (perfectly placed inside top red ellipse)
    ctx.fillStyle = '#ef4444'; // matched exactly to red line color
    ctx.font = 'bold 9px Outfit, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('200ms Limit', x200, 13);

    // Calculate sequence completion time (when the last segment turns ON)
    let completionTime = 0;
    if (flashingMode === 'sequential') {
        if (currentPreset === 'slow') {
            completionTime = (numSegments - 1) * (500 / numSegments);
        } else {
            completionTime = (numSegments - 1) * (200 / numSegments);
        }
    }

    // Draw Sequence Completion Time Line (Yellow)
    if (completionTime > 0) {
        const xComplete = (completionTime / 1000) * (width - 40) + 30;
        ctx.strokeStyle = '#eab308'; // beautiful yellow-500
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(xComplete, 20);
        ctx.lineTo(xComplete, height - 25);
        ctx.stroke();
        
        // Draw Sequence Completion text tag outside the grid bottom boundary (placed at y = 135px, perfectly outside the grid without any intersection)
        ctx.fillStyle = '#eab308'; // matched exactly to yellow line color
        ctx.font = 'bold 9px Outfit, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`Sequence: ${completionTime}ms`, xComplete, 135);
    }

    // Draw active signal graph blocks for all 10 segments
    const numRows = numSegments;
    const rowHeight = 9; // explicitly set to 9px to create gaps at top (5px) and bottom (13px) of the grid
    const activeAmberColor = 'rgba(245, 158, 11, 0.85)';
    const offGrayColor = 'rgba(255, 255, 255, 0.05)';
    
    for (let r = 0; r < numRows; r++) {
        // Stack row 0 at bottom, 9 at top
        const y = 25 + (numRows - 1 - r) * rowHeight;
        
        ctx.fillStyle = 'rgba(255,255,255,0.15)';
        ctx.font = '8px Outfit, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(`L${r}`, 25, y + 6);
        
        // Draw the background off line
        ctx.fillStyle = offGrayColor;
        ctx.fillRect(30, y + 2, width - 40, 4);
        
        // Calculate and draw ON state blocks
        const slices = 120;
        const sliceWidth = (width - 40) / slices;
        
        ctx.fillStyle = activeAmberColor;
        for (let s = 0; s < slices; s++) {
            const timeSlice = (s / slices) * 1000;
            const ledStates = getLedStatesAt(timeSlice, currentPreset);
            if (ledStates[r]) {
                const xSlice = 30 + s * sliceWidth;
                ctx.fillRect(xSlice, y, sliceWidth + 0.5, 7);
            }
        }
    }
    
    // Draw Current Time vertical indicator line
    const xCursor = (currentTime / 1000) * (width - 40) + 30;
    ctx.strokeStyle = '#22d3ee';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(xCursor, 20);
    ctx.lineTo(xCursor, height - 25);
    ctx.stroke();
    
    // Glow dot on cursor
    ctx.fillStyle = '#22d3ee';
    ctx.beginPath();
    ctx.arc(xCursor, height - 25, 3.5, 0, Math.PI * 2);
    ctx.fill();
}

/**
 * -----------------------------------------------------------------
 * PLAYGROUND 1: ASPECT RATIO 1.7
 * Calculates and visualizes the R148 horizontal/vertical ratio check.
 * -----------------------------------------------------------------
 */
function updateAspectRatioPlayground() {
    const widthVal = parseInt(document.getElementById('sliderWidth').value);
    const heightVal = parseInt(document.getElementById('sliderHeight').value);
    
    // Update numerical value displays
    document.getElementById('lblWidthValue').textContent = `${widthVal} mm`;
    document.getElementById('lblHeightValue').textContent = `${heightVal} mm`;
    
    // Calculate aspect ratio
    const ratio = (widthVal / heightVal).toFixed(2);
    
    // Update compliance status cards and SVGs
    const card = document.getElementById('ratioJudgeResultCard');
    const statusText = document.getElementById('lblRatioJudgeStatus');
    const explainText = document.getElementById('lblRatioJudgeExplain');
    
    const isCompliant = ratio >= 1.7;
    
    if (isCompliant) {
        card.style.borderColor = 'rgba(16, 185, 129, 0.25)';
        card.style.background = 'rgba(16, 185, 129, 0.03)';
        statusText.className = "judge-status status-compliant";
        statusText.innerHTML = `長寬比: ${ratio} / 依法合規 ✓`;
        explainText.innerHTML = `長寬比為 ${ratio} ≧ 1.7。此比例符合 <b>UN R148 § 5.6.2</b> 要求。發光視表面有足夠的水平伸展度，依法<b>核准並允許</b>設計為動態流水點亮效果！`;
    } else {
        card.style.borderColor = 'rgba(239, 68, 68, 0.25)';
        card.style.background = 'rgba(239, 68, 68, 0.03)';
        statusText.className = "judge-status status-non-compliant";
        statusText.innerHTML = `長寬比: ${ratio} / 依法禁用 ✗`;
        explainText.innerHTML = `長寬比為 ${ratio} < 1.7。不符合法規要求的 1.7 最小長寬比限制。此款車燈外觀過於短胖或接近正方形，<b>依法禁止使用任何動態流水作動</b>，只能採用恆亮閃爍。`;
    }
    
    // Update SVG elements visually to reflect sliders
    const rectLamp = document.getElementById('rectRatioLamp');
    const rectBoundary = document.getElementById('rectRatioBoundary');
    
    // Map slider values (100 to 450 width, 20 to 200 height) to SVG scale pixels
    // SVG base box is 320x220, max drawing box for lamp is increased to fit the canvas perfectly
    // Scale widths: 100mm -> 100px, 450mm -> 280px (margin is only 20px at max width)
    // Scale heights: 20mm -> 30px, 200mm -> 140px (margin is 40px at max height)
    const mappedWidth = 100 + ((widthVal - 100) / (450 - 100)) * (280 - 100);
    const mappedHeight = 30 + ((heightVal - 20) / (200 - 20)) * (140 - 30);
    
    // Center the dynamic lamp rectangle in the SVG canvas (base coordinates centered around (160, 105))
    const startX = 160 - mappedWidth / 2;
    const startY = 105 - mappedHeight / 2;
    
    // Apply coordinates to SVG shapes
    rectLamp.setAttribute('x', startX);
    rectLamp.setAttribute('y', startY);
    rectLamp.setAttribute('width', mappedWidth);
    rectLamp.setAttribute('height', mappedHeight);
    
    rectBoundary.setAttribute('x', startX);
    rectBoundary.setAttribute('y', startY);
    rectBoundary.setAttribute('width', mappedWidth);
    rectBoundary.setAttribute('height', mappedHeight);
    
    // Update Lamp center text
    const lblText = document.getElementById('lblRatioLampText');
    lblText.setAttribute('x', 160);
    lblText.setAttribute('y', 105 + 4);
    
    if (mappedWidth < 120 || mappedHeight < 40) {
        lblText.setAttribute('font-size', '9');
    } else {
        lblText.setAttribute('font-size', '12');
    }
    
    // Update dimension lines position to align perfectly with resized shapes
    // Horizontal Arrow line (placed 20px below bottom edge of rectangle)
    const lineW = document.getElementById('lineRatioWidth');
    const arrowY = startY + mappedHeight + 15;
    lineW.setAttribute('x1', startX);
    lineW.setAttribute('y1', arrowY);
    lineW.setAttribute('x2', startX + mappedWidth);
    lineW.setAttribute('y2', arrowY);
    
    const lblWText = document.getElementById('lblDimensionWidthText');
    lblWText.setAttribute('x', 160);
    lblWText.setAttribute('y', arrowY + 13);
    lblWText.textContent = `${widthVal} mm`;
    
    // Vertical Arrow line (placed 12px right of right edge of rectangle)
    const lineH = document.getElementById('lineRatioHeight');
    const arrowX = startX + mappedWidth + 12;
    lineH.setAttribute('x1', arrowX);
    lineH.setAttribute('y1', startY);
    lineH.setAttribute('x2', arrowX);
    lineH.setAttribute('y2', startY + mappedHeight);
    
    const lblHText = document.getElementById('lblDimensionHeightText');
    lblHText.setAttribute('x', arrowX + 8);
    lblHText.setAttribute('y', 105);
    lblHText.textContent = `${heightVal} mm`;
    
    // Extension Dashlines alignment
    document.getElementById('lineExtW-L').setAttribute('x1', startX);
    document.getElementById('lineExtW-L').setAttribute('y1', startY + mappedHeight);
    document.getElementById('lineExtW-L').setAttribute('x2', startX);
    document.getElementById('lineExtW-L').setAttribute('y2', arrowY + 4);
    
    document.getElementById('lineExtW-R').setAttribute('x1', startX + mappedWidth);
    document.getElementById('lineExtW-R').setAttribute('y1', startY + mappedHeight);
    document.getElementById('lineExtW-R').setAttribute('x2', startX + mappedWidth);
    document.getElementById('lineExtW-R').setAttribute('y2', arrowY + 4);
    
    document.getElementById('lineExtH-T').setAttribute('x1', startX + mappedWidth);
    document.getElementById('lineExtH-T').setAttribute('y1', startY);
    document.getElementById('lineExtH-T').setAttribute('x2', arrowX + 4);
    document.getElementById('lineExtH-T').setAttribute('y2', startY);
    
    document.getElementById('lineExtH-B').setAttribute('x1', startX + mappedWidth);
    document.getElementById('lineExtH-B').setAttribute('y1', startY + mappedHeight);
    document.getElementById('lineExtH-B').setAttribute('x2', arrowX + 4);
    document.getElementById('lineExtH-B').setAttribute('y2', startY + mappedHeight);
}

/**
 * -----------------------------------------------------------------
 * PLAYGROUND 2: LED SEGMENT PROJECTED GAP
 * Calculates and visualizes the R148 spacing gap (50mm max limit).
 * -----------------------------------------------------------------
 */
function updateGapPlayground() {
    const gapVal = parseInt(document.getElementById('sliderGap').value);
    
    // Update numerical value display
    document.getElementById('lblGapValue').textContent = `${gapVal} mm`;
    
    // Calculate Spacing compliance (50mm limit)
    const card = document.getElementById('gapJudgeResultCard');
    const statusText = document.getElementById('lblGapJudgeStatus');
    const explainText = document.getElementById('lblGapJudgeExplain');
    
    const isCompliant = gapVal <= 50;
    
    if (isCompliant) {
        card.style.borderColor = 'rgba(16, 185, 129, 0.25)';
        card.style.background = 'rgba(16, 185, 129, 0.03)';
        statusText.className = "judge-status status-compliant";
        statusText.innerHTML = `間距: ${gapVal}mm / 依法合規 ✓`;
        explainText.innerHTML = `相鄰間距為 ${gapVal}mm ≦ 50mm。發光區段符合 <b>UN R148 § 5.6.1.3</b> 的視覺緊密性規定，在視覺光學上依法<b>判定為單一燈具</b>組合，允許流水連貫點亮！`;
    } else {
        card.style.borderColor = 'rgba(239, 68, 68, 0.25)';
        card.style.background = 'rgba(239, 68, 68, 0.03)';
        statusText.className = "judge-status status-non-compliant";
        statusText.innerHTML = `間距: ${gapVal}mm / 依法不合規 ✗`;
        explainText.innerHTML = `相鄰間距為 ${gapVal}mm > 50mm。違反法規關於流水段間距最大 50mm 的限制！此間隔過寬，這些發光區段在法規審驗上將被<b>判定為多個獨立燈具</b>，嚴禁進行流水順序點亮。`;
    }
    
    // Update SVG Spacing visually
    const movableGrp = document.getElementById('grpMovableSegment');
    
    // Map slider mm values (10mm to 95mm) to SVG pixels width translation
    // Segment 1 right edge is at X = 20 + 110 = 130
    // Segment 2 starting X is 130px inside grpMovableSegment.
    // If translate distance is d, the actual gap in pixels is d.
    // Scale factor: 10mm gap -> 15px translation, 95mm gap -> 55px translation (max X = 130 + 55 + 110 = 295px, perfectly centered!)
    const mappedGapPx = 15 + ((gapVal - 10) / (95 - 10)) * (55 - 15);
    
    // Translate segment 2 dynamically
    movableGrp.setAttribute('transform', `translate(${mappedGapPx}, 0)`);
    
    // Update Gap Dimension Arrow overlay
    const lineGap = document.getElementById('lineGapDimension');
    const xLeft = 130;
    const xRight = 130 + mappedGapPx;
    const arrowY = 110;
    
    lineGap.setAttribute('x1', xLeft);
    lineGap.setAttribute('y1', arrowY);
    lineGap.setAttribute('x2', xRight);
    lineGap.setAttribute('y2', arrowY);
    
    // Dimension Text
    const lblGapText = document.getElementById('lblGapDimensionText');
    lblGapText.setAttribute('x', 130 + mappedGapPx / 2);
    lblGapText.textContent = `${gapVal} mm`;
    
    // Extension Dashlines positioning
    document.getElementById('lineGapExtL').setAttribute('x1', xLeft);
    document.getElementById('lineGapExtL').setAttribute('x2', xLeft);
    document.getElementById('lineGapExtR').setAttribute('x1', xRight);
    document.getElementById('lineGapExtR').setAttribute('x2', xRight);
}
