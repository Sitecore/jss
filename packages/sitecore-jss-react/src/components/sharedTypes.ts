import { ComponentType } from 'react';

export type ComponentFactory = (componentName: string) => ComponentType | null;
