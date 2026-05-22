$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = "D:\00_JavaScript_Review\00CHALLENGE\peliculasModi"
$watcher.Filter = "bugs.md"
$watcher.EnableRaisingEvents = $true

$action = {
    Start-Sleep -Seconds 1
    Copy-Item -Path "D:\00_JavaScript_Review\00CHALLENGE\peliculasModi\bugs.md" -Destination "D:\apis" -Force
    Write-Host "`n[$(Get-Date -Format 'HH:mm:ss')] bugs.md sincronizado → D:\apis"
}

Register-ObjectEvent $watcher "Changed" -Action $action
Write-Host "=== Observando cambios en bugs.md ==="
Write-Host "Destino: D:\apis"
Write-Host "Presiona Ctrl+C para detener.`n"

while ($true) { Start-Sleep -Seconds 5 }
