
$file = "$($env:WINDIR)\System32\drivers\etc\hosts"

function add-host([string]$ip, [string]$hostname) {
    remove-host $hostname
    $ip + "`t" + $hostname | Out-File -encoding ASCII -append $file
}

function remove-host([string]$hostname) {
    $c = Get-Content $file
    $newLines = @()

    foreach ($line in $c) {
        $bits = [regex]::Split($line, "\t+")
        if ($bits.count -eq 2) {
            if ($bits[1] -ne $hostname) {
                $newLines += $line
            }
        } else {
            $newLines += $line
        }
    }

    # Write file
    Clear-Content $file
    foreach ($line in $newLines) {
        $line | Out-File -encoding ASCII -append $file
    }
}

function Get-SitecoreHostName($sampleAppRootPath) {
    $configFiles = Resolve-Path "$sampleAppRootPath\sitecore\config\*.config"

    if(-not $configFiles) {
        throw "$sampleAppRootPath did not contain any Sitecore config patch files."
    }

    $configFiles | % {
        $content = Get-Content $_ -Raw
        $isMatch = $content -match '<site (?s)(.*)hostName="([^"]+)'

        if(-not $isMatch -or $matches.count -lt 2) {
            return
        }

        $hostName = $matches[2]
    }

    if(-not $hostName) {
        throw "$sampleAppRootPath did not have any config patch defining a hostName"
    }

    return "$hostName"
}