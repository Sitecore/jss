import fs from 'fs';
import path from 'path';
import { Metadata, getMetadata } from '@sitecore-jss/sitecore-jss-dev-tools';

/*
  METADATA GENERATION
  Generates the /src/temp/metadata.json file which contains application 
  configuration metadata that is used for Sitecore XM Cloud integration.
*/
generateMetadata();

function generateMetadata(): void {
  const metadata: Metadata = getMetadata();
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
