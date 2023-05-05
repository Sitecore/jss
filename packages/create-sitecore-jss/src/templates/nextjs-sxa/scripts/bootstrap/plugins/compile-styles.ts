import fs from 'fs';
import path from 'path';
import sass from 'sass';
import { minify } from 'csso';
import { pathToFileURL } from 'url';
import { getItems } from '@sitecore-jss/sitecore-jss-dev-tools/nextjs';
import { BoostrapConfig, BootstrapPlugin } from '../index';

/**
 * Compiles sass files for each project, minifies it and writes it to the public folder.
 */
const compileStyles = (projectRootPath: string) => {
  const projects = getItems<string>({
    path: projectRootPath,
    resolveItem: (_path, name) => name,
    recursive: false,
  });

  projects.forEach((project) => {
    const stylesPath = path.resolve(
      process.cwd(),
      `${projectRootPath}/${project}/assets/index.scss`
    );

    if (!fs.existsSync(stylesPath)) {
      return;
    }

    const compiled = sass.compile(stylesPath, {
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
    });

    const minimized = minify(compiled.css).css;
    const publicProjectFolderPath = path.resolve(process.cwd(), `public/projects/${project}`);

    if (!fs.existsSync(publicProjectFolderPath)) {
      fs.mkdirSync(publicProjectFolderPath);
    }

    fs.writeFileSync(
      path.join(publicProjectFolderPath, `/index.css`),
      minimized
    );
  });
};

class CompileStylesPlugin implements BootstrapPlugin {
  exec(bootConfig: BoostrapConfig) {
    compileStyles(bootConfig.projectRootPath);
  }
}

export const compileStylesPlugin = new CompileStylesPlugin();
