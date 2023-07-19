/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import * as FEAAS from '@sitecore-feaas/clientside/react';
import { ComponentFields } from '@sitecore-jss/sitecore-jss/layout';
import { getDataFromFields } from '../utils';
import { MissingComponent } from './MissingComponent';

type BYOCRenderingParams = {
  ComponentName: string;
  ComonentProps?: string;
};

export type BYOCProps = {
  params?: BYOCRenderingParams;
  fields?: ComponentFields;
};

/**
 * BYOCRenderer helps us
 * @param props
 * @returns
 */
export const BYOCRenderer = (props: BYOCProps) => {
  const { ComponentName: componentName } = props.params || {};
  if (!componentName) return <MissingComponent />;

  const Component = Object.keys(FEAAS.External.registered).length
    ? Object.values(FEAAS.External.registered).find((component) => component.name === componentName)
        ?.component
    : null;

  if (!Component) {
    const missingProps = {
      rendering: {
        componentName: componentName,
      },
      errorOverride: 'BYOC: The component you requested is not registered',
    };
    return <MissingComponent {...missingProps} />;
  }

  let componentProps: { [key: string]: unknown } = {};

  if (props.params?.ComonentProps) {
    try {
      componentProps = JSON.parse(props.params.ComonentProps) ?? {};
    } catch (e) {
      console.warn(
        `Parsing props for ${componentName} component from rendering params failed. Attempting to parse from data source`
      );
    }
  }
  if (!componentProps && props.fields) {
    componentProps = getDataFromFields(props.fields) ?? {};
  }

  return <>{Component && <Component {...componentProps} />}</>;
};
// this will be in initializer/nextjs app
export const BYOCWrapper = () => <BYOCRenderer></BYOCRenderer>;
