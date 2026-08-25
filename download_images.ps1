# Download images using PowerShell
$jsonPath = "C:\Users\kwoky\.dsh\browser-sessions\castinghomecraft-site\data\portfolio.json"
$imageDir = "C:\Users\kwoky\.dsh\browser-sessions\castinghomecraft-site\images"

if (!(Test-Path $imageDir)) { New-Item -ItemType Directory -Path $imageDir | Out-Null }

$json = Get-Content $jsonPath -Raw -Encoding UTF8 | ConvertFrom-Json
$count = 0

foreach ($type in @("renovation", "maintenance")) {
    foreach ($case in $json.$type) {
        $allImages = @()
        if ($case.before_images) { $allImages += $case.before_images }
        if ($case.after_images) { $allImages += $case.after_images }
        if ($case.images) { $allImages += $case.images }
        
        foreach ($img in $allImages) {
            $url = if ($img.url) { $img.url } else { $img }
            if ($url -and $url -like "https://*") {
                $filename = "$($case.id)_$count.jpg"
                $filepath = Join-Path $imageDir $filename
                
                try {
                    Write-Host "Downloading: $filename"
                    $webClient = New-Object System.Net.WebClient
                    $webClient.Headers.Add("User-Agent", "Mozilla/5.0")
                    $webClient.DownloadFile($url, $filepath)
                    $size = (Get-Item $filepath).Length
                    Write-Host "  Size: $([math]::Round($size/1KB,1)) KB"
                    
                    if ($size -gt 10000) {
                        $relativePath = "images/$filename"
                        # Replace URL in JSON
                        foreach ($arrName in @("before_images", "after_images", "images")) {
                            if ($case.$arrName) {
                                for ($i = 0; $i -lt $case.$arrName.Count; $i++) {
                                    $item = $case.$arrName[$i]
                                    $itemUrl = if ($item.url) { $item.url } else { $item }
                                    if ($itemUrl -eq $url) {
                                        if ($item.url) {
                                            $case.$arrName[$i].url = $relativePath
                                        } else {
                                            $case.$arrName[$i] = $relativePath
                                        }
                                    }
                                }
                            }
                        }
                        $count++
                    } else {
                        Write-Host "  FAILED: Too small"
                        Remove-Item $filepath -Force
                    }
                } catch {
                    Write-Host "  ERROR: $_"
                }
            }
        }
    }
}

# Save updated JSON
$json | ConvertTo-Json -Depth 10 | Set-Content $jsonPath -Encoding UTF8
Write-Host "`nDone! Downloaded $count images."
