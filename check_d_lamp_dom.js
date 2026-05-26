const fs = require('fs');
const path = require('path');

try {
    const jsPath = path.join(__dirname, 'd-lamp.js');
    const htmlPath = path.join(__dirname, 'd-lamp.html');
    
    const jsContent = fs.readFileSync(jsPath, 'utf8');
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');

    // Extract all document.getElementById("...")
    const jsIds = new Set();
    const idRegex = /document\.getElementById\(['"]([a-zA-Z0-9_-]+)['"]\)/g;
    let match;
    while ((match = idRegex.exec(jsContent)) !== null) {
        jsIds.add(match[1]);
    }

    // Extract all id="..." in HTML
    const htmlIds = new Set();
    const htmlIdRegex = /id=['"]([a-zA-Z0-9_-]+)['"]/g;
    while ((match = htmlIdRegex.exec(htmlContent)) !== null) {
        htmlIds.add(match[1]);
    }

    const missingInHtml = [...jsIds].filter(id => !htmlIds.has(id));

    console.log(`========================================`);
    console.log(`DOM INTEGRITY REPORT: d-lamp Mode`);
    console.log(`========================================`);
    console.log(`Total Unique IDs queried in JS: ${jsIds.size}`);
    console.log(`Total Unique IDs defined in HTML: ${htmlIds.size}`);
    console.log(`----------------------------------------`);

    if (missingInHtml.length > 0) {
        console.error(`❌ CRITICAL FAILURE: JS references these IDs, but they do NOT exist in HTML:`);
        missingInHtml.forEach(id => console.error(`  - ${id}`));
        process.exit(1);
    } else {
        console.log(`✅ SUCCESS: All JS DOM element query IDs are present in the HTML DOM!`);
        process.exit(0);
    }
} catch (error) {
    console.error(`❌ FATAL ERROR running verification:`, error.message);
    process.exit(1);
}
