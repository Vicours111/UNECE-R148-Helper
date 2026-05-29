# Read app.js
$appPath = "c:\Users\as200\Downloads\Antigravity TEST_v20260521\Projects\r148-lighting-design-helper\app.js"
$content = Get-Content -Raw -Path $appPath -Encoding utf8

$index = $content.IndexOf("R148_DATABASE =")
if ($index -ge 0) {
    # Find matching closing brace for R148_DATABASE
    # It starts with { so let's find the closing } that is followed by the next block
    # A simple approach: R148_DATABASE object is large, let's grab 35000 characters from its start.
    # It probably ends before function or let.
    $sub = $content.Substring($index, 35000)
    Set-Content -Path "scratch/r148_db_extracted.txt" -Value $sub -Encoding utf8
    Write-Host "Extracted database content saved to scratch/r148_db_extracted.txt"
} else {
    Write-Host "R148_DATABASE not found!"
}
