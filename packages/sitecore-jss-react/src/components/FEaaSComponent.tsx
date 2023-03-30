import React from 'react';
import * as FEAAS from '@sitecore-feaas/clientside/react';

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

export type FEaaSComponentProps = {
  template: string;
  lastModified: string;
  src?: string;
  params?: FEaaSComponentParams;
  data?: unknown;
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
  // FEaaS control would still be hydrated by client
  // we pass all the props as a workaround to avoid hydration error, until we convert all JSS components to server side
  // this also allows component to fall back to full client-side rendering when template or src is empty
  return (
    <FEAAS.Component
      template={props.template}
      last-modified={props.lastModified}
      src={props.src}
      data={props.params?.ComponentDataOverride || props.data}
      cdn={props.params?.ComponentHostName}
      library={props.params?.LibraryId}
      component={props.params?.ComponentId}
      revision={props.params?.ComponentRevision}
    />
  );
};

/**
 * Fetches component details based on rendering params.
 * Component endpoint will either be
 * @param {FEaaSComponentParams} params component params
 * @param {string} endpointOverride optional override for component endpoint
 */
export async function fetchFEaaSComponentProps(
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

export const composeComponentEndpoint = (params: FEaaSComponentParams) => {
  const hostname = params.ComponentHostName.startsWith('https://')
    ? params.ComponentHostName
    : `https://${params.ComponentHostName}`;
  return `${hostname}/components/${params.LibraryId}/${params.ComponentId}/${params.ComponentVersion}/${params.ComponentRevision}`;
};
