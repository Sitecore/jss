$ErrorActionPreference = "Stop"

function PSScriptRoot { $MyInvocation.ScriptName | Split-Path }

function Show-PipelineRetryPrompt($failedItemName) {
    $title = "Retry?"

    $yes = New-Object System.Management.Automation.Host.ChoiceDescription "&Yes", `
        "Retries the failed item, and if it succeeds continues the pipeline."

    $no = New-Object System.Management.Automation.Host.ChoiceDescription "&No", `
        "Stops execution of the pipeline and exits the script."

    $skip = New-Object System.Management.Automation.Host.ChoiceDescription "&Skip", `
        "Skip executing the failed pipeline item and continue the pipeline. Probably dangerous."
    $options = [System.Management.Automation.Host.ChoiceDescription[]]($yes, $no, $skip)

    $result = $host.ui.PromptForChoice($title, $null, $options, 0) 

    if($result -eq 1) {
        return $false
    }
    if($result -eq 2) {
        return $null
    }

    return $true
}

function Start-PipelineItem([string]$pipelineItemPath, $pipelineState, [switch]$Interactive, [switch]$Rethrow) 
{
    try {
        Write-Host "Executing pipeline item $pipelineItemPath" -ForegroundColor Cyan

        & $pipelineItemPath
    }
    catch {
        # if the exception isn't a rethrown subpipeline issue, show the message
        if($_.Exception.Message -ne "RETHROWN_PIPELINE_EXCEPTION") {
            Write-Host "Error occurred running $pipelineItemPath." -ForegroundColor Red
            Write-Host $_ -ForegroundColor Red
            
            if($_.Exception -ne $null) {
                Write-Host "Exception:" -ForegroundColor Yellow
                Write-Host $_.Exception -ForegroundColor White
                
                $inner = $_.Exception.InnerException
                if($inner -ne $null) {
                    Write-Host "Inner exception: " -ForegroundColor DarkYellow
                    Write-Host $inner -ForegroundColor Gray
                    
                    $inner2 = $inner.InnerException
                    if($inner2 -ne $null) {
                        Write-Host "Inner inner exception: " -ForegroundColor DarkYellow
                        Write-Host $inner2 -ForegroundColor DarkGray
                    }
                }
            }
            if(![string]::IsNullOrEmpty($_.ScriptStackTrace)) {
                Write-Host "Script Stack Trace:" -ForegroundColor Yellow
                Write-Host $_.ScriptStackTrace -ForegroundColor White
            }
        }

        if($Interactive) {
            $pipelineFileName = [io.path]::GetFileName($pipelineItemPath)
            Write-Host "`r`n`ERROR: An error occurred running pipeline item $pipelineFileName." -ForegroundColor Red
            Write-Host "See the preceding console output for error details." -ForegroundColor DarkYellow
            Write-Host "If it's something you can fix, fix it then retry the failed item." -ForegroundColor DarkYellow

            $retry = Show-PipelineRetryPrompt $pipelineFileName

            if($retry -eq $null) {
                return # skip the failed step
            }
            if($retry) {
                Start-PipelineItem @psBoundParameters
                return # if we don't return here we end up bubbling exceptions from subpipelines anyway, which we don't want if we fixed the error
            }
        }
        
        if($Rethrow) {
            # This is used so that subpipelines can properly bubble up errors (exit 1 from a subpipeline simply exits that subpipeline, but an exception persists)
            throw "RETHROWN_PIPELINE_EXCEPTION"
        }

        exit 1
    }
}

function Invoke-Pipeline([string]$path, [switch]$Rethrow, [switch]$Interactive)
{
    Test-Path $path -ErrorAction Stop > $null

    $pipelineName = [IO.Path]::GetFileName($path)
    $pipelinePath = $path.TrimEnd('\', '/')
    $pipelineState = @{}

    Write-Host "Pipeline $pipelinePath executing." -ForegroundColor Green

    # Sorting fix; see http://stackoverflow.com/questions/5427506/how-to-sort-by-file-name-the-same-way-windows-explorer-does
    Get-ChildItem  "$pipelinePath\*" -Filter *.ps1 | Sort-Object { [regex]::Replace($_.Name, '\d+', { $args[0].Value.PadLeft(20) }) } | foreach { 
        Start-PipelineItem $_ $pipelineState -Rethrow:$Rethrow -Interactive:$Interactive
    }

    Write-Host "Pipeline $pipelinePath complete." -ForegroundColor Green
}

# Invokes a "Cascade" of pipelines. All pipelines contained in $pipelinePath are executed in order
function Invoke-Pipelines([string]$pipelinePath, [switch]$Interactive) {
    # get all pipelines in primary
    $pipelines = Get-ChildItem $pipelinePath -Directory
    
    # execute pipelines in order, and if pipeline exists in any cascades execute that immediately afterwards
    $pipelines | ForEach-Object {
        $pipeline = $_

        Invoke-Pipeline $pipeline.FullName -Interactive:$Interactive
    }
}