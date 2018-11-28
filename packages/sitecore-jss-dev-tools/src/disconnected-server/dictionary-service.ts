import { ManifestInstance } from '@sitecore-jss/sitecore-jss-manifest';

/*
  Implements a fake version of the Sitecore JSS Dictionary Service that is powered by a local manifest file
*/

export interface DictionaryServiceOutput {
  lang: string;
  app: string;
  phrases: { [k: string]: string };
}

function defaultCustomizeDictionary(dictionary: any, language: string, appName: string) {
  // turn dictionary from { key: foo, value: bar } into { foo: bar }
  const finalDictionary = dictionary.reduce((result: any, current: { key: string, value: string }) => {
    // eslint-disable-next-line no-param-reassign
    result[current.key] = current.value;
    return result;
  }, {});

  // restructure to look like dictionary service output
  return {
    lang: language,
    app: appName,
    phrases: finalDictionary,
  } as DictionaryServiceOutput;
}

export interface DisconnectedDictionaryServiceOptions {
  manifest: ManifestInstance;
  customizeDictionary?: (
    finalDictionary: DictionaryServiceOutput,
    rawDictionary: any,
    currentManifest: ManifestInstance,
    request?: any,
    response?: any) => DictionaryServiceOutput;
  manifestLanguageChangeCallback?: (language: string) => Promise<ManifestInstance>;
}

export function createDisconnectedDictionaryService({
  manifest,
  customizeDictionary,
  manifestLanguageChangeCallback,
}: DisconnectedDictionaryServiceOptions) {
  let currentManifest = manifest;

  const service = {
    middleware: async function disconnectedLayoutServiceMiddleware(request: any, response: any) {
      const language = request.params.language ? request.params.language : 'en';
      const appName = request.params.appName ? request.params.appname : 'JssDisconnectedDictionary';

      // check to see if the language is different than what we have loaded, and if so change it
      // using the callback function if it is provided
      if (currentManifest.language.toUpperCase() !== language.toUpperCase()) {
        if (
          manifestLanguageChangeCallback &&
          typeof manifestLanguageChangeCallback === 'function'
        ) {
          try {
            currentManifest = await manifestLanguageChangeCallback(language);
          } catch (e) {
            console.error(`> [LAYOUT] Error getting manifest in language '${language}'`, e);
            response.sendStatus(500);
            return;
          }
        } else {
          console.error(
            `> [DICTIONARY] ERROR: Received request for dictionary in ${language} but the manifest data was in ${
              currentManifest.language
            // tslint:disable-next-line:max-line-length
            }. To enable switching languages at runtime, please pass 'manifestLanguageChangeCallback: function(newLanguage) { return manifestInNewLanguage; }' in the service creation options.`
          );
          response.sendStatus(404);
          return;
        }
      }

      if (!currentManifest.dictionary) {
        console.log(
          'Dictionary service: no dictionary in current manifest. An empty dictionary will be returned.'
        );
        response.sendStatus(404);
      }

      let finalDictionary: any = currentManifest.dictionary;

      finalDictionary = defaultCustomizeDictionary(finalDictionary, language, appName);

      if (customizeDictionary && typeof customizeDictionary === 'function') {
        finalDictionary = customizeDictionary(
          finalDictionary,
          currentManifest.dictionary,
          request,
          response
        );
      }

      console.log(`> [DICTIONARY] served in ${language}`);
      response.json(finalDictionary);
    },
    updateManifest(newManifest: ManifestInstance) {
      currentManifest = newManifest;
    },
  };

  service.updateManifest(manifest);

  return service;
}
