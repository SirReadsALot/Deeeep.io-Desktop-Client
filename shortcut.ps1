
$Version = "v1.7"
$Desktop = $env:USERPROFILE + "\Desktop\Deeeep.io.lnk"
$ShortcutFile = "Deeeep.io.lnk"
$TargetFile = "%LOCALAPPDATA%\DDC\" + $Version + "\main.exe"
$WScriptShell = New-Object -ComObject WScript.Shell
$shortcut = $WScriptShell.CreateShortcut($ShortcutFile)
$shortcut.TargetPath = $TargetFile
$shortcut.IconLocation = "%LOCALAPPDATA%\DDC\" + $Version + "\assets\logo.ico"
$shortcut.Save()
Remove-Item $Desktop
Move-Item -Path "Deeeep.io.lnk" -Destination $Desktop
