$paths = @(
    "c:\Users\as200\Downloads\Antigravity TEST_v20260521\Projects\r148-lighting-design-helper\dynamic-indicator.html",
    "c:\Users\as200\Downloads\Antigravity TEST_v20260521\Projects\r148-lighting-design-helper\dynamic-indicator.js",
    "c:\Users\as200\Downloads\Antigravity TEST_v20260521\Projects\r148-lighting-design-helper\r48-annex3.js"
)

foreach ($path in $paths) {
    Write-Host "=== Searching in $($path) ==="
    $lines = Get-Content -Path $path -Encoding utf8
    for ($i=0; $i -lt $lines.Count; $i++) {
        $line = $lines[$i]
        if ($line -like "*CoP*" -or $line -like "*cop*" -or $line -like "*COP*" -or $line -like "*testTime*" -or $line -like "*暫態*") {
            Write-Host "Line $($i+1): $($line.Trim())"
        }
    }
}
