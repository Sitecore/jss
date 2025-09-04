import fs from 'fs';
import path from 'path';

export const removeDevDependencies = (projectPath: string) => {
  // remove monorepo next.config.js plugin
  const monorepoPlugin = path.join(projectPath, 'src/lib/next-config/plugins/monorepo-xmcloud.js');
  if (fs.existsSync(monorepoPlugin)) {
    fs.unlinkSync(monorepoPlugin);
  }
};
