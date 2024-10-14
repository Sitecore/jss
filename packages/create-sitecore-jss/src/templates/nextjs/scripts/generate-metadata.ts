import fs from 'fs';
import path from 'path';
import { Metadata, getMetadata } from '@sitecore-jss/sitecore-jss-dev-tools';
import { execSync } from 'child_process';

/*
  METADATA GENERATION
  Generates the /src/temp/metadata.json file which contains application 
  configuration metadata that is used for Sitecore XM Cloud integration.
*/
generateMetadata();

function generateMetadata(): void {
  const packageLockPath = './package-lock.json';
  const packageLockAvailable = fs.existsSync(packageLockPath);

  const absolutePath = path.resolve(__dirname);
  console.log(absolutePath);

  if (!packageLockAvailable) {
    execSync('npm i --package-lock-only --workspaces false');
  }
  const packageLock = JSON.parse(fs.readFileSync(packageLockPath, 'utf8'));

  const metadata: Metadata = getMetadata(packageLock);
  writeMetadata(metadata);

  if (!packageLockAvailable) {
    execSync(`del "${packageLockPath}"`);
  }
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
