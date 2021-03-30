Import-Module "$PSScriptRoot\..\..\system.psm1"

$processBlock = { 
    $ErrorActionPreference = "Continue"
    & jss deploy config 
}

Invoke-ForEachSampleApp $processBlock -blacklist @('node-headless-ssr-experience-edge', 'node-headless-ssr-proxy', 'react-native', 'sitecore-javascript-renderings')