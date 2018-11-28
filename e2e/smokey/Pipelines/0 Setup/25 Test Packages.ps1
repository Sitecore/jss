Import-Module "$PSScriptRoot\..\..\system.psm1"

Push-Location

try {
    Set-Location $global:RepoRoot

    # run library tests
    Start-ScriptBlock {
        Write-Host "Executing ``npm run test-packages`` to unit test all JSS libs..."
        $ErrorActionPreference = "Continue"
        & npm run test-packages
    }
} finally {
    Pop-Location
}
