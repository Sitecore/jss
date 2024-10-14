import { Metadata } from '@sitecore-jss/sitecore-jss/editing';

type Package = {
  [dependency: string]: unknown;
  name: string;
  version: string;
};

const dependencyTypes = ['dependencies', 'devDependencies', 'peerDependencies'];
const trackedScopes = ['@sitecore', '@sitecore-cloudsdk', '@sitecore-feaas', '@sitecore-jss'];

/**
 * Get application metadata
 */
export function getMetadata(packageLock: Record<string, unknown>): Metadata {
  const metadata: Metadata = { packages: {} };
  metadata.packages = getPackagesFromPackageLock(packageLock);
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
  // getting packages names and versions in one go doesn't gurantee getting every package correctly
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
