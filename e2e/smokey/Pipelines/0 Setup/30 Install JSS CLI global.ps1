Import-Module "$PSScriptRoot\..\..\system.psm1"

if($global:TestOnly) {
  Exit 0
}

Write-Host "Installing latest jss-cli globally..."
$cliPath = Resolve-Path $global:SourcePath\sitecore-jss-cli

Start-ScriptBlock {
    $ErrorActionPreference = "Continue"
    & npm i -g "$cliPath"
}
