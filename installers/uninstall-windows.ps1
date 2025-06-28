$InstallationPath = "$env:LOCALAPPDATA\Deeeep.io Desktop Client"
$ShortcutPath = "$env:APPDATA\Microsoft\Windows\Start Menu\Programs\Deeeep.io Desktop Client.lnk"

function Write-Done {
    process {
        Write-Host -Object ' - Done' -ForegroundColor 'Green'
    }
}

function Uninstall-DDC {
    process {
        Write-Host -Object "Removing DDC..." -NoNewline
        Remove-Item -Path $InstallationPath -Force -Recurse
        Remove-Item -Path $ShortcutPath -Force
        Write-Done
    }
}

Uninstall-DDC