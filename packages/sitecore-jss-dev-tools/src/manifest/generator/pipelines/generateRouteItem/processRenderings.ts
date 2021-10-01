import chalk from 'chalk';
import uuid from 'uuid/v5';
import {
  ComponentDefinition,
  ComponentInstanceDefinition,
  GenerateRouteItemPipelineArgs,
  isItemDefinition,
  ItemDefinition,
  ItemReference,
} from '../../manifest.types';
import { convertComponentDataToFields, validateFieldDefinitions, findComponent } from '../../utils';

const JSS_UUID_NAMESPACE = '0e52892a-f862-4d08-9487-987617b637cd';

const generateRenderingParams = (component: any, rendering: any) => {
  if (!rendering.params) {
    return [];
  }

  const reducedParams = Object.keys(rendering.params).reduce((result: any, paramName: string) => {
    return [
      ...result,
      {
        name: paramName,
        value: rendering.params[paramName],
      },
    ];
  }, []);

  if (!Array.isArray(component.params)) {
    throw chalk.red(
      `An instance of ${component.name} defined param(s) '${reducedParams
        .map((rp) => rp.name)
        .join(
          ', '
        )}', but the component definition did not define any params. Define them on the manifest component definition to use them. Instance definition: ${JSON.stringify(
        rendering,
        null,
        2
      )}`
    );
  }

  // find params that are not defined in manifest
  const invalidParams = reducedParams.filter(
    (param) =>
      !component.params.some(
        (componentParam: any) =>
          (componentParam.name ? componentParam.name : componentParam) === param.name
      )
  );

  if (invalidParams.length > 0) {
    const validParams = component.params.map((cp: any) => (cp.name ? cp.name : cp)).join(',');
    const invalidParamsString = invalidParams.map((ip) => ip.name).join(', ');
    throw chalk.red(
      `Param(s) ${invalidParamsString} defined on an instance of component ${
        component.name
      } was not defined on the component definition. Add it to the manifest component definition to use it. Valid params: ${validParams}. Instance definition: ${JSON.stringify(
        rendering,
        null,
        2
      )}`
    );
  }

  return reducedParams;
};

const generateFields = (
  component: ComponentDefinition | undefined,
  rendering: ComponentInstanceDefinition,
  dataSourceItem: ItemDefinition,
  allComponents: ComponentDefinition[]
) => {
  if (!rendering.fields) {
    return [];
  }

  let renderingFields = rendering.fields;
  if (component) {
    const handleError = (fieldName: string) => {
      throw chalk.red(
        `${dataSourceItem.name} route datasource defined data for '${fieldName}' on component ${component.name}. This field is not defined on this component. It may be a typo, or the field may need to be added to the component definition.`
      );
    };
    renderingFields = validateFieldDefinitions(
      rendering.fields,
      component,
      handleError,
      allComponents
    );
  }

  return convertComponentDataToFields({ data: renderingFields, context: { item: dataSourceItem } });
};

const generateChildrenFields = (children: Array<ItemDefinition | ItemReference>) => {
  const [...result] = children;
  result.forEach((child) => {
    if (!isItemDefinition(child)) {
      return;
    }

    if (child.fields) {
      (child.fields as any) = convertComponentDataToFields({
        data: child.fields,
        context: { item: child },
      });
    }

    if (child.children) {
      child.children = generateChildrenFields(child.children);
    }
  });

  return result;
};

const createDataSourceItem = (
  {
    rendering,
    datasourceNamer,
    datasourceDisplayNamer,
    ...context
  }: {
    [key: string]: any;
    rendering: any;
    datasourceNamer: (options: {
      item: any;
      placeholder: any;
      rendering: any;
      index: number;
    }) => string;
    datasourceDisplayNamer: (options: {
      item: any;
      placeholder: any;
      rendering: any;
      index: number;
    }) => string;
  },
  component?: ComponentDefinition
) => {
  // rendering is an ID reference, not a whole rendering, so this will come from elsewhere
  // UNLESS it's a copy - in which case we still want it to get named as a local DS item
  if (!rendering.componentName && rendering.id && !rendering.copy) {
    return {};
  }

  const namerContext: any = { rendering, ...context };
  const name = rendering.name ? rendering.name : datasourceNamer(namerContext);
  let displayName = rendering.displayName;

  if (!displayName) {
    displayName = rendering.name ? null : datasourceDisplayNamer(namerContext); // don't set anything if name provided w/ out displayName
  }

  const result = {
    name,
    displayName,
    template: component?.templateName || component?.name || rendering.componentName,
    ...rendering,
  };

  if (result.children) {
    result.children = generateChildrenFields(result.children);
  }

  delete result.fields;
  delete result.id;
  delete result.placeholders;
  delete result.uid;
  delete result.componentName;
  delete result.params;

  return result;
};

