/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { ComponentFields } from '@sitecore-jss/sitecore-jss/layout';
import { getDataFromFields } from '../utils';
import { MissingComponent } from './MissingComponent';
import { RegisteredComponents } from '@sitecore-feaas/clientside/types/ui/FEAASExternal';

/**
 * Data from rendering params on Sitecore's BYOC rendering
 */
type BYOCRenderingParams = {
  /**
   * Name of the component to render
   */
  ComponentName: string;
  /**
   * JSON props to pass into rendered component
   */
  ComponentProps?: string;
};

/**
 * Props for BYOC wrapper component
 */
export type BYOCProps = {
  /**
   * rendering params
   */
  params?: BYOCRenderingParams;
  /**
   * fields from datasource items to be passed as rendered child component props
   */
  fields?: ComponentFields;
};

/**
 * Props for BYOCRenderer component. Includes components list to load external components from.
 */
type ByocRendererProps = BYOCProps & {
  components: RegisteredComponents;
};

/**
 * BYOCRenderer helps rendering BYOC components - that can be taken from anywhere
 * and registered without being deployed as Sitecore renderings
 * @param {ByocRendererProps} props component props
 * @returns dynamicly rendered component or Missing Component error frame
 */
export const BYOCRenderer = (props: ByocRendererProps) => {
  const { ComponentName: componentName } = props.params || {};
  if (!componentName) return <MissingComponent />;

  // props.components would contain component from internal FEAAS regsitered component collection (registered in app)
  // we can't access this collection here directly, as the collection from packages's dependency would be different from the one in app
  const Component = Object.keys(props.components).length
    ? Object.values(props.components).find((component) => component.name === componentName)
        ?.component
    : null;

  if (!Component) {
    console.warn(
      `Component "${componentName}" was not registered, please ensure the FEEAS.External.registerComponent call is made.`
    );
    const missingProps = {
      rendering: {
        componentName: componentName,
      },
      errorOverride: 'BYOC: This component was not registered.',
    };
    return <MissingComponent {...missingProps} />;
  }

  let componentProps: { [key: string]: unknown } = undefined;

  if (props.params?.ComponentProps) {
    try {
      componentProps = JSON.parse(props.params.ComponentProps) ?? {};
    } catch (e) {
      console.warn(
        `Parsing props for ${componentName} component from rendering params failed. Attempting to parse from data source`
      );
    }
  }
  if (!componentProps) {
    componentProps = props.fields ? getDataFromFields(props.fields) : {};
  }

  return <Component {...componentProps} />;
};
