import fs from 'fs';
import JSZip from 'jszip';
import path from 'path';

const walkSync = (dir: string, filelist: string[] = []) => {
  let result = filelist;
  fs.readdirSync(dir).forEach((file) => {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      result = result.concat(path.join(dir, file, path.sep));
      result = walkSync(path.join(dir, file), result);
    } else {
      result = result.concat(path.join(dir, file));
    }
  });
  return result;
};

interface FileEntry {
  name: string;
  path: string;
}

const getEntries = (folder: string): FileEntry[] => {
  const files = walkSync(folder);
  const entries: any = [];
  files.forEach((entry) => {
    const entryPath = path.join('.', entry);
    // remove initial folder and convert to fwd slash
    let name = path.relative(folder, entryPath);
    if (entryPath.endsWith(path.sep)) {
      name += path.sep; // ensure we retain trailing slash for dirs
    }
    name = name.split(path.sep).join('/');
    entries.push({ path: entryPath, name });
  });
  return entries;
};

export const createPackage = (contentsPath: string, outputPath: string, callback: () => void) => {
  const zip = new JSZip();
  const contents = getEntries(contentsPath);
  contents.forEach((entry) => {
    if (entry.name.endsWith('/')) { return; }
    console.log(`Adding ${entry.name}`);
    zip.file(entry.name, fs.readFileSync(path.normalize(entry.path)), { createFolders: false });
  });

  zip
    .generateNodeStream({ type: 'nodebuffer' })
    .pipe(fs.createWriteStream(outputPath))
    .on('error', (error: any) => {
      console.error(error);
    })
    .on('finish', () => {
      console.log(`Wrote ${outputPath}`);
      if (callback) {
        callback();
      }
    });
};
