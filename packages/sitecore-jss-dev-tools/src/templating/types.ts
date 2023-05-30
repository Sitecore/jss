export enum ModuleType {
  CJS,
  ESM,
}

/**
 * @param {string} path plugins path
 * @param resolveItem will resolve item in required data format
 * @param cb will be called when new item is found
 * @param {RegExp} fileFormat Matches specific files
 * @param {boolean} recursive if true will search recursively
 */
export type GetItemsSettings<Item> = {
  path: string;
  resolveItem: (path: string, name: string) => Item;
  cb?: (name: string) => void;
  fileFormat?: RegExp;
  recursive?: boolean;
};

/**
 * Type to specify plugin file details
 */
export interface PluginFile {
  path: string;
  name: string;
}

/**
 * Definition to be used for plugin registration during bootstrap
 */
export interface PluginDefinition {
  /**
   * destination path to compile plugins to
   */
  listPath: string;
  /**
   * source path for where the plugins are defined
   */
  rootPath: string;
  /**
   * CJS or ESM - which type to compile plugins to
   */
  moduleType: ModuleType;
}

/**
 * Describes a file that represents a component definition
 */
export interface ComponentFile {
  path: string;
  moduleName: string;
  componentName: string;
}

/**
 * Describes a package and components to be imported
 */
export interface PackageDefinition {
  name: string;
  components: {
    moduleName: string;
    componentName: string;
  }[];
}

/**
 * Describes a project item
 */
export type Project = {
  projectName: string;
  componentsPath: string;
};
