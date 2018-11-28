Import-Module "$PSScriptRoot\..\..\system.psm1"

if($global:TestOnly) {
  Exit 0
}

Write-Host "Installing latest lerna globally..."

Start-ScriptBlock {
    $ErrorActionPreference = "Continue"
    & npm install -g lerna
}
