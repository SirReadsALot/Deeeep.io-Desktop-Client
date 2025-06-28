[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$InstallationPath = "$env:LOCALAPPDATA\Deeeep.io Desktop Client"
$DownloadPath = [System.IO.Path]::Combine([System.IO.Path]::GetTempPath(), "ddc.zip")

function Write-Done {
    process {
        Write-Host -Object ' - Done' -ForegroundColor 'Green'
    }
}

function Get-DDC {
    begin {
        $latestRelease = Invoke-RestMethod -Uri 'https://api.github.com/repos/SirReadsALot/Deeeep.io-Desktop-Client/releases/latest'
        $targetVersion = $latestRelease.tag_name
    }
    process {
        Write-Host -Object "Downloading DDC " -NoNewline
        Write-Host -Object "$targetVersion" -NoNewline -ForegroundColor 'Blue'
        Write-Host -Object "..." -NoNewline
        $Parameters = @{
            Uri             = "https://github.com/SirReadsALot/Deeeep.io-Desktop-Client/releases/download/$targetVersion/Deeeep.io-Desktop-Client-Windows.zip"
            UseBasicParsing = $true
            OutFile         = $DownloadPath
        }
        Invoke-WebRequest @Parameters
        Write-Done
    }
}

function Install-DDC {
    process {
        Write-Host -Object "Extracting..." -NoNewline
        Expand-Archive -Path $DownloadPath -DestinationPath $InstallationPath -Force
        Write-Done
    }
    end {
        Remove-Item -Path $DownloadPath -Force -ErrorAction 'SilentlyContinue'
    }
}

function Add-Shortcut {
    process {
        Write-Host -Object "Creating shortcut..." -NoNewline
        $FileName = (Get-ChildItem $InstallationPath -File | Where-Object { $_.Name -like "Deeeep.io-Desktop-Client*.exe" }).Name
        $ShortcutPath = "$env:APPDATA\Microsoft\Windows\Start Menu\Programs\Deeeep.io Desktop Client.lnk" 
        $TargetPath = [System.IO.Path]::Combine($InstallationPath, $FileName)
        $Shell = New-Object -ComObject WScript.Shell 
        $Shortcut = $Shell.CreateShortcut($ShortcutPath) 
        $Shortcut.TargetPath = $TargetPath
        $Shortcut.WorkingDirectory = $InstallationPath
        $Shortcut.Save()
        Write-Done
    }
}

Get-DDC
Install-DDC
Add-Shortcut