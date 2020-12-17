const makePath = (separator: string, ...parts: string[]) => {
  let newParts: string[] = [];
  parts.forEach((part) => {
    const splitParts = part ? part.split(separator).filter((val) => val) : [];
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

const formatGuid = (guid: string) => {
  let formattedGuid = guid;
  if (guid.length === 36) {
    // no wrapping braces
    formattedGuid = `{${guid}}`;
  }
  return formattedGuid.toUpperCase();
};

export const getDynamicPlaceholderKey = (
  parentPlaceholderPath: string,
  rendering: { [key: string]: any, uid: string },
  placeholderName: string
) => {
  if (rendering && rendering.uid) {
    const uid = formatGuid(rendering.uid);
    const index = 0; // this could become dynamic if we wish to support "incrementing" dynamic placeholders as well
    return makePath('/', parentPlaceholderPath, `${placeholderName}-${uid}-${index}`);
  }
  return makePath('/', parentPlaceholderPath, placeholderName);
};
