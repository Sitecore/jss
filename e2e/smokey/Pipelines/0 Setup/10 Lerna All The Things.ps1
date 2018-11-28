Import-Module "$PSScriptRoot\..\..\system.psm1"

if($global:TestOnly) {
  Exit 0
}

Push-Location

try {
    Set-Location $global:RepoRoot

    # clean all node_moduleses
    Start-ScriptBlock {
        $ErrorActionPreference = "Continue"
        Write-Host "Cleaning all node_modules for a 100% clean build (`lerna clean`)..."
        & lerna clean --yes
    }

    # lerna symlink/install everything
    Start-ScriptBlock {
        Write-Host "Executing `lerna bootstrap` to initialize package dependencies..."
        $ErrorActionPreference = "Continue"
        & lerna bootstrap
    }
} finally {
    Pop-Location
}
