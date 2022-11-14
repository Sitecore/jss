import { Question } from 'inquirer';

// Template types
export interface TemplateArgs {
  componentName: string;
  directory: string;
}

export type Template<T extends TemplateArgs> = (args: T) => string;

// Configuration Types
type ComponentsFolderLevels = 'Shared' | 'Theme' | 'Site' | 'Helper';

export type ComponentsFolderConfig = {
  levels: ComponentConfigLevel[];
  directories: ComponentConfigDirectory[];
  templates: ComponentConfigTemplate[];
  questions?: Question[];
};

type ComponentConfigLevel = {
  name: ComponentsFolderLevels;
  short: string;
  path?: string;
  directories?: ComponentConfigOverwrite<ComponentConfigDirectory> | ComponentConfigPatch<ComponentConfigDirectory> | undefined;
  templates?: ComponentConfigOverwrite<ComponentConfigTemplate> | ComponentConfigPatch<ComponentConfigTemplate> | undefined;
  questions?: Question[] | undefined;
};

type ComponentConfigDirectory = {
  name: string;
  short: string;
  path: string;
  templates?: ComponentConfigOverwrite<ComponentConfigTemplate> | ComponentConfigPatch<ComponentConfigTemplate> | undefined;
  questions?: Question[] | undefined;
};

type ComponentConfigTemplate = {
  name: string;
  short: string;
  fileName: string;
  template: Template<any>;
  questions?: Question[] | undefined;
};

type ComponentConfigPatch<Type> = {
  kind: "patch";
  add: Type[] | undefined;
  remove: string[] | undefined;
  replace: Type[] | undefined;
};

type ComponentConfigOverwrite<Type> = {
  kind: "overwrite";
  overwrite: Type[];
};

// Types used for the configuration after applying any overrides
type ComponentsFolderLevel = {
  name: ComponentsFolderLevels;
  short: string;
  path?: string;
  directories: ComponentsFolderDirectory[];
  questions: Question[];
};

type ComponentsFolderDirectory = {
  name: string;
  short: string;
  path: string;
  templates: ComponentsFolderTemplate[];
  questions: Question[];
};

type ComponentsFolderTemplate = {
  name: string;
  short: string;
  fileName: string;
  template: Template<any>;
  questions: Question[];
};

export class ComponentsFolder {
  readonly levels: ComponentsFolderLevel[];
  readonly questions: Question[];

  constructor(protected configuration: ComponentsFolderConfig) {
    if (configuration.levels.length === 0) {
      throw `No levels configured`;
    }

    this.questions = configuration.questions || [];

    this.levels = [];
    for (const levelConfig of configuration.levels) {
      const level = this.buildLevel(levelConfig, configuration);
      this.levels.push(level);
    }
  }

  private buildLevel(levelConfig: ComponentConfigLevel, rootConfig: ComponentsFolderConfig): ComponentsFolderLevel {
    // The allowed directories is a combination of the root and level directories
    let directoryConfigs = this.applyOverrides(rootConfig.directories, levelConfig.directories);
    if (directoryConfigs.length === 0) {
      throw `No directories configured for level ${levelConfig.name}`;
    }

    const directories: ComponentsFolderDirectory[] = [];
    for (const directoryConfig of directoryConfigs) {
      const directory = this.buildDirectory(directoryConfig, levelConfig, rootConfig);
      directories.push(directory);
    }

    let level: ComponentsFolderLevel = {
      name: levelConfig.name,
      short: levelConfig.short,
      path: levelConfig.path,
      questions: levelConfig.questions || [],
      directories,
    };

    return level;
  }

  private buildDirectory(directoryConfig: ComponentConfigDirectory, levelConfig: ComponentConfigLevel, rootConfig: ComponentsFolderConfig): ComponentsFolderDirectory {
    // The allowed templates is a combination of the root, level and directories
    let templateConfigs = this.applyOverrides(rootConfig.templates, levelConfig.templates);
    templateConfigs = this.applyOverrides(templateConfigs, directoryConfig.templates);
    if (templateConfigs.length === 0) {
      throw `No templates configured for level ${levelConfig.name} and directory ${directoryConfig.name}`;
    }

    const templates: ComponentsFolderTemplate[] = [];
    for (const templateConfig of templateConfigs) {
      const template = this.buildTemplate(templateConfig);
      templates.push(template);
    }

    let directory: ComponentsFolderDirectory = {
      name: directoryConfig.name,
      short: directoryConfig.short,
      path: directoryConfig.path,
      questions: directoryConfig.questions || [],
      templates,
    };

    return directory;
  }

  private buildTemplate(templateConfig: ComponentConfigTemplate): ComponentsFolderTemplate {
    let template: ComponentsFolderTemplate = {
      name: templateConfig.name,
      short: templateConfig.short,
      fileName: templateConfig.fileName,
      template: templateConfig.template,
      questions: templateConfig.questions || [],
    };

    return template;
  }

  private applyOverrides<Type extends ComponentConfigDirectory | ComponentConfigTemplate>(base: Type[], override: ComponentConfigOverwrite<Type> | ComponentConfigPatch<Type> | undefined) {
    let result = base;
    if (override) {
      if (override === undefined) {
        // Do nothing
      } else if (override.kind === "overwrite") {
        result = override.overwrite;
      } else if (override.kind === "patch") {
        if (override.add) {
          result.concat(override.add);
        }
        if (override.remove) {
          const remove = override.remove;
          result = result.filter((_) => !remove.indexOf(_.name))
        }
        if (override.replace) {
          const replace = override.replace;
          result = result.map(_ => { 
            const index = replace.findIndex(__ => __.name === _.name);
            return index >= 0 ? replace[index] : _;
          });
        }
      }
    }
    return result;
  }
}
