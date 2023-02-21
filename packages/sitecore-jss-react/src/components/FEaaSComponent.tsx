/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { ComponentParams, ComponentFields, getFieldValue } from '@sitecore-jss/sitecore-jss/layout';
// eslint-disable-next-line
import type * as _FEAAS from '@sitecore-feaas/clientside';

export const FEAAS_COMPONENT_RENDERING_NAME = 'FEaaSComponent';
export const FEAAS_MODULE_SRC = 'https://feaasstatic.blob.core.windows.net/packages/clientside/latest/browser/index.esm.js';

export type FEaaSComponentParams = ComponentParams & {
  LibraryId?: string;
  ComponentId?: string;
  ComponentVersion?: string;
  ComponentRevision?: string;
  ComponentHostName?: string;
  ComponentInstanceId?: string;
  ComponentDataOverride?: string;
  ComponentHTMLOverride?: string;
};

export type FEaaSComponentProps = {
  params?: FEaaSComponentParams;
  fields?: ComponentFields;
};

const getDataFromFields = (fields: ComponentFields): { [key: string]: unknown } => {
  let data: { [key: string]: unknown } = {};
  data = Object.entries(fields).reduce((acc, [key]) => {
    acc[key] = getFieldValue(fields, key);
    return acc;
  }, data);
  return data;
};

export const FEaaSComponent = ({ params, fields }: FEaaSComponentProps): JSX.Element => {
  if (
    !params ||
    !params.LibraryId ||
    !params.ComponentId ||
    !params.ComponentVersion ||
    !params.ComponentRevision ||
    !params.ComponentHostName
  ) {
    // Missing FEaaS component required props
    return null;
  }

  // Load script asynchronously on the page once, only if FEAAS component is used
  useEffect(() => {
    window.FEAASLoading ??= new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = FEAAS_MODULE_SRC;
      script.type = 'module';
      script.onload = resolve;
      document.head.appendChild(script);
    });
  }, []);

  let data = '';
  if (params?.ComponentDataOverride) {
    // Use override data if provided
    data = params.ComponentDataOverride;
  } else if (fields) {
    // Otherwise use datasource data (provided in fields)
    // FEaaS expects wrapping "_" as catch-all datasource template id
    data = JSON.stringify({ _: getDataFromFields(fields) });
  }

  const reqProps = {
    library: params.LibraryId,
    cdn: params.ComponentHostName,
    component: params.ComponentId,
    version: params.ComponentVersion,
    revision: params.ComponentRevision,
    data,
  };
  const optProps: { [key: string]: unknown } = {};
  if (params.ComponentInstanceId) {
    optProps.instance = params.ComponentInstanceId;
  }
  if (params.ComponentHTMLOverride) {
    optProps.dangerouslySetInnerHTML = { __html: params.ComponentHTMLOverride };
  }

  return (
    <>
      <link rel="preload" as="style" href={`${reqProps.cdn}/styles/${reqProps.library}/published.css`} />
      <link rel="preload" as="fetch" href={`${reqProps.cdn}/components/${reqProps.library}/${reqProps.component}/${reqProps.version}/${reqProps.revision}.html`} />
      <link rel="preload" as="script" href={FEAAS_MODULE_SRC} />
      <feaas-stylesheet library={reqProps.library} cdn={reqProps.cdn} />
      <feaas-component {...reqProps} {...optProps} />
    </>
  );
};
