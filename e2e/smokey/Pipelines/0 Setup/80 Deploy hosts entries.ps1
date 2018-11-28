Import-Module "$PSScriptRoot\..\..\system.psm1"
Import-Module "$PSScriptRoot\..\..\hosts.psm1"

Write-Host "Deploying hosts file entries..."

$buildBlock = {
    $ErrorActionPreference = 'Stop'

    $cwd = Get-Item ".\"

    $hostName = Get-SitecoreHostName $cwd

    if($hostName) {
        Add-Host '127.0.0.1' $hostName
    }
}

# Note: Embedded Wizard sample uses an existing site, so it does not need a hosts entry
Invoke-ForEachSampleApp $buildBlock -blacklist @("node-headless-ssr-proxy", "sitecore-embedded-jss-app", "react-native", "sitecore-javascript-renderings")
