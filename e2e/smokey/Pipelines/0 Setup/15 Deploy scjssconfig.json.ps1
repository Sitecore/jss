Import-Module "$PSScriptRoot\..\..\system.psm1"
Import-Module "$PSScriptRoot\..\..\hosts.psm1"

Write-Host "Deploying scjssconfig.json files..."

$buildBlock = {
    $ErrorActionPreference = 'Stop'

    $cwd = Get-Item ".\"

    try {
        $hostName = Get-SitecoreHostName $cwd
        $hostName = "http://$hostName"
    } catch {
        Write-Warning "'$_' while getting hostname in $cwd; the default hostname $global:SitecoreHostName will be used instead. This may result in incorrect LayoutService content results."
        $hostName = $global:SitecoreHostName
    }

    $targetPath = "$cwd\scjssconfig.json"

    if((Test-Path $targetPath)) {
        Write-Host "Moving existing $targetPath to .bak..."
        Move-Item -Path $targetPath -Destination ([IO.Path]::ChangeExtension($targetPath, ".bak")) -Force
    }

    $secret = [Guid]::NewGuid().ToString()

    $ErrorActionPreference = "Continue"
    & jss setup --nonInteractive --instancePath $global:SitecorePath --deployUrl "$hostName/sitecore/api/jss/import" --layoutServiceHost $hostName --apiKey $global:ApiKey --deploySecret "SmokeyGenerated-$secret"
}

Invoke-ForEachSampleApp $buildBlock -blacklist @("node-headless-ssr-experience-edge", "node-headless-ssr-proxy", "react-native")
