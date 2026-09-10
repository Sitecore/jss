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
 * library mode would render a single component
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
  itemPath?: string;
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
export interface RouteData<Fields = Record<string, Field | Item | Item[]>> {
  name: string;
  displayName?: string;
  fields?: Fields;
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
  [P in TYPEDNAME]: Array<ComponentRendering | HtmlElementRendering>;
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
export interface ComponentRendering<T = ComponentFields> {
  componentName: string;
  dataSource?: string;
  /**
   * `true` when Layout Service resolved this rendering's datasource content.
   * `false` when resolution failed (for example because the item was deleted or archived).
   * Omitted by older Layout Service versions; absence preserves existing behavior.
   */
  isContentResolved?: boolean;
  uid?: string;
  placeholders?: PlaceholdersData;
  fields?: T;
  params?: ComponentParams;
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
  | Date
  | { [key: string]: unknown }
  | Array<{ [key: string]: unknown }>;

export interface Field<T = GenericFieldValue> {
  value: T;
  editable?: string;
}

/**
 * Content data returned from Layout Service
 */
export interface Item {
  name: string;
  displayName?: string;
  id?: string;
  url?: string;
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
