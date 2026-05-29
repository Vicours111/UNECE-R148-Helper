# Read app.js
$appPath = "c:\Users\as200\Downloads\Antigravity TEST_v20260521\Projects\r148-lighting-design-helper\app.js"
$content = Get-Content -Raw -Path $appPath -Encoding utf8

$index = $content.IndexOf("spec.activeMax =")
if ($index -ge 0) {
    # Print 2000 chars before and 2000 chars after
    $start = [Math]::Max(0, $index - 2000)
    $len = [Math]::Min($content.Length - $start, 4000)
    Write-Host "--- Spec Definition Block ---"
    Write-Host $content.Substring($start, $len)
    Write-Host "-----------------------------"
} else {
    Write-Host "spec.activeMax not found!"
}
