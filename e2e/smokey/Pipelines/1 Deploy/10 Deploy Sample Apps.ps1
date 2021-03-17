Import-Module "$PSScriptRoot\..\..\system.psm1"

$deployBlock = {
    $ErrorActionPreference = "Continue"
    # --skipPackage because we made one during setup (also skips manifesting and building)
    & jss deploy app --skipPackage --skipBuild
}

Invoke-ForEachSampleApp $deployBlock -blacklist @('node-headless-ssr-experience-edge', 'node-headless-ssr-proxy', 'react-native', 'sitecore-javascript-renderings')
