param(
  [Parameter(Mandatory = $true)]
  [ValidateSet('wait-http', 'free-port', 'wait-db', 'open-when-ready')]
  [string]$Action,
  [int]$Port = 3000,
  [int]$DbPort = 5433,
  [int]$TimeoutSec = 45,
  [string]$Url = 'http://127.0.0.1:3000/'
)

$ErrorActionPreference = 'SilentlyContinue'

function Test-HttpUp {
  param([int]$WaitSec = 5)
  try {
    $r = Invoke-WebRequest -UseBasicParsing -TimeoutSec $WaitSec $Url
    return ($r.StatusCode -ge 200 -and $r.StatusCode -lt 500)
  } catch {
    return $false
  }
}

function Get-ListenPids {
  param([int]$ListenPort)
  $ids = @()
  netstat -ano | ForEach-Object {
    if ($_ -match ":$ListenPort\s+\S+\s+LISTENING\s+(\d+)\s*$") {
      $ids += [int]$Matches[1]
    }
  }
  return @($ids | Select-Object -Unique)
}

function Test-PostgresReady {
  param([int]$ListenPort)
  $client = $null
  try {
    $client = New-Object System.Net.Sockets.TcpClient
    $iar = $client.BeginConnect('127.0.0.1', $ListenPort, $null, $null)
    if (-not $iar.AsyncWaitHandle.WaitOne(2000, $false) -or -not $client.Connected) {
      return $false
    }
    $stream = $client.GetStream()
    $stream.ReadTimeout = 2000
    $stream.WriteTimeout = 2000
    # SSLRequest: postgres replies 'N' (no SSL) or 'S'
    $sslRequest = [byte[]](0, 0, 0, 8, 4, 0xD2, 0x16, 0x2F)
    $stream.Write($sslRequest, 0, $sslRequest.Length)
    $reply = $stream.ReadByte()
    return ($reply -eq 78 -or $reply -eq 83)
  } catch {
    return $false
  } finally {
    if ($client) { $client.Close() }
  }
}

switch ($Action) {
  'wait-http' {
    if (Test-HttpUp -WaitSec $TimeoutSec) { exit 0 }
    exit 1
  }

  'open-when-ready' {
    $listenDeadline = (Get-Date).AddSeconds([Math]::Min(60, $TimeoutSec))
    while ((Get-Date) -lt $listenDeadline) {
      if ((Get-ListenPids -ListenPort $Port).Count -gt 0) { break }
      Start-Sleep -Seconds 1
    }
    if (Test-HttpUp -WaitSec $TimeoutSec) {
      Start-Process 'http://localhost:3000'
      # First /admin compile can take 1–2 minutes; warm it so the tab is not a blank wait.
      Start-Process -WindowStyle Hidden powershell -NoProfile -ExecutionPolicy Bypass -Command "try { Invoke-WebRequest -UseBasicParsing -TimeoutSec 180 http://127.0.0.1:3000/admin | Out-Null } catch {}"
      exit 0
    }
    exit 1
  }

  'wait-db' {
    $deadline = (Get-Date).AddSeconds($TimeoutSec)
    while ((Get-Date) -lt $deadline) {
      if (Test-PostgresReady -ListenPort $DbPort) { exit 0 }
      Start-Sleep -Milliseconds 500
    }
    exit 1
  }

  'free-port' {
    $ids = Get-ListenPids -ListenPort $Port
    foreach ($id in $ids) {
      $cur = $id
      for ($i = 0; $i -lt 8; $i++) {
        if ($cur -le 4) { break }
        $proc = Get-CimInstance Win32_Process -Filter "ProcessId=$cur"
        if (-not $proc) { break }
        $name = $proc.Name
        Write-Host "Stopping $name PID $cur"
        & taskkill.exe /F /T /PID $cur | Out-Null
        if ($name -match '^(cmd|powershell|pwsh)\.exe$') { break }
        $cur = [int]$proc.ParentProcessId
      }
    }
    Start-Sleep -Seconds 2
    if ((Get-ListenPids -ListenPort $Port).Count -gt 0) {
      Write-Host "Port $Port is still occupied."
      exit 1
    }
    exit 0
  }
}
