import { writeFileSync } from 'fs';

/**
 * @param {string} path
 * @param {string} appName
 * @param {string} secret
 */
export function writeSecretPatchFile(path: string, appName: string, secret: string) {
  writeFileSync(path, createSecretPatchContents(appName, secret), { encoding: 'utf8' });
}

/**
 * @param {string} appName
 * @param {string} secret
 */
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
