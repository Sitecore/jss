dotnet new tool-manifest
dotnet nuget add source -n Sitecore https://sitecore.myget.org/F/sc-packages/api/v3/index.json
dotnet tool install Sitecore.CLI

Write-Host "Installing Sitecore CLI..." -ForegroundColor Green
dotnet tool restore
dotnet sitecore plugin add -n Sitecore.DevEx.Extensibility.Serialization
dotnet sitecore plugin add -n Sitecore.DevEx.Extensibility.Publishing


dotnet sitecore login --cm https://cm.jssdev.localhost/ --auth https://id.jssdev.localhost/ --allow-write true --client-id "SitecoreCLIServer" --client-secret "testsecret" --client-credentials true

dotnet sitecore ser pull

dotnet sitecore ser push
