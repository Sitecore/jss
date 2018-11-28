export const enhanceTemplates = (templates: any) => {
  const newTemplates: {[k: string]: any} = [...templates];
  newTemplates.getTemplate = function getTemplate(templateName: string) {
    return this.find((template: any) => template.name === templateName);
  };
  return newTemplates;
};

function getMediaFieldValue(field: any) {
  return field.value;
}

function getTreelistFieldValue(field: any, templates: any) {
  return field.value.reduce((result: any, item: any) => {
    // eslint-disable-next-line no-use-before-define
    const media = buildMediaOutput(item, templates);
    return [...result, ...media];
  }, []);
}

function getFieldValues({ field, templates }: { field: any, templates: any }) {
  switch (field.type) {
    case 'Image':
      return [getMediaFieldValue(field)];
    case 'File':
      return [getMediaFieldValue(field)];
    case 'Treelist':
      return getTreelistFieldValue(field, templates);
    default:
      return null;
  }
}

export function buildMediaOutput(item: any, templates: any) {
  const template = templates.getTemplate(item.template);
  if (!template) {
    return [];
  }

  if (!item || !item.fields) {
    return [];
  }

  const fields = item.fields.reduce((result: any, field: any) => {
    if (!template.fields) {
      return [];
    }

    const templateField = template.fields.find((f: any) => f.name === field.name);
    if (templateField) {
      return [...result, { ...field, type: templateField.type }];
    }
    return result;
  }, []);

  const fieldValues = fields.reduce((result: any, field: any) => {
    const values = getFieldValues({ field, templates });
    if (values) {
      return [...result, ...values];
    }
    return result;
  }, []);

  return fieldValues;
}
