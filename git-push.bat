@echo off
title Golden Pine Resort - Git Push
cd /d "%~dp0"

echo ========================================
echo   Golden Pine Resort - Git Push
echo ========================================
echo.

set /p commit_msg="ใส่ commit message: "
if "%commit_msg%"=="" set commit_msg=Update website

echo [1/3] Adding changes...
git add .

echo [2/3] Committing changes...
git commit -m "%commit_msg%"

echo [3/3] Pushing to GitHub...
git push

echo.
echo ========================================
echo   Push เสร็จสิ้น!
echo ========================================
echo.
echo GitHub Actions กำลัง deploy ไปยัง server...
echo ตรวจสอบได้ที่: https://github.com/YOUR_USERNAME/golden-pine-resort/actions
echo.
echo เว็บไซต์จะอัปเดตใน 1-2 นาที
echo https://dev.goldenpineresorts.com
echo.
pause