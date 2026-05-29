# Read app.js
$appPath = "c:\Users\as200\Downloads\Antigravity TEST_v20260521\Projects\r148-lighting-design-helper\app.js"
$content = Get-Content -Raw -Path $appPath -Encoding utf8

$pattern = "\w+\.minIntensity"
$matches = [regex]::Matches($content, $pattern)
Write-Host "Found $($matches.Count) 'minIntensity' matches"
$shown = 0
foreach ($m in $matches) {
    if ($shown -lt 15) {
        $idx = $m.Index
        $start = [Math]::Max(0, $idx - 100)
        $len = [Math]::Min($content.Length - $start, 300)
        Write-Host "Match $($shown) at $($idx):"
        Write-Host $content.Substring($start, $len)
        Write-Host "-----"
        $shown++
    }
}
