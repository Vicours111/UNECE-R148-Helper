# Load zip library
Add-Type -AssemblyName System.IO.Compression.FileSystem

# Dynamically locate the docx file in the Downloads folder to prevent any encoding/Chinese character issues
$downloadsPath = "C:\Users\as200\Downloads"
$docxFiles = Get-ChildItem -Path $downloadsPath -Filter "UN Regulation No. 148 - Amend.5.docx" -Recurse -File -ErrorAction SilentlyContinue
if ($docxFiles.Count -eq 0) {
    Write-Host "Could not find UN Regulation No. 148 docx recursively under $downloadsPath"
    Exit
}
$docxPath = $docxFiles[0].FullName
Write-Host "Dynamically located docx file at: $docxPath"

Write-Host "Reading $docxPath..."

$tempDocx = "C:\Users\as200\Downloads\Antigravity TEST_v20260521\Projects\r148-lighting-design-helper\temp_r148.docx"
Write-Host "Copying to temp file to bypass Word file lock: $tempDocx"
Copy-Item -Path $docxPath -Destination $tempDocx -Force

$zip = [System.IO.Compression.ZipFile]::OpenRead($tempDocx)
$entry = $zip.GetEntry("word/document.xml")
$stream = $entry.Open()
$reader = New-Object System.IO.StreamReader($stream)
$xmlText = $reader.ReadToEnd()
$reader.Close()
$stream.Close()
$zip.Dispose()

# Remove temp file
Remove-Item -Path $tempDocx -Force

Write-Host "XML text length: $($xmlText.Length)"

# Use regex to find and print all Table rows that might be Table 8
# Table 8 has Luminous intensities for direction indicator lamps
# Let's search for the Table containing "Table 8"
$pattern = "<w:tbl[^>]*?>[\s\S]*?Table 8[\s\S]*?</w:tbl>"
$matches = [regex]::Matches($xmlText, $pattern)
Write-Host "Found $($matches.Count) tables matching 'Table 8'"

# Let's print out the text inside those tables
foreach ($m in $matches) {
    # Extract w:t elements
    $tMatches = [regex]::Matches($m.Value, "<w:t[^>]*?>([\s\S]*?)</w:t>")
    $words = @()
    foreach ($t in $tMatches) {
        $words += $t.Groups[1].Value
    }
    Write-Host "--- Table 8 Content Preview ---"
    Write-Host ($words -join " ")
    Write-Host "--------------------------------"
}

# Let's search for "Table A2-1" or "Table A2-2" in paragraphs
$patternA2 = "<w:p[^>]*?>[\s\S]*?Table A2-[\s\S]*?</w:p>"
$matchesA2 = [regex]::Matches($xmlText, $patternA2)
Write-Host "Found $($matchesA2.Count) paragraphs matching 'Table A2-'"
foreach ($m in $matchesA2 | Select-Object -First 10) {
    $tMatches = [regex]::Matches($m.Value, "<w:t[^>]*?>([\s\S]*?)</w:t>")
    $words = @()
    foreach ($t in $tMatches) {
        $words += $t.Groups[1].Value
    }
    Write-Host "A2 Para: $($words -join ' ')"
}

# Let's search for Figure A3 references
$patternA3 = "<w:p[^>]*?>[\s\S]*?Figure A3-[\s\S]*?</w:p>"
$matchesA3 = [regex]::Matches($xmlText, $patternA3)
Write-Host "Found $($matchesA3.Count) paragraphs matching 'Figure A3-'"
foreach ($m in $matchesA3 | Select-Object -First 10) {
    $tMatches = [regex]::Matches($m.Value, "<w:t[^>]*?>([\s\S]*?)</w:t>")
    $words = @()
    foreach ($t in $tMatches) {
        $words += $t.Groups[1].Value
    }
    Write-Host "A3 Para: $($words -join ' ')"
}
