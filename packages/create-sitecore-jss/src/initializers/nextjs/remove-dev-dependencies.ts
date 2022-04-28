import fs from 'fs';
import path from 'path';
import { openPackageJson, writePackageJson } from '../../common';

export const removeDevDependencies = (projectPath: string) => {
  // remove `next-transpile-modules` dependency
  const packagePath = path.join(projectPath, 'package.json');
  const pkg = openPackageJson(packagePath);
  if (pkg?.devDependencies['next-transpile-modules']) {
    delete pkg.devDependencies['next-transpile-modules'];
    writePackageJson(pkg, packagePath);
  }

  // remove monorepo next.config.js plugin
  const monorepoPlugin = path.join(projectPath, 'src/lib/next-config/plugins/monorepo.js');
  if (fs.existsSync(monorepoPlugin)) {
    fs.unlinkSync(monorepoPlugin);
  }
};
