param(
    [string]$ApiKey,
    [string]$SitecorePath,
    [string]$SitecoreHostName,
    [switch]$Interactive,
    [switch]$TestOnly
)

$ErrorActionPreference = "Stop"

function PSScriptRoot { $MyInvocation.ScriptName | Split-Path }

Import-Module $PSScriptRoot\pipelines.psm1

Write-Host @"
    .(
    /%/\
   (%(%))   S M O K E Y
  .-'...`-.
 <`-'.'`-'->
"@
Write-Host ""
Write-Host "Automated smoke testing for JSS"
Write-Host ""
Write-Host "NOTE: Smokey will overwrite the content for all JSS sample apps during its run."
Write-Host "Press CTRL-C now to abort if that is a problem."
Write-Host ""

if($Interactive) {
    Write-Host "Prerequisites:"
    Write-Host "* Sitecore instance with JSS Server installed"
    Write-Host "* Register the da-DK language with Sitecore"
    Write-Host "* IIS pointed to Sitecore with *:80 mapped to it"
    Write-Host "* Run as admin, or account with write access to hosts"
    $null = Read-Host "Press enter when prerequisites are complete"
}

if(-not $SitecorePath -or -not (Test-Path $SitecorePath)) {
    throw 'The -SitecorePath argument must be passed and resolve to the "website" folder of a working Sitecore instance with JSS server components installed.'
}

if(-not (Test-Path "$SitecorePath\Views\JssApp.cshtml")) {
    throw "The Sitecore at $SitecorePath does not appear to have the JSS Server Components installed. Ensure that they are installed according to the documentation."
}

if(-not $ApiKey -or -not $ApiKey -match '^[{(]?[0-9A-F]{8}[-]?([0-9A-F]{4}[-]?){3}[0-9A-F]{12}[)}]?$') {
    throw "The -ApiKey argument was not passed, or was not a valid GUID. Create an SSC API key on the Sitecore instance and provide it with this argument."
}

if(-not $SitecoreHostName) {
    throw "The -SitecoreHostName argument was not passed. Pass the root URL for the working Sitecore instance, e.g. http://sc9.local"
}

try {
  Start-Transcript -Path "$PSScriptRoot\smokey.log"

  # WELL-KNOWN GLOBALS (everyone uses these)
  $global:RepoRoot = Resolve-Path $PSScriptRoot\..\..
  $global:SampleAppsPath = Resolve-Path $PSScriptRoot\..\..\samples
  $global:SourcePath = Resolve-Path $PSScriptRoot\..\..\packages
  $global:CypressPath = Resolve-Path $PSScriptRoot\..\cypress
  $global:SitecorePath = $SitecorePath
  $global:SitecoreHostName = $SitecoreHostName
  $global:ApiKey = $ApiKey
  $global:TestOnly = $TestOnly

  Invoke-Pipelines $PSScriptRoot\Pipelines -Interactive:$Interactive
}
finally {
  Stop-Transcript
}
