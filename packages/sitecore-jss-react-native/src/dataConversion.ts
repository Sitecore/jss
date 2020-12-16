import {
  ComponentRendering,
  Field,
  Item,
  PlaceholdersData,
  RouteData,
} from '@sitecore-jss/sitecore-jss';

const isComponentRendering = (element: unknown) => (element as ComponentRendering).componentName;

/**
 * Receives dev prop data and creates or assigns "value/editable" values where needed to match signature of LayoutService data.
 */
export const convertPropDataToLayoutServiceFormat = (
  propData:
  | {
    [name: string]: Field | Item | Item[] | undefined;
  }
  | undefined
): { [name: string]: Field } => {
  if (!propData) {
    return {};
  }
  return Object.keys(propData).reduce((result, propName) => {
    const propValue = propData[propName];

    // if no propValue, then bail
    if (!propValue) {
      return { ...result, [propName]: propValue };
    }

    const newResult: { [name: string]: unknown } = { ...result };

    // field value might be an array, in which case we need to iterate the array entries for more prop values
    if (Array.isArray(propValue)) {
      newResult[propName] = propValue.map((val) => {
        return {
          ...val,
          ...(val.fields && { fields: convertPropDataToLayoutServiceFormat(val.fields) }),
        };
      });
      return newResult;
    }

    // check if type is not a Field, so it's Item
    if (!('value' in propValue) && !('editable' in propValue)) {
      return {
        ...propValue,
        fields: convertPropDataToLayoutServiceFormat(propValue.fields)
      }
    }

    // assume propValue _should_ always contain a 'value' key. if it doesn't then bail.
    // or if propValue has an 'editable' key, then assume this prop doesn't need additional processing.
    if (!propValue.value || propValue.editable) {
      return { ...result, [propName]: propValue };
    }

    const propValueType = typeof propValue.value;

    // if propValue is a primitive type, then copy propValue.value to propValue.editable
    if (propValueType === 'string' || propValueType === 'boolean' || propValueType === 'number') {
      newResult[propName] = {
        value: propValue.value,
        editable: propValue.value,
      };

      return newResult;
    }

    // we already check for Array and primitive types above,
    // so we _should_ be able to assume if the type is 'object' that we have an actual {object}
    // this assumes we're working with JSON and not complex objects.
    if (propValueType === 'object') {
      newResult[propName] = {
        value: propValue.value,
        editable: '', // editable will never* be an object, so inject an empty string.
        // any consuming code will likely check for editable first, then fallback to value as needed.
        // *for now
      };
      return newResult;
    }

    // will we ever get here? perhaps if someone tries to use a function or symbol...
    return newResult;
  }, {});
};

/**
 * Receives dev route data and creates or assigns "value/editable" values where needed
 * for all fields and rendering props to match signature of LayoutService data.
 */
export const convertRouteToLayoutServiceFormat = (routeData: RouteData) => {
  const fields = convertPropDataToLayoutServiceFormat(routeData.fields);

  const transformPlaceholders = (placeholders: PlaceholdersData) => {
    if (!placeholders) {
      return {};
    }

    return Object.keys(placeholders).reduce(
      (result, placeholderName) => {
        const placeholder = placeholders[placeholderName];
        const elements = placeholder.map((element) => {
          if (isComponentRendering(element)) {
            const componentRendering = element as ComponentRendering;
            // https://stackoverflow.com/a/40560953/9324
            return {
              ...componentRendering,
              ...(componentRendering.placeholders && {
                placeholders: transformPlaceholders(componentRendering.placeholders),
              }),
              ...(componentRendering.params && { params: componentRendering.params }),
              ...(componentRendering.fields && {
                fields: convertPropDataToLayoutServiceFormat(componentRendering.fields),
              }),
            };
          }
          return element;
        });
        result[placeholderName] = elements;
        return result;
      },
      {} as PlaceholdersData
    );
  };

  const transformedPlaceholders = transformPlaceholders(routeData.placeholders);
  return {
    ...routeData,
    fields,
    placeholders: transformedPlaceholders,
  };
};
