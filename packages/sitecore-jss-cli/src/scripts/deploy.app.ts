import { builder as filesBuilder, handler as filesHandler } from './deploy.files';
import { builder as itemsBuilder, handler as itemsHandler } from './deploy.items';

export const command = 'app';

export const describe =
  'Deploys files and items for the app to Sitecore. `jss deploy app --help` for options.';

export const builder = {
  ...itemsBuilder,
  ...filesBuilder,
};

/**
 * @param {any} argv
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function handler(argv: any) {
  return itemsHandler(argv)
    .then(() => filesHandler(argv))
    .catch((error) => {
      if (error) {
        console.log(error);
      }
      process.exit(1);
    });
}
