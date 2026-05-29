$raw = Get-Content -Raw -Path "scratch/position_output.txt" -Encoding utf8
$clean = [regex]::Replace($raw, "<[^>]+?>", "")
$clean = [regex]::Replace($clean, "\s*\|\s*", " | ")
$clean = [regex]::Replace($clean, " +", " ")
Set-Content -Path "scratch/position_clean.txt" -Value $clean -Encoding utf8
Write-Host "Cleaned file written to scratch/position_clean.txt"
