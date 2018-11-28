Import-Module "$PSScriptRoot\..\..\system.psm1"

$deployBlock = {
    $ErrorActionPreference = "Continue"
    # re-manifest app and deploy app items in Danish, which we use for i18n integration tests later
    & jss deploy items -c -d --language da-DK
}

Invoke-ForEachSampleApp $deployBlock -blacklist @('node-headless-ssr-proxy', 'react-native', 'sitecore-javascript-renderings', 'sitecore-embedded-jss-app')
