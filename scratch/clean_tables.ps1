$raw = Get-Content -Raw -Path "scratch/tables_output.txt" -Encoding utf8

# Strip XML tags like <w:...> or </w:...>
$clean = [regex]::Replace($raw, "<[^>]+?>", "")

# Let's clean up multiple spaces or empty pipes
$clean = [regex]::Replace($clean, "\s*\|\s*", " | ")
$clean = [regex]::Replace($clean, " +", " ")

Set-Content -Path "scratch/tables_clean.txt" -Value $clean -Encoding utf8
Write-Host "Cleaned file written to scratch/tables_clean.txt"
