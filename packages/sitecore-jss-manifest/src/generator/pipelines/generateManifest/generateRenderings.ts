import { GeneratePipelineArgs, RenderingParameterDefinition, CommonFieldTypes } from '../../manifest.types';
import { checkUnique } from '../../utils';

const getExposedPlaceholders = (component: any) => {
  if (!Array.isArray(component.placeholders)) {
    return [];
  }

  return component.placeholders.map((placeholder: any) => {
    if (typeof placeholder === 'string') {
      return placeholder;
    }
    return placeholder.name;
  });
};

const getDataSourceTemplate = (component: any, templates: any) => {
  if (Array.isArray(templates)) {
    return templates.reduce(
      (result, template) => (template.name === component.name ? template.name : result),
      ''
    );
  }

  return '';
};

const generateRenderings = ({ components, templates }: { components: any, templates: any }) =>
  components.map((component: any) => {
    const { renderingId, ...rendering } = component;

    if (renderingId) {
      rendering.id = renderingId;
    }

    delete rendering.templateId;
    delete rendering.fields;
    delete rendering.placeholders;
    delete rendering.inherits;
    delete rendering.insertOptions;

    rendering.exposedPlaceholders = getExposedPlaceholders(component);
    rendering.dataSourceTemplate = getDataSourceTemplate(component, templates);

    // params can be an array of strings or of RenderingParameterDefinition-s
    // we normalize that into an object format for the manifest for easier ingestion
    if (rendering.params) {
      if (!Array.isArray(rendering.params)) {
        // tslint:disable-next-line:no-string-throw
        throw `The params property on the component definition for ${rendering.name} is invalid (not an array)`;
      }

      rendering.params = rendering.params.map((param: string | RenderingParameterDefinition) => {
        if (typeof param === 'string') {
          return { name: param, type: CommonFieldTypes.SingleLineText };
        }

        return param;
      });
    }

    return rendering;
  });

export default (args: GeneratePipelineArgs) => {
  const { components } = args;

  const renderings = generateRenderings({ components, templates: args.pipelineResult.templates });

  const finalRenderings = [...(args.pipelineResult as any).renderings, ...renderings];

  const duplicateIds = checkUnique(finalRenderings, (rendering) => rendering.id);

  if (duplicateIds.length > 0) {
    // tslint:disable-next-line:no-string-throw
    throw `The manifest defined duplicate rendering IDs: ${duplicateIds.join(',')}. This is not allowed.`;
  }

  const duplicateNames = checkUnique(finalRenderings, (rendering) => rendering.name);

  if (duplicateNames.length > 0) {
    // tslint:disable-next-line:no-string-throw
    throw `The manifest defined duplicate rendering names: ${duplicateNames.join(',')}. This is not allowed.`;
  }

  return {
    ...args,
    pipelineResult: {
      ...args.pipelineResult,
      renderings: finalRenderings,
    },
  };
};
