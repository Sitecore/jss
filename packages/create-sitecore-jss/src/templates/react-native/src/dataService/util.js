const isObject = (value) => {
  const flag = value !== null && typeof value === 'object' && !Array.isArray(value);
  return flag;
};

const mapNestedJson = (data, onProcessObjectProperty) => {
  if (!data) {
    return {};
  }

  return Object.keys(data).reduce((result, key) => {
    const value = data[key];

    if (Array.isArray(value)) {
      return {
        ...result,
        [key]: value.map((elem) => mapNestedJson(elem, onProcessObjectProperty)),
      };
    }

    if (isObject(value)) {
      return {
        ...result,
        [key]: mapNestedJson(value, onProcessObjectProperty),
      };
    }

    const finalValue = onProcessObjectProperty ? onProcessObjectProperty(key, value) : value;

    return { ...result, [key]: finalValue };
  }, {});
};

export { isObject, mapNestedJson };
