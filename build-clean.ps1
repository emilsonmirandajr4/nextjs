$ErrorActionPreference = "Continue"

# Captura output preservando cores e formatação
& npm run build-raw 2>&1 | ForEach-Object {
    $line = $_
    # Filtra apenas linhas que contêm a mensagem específica do baseline-browser-mapping
    if ($line -notmatch "\[baseline-browser-mapping\]" -and 
        $line -notmatch "baseline-browser-mapping@latest") {
        # Preserva o output original (com cores se houver)
        Write-Output $line
    }
}

exit $LASTEXITCODE
