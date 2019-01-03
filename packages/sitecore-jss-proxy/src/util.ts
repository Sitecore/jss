export const tryParseJson = (jsonString: string) => {
  try {
    const json = JSON.parse(jsonString);
    // handle non-exception-throwing cases
    if (json && typeof json === 'object' && json !== null) {
      return json;
    }
  } catch (e) {
    console.error(`error parsing json string '${jsonString}'`, e);
  }

  return null;
};

const traverseAndUpdate = (instance: any, oldValue: string, newValue: string): void => {
  for (var i in instance) {
    if (instance[i] !== null && typeof (instance[i]) == "object") {
      //going one step down in the object tree!!
      traverseAndUpdate(instance[i], oldValue, newValue);
    } else {
      if (typeof (instance[i]) == 'string' && instance[i].indexOf(oldValue) > -1) {
        instance[i] = instance[i].replace(oldValue, newValue);
      }
    }
  }
}

export const buildQueryString = (params: any) =>
  Object.keys(params)
  .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
  .join('&');

export const updateObject = (instance: any, oldValue: string, newValue: string) => {
  traverseAndUpdate(instance, oldValue, newValue);
}
