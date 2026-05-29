# Read app.js
$appPath = "c:\Users\as200\Downloads\Antigravity TEST_v20260521\Projects\r148-lighting-design-helper\app.js"
$content = Get-Content -Raw -Path $appPath -Encoding utf8

$index = $content.IndexOf("R148_DATABASE =")
if ($index -ge 0) {
    # Let's extract from R148_DATABASE = { until the end of the object.
    # It probably ends with }; which is followed by function or let.
    # Let's print out the keys, which are like "A": {, "R1": {, etc.
    $sub = $content.Substring($index, 50000)
    $pattern = '"(\w+)":\s*\{'
    $matches = [regex]::Matches($sub, $pattern)
    Write-Host "Found $($matches.Count) keys in R148_DATABASE:"
    foreach ($m in $matches) {
        Write-Host "  $($m.Groups[1].Value)"
    }
}
