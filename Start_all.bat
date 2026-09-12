@echo off
setlocal EnableExtensions
cd /d "%~dp0"
title Amazon Air Duct Cleaning

set "PS_HELPER=%~dp0scripts\start-all.ps1"

echo.
echo Amazon Air Duct Cleaning
echo Site:  http://localhost:3000
echo Admin: http://localhost:3000/admin
echo.

if not exist ".env" (
  if exist ".env.example" (
    echo .env not found. Copying .env.example ...
    copy /Y ".env.example" ".env" >nul
  ) else (
    echo .env is missing. Create it before starting.
    pause
    exit /b 1
  )
)

call :ensure_docker
if errorlevel 1 (
  pause
  exit /b 1
)

echo Starting Postgres on port 5433 ...
docker compose up -d
if errorlevel 1 (
  echo docker compose failed.
  pause
  exit /b 1
)

echo Waiting for Postgres ...
powershell -NoProfile -ExecutionPolicy Bypass -File "%PS_HELPER%" -Action wait-db -TimeoutSec 90
if errorlevel 1 (
  echo Postgres did not become ready. Check Docker Desktop.
  pause
  exit /b 1
)
echo Postgres is ready.

call :resolve_pnpm
if errorlevel 1 (
  pause
  exit /b 1
)

if not exist "node_modules\" (
  echo Installing dependencies ...
  call %PNPM% install
  if errorlevel 1 (
    echo Install failed.
    pause
    exit /b 1
  )
)

netstat -ano | findstr ":3000" | findstr "LISTENING" >nul
if not errorlevel 1 (
  echo Port 3000 is in use. Checking if the site responds ...
  powershell -NoProfile -ExecutionPolicy Bypass -File "%PS_HELPER%" -Action wait-http -TimeoutSec 90
  if not errorlevel 1 (
    echo Site is already running.
    start "" "http://localhost:3000"
    echo.
    echo Close this window. The site stays up in the other terminal.
    pause
    exit /b 0
  )
  echo Site is not responding. Stopping the stale process on port 3000 ...
  powershell -NoProfile -ExecutionPolicy Bypass -File "%PS_HELPER%" -Action free-port -Port 3000
  if errorlevel 1 (
    echo Could not free port 3000. Close the other Node process and try again.
    pause
    exit /b 1
  )
  if exist ".next\" (
    echo Clearing interrupted Next.js cache ...
    rmdir /s /q ".next" 2>nul
  )
)

echo Starting Next.js. This window must stay open.
echo The first page can take one to two minutes. Browser opens when it is ready.
echo Admin at /admin compiles in the background after that — wait for Login, do not refresh.
echo Close this window to stop the site.
echo.
start "" /min powershell -NoProfile -ExecutionPolicy Bypass -File "%PS_HELPER%" -Action open-when-ready -TimeoutSec 180

call %PNPM% run dev
set "DEV_EXIT=%ERRORLEVEL%"
if not "%DEV_EXIT%"=="0" (
  echo Next.js exited with code %DEV_EXIT%.
  pause
)
exit /b %DEV_EXIT%

:ensure_docker
docker info >nul 2>&1
if not errorlevel 1 exit /b 0

echo Docker is not running. Starting Docker Desktop ...
set "DOCKER_DESKTOP=%ProgramFiles%\Docker\Docker\Docker Desktop.exe"
if not exist "%DOCKER_DESKTOP%" set "DOCKER_DESKTOP=%ProgramFiles(x86)%\Docker\Docker\Docker Desktop.exe"
if not exist "%DOCKER_DESKTOP%" (
  echo Docker Desktop was not found. Install it, then run this file again.
  exit /b 1
)

start "" "%DOCKER_DESKTOP%"
set /a DOCKER_TRIES=0
:wait_docker
set /a DOCKER_TRIES+=1
docker info >nul 2>&1
if not errorlevel 1 (
  echo Docker is ready.
  exit /b 0
)
if %DOCKER_TRIES% GEQ 40 (
  echo Docker Desktop did not start in time.
  exit /b 1
)
timeout /t 3 /nobreak >nul
goto wait_docker

:resolve_pnpm
set "PNPM="
where pnpm >nul 2>&1
if not errorlevel 1 (
  set "PNPM=pnpm"
  exit /b 0
)
where npx >nul 2>&1
if errorlevel 1 (
  echo Node.js was not found. Install Node.js 20, then run this file again.
  exit /b 1
)
set "PNPM=npx --yes pnpm@9.15.9"
exit /b 0
