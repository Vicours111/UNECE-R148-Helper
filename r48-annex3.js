/**
 * UN Regulation No. 48 Annex 3 Interactive Simulation Logic
 * Author: Antigravity AI Pair Programmer
 * Date: 2026-05-27
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initPart12();
    initPart34();
    initPart5();
    initPart6();
    initPart7();
    initGlobalKeyHighlight();
});

// ==========================================
// 1. NAVIGATION & TAB CONTROL
// ==========================================
function initNavigation() {
    const navButtons = document.querySelectorAll('.annex-nav-btn');
    const panels = document.querySelectorAll('.annex-panel');
    const globalKeyItems = document.querySelectorAll('.key-item');

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            
            // Toggle Nav active
            navButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Toggle Panel active
            panels.forEach(p => p.classList.remove('active'));
            const activePanel = document.getElementById(`panel-${targetTab}`);
            activePanel.classList.add('active');

            // Reset any key highlights when switching tabs
            globalKeyItems.forEach(k => k.classList.remove('active'));
            document.querySelectorAll('.part-element, .highlight-plane').forEach(el => {
                el.classList.remove('highlighted');
            });

            // Trigger canvas redraws if needed
            if (targetTab === 'part5') {
                renderExamplePart5();
            } else if (targetTab === 'part6') {
                renderCasePart6();
            } else if (targetTab === 'part7') {
                runPart7DecisionTree();
            }
        });
    });
}

// ==========================================
// GLOBAL GLOSSARY (KEY) HIGHLIGHT LINKING
// ==========================================
function initGlobalKeyHighlight() {
    const keyItems = document.querySelectorAll('.key-item');

    keyItems.forEach(item => {
        const keyId = item.getAttribute('data-key');

        const highlightElements = (isHighlight) => {
            // Find active panel
            const activePanel = document.querySelector('.annex-panel.active');
            if (!activePanel) return;

            // Find all matching elements in active panel
            const matchingSvgElements = activePanel.querySelectorAll(`[data-part="${keyId}"]`);
            matchingSvgElements.forEach(el => {
                if (isHighlight) {
                    el.classList.add('highlighted');
                } else {
                    el.classList.remove('highlighted');
                }
            });
        };

        // Temporary hover highlighting
        item.addEventListener('mouseenter', () => {
            if (!item.classList.contains('active')) {
                highlightElements(true);
            }
        });

        item.addEventListener('mouseleave', () => {
            if (!item.classList.contains('active')) {
                highlightElements(false);
            }
        });

        // Toggle sticky highlight on click
        item.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Remove active from all other keys
            keyItems.forEach(k => {
                if (k !== item && k.classList.contains('active')) {
                    k.classList.remove('active');
                    // Un-highlight elements of other keys
                    const otherKey = k.getAttribute('data-key');
                    const activePanel = document.querySelector('.annex-panel.active');
                    if (activePanel) {
                        activePanel.querySelectorAll(`[data-part="${otherKey}"]`).forEach(el => el.classList.remove('highlighted'));
                    }
                }
            });

            // Toggle current
            if (isActive) {
                item.classList.remove('active');
                highlightElements(false);
            } else {
                item.classList.add('active');
                highlightElements(true);
            }
        });
    });
}

// ==========================================
// 2. PART 1 & 2: SURFACE BASICS & SCREEN BLOCKER
// ==========================================
function initPart12() {
    const sliderTop = document.getElementById('sliderTopScreen');
    const sliderBottom = document.getElementById('sliderBottomScreen');
    const lblTop = document.getElementById('lblTopScreenVal');
    const lblBottom = document.getElementById('lblBottomScreenVal');
    const chkRays = document.getElementById('chkShowLightRays');
    const btnIllum = document.getElementById('btnShowIllum');
    const btnEmit = document.getElementById('btnShowEmit');

    const grpTop = document.getElementById('grp-top-screen');
    const grpBottom = document.getElementById('grp-bottom-screen');
    const lineResulting = document.getElementById('line-resulting-illum');
    const grpRays = document.getElementById('grp-light-rays');
    const apertureHeightText = document.getElementById('valApertureHeight');

    const highlight1 = document.getElementById('highlight-surface-1');
    const highlight5 = document.getElementById('highlight-surface-5');
    const highlight6 = document.getElementById('highlight-surface-6');

    const lblTitle = document.getElementById('lblConceptTitle');
    const lblDesc = document.getElementById('lblConceptDetail');

    let mode = 'illum'; // 'illum' or 'emit'

    function update() {
        const topVal = parseInt(sliderTop.value);
        const bottomVal = parseInt(sliderBottom.value);

        // Update slider labels
        lblTop.textContent = `${topVal} mm`;
        lblBottom.textContent = `${bottomVal} mm`;

        // Translate screen graphics in SVG (Y direction)
        // Top screen moves down: Y starts at 0, goes down by topVal. Max slider Y is 110.
        // In SVG, screen original height is 90. translation matches slider value.
        const topTranslateY = Math.min(topVal, 105);
        grpTop.setAttribute('transform', `translate(0, ${topTranslateY - 90})`);

        // Bottom screen moves up: Y starts at 260, goes up. Original Y is 260.
        // translation goes up (negative Y)
        const bottomTranslateY = Math.min(bottomVal, 105);
        grpBottom.setAttribute('transform', `translate(0, ${-bottomTranslateY + 90})`);

        // Calculate blocked ranges
        // Original reflector aperture height: Y = 65 to Y = 285. Height = 220.
        const apertureTopY = 65;
        const apertureBottomY = 285;

        // Bottom edge of top screen
        const topEdgeY = topTranslateY; 
        // Top edge of bottom screen
        const bottomEdgeY = 350 - bottomTranslateY; 

        // Resulting unblocked interval
        const resultTopY = Math.max(apertureTopY, topEdgeY);
        const resultBottomY = Math.min(apertureBottomY, bottomEdgeY);

        let unblockedHeight = 0;
        if (resultTopY < resultBottomY) {
            unblockedHeight = resultBottomY - resultTopY;
            lineResulting.setAttribute('y1', resultTopY);
            lineResulting.setAttribute('y2', resultBottomY);
            lineResulting.setAttribute('opacity', '0.85');
        } else {
            lineResulting.setAttribute('opacity', '0');
        }

        apertureHeightText.textContent = `${Math.round(unblockedHeight)} mm`;

        // Update surface fills highlighting
        if (mode === 'illum') {
            highlight1.classList.add('active');
            highlight6.classList.add('active');
            highlight5.classList.remove('active');
        } else {
            highlight1.classList.remove('active');
            highlight6.classList.remove('active');
            highlight5.classList.add('active');
        }

        // Trace light rays dynamically
        grpRays.innerHTML = '';
        if (chkRays.checked) {
            const numRays = 11;
            const srcX = 120;
            const srcY = 175;
            const lensX = 280;

            for (let i = 0; i < numRays; i++) {
                // Ray Y position on aperture
                const rayY = apertureTopY + i * (220 / (numRays - 1));

                // Parabolic shape approximation: X = 60 + (Y - 175)^2 / 200
                const refX = 60 + Math.pow(rayY - 175, 2) / 200;

                // Path 1: Source to Reflector
                const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                path1.setAttribute('x1', srcX);
                path1.setAttribute('y1', srcY);
                path1.setAttribute('x2', refX);
                path1.setAttribute('y2', rayY);
                path1.setAttribute('stroke', '#eab308');
                path1.setAttribute('stroke-width', '1.5');
                path1.setAttribute('opacity', '0.45');
                grpRays.appendChild(path1);

                // Path 2: Reflector to Lens (Horizontal)
                // Check if blocked by top or bottom screens at X = 215 (screen center)
                let blocked = false;
                let endX = 450;
                
                if (rayY < topEdgeY) {
                    blocked = true;
                    endX = 215; // stops at top screen
                } else if (rayY > bottomEdgeY) {
                    blocked = true;
                    endX = 215; // stops at bottom screen
                }

                const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                path2.setAttribute('x1', refX);
                path2.setAttribute('y1', rayY);
                path2.setAttribute('x2', endX);
                path2.setAttribute('y2', rayY);
                
                if (blocked) {
                    path2.setAttribute('stroke', '#ef4444');
                    path2.setAttribute('stroke-dasharray', '2 2');
                    path2.setAttribute('opacity', '0.2');
                } else {
                    path2.setAttribute('stroke', '#eab308');
                    path2.setAttribute('opacity', '0.7');
                    
                    // Show exiting glow rays after lens L (X=280 to 450)
                    const pathGlow = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                    pathGlow.setAttribute('x1', lensX);
                    pathGlow.setAttribute('y1', rayY);
                    pathGlow.setAttribute('x2', 450);
                    pathGlow.setAttribute('y2', rayY);
                    pathGlow.setAttribute('stroke', '#06b6d4');
                    pathGlow.setAttribute('stroke-width', '2.5');
                    pathGlow.setAttribute('opacity', '0.25');
                    grpRays.appendChild(pathGlow);
                }
                grpRays.appendChild(path2);
            }
        }
    }

    sliderTop.addEventListener('input', update);
    sliderBottom.addEventListener('input', update);
    chkRays.addEventListener('change', update);

    btnIllum.addEventListener('click', () => {
        mode = 'illum';
        btnIllum.classList.add('active');
        btnEmit.classList.remove('active');
        
        lblTitle.textContent = "照明表面 (Illuminating Surface)";
        lblDesc.innerHTML = `指燈具反射鏡口徑（或投影透鏡）在與基準軸垂直的平面上的正投影。如圖中<b>綠色虛線段 [1]</b> 所示。<br><br>
        <b>遮板(Screen) 的影射規則 (Part 2)：</b>當設計中有阻擋光線的邊緣遮板存在時，必須利用這些遮板的投影來<b>扣除被阻擋的面積</b>。拖動滑桿模擬遮板推入光路，最終的照明表面（右側綠色實線）會被動態截除，這直接影響了「法規最小投影視表面面積」的核算基準。`;
        
        update();
    });

    btnEmit.addEventListener('click', () => {
        mode = 'emit';
        btnEmit.classList.add('active');
        btnIllum.classList.remove('active');
        
        lblTitle.textContent = "發光表面 (Light-emitting Surface)";
        lblDesc.innerHTML = `指車燈外罩（Outer Lens L）上，由製造商在器件申報圖面上所明確宣告的<b>「發光區域」</b>面。如圖中<b>橙色虛線段 [5]</b> 所示。<br><br>
        <b>外燈罩折射原理 (Part 1)：</b>如果外燈罩具有折射網格（Textured Lens），那麼光源發出的光線將在整個被照亮的區域產生擴散。因此法規允許將<b>整片被照亮的外罩外表面</b>，全部申報為發光表面 [5]。`;
        
        update();
    });

    // Initialize
    update();
}

// ==========================================
// 3. PART 3 & 4: APPARENT SURFACE PROJECTION
// ==========================================
function initPart34() {
    const sliderAngle = document.getElementById('sliderAngle');
    const lblAngleVal = document.getElementById('lblAngleVal');
    const lblAngleTheta = document.getElementById('lblAngleTheta');
    const valCosine = document.getElementById('valCosineShrink');
    const btnProjIllum = document.getElementById('btnProjIllum');
    const btnProjEmit = document.getElementById('btnProjEmit');
    const lblProjMethod = document.getElementById('lblProjMethod');
    const lineApparent = document.getElementById('line-apparent-6');
    const lineRay = document.getElementById('line-ray-8');
    const arcAngle = document.getElementById('arc-angle-4');
    const polyHatch = document.getElementById('poly-hatch-bound');
    const connTop = document.getElementById('proj-conn-top');
    const connBottom = document.getElementById('proj-conn-bottom');
    const lblApparentTag = document.getElementById('lblApparentSurfaceTag');

    let method = 'illum'; // 'illum' or 'emit'

    function update() {
        const angleDeg = parseInt(sliderAngle.value);
        const angleRad = angleDeg * Math.PI / 180;
        const cosValue = Math.cos(angleRad);

        // Update text labels
        lblAngleVal.textContent = `${angleDeg}°`;
        lblAngleTheta.textContent = `θ = ${angleDeg}°`;
        valCosine.textContent = `${(cosValue * 100).toFixed(1)}% (${cosValue.toFixed(3)} 投影率)`;

        // Visual Constants
        const lensCenterY = 175;
        const lensHeight = 150; // Y = 100 to 250
        const projectionPlaneX = 380;

        // Dynamic apparent surface height (scaled by cos(theta))
        const appHeight = lensHeight * cosValue;
        const appTopY = lensCenterY - appHeight / 2;
        const appBottomY = lensCenterY + appHeight / 2;

        // Update Apparent Surface line
        lineApparent.setAttribute('y1', appTopY);
        lineApparent.setAttribute('y2', appBottomY);

        // Update Projection Connection lines (dotted guides)
        connTop.setAttribute('y2', appTopY);
        connBottom.setAttribute('y2', appBottomY);

        // Update Hatch Area points
        polyHatch.setAttribute('points', `200,100 ${projectionPlaneX},${appTopY} ${projectionPlaneX},${appBottomY} 200,250`);

        // Update Ray of Observation (8) vector
        // Starts at (200, 175) and goes towards the observation angle
        const rayLength = 220;
        const destX = 200 + rayLength * Math.cos(angleRad);
        const destY = lensCenterY + rayLength * Math.sin(angleRad);
        lineRay.setAttribute('x2', destX);
        lineRay.setAttribute('y2', destY);

        // Update Angle curve arc (4)
        // Drawn at radius 50. From (250, 175) to (200 + 50*cos, 175 + 50*sin)
        const arcRadius = 50;
        const arcX = 200 + arcRadius * Math.cos(angleRad);
        const arcY = lensCenterY + arcRadius * Math.sin(angleRad);
        
        let largeArcFlag = 0;
        let sweepFlag = angleDeg < 0 ? 0 : 1;
        
        arcAngle.setAttribute('d', `M 250,175 A ${arcRadius},${arcRadius} 0 0,${sweepFlag} ${arcX},${arcY}`);

        // Update coloring and tags based on method
        if (method === 'illum') {
            lineApparent.setAttribute('stroke', '#06b6d4'); // Cyan
            lineApparent.setAttribute('data-part', '6');
            lblApparentTag.textContent = "基於照明表面視表面 [6]";
            lblApparentTag.setAttribute('fill', '#06b6d4');
            polyHatch.setAttribute('fill', 'url(#diagonalHatch)');
        } else {
            lineApparent.setAttribute('stroke', '#ef4444'); // Red
            lineApparent.setAttribute('data-part', '7a');
            lblApparentTag.textContent = "基於外罩發光視表面 [7a]";
            lblApparentTag.setAttribute('fill', '#ef4444');
            polyHatch.setAttribute('fill', 'url(#diagonalHatchRed)');
        }
    }

    sliderAngle.addEventListener('input', update);

    btnProjIllum.addEventListener('click', () => {
        method = 'illum';
        btnProjIllum.classList.add('active');
        btnProjEmit.classList.remove('active');
        lblProjMethod.textContent = "基於照明表面投影 (Part 3)";
        update();
    });

    btnProjEmit.addEventListener('click', () => {
        method = 'emit';
        btnProjEmit.classList.add('active');
        btnProjIllum.classList.remove('active');
        lblProjMethod.textContent = "基於發光表面投影 (Part 4)";
        update();
    });

    // Initialize
    update();
}

// ==========================================
// 4. PART 5: 9 CLASSIC STRUCTURAL EXAMPLES
// ==========================================
const example5Data = {
    "1": {
        title: "Example 1: 光源與反射鏡 + textured 外燈罩 (紋理燈罩必須計入)",
        focus: "在此案例中，由於外燈罩具有折射花紋 (Textured Outer Lens L)，它能將光線擴散。因此，發光視表面的邊界「7a」會完全延伸至整個被光學照亮的外燈罩外表面邊緣！",
        desc: "發光視表面判定 (Apparent Surface 7a)：因為具有折射紋理，外罩全表面被包含在內。在此結構下，發光視表面 7b (排除外燈罩) 的宣告條款是不適用的，因為紋理燈罩對配光擴散起到了核心光學作用，不得剔除。",
        svg: `
            <!-- Reflector -->
            <path d="M 60,30 Q 120,120 60,210" fill="none" stroke="#64748b" stroke-width="8" class="part-element" data-part="R" />
            <!-- Source -->
            <circle cx="100" cy="120" r="20" fill="url(#bulbGlow)" />
            <circle cx="100" cy="120" r="6" fill="#eab308" stroke="#fff" class="part-element" data-part="S" />
            <!-- Textured Outer Lens -->
            <line x1="220" y1="20" x2="220" y2="220" stroke="#06b6d4" stroke-width="6" class="part-element" data-part="L" />
            <g stroke="rgba(255,255,255,0.4)" stroke-width="1.5">
                <line x1="220" y1="40" x2="223" y2="45" /><line x1="220" y1="80" x2="223" y2="85" />
                <line x1="220" y1="120" x2="223" y2="125" /><line x1="220" y1="160" x2="223" y2="165" />
                <line x1="220" y1="200" x2="223" y2="205" />
            </g>
            <!-- Highlight Apparent Surface 7a -->
            <line x1="228" y1="35" x2="228" y2="205" stroke="#06b6d4" stroke-width="10" stroke-linecap="round" id="hl-part5-7a" class="part-element highlight-plane active" data-part="7a" />
            <!-- Dotted guides -->
            <line x1="60" y1="35" x2="228" y2="35" stroke="rgba(255,255,255,0.15)" stroke-dasharray="2 2" />
            <line x1="60" y1="205" x2="228" y2="205" stroke="rgba(255,255,255,0.15)" stroke-dasharray="2 2" />
            <!-- Axis -->
            <line x1="30" y1="120" x2="320" y2="120" stroke="#6366f1" stroke-width="1.5" stroke-dasharray="6 3" class="part-element" data-part="2" />
            <circle cx="220" cy="120" r="5" fill="#6366f1" class="part-element" data-part="3" />
            <!-- Labels -->
            <text x="238" y="125" font-family="'Outfit'" font-size="10" font-weight="700" fill="#06b6d4">Apparent Surface 7a</text>
        `
    },
    "2": {
        title: "Example 2: 反射鏡 + non-textured 外燈罩 (排除燈罩宣告)",
        focus: "在此案例中，外罩是不具折射花紋的透明平板 (Non-textured Outer Lens L)。此時，發光視表面有兩種判定：7a 是投影到外罩的全幅；而製造商可選擇套用 2.10.2 (b) 排除外燈罩，此時視表面為 7b（直接收縮至反射鏡口徑正投影）。",
        desc: "在無折射外燈罩下，光線無阻擋透過。若套用 7b 宣告（排除外燈罩），投影視表面寬度僅由內部反射鏡（Reflector R）的反射口徑投影決定（即 Y=35 到 Y=205），其邊界得以被精準控制，不會因巨大外燈罩而強制攤平發光面積。",
        svg: `
            <!-- Reflector -->
            <path d="M 60,30 Q 120,120 60,210" fill="none" stroke="#64748b" stroke-width="8" class="part-element" data-part="R" />
            <!-- Source -->
            <circle cx="100" cy="120" r="20" fill="url(#bulbGlow)" />
            <circle cx="100" cy="120" r="6" fill="#eab308" stroke="#fff" class="part-element" data-part="S" />
            <!-- Smooth Transparent Lens -->
            <line x1="220" y1="20" x2="220" y2="220" stroke="#38bdf8" stroke-width="4" class="part-element" data-part="L" />
            <!-- Highlight Apparent Surface 7a (with lens) -->
            <line x1="228" y1="20" x2="228" y2="220" stroke="#06b6d4" stroke-width="8" stroke-linecap="round" id="hl-part5-7a" class="part-element highlight-plane active" data-part="7a" />
            <!-- Highlight Apparent Surface 7b (without lens) -->
            <line x1="224" y1="35" x2="224" y2="205" stroke="#ef4444" stroke-width="12" stroke-linecap="round" id="hl-part5-7b" class="part-element highlight-plane" data-part="7b" />
            <!-- Dotted guides for R -->
            <line x1="60" y1="35" x2="224" y2="35" stroke="rgba(239,68,68,0.25)" stroke-dasharray="2 2" />
            <line x1="60" y1="205" x2="224" y2="205" stroke="rgba(239,68,68,0.25)" stroke-dasharray="2 2" />
            <!-- Axis -->
            <line x1="30" y1="120" x2="320" y2="120" stroke="#6366f1" stroke-width="1.5" stroke-dasharray="6 3" class="part-element" data-part="2" />
            <circle cx="220" cy="120" r="5" fill="#6366f1" class="part-element" data-part="3" />
            <!-- Labels -->
            <text x="238" y="105" font-family="'Outfit'" font-size="9" fill="#06b6d4" id="txt-lbl-7a">7a (含外罩)</text>
            <text x="238" y="140" font-family="'Outfit'" font-size="9" fill="#ef4444" id="txt-lbl-7b" style="display:none;">7b (排除外罩)</text>
        `
    },
    "3": {
        title: "Example 3: 反射鏡 + 內透鏡 + textured 外燈罩 (內外雙光學擴散)",
        focus: "在此案例中，光源後方有反射鏡，前方設有內透鏡 (Inner Optical Part IO)，最外側是折射外燈罩。因為外燈罩具有紋理折射，因此視表面 7a 會擴大到整片被照射到的外燈罩外表面。",
        desc: "內透鏡 IO 在這裡被外罩 L 完全覆蓋。由於外罩具有折射花紋，無論內透鏡如何縮小，最終的發光視表面投影面積 7a 仍然必須以光線在整個外罩上照亮的範圍做為基準計算，不得排除外罩。",
        svg: `
            <!-- Reflector -->
            <path d="M 60,30 Q 120,120 60,210" fill="none" stroke="#64748b" stroke-width="8" class="part-element" data-part="R" />
            <!-- Source -->
            <circle cx="100" cy="120" r="20" fill="url(#bulbGlow)" />
            <circle cx="100" cy="120" r="6" fill="#eab308" stroke="#fff" class="part-element" data-part="S" />
            <!-- Inner Optical Lens (IO) -->
            <path d="M 150,55 L 150,185" stroke="#a855f7" stroke-width="8" stroke-linecap="round" fill="none" class="part-element" data-part="IO" />
            <!-- Textured Outer Lens -->
            <line x1="220" y1="20" x2="220" y2="220" stroke="#06b6d4" stroke-width="6" class="part-element" data-part="L" />
            <g stroke="rgba(255,255,255,0.4)" stroke-width="1.5">
                <line x1="220" y1="40" x2="223" y2="45" /><line x1="220" y1="120" x2="223" y2="125" /><line x1="220" y1="200" x2="223" y2="205" />
            </g>
            <!-- Highlight Apparent Surface 7a -->
            <line x1="228" y1="35" x2="228" y2="205" stroke="#06b6d4" stroke-width="10" stroke-linecap="round" id="hl-part5-7a" class="part-element highlight-plane active" data-part="7a" />
            <!-- Dotted guides -->
            <line x1="150" y1="55" x2="228" y2="35" stroke="rgba(255,255,255,0.15)" stroke-dasharray="2 2" />
            <line x1="150" y1="185" x2="228" y2="205" stroke="rgba(255,255,255,0.15)" stroke-dasharray="2 2" />
            <!-- Axis -->
            <line x1="30" y1="120" x2="320" y2="120" stroke="#6366f1" stroke-width="1.5" stroke-dasharray="6 3" class="part-element" data-part="2" />
            <circle cx="220" cy="120" r="5" fill="#6366f1" class="part-element" data-part="3" />
            <text x="238" y="125" font-family="'Outfit'" font-size="10" font-weight="700" fill="#06b6d4">Apparent Surface 7a</text>
        `
    },
    "4": {
        title: "Example 4: 反射鏡 + 內透鏡 + non-textured 外燈罩 (排除燈罩宣告)",
        focus: "在此案例中，外罩是無花紋的透明板，這使得製造商可以宣告排除外罩（7b）。此時，發光視表面「7b」將直接收縮並對焦至「內透鏡 IO」的反射投影範圍！",
        desc: "排除外罩後，發光視表面的高度從外罩的 Y=35 縮小到了內透鏡的 Y=55 到 Y=185。這提供了光學工程師極大的設計彈性，可以藉由控制內部光學元件(IO)的大小來滿足最小 12.5 cm² 或 50 cm² 的投影面積要求，避免被大型外罩稀釋配光強度。",
        svg: `
            <!-- Reflector -->
            <path d="M 60,30 Q 120,120 60,210" fill="none" stroke="#64748b" stroke-width="8" class="part-element" data-part="R" />
            <!-- Source -->
            <circle cx="100" cy="120" r="20" fill="url(#bulbGlow)" />
            <circle cx="100" cy="120" r="6" fill="#eab308" stroke="#fff" class="part-element" data-part="S" />
            <!-- Inner Optical Lens (IO) -->
            <path d="M 150,55 L 150,185" stroke="#a855f7" stroke-width="8" stroke-linecap="round" fill="none" class="part-element" data-part="IO" />
            <!-- Smooth Transparent Lens -->
            <line x1="220" y1="20" x2="220" y2="220" stroke="#38bdf8" stroke-width="4" class="part-element" data-part="L" />
            <!-- Highlight Apparent Surface 7a -->
            <line x1="228" y1="35" x2="228" y2="205" stroke="#06b6d4" stroke-width="8" stroke-linecap="round" id="hl-part5-7a" class="part-element highlight-plane active" data-part="7a" />
            <!-- Highlight Apparent Surface 7b -->
            <line x1="224" y1="55" x2="224" y2="185" stroke="#ef4444" stroke-width="12" stroke-linecap="round" id="hl-part5-7b" class="part-element highlight-plane" data-part="7b" />
            <!-- Dotted guides to IO -->
            <line x1="150" y1="55" x2="224" y2="55" stroke="rgba(239,68,68,0.25)" stroke-dasharray="2 2" />
            <line x1="150" y1="185" x2="224" y2="185" stroke="rgba(239,68,68,0.25)" stroke-dasharray="2 2" />
            <!-- Axis -->
            <line x1="30" y1="120" x2="320" y2="120" stroke="#6366f1" stroke-width="1.5" stroke-dasharray="6 3" class="part-element" data-part="2" />
            <circle cx="220" cy="120" r="5" fill="#6366f1" class="part-element" data-part="3" />
            <text x="238" y="105" font-family="'Outfit'" font-size="9" fill="#06b6d4" id="txt-lbl-7a">7a (含外罩)</text>
            <text x="238" y="140" font-family="'Outfit'" font-size="9" fill="#ef4444" id="txt-lbl-7b" style="display:none;">7b (排除外罩)</text>
        `
    },
    "5": {
        title: "Example 5: 反射鏡 + 局部內透鏡 + textured 外燈罩 (局部聚焦)",
        focus: "在此案例中，內部只設有「局部內透鏡 IO」（僅遮蓋了光源前的上半部），而最外側是紋理折射燈罩。此時，因為外罩紋理，發光視表面「7a」依然覆蓋整個被光照亮的外燈罩全幅。",
        desc: "即使內透鏡是局部（Partial Inner Lens）非對稱的，外側折射花紋燈罩 L 仍然會把偏折的光線再次擴散。因此，在紋理燈罩存在下，視表面 7a 不會縮小，必須將所有被照亮的外罩高度（Y=35 到 Y=205）均納入發光視表面範圍。",
        svg: `
            <!-- Reflector -->
            <path d="M 60,30 Q 120,120 60,210" fill="none" stroke="#64748b" stroke-width="8" class="part-element" data-part="R" />
            <!-- Source -->
            <circle cx="100" cy="120" r="20" fill="url(#bulbGlow)" />
            <circle cx="100" cy="120" r="6" fill="#eab308" stroke="#fff" class="part-element" data-part="S" />
            <!-- Partial Inner Lens (IO) - Upper half only -->
            <path d="M 150,55 L 150,130" stroke="#a855f7" stroke-width="8" stroke-linecap="round" fill="none" class="part-element" data-part="IO" />
            <!-- Textured Outer Lens -->
            <line x1="220" y1="20" x2="220" y2="220" stroke="#06b6d4" stroke-width="6" class="part-element" data-part="L" />
            <g stroke="rgba(255,255,255,0.4)" stroke-width="1.5">
                <line x1="220" y1="40" x2="223" y2="45" /><line x1="220" y1="120" x2="223" y2="125" /><line x1="220" y1="200" x2="223" y2="205" />
            </g>
            <!-- Highlight Apparent Surface 7a -->
            <line x1="228" y1="35" x2="228" y2="205" stroke="#06b6d4" stroke-width="10" stroke-linecap="round" id="hl-part5-7a" class="part-element highlight-plane active" data-part="7a" />
            <!-- Axis -->
            <line x1="30" y1="120" x2="320" y2="120" stroke="#6366f1" stroke-width="1.5" stroke-dasharray="6 3" class="part-element" data-part="2" />
            <circle cx="220" cy="120" r="5" fill="#6366f1" class="part-element" data-part="3" />
            <text x="238" y="125" font-family="'Outfit'" font-size="10" font-weight="700" fill="#06b6d4">Apparent Surface 7a</text>
        `
    },
    "6": {
        title: "Example 6: 反射鏡 + 局部內透鏡 + non-textured 外燈罩 (非對稱複合排除)",
        focus: "在此案例中，外罩無花紋且被排除（7b）。此時發光視表面「7b」將產生非對稱特徵：在設有內透鏡的區域（上半部），視表面對焦在「內透鏡 IO」；而在無內透鏡的下半部，視表面對焦在「反射鏡 R」！",
        desc: "這是一個極其精彩的組合（Part 5 Example 6）：在無折射燈罩下，上半部視表面收縮至內透鏡 IO 邊界（Y=55），下半部視表面則以反射鏡口徑為邊界（Y=205）。最終的 7b 視表面呈非對稱分佈（Y=55 到 Y=205），將這兩部分完美疊加合算。",
        svg: `
            <!-- Reflector -->
            <path d="M 60,30 Q 120,120 60,210" fill="none" stroke="#64748b" stroke-width="8" class="part-element" data-part="R" />
            <!-- Source -->
            <circle cx="100" cy="120" r="20" fill="url(#bulbGlow)" />
            <circle cx="100" cy="120" r="6" fill="#eab308" stroke="#fff" class="part-element" data-part="S" />
            <!-- Partial Inner Lens (IO) - Upper half only -->
            <path d="M 150,55 L 150,130" stroke="#a855f7" stroke-width="8" stroke-linecap="round" fill="none" class="part-element" data-part="IO" />
            <!-- Smooth Transparent Lens -->
            <line x1="220" y1="20" x2="220" y2="220" stroke="#38bdf8" stroke-width="4" class="part-element" data-part="L" />
            <!-- Highlight Apparent Surface 7a -->
            <line x1="228" y1="35" x2="228" y2="205" stroke="#06b6d4" stroke-width="8" stroke-linecap="round" id="hl-part5-7a" class="part-element highlight-plane active" data-part="7a" />
            <!-- Highlight Apparent Surface 7b (Asymmetric structure) -->
            <!-- Upper bound: Y=55 (from IO), Lower bound: Y=205 (from R) -->
            <line x1="224" y1="55" x2="224" y2="205" stroke="#ef4444" stroke-width="12" stroke-linecap="round" id="hl-part5-7b" class="part-element highlight-plane" data-part="7b" />
            <!-- Dotted guides -->
            <line x1="150" y1="55" x2="224" y2="55" stroke="rgba(239,68,68,0.25)" stroke-dasharray="2 2" />
            <line x1="60" y1="205" x2="224" y2="205" stroke="rgba(239,68,68,0.25)" stroke-dasharray="2 2" />
            <!-- Axis -->
            <line x1="30" y1="120" x2="320" y2="120" stroke="#6366f1" stroke-width="1.5" stroke-dasharray="6 3" class="part-element" data-part="2" />
            <circle cx="220" cy="120" r="5" fill="#6366f1" class="part-element" data-part="3" />
            <text x="238" y="105" font-family="'Outfit'" font-size="9" fill="#06b6d4" id="txt-lbl-7a">7a (含外罩)</text>
            <text x="238" y="140" font-family="'Outfit'" font-size="9" fill="#ef4444" id="txt-lbl-7b" style="display:none;">7b (排除外罩)</text>
        `
    },
    "7": {
        title: "Example 7: 導光條 (Light Guide LG) 光學結構剖面",
        focus: "在此案例中，光源將光線注入導光條 (Light Guide LG)。此時，如果排除無花紋外罩（7b），發光視表面「7b」將直接限縮在「導光條本身的物理外截面」投影範圍內！",
        desc: "當使用現代導光條設計時，發光主要集中在導光條的實體上。若外罩 L 是透明平滑無花紋的，套用 7b 可以將視表面侷限於導光條表面（如 Y=80 到 Y=160），這使得導光條在發光強度分佈與均勻度上更容易通過法規 CoP 檢驗。",
        svg: `
            <!-- Source injecting into Light Guide -->
            <circle cx="50" cy="120" r="10" fill="#eab308" />
            <!-- Light Guide Pipe (LG) -->
            <path d="M 50,120 L 150,120" stroke="#06b6d4" stroke-width="12" stroke-linecap="round" />
            <!-- Light Guide Out-coupling surface (LG) -->
            <path d="M 150,70 Q 180,120 150,170" fill="none" stroke="#06b6d4" stroke-width="14" stroke-linecap="round" class="part-element" data-part="LG" />
            <!-- Smooth Transparent Lens -->
            <line x1="220" y1="20" x2="220" y2="220" stroke="#38bdf8" stroke-width="4" class="part-element" data-part="L" />
            <!-- Highlight Apparent Surface 7a -->
            <line x1="228" y1="35" x2="228" y2="205" stroke="#06b6d4" stroke-width="8" stroke-linecap="round" id="hl-part5-7a" class="part-element highlight-plane active" data-part="7a" />
            <!-- Highlight Apparent Surface 7b -->
            <line x1="224" y1="70" x2="224" y2="170" stroke="#ef4444" stroke-width="12" stroke-linecap="round" id="hl-part5-7b" class="part-element highlight-plane" data-part="7b" />
            <!-- Dotted guides to LG -->
            <line x1="150" y1="70" x2="224" y2="70" stroke="rgba(239,68,68,0.25)" stroke-dasharray="2 2" />
            <line x1="150" y1="170" x2="224" y2="170" stroke="rgba(239,68,68,0.25)" stroke-dasharray="2 2" />
            <!-- Axis -->
            <line x1="30" y1="120" x2="320" y2="120" stroke="#6366f1" stroke-width="1.5" stroke-dasharray="6 3" class="part-element" data-part="2" />
            <circle cx="220" cy="120" r="5" fill="#6366f1" class="part-element" data-part="3" />
            <text x="238" y="105" font-family="'Outfit'" font-size="9" fill="#06b6d4" id="txt-lbl-7a">7a (含外罩)</text>
            <text x="238" y="140" font-family="'Outfit'" font-size="9" fill="#ef4444" id="txt-lbl-7b" style="display:none;">7b (排除外罩)</text>
        `
    },
    "8": {
        title: "Example 8: 導光與反射組合 (雙功能 F1/F2 隔牆結構)",
        focus: "在此案例中，上半部是功能二的反射腔體 (F2)，下半部是功能一的導光腔體 (F1)。中間設有物理隔光板「X」。若排除無折射外燈罩，為防止兩者互擾，F1 腔體對 F2 光線必須「完全不透光」，此時兩功能各自具有獨立的 7b 視表面！",
        desc: "Example 8 是法規中有關雙功能整合的重要案例：當申報排除無紋理外燈罩 7b 時，功能一的腔體 F1 對於功能二 F2 必須是不透明的。這保證了 F2 的視表面（Y=35 到 Y=115）與 F1 的視表面（Y=125 到 Y=205）邊界清晰且物理獨立，兩者互不侵犯。",
        svg: `
            <!-- F2 Chamber Reflector (Top) -->
            <path d="M 60,30 Q 110,75 60,115" fill="none" stroke="#64748b" stroke-width="6" />
            <circle cx="85" cy="72" r="4" fill="#eab308" stroke="#fff" />
            <text x="50" y="75" font-family="'Outfit'" font-size="9" fill="#94a3b8">F2</text>
            
            <!-- Mid division wall (X - Non-functional) -->
            <line x1="60" y1="120" x2="220" y2="120" stroke="#f59e0b" stroke-width="6" class="part-element" data-part="X" />
            <text x="140" y="115" font-family="'Outfit'" font-size="9" fill="#f59e0b">X</text>

            <!-- F1 Chamber Light Guide (Bottom) -->
            <path d="M 140,125 Q 165,165 140,205" fill="none" stroke="#06b6d4" stroke-width="8" stroke-linecap="round" />
            <text x="50" y="165" font-family="'Outfit'" font-size="9" fill="#06b6d4">F1</text>
            
            <!-- Smooth Transparent Lens -->
            <line x1="220" y1="20" x2="220" y2="220" stroke="#38bdf8" stroke-width="4" class="part-element" data-part="L" />
            
            <!-- Highlight Apparent Surface 7a (F2 focus) -->
            <line x1="228" y1="35" x2="228" y2="205" stroke="#06b6d4" stroke-width="8" stroke-linecap="round" id="hl-part5-7a" class="part-element highlight-plane active" data-part="7a" />
            
            <!-- Highlight Apparent Surface 7b (F2 independent from F1) -->
            <!-- F2 7b: Y=35 to Y=115, F1 7b: Y=125 to Y=205 -->
            <line x1="224" y1="35" x2="224" y2="115" stroke="#ef4444" stroke-width="12" stroke-linecap="round" id="hl-part5-7b" class="part-element highlight-plane" data-part="7b" />
            
            <!-- Dotted guides to F2 limits -->
            <line x1="60" y1="35" x2="224" y2="35" stroke="rgba(239,68,68,0.25)" stroke-dasharray="2 2" />
            <line x1="60" y1="115" x2="224" y2="115" stroke="rgba(239,68,68,0.25)" stroke-dasharray="2 2" />
            
            <!-- Axis -->
            <line x1="30" y1="120" x2="320" y2="120" stroke="#6366f1" stroke-width="1.5" stroke-dasharray="6 3" class="part-element" data-part="2" />
            <circle cx="220" cy="120" r="5" fill="#6366f1" class="part-element" data-part="3" />
            <text x="238" y="105" font-family="'Outfit'" font-size="9" fill="#06b6d4" id="txt-lbl-7a">7a (含外罩)</text>
            <text x="238" y="140" font-family="'Outfit'" font-size="9" fill="#ef4444" id="txt-lbl-7b" style="display:none;">7b (F2排除外罩)</text>
        `
    },
    "9": {
        title: "Example 9: 反射鏡 + 結合非功能阻礙區 X",
        focus: "在此案例中，燈具內部包含了一個完全不發光的非功能阻礙區「X」（如中央的黑色塑料裝飾條）。當判定發光視表面時，此非功能區 X 必須從視表面中「完全扣除」！",
        desc: "即使外側設有折射外燈罩，任何物理上不透光或不發射光的區域 X，在正投影判定時都必須予以扣減。因此，視表面 7a 或 7b 將會分裂成「兩個不連續的發光子區段」（Y=35~100 與 Y=140~205），中間的 X 區域（Y=100~140）將不計入發光面積。",
        svg: `
            <!-- Reflector -->
            <path d="M 60,30 Q 120,120 60,210" fill="none" stroke="#64748b" stroke-width="8" class="part-element" data-part="R" />
            <!-- Source -->
            <circle cx="100" cy="120" r="20" fill="url(#bulbGlow)" />
            <circle cx="100" cy="120" r="6" fill="#eab308" stroke="#fff" class="part-element" data-part="S" />
            <!-- Non-functional region X in middle -->
            <rect x="140" y="100" width="30" height="40" fill="#f59e0b" stroke="#ca8a04" class="part-element" data-part="X" />
            <text x="155" y="125" font-family="'Outfit'" font-size="10" font-weight="700" fill="#ffffff" text-anchor="middle">X</text>
            
            <!-- Textured Outer Lens -->
            <line x1="220" y1="20" x2="220" y2="220" stroke="#06b6d4" stroke-width="6" class="part-element" data-part="L" />
            
            <!-- Highlight Apparent Surface 7a (Broken into two segments) -->
            <!-- Segment 1: Y=35 to 100 -->
            <line x1="228" y1="35" x2="228" y2="100" stroke="#06b6d4" stroke-width="10" stroke-linecap="round" id="hl-part5-7a" class="part-element highlight-plane active" data-part="7a" />
            <!-- Segment 2: Y=140 to 205 -->
            <line x1="228" y1="140" x2="228" y2="205" stroke="#06b6d4" stroke-width="10" stroke-linecap="round" id="hl-part5-7a-2" class="part-element highlight-plane active" data-part="7a" />
            
            <!-- Dotted guides to X boundaries -->
            <line x1="140" y1="100" x2="228" y2="100" stroke="rgba(255,255,255,0.15)" stroke-dasharray="2 2" />
            <line x1="140" y1="140" x2="228" y2="140" stroke="rgba(255,255,255,0.15)" stroke-dasharray="2 2" />
            <!-- Axis -->
            <line x1="30" y1="120" x2="320" y2="120" stroke="#6366f1" stroke-width="1.5" stroke-dasharray="6 3" class="part-element" data-part="2" />
            <circle cx="220" cy="120" r="5" fill="#6366f1" class="part-element" data-part="3" />
            <text x="238" y="125" font-family="'Outfit'" font-size="10" font-weight="700" fill="#06b6d4">Apparent Surface 7a (Split)</text>
        `
    }
};

function initPart5() {
    const exButtons = document.querySelectorAll('.example-btn');
    const btn7a = document.getElementById('btnToggle7a');
    const btn7b = document.getElementById('btnToggle7b');
    const svgPart5 = document.getElementById('part5SvgContainer');

    let currentEx = "1";
    let subMode = "7a"; // "7a" or "7b"

    function render() {
        const data = example5Data[currentEx];
        if (!data) return;

        // Update Text
        document.getElementById('lblExTitle').textContent = data.title;
        document.getElementById('lblExFocusText').textContent = data.focus;
        document.getElementById('lblExDescText').textContent = data.desc;

        // Render SVG into container
        const svgElement = document.getElementById('svgPart5');
        svgElement.innerHTML = `
            <defs>
                <radialGradient id="bulbGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#ca8a04" stop-opacity="1" />
                    <stop offset="30%" stop-color="#eab308" stop-opacity="0.8" />
                    <stop offset="100%" stop-color="#eab308" stop-opacity="0" />
                </radialGradient>
            </defs>
            ${data.svg}
        `;

        // Manage 7a / 7b highlights inside the loaded SVG
        const hl7aElements = svgElement.querySelectorAll('#hl-part5-7a, #hl-part5-7a-2');
        const hl7bElements = svgElement.querySelectorAll('#hl-part5-7b');
        const lbl7a = svgElement.getElementById('txt-lbl-7a');
        const lbl7b = svgElement.getElementById('txt-lbl-7b');

        if (subMode === '7a') {
            hl7aElements.forEach(el => el.classList.add('active'));
            hl7bElements.forEach(el => el.classList.remove('active'));
            if (lbl7a) lbl7a.style.display = 'block';
            if (lbl7b) lbl7b.style.display = 'none';
        } else {
            hl7aElements.forEach(el => el.classList.remove('active'));
            hl7bElements.forEach(el => el.classList.add('active'));
            if (lbl7a) lbl7a.style.display = 'none';
            if (lbl7b) lbl7b.style.display = 'block';
        }

        // Rebind glossary highlight hook for dynamically injected elements
        const activeKey = document.querySelector('.key-item.active');
        if (activeKey) {
            const keyId = activeKey.getAttribute('data-key');
            svgElement.querySelectorAll(`[data-part="${keyId}"]`).forEach(el => el.classList.add('highlighted'));
        }
    }

    exButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            exButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentEx = btn.getAttribute('data-ex');

            // Force subMode 7a for Examples 1, 3, 5 since 7b is not applicable (textured outer lens)
            if (["1", "3", "5"].includes(currentEx)) {
                subMode = "7a";
                btn7a.classList.add('active');
                btn7b.classList.remove('active');
                btn7b.style.opacity = '0.3';
                btn7b.style.pointerEvents = 'none';
            } else {
                btn7b.style.opacity = '1';
                btn7b.style.pointerEvents = 'auto';
            }

            render();
        });
    });

    btn7a.addEventListener('click', () => {
        subMode = "7a";
        btn7a.classList.add('active');
        btn7b.classList.remove('active');
        render();
    });

    btn7b.addEventListener('click', () => {
        subMode = "7b";
        btn7b.classList.add('active');
        btn7a.classList.remove('active');
        render();
    });

    // Save global render trigger
    window.renderExamplePart5 = render;

    // Initial render
    render();
}

// ==========================================
// 5. PART 6: EDGES & REFERENCE AXIS ROTATION
// ==========================================
const case6Data = {
    "A": {
        title: "Example A: 凸形外燈罩之發光表面與邊界點投影",
        desc: "本案例 (Example A) 展示凸形外燈罩。當基準軸 (Axis of Reference) 為水平時，切線 a 與 b 垂直對齊於凸罩最外側兩緣。<b>邊界點 c 與 d</b> 代表製造商宣告之發光表面起始切緣。拉動傾斜夾角滑桿，您會發現切點在大曲率外罩上會隨之滑移，改變正投影尺寸！",
        lensSvg: `
            <!-- Convex Outer Lens shape -->
            <path d="M 200,60 Q 280,125 200,190" fill="none" stroke="#06b6d4" stroke-width="8" class="part-element" data-part="L" id="p6-lens-body" />
        `
    },
    "B": {
        title: "Example B: 大弧度拋物燈罩面之極限邊界切點",
        desc: "本案例 (Example B) 展示具有大拋物弧度的燈罩。在此結構下，基準軸傾斜角度對邊界的影響更為劇烈：當觀測視角或基準軸稍微偏轉時，<b>正交切點 a 與 b</b> 會沿著拋物面大幅度滑動。這直接決定了該燈具在不同安裝角下的幾何面積核算有效性。",
        lensSvg: `
            <!-- Highly curved parabolic lens -->
            <path d="M 200,40 Q 330,125 200,210" fill="none" stroke="#06b6d4" stroke-width="8" class="part-element" data-part="L" id="p6-lens-body" />
        `
    },
    "C": {
        title: "Example C: 包含非本功能區 X 的邊界扣減",
        desc: "本案例 (Example C) 在凸罩中央結合了非本功能發光區「X」（如鍍鉻條）。此時，照明表面的邊緣仍為 a 與 b，但正投影計算必須自動<b>分段扣除中央 X 區域的寬度</b>。基準軸傾斜同樣會帶動 X 的陰影投影帶平移，影響最終兩分段發光面積的總和。",
        lensSvg: `
            <!-- Curved Lens -->
            <path d="M 200,50 Q 275,125 200,200" fill="none" stroke="#06b6d4" stroke-width="8" class="part-element" data-part="L" id="p6-lens-body" />
            <!-- Non-functional X area in middle -->
            <path d="M 228,105 L 235,145" stroke="#f59e0b" stroke-width="12" stroke-linecap="round" class="part-element" data-part="X" id="p6-x-body" />
        `
    },
    "D": {
        title: "Example D: 分散式雙發光腔體 (複式視表面) 判定",
        desc: "本案例 (Example D) 具備兩個物理分離的發光腔體，中間是寬闊的不透光區「X」。在這種結構中，申報的發光表面邊界包含上半部的 c-d 與下半部的 e-f。這兩個獨立段將分別投射在基準平面上並作面積相加，基準軸的偏角會直接拉伸或收縮中央不發光區的間距阻隔。",
        lensSvg: `
            <!-- Two separate lenses -->
            <path d="M 200,50 Q 250,85 200,120" fill="none" stroke="#06b6d4" stroke-width="8" class="part-element" data-part="L" id="p6-lens-body1" />
            <path d="M 200,130 Q 250,165 200,200" fill="none" stroke="#06b6d4" stroke-width="8" class="part-element" data-part="L" id="p6-lens-body2" />
            <!-- Middle spacer X -->
            <line x1="200" y1="120" x2="200" y2="130" stroke="#f59e0b" stroke-width="6" class="part-element" data-part="X" />
        `
    },
    "E": {
        title: "Example E: 排除無紋理外燈罩之 7b 視表面判定",
        desc: "本案例 (Example E) 說明了如何依據 R48 2.10.2 (b) 排除無折射外燈罩。發光表面 7b 直接聚焦在內部發光組件的邊界 $c'-d'$ 與 $e'-f'$（如內置光學腔）。中央 X 部分不計入。拉動滑桿可看到 7b 的邊界投影引線對準內部組件，而非外燈罩外側。",
        lensSvg: `
            <!-- Smooth flat Outer Lens -->
            <line x1="200" y1="30" x2="200" y2="220" stroke="#38bdf8" stroke-width="4" class="part-element" data-part="L" />
            <!-- Internal light components -->
            <rect x="130" y="50" width="40" height="50" fill="rgba(6,182,212,0.2)" stroke="#a855f7" stroke-width="2" class="part-element" data-part="IO" />
            <rect x="130" y="150" width="40" height="50" fill="rgba(6,182,212,0.2)" stroke="#a855f7" stroke-width="2" class="part-element" data-part="IO" />
            <text x="150" y="80" font-family="'Outfit'" font-size="9" fill="#a855f7">IO</text>
            <text x="150" y="180" font-family="'Outfit'" font-size="9" fill="#a855f7">IO</text>
            <!-- Middle non-functional X -->
            <rect x="130" y="100" width="40" height="50" fill="#f59e0b" stroke="none" opacity="0.4" class="part-element" data-part="X" />
        `
    }
};

function initPart6() {
    const caseButtons = document.querySelectorAll('.ex-btn-p6');
    const sliderTilt = document.getElementById('sliderAxisTilt');
    const lblTiltVal = document.getElementById('lblAxisTiltVal');
    const lblCaseTitle = document.getElementById('lblCaseTitle');
    const lblCaseDesc = document.getElementById('lblCaseDescText');
    const valAB = document.getElementById('valEdgeAB');
    const valCD = document.getElementById('valEdgeCD');

    let currentCase = "A";

    function update() {
        const tiltDeg = parseFloat(sliderTilt.value);
        const tiltRad = tiltDeg * Math.PI / 180;
        
        lblTiltVal.textContent = `${tiltDeg}° ${tiltDeg === 0 ? '(水平)' : tiltDeg > 0 ? '(上仰)' : '(下仰)'}`;

        // Get SVG workspace
        const svgElement = document.getElementById('svgPart6');
        if (!svgElement) return;

        // Render base static casing elements
        const data = case6Data[currentCase];
        if (!data) return;

        // Geometric Math for dynamic tangent lines and projection calculations
        // Lens center is at (200, 125). Horizontal reference axis is Y=125.
        // Tilted axis goes through (200, 125) with angle tiltRad.
        // We will draw:
        // 1. Tilted reference axis line.
        // 2. Projections perpendicular to this reference axis.
        // 3. Dynamic tangent guide lines.
        // 4. Dynamic measurements.

        const centerX = 200;
        const centerY = 125;
        const axisLength = 320;

        // Endpoint of tilted axis
        const axisEndX = centerX + axisLength * Math.cos(tiltRad);
        const axisEndY = centerY + axisLength * Math.sin(tiltRad);
        const axisStartX = centerX - 120 * Math.cos(tiltRad);
        const axisStartY = centerY - 120 * Math.sin(tiltRad);

        // Projecting onto a plane perpendicular to the axis at distance X_proj = 380
        // Plane center is at (380, 125) if horizontal, but moves perpendicularly when tilted.
        // Let's keep a simple fixed projection screen at X=380 for visual clarity,
        // and calculate the orthographic height projections.
        
        // Example base values
        let abSize = 180;
        let cdSize = 145;

        if (currentCase === 'A') {
            // Convex outer lens
            // The cut-point height shifts with tilt angle
            // as tilt angle increases, the top cut-point slides down, bottom slides down
            const shift = tiltDeg * 1.5;
            abSize = 180 - Math.abs(tiltDeg) * 0.8;
            cdSize = 150 - Math.abs(tiltDeg) * 0.5;
        } else if (currentCase === 'B') {
            // Highly parabolic lens
            // Cut points slide dramatically
            abSize = 200 - Math.abs(tiltDeg) * 1.8;
            cdSize = 160 - Math.abs(tiltDeg) * 1.2;
        } else if (currentCase === 'C') {
            // Contains X
            abSize = 170 - Math.abs(tiltDeg) * 0.5;
            cdSize = 135 - Math.abs(tiltDeg) * 0.4;
        } else if (currentCase === 'D') {
            // Separated double lenses
            abSize = 190 - Math.abs(tiltDeg) * 0.4;
            cdSize = 140 - Math.abs(tiltDeg) * 0.3;
        } else if (currentCase === 'E') {
            // Exclude outer lens
            abSize = 190; // outer lens is static
            cdSize = 120; // internal IO height is static Y=50~100 + Y=150~200 (Total 100)
        }

        // Apply visual values to display
        valAB.textContent = `${Math.round(abSize)} mm`;
        valCD.textContent = `${Math.round(cdSize)} mm`;

        // Generate SVG content dynamically
        let svgContent = `
            <!-- Grid lines -->
            <g stroke="rgba(255,255,255,0.02)" stroke-width="0.5">
                <line x1="0" y1="125" x2="500" y2="125" />
                <line x1="200" y1="0" x2="200" y2="250" />
            </g>

            <!-- Back Light Bulb & Reflector representation (Static in background) -->
            <g opacity="0.3">
                <path d="M 60,40 Q 120,125 60,210" fill="none" stroke="#64748b" stroke-width="6" />
                <circle cx="95" cy="125" r="5" fill="#eab308" />
            </g>

            <!-- Lens and features -->
            ${data.lensSvg}

            <!-- Axis of Reference (2) - TILTED -->
            <line x1="${axisStartX}" y1="${axisStartY}" x2="${axisEndX}" y2="${axisEndY}" stroke="#6366f1" stroke-width="2.5" stroke-dasharray="10 4" class="part-element" data-part="2" />
            
            <!-- Center of Reference (3) -->
            <circle cx="${centerX}" cy="${centerY}" r="6" fill="#6366f1" stroke="#ffffff" stroke-width="2" class="part-element" data-part="3" />

            <!-- Dynamic Projection Tangent guide rays (Perpendicular to tilted Axis) -->
        `;

        // Calculate dynamic projection lines based on angle
        const perpAngleRad = tiltRad + Math.PI / 2;
        const cosPerp = Math.cos(perpAngleRad);
        const sinPerp = Math.sin(perpAngleRad);

        // Drawing boundaries projection lines
        const topY_ab = centerY - (abSize / 2);
        const botY_ab = centerY + (abSize / 2);
        const topY_cd = centerY - (cdSize / 2);
        const botY_cd = centerY + (cdSize / 2);

        // We will project these points horizontally (or slightly tilted) to the screen
        // In E-mark diagrams, projection guides are perpendicular to the tilted axis!
        // So the guide lines extend parallel to the tilted reference axis starting from the cut points on the lens.
        const topCutX_ab = currentCase === 'B' ? 240 - Math.abs(tiltDeg)*0.8 : 220;
        const botCutX_ab = currentCase === 'B' ? 240 - Math.abs(tiltDeg)*0.8 : 220;

        // Dynamic tangent line lines
        svgContent += `
            <!-- Margins lines a-b (Illuminating edge limits) -->
            <line x1="${topCutX_ab - 40}" y1="${topY_ab}" x2="${topCutX_ab + 160}" y2="${topY_ab}" stroke="rgba(6,182,212,0.3)" stroke-width="1" stroke-dasharray="3 3" />
            <line x1="${topCutX_ab - 40}" y1="${botY_ab}" x2="${topCutX_ab + 160}" y2="${botY_ab}" stroke="rgba(6,182,212,0.3)" stroke-width="1" stroke-dasharray="3 3" />
            
            <!-- Margins lines c-d (Light-emitting edge limits) -->
            <line x1="160" y1="${topY_cd}" x2="380" y2="${topY_cd}" stroke="rgba(239,68,68,0.3)" stroke-width="1" stroke-dasharray="4 2" />
            <line x1="160" y1="${botY_cd}" x2="380" y2="${botY_cd}" stroke="rgba(239,68,68,0.3)" stroke-width="1" stroke-dasharray="4 2" />

            <!-- Edge margin labels -->
            <text x="${topCutX_ab + 10}" y="${topY_ab - 5}" font-family="'Outfit'" font-size="10" fill="#06b6d4" font-weight="700">a</text>
            <text x="${topCutX_ab + 10}" y="${botY_ab + 12}" font-family="'Outfit'" font-size="10" fill="#06b6d4" font-weight="700">b</text>
            <text x="170" y="${topY_cd - 5}" font-family="'Outfit'" font-size="10" fill="#ef4444" font-weight="700">c</text>
            <text x="170" y="${botY_cd + 12}" font-family="'Outfit'" font-size="10" fill="#ef4444" font-weight="700">d</text>

            <!-- Projected Screen Plane on Right (X = 380) -->
            <line x1="380" y1="20" x2="380" y2="230" stroke="rgba(255,255,255,0.08)" stroke-width="4" stroke-dasharray="4 4" />
            
            <!-- Apparent Surface based on Illuminating projection (a-b) -->
            <line x1="384" y1="${topY_ab}" x2="384" y2="${botY_ab}" stroke="#06b6d4" stroke-width="6" stroke-linecap="round" class="part-element" data-part="6" />
            <text x="394" y="${centerY - 20}" font-family="'Outfit'" font-size="9" fill="#06b6d4" font-weight="700">Illum (a-b)</text>

            <!-- Apparent Surface based on Light-emitting projection (c-d) -->
            <line x1="376" y1="${topY_cd}" x2="376" y2="${botY_cd}" stroke="#ef4444" stroke-width="10" stroke-linecap="round" class="part-element" data-part="7a" />
            <text x="330" y="${centerY + 30}" font-family="'Outfit'" font-size="9" fill="#ef4444" font-weight="700">Emit (c-d)</text>
        `;

        if (currentCase === 'D') {
            svgContent += `
                <text x="170" y="115" font-family="'Outfit'" font-size="9" fill="#ef4444" font-weight="700">d</text>
                <text x="170" y="145" font-family="'Outfit'" font-size="9" fill="#ef4444" font-weight="700">e</text>
                <text x="170" y="${botY_cd + 12}" font-family="'Outfit'" font-size="9" fill="#ef4444" font-weight="700">f</text>
            `;
        } else if (currentCase === 'E') {
            svgContent += `
                <text x="120" y="${topY_cd - 5}" font-family="'Outfit'" font-size="9" fill="#a855f7" font-weight="700">c'</text>
                <text x="120" y="${botY_cd + 12}" font-family="'Outfit'" font-size="9" fill="#a855f7" font-weight="700">f'</text>
            `;
        }

        svgElement.innerHTML = svgContent;

        // Rebind glossary highlights
        const activeKey = document.querySelector('.key-item.active');
        if (activeKey) {
            const keyId = activeKey.getAttribute('data-key');
            svgElement.querySelectorAll(`[data-part="${keyId}"]`).forEach(el => el.classList.add('highlighted'));
        }
    }

    caseButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            caseButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCase = btn.getAttribute('data-case');

            lblCaseTitle.textContent = case6Data[currentCase].title;
            lblCaseDesc.innerHTML = case6Data[currentCase].desc;

            update();
        });
    });

    sliderTilt.addEventListener('input', update);

    // Save global render trigger
    window.renderCasePart6 = update;

    // Initial render
    update();
}

// ==========================================
// 6. PART 7: RECIPROCAL INCORPORATION DECIDER
// ==========================================
function initPart7() {
    const chkLensIncluded = document.getElementById('chkOptLensIncluded');
    const chkLensTextured = document.getElementById('chkOptLensTextured');
    const chkHasWall = document.getElementById('chkOptHasWall');
    const chkNonTexturedExcluded = document.getElementById('chkOptNonTexturedExcluded');
    const chkF1TransparentToF2 = document.getElementById('chkOptF1TransparentToF2');

    const divQuizTransparent = document.getElementById('divQuizTransparent');
    const cardVerdict = document.getElementById('cardVerdictResult');
    const divStatus = document.getElementById('divVerdictStatus');
    const lblTitle = document.getElementById('lblVerdictTitle');
    const lblSubtitle = document.getElementById('lblVerdictSubtitle');
    const lblExplanation = document.getElementById('lblVerdictExplanationText');
    const svgElement = document.getElementById('part7SvgContainer');

    function update() {
        // Expose transparent checkbox only if non-textured lens is excluded
        if (chkNonTexturedExcluded.checked) {
            divQuizTransparent.style.display = 'block';
        } else {
            divQuizTransparent.style.display = 'none';
            chkF1TransparentToF2.checked = false; // Reset
        }

        const lensIncluded = chkLensIncluded.checked;
        const lensTextured = chkLensTextured.checked;
        const hasWall = chkHasWall.checked;
        const nonTexturedExcluded = chkNonTexturedExcluded.checked;
        const transparent = chkF1TransparentToF2.checked;

        let isReciprocal = false;
        let verdictTitle = "";
        let verdictSubtitle = "";
        let explanation = "";
        let svgScenario = "";

        // Decision Tree Logic
        if (!lensIncluded) {
            // Case 1: Separate outer lens completely
            isReciprocal = false;
            verdictTitle = "非 混合安裝 (Not Reciprocally Incorporated)";
            verdictSubtitle = "獨立燈具安裝，發光面積不得重疊，物理間距需校核";
            explanation = "兩盞燈具<b>不共用同一個外燈罩(Outer Lens)</b>，物理上屬於完全分離獨立的兩盞車燈。在法規申報時，它們的發光面積絕對不可重疊，且整車安裝時必須校核兩者之間的最小物理間距（如 R48 中定義的 75mm 或兩燈具間最小間隔規格）。";
            svgScenario = "separate";
        } else if (lensTextured && hasWall) {
            // Case 2: Sharing textured lens but has wall
            isReciprocal = false;
            verdictTitle = "非 混合安裝 (Not Reciprocally Incorporated)";
            verdictSubtitle = "腔體設有物理遮光壁，屬於獨立功能並列";
            explanation = "雖然共用同一個<b>具有折射紋理的外燈罩</b>，但兩盞燈具的腔體內部設有<b>物理遮光牆 (Wall in between)</b>，阻隔了光線的橫向溢出與混光。根據 R48 Annex 3 Part 7 Scenario 1 之官方裁決，此設計<b>不屬於混合安裝</b>，發光面積不可重疊累加。";
            svgScenario = "textured-wall";
        } else if (lensTextured && !hasWall) {
            // Case 3: Sharing textured lens and NO wall
            isReciprocal = true;
            verdictTitle = "混合安裝 (Reciprocally Incorporated)";
            verdictSubtitle = "紋理外罩且無阻隔，兩功能發光投影面積可完全重疊";
            explanation = "兩盞燈具<b>共用具有折射紋理的外燈罩，且腔體內部無隔牆</b>。根據 R48 官方判定 Scenario 2，此時兩功能的發光將在燈罩上完全擴散與重疊。這屬於最標準的混合安裝，在核算發光視表面正投影面積時，<b>兩功能的投影面積允許 100% 互套與重疊</b>，利於小尺寸集成尾燈設計。";
            svgScenario = "textured-nowall";
        } else if (!lensTextured && nonTexturedExcluded && !transparent) {
            // Case 4: Smooth lens, lens excluded, F1 not transparent to F2
            isReciprocal = false;
            verdictTitle = "非 混合安裝 (Not Reciprocally Incorporated)";
            verdictSubtitle = "無紋理外罩被排除，且 F1 腔體對 F2 不透光";
            explanation = "外罩為無折射紋理之平滑板，且製造商申報<b>排除外罩宣告 (7b)</b>。同時，<b>功能一 F1 的底層腔體材質對功能二 F2 的光線是不透光的</b>。此時，F2 與 F1 無法共用同一個投影源，判定為<b>非混合安裝</b>。兩者發光邊界分明，視表面獨立核算。";
            svgScenario = "smooth-excluded-opaque";
        } else if (!lensTextured && nonTexturedExcluded && transparent) {
            // Case 5: Smooth lens, lens excluded, F1 IS transparent to F2
            isReciprocal = true;
            verdictTitle = "混合安裝 (Reciprocally Incorporated)";
            verdictSubtitle = "排除無紋理外罩下，F1 腔體對 F2 透明可混合投射";
            explanation = "雖然外罩是無紋理平滑板並被宣告排除，但<b>功能一 F1 的實體材質對功能二 F2 具有完全透光性</b>（意即 F2 的光能完全穿透 F1 發射出去）。依據 R48 法規，此結構下 F1 與 F2 仍可被合法判定為<b>混合安裝</b>，允許發光面積疊加。";
            svgScenario = "smooth-excluded-transparent";
        } else if (!lensTextured && !nonTexturedExcluded) {
            // Case 6: Smooth lens, lens included (textured or not doesn't matter for included)
            isReciprocal = true;
            verdictTitle = "混合安裝 (Reciprocally Incorporated)";
            verdictSubtitle = "包含外罩申報下，視為同一發光玻璃罩面混合";
            explanation = "外燈罩為無花紋平滑板，且製造商在申報時選擇<b>包含外罩 (7a)</b> 作為視表面邊界。根據 R48 官方判定條款：『只要外燈罩（不論有無紋理）被包含在內，兩功能即屬於混合安裝。』，因此面積允許重疊計算。";
            svgScenario = "smooth-included";
        }

        // Update Verdict Card UI
        if (isReciprocal) {
            cardVerdict.style.borderColor = "var(--success)";
            cardVerdict.style.setProperty('--primary', 'var(--success)');
            cardVerdict.style.setProperty('--primary-glow', 'rgba(16, 185, 129, 0.4)');
            
            divStatus.className = "verdict-status-box verdict-reciprocal";
            lblTitle.textContent = verdictTitle;
            lblSubtitle.textContent = verdictSubtitle;
        } else {
            cardVerdict.style.borderColor = "var(--danger)";
            cardVerdict.style.setProperty('--primary', 'var(--danger)');
            cardVerdict.style.setProperty('--primary-glow', 'rgba(239, 68, 68, 0.4)');
            
            divStatus.className = "verdict-status-box verdict-independent";
            lblTitle.textContent = verdictTitle;
            lblSubtitle.textContent = verdictSubtitle;
        }
        lblExplanation.innerHTML = explanation;

        // Render Scenario SVG Diagram dynamically
        renderSvgScenario(svgScenario, hasWall, lensTextured);
    }

    function renderSvgScenario(scenario, hasWall, lensTextured) {
        let svgContent = `
            <!-- Background grids -->
            <rect x="0" y="0" width="400" height="160" fill="rgba(0,0,0,0.3)" rx="8" />
            
            <!-- F2 Light Source (Top) -->
            <circle cx="80" cy="50" r="14" fill="#f59e0b" opacity="0.15" />
            <circle cx="80" cy="50" r="4" fill="#f59e0b" />
            <text x="40" y="53" font-family="'Outfit'" font-size="10" fill="#94a3b8">F2 (Amber)</text>
            
            <!-- F1 Light Source (Bottom) -->
            <circle cx="80" cy="110" r="14" fill="#ef4444" opacity="0.15" />
            <circle cx="80" cy="110" r="4" fill="#ef4444" />
            <text x="40" y="113" font-family="'Outfit'" font-size="10" fill="#94a3b8">F1 (Red)</text>
        `;

        if (scenario === 'separate') {
            // Draw two separate lenses with gap
            svgContent += `
                <!-- Top separate Lens -->
                <path d="M 220,20 L 220,75" stroke="#38bdf8" stroke-width="4" stroke-linecap="round" />
                <path d="M 80,50 L 220,50" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="3 3" opacity="0.7" />
                
                <!-- Bottom separate Lens -->
                <path d="M 220,85 L 220,140" stroke="#38bdf8" stroke-width="4" stroke-linecap="round" />
                <path d="M 80,110 L 220,110" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="3 3" opacity="0.7" />
                
                <!-- Spacer Gap marker -->
                <rect x="218" y="75" width="4" height="10" fill="#ef4444" />
                <text x="235" y="83" font-family="'Outfit'" font-size="9" fill="#ef4444" font-weight="700">GAP (分離)</text>
            `;
        } else {
            // Sharing single lens
            // Lens textured vs smooth
            let lensStroke = "#38bdf8"; // Smooth transparent
            let texturedLines = "";
            if (lensTextured) {
                lensStroke = "#06b6d4"; // Textured
                texturedLines = `
                    <g stroke="rgba(255,255,255,0.4)" stroke-width="1">
                        <line x1="220" y1="30" x2="223" y2="33" /><line x1="220" y1="50" x2="223" y2="53" />
                        <line x1="220" y1="70" x2="223" y2="73" /><line x1="220" y1="90" x2="223" y2="93" />
                        <line x1="220" y1="110" x2="223" y2="113" /><line x1="220" y1="130" x2="223" y2="133" />
                    </g>
                `;
            }

            // Central division wall
            let wallLine = "";
            if (hasWall) {
                wallLine = `<line x1="80" y1="80" x2="220" y2="80" stroke="#64748b" stroke-width="5" class="wall-barrier active" />
                            <text x="140" y="74" font-family="'Outfit'" font-size="9" fill="#94a3b8">隔牆 (Wall)</text>`;
            } else {
                wallLine = `<line x1="80" y1="80" x2="220" y2="80" stroke="rgba(255,255,255,0.05)" stroke-width="1" stroke-dasharray="2 2" />`;
            }

            // Ray routing based on barrier and transparency
            let rayF2 = `<path d="M 80,50 L 220,50" stroke="#f59e0b" stroke-width="2" stroke-dasharray="3 3" class="ex-ray" />`;
            let rayF1 = `<path d="M 80,110 L 220,110" stroke="#ef4444" stroke-width="2" class="ex-ray" />`;
            
            if (scenario === 'smooth-excluded-opaque') {
                // F1 is opaque. Ray F2 cannot cross.
                // Draw a solid chamber around F1
                svgContent += `
                    <rect x="120" y="90" width="100" height="40" fill="rgba(239,68,68,0.1)" stroke="#ef4444" stroke-width="1" />
                    <text x="170" y="102" font-family="'Outfit'" font-size="8" fill="#ef4444">Opaque (不透光)</text>
                `;
            } else if (scenario === 'smooth-excluded-transparent') {
                // F1 is transparent.
                svgContent += `
                    <rect x="120" y="90" width="100" height="40" fill="rgba(16,185,129,0.05)" stroke="#10b981" stroke-dasharray="2 2" stroke-width="1" />
                    <!-- F2 rays can enter F1 chamber and exit -->
                    <path d="M 80,50 L 150,50 L 170,95 L 220,105" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="3 3" opacity="0.6" />
                    <text x="170" y="102" font-family="'Outfit'" font-size="8" fill="#10b981">Transparent (透光)</text>
                `;
            }

            svgContent += `
                ${wallLine}
                ${rayF2}
                ${rayF1}
                <!-- Common Outer Lens -->
                <line x1="220" y1="20" x2="220" y2="140" stroke="${lensStroke}" stroke-width="5" stroke-linecap="round" />
                ${texturedLines}
            `;
        }

        svgElement.innerHTML = svgContent;
    }

    chkLensIncluded.addEventListener('change', () => {
        if (!chkLensIncluded.checked) {
            // If separate, texture/wall don't make sense to edit
            chkLensTextured.disabled = true;
            chkHasWall.disabled = true;
            chkNonTexturedExcluded.disabled = true;
        } else {
            chkLensTextured.disabled = false;
            chkHasWall.disabled = false;
            chkNonTexturedExcluded.disabled = false;
        }
        update();
    });

    chkLensTextured.addEventListener('change', () => {
        if (chkLensTextured.checked) {
            // Textured lens CANNOT be excluded under R48
            chkNonTexturedExcluded.checked = false;
            chkNonTexturedExcluded.disabled = true;
        } else {
            chkNonTexturedExcluded.disabled = false;
        }
        update();
    });

    chkHasWall.addEventListener('change', update);
    chkNonTexturedExcluded.addEventListener('change', update);
    chkF1TransparentToF2.addEventListener('change', update);

    // Save global render trigger
    window.runPart7DecisionTree = update;

    // Initial render
    update();
}
