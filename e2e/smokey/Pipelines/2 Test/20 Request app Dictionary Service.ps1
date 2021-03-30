Import-Module "$PSScriptRoot\..\..\system.psm1"
Import-Module "$PSScriptRoot\..\..\hosts.psm1"

$routesToTest = @(
  "/",
  "/styleguide",
  "/graphql"
);

Write-Host "Smoke testing JSS apps by requesting their routes JSON using the Layout Service..."
Write-Host "NOTE: Apps' custom LS configurations are ignored for this test"

$buildBlock = {
    $ErrorActionPreference = 'Stop'

    $cwd = Get-Item ".\"

    $hostName = Get-SitecoreHostName $cwd

    if($hostName) {
        # hack: for any extra apps that have been added to samples using `jss create` for prerelease testing,
        # their hostname will be 'appname.dev.local` but their app name (for the dictionary) will be 'appname'
        # so as a hack to get e2e to work for them, we're replacing '.dev.local' in the hostname before adding to
        # the dictionary URL
        $appName = $hostName.replace('.dev.local', '')
        $url = "http://$hostName/sitecore/api/jss/dictionary/$appName/en?sc_apikey=$global:ApiKey"
        Write-Host "Requesting Dictionary Service @ $url"
        $null = Invoke-WebRequest $url -UseBasicParsing
    }
}

Invoke-ForEachSampleApp $buildBlock -blacklist @(
    "node-headless-ssr-experience-edge",
    "node-headless-ssr-proxy",
    "sitecore-embedded-jss-app", # does not come with a home item we can request as it's embedded
    "react-native", # mobile app has no home page
    "sitecore-javascript-renderings" # no hostname to test with at this time
   )
