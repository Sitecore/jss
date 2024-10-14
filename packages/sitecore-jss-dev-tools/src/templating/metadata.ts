import { Metadata } from '@sitecore-jss/sitecore-jss/editing';
import fs from 'fs';
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

  const packageLockPath = './package-lock.json';
  const packageLockIsAvailable = fs.existsSync(packageLockPath);

  if (!packageLockIsAvailable) {
    try {
      execSync('npm i --package-lock-only --workspaces false');
    } catch (error) {
      console.error(`Failed to create package-lock.json in project`, error);
      return metadata;
    }
  }

  let packageLock = {};
  try {
    packageLock = JSON.parse(fs.readFileSync(packageLockPath, 'utf8'));
  } catch (error) {
    console.error(`Failed to read/parse package-lock.json`, error);
    return metadata;
  }

  metadata.packages = getPackagesFromPackageLock(packageLock);

  if (!packageLockIsAvailable) {
    execSync(`del "${packageLockPath}"`);
  }

  return metadata;
}

function getPackagesFromPackageLock(
  packageLockJson: Record<string, unknown>
): Record<string, string> {
  const packagesResult: Record<string, string> = {};
  const packages = packageLockJson['packages'] as Record<string, Package>;

  // traverse packages to get all tracked package names
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
