import fs from 'fs';
import path from 'path';
import sass from 'sass';
import { minify } from 'csso';
import { pathToFileURL } from 'url';
import { getItems } from './utils';
import { projectRootPath } from './generate-component-factory';

const projects = getItems<string>({
  path: projectRootPath,
  resolveItem: (_path, name) => name,
  recursive: false,
});

projects.forEach(project => {
  const compiled = sass.compile(
    path.resolve(__dirname, `../${projectRootPath}/${project}/assets/index.scss`),
    {
      loadPaths: [path.resolve(__dirname, '../node_modules')],
      importers: [
        {
          findFileUrl(url) {
            if (!url.startsWith('@sass')) return null;

            return new URL(url.substring(1), pathToFileURL(`src/assets/sass`));
          },
        },
        {
          findFileUrl(url) {
            if (!url.startsWith('assets')) return null;

            return new URL(url, pathToFileURL(`src/assets`));
          },
        },
        {
          findFileUrl(url) {
            if (!url.startsWith('@fontawesome')) return null;

            return new URL(
              url.replace('fontawesome', 'font-awesome').substring(1),
              pathToFileURL('node_modules/font-awesome')
            );
          },
        },
      ],
      logger: {
        warn() {
          return;
        },
      },
    }
  );

  const minimized = minify(compiled.css).css;

  fs.writeFileSync(path.resolve(__dirname, `../public/projects/${project}/index.css`), minimized);
});
