$lines = Get-Content -Path "scratch/tables_output.txt"
Write-Host "Total lines: $($lines.Count)"

$tblIndices = @()
for ($i=0; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -like "TABLE INDEX:*") {
        $tblIndices += $i
    }
}

for ($k=0; $k -lt $tblIndices.Count; $k++) {
    $start = $tblIndices[$k]
    $end = $lines.Count
    if ($k -lt $tblIndices.Count -1) {
        $end = $tblIndices[$k+1]
    }
    
    Write-Host "============================================="
    Write-Host "Printing Table at line $($start): $($lines[$start])"
    Write-Host "============================================="
    
    # print up to 40 lines of this table
    $limit = [Math]::Min($start + 40, $end)
    for ($idx = $start + 1; $idx -lt $limit; $idx++) {
        Write-Host $lines[$idx]
    }
}
