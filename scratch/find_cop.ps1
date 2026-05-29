# Search for CoP or testTime in all project files without Chinese characters to avoid encoding issues
Get-ChildItem -Path "c:\Users\as200\Downloads\Antigravity TEST_v20260521\Projects\r148-lighting-design-helper" -Include "*.js","*.html","*.css" -Recurse | ForEach-Object {
    $c = Get-Content -Raw -Path $_.FullName -Encoding utf8
    if ($c.Contains("CoP") -or $c.Contains("COP") -or $c.Contains("cop") -or $c.Contains("testTime")) {
        Write-Host "Found in: $($_.Name)"
    }
}
