@echo off
title Golden Pine Resort - Git Setup
cd /d "%~dp0"

echo ========================================
echo   Golden Pine Resort - Git Setup
echo ========================================
echo.

echo [1/5] Initializing Git repository...
git init

echo [2/5] Adding all files...
git add .

echo [3/5] Creating first commit...
git commit -m "Initial commit: Golden Pine Resort website with auto-deploy"

echo [4/5] Setting up remote repository...
echo Please create a new repository in GitHub named: golden-pine-resort
echo Then copy the URL and paste it below
echo Example: https://github.com/YOUR_USERNAME/golden-pine-resort.git
echo.
set /p repo_url="Enter GitHub Repository URL: "

git branch -M main
git remote add origin %repo_url%

echo [5/5] Pushing to GitHub...
git push -u origin main

echo.
echo ========================================
echo   Setup Complete! 
echo ========================================
echo.
echo Next steps:
echo 1. Go to GitHub Repository Settings
echo 2. Select Secrets and variables ^> Actions  
echo 3. Add Repository secrets:
echo    - FTP_USERNAME: Your SFTP username
echo    - FTP_PASSWORD: Your SFTP password
echo.
echo After that, every push will auto-deploy!
echo.
pause