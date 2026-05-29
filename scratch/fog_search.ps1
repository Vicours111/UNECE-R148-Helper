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

# Let's search for Figure A3-VI in document and print paragraphs/tables following it
$index = $xmlText.IndexOf("Figure A3-VI")
if ($index -ge 0) {
    # Print 5000 characters from here
    $start = [Math]::Max(0, $index - 500)
    $len = [Math]::Min($xmlText.Length - $start, 10000)
    $sub = $xmlText.Substring($start, $len)
    $clean = [regex]::Replace($sub, "<[^>]+?>", "")
    Write-Host "Cleaned around Figure A3-VI:"
    Write-Host $clean
} else {
    Write-Host "Figure A3-VI not found!"
}
