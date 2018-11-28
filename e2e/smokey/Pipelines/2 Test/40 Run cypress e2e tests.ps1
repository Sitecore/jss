Import-Module "$PSScriptRoot\..\..\system.psm1"

Write-Host "Executing e2e tests..."

$buildBlock = {
    $ErrorActionPreference = 'Stop'

    $cwd = Get-Item ".\"

    $hostName = Get-SitecoreHostName $cwd

    if($hostName) {
        $url = "http://$hostName"

        Push-Location

        try {
            Set-Location $global:CypressPath

            # run e2e tests on url
            Start-ScriptBlock {
                $ErrorActionPreference = "Continue"
                Write-Host "Starting e2e tests on $url..."

                $framework = 'react'
                $gqlssr = 'true'
                if($url -like '*angular*') {
                  $framework = 'angular'
                }
                if($url -like '*vue*') {
                  $gqlssr = 'false'
                  $framework = 'vue'
                }

                & npx cypress run --config baseUrl=$url --env SSR=true,GRAPHQL_SSR=$gqlssr,FRAMEWORK=$framework
            }
        } finally {
            Pop-Location
        }
    }
}

Invoke-ForEachSampleApp $buildBlock -blacklist @(
    "node-headless-ssr-proxy",
    "sitecore-embedded-jss-app", # does not come with a home item we can request as it's embedded
    "react-native", # mobile app has no home page
    "sitecore-javascript-renderings" # no hostname to test with at this time
  )
