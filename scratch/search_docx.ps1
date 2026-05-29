# Load zip library
Add-Type -AssemblyName System.IO.Compression.FileSystem

$downloadsPath = "C:\Users\as200\Downloads"
$docxFiles = Get-ChildItem -Path $downloadsPath -Filter "UN Regulation No. 148 - Amend.5.docx" -Recurse -File -ErrorAction SilentlyContinue
if ($docxFiles.Count -eq 0) {
    Write-Host "Could not find docx file"
    Exit
}
$docxPath = $docxFiles[0].FullName
Write-Host "Found docx: $docxPath"

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

Write-Host "Length of XML: $($xmlText.Length)"

# Let's search for "Table 8" in the document
$matches = [regex]::Matches($xmlText, "<w:p[^>]*?>[\s\S]*?Table 8[\s\S]*?</w:p>")
Write-Host "Found $($matches.Count) paragraphs with 'Table 8'"
foreach ($m in $matches) {
    $tMatches = [regex]::Matches($m.Value, "<w:t[^>]*?>([\s\S]*?)</w:t>")
    $words = @()
    foreach ($t in $tMatches) { $words += $t.Groups[1].Value }
    Write-Host "Table 8 Para: $($words -join ' ')"
}

# Let's search for tables that contain "luminous" or "intensity" or "Table" and look at them
$matchesTbl = [regex]::Matches($xmlText, "<w:tbl[^>]*?>[\s\S]*?</w:tbl>")
Write-Host "Found $($matchesTbl.Count) total tables"

$tblIdx = 0
foreach ($m in $matchesTbl) {
    $tMatches = [regex]::Matches($m.Value, "<w:t[^>]*?>([\s\S]*?)</w:t>")
    $words = @()
    foreach ($t in $tMatches) { $words += $t.Groups[1].Value }
    $text = $words -join " "
    if ($text -like "*luminous intensity*" -or $text -like "*Table 8*" -or $text -like "*Table 7*" -or $text -like "*Table 9*" -or $text -like "*Table 6*") {
        Write-Host "--- Table $tblIdx Preview (Length $($text.Length)) ---"
        Write-Host ($text.Substring(0, [Math]::Min(1000, $text.Length)))
        Write-Host "----------------------------------"
    }
    $tblIdx++
}
