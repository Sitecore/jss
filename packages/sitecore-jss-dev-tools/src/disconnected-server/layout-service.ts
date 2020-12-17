/* eslint-disable */

import { ManifestInstance, RouteDefinition } from '@sitecore-jss/sitecore-jss-manifest';
import chalk from 'chalk';
import {Request, Response} from 'express';
import { CustomizeRenderFunction, DisconnectedLayoutServiceOptions } from './DisconnectedLayoutServiceOptions';

/*
  Implements a fake version of the Sitecore JSS Layout Service that is powered by a local manifest file
*/

function createDefaultContext(language: string) {
  return {
    pageEditing: false,
    site: {
      name: 'JssDisconnectedLayoutService',
    },
    pageState: 'normal',
    language,
  };
}

function getRouteData(routePath: string, manifest: ManifestInstance) {
  const pathBits = routePath.split('/').filter((bit: string) => bit && bit.length > 0);

  if (!pathBits) {
    return null;
  }

  // the home route is the first defined root route
  const homeRoute = manifest.items.routes[0];

  // no length = a request for "/", so we send the home route
  if (pathBits.length === 0) {
    return homeRoute;
  }

  if (!homeRoute.children) {
    return null;
  }

  // traverse the route tree searching for a matching route
  let currentRoute = (homeRoute.children as RouteDefinition[]).find(
    (route: any) => route.name.toUpperCase() === pathBits[0].toUpperCase()
  );

  for (let segment = 1; segment < pathBits.length; segment += 1) {
    if (!currentRoute || !currentRoute.children) {
      return null;
    }

    currentRoute = (currentRoute.children as RouteDefinition[]).find(
      (route: any) => route.name.toUpperCase() === pathBits[segment].toUpperCase()
    );
  }

  if (!currentRoute) {
    return null;
  }

  return currentRoute;
}

