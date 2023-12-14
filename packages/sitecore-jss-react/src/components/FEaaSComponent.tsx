import React from 'react';
import * as FEAAS from '@sitecore-feaas/clientside/react';
import { ComponentFields, LayoutServicePageState } from '@sitecore-jss/sitecore-jss/layout';
import { getDataFromFields } from '../utils';

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
   * Default revision to be fetched. Should be 'staged' for editing/preview. Can be overriden by params.ComponentRevision
   */
  revisionFallback?: RevisionType;
  /**
   * Fetched data from server component props for server rendering, based on rendering params.
   */
  fetchedData?: FEAAS.DataScopes;
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
    !props.template &&
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
  // combine fetchedData from server with datasource data (if present)
  const data = { ...props.fetchedData, _: getDataFromFields(props.fields ?? {}) };

  // FEaaS control would still be hydrated by client
  // we pass all the props as a workaround to avoid hydration error, until we convert all JSS components to server side
  // this also allows component to fall back to full client-side rendering when template or src is empty
  return (
    <FEAAS.Component
      data={data}
      template={props.template}
      cdn={props.params?.ComponentHostName}
      library={props.params?.LibraryId}
      version={props.params?.ComponentVersion}
      component={props.params?.ComponentId}
      instance={props.params?.ComponentInstanceId}
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
  let template = '';
  let fetchedData: FEAAS.DataScopes = {};
  const fetchDataOptions: FEAAS.DataOptions = params.ComponentDataOverride
    ? JSON.parse(params.ComponentDataOverride)
    : {};

  try {
    template = await fetchComponentTemplate(src, params, revisionFallback);

    fetchedData = await fetchData(fetchDataOptions);
  } catch (e) {
    console.error(e);
  }

  return {
    fetchedData,
    revisionFallback,
    template,
  };
}

/**
 * @param {string} src component endpoint
 * @param {FEaaSComponentParams} params rendering parameters for FEAAS component
 * @param {RevisionType} revisionFallback fallback revision to fetch if revision is absent in params
 */
async function fetchComponentTemplate(
  src: string,
  params: FEaaSComponentParams,
  revisionFallback: string
): Promise<string> {
  try {
    const { template } = await FEAAS.fetchComponent(src);
    return template;
  } catch (error) {
    console.error(
      `Fetch FEAAS component from ${src} failed. Ensure the component revision "${params.ComponentRevision ||
        revisionFallback}" is present`
    );
    throw error;
  }
}

/**
 * Fetches component data based on the provided data options.
 * This function asynchronously fetches data using the FEAAS.DataSettings.fetch method.
 *
 * @param {FEAAS.DataOptions} dataOptions - Options to customize data fetching.
 * @returns {Promise<FEAAS.DataScopes>} A promise that resolves with the fetched data,
 * or rejects with an error if data fetching encounters an issue.
 * @throws {Error} If an error occurs during data fetching, it is propagated as an error.
 */
async function fetchData(dataOptions: FEAAS.DataOptions): Promise<FEAAS.DataScopes> {
  try {
    const fetchedData = await FEAAS.DataSettings.fetch(dataOptions || {});
    return fetchedData;
  } catch (error) {
    console.error('Fetch FEAAS component data settings failed');
    throw error;
  }
}

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
