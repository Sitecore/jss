import React from 'react';
import * as FEAAS from '@sitecore-feaas/clientside/react';

export const FEAAS_COMPONENT_RENDERING_NAME = 'FEaaSComponent';

export type FEaaSComponentParams = {
  LibraryId?: string;
  ComponentId?: string;
  ComponentVersion?: string;
  ComponentRevision?: string;
  ComponentHostName?: string;
  ComponentInstanceId?: string;
  ComponentDataOverride?: string;
  ComponentHTMLOverride?: string;
};

export type FEaaSComponentProps = FEaaSComponentParams & {
  template: string;
  lastModified: string;
  src: string;
  data?: unknown;
};

/**
 * @param props
 */
export const FEaaSComponent = (props: FEaaSComponentProps): JSX.Element => {
  return (
    <FEAAS.Component
      src={props.src}
      template={props.template}
      last-modified={props.lastModified}
      data={props.data}
    />
  );
}

/**
 * @param src
 * @param data
 */
export async function fetchFEaaSComponentProps(
  params: FEaaSComponentParams,
  endpoint?: string,
): Promise<FEaaSComponentProps> {
  if (!endpoint) {
    endpoint = composeComponentEndpoint(params);
  };
  const { template, lastModified } = await FEAAS.fetchComponent(endpoint);
  return {
    src: endpoint,
    template,
    lastModified,
    data: params.ComponentDataOverride,
  };
}

export const composeComponentEndpoint = (params: FEaaSComponentParams) => {
  return `https://${params.ComponentHostName}/components/${params.LibraryId}/${params.ComponentId}/component/${params.ComponentVersion}/${params.ComponentRevision}`;
}
