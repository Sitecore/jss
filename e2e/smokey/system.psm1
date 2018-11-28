$ErrorActionPreference = "Stop"

function Start-ScriptBlock
{
    param
    (
        [ScriptBlock] $ScriptBlock,
        [string] $StderrPrefix = "",
        [int[]] $AllowedExitCodes = @(0)
    )
 
    $backupErrorActionPreference = $script:ErrorActionPreference
 
    $script:ErrorActionPreference = "Continue"
    try
    {
        $oldLastExitCode = $LASTEXITCODE
        
        write-host (get-location)

        & $ScriptBlock 2>&1 | ForEach-Object -Process `
            {
                if ($_ -is [System.Management.Automation.ErrorRecord])
                {
                    "$StderrPrefix$_"
                }
                else
                {
                    "$_"
                }
            }

        if ($LASTEXITCODE -and $AllowedExitCodes -notcontains $LASTEXITCODE -and $LASTEXITCODE -ne $oldLastExitCode)
        {
            $cwd = Get-Item ".\"
            throw "Execution of $($ScriptBlock.ToString()) in $($cwd.FullName) failed with exit code $LASTEXITCODE"
        }
    }
    finally
    {
        $script:ErrorActionPreference = $backupErrorActionPreference
    }
}

function Invoke-ProcessItem($path, $scriptBlock) {
    Push-Location

    $fullPath = $path.FullName

    Write-Host "Processing $($path.Name)..."

    try {
        Set-Location $fullPath

        Start-ScriptBlock $scriptBlock
    } finally {
        Pop-Location
    }
}

function Invoke-ForEachFolder($path, $scriptBlock, $blacklist) {
    Get-ChildItem $path -Directory | % { 
        if($blacklist -contains $_.Name) {
            Write-Host "Ignoring $($_.Name) because of blacklist"
            return
        }

        Write-Host "$_..."
        Invoke-ProcessItem $_ $scriptBlock
    }
}

function Invoke-ForEachFolderAsync($path, $scriptBlock, $blacklist) {
    Get-ChildItem $path -Directory | % { 
        if($blacklist -contains $_.Name) {
            Write-Host "Ignoring $($_.Name) because of blacklist"
            return
        }

        Write-Host "Starting job $_..."

        $jobScript = {
            param($path, $innerScriptBlock, $scriptRoot)

            Import-Module "$scriptRoot\system.psm1"

            # we have to reparse the original scriptblock
            # because passing it in converted it to a string (this runs on a different thread with different code)
            $finalScriptBlock = [scriptblock]::Create($innerScriptBlock)

            Invoke-ProcessItem $path $finalScriptBlock
        }

        $null = Start-Job -ScriptBlock $jobScript -ArgumentList @($_, $scriptBlock, $PSScriptRoot)
    }
    
    Write-Host "Awaiting async iteration completion (results shown when all complete)..."
    Get-Job | Wait-Job | Receive-Job
}



function Invoke-ForEachSampleApp($scriptBlock, $blacklist, [switch]$async) {
    $blist = @()
    $blist += $blacklist
    
    if($async) {
        Invoke-ForEachFolderAsync $global:SampleAppsPath $scriptBlock $blist
    } else {
        Invoke-ForEachFolder $global:SampleAppsPath $scriptBlock $blist
    }
}

function Invoke-ForEachLibrary($scriptBlock, $blacklist, [switch]$async) {
    $blist = @()
    $blist += $blacklist
    $blist += 'demo'

    if($async) {
        Invoke-ForEachFolderAsync $global:SourcePath $scriptBlock $blist
    } else {
        Invoke-ForEachFolder $global:SourcePath $scriptBlock $blist
    }
}

Export-ModuleMember Start-ScriptBlock
Export-ModuleMember Invoke-ForEachLibrary
Export-ModuleMember Invoke-ForEachSampleApp
Export-ModuleMember Invoke-ProcessItem