import fs from 'fs';
import chokidar from 'chokidar';

/**
 * Settings for @var getItems function
 */
export type GetItemsSettings<Item> = {
  /**
   * items path
   */
  path: string;
  /**
   * Resolve item in required data format
   */
  resolveItem: (path: string, name: string) => Item;
  /**
   * Will be called when new file is found
   */
  cb?: (name: string) => void;
  /**
   * Matches specific files format
   */
  fileFormat?: RegExp;
  /**
   * Wether to search recursively
   */
  recursive?: boolean;
};

/**
 * Using @var path find all files and generate output using @var resolveItem function for each file
 * Can be used to generate list of components, templates, etc.
 * @param {GetItemsSettings} settings
 * @returns {Item[]} list of items
 */
export function getItems<Item>(settings: GetItemsSettings<Item>): Item[] {
  const {
    recursive = true,
    path,
    resolveItem,
    cb,
    fileFormat = new RegExp(/(.+)(?<!\.d)\.[jt]sx?$/),
  } = settings;
  const items: Item[] = [];
  const folders: fs.Dirent[] = [];

  if (!fs.existsSync(path)) return [];

  fs.readdirSync(path, { withFileTypes: true }).forEach((item) => {
    if (item.isDirectory()) {
      folders.push(item);
    }

    if (fileFormat.test(item.name)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const name = item.name.match(fileFormat)![1];
      items.push(resolveItem(path, name));
      cb && cb(name);
    }
  });

  for (const folder of folders) {
    recursive
      ? items.push(
          ...getItems<Item>({
            path: `${path}/${folder.name}`,
            resolveItem,
            cb,
            fileFormat,
          })
        )
      : items.push(resolveItem(`${path}/${folder.name}`, folder.name));
  }

  return items;
}

/**
 * Run watch mode, watching on @var paths
 * @param {string[]} paths paths to watch by chokidar
 * @param {Function<void>} cb callback to run on file change
 */
export function watchItems(paths: string[], cb: () => void): void {
  chokidar
    .watch(paths, { ignoreInitial: true, awaitWriteFinish: true })
    .on('add', cb)
    .on('unlink', cb);
}
