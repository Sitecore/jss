Import-Module "$PSScriptRoot\..\..\system.psm1"

Push-Location

try {
    Set-Location $global:RepoRoot

    # run library build
    Start-ScriptBlock {
        Write-Host "Executing 'npm run build-apps' to build all JSS sample apps..."
        $ErrorActionPreference = "Continue"
        & npm run build-apps
    }
} finally {
    Pop-Location
}
