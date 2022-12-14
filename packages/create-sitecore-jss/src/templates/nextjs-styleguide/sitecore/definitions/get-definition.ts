/* eslint-disable @typescript-eslint/no-explicit-any */
import path from 'path';
import { createGenerator } from 'ts-json-schema-generator';
import { CommonFieldTypes, FieldDefinition } from '@sitecore-jss/sitecore-jss-dev-tools';

const FieldsMap = new Map();
FieldsMap.set('LinkField', CommonFieldTypes.GeneralLink);
FieldsMap.set('Field<number>', CommonFieldTypes.Number);
FieldsMap.set('Item', CommonFieldTypes.ItemLink);
FieldsMap.set('FileField', CommonFieldTypes.File);
// CommonFieldTypes.RichText <--> CommonFieldTypes.SingleLineText <--> CommonFieldTypes.MultiLineText <--> CommonFieldTypes.Date <--> CommonFieldTypes.DateTime
// ! Field<string>
FieldsMap.set('Item[]', CommonFieldTypes.ContentList);
FieldsMap.set('ImageField', CommonFieldTypes.Image);
FieldsMap.set('Field<boolean>', CommonFieldTypes.Checkbox);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getDefinition = (
  filepath: string,
  extraConfig: { [key: string]: FieldDefinition } = {}
) => {
  /** @type {import('ts-json-schema-generator/dist/src/Config').Config} */
  const config = {
    path: path.resolve(__dirname, `../../src/components/${filepath}`),
    tsconfig: path.resolve(__dirname, '../../tsconfig.scripts.json'),
    type: 'Fields',
  };

  const filename = path.parse(filepath).name;

  const schema = createGenerator(config).createSchema(config.type) as any;

  const fields: { name: string; type: string }[] = [];

  Object.entries((schema.definitions['Fields'] as any).properties).forEach(
    ([key, value]: [any, any]) => {
      const type = FieldsMap.get(
        value.$ref.replace('#/definitions/', '').replace(/%3C/g, '<').replace(/%3E/g, '>')
      );

      if (!type) return;

      fields.push({
        ...extraConfig[key],
        name: key,
        type,
      });
    }
  );

  return { fields, name: filename, templateName: `NextjsApp-${filename}` };
};
