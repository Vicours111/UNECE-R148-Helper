# Read app.js
$appPath = "c:\Users\as200\Downloads\Antigravity TEST_v20260521\Projects\r148-lighting-design-helper\app.js"
$content = Get-Content -Raw -Path $appPath -Encoding utf8

$index = $content.IndexOf("let weights = {};")
if ($index -ge 0) {
    $len = 5000
    if ($index + $len -gt $content.Length) {
        $len = $content.Length - $index
    }
    Write-Host "--- Grid definition block ---"
    Write-Host $content.Substring($index, $len)
    Write-Host "-----------------------------"
} else {
    Write-Host "Grid block not found!"
}
