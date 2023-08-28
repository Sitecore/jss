import React, { useState } from 'react';
import { ComponentFields } from '@sitecore-jss/sitecore-jss/layout';
import { getDataFromFields } from '../utils';
import { MissingComponent, MissingComponentProps } from './MissingComponent';
import * as FEAAS from '@sitecore-feaas/clientside/react';

/**
 * Data from rendering params on Sitecore's BYOC rendering
 */
export type BYOCRenderingParams = {
  /**
   * Name of the component to render
   */
  ComponentName: string;
  /**
   * JSON props to pass into rendered component
   */
  ComponentProps?: string;
  /**
   * A string with classes that can be used to apply themes, via SXA functionality
   */
  styles?: string;
  RenderingIdentifier?: string;
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
export type BYOCRendererProps = BYOCProps & {
  /**
   * Error component override. To be shown when Renderer or underlying component throws
   */
  errorComponent?: React.ComponentClass<ErrorComponentProps> | React.FC<ErrorComponentProps>;
  /**
   * Override to indicate missing component situations. Would be shown when BYOC component is not registered
   * or ComponentName is missing
   */
  missingComponentComponent?:
    | React.ComponentClass<MissingComponentProps>
    | React.FC<MissingComponentProps>;
};

type ErrorComponentProps = {
  [prop: string]: unknown;
  error?: Error;
};

const DefaultErrorComponent = (props: ErrorComponentProps) => (
  <div>A rendering error occurred: {props.error?.message}.</div>
);

/**
 * BYOCRenderer helps rendering BYOC components - that can be taken from anywhere
 * and registered without being deployed as Sitecore renderings
 * @param {ByocRendererProps} props component props
 * @returns dynamicly rendered component or Missing Component error frame
 */
export const BYOCComponent = (props: BYOCRendererProps): JSX.Element => {
  const [error, setError] = useState<Error | undefined>(undefined);
  const { ComponentName: componentName } = props.params || {};
  const { missingComponentComponent } = props;

  const noNameProps = {
    errorOverride: 'BYOC: The ComponentName for this rendering is missing',
  };

  const unRegisteredComponentProps = {
    rendering: {
      componentName: componentName,
    },
    errorOverride: 'BYOC: This component was not registered.',
  };

  const missingProps = !componentName ? noNameProps : unRegisteredComponentProps;

  const missingComponent = missingComponentComponent ? (
    <props.missingComponentComponent {...missingProps} />
  ) : (
    <MissingComponent {...missingProps} />
  );

  if (error) {
    const ErrorComponent = props.errorComponent || DefaultErrorComponent;
    return <ErrorComponent error={error} />;
  }

  let componentProps: { [key: string]: unknown } = {};

  if (props.params?.ComponentProps) {
    try {
      componentProps = JSON.parse(props.params.ComponentProps) || {};
    } catch (e) {
      console.warn(`Parsing props for ${componentName} component failed. Error: ${e}`);
      setError(e as Error);
      const ErrorComponent = props.errorComponent || DefaultErrorComponent;
      return <ErrorComponent error={e as Error} />;
    }
  }

  if (!componentProps) {
    componentProps = props.fields ? getDataFromFields(props.fields) : {};
  }

  return (
    <FEAAS.ExternalComponent
      componentName={componentName}
      fallback={missingComponent}
      {...componentProps}
    />
  );
};
