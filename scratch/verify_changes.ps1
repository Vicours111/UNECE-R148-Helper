# Programmatic verification of app.js edits
$appPath = "c:\Users\as200\Downloads\Antigravity TEST_v20260521\Projects\r148-lighting-design-helper\app.js"
$content = Get-Content -Raw -Path $appPath -Encoding utf8

$passed = $true

# 1. Verify Cat 1
$index1 = $content.IndexOf("maxIntensitySingle: 1200.0,")
$index2 = $content.IndexOf("maxIntensityD: 600.0,")
if ($index1 -ge 0 -and $index2 -ge 0) {
    Write-Host "[SUCCESS] Category 1 Front Direction Indicator maximum limits are corrected to 1200.0 and 600.0 cd." -ForegroundColor Green
} else {
    Write-Host "[ERROR] Category 1 Front Direction Indicator maximum limits are not found or incorrect!" -ForegroundColor Red
    $passed = $false
}

# 2. Verify absolute cd gridType check
if ($content.Contains('gridType === "reversing" || gridType === "sm1" || gridType === "sm2" || gridType === "cat5"')) {
    Write-Host "[SUCCESS] gridType check for absCd includes 'cat5'." -ForegroundColor Green
} else {
    Write-Host "[ERROR] gridType check for absCd does not include 'cat5'!" -ForegroundColor Red
    $passed = $false
}

# 3. Verify Category 5 Min label removal
if ($content.Contains('gridType === "cat5" ? "" :')) {
    Write-Host "[SUCCESS] Category 5 Min label exclusion logic is present." -ForegroundColor Green
} else {
    Write-Host "[ERROR] Category 5 Min label exclusion logic is missing!" -ForegroundColor Red
    $passed = $false
}

if ($passed) {
    Write-Host "`nAll programmatic verification checks PASSED successfully!" -ForegroundColor Green
} else {
    Write-Host "`nVerification FAILED!" -ForegroundColor Red
}
