import React from 'react';
import { ComponentFactory } from '../index';
import { withComponentFactory } from '../enhancers/withComponentFactory';

export interface RenderingVariantParameters {
  [prop: string]: unknown;
  FieldNames: string;
  GridParameters?: string;
  Styles?: string;
}

export interface RenderingVariantsProps<Fields> {
  fields: Fields;
  componentName: string;
  params: RenderingVariantParameters;
  componentFactory?: ComponentFactory;
}

export interface RenderingVariantProps<Fields> {
  styles?: string;
  fields: Fields;
}

const RenderingVariantsComponent = <Fields extends unknown>(
  props: RenderingVariantsProps<Fields>
) => {
  const Component = props.componentFactory<RenderingVariantProps<Fields>>(
    props.componentName,
    props.params.FieldNames
  );

  return (
    <Component
      fields={props.fields}
      styles={`${props.params.GridParameters || ''} ${props.params.Styles || ''}`}
    />
  );
};

export const RenderingVariants = withComponentFactory(RenderingVariantsComponent);
