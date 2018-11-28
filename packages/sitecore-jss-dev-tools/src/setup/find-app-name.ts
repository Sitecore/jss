import fs from 'fs';

export function findAppNameInConfig(path: string) {
  if (!fs.existsSync(path)) {
    return null;
  }

  const file = fs.readFileSync(path, 'utf8');
  return findAppNameInContents(file);
}

export function findAppNameInContents(contents: string) {
  const matches = /<app (.*)name="([^"]+)/gm.exec(contents);

  if (matches && matches.length >= 2) {
    return matches[2];
  }

  return null;
}
