import React from 'react';
import * as FEAAS from '@sitecore-feaas/clientside/react';
import {
  ComponentFields,
  LayoutServicePageState,
  getFieldValue,
} from '@sitecore-jss/sitecore-jss/layout';

export const FEAAS_COMPONENT_RENDERING_NAME = 'FEaaSComponent';

/**
 * Params from a Sitecore FEaaS rendering
 */
export type FEaaSComponentParams = {
  LibraryId?: string;
  ComponentId?: string;
  ComponentVersion?: string;
  ComponentRevision?: RevisionType;
  ComponentHostName?: string;
  ComponentInstanceId?: string;
  ComponentDataOverride?: string;
  ComponentHTMLOverride?: string;
  styles?: string;
  RenderingIdentifier?: string;
};

type RevisionType = number | 'staged' | 'published' | 'saved';

/**
 * FEaaS props for server rendering.
 */
type FEaaSComponentServerProps = {
  /**
   * HTML template for presentation rendered inside the component
   */
  template?: string;
  /**
   * the date component data was last modified
   */
  lastModified?: string;
  /**
   * Default revision to be fetched. Should be 'staged' for editing/preview. Can be overriden by params.ComponentRevision
   */
  revisionFallback?: RevisionType;
};

/**
 * FEaaS props for client side component. Should be used as fallback when server props are not provided.
 * Would also be passed on server to avoid hydration issues
 */
type FEaaSComponentClientProps = {
  /**
   * parameters from Sitecore's FEAAS component
   */
  params?: FEaaSComponentParams;
  /**
   * field data from component's datasource
   */
  fields?: ComponentFields;
};

export type FEaaSComponentProps = FEaaSComponentServerProps & FEaaSComponentClientProps;

/**
 * @param {FEaaSComponentProps} props component props
 */
export const FEaaSComponent = (props: FEaaSComponentProps): JSX.Element => {
  const computedRevision = props.params?.ComponentRevision || props.revisionFallback;
  if (
    (!props.lastModified || !props.template) &&
    (!props.params ||
      !props.params.LibraryId ||
      !props.params.ComponentId ||
      !props.params.ComponentVersion ||
      !props.params.ComponentHostName ||
      !computedRevision)
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
      template={props.template || ''}
      last-modified={props.lastModified}
      cdn={props.params?.ComponentHostName}
      library={props.params?.LibraryId}
      version={props.params?.ComponentVersion}
      component={props.params?.ComponentId}
      revision={computedRevision}
    />
  );
};

/**
 * Fetches server component props required for server rendering, based on rendering params.
 * Component endpoint will either be retrieved from params or from endpointOverride
 * @param {FEaaSComponentParams} params component params
 * @param {LayoutServicePageState} [pageState] page state to determine which component variant to use
 * @param {string} [endpointOverride] optional override for component endpoint
 */
export async function fetchFEaaSComponentServerProps(
  params: FEaaSComponentParams,
  pageState?: LayoutServicePageState,
  endpointOverride?: string
): Promise<FEaaSComponentProps> {
  const revisionFallback =
    pageState && pageState !== LayoutServicePageState.Normal ? 'staged' : 'published';
  const src = endpointOverride || composeComponentEndpoint(params, revisionFallback);
  try {
    const { template, lastModified } = await FEAAS.fetchComponent(src);
    return {
      revisionFallback,
      template,
      lastModified,
    };
  } catch (e) {
    console.error(
      `Fetch FEAAS component from ${src} failed. Ensure the component revision "${params.ComponentRevision ||
        revisionFallback}" is present`
    );
    console.error(e);
    // leave revision fallback in so we can re-try with client-side rendering
    return {
      revisionFallback,
    };
  }
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
 * @param {FEaaSComponentParams} params rendering parameters for FEAAS component
 * @param {RevisionType} revisionFallback fallback revision to fetch if revision is absent in params
 * @returns component endpoint URL
 */
export const composeComponentEndpoint = (
  params: FEaaSComponentParams,
  revisionFallback: RevisionType
) => {
  const revision = params.ComponentRevision || revisionFallback;
  const hostname = params.ComponentHostName.startsWith('https://')
    ? params.ComponentHostName
    : `https://${params.ComponentHostName}`;
  return `${hostname}/components/${params.LibraryId}/${params.ComponentId}/${params.ComponentVersion}/${revision}`;
};
