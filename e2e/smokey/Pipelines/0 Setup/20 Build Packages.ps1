Import-Module "$PSScriptRoot\..\..\system.psm1"

Push-Location

try {
    Set-Location $global:RepoRoot

    # run library build
    Start-ScriptBlock {
        Write-Host "Executing ``npm run build-packages`` to build all JSS libs..."
        $ErrorActionPreference = "Continue"
        & npm run build-packages
    }
} finally {
    Pop-Location
}
