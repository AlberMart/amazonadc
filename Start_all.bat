@echo off
setlocal EnableExtensions
cd /d "%~dp0"
title Amazon Air Duct Cleaning

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
set /a DB_TRIES=0
:wait_db
set /a DB_TRIES+=1
docker compose exec -T postgres pg_isready -U payload -d amazonadc >nul 2>&1
if not errorlevel 1 goto db_ready
if %DB_TRIES% GEQ 30 (
  echo Postgres did not become ready. Check Docker Desktop.
  pause
  exit /b 1
)
timeout /t 2 /nobreak >nul
goto wait_db

:db_ready
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

call :site_is_up
if not errorlevel 1 (
  echo Site is already running.
  start "" "http://localhost:3000"
  echo.
  echo Close this window. The site stays up in the other terminal.
  pause
  exit /b 0
)

echo Starting Next.js. Wait until this window says Ready, then open the site.
echo The first page can take one to two minutes. Do not refresh until it loads.
echo Close this window to stop the site.
echo.
start "" /min powershell -NoProfile -ExecutionPolicy Bypass -Command "Start-Sleep -Seconds 25; Start-Process 'http://localhost:3000'"

call %PNPM% run dev
exit /b %ERRORLEVEL%

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

:site_is_up
powershell -NoProfile -ExecutionPolicy Bypass -Command "try { $r = Invoke-WebRequest -UseBasicParsing -TimeoutSec 4 http://127.0.0.1:3000/; if ($r.StatusCode -ge 200) { exit 0 } else { exit 1 } } catch { exit 1 }"
exit /b %ERRORLEVEL%
