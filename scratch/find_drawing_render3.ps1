# Read app.js
$appPath = "c:\Users\as200\Downloads\Antigravity TEST_v20260521\Projects\r148-lighting-design-helper\app.js"
$content = Get-Content -Raw -Path $appPath -Encoding utf8

$index = $content.IndexOf("rows.forEach(r => {")
if ($index -ge 0) {
    $len = 4000
    if ($index + $len -gt $content.Length) {
        $len = $content.Length - $index
    }
    Write-Host "--- drawPhotometricWeightGrid Rendering block 3 ---"
    Write-Host $content.Substring($index, $len)
    Write-Host "-----------------------------"
} else {
    Write-Host "Rendering block 3 not found!"
}
