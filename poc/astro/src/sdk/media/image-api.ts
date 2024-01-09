import jss from "@sitecore-jss/sitecore-jss/media";
const { mediaApi } = jss;

export const prepareImageSource = (originalSource?: string, imageParams?: { [paramName: string]: string | number }, mediaUrlPrefix?: RegExp) => {
  let srcWithNormalizedPrefix = mediaApi.replaceMediaUrlPrefix(originalSource ?? "", mediaUrlPrefix);
  return  mediaApi.updateImageUrl(srcWithNormalizedPrefix, imageParams, mediaUrlPrefix);
};