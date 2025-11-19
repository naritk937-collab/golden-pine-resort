# Read the file
$content = Get-Content "booking.html" -Raw

# Find the position of </html>
$endIndex = $content.IndexOf('</html>')

if ($endIndex -gt 0) {
    # Keep everything up to and including </html>
    $cleanContent = $content.Substring(0, $endIndex + 7)
    
    # Write back to file
    [System.IO.File]::WriteAllText("booking.html", $cleanContent, [System.Text.UTF8Encoding]::new($false))
    Write-Host "File cleaned successfully!"
} else {
    Write-Host "Could not find </html> tag"
}
