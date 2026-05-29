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

$matchesTbl = [regex]::Matches($xmlText, "<w:tbl[^>]*?>[\s\S]*?</w:tbl>")
Write-Host "Total tables found: $($matchesTbl.Count)"

function PrintTable($idx) {
    if ($idx -ge $matchesTbl.Count) { return }
    $tbl = $matchesTbl[$idx].Value
    Write-Host "=========================================="
    Write-Host "TABLE INDEX: $($idx)"
    Write-Host "=========================================="
    
    $rows = [regex]::Matches($tbl, "<w:tr[^>]*?>[\s\S]*?</w:tr>")
    $rIdx = 0
    foreach ($r in $rows) {
        $cells = [regex]::Matches($r.Value, "<w:tc[^>]*?>([\s\S]*?)</w:tc>")
        $cellTexts = @()
        foreach ($c in $cells) {
            $tMatches = [regex]::Matches($c.Value, "<w:t[^>]*?>([\s\S]*?)</w:t>")
            $words = @()
            foreach ($t in $tMatches) { $words += $t.Groups[1].Value }
            $cellTexts += ($words -join "")
        }
        Write-Host "Row $($rIdx): $($cellTexts -join ' | ')"
        $rIdx++
    }
    Write-Host "`n"
}

# Print tables 0 to 5
for ($i = 0; $i -le 5; $i++) {
    PrintTable($i)
}
