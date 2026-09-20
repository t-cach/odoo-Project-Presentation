@echo off
title Odoo 18 Equipment Maintenance Presentation
cd /d "%~dp0"

echo =========================================================
echo  Starting Odoo 18 Presentation System
echo =========================================================

IF NOT EXIST "node_modules" (
    echo Installing dependencies...
    call npm install
)

echo Starting Vite development server on http://localhost:3000...
start /b "" npm run dev

echo Waiting for server to initialize...
timeout /t 3 /nobreak >nul

echo Opening browser at http://localhost:3000...
start http://localhost:3000

echo.
echo Presentation is running! Keep this command window open.
echo Press Ctrl+C to stop the presentation server when done.
echo =========================================================
