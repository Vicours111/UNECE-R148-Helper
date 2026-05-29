# Read app.js
$appPath = "c:\Users\as200\Downloads\Antigravity TEST_v20260521\Projects\r148-lighting-design-helper\app.js"
$content = Get-Content -Raw -Path $appPath -Encoding utf8

$index = $content.IndexOf("let weights = {};")
if ($index -ge 0) {
    # start printing from 1500 chars after let weights = {}; to capture the rendering loop
    $start = $index + 1500
    $len = 4000
    if ($start + $len -gt $content.Length) {
        $len = $content.Length - $start
    }
    Write-Host "--- drawPhotometricWeightGrid Rendering block ---"
    Write-Host $content.Substring($start, $len)
    Write-Host "-----------------------------"
} else {
    Write-Host "weights block not found!"
}
