Import-Module "$PSScriptRoot\..\..\system.psm1"
Import-Module "$PSScriptRoot\..\..\hosts.psm1"

$routesToTest = @(
  "/",
  "/styleguide",
  "/graphql"
);

Write-Host "Smoke testing JSS apps' SSR by requesting their routes in integrated mode..."

$buildBlock = {
    $ErrorActionPreference = 'Stop'

    $cwd = Get-Item ".\"

    $hostName = Get-SitecoreHostName $cwd

    if($hostName) {
      $routesToTest | % {
        $url = "http://$hostName$_"
        Write-Host "Requesting $url"
        $null = Invoke-WebRequest $url -UseBasicParsing
      }
    }
}

Invoke-ForEachSampleApp $buildBlock -blacklist @(
    "node-headless-ssr-experience-edge",
    "node-headless-ssr-proxy",
    "sitecore-embedded-jss-app", # does not come with a home item we can request as it's embedded
    "react-native", # mobile app has no home page
    "sitecore-javascript-renderings" # no hostname to test with at this time
  )
