Import-Module "$PSScriptRoot\..\..\system.psm1"

Push-Location

try {
    Set-Location $global:CypressPath

    # install node_modules within cypress
    Start-ScriptBlock {
        $ErrorActionPreference = "Continue"
        Write-Host "Installing Cypress.io for e2e tests..."
        & npm i
    }

    Start-ScriptBlock {
      $ErrorActionPreference = "Continue"
      Write-Host "Installing Cypress..."
      & npx cypress install
  }
} finally {
    Pop-Location
}
