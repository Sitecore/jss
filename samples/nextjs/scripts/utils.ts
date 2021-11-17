import fs from 'fs';
import chokidar from 'chokidar';

// Matches TypeScript files that are not type definition files
const fileFormat = new RegExp(/(.+)(?<!\.d)\.tsx?$/);

/**
 * Generation can be invoked using default/watch mode.
 * This function helps to detect mode and call the appropriate function
 */
export function invokeAppropriateMode(writeFunction: () => void, watchFuncion: () => void): void {
  const isWatch = process.argv.some((arg) => arg === '--watch');

  (isWatch ? watchFuncion : writeFunction)();
}

/**
 * Run watch mode, watching on @var rootPath
 */
export function watchItems(rootPath: string, onAdd: () => void, onUnlink: () => void): void {
  chokidar
    .watch(rootPath, { ignoreInitial: true, awaitWriteFinish: true })
    .on('add', onAdd)
    .on('unlink', onUnlink);
}

/**
 * Using @var path find all files recursively and generate output using @var resolveItem by calling it for each file
 * @param path plugins path
 * @param resolveItem will resolve item in required data format
 * @param logMessage will be called when new item is found
 * @returns {Item[]} items
 */
export function getItems<Item>(
  path: string,
  resolveItem: (path: string, name: string) => Item,
  logMessage?: (name: string) => void
): Item[] {
  const items: Item[] = [];
  const folders: fs.Dirent[] = [];

  fs.readdirSync(path, { withFileTypes: true }).forEach((item) => {
    if (item.isDirectory()) {
      folders.push(item);
    }

    if (fileFormat.test(item.name)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const name = item.name.match(fileFormat)![1];
      logMessage && logMessage(name);
      items.push(resolveItem(path, name));
    }
  });

  for (const folder of folders) {
    items.push(...getItems<Item>(`${path}/${folder.name}`, resolveItem, logMessage));
  }

  return items;
}
