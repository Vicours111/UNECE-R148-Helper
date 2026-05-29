# Read app.js
$appPath = "c:\Users\as200\Downloads\Antigravity TEST_v20260521\Projects\r148-lighting-design-helper\app.js"
$content = Get-Content -Raw -Path $appPath -Encoding utf8

# Let's search for "minIntensity =" or "activeMax =" or similar properties in app.js
# Or let's see where the dropdown elements or lamp selection changes are handled.
# Search for standard lamp objects in app.js
$pattern = "const\s+lamps\s*="
$matches = [regex]::Matches($content, $pattern)
Write-Host "Found $($matches.Count) 'lamps =' matches"
foreach ($m in $matches) {
    $idx = $m.Index
    $start = [Math]::Max(0, $idx - 50)
    $len = [Math]::Min($content.Length - $start, 3000)
    Write-Host "Match at $($idx):"
    Write-Host $content.Substring($start, $len)
    Write-Host "====="
}
