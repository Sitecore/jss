import { checkUnique } from '../../utils';
import { validateTemplate } from '../../validators';

export default (args: any) => {
  const { components } = args;

  const templates = components.reduce((result: any, component: any) => {
    // throw if you defined a single ID for a component (which since it splits into a template + rendering, needs two explicit IDs set)
    if (component.id) {
      throw `The component ${component.name} defined an 'id'. Because a component becomes two separate items in Sitecore, it must have two separate IDs. Please specify unique 'templateId' and 'renderingId' properties instead.`;
    }

    // don't generate template for component without fields that inherits nothing
    if (!component.fields && !component.inherits) {
      return result;
    }

    const { templateId, templateName, ...template } = component;

    if (templateId) {
      template.id = templateId;
    }
    if (templateName) {
      template.name = templateName;
    }

    delete template.renderingId;
    delete template.params;
    delete template.fieldEditorFields;
    delete template.displayFieldEditorButton;
    delete template.placeholders;
    delete template.allowedPlaceholders;
    delete template.graphQLQuery;
    delete template.customExperienceButtons;

    const validationResult = validateTemplate(template);
    if (validationResult.valid) {
      return [...result, template];
    }

    throw validationResult.error;
  }, []);

  const finalTemplates = [...args.templates, ...templates];

  const duplicateIds = checkUnique(finalTemplates, (template) => template.id);

  if (duplicateIds.length > 0) {
    throw `The manifest defined duplicate template IDs: ${duplicateIds.join(
      ','
    )}. This is not allowed.`;
  }

  const duplicateNames = checkUnique(finalTemplates, (template) => template.name);

  if (duplicateNames.length > 0) {
    throw `The manifest defined duplicate template names: ${duplicateNames.join(
      ','
    )}. This is not allowed.`;
  }

  return {
    ...args,
    pipelineResult: {
      ...args.pipelineResult,
      templates: finalTemplates,
    },
  };
};
