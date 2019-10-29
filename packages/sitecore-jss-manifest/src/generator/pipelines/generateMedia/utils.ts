export const enhanceTemplates = (templates: any) => {
  const newTemplates: { [k: string]: any } = [...templates];
  newTemplates.getTemplate = function getTemplate(templateName: string) {
    const foundTemplate = this.find((template) => template.name === templateName);
    if (foundTemplate) {
      foundTemplate.allFields = getAllTemplateFields(foundTemplate, templates);
    }
    return foundTemplate;
  };
  return newTemplates;
};

// NOTE: this function does not attempt to do anything about field names
// that might be duplicated in the template inheritance tree. That said, for
// the purposes of extracting media field values, we don't need to be concerned
// about duplicates or naming collisions. We simply need a field type and
// a field value.
function getAllTemplateFields(template: any, templateCollection: any) {
  if (!template) {
    return null;
  }

  // If the template already has an `allFields` property, assume that
  // its inheritance tree has already been resolved.
  if (template.allFields && Array.isArray(template.allFields)) {
    return template.allFields;
  }

  const allFields: any[] = [];
  
  // If the template has its own fields, add them to the `allFields` array.
  if (template.fields && Array.isArray(template.fields)) {
    allFields.push(...template.fields);
  }

  // Recursively add fields from all inherited templates and any ancestors.
  if (template.inherits && Array.isArray(template.inherits)) {
    template.inherits.forEach((inheritedTemplateName) => {
      const inheritedTemplate = templateCollection.find((t) => t.name === inheritedTemplateName);
      if (!inheritedTemplate || !inheritedTemplate.fields || !Array.isArray(inheritedTemplate.fields)) {
        return;
      }
      
      const inheritedFields = getAllTemplateFields(inheritedTemplate, templateCollection);
      if (inheritedFields) {
        allFields.push(...inheritedFields);
      }
    });
  }

  return allFields;
}

function getMediaFieldValue(field: any) {
  return field.value;
}

function getNestedFieldValue(field: any, templates: any) {
  return field.value.reduce((result: any, item: any) => {
    // eslint-disable-next-line no-use-before-define
    const media = buildMediaOutput(item, templates);
    return [...result, ...media];
  }, []);
}

function getFieldValues({ field, templates }: { field: any; templates: any }) {
  switch (field.type) {
    case 'Image':
      return [getMediaFieldValue(field)];
    case 'File':
      return [getMediaFieldValue(field)];
    case 'Multilist':
    case 'Treelist':
      return getNestedFieldValue(field, templates);
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
    if (!template.allFields) {
      return [];
    }

    const templateField = template.allFields.find((f: any) => f.name === field.name);
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
