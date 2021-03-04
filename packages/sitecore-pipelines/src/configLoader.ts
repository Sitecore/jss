import { createPipelinesRegistry } from './pipelinesRegistry';
import { importModules } from './utils';

// './**/pipeline.config.js'
const config = async ({
  fileGlobs = [],
  workingDirectory = '',
  existingConfig = {},
  allowEmptyGlobs = false,
  createPipelinesRegistryImplementation,
  importModulesImplementation,
}: {
  fileGlobs: string[];
  workingDirectory?: string;
  existingConfig?: any;
  allowEmptyGlobs?: boolean;
  createPipelinesRegistryImplementation?: (existingConfig: any) => any;
  importModulesImplementation?: (options: {
    fileGlobs: string[];
    workingDirectory: string;
    allowEmptyGlobs: boolean;
  }) => any;
}) => {
  if (!fileGlobs || fileGlobs.length === 0) {
    throw new Error('no pipeline config file search patterns specified');
  }
  const pipelinesRegistry = createPipelinesRegistryImplementation
    ? createPipelinesRegistryImplementation(existingConfig)
    : createPipelinesRegistry(existingConfig);

  const moduleWrappers = importModulesImplementation
    ? importModulesImplementation({ fileGlobs, workingDirectory, allowEmptyGlobs })
    : importModules({ fileGlobs, workingDirectory, allowEmptyGlobs });

  // eslint-disable-next-line no-restricted-syntax
  for (const moduleWrapper of moduleWrappers) {
    // eslint-disable-next-line no-await-in-loop
    const pipeline = await moduleWrapper.import();

    if (pipeline && pipeline.config) {
      pipeline.config(pipelinesRegistry);
    } else {
      throw new Error(
        `pipeline config module doesn't export a "config" method: ${moduleWrapper.file}`
      );
    }
  }
  return pipelinesRegistry.getPipelines();
};

export const configLoader = config;
