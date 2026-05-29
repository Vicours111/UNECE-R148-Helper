# Search for grid-point or val-min in all JS files
Get-ChildItem -Path "c:\Users\as200\Downloads\Antigravity TEST_v20260521\Projects\r148-lighting-design-helper" -Filter "*.js" | ForEach-Object {
    $c = Get-Content -Raw -Path $_.FullName -Encoding utf8
    if ($c.Contains("grid-point") -or $c.Contains("val-min")) {
        Write-Host "Found in: $($_.Name)"
    }
}
