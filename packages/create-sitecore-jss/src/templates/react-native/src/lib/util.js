import Constants from 'expo-constants';

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

const processObjectProperty = (key, value) => {
  // replace 'jssreactnative' with ngrok URL.
  // urls returned from layout service will resolve to the Sitecore site host, e.g. http://jssreactnative.
  // need to replace 'http://jssreactnative' with the tunnel host so that urls resolve correctly via the tunnel.
  if (key === 'src') {
    const src = value.startsWith('/') 
      ? `${Constants.manifest.extra.sitecoreApiHost}${value}`
      : value.toLowerCase().replace(Constants.manifest.extra.originalApiHost.toLowerCase(), Constants.manifest.extra.sitecoreApiHost);
    return src;
  }
  return value;
};

const isObject = (value) => {
  const flag = value !== null && typeof value === 'object' && !Array.isArray(value);
  return flag;
};

export const populateTunnelUrl = (data) => {
  return mapNestedJson(data, processObjectProperty);
}
