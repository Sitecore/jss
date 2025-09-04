import * as joi from 'joi';

const fieldSchema = joi.object().keys({
  name: joi.string().required(),
  displayName: joi.string(),
  type: joi.string().required(), // todo: add specific types
});

const templateSchema = joi.object().keys({
  name: joi.string().required(),
  displayName: joi.string(),
  fields: joi.array().items(fieldSchema),
});

const placeholderSchema = joi.object().keys({
  name: joi.string().required(),
  displayName: joi.string(),
});

const validate = (
  object: any,
  schema: any,
  allowUnknown: any
): {
  valid: boolean;
  error?: joi.ValidationError;
} => {
  const { error } = schema.validate(object, { allowUnknown });
  if (!error) {
    return { valid: true };
  }
  console.error(error);
  return { valid: false, error };
};

export const validateTemplate = (template: any) => validate(template, templateSchema, true);

export const validatePlaceholder = (placeholder: any) =>
  validate(placeholder, placeholderSchema, true);
