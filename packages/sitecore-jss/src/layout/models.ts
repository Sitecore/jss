/**
 * A reply from the Sitecore Layout Service
 */
export interface LayoutServiceData {
  sitecore: LayoutServiceContextData & {
    route: RouteData | null;
  };
}

/**
 * Layout Service page state enum
 */
export enum LayoutServicePageState {
  Preview = 'preview',
  Edit = 'edit',
  Normal = 'normal',
}

/**
 * Shape of context data from the Sitecore Layout Service
 */
export interface LayoutServiceContext {
  [key: string]: unknown;
  pageEditing?: boolean;
  language?: string;
  pageState?: LayoutServicePageState;
  visitorIdentificationTimestamp?: number;
  site?: {
    name?: string;
  };
}

/**
 * Context information from the Sitecore Layout Service
 */
export interface LayoutServiceContextData {
  context: LayoutServiceContext;
}

/**
 * Shape of route data returned from Sitecore Layout Service
 */
export interface RouteData {
  name: string;
  displayName?: string;
  fields?: {
    [name: string]: Field;
  };
  databaseName?: string;
  deviceId?: string;
  itemLanguage?: string;
  itemVersion?: number;
  layoutId?: string;
  templateId?: string;
  templateName?: string;
  placeholders: PlaceholdersData;
  itemId?: string;
}

/**
 * Placeholder contents data (name: placeholder name, then array of components within that placeholder name)
 * Note: HtmlElementRendering is used by Sitecore Experience Editor
 */
export type PlaceholdersData<TYPEDNAME extends string = string> = {
  [P in TYPEDNAME]: Array<PersonalizedComponentRendering | ComponentRendering | HtmlElementRendering>;
};

/**
 * Content field data passed to a component
 */
export interface ComponentFields {
  [name: string]: Field | Item | Item[];
}

/**
 * Component params
 */
export interface ComponentParams {
  [name: string]: string;
}

/**
 * Definition of a component instance within a placeholder on a route
 */
export interface ComponentRendering {
  componentName: string;
  dataSource?: string;
  uid?: string;
  placeholders?: PlaceholdersData;
  fields?: ComponentFields;
  params?: ComponentParams;
  personalization?: PersonalizationData;
}

export function hasPersonalization(object: any): object is ComponentRendering {
  return 'personalization' in object;
}

export function isComponentRendering(object: any): object is ComponentRendering {
  return 'componentName' in object;
}

export function isPersonalizedComponentRendering(object: any): object is PersonalizedComponentRendering {
  return 'personalization' in object;
}

export interface PersonalizedComponentRendering {
  componentName: string;
  uid: string;
  personalization: PersonalizationData;
}

export interface PersonalizationData {
  defaultComponent?: ComponentRendering;
  hiddenByDefault: boolean;
}

/**
 * HTML content used to support Sitecore Experience Editor
 */
export interface HtmlElementRendering {
  name: string;
  type?: string;
  contents: string | null;
  attributes: {
    [name: string]: string | undefined;
  };
}

/**
 * Field value data on a component
 */
export type GenericFieldValue =
  | string
  | boolean
  | number
  | { [key: string]: unknown }
  | Array<{ [key: string]: unknown }>;

export interface Field<T = GenericFieldValue> {
  value: T;
  editable?: string;
}

/**
 * Content data returned from Content Service
 */
export interface Item {
  name: string;
  displayName?: string;
  fields: {
    [name: string]: Field | Item | Item[] | undefined;
  };
}

/**
 * Contents of a single placeholder returned from placeholder service
 */
export interface PlaceholderData {
  name: string;
  path: string;
  elements: Array<HtmlElementRendering | ComponentRendering>;
}
