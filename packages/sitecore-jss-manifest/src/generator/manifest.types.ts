import { ExecutablePipeline } from '@sitecore-jss/sitecore-pipelines';
import { SitecoreIcon } from './SitecoreIcon';

/** Represents a set of disconnected data to run a JSS app from, or import to Sitecore */
export interface Manifest {
  /** Processes all the existing manifest input data and transforms it to a manifest JSON format */
  getManifest: () => Promise<ManifestInstance>;
  /**
   * Adds a component to the manifest. Components are modules that can be
   * added to a route dynamically based on layout settings.
   */
  addComponent: (...components: ComponentDefinition[]) => void;
  /**
   * Adds a template (a content data type) to the manifest. Templates
   * define a schema of data fields. Explicitly adding templates is generally
   * reserved for defining base templates to inherit from. In most cases,
   * addComponent() or addRouteType() should be used instead.
   */
  addTemplate: (...templates: TemplateDefinition[]) => void;
  /**
   * Adds a placeholder definition to the manifest.
   * Explicit placeholder definition is not necessary as it is inferred
   * from route data usage, however it allows the specification of
   * additional metadata (i.e. display names), and is recommended.
   */
  addPlaceholder: (...placeholders: PlaceholderDefinition[]) => void;
  /**
   * Adds a route type (a template containing a route-level fields definition).
   * Route types are useful for data that is always present on a route - for example
   * an article route type might contain a headline, category, and author. Favor
   * component-level fields when possible, as they are personalizable. However
   * route level fields are much more easily queryable and filterable for listings.
   */
  addRouteType: (...routeTypes: TemplateDefinition[]) => void;
  /**
   * Sets default route type (a template containing a route-level fields definition).
   */
  setDefaultRouteType: (defaultRouteType: TemplateDefinition) => void;
  /**
   * Adds a route definition to the manifest. A route contains a set of components, and possibly child routes.
   */
  addRoute: (...routes: RouteDefinition[]) => void;
  /**
   * Adds a content item to the manifest. Content items are items with non-route and non-component data,
   * for example global elements or content list target items.
   */
  addContent: (...contents: ItemDefinition[]) => void;
  /**
   * Adds a translation dictionary entry to the manifest.
   */
  addDictionary: (...entries: Array<{ key: string; value: string }>) => void;
  language: string;
}

export interface ManifestInstance {
  appName: string;
  templates: TemplateDefinition[];
  items: {
    routes: RouteDefinition[];
    nonRoutes: ItemDefinition[];
  };
  placeholders: PlaceholderDefinition[];
  media?: any[];
  dictionary: DictionaryDefinition[];
  language: string;
  wipeExisting: boolean;
  rootPlaceholders: string[];
}

export interface CreateManifestInstanceArgs {
  pipelines: any;
  appName: string;
  excludeItems: boolean;
  excludeDictionary: boolean;
  language: string;
  debug: boolean;
  wipe: boolean;
  rootPlaceholders: string[];
  skipPlaceholderBlacklist: boolean;
}

export enum CommonFieldTypes {
  SingleLineText = 'Single-Line Text',
  MultiLineText = 'Multi-Line Text',
  RichText = 'Rich Text',
  ContentList = 'Treelist',
  ItemLink = 'Droptree',
  GeneralLink = 'General Link',
  Image = 'Image',
  File = 'File',
  Number = 'Number',
  Checkbox = 'Checkbox',
  Date = 'Date',
  DateTime = 'Datetime',
}

export enum FieldStorage {
  Versioned = 'versioned',
  Shared = 'shared',
  Unversioned = 'unversioned',
}

/**
 * Represents a field on a JSS component or template
 */
