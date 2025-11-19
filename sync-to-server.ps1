# Golden Pine Resort - Auto Sync Script
# Please edit connection details below

$serverHost = "dev.goldenpineresorts.com"
$username = "YOUR_USERNAME"
$remotePath = "/public_html/"
$localPath = "d:\hotelweb2025\GoldenPineWeb\"

# Files to sync
$filesToSync = @(
    "index.html",
    "rooms.html", 
    "gallery.html",
    "contact.html",
    "booking.html",
    "admin-booking.html",
    "admin-bookings.html",
    "booking-system.js",
    "booking-system-simple.js",
    ".htaccess"
)

Write-Host "=== Golden Pine Resort - Server Sync ===" -ForegroundColor Green
Write-Host "Local Path: $localPath" -ForegroundColor Yellow
Write-Host "Remote Host: $serverHost" -ForegroundColor Yellow
Write-Host "Remote Path: $remotePath" -ForegroundColor Yellow
Write-Host ""

# Check if WinSCP exists
if (!(Get-Command "WinSCP.com" -ErrorAction SilentlyContinue)) {
    Write-Host "Please install WinSCP or use another SFTP client" -ForegroundColor Red
    Write-Host "Download: https://winscp.net/eng/download.php" -ForegroundColor Cyan
    exit 1
}

# Create WinSCP script
$winscpScript = @"
open sftp://$username@$serverHost
cd $remotePath
lcd $localPath
"@

# Add file upload commands
foreach ($file in $filesToSync) {
    if (Test-Path "$localPath$file") {
        $winscpScript += "put $file`n"
        Write-Host "Will upload: $file" -ForegroundColor Cyan
    } else {
        Write-Host "File not found: $file" -ForegroundColor Red
    }
}

# Upload img folder
$winscpScript += "put -r img/`n"

# Upload css and js folders
$winscpScript += "put -r css/`n"
$winscpScript += "put -r js/`n"
$winscpScript += "exit`n"

# Save temporary script
$tempScript = "$env:TEMP\winscp_sync.txt"
$winscpScript | Out-File -FilePath $tempScript -Encoding ASCII

Write-Host ""
Write-Host "Starting upload..." -ForegroundColor Green
Write-Host "Please enter password when prompted" -ForegroundColor Yellow

# Run WinSCP command
try {
    & WinSCP.com /script=$tempScript
    Write-Host ""
    Write-Host "Upload completed!" -ForegroundColor Green
    Write-Host "Check: https://dev.goldenpineresorts.com" -ForegroundColor Cyan
} catch {
    Write-Host "Error occurred: $($_.Exception.Message)" -ForegroundColor Red
} finally {
    # Remove temporary file
    Remove-Item $tempScript -ErrorAction SilentlyContinue
}

Write-Host ""
Write-Host "Press Enter to close..." -ForegroundColor Gray
Read-Host