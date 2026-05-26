const fs = require('fs');
const path = require('path');

try {
    const jsContent = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');
    const htmlContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

    // Regex for document.getElementById("...") or '...'
    const jsIds = new Set();
    const idRegex = /document\.getElementById\(['"]([a-zA-Z0-9_-]+)['"]\)/g;
    let match;
    while ((match = idRegex.exec(jsContent)) !== null) {
        jsIds.add(match[1]);
    }

    // Regex for id="..." or '...' in HTML
    const htmlIds = new Set();
    const htmlIdRegex = /id=['"]([a-zA-Z0-9_-]+)['"]/g;
    while ((match = htmlIdRegex.exec(htmlContent)) !== null) {
        htmlIds.add(match[1]);
    }

    const missingInHtml = [...jsIds].filter(id => !htmlIds.has(id));

    const output = [];
    output.push(`Total IDs found in JS: ${jsIds.size}`);
    output.push(`Total IDs found in HTML: ${htmlIds.size}`);

    if (missingInHtml.length > 0) {
        output.push(`CRITICAL WARNING: These IDs are in JS but MISSING in HTML: ${missingInHtml.join(', ')}`);
    } else {
        output.push("SUCCESS: All JS DOM element IDs exist in HTML!");
    }

    const resultStr = output.join('\n');
    console.log(resultStr);

    fs.writeFileSync(path.join(__dirname, 'output.txt'), resultStr, 'utf8');
} catch (e) {
    fs.writeFileSync(path.join(__dirname, 'output.txt'), `ERROR: ${e.message}`, 'utf8');
}

