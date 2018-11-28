Import-Module "$PSScriptRoot\..\..\system.psm1"

$buildBlock = {
    $ErrorActionPreference = "Continue"
    # Skip manifest because we just created one, skip build because we just made one
    & jss package --skipManifest
}

Write-Host "Packaging all JSS sample apps..."
# Note: React native does not have a build script
Invoke-ForEachSampleApp $buildBlock -blacklist @("node-headless-ssr-proxy", "react-native", "sitecore-javascript-renderings")
