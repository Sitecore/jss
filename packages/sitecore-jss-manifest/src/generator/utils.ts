import { ComponentDefinition, ItemDefinition, TemplateDefinition } from './manifest.types';

/**
 * Iterates the keys of the given object and constructs a new object with keys that satisfy the given filter function.
 * @param {Object} obj
 * @param {Function} filter
 * @returns {Object} filtered object
 */
export const filterObject = (obj: any, filter: (key: string, value: any) => boolean) =>
  Object.keys(obj).reduce((res, key) => {
    if (filter(key, obj[key])) {
      return {
        ...res,
        [key]: obj[key],
      };
    }
    return res;
  }, {});

export const convertComponentDataToFields = ({ data, context: { item = {} as ItemDefinition } = {} }:
{
  data: any,
  context: {
    item?: ItemDefinition,
  }
}) => {
  if (!data) {
    return;
  }

  const initialReduceValue: any[] = [];

  return Object.keys(data).reduce((result, fieldName) => {
    const fieldValue = processFieldValue({
      fieldValue: data[fieldName],
      context: { fieldName, item },
    });

    if (fieldValue !== null) {
      result.push({ name: fieldName, value: fieldValue });
    } else {
      console.warn(
        `Skipping field '${fieldName}' on ${
          item.name
        } does not contain a value that can be imported: ${JSON.stringify(data[fieldName])}`
      );
    }
    return result;
  }, initialReduceValue);
};

const mapFieldValueItem = (item: ItemDefinition, fieldValueItem: ItemDefinition, index: number, fieldName?: string) => {
  // if a field references a shared item by ID, we don't want to auto-name/template it
  if (fieldValueItem.id && !fieldValueItem.name) {
    return fieldValueItem;
  }

  const fieldItem: ItemDefinition & {[k: string]: any} = {
    template: `${item.template}-${fieldName}-Item`,
    name: `${item.name}-item-${index}`,
  };

  if (fieldValueItem.template) {
    fieldItem.template = fieldValueItem.template;
  }

  if (fieldValueItem.name) {
    fieldItem.name = fieldValueItem.name;
  }

  if (fieldValueItem.displayName) {
    fieldItem.displayName = fieldValueItem.displayName;
  } else {
    fieldItem.displayName = `${item.displayName}-item-${index}`;
  }

  (fieldItem as any).fields = convertComponentDataToFields({
    data: fieldValueItem.fields,
    context: { item: fieldItem },
  });
  return fieldItem;
};

export interface FieldValue {
  fieldValue: any;
  context: {
    fieldName?: string,
    item: any
  };
}

const processFieldValue = ({ fieldValue, context: { fieldName, item } }: FieldValue) => {
  if (fieldValue === null) {
    return fieldValue;
  }

  // if the 'value' is an array, create value as an array of items
  if (Array.isArray(fieldValue)) {
    const fieldValueItems = fieldValue;
    return fieldValueItems.map((fieldValueItem, index) =>
      mapFieldValueItem(item, fieldValueItem, index, fieldName)
    );
  }

  // simple value, return as-is
  if (typeof fieldValue !== 'object') {
    return fieldValue;
  }

  // value/editable shape
  if (typeof fieldValue.value !== 'undefined') {
    // we fallback to '' so that defining an empty field value results in the empty value
    // being imported, as opposed to being null and triggering 'not an importable value'
    return fieldValue.value || '';
  }

  // link or image field value at the root shape, or a shared item link reference (non-array of items)
  if (fieldValue.href || fieldValue.src || fieldValue.id) {
    return fieldValue;
  }

  // it's an item
  if (fieldValue.fields) {
    return mapFieldValueItem(item, fieldValue, 0, fieldName);
  }

  return null;
};

// checks if an array contains duplicate values using a selector function to get the value to check for uniqueness
// returns array of duplicate keys - or empty array if no dupes
export function checkUnique(input: any[], selector: (element: any) => string) {
  const uniques = new Set();
  const duplicates: string[] = [];

  input.forEach((element) => {
    const key = selector(element);

    if (typeof key === 'undefined') {
      return;
    }

    if (uniques.has(key)) {
      duplicates.push(key);
    } else {
      uniques.add(key);
    }
  });

  return duplicates;
}

/**
 * Finds a template definition by name in one or more arrays of template/component definitions
 * @param {string} templateName
 * @returns {TemplateDefinition | ComponentDefinition | null} template
 */
export function findTemplate(templateName: string, ...templates: Array<Array<TemplateDefinition | ComponentDefinition>>): TemplateDefinition | ComponentDefinition | null {
  let templateResult: TemplateDefinition | ComponentDefinition | null = null;

  if (!templates) {
    return null;
  }

  templates.forEach((templateList) => {
    if (!templateList) {
      return;
    }

    const template = templateList.find((templateDef: any) => templateDef.name === templateName);

    if (template && templateResult !== null) {
      // tslint:disable-next-line:no-string-throw
      throw `Template ${templateName} was defined more than once with the same name.`;
    }

    if (template) {
      templateResult = template;
    }
  });

  return templateResult;
}

/**
 * Validates that a set of field values are defined on their template definitions
 * @param {Object} fields
 * @param {TemplateDefinition | ComponentDefinition} template
 * @param {Function} handleError
 * @returns {Object} validated fields
 */
export function validateFieldDefinitions(
  fields: { [key: string]: any },
  template: TemplateDefinition | ComponentDefinition,
  handleError: (fieldName: string) => void,
  ...inheritedTemplates: Array<Array<TemplateDefinition | ComponentDefinition>>
) {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  inheritedTemplates.forEach(() => {});

  return filterObject(
    fields,
    (fieldName: string) => {
      // we don't have a good way to look up all inherited fields here - so if the rendering inherits a template
      // we disable field filtering so as to allow inherited fields to be defined.
      if (template.inherits) {
        // in future `inheritedTemplates` may be trawled to find inherited values and validate them too
        return true;
      }

      const fieldIsValid = Array.isArray(template.fields) && template.fields.some((field) => field.name === fieldName);
      if (!fieldIsValid) {
        // tslint:disable-next-line:no-string-throw max-line-length
        handleError(fieldName);
      }
      return fieldIsValid;
    }
  );
}
