/* eslint-disable */

import { ManifestInstance } from '../index';

export type CustomizeRenderFunction = (
  transformedRendering: any,
  rawRendering: any,
  currentManifest: ManifestInstance,
  request?: any,
  response?: any
) => any;

export type CustomizeContextFunction = (
  context: any,
  route: any,
  currentManifest: ManifestInstance,
  request: any,
  response: any
) => any;

export type CustomizeRouteFunction = (
  route: any,
  rawRoute: any,
  currentManifest: ManifestInstance,
  request?: any,
  response?: any) => any;

export interface DisconnectedLayoutServiceOptions {
  manifest: ManifestInstance;
  customizeContext?: CustomizeContextFunction;
  customizeRoute?: CustomizeRouteFunction;
  customizeRendering?: CustomizeRenderFunction;
  manifestLanguageChangeCallback?: (language: string) => Promise<ManifestInstance>;
}
