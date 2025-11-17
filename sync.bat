@echo off
title Golden Pine Resort - Server Sync
cd /d "%~dp0"
powershell -ExecutionPolicy Bypass -File "sync-to-server.ps1"
pause