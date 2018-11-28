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
        $routesToTest | % {
          $url = "http://$hostName/sitecore/api/layout/render/jss?item=$_&sc_apikey=$global:ApiKey"
          Write-Host "Requesting Layout Service @ $url"
          $null = Invoke-WebRequest $url -UseBasicParsing
        }

    }
}

Invoke-ForEachSampleApp $buildBlock -blacklist @(
    "node-headless-ssr-proxy",
    "sitecore-embedded-jss-app", # does not come with a home item we can request as it's embedded
    "react-native", # mobile app has no home page
    "sitecore-javascript-renderings" # no hostname to test with at this time
   )
