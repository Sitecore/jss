import { writeFileSync } from 'fs';

export function writeSecretPatchFile(path: string, appName: string, secret: string) {
  writeFileSync(path, createSecretPatchContents(appName, secret), { encoding: 'utf8' });
}

export function createSecretPatchContents(appName: string, secret: string) {
  return `<configuration xmlns:patch="http://www.sitecore.net/xmlconfig/">
  <sitecore>
    <javaScriptServices>
      <apps>
        <app name="${appName}"
             deploymentSecret="${secret}"
             debugSecurity="false"
        />
      </apps>
    </javaScriptServices>
  </sitecore>
</configuration>
`;
}
