@echo off
REM Customize the parameters to smokey.ps1 below
REM NOTE: if you just want to build + test, pass -TestOnly; this bypasses node_module cleaning/reinstall and makes the process much faster. Well, some.
powershell.exe -NoExit -File .\smokey.ps1 -ApiKey "E28EAE25-ABB6-4C2E-9FE0-FBC884B5C8B8" -SitecorePath "C:\inetpub\wwwroot\unit91.sc" -SitecoreHostName "http://unit91.sc" -Interactive -TestOnly
