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

# Let's search for "Figure A3-I" in the xmlText and grab paragraphs around it
# Or find Table A3-1 or anything with grid weights
$matches = [regex]::Matches($xmlText, "<w:p[^>]*?>[\s\S]*?Figure A3-I[\s\S]*?</w:p>")
Write-Host "Found $($matches.Count) paragraphs matching 'Figure A3-I'"
foreach ($m in $matches) {
    $tMatches = [regex]::Matches($m.Value, "<w:t[^>]*?>([\s\S]*?)</w:t>")
    $words = @()
    foreach ($t in $tMatches) { $words += $t.Groups[1].Value }
    Write-Host "Para: $($words -join ' ')"
}

# Let's find any text containing standard grid weights
# e.g., numbers like 20, 10, 70, 35, 90, 100 on H-V, H-5L etc.
# Standard Figure A3-I is a grid. Let's see if there is a table representing it.
# We can search for tables near "Figure A3-I"
$pattern = "<w:tbl[^>]*?>[\s\S]*?Figure A3-I[\s\S]*?</w:tbl>"
$matchesTbl = [regex]::Matches($xmlText, $pattern)
Write-Host "Found $($matchesTbl.Count) tables with 'Figure A3-I'"

# Let's search for "Figure A3-II" (drl), "Figure A3-III" (chmsl), "Figure A3-IV" (cat6), etc.
$figNames = @("Figure A3-I", "Figure A3-II", "Figure A3-III", "Figure A3-IV", "Figure A3-V", "Figure A3-VI", "Figure A3-VII", "Figure A3-VIII")
foreach ($fig in $figNames) {
    $matchesFig = [regex]::Matches($xmlText, "<w:p[^>]*?>[\s\S]*?$fig[\s\S]*?</w:p>")
    Write-Host "$($fig): found $($matchesFig.Count) paras"
    foreach ($m in $matchesFig | Select-Object -First 3) {
        $tMatches = [regex]::Matches($m.Value, "<w:t[^>]*?>([\s\S]*?)</w:t>")
        $words = @()
        foreach ($t in $tMatches) { $words += $t.Groups[1].Value }
        Write-Host "  Para: $($words -join ' ')"
    }
}
