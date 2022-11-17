import fs from 'fs';
import path from 'path';
import { TelemetryEventInitializer } from './base-event';

type JssPackagesEventAttrs = {
  packages: {
    name: string;
    version: string;
  }[];
};

export const JssPackagesEvent = (): TelemetryEventInitializer<JssPackagesEventAttrs> => () => {
  const packageJson = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), './package.json'), 'utf-8')
  );

  const packages = Object.entries<string>(packageJson.dependencies)
    .concat(Object.entries<string>(packageJson.devDependencies))
    .filter(([name]) => name.includes('@sitecore-jss'))
    .map(([name, version]) => ({ name, version }));

  return {
    type: 'JssPackages',
    attrs: {
      packages,
    },
  };
};
