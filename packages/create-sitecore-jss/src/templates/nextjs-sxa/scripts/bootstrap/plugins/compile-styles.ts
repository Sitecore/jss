import fs from 'fs';
import path from 'path';
import sass from 'sass';
import { minify } from 'csso';
import { pathToFileURL } from 'url';
import { getItems } from 'scripts/utils';
import { projectRootPath } from './../../generate-component-factory';
import { BootstrapPlugin } from '../index';

/**
 * Compiles sass files for each project, minifies it and writes it to the public folder.
 */
const compileStyles = () => {
  const projects = getItems<string>({
    path: projectRootPath,
    resolveItem: (_path, name) => name,
    recursive: false,
  });

  projects.forEach((project) => {
    const compiled = sass.compile(
      path.resolve(process.cwd(), `${projectRootPath}/${project}/assets/index.scss`),
      {
        loadPaths: [path.resolve(process.cwd(), 'node_modules')],
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

    fs.writeFileSync(
      path.resolve(process.cwd(), `public/projects/${project}/index.css`),
      minimized
    );
  });
};

class CompileStylesPlugin implements BootstrapPlugin {
  exec() {
    compileStyles();
  }
}

export const compileStylesPlugin = new CompileStylesPlugin();
