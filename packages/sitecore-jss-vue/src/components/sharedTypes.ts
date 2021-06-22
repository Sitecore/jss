import { DefineComponent } from 'vue';

export type ComponentFactory = (componentName: string) => DefineComponent;
