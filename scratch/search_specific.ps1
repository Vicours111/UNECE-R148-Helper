$appPath = "c:\Users\as200\Downloads\Antigravity TEST_v20260521\Projects\r148-lighting-design-helper\app.js"
$indexPath = "c:\Users\as200\Downloads\Antigravity TEST_v20260521\Projects\r148-lighting-design-helper\index.html"

# Function to search and print matching lines
function Search-File($path) {
    Write-Host "=== Searching in $($path) ==="
    $lines = Get-Content -Path $path -Encoding utf8
    for ($i=0; $i -lt $lines.Count; $i++) {
        $line = $lines[$i]
        if ($line -like "*CoP*" -or $line -like "*cop*" -or $line -like "*COP*" -or $line -like "*testTime*" -or $line -like "*暫態*") {
            Write-Host "Line $($i+1): $($line.Trim())"
        }
    }
}

Search-File $appPath
Search-File $indexPath
