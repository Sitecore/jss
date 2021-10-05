import { ComponentType } from 'react';

export type ComponentFactory = <ComponentProps>(
  componentName: string,
  exportName?: string
) => ComponentType<ComponentProps> | null;
