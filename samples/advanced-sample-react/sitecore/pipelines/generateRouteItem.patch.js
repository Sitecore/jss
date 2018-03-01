/**
 * Functions for supporting community format for dynamic placeholders.
 */

const makePath = (separator, ...parts) => {
  let newParts = [];
  parts.forEach((part) => {
    const splitParts = part ? part.split(separator).filter(val => val) : [];
    if (splitParts.length) {
      newParts = newParts.concat(splitParts);
    }
  });

  let path = newParts.join(separator);
  // preserve the leading separator if it was provided
  if (parts[0] && parts[0].indexOf(separator) === 0) {
    path = `${separator}${path}`;
  }
  return path;
};

const formatGuid = (guid) => {
  // no curly braces in community guid format
  const newGuid = guid.replace('{', '').replace('}', '');
  return newGuid.toUpperCase();
};

const getDynamicPlaceholderKey = (parentPlaceholderPath, rendering, placeholderName) => {
  if (rendering && rendering.uid) {
    const uid = formatGuid(rendering.uid);
    // popular community format
    return makePath('/', parentPlaceholderPath, `${placeholderName}_${uid}`);
  }
  return makePath('/', parentPlaceholderPath, placeholderName);
};

export const config = (pipelines) => {
  const pipeline = pipelines.getPipeline('generateRouteItem');
  const processor = pipeline.getProcessor('processRenderings');

  /* Uncomment to use community-format or other custom dynamic placeholder keys. */
  /*
  console.log('patching "processRenderings" processor');
  processor.args.dynamicPlaceholderKeyGenerator = getDynamicPlaceholderKey;
  pipeline.updateProcessor(processor);
  */
};