const generatePlaceholderKey = (
  dynamicPlaceholderKeyGenerator: (key: string, rendering: any, parentKey: string) => string,
  placeholder: { phKey: string; phName: string },
  rendering: any
) => {
  const phKey = dynamicPlaceholderKeyGenerator(placeholder.phKey, rendering, placeholder.phName);
  return phKey;
};

const generateRenderingUid = (
  renderingName: string,
  renderingIndex: number,
  parentPlaceholderKey: string
) => {
  // 1. We calculate the deterministic namespace UUID for the parent placeholder
  const parentNamespace = uuid(renderingName + parentPlaceholderKey, JSS_UUID_NAMESPACE);

  // 2. Using the parent UUID, we create a deterministic UUID for the rendering using its index in the placeholder
  const renderingUid = uuid(renderingIndex.toString(), parentNamespace);

  // make the UID look Sitecore-ish
  return `{${renderingUid.toUpperCase()}}`;
};

const processRendering = (
  rendering: any,
  index: number,
  context: GenerateRouteItemPipelineArgs
) => {
  const newContext = { ...context, rendering, index };
  const component = findComponent(rendering.componentName, context.components);
  // check for component def, as long as the component isn't an id-only ref
  // (defines id but not name)
  if (!component && rendering.componentName) {
    throw chalk.red(
      `The component '${rendering.componentName}' used on route '${context.route.name}' was not defined in the manifest. Please define this component with 'manifest.addComponent()', or change the name to an existing component name.`
    );
  }

  const dsItem = createDataSourceItem(newContext, component);

  const renderingParams = generateRenderingParams(component, rendering);

  const fields = generateFields(component, rendering, dsItem, context.components);
  dsItem.fields = fields;

  const layoutRendering: { [k: string]: any } = {
    renderingName: rendering.componentName,
    placeholderKey: context.placeholder.phKey,
    placeholderName: context.placeholder.phName,
    dataSource: dsItem,
    renderingParams,
  };

  if (rendering.id) {
    layoutRendering.id = rendering.id;
  }

  if (rendering.copy) {
    layoutRendering.copy = rendering.copy;
  }

  if (rendering.uid) {
    layoutRendering.uid = rendering.uid;
  } else {
    // assign a rendering instance uid for placeholder keys further down the tree
    layoutRendering.uid = generateRenderingUid(
      dsItem.name ? dsItem.name : layoutRendering.renderingName,
      index,
      context.placeholder.phKey
    );
    newContext.rendering.uid = layoutRendering.uid;
  }

  if (context.onRenderingProcessed) {
    context.onRenderingProcessed(layoutRendering);
  }

  if (rendering.placeholders) {
    processPlaceholders(newContext, rendering.placeholders);
  }
};

const processPlaceholders = (
  context: GenerateRouteItemPipelineArgs,
  placeholders?: { [key: string]: ComponentInstanceDefinition[] }
) => {
  if (!placeholders) {
    return;
  }

  Object.keys(placeholders).forEach((phName) => {
    const phKey = generatePlaceholderKey(
      context.dynamicPlaceholderKeyGenerator,
      { ...context.placeholder, phName },
      context.rendering
    );
    const placeholder = {
      renderings: placeholders[phName],
      phName,
      phKey,
    };

    placeholder.renderings.forEach((rendering: any, index: number) => {
      processRendering(rendering, index, { ...context, placeholder });
    });
  });
};

export default (args: GenerateRouteItemPipelineArgs) => {
  if (!args.route) {
    return args;
  }

  const { placeholders } = args.route;

  const renderings: any[] = [];
  const onRenderingProcessed = (rendering: any) => {
    renderings.push(rendering);
  };

  const context = {
    ...args,
    onRenderingProcessed,
  };
  processPlaceholders(context, placeholders);

  // error if renderings don't have unique names
  const datasourceNames = renderings
    .map((rendering) => rendering.dataSource && rendering.dataSource.name)
    .filter((x) => x);

  const duplicateDatasourceNames = new Set(
    datasourceNames.filter((v, i) => datasourceNames.indexOf(v) !== i)
  ); // https://stackoverflow.com/a/47298567/201808
  if (duplicateDatasourceNames.size > 0) {
    const dupes = JSON.stringify(Array.from(duplicateDatasourceNames));
    throw chalk.red(
      `Route "${args.item.name}" has rendering(s) with identical names: ${dupes}. Please assign unique rendering names using the 'name' property.`
    );
  }

  return {
    ...args,
    item: {
      ...args.item,
      layout: {
        ...args.item.layout,
        renderings,
      },
    },
  };
};
