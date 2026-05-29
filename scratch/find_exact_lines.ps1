$appPath = "c:\Users\as200\Downloads\Antigravity TEST_v20260521\Projects\r148-lighting-design-helper\app.js"
$lines = Get-Content -Path $appPath -Encoding utf8

for ($j=1990; $j -lt 2030; $j++) {
    Write-Host "  Line $($j+1): $($lines[$j])"
}
