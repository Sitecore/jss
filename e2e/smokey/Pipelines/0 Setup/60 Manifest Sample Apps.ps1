Import-Module "$PSScriptRoot\..\..\system.psm1"

$buildBlock = {
    $ErrorActionPreference = "Continue"
    & jss manifest --includeContent --includeDictionary --wipe --unattendedWipe
}

Write-Host "Manifesting all JSS sample apps..."
# Note: React native does not have a build script
Invoke-ForEachSampleApp $buildBlock -blacklist @("node-headless-ssr-proxy", "react-native", "sitecore-javascript-renderings")
