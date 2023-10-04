import path from 'path';
import fs from 'fs';

setupByoc();
/**
 * BYOC SETUP
 * Picks up BYOC components and ensures they are registered with the app by default
 * It allows JSS to enable different components for different JSS addons 
 */
function setupByoc(): void {
  const byocImportPath = 'src/byoc-components/';
  const scopes = ['client-builtin', 'SSR-builtin'];
  scopes.forEach((scope) => {
    let fileContent = '';
    const filePath = path.resolve(byocImportPath + scope);

    fileContent = fs
      .readdirSync(filePath, { withFileTypes: true })
      .filter((item) => !item.isDirectory())
      .map((file) => {
        return `import '${byocImportPath + scope}/${file.name}';`;
      })
      .join('\r\n')
      .concat('\r\n');

    fileContent += 'export default {};\r\n';

    fs.writeFileSync(`src/temp/${scope}-import.ts`, fileContent, {
      encoding: 'utf8',
    });
  });
}
