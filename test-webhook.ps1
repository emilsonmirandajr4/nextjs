# Script para testar o webhook de revalidação

$url = "https://primeiranews.com/api/revalidate"  # URL em produção
$secret = "primeiranews2024webhook789secure456token123xyz"

$headers = @{
    "Authorization" = "Bearer $secret"
    "Content-Type" = "application/json"
}

$body = @{
    tags = @("posts-list", "categories")
} | ConvertTo-Json

Write-Host "🔄 Testando webhook do Next.js..." -ForegroundColor Cyan
Write-Host "URL: $url" -ForegroundColor Gray

try {
    $response = Invoke-RestMethod -Uri $url -Method POST -Headers $headers -Body $body
    Write-Host "✅ Webhook funcionou!" -ForegroundColor Green
    Write-Host ($response | ConvertTo-Json -Depth 5) -ForegroundColor Gray
} catch {
    Write-Host "❌ Erro no webhook:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}