function extractDynamicPlaceholderKeyDetails(dynamicKey: string) {
  /* tslint:disable max-line-length */
  // attempts to match a dynamic placeholder key of the format (key)-{UID}-{index}, e.g. page-content-{BC8C7AB9-6D40-5393-ABDE-6D7DF27F2D3F}-0
  const dynamicKeyMatches = /^(.*)-(\{{0,1}([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}\}{0,1})-([0-9]+)$/.exec(
    dynamicKey
  );

  // non-dynamic placeholder name (e.g. 'main') if fails the regex
  if (dynamicKeyMatches === null) {
    return { name: dynamicKey, segment: dynamicKey };
  }

  if (dynamicKeyMatches.length < 3) {
    throw new Error(
      `Unable to match dynamic placeholder key ${dynamicKey}; did not match Sitecore format [key]-GUID-index.`
    );
  }

  return {
    name: dynamicKeyMatches[1],
    uid: dynamicKeyMatches[2],
    index: dynamicKeyMatches[3],
    segment: dynamicKey,
  };
}

function extractTopLevelPlaceholderDetails(placeholderKey: string) {
  let keySegment = placeholderKey;

  if (!placeholderKey) {
    return null;
  }

  // strip any leading /
  if (keySegment.indexOf('/') === 0) {
    keySegment = keySegment.substring(1);
  }

  const separatorIndex = keySegment.indexOf('/');
  // multipart placeholder (e.g. /main/foo/bar)
  if (separatorIndex >= 0) {
    return extractDynamicPlaceholderKeyDetails(keySegment.substring(0, separatorIndex));
  }

  // single part placeholder (e.g. 'main')
  return extractDynamicPlaceholderKeyDetails(keySegment);
}

function getOrCreatePlaceholderPath(placeholderKey: string, resultObject: any): any {
  const placeholderDetails = extractTopLevelPlaceholderDetails(placeholderKey);

  if (placeholderDetails === null) {
    throw new Error(`No placeholder could be resolved from key ${placeholderKey}`);
  }

  let placeholder;

  // NOTE: the resultObject is an object for a singular placeholder name (the root 'placeholders' object)
  // but it is an array for a dynamic placeholder (the parent placeholder's renderings array)

  if (placeholderDetails.uid) {
    // resolve dynamic placeholder

    const dynamicParent = resultObject.find(
      (rendering: any) => rendering.uid === placeholderDetails.uid
    );

    if (!dynamicParent) {
      throw new Error(
        `The rendering UID referenced in the placeholder ${placeholderKey} was not defined in the layout definition.`
      );
    }

    if (!dynamicParent.placeholders) {
      dynamicParent.placeholders = {};
    }

    if (!dynamicParent.placeholders[placeholderDetails.name]) {
      dynamicParent.placeholders[placeholderDetails.name] = [];
    }

    placeholder = dynamicParent.placeholders[placeholderDetails.name];
  } else {
    // resolve singular placeholder name
    placeholder = resultObject[placeholderDetails.name];

    if (!placeholder) {
      // eslint-disable-next-line no-multi-assign, no-param-reassign
      placeholder = resultObject[placeholderDetails.name] = [];
    }
  }

  // check if we have more placeholders to traverse
  // using length + 1 to account for a leading / in the ph key (e.g. /main vs segment main)
  if (placeholderKey.length > placeholderDetails.segment.length + 1) {
    return getOrCreatePlaceholderPath(
      // length + 2 accounts for leading /
      placeholderKey.substring(placeholderDetails.segment.length + 1),
      placeholder
    );
  }

  return placeholder;
}

export function remapFieldsArrayToFieldsObject(input: any) {
  // fields go from "name: foo, value: bar" to "foo: { value: bar, editable: bar }"
  return input.reduce((fieldReduceResult: any, current: any) => {
    let value = current.value;

    // blacklist properties that can be in manifest data but are not in LS data
    delete value.displayName;
    delete value.name;
    delete value.template;
    delete value.resolvedFromItemId;

    // array value is an item definition; in which case we also need to remap that item's fields
    if (Array.isArray(value) && value.length > 0 && value[0].fields) {
      value = value.map((field) => {
        const itemResult = {
          ...field,
          fields: remapFieldsArrayToFieldsObject(field.fields),
        };

        // add a faux ID to content lists to match LS
        if (!itemResult.id) {
          itemResult.id = 'available-in-connected-mode';
        }

        // blacklist properties that can be in manifest data but are not in LS data
        delete itemResult.displayName;
        delete itemResult.name;
        delete itemResult.template;
        delete itemResult.resolvedFromItemId;

        return itemResult;
      });

      fieldReduceResult[current.name] = value;
      return fieldReduceResult;
    }

    // field value is a singular item (i.e. an Item Link/Droptree)
    // we need to remap those field values too
    if (value && value.fields && Array.isArray(value.fields)) {
      fieldReduceResult[current.name] = {
        // add faux ID to item links to match LS
        id: 'available-in-connected-mode',
        ...value,
        fields: remapFieldsArrayToFieldsObject(value.fields),
      };

      return fieldReduceResult;
    }

    fieldReduceResult[current.name] = { value };

    return fieldReduceResult;
  }, {});
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function convertManifestLayoutDataToLayoutServiceFormat(manifestLayout: any, placeholders: string[], currentManifest: ManifestInstance, request: any, response: any, customizeHook?: CustomizeRenderFunction) {
  const result: any = {};

  // we sort by placeholder key length to ensure we create the rendering tree in hierarchy order
  manifestLayout
    .forEach((rendering: any) => {
      const placeholder = getOrCreatePlaceholderPath(rendering.placeholderKey, result);

      const transformedRendering: any = {
        uid: rendering.uid,
        // shared renderings defined as items instead of on the route will have 'template'; pure renderings will have 'renderingName'
        componentName: rendering.renderingName ? rendering.renderingName : rendering.template,
        dataSource: 'available-in-connected-mode',
      };

      if (rendering.renderingParams) {
        // rendering params go from "name: foo, value: bar" to "foo: bar"
        transformedRendering.params = rendering.renderingParams.reduce((reduceResult: any, current: any) => {
          // eslint-disable-next-line no-param-reassign
          reduceResult[current.name] = current.value.toString();
          return reduceResult;
        }, {});
      }

      if (rendering.dataSource && rendering.dataSource.fields) {
        // fields go from "name: foo, value: bar" to "foo: { value: bar, editable: bar }"
        transformedRendering.fields = remapFieldsArrayToFieldsObject(rendering.dataSource.fields);
      }

      const customizeResult = (customizeHook && customizeHook(transformedRendering, rendering, currentManifest, request, response)) || transformedRendering;

      // adds the rendering object to its placeholder in the LS output
      placeholder.push(customizeResult);
    });

  // ensure empty placeholders are defined
  placeholders.forEach((key) => {
    if (!result[key]) {
      result[key] = [];
    }
  });

  return result;
}

function defaultCustomizeRoute(route: any, language: string, currentManifest: ManifestInstance, request: any, response: any, customizeRendering?: CustomizeRenderFunction) {
  const transformedRoute = Object.assign(
    {
      databaseName: 'available-in-connected-mode',
      deviceId: 'available-in-connected-mode',
      itemId: route.id ? route.id : 'available-in-connected-mode',
      itemLanguage: language,
      itemVersion: 1,
      layoutId: 'available-in-connected-mode',
      templateId: 'available-in-connected-mode',
      templateName: route.template ? route.template : 'available-in-connected-mode',
    },
    route
  );

  transformedRoute.placeholders = convertManifestLayoutDataToLayoutServiceFormat(
    transformedRoute.layout.renderings,
    transformedRoute.layout.placeholders,
    currentManifest,
    request,
    response,
    customizeRendering
  );

  if (transformedRoute.fields) {
    transformedRoute.fields = remapFieldsArrayToFieldsObject(transformedRoute.fields);
  }

  delete transformedRoute.id;
  delete transformedRoute.template;
  delete transformedRoute.layout;
  delete transformedRoute.children;

  return transformedRoute;
}

export function createDisconnectedLayoutService({
  manifest,
  customizeContext,
  customizeRoute,
  manifestLanguageChangeCallback,
  customizeRendering,
}: DisconnectedLayoutServiceOptions) {
  let currentManifest = manifest;

  console.log(`🔌  Disconnected ${chalk.red('Layout Service')} initializing...⏳`);

  const service = {
    middleware: async function disconnectedLayoutServiceMiddleware(request: Request, response: Response) {
      const language = (request.query.sc_lang ? request.query.sc_lang : 'en') as string;
      const routePath = request.query.item;

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
            `> [LAYOUT] ERROR: Received request for layout in ${language} but the manifest data was in ${
              currentManifest.language
            }. To enable switching languages at runtime, please pass 'manifestLanguageChangeCallback: function(newLanguage) { return manifestInNewLanguage; }' in the service creation options.`
          );
          response.sendStatus(404);
          return;
        }
      }

      // no route specified
      if (!routePath) {
        console.log('> [LAYOUT] Missing route path "item" in service query string');
        response.sendStatus(400);
        return;
      }

      // lookup route data
      const rawRoute = getRouteData(routePath as string, currentManifest);
      let route;

      if (rawRoute) {
        route = defaultCustomizeRoute(rawRoute, language, currentManifest, request, response, customizeRendering);
        if (customizeRoute && typeof customizeRoute === 'function') {
          route = customizeRoute(route, rawRoute, currentManifest, request, response);
        }
      }

      // create context object
      let context = createDefaultContext(language);
      if (customizeContext && typeof customizeContext === 'function') {
        context = customizeContext(context, route, currentManifest, request, response);
      }

      if (!route) {
        route = null;
      }

      // assemble result
      const result = {
        sitecore: {
          context,
          route,
        },
      };

      // no matching route, return 404
      if (!route) {
        console.log(`> [LAYOUT] Layout for route '${routePath}' was not defined. Returning 404.`);
        response.status(404).json(result);
        return;
      }

      console.log(`> [LAYOUT] served for ${routePath}`);
      response.json(result);
    },
    updateManifest(newManifest: ManifestInstance) {
      currentManifest = newManifest;
    },
  };

  service.updateManifest(manifest);

  return service;
}
