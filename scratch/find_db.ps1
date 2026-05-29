# Read app.js
$appPath = "c:\Users\as200\Downloads\Antigravity TEST_v20260521\Projects\r148-lighting-design-helper\app.js"
$content = Get-Content -Raw -Path $appPath -Encoding utf8

$index = $content.IndexOf("R148_DATABASE =")
if ($index -ge 0) {
    # Print 2000 chars from here
    $len = 4000
    if ($index + $len -gt $content.Length) {
        $len = $content.Length - $index
    }
    Write-Host "--- R148_DATABASE Block in app.js ---"
    Write-Host $content.Substring($index, $len)
    Write-Host "-----------------------------"
} else {
    Write-Host "R148_DATABASE not found in app.js!"
}

# Also search for R148_DATABASE in other files
Get-ChildItem -Path "c:\Users\as200\Downloads\Antigravity TEST_v20260521\Projects\r148-lighting-design-helper" -Filter "*.js" | ForEach-Object {
    $c = Get-Content -Raw -Path $_.FullName -Encoding utf8
    if ($c.Contains("R148_DATABASE")) {
        Write-Host "R148_DATABASE referenced or defined in: $($_.Name)"
    }
}
