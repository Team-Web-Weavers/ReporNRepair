@echo off
echo ====================================================
echo        🧰 HackUrWay - Setup Script (Windows)
echo        Downloads: PostgreSQL 17.4 + Ollama Installer
echo ====================================================

:: Create a tools directory to store downloads
mkdir tools
cd tools

:: Download PostgreSQL 17.4 (Windows x64 installer)
echo Downloading PostgreSQL 17.4 installer...
curl -L -o postgresql-17.4-windows-x64.exe "https://get.enterprisedb.com/postgresql/postgresql-17.4-1-windows-x64.exe"

:: Download Ollama Windows installer
echo Downloading Ollama installer...
curl -L -o OllamaSetup.exe "https://ollama.com/download/OllamaSetup.exe"

echo ====================================================
echo ✅ Downloads completed in 'tools' folder.
echo ❗ Please run each installer manually with admin rights.
echo ====================================================
pause
