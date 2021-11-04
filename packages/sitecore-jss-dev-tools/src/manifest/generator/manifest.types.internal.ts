import { TemplateDefinition } from './manifest.types';

export interface InternalTemplateDefinition extends TemplateDefinition {
  route: boolean;
  defaultRoute: boolean;
}
