# release.ps1 — Script para criar e publicar uma nova release
# Uso: .\release.ps1 -Versao "1.0.0" -Mensagem "Primeira versão estável"

param(
    [Parameter(Mandatory = $true)]
    [string]$Versao,

    [string]$Mensagem = "Release v$Versao"
)

$tag = "v$Versao"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Publicando Release: $tag" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Busca a última versão publicada no GitHub (via tags remotas)
$tagsRemotas = git ls-remote --tags origin "refs/tags/v*" 2>$null |
ForEach-Object { ($_ -split "refs/tags/")[1] } |
Where-Object { $_ -match "^v\d+\.\d+\.\d+$" } |
ForEach-Object { $_.TrimStart("v") } |
Sort-Object { [System.Version]$_ } -Descending

$ultimaVersao = $tagsRemotas | Select-Object -First 1

if ($ultimaVersao) {
    $versaoNova = [System.Version]$Versao
    $versaoAtual = [System.Version]$ultimaVersao

    Write-Host "Ultima versao no GitHub: v$ultimaVersao" -ForegroundColor Gray

    if ($versaoNova -le $versaoAtual) {
        Write-Host ""
        Write-Host "[ERRO] A versao $Versao e inferior ou igual a ultima versao (v$ultimaVersao)!" -ForegroundColor Red
        Write-Host "A nova versao deve ser maior que v$ultimaVersao" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Exemplos validos:" -ForegroundColor White
        Write-Host "  Patch: v$($versaoAtual.Major).$($versaoAtual.Minor).$($versaoAtual.Build + 1)" -ForegroundColor Cyan
        Write-Host "  Minor: v$($versaoAtual.Major).$($versaoAtual.Minor + 1).0" -ForegroundColor Cyan
        Write-Host "  Major: v$($versaoAtual.Major + 1).0.0" -ForegroundColor Cyan
        exit 1
    }
}
else {
    Write-Host "Nenhuma versao encontrada no GitHub. Esta sera a primeira release!" -ForegroundColor Gray
}

# Verifica se a tag já existe localmente
$tagExiste = git tag -l $tag
if ($tagExiste) {
    Write-Host "[ERRO] A tag $tag ja existe localmente!" -ForegroundColor Red
    Write-Host "Use uma versao diferente ou delete a tag com: git tag -d $tag" -ForegroundColor Yellow
    exit 1
}

# Atualiza a versão no package.json
Write-Host "Atualizando package.json para a versao $Versao..." -ForegroundColor Yellow
npm version $Versao --no-git-tag-version

# Verifica se há mudanças não commitadas
$status = git status --porcelain
if ($status) {
    Write-Host "Mudancas encontradas, commitando..." -ForegroundColor Yellow
    git add .
    git commit -m $Mensagem
}
else {
    Write-Host "Nenhuma mudanca pendente." -ForegroundColor Gray
}


# Limita o número de tags remotas a 3 (mantém as 2 mais recentes além da nova)
$tagsRemotasParaDeletar = @()
if ($tagsRemotas.Count -ge 3) {
    $tagsRemotasParaDeletar = $tagsRemotas | Select-Object -Skip 2
    foreach ($tagDel in $tagsRemotasParaDeletar) {
        $tagName = "v$tagDel"
        Write-Host "Deletando tag antiga: $tagName" -ForegroundColor Red
        git push --delete origin $tagName
        git tag -d $tagName | Out-Null
    }
}

# Cria a tag
Write-Host "Criando tag $tag..." -ForegroundColor Yellow
git tag $tag

# Push do código e da tag
Write-Host "Enviando para o GitHub..." -ForegroundColor Yellow
git push origin main
git push origin $tag

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  Release $tag publicada com sucesso!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "O GitHub Actions vai buildar automaticamente." -ForegroundColor White
Write-Host "Acompanhe em: https://github.com/JoaoHCSilva/learning-agent/actions" -ForegroundColor Gray
Write-Host ""