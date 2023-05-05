import fs from 'fs';

/**
 * @param {string} path plugins path
 * @param resolveItem will resolve item in required data format
 * @param cb will be called when new item is found
 * @param {RegExp} fileFormat Matches specific files
 * @param {boolean} recursive if true will search recursively
 */
type GetItemsSettings<Item> = {
  path: string;
  resolveItem: (path: string, name: string) => Item;
  cb?: (name: string) => void;
  fileFormat?: RegExp;
  recursive?: boolean;
};

/**
 * Using @var path find all files recursively and generate output using @var resolveItem by calling it for each file
 * @param {GetItemsSettings} settings
 * @returns {Item[]} items
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
