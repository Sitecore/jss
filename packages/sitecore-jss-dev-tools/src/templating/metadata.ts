import fs from 'fs';
import path from 'path';

export function getPackagesMetadata() {
  const packages: { [key: string]: string } = {};
  const trackedScopes = ['@sitecore', '@sitecore-cloudsdk', '@sitecore-feaas', '@sitecore-jss'];
  const dirs = fs.readdirSync('node_modules');

  dirs.forEach((dir) => {
    if (trackedScopes.includes(dir)) {
      console.log('dir' + dir);
      const packageNames = fs.readdirSync(path.join('node_modules', dir));
      console.log(packageNames);

      packageNames.forEach((pkg) => {
        try {
          const json = JSON.parse(
            fs.readFileSync(path.join('node_modules', dir, pkg, 'package.json'), 'utf8')
          );

          packages[json.name] = json.version;
        } catch (e) {
          console.error(`Failed to read/parse package.json for ${pkg}`, e);
        }
      });
    }
  });

  return packages;
}
