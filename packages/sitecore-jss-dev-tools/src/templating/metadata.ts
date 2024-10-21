import { Metadata } from '@sitecore-jss/sitecore-jss/editing';
import { execSync } from 'child_process';

type Package = {
  name: string;
  version: string;
};

const trackedScopes = ['@sitecore', '@sitecore-cloudsdk', '@sitecore-feaas', '@sitecore-jss'];

/**
 * Get application metadata
 */
export function getMetadata(): Metadata {
  const metadata: Metadata = { packages: {} };

  let queryResult: Package[] = [];
  try {
    queryResult = JSON.parse(execSync('npm query [name*=@sitecore] --workspaces false').toString());
  } catch (error) {
    console.error('Failed to retrieve sitecore packages using npm query', error);
    return metadata;
  }

  metadata.packages = getPackagesFromQueryResult(queryResult);

  return metadata;
}

/**
 * Retrieve all packages of the tracked scopes with their exact versions
 * @param {Package[]} scPackages list of packages
 * @returns {Record<string, string>} an object with the packages with their exact versions
 */
function getPackagesFromQueryResult(scPackages: Package[]): Record<string, string> {
  const packages: Record<string, string> = {};

  scPackages.forEach((scPackage) => {
    if (trackedScopes.some((trackedScope) => scPackage.name.startsWith(trackedScope))) {
      packages[scPackage.name] = scPackage.version;
    }
  });

  return packages;
}
