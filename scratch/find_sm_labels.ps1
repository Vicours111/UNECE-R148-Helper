# Read app.js
$appPath = "c:\Users\as200\Downloads\Antigravity TEST_v20260521\Projects\r148-lighting-design-helper\app.js"
$content = Get-Content -Raw -Path $appPath -Encoding utf8

$index = $content.IndexOf("垂直")
if ($index -ge 0) {
    # search for more occurrences of 垂直 in app.js
    $pattern = "垂直"
    $matches = [regex]::Matches($content, $pattern)
    Write-Host "Found $($matches.Count) '垂直' matches"
    foreach ($m in $matches) {
        $idx = $m.Index
        $start = [Math]::Max(0, $idx - 100)
        $len = [Math]::Min($content.Length - $start, 300)
        Write-Host "Match at $($idx):"
        Write-Host $content.Substring($start, $len)
        Write-Host "====="
    }
}
