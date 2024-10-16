import { Metadata } from '@sitecore-jss/sitecore-jss/editing';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

type Package = {
  [key: string]: unknown;
  name: string;
  version: string;
};

const dependencyTypes = ['dependencies', 'devDependencies', 'peerDependencies'];
const trackedScopes = ['@sitecore', '@sitecore-cloudsdk', '@sitecore-feaas', '@sitecore-jss'];

/**
 * Get application metadata
 */
export function getMetadata(): Metadata {
  const metadata: Metadata = { packages: {} };

  const packageLockPath = `.${path.sep}package-lock.json`;
  const packageLockIsAvailable = fs.existsSync(packageLockPath);

  if (!packageLockIsAvailable) {
    try {
      console.log('Creating package-lock.json ...');
      execSync('npm i --package-lock-only --workspaces false --force');
    } catch (error) {
      console.error('Failed to create package-lock.json in project', error);
      return metadata;
    }
  }

  let packageLock = {};
  try {
    packageLock = JSON.parse(fs.readFileSync(packageLockPath, 'utf8'));
  } catch (error) {
    console.error('Failed to read/parse package-lock.json', error);
    return metadata;
  }

  metadata.packages = getPackagesFromPackageLock(packageLock);

  if (!packageLockIsAvailable) {
    console.log('Deleting package-lock.json ...');
    execSync(`del "${packageLockPath}"`);
  }

  return metadata;
}

/**
 * Traverses the provided package-lock.json to find the packages of the tracked scopes with their exact versions
 * @param {Record<string, unknown>} packageLockJson the package-lock json to traverse
 * @returns {Record<string, string>} an object with the packages with their exact versions
 */
function getPackagesFromPackageLock(
  packageLockJson: Record<string, unknown>
): Record<string, string> {
  const packagesResult: Record<string, string> = {};
  const packages = packageLockJson.packages as Record<string, Package>;

  // traverse packages to get all tracked package names
  // eslint-disable-next-line guard-for-in
  for (const key in packages) {
    dependencyTypes.forEach((depType) => {
      for (const dep in packages[key][depType] as Record<string, string>) {
        if (trackedScopes.some((trackedScope) => dep.startsWith(trackedScope))) {
          if (!(dep in packagesResult)) {
            packagesResult[dep] = '';
          }
        }
      }
    });
  }

  // traverse packages again to get the exact versions.
  // getting packages names and versions in one go doesn't gurantee getting all package info correctly
  // eslint-disable-next-line guard-for-in
  for (const key in packages) {
    Object.keys(packagesResult).forEach((scPackage) => {
      if (packages[key].name === scPackage || key.endsWith(scPackage)) {
        if (!packagesResult[scPackage]) {
          packagesResult[scPackage] = packages[key].version;
        }
      }
    });
  }

  return packagesResult;
}