export interface FieldDefinition {
  name: string;
  /**
   * The data type of the field used when importing. Either a CommonFieldTypes enum value, or a string of a Sitecore field type name.
   */
  type: CommonFieldTypes | string;
  displayName?: string;
  /**
   * Optionally specify an ID used when importing. Can be either a GUID, or a string. ID values must be unique app-wide if specified.
   */
  id?: string;
  /**
   * Specify a sort order for the field to be used when importing. Defaults to the order defined in the manifest.
   */
  sortOrder?: number;
  /**
   * The value this field will contain when a new item is created with this field on it in Sitecore. '$name' is the name of the item.
   */
  standardValue?: string;
  /**
   * Template section name used in Sitecore. Defaults to 'Data'
   */
  section?: string;
  /**
   * Whether the field needs required validation in Sitecore. Note: required fields may still not have a value when previewing.
   * Default: false
   */
  required?: boolean;
  /**
   * A regular expression (evaluated in .NET) to validate the field value in Sitecore.
   * Example: '^[A-Za-z ]+$'
   */
  validationPattern?: string;
  /**
   * When used with validationPattern, the message shown when the field fails regex validation in Sitecore.
   */
  validationMessage?: string;
  /**
   * Sets the field source in Sitecore.
   */
  source?: string;
  /**
   * Sets how the field value is stored in Sitecore. For advanced Sitecore developers only.
   * Versioned (default) is almost always what you want. Do not change after importing unless using full wipe.
   * Content data loss could occur if altered after import.
   */
  storage?: FieldStorage;
}

/**
 * Defines a non-content parameter that can be set on a component.
 * Parameters are more developer-focused options than fields, such as configurable CSS classes.
 */
export type RenderingParameterDefinition = FieldDefinition;

/**
 * Explicitly defines a placeholder name, and allows setting the display name.
 * NOTE: placeholders defined on routes that are not explicitly defined are automatically added.
 * Explicit definition is only needed when you wish to specify a display name.
 */
export interface PlaceholderDefinition {
  name: string;
  displayName?: string;
  /**
   * Optionally specify an ID used when importing the rendering item for this component.
   * Can be either a GUID, or a string. ID values must be unique app-wide if specified.
   * For Sitecore developers only.
   */
  id?: string;
}

export interface TemplateDefinition {
  name: string;
  displayName?: string;
  /**
   * The data fields that provide content data to the component
   */
  fields: FieldDefinition[];
  /**
   * The path to a Sitecore icon to use when the component is imported.
   * Example: 'People/16x16/alarmclock.png'
   */
  icon?: SitecoreIcon | string;
  /**
   * Names of other templates to inherit from. Inheritance inherits fields, but not other component data.
   */
  inherits?: string[];
  /**
   * Optionally specify an ID used when importing the template item.
   * Can be either a GUID, or a string. ID values must be unique app-wide if specified.
   * For Sitecore developers only.
   */
  id?: string;
  /**
   * The path or GUID of a Sitecore workflow to assign to the component's data.
   * For Sitecore developers only.
   */
  defaultWorkflow?: string;
  /** Template names to allow as insert options under this template */
  insertOptions?: string[];
}

export interface ComponentDefinition {
  name?: string;
  displayName?: string;
  /**
   * The data fields that provide content data to the component
   */
  fields?: FieldDefinition[];
  /**
   * The names of JSS placeholders that this component exposes
   * (keys of any placeholder components added to this component's JS view)
   */
  placeholders?: PlaceholderDefinition[] | string[];
  /**
   * Explicit names of Sitecore placeholders that this component is allowed
   * to be placed into. Normally this is automatically inferred based on
   * route data definitions (it will be allowed in any placeholders it is placed in
   * in disconnected definitions automatically), however at times explicit definition
   * is preferable, i.e. if not defining routes but only defining components.
   * NOTE: Setting an allowed placeholder name does not register it with the manifest; use `manifest.addPlaceholder()` to register it
   */
  allowedPlaceholders?: string[];
  /**
   * Defines non-content parameters.
   * Parameters are more developer-focused options than fields, such as configurable CSS classes.
   */
  params?: string[] | RenderingParameterDefinition[];
  /**
   * The path to a Sitecore icon to use when the component is imported.
   * Example: 'People/16x16/alarmclock.png'
   */
  icon?: SitecoreIcon | string;
  /**
   * Names of other templates or components to inherit from. Inheritance inherits fields, but not other component data.
   */
  inherits?: string[];
  /**
   * Whether to show a button in Sitecore that allows editing all fields on the component at once.
   * Default: true
   */
  displayFieldEditorButton?: boolean;
  /**
   * Explicitly specify the names of fields that the displayFieldEditorButton button will show.
   * If displayFieldEditorButton is false, has no effect.
   */
  fieldEditorFields?: string[];
  /**
   * Optionally specify an ID used when importing the rendering item for this component.
   * Can be either a GUID, or a string. ID values must be unique app-wide if specified.
   * For Sitecore developers only.
   */
  renderingId?: string;
  /**
   * Optionally specify an ID used when importing the datasource template item for this component.
   * Can be either a GUID, or a string. ID values must be unique app-wide if specified.
   * For Sitecore developers only.
   */
  templateId?: string;
  /**
   * The path or GUID of a Sitecore workflow to assign to the component's data.
   * For Sitecore developers only.
   */
  defaultWorkflow?: string;
  /**
   * A GraphQL query that will be executed against the JSS app's configured Sitecore GraphQL endpoint
   * (in-process) to activate _Integrated GraphQL_. iGQL will replace the `fields` collection in the LS response
   * with the results of this GraphQL query, instead of the default datasource serialization.
   */
  graphQLQuery?: string;
  /** Template names to allow as insert options under this template */
  insertOptions?: string[];
}

