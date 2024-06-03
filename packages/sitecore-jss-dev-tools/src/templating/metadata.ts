import fs from 'fs';
import path from 'path';
import { Metadata } from '@sitecore-jss/sitecore-jss/editing';

/**
 * Get application metadata
 */
export function getMetadata(): Metadata {
  const metadata: Metadata = { packages: {} };
  const trackedScopes = ['@sitecore', '@sitecore-cloudsdk', '@sitecore-feaas', '@sitecore-jss'];
  const dirs = fs.readdirSync('node_modules');

  dirs.forEach((dir: any) => {
    if (trackedScopes.includes(dir)) {
      const packageNames = fs.readdirSync(path.join('node_modules', dir));
      packageNames.forEach((pkg: any) => {
        try {
          const json = JSON.parse(
            fs.readFileSync(path.join('node_modules', dir, pkg, 'package.json'), 'utf8')
          );

          metadata.packages[json.name] = json.version;
        } catch (e) {
          console.error(`Failed to read/parse package.json for ${pkg}`, e);
        }
      });
    }
  });

  return metadata;
}
