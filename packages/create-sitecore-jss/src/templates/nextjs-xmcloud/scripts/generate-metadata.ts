import fs from 'fs';
import path from 'path';

/*
  METADATA GENERATION
  Generates the /src/temp/metadata.json file which contains application 
  configuration metadata that is used for Sitecore XM Cloud integration.
*/
generateMetadata();

interface Metadata {
  packages: { [key: string]: string };
}

function generateMetadata(): void {
  const metadata: Metadata = { packages: {} };
  const trackedScopes = ['@sitecore', '@sitecore-cloudsdk', '@sitecore-feaas', '@sitecore-jss'];
  const dirs = fs.readdirSync('node_modules');

  dirs.forEach((dir) => {
    if (trackedScopes.includes(dir)) {
      const packages = fs.readdirSync(path.join('node_modules', dir));

      packages.forEach((pkg) => {
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

  writeMetadata(metadata);
}

/**
 * Writes the metadata object to disk.
 * @param {Metadata} metadata metadata to write.
 */
function writeMetadata(metadata: Metadata): void {
  const filePath = path.resolve('src/temp/metadata.json');
  console.log(`Writing metadata to ${filePath}`);
  fs.writeFileSync(filePath, JSON.stringify(metadata, null, 2), { encoding: 'utf8' });
}
