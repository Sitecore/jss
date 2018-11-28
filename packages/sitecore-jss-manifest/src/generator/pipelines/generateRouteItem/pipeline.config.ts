import { pipelineFactory, PipelineRegistry } from '@sitecore-jss/sitecore-pipelines';
import * as path from 'path';
import { getDynamicPlaceholderKey } from '../../dynamicPlaceholders';
import { ComponentDefinition } from '../../manifest.types';
import processRenderings from './processRenderings';

// __dirname returns the directory of this file/module, so it has to be called here
const resolveModulePath = (modulePath: string) => path.resolve(__dirname, modulePath);

const defaultDatasourceNamer = ({
  item,
  placeholder,
  rendering,
  index,
}: {
  item: any,
  placeholder: any,
  rendering: any,
  index: number
}) => {
  const placeholderKeys = placeholder.phKey.split('/');
  let finalPlaceholderKey;
  if (placeholderKeys.length === 1) {
    // single named placeholder e.g. /main
    finalPlaceholderKey = placeholderKeys[0];
  } else {
    // dynamic placeholder. We want to extract the final DP key as it should be unique among all DPs.
    // e.g. '/main/footer-bottom-{B4C653AA-FFBC-5821-A8A8-386E791553FE}-0' => 'footer-bottom-B4C653AA-FFBC-5821-A8A8-386E791553FE-0'
    finalPlaceholderKey = placeholderKeys[placeholderKeys.length - 1];

    // get rid of braces
    finalPlaceholderKey = finalPlaceholderKey.replace(/({|})/g, '');
  }

  return `${item.name}-${finalPlaceholderKey}-${rendering.componentName}-${index + 1}`;
};

const defaultDatasourceDisplayNamer = ({
  rendering,
  index,
}: {
  item: any,
  placeholder: any,
  rendering: any,
  index: number
}) =>
`${rendering.componentName}-${index + 1}`;

const defaultComponentFactory = (components: ComponentDefinition[], componentName: string) =>
components.find((component) => component.name === componentName);

export const config = (pipelines: PipelineRegistry) => {
  const pipeline = pipelineFactory.create('generateRouteItem');

  pipeline.addProcessor({
    name: 'generateItem',
    modulePath: resolveModulePath('./generateItem.js'),
  });
  pipeline.addProcessor({
    name: 'processPlaceholders',
    modulePath: resolveModulePath('./processPlaceholders.js'),
  });
  pipeline.addProcessor({
    name: 'processRenderings',
    process: processRenderings,
    args: {
      dynamicPlaceholderKeyGenerator: getDynamicPlaceholderKey,
      placeholder: {
        phKey: '/',
      },
      rendering: {},
      componentFactory: defaultComponentFactory,
      datasourceNamer: defaultDatasourceNamer,
      datasourceDisplayNamer: defaultDatasourceDisplayNamer,
    },
  });
  pipeline.addProcessor({
    name: 'processChildRoutes',
    modulePath: resolveModulePath('./processChildRoutes.js'),
  });

  pipelines.addPipeline(pipeline);
};