export interface DictionaryDefinition {
  key: string;
  value: string;
}

export interface ImageFieldValue {
  src: string;
  alt: string;
  id?: string;
  displayName?: string;
  title?: string;
  keywords?: string;
  description?: string;
  width?: number;
  height?: number;
  class?: string;
}

export interface LinkFieldValue {
  /**
   * The href of the link. If this is a valid route, an internal link is created on import.
   * Otherwise, the value is used literally.
   */
  href: string;
  /**
   * The text shown as the body of the link
   */
  text?: string;
  /**
   * The anchor (ie #foo) the link points to
   * Used for internal links.
   */
  anchor?: string;
  /**
   * The CSS class of the link tag
   */
  class?: string;
  /**
   * The query string added to the link URL
   * Used for internal links.
   */
  querystring?: string;
  /**
   * The target attribute of the link tag
   */
  target?: string;
  /**
   * The title attribute of the link tag
   */
  title?: string;
}

export interface ContentFieldValue {
  value:
    | string
    | number
    | boolean
    | ImageFieldValue
    | LinkFieldValue
    | Array<ItemDefinition | ItemReference>;
  editable?: string;
}

export interface ItemDefinition {
  name: string;
  template: string;
  displayName?: string;
  id?: string;
  fields?: { [key: string]: ContentFieldValue };
  children?: Array<ItemDefinition | ItemReference>;
  path?: string;
  insertOptions?: string[];
}

export interface ItemReference {
  id: string;
}

/**
 * @param {ItemDefinition | ItemReference} obj
 */
export function isItemDefinition(obj: ItemDefinition | ItemReference): obj is ItemDefinition {
  return (obj as ItemDefinition).name !== undefined;
}

export interface RouteDefinition extends ItemDefinition {
  placeholders?: { [key: string]: ComponentInstanceDefinition[] };
}

export interface ComponentInstanceDefinition extends ItemDefinition {
  componentName: string;
  placeholders?: { [key: string]: ComponentInstanceDefinition[] };
}

export interface GeneratePipelineArgs {
  [key: string]: any;
  debug: boolean;
  skipPlaceholderBlacklist: boolean;
  components: ComponentDefinition[];
  routes: RouteDefinition[];
  content: ItemDefinition[];
  dictionary: DictionaryDefinition[];
  templates: TemplateDefinition[];
  placeholders: PlaceholderDefinition[];
  appName: string;
  language: string;
  pipelines: { [key: string]: ExecutablePipeline };
  pipelineResult: ManifestInstance & { [key: string]: any };
}

export interface GenerateContentItemArgs extends GeneratePipelineArgs {
  content: any;
  item?: any;
}

export interface GeneratePlaceholdersPipelineArgs {
  items: RouteDefinition[];
  renderings: any[];
  placeholders: PlaceholderDefinition[];
  placeholderNames: string[];
  rootPlaceholders: string[];
  skipPlaceholderBlacklist: boolean;
  pipelines: { [key: string]: ExecutablePipeline };
}

export interface GenerateRouteItemPipelineArgs {
  [key: string]: any;
  route: RouteDefinition;
  components: ComponentDefinition[];
  pipelines: { [key: string]: ExecutablePipeline };
  item: any;
  dynamicPlaceholderKeyGenerator: (key: string, rendering: any, parentKey: string) => string;
  datasourceNamer: ({
    item,
    placeholder,
    rendering,
    index,
  }: {
    item: any;
    placeholder: any;
    rendering: any;
    index: number;
  }) => string;
  datasourceDisplayNamer: ({
    rendering,
    index,
  }: {
    item: any;
    placeholder: any;
    rendering: any;
    index: number;
  }) => string;
  onRenderingProcessed?: (rendering: any) => void;
}
