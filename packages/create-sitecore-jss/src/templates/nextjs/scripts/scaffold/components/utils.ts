/* eslint-disable @typescript-eslint/no-explicit-any */
import { QuestionCollection } from 'inquirer';

// Template types
export interface TemplateArgs {
  componentName: string;
  directories: ConfigDirectory[];
}

export type Template<T extends TemplateArgs> = (args: T) => string;

// Configuration Types
export type Config = {
  directories: ConfigDirectory[];
  templates: ConfigTemplate;
  questions?: QuestionCollection<any>;
};

export type ConfigDirectory = {
  name: string;
  path: string;
  directories?: ConfigDirectory[];
  templates?: ConfigTemplate;
  [name: string]: unknown;
};

export type ConfigTemplate = Record<string, Template<any>>;
