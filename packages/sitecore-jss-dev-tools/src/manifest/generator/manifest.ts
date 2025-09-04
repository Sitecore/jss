import { runPipeline } from '../../pipelines';
import {
  ComponentDefinition,
  CreateManifestInstanceArgs,
  DictionaryDefinition,
  GeneratePipelineArgs,
  ItemDefinition,
  Manifest,
  ManifestInstance,
  PlaceholderDefinition,
  RouteDefinition,
  TemplateDefinition,
} from './manifest.types';
import { InternalTemplateDefinition } from './manifest.types.internal';
import { validatePlaceholder, validateTemplate } from './validators';

export const createManifestInstance = ({
  pipelines,
  appName = '',
  excludeItems = false,
  excludeDictionary = false,
  language = '',
  debug = false,
  wipe = false,
  rootPlaceholders,
  skipPlaceholderBlacklist,
}: CreateManifestInstanceArgs) => {
  const manifestSourceData = {
    appName,
    components: new Array<ComponentDefinition>(),
    templates: new Array<InternalTemplateDefinition>(),
    placeholders: new Array<PlaceholderDefinition>(),
    routes: new Array<RouteDefinition>(),
    content: new Array<ItemDefinition>(),
    dictionary: new Array<DictionaryDefinition>(),
    language,
    wipe,
    rootPlaceholders,
    skipPlaceholderBlacklist,
  };

  const addComponent = (...components: ComponentDefinition[]) => {
    manifestSourceData.components.push(...components);
  };

  const addRoute = (...routes: RouteDefinition[]) => {
    manifestSourceData.routes.push(...routes);
  };

  const addContent = (...contents: ItemDefinition[]) => {
    manifestSourceData.content.push(...contents);
  };

  const addTemplateInternal = (...templates: InternalTemplateDefinition[]) => {
    templates.forEach((template) => {
      const validationResult = validateTemplate(template);
      if (validationResult.valid) {
        manifestSourceData.templates.push(template);
      } else {
        throw validationResult.error;
      }
    });
  };

  const addTemplate = (...templates: TemplateDefinition[]) => {
    templates.forEach((template) => {
      const internalTemplate = template as InternalTemplateDefinition;
      internalTemplate.route = false;
      internalTemplate.defaultRoute = false;

      addTemplateInternal(internalTemplate);
    });
  };

  const addPlaceholder = (...placeholders: PlaceholderDefinition[]) => {
    placeholders.forEach((placeholder) => {
      if (validatePlaceholder(placeholder).valid) {
        manifestSourceData.placeholders.push(placeholder);
      }
    });
  };

  const addRouteType = (...routeTypes: TemplateDefinition[]) => {
    routeTypes.forEach((template) => {
      const internalTemplate = template as InternalTemplateDefinition;
      internalTemplate.route = true;
      internalTemplate.defaultRoute = false;

      addTemplateInternal(internalTemplate);
    });
  };

  const setDefaultRouteType = (defaultRouteType: TemplateDefinition) => {
    const internalTemplate = defaultRouteType as InternalTemplateDefinition;
    internalTemplate.route = false;
    internalTemplate.defaultRoute = true;

    addTemplateInternal(internalTemplate);
  };

  const addDictionary = (...entries: DictionaryDefinition[]) => {
    manifestSourceData.dictionary = manifestSourceData.dictionary.concat(...entries);
  };

  const getManifest = async () => {
    const pipelineArgs: GeneratePipelineArgs = {
      debug,
      skipPlaceholderBlacklist: manifestSourceData.skipPlaceholderBlacklist,
      components: manifestSourceData.components,
      routes: manifestSourceData.routes,
      content: manifestSourceData.content,
      dictionary: manifestSourceData.dictionary,
      templates: manifestSourceData.templates,
      placeholders: manifestSourceData.placeholders,
      appName: manifestSourceData.appName,
      language: manifestSourceData.language,
      pipelines,
      pipelineResult: {
        templates: new Array<any>(),
        items: {
          routes: new Array<any>(),
          nonRoutes: new Array<any>(),
        },
        placeholders: new Array<any>(),
        dictionary: new Array<any>(),
        media: new Array<any>(),
        appName: manifestSourceData.appName,
        language: manifestSourceData.language,
        renderings: new Array<any>(),
        wipeExisting: manifestSourceData.wipe,
        rootPlaceholders: manifestSourceData.rootPlaceholders,
      },
    };

    const pipeline = { ...pipelines.generateManifest };
    pipeline.args = {
      ...pipeline.args,
      ...pipelineArgs,
    };
    const result = await runPipeline(pipeline);

    const { items, dictionary, ...output } = result.pipelineResult;

    // exclude items and media here as opposed to preventing them from being generated in
    // the manifest because some processors/pipelines may rely on generated manifest data
    if (!excludeItems) {
      output.items = items;
    }

    if (!excludeDictionary) {
      output.dictionary = dictionary;
    }

    return output as ManifestInstance;
  };

  return {
    getManifest,
    addComponent,
    addTemplate,
    addPlaceholder,
    addRouteType,
    setDefaultRouteType,
    addRoute,
    addContent,
    addDictionary,
    language,
  } as Manifest;
};
