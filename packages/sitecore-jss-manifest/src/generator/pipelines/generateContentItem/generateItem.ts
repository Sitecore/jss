import chalk from 'chalk';
import { GenerateContentItemArgs } from '../../manifest.types';
import { convertComponentDataToFields, findTemplate, validateFieldDefinitions } from '../../utils';

export default (args: GenerateContentItemArgs) => {
  const { componentName, ...item } = (args.content as any);

  delete item.children;
  delete item.path;

  // shared components may come through here and use the 'componentName' spec instead of 'template' - this allows that
  if (componentName) {
    item.template = componentName;
  }

  const template = findTemplate(item.template, args.components, args.templates);

  if (!template && item.template !== 'Folder') {
    // tslint:disable-next-line:max-line-length
    console.warn(chalk.yellow(`Template ${item.template} used on ${item.name} was not defined in the manifest. If this is not a known Sitecore template or GUID the import will fail.`));
  }

  if (args.content.fields) {
    let renderingFields = args.content.fields;
    if (template) {
      // tslint:disable-next-line:max-line-length
      const handleError = (fieldName: string) => { throw chalk.red(`Item '${item.name}' defined data for field '${fieldName}'. This field is not defined on '${template.name}'. It may be a typo, or the field may need to be added to the template/component definition.`); };
      renderingFields = validateFieldDefinitions(args.content.fields, template, handleError, args.templates, args.components);
    }

    item.fields = convertComponentDataToFields({ data: renderingFields, context: { item } });
  }

  return {
    ...args,
    item,
  };
};
