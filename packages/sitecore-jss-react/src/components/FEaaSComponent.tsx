import React from 'react';
import * as FEAAS from '@sitecore-feaas/clientside/react';
import { ComponentFields, getFieldValue } from '@sitecore-jss/sitecore-jss/layout';

export const FEAAS_COMPONENT_RENDERING_NAME = 'FEaaSComponent';

export type FEaaSComponentParams = {
  LibraryId?: string;
  ComponentId?: string;
  ComponentVersion?: string;
  ComponentRevision?: number | 'staged' | 'published' | 'saved';
  ComponentHostName?: string;
  ComponentInstanceId?: string;
  ComponentDataOverride?: string;
  ComponentHTMLOverride?: string;
  styles?: string;
  RenderingIdentifier?: string;
};

/**
 * Props for FEaaS Component
 * @param {string} template HTML template for presentation rendered inside the component
 * @param {string} lastModified the date component data was last modified
 * @param {string} src component endpoint URL
 * @param {FEaaSComponentParams} params parameters from Sitecore's FEAAS component
 * @param {ComponentFields} fields field data from component's datasource 
 */
export type FEaaSComponentProps = {
  template: string;
  lastModified: string;
  src?: string;
  params?: FEaaSComponentParams;
  fields?: ComponentFields;
};

/**
 * @param {FEaaSComponentProps} props component props
 */
export const FEaaSComponent = (props: FEaaSComponentProps): JSX.Element => {
  if (
    (!props.lastModified || !props.template) &&
    !props.src &&
    (!props.params ||
      !props.params.LibraryId ||
      !props.params.ComponentId ||
      !props.params.ComponentVersion ||
      !props.params.ComponentRevision ||
      !props.params.ComponentHostName)
  ) {
    // Missing FEaaS component required props
    return null;
  }

  let data: string = null;
  if (props.params?.ComponentDataOverride) {
    // Use override data if provided
    data = props.params.ComponentDataOverride;
  } else if (props.fields) {
    // Otherwise use datasource data (provided in fields)
    // FEaaS expects wrapping "_" as catch-all datasource template id
    data = JSON.stringify({ _: getDataFromFields(props.fields) });
  }

  // FEaaS control would still be hydrated by client
  // we pass all the props as a workaround to avoid hydration error, until we convert all JSS components to server side
  // this also allows component to fall back to full client-side rendering when template or src is empty
  return (
    <FEAAS.Component
      data={data}
      template={props.template}
      last-modified={props.lastModified}
      src={props.src}
      cdn={props.params?.ComponentHostName}
      library={props.params?.LibraryId}
      component={props.params?.ComponentId}
      revision={props.params?.ComponentRevision}
    />
  );
};

/**
 * Fetches server component props required for server rendering, based on rendering params.
 * Component endpoint will either be retrieved from params or from endpointOverride
 * @param {FEaaSComponentParams} params component params
 * @param {string} [endpointOverride] optional override for component endpoint
 */
export async function fetchFEaaSComponentServerProps(
  params: FEaaSComponentParams,
  endpointOverride?: string
): Promise<FEaaSComponentProps> {
  const src = endpointOverride || composeComponentEndpoint(params);
  const { template, lastModified } = await FEAAS.fetchComponent(src);
  return {
    src,
    template,
    lastModified,
  };
}

const getDataFromFields = (fields: ComponentFields): { [key: string]: unknown } => {
  let data: { [key: string]: unknown } = {};
  data = Object.entries(fields).reduce((acc, [key]) => {
    acc[key] = getFieldValue(fields, key);
    return acc;
  }, data);
  return data;
};

/**
 * Build component endpoint URL from component's params
 * @param params rendering parameters for FEAAS component
 * @returns component endpoint URL
 */
export const composeComponentEndpoint = (params: FEaaSComponentParams) => {
  const hostname = params.ComponentHostName.startsWith('https://')
    ? params.ComponentHostName
    : `https://${params.ComponentHostName}`;
  return `${hostname}/components/${params.LibraryId}/${params.ComponentId}/${params.ComponentVersion}/${params.ComponentRevision}`;
};
