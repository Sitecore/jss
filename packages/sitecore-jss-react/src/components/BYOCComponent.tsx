import React from 'react';
import { ComponentFields } from '@sitecore-jss/sitecore-jss/layout';
import { getDataFromFields } from '../utils';
import { MissingComponent, MissingComponentProps } from './MissingComponent';
import * as FEAAS from '@sitecore-feaas/clientside/react';

export const BYOC_COMPONENT_RENDERING_NAME = 'BYOCComponent';

/**
 * FEaaS props for server rendering.
 */
type BYOCServerProps = {
  /**
   * Fetched data from server component props for server rendering, based on rendering params.
   */
  fetchedData?: FEAAS.DataScopes;
};

/**
 * Data from rendering params on Sitecore's BYOC rendering
 */
export type BYOCComponentParams = BYOCServerProps & {
  /**
   * Name of the component to render
   */
  ComponentName?: string;
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
 * Props for BYOCComponent. Includes components list to load external components from.
 */
export type BYOCComponentProps = {
  /**
   * rendering params
   */
  params?: BYOCComponentParams;
  /**
   * fields from datasource items to be passed as rendered child component props
   */
  fields?: ComponentFields;
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
 * BYOCComponent facilitate the rendering of external components. It manages potential errors,
 * missing components, and customization of error messages or alternative rendering components.
 * @param {ByocComponentProps} props component props
 * @returns dynamicly rendered component or Missing Component error frame
 */
export class BYOCComponent extends React.Component<BYOCComponentProps> {
  state: Readonly<{ error?: Error }>;

  constructor(props: BYOCComponentProps) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { error: error };
  }

  componentDidCatch(error: Error) {
    this.setState({ error });
  }

  render() {
    const props: BYOCComponentProps = this.props;
    if (this.state.error) {
      return this.props.errorComponent ? (
        <this.props.errorComponent error={this.state.error} />
      ) : (
        <DefaultErrorComponent error={this.state.error} />
      );
    }
    const { ComponentName: componentName } = props.params || {};

    if (!componentName) {
      const noNameProps = {
        errorOverride: 'BYOC: The ComponentName for this rendering is missing',
      };
      return props.missingComponentComponent ? (
        <this.props.missingComponentComponent {...noNameProps} />
      ) : (
        <MissingComponent {...noNameProps} />
      );
    }

    const unRegisteredComponentProps = {
      rendering: {
        componentName: componentName,
      },
      errorOverride: 'BYOC: This component was not registered.',
    };

    const fallbackComponent = this.props.missingComponentComponent ? (
      <this.props.missingComponentComponent {...unRegisteredComponentProps} />
    ) : (
      <MissingComponent {...unRegisteredComponentProps} />
    );

    let componentProps: { [key: string]: unknown } = undefined;

    if (props.params.fetchedData === null) {
      if (props.params?.ComponentProps) {
        try {
          componentProps = JSON.parse(props.params.ComponentProps) ?? {};
        } catch (e) {
          console.warn(
            `Parsing props for ${componentName} component from rendering params failed. Error: ${e}`
          );
          return this.props.errorComponent ? (
            <this.props.errorComponent error={e as Error} />
          ) : (
            <DefaultErrorComponent error={e as Error} />
          );
        }
      }
    }
    if (!componentProps && props.params.fetchedData === null) {
      componentProps = props.fields ? getDataFromFields(props.fields) : {};
    }

    const data = props.params.fetchedData || componentProps || {};

    return (
      <FEAAS.ExternalComponent
        componentName={componentName}
        fallback={fallbackComponent}
        {...data}
      />
    );
  }
}

/**
 * @param {BYOCComponentParams} params rendering parameters for BYOC component
 */
export async function fetchBYOCComponentServerProps(
  params: BYOCComponentParams
): Promise<BYOCComponentParams> {
  let fetchedData: FEAAS.DataScopes = null;
  const fetchDataOptions: FEAAS.DataOptions = params.ComponentProps
    ? JSON.parse(params.ComponentProps)
    : {};

  try {
    fetchedData = await fetchData(fetchDataOptions);
  } catch (e) {
    console.error(e);
  }

  return {
    fetchedData,
  };
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
    console.error('Fetch BYOC component props failed');
    throw error;
  }
}
