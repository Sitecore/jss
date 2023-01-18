import React, { useEffect } from 'react';
import { ComponentParams, ComponentFields, getFieldValue } from '@sitecore-jss/sitecore-jss/layout';

export const FEAAS_COMPONENT_RENDERING_NAME = 'FEaaSComponent';

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

  let data = '';
  if (params?.ComponentDataOverride) {
    // Use override data if provided
    data = params.ComponentDataOverride;
  } else if (fields) {
    // Otherwise use datasource data (provided in fields)
    // FEaaS expects wrapping "_" as catch-all datasource template id
    data = JSON.stringify({ _: getDataFromFields(fields) });
  }

  useEffect(() => {
    // Force client-side render (until SSR supported by FEaaS Web Components)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    import('@sitecore-feaas/clientside');
  }, []);

  return (
    <>
      <feaas-stylesheet library={params.LibraryId} cdn={params.ComponentHostName} />
      <feaas-component
        library={params.LibraryId}
        component={params.ComponentId}
        version={params.ComponentVersion}
        revision={params.ComponentRevision}
        cdn={params.ComponentHostName}
        instance={params.ComponentInstanceId}
        template={params.ComponentHTMLOverride}
        data={data}
      />
    </>
  );
};
