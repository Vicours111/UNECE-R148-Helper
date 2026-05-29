# Load zip library
Add-Type -AssemblyName System.IO.Compression.FileSystem

$downloadsPath = "C:\Users\as200\Downloads"
$docxFiles = Get-ChildItem -Path $downloadsPath -Filter "UN Regulation No. 148 - Amend.5.docx" -Recurse -File -ErrorAction SilentlyContinue
if ($docxFiles.Count -eq 0) {
    Write-Host "Could not find docx file"
    Exit
}
$docxPath = $docxFiles[0].FullName

$tempDocx = "C:\Users\as200\Downloads\Antigravity TEST_v20260521\Projects\r148-lighting-design-helper\temp_r148.docx"
Copy-Item -Path $docxPath -Destination $tempDocx -Force

$zip = [System.IO.Compression.ZipFile]::OpenRead($tempDocx)
$entry = $zip.GetEntry("word/document.xml")
$stream = $entry.Open()
$reader = New-Object System.IO.StreamReader($stream)
$xmlText = $reader.ReadToEnd()
$reader.Close()
$stream.Close()
$zip.Dispose()
Remove-Item -Path $tempDocx -Force

# Let's search for F1 or F2 in tables or paragraphs, and find A3-VI grid details
# We can find all w:tbl that contain "Figure A3-VI" or "F1" or "F2"
$matchesTbl = [regex]::Matches($xmlText, "<w:tbl[^>]*?>[\s\S]*?Figure A3-VI[\s\S]*?</w:tbl>")
Write-Host "Found $($matchesTbl.Count) tables with 'Figure A3-VI'"
foreach ($m in $matchesTbl) {
    $tMatches = [regex]::Matches($m.Value, "<w:t[^>]*?>([\s\S]*?)</w:t>")
    $words = @()
    foreach ($t in $tMatches) { $words += $t.Groups[1].Value }
    Write-Host "Table Content: $($words -join ' ')"
}

# Search for Figure A3-VI in paragraphs
$matchesP = [regex]::Matches($xmlText, "<w:p[^>]*?>[\s\S]*?Figure A3-VI[\s\S]*?</w:p>")
Write-Host "Found $($matchesP.Count) paras with 'Figure A3-VI'"
foreach ($m in $matchesP) {
    $tMatches = [regex]::Matches($m.Value, "<w:t[^>]*?>([\s\S]*?)</w:t>")
    $words = @()
    foreach ($t in $tMatches) { $words += $t.Groups[1].Value }
    Write-Host "Para Content: $($words -join ' ')"
}
