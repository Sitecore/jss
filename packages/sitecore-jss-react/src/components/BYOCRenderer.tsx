import React from 'react';
import { ComponentFields } from '@sitecore-jss/sitecore-jss/layout';
import { getDataFromFields } from '../utils';
import { MissingComponent, MissingComponentProps } from './MissingComponent';
import { RegisteredComponents } from '@sitecore-feaas/clientside/types/ui/FEAASExternal';

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
   * Registered component collection. Would be taken from FEAAS.External.registered
   */
  components: RegisteredComponents;
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
export class BYOCRenderer extends React.Component<BYOCRendererProps> {
  state: Readonly<{ error?: Error }>;

  constructor(props: BYOCRendererProps) {
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
    const props: BYOCRendererProps = this.props;
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
    // props.components would contain component from internal FEAAS regsitered component collection (registered in app)
    // we can't access this collection here directly, as the collection from packages's dependency would be different from the one in app
    const Component = props.components[componentName]?.component;

    if (!Component) {
      console.warn(
        `Component "${componentName}" was not registered, please ensure the FEEAS.External.registerComponent call is made.`
      );
      const missingProps = {
        rendering: {
          componentName: componentName,
        },
        errorOverride: 'BYOC: This component was not registered.',
      };
      return props.missingComponentComponent ? (
        <this.props.missingComponentComponent {...missingProps} />
      ) : (
        <MissingComponent {...missingProps} />
      );
    }

    let componentProps: { [key: string]: unknown } = undefined;

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
    if (!componentProps) {
      componentProps = props.fields ? getDataFromFields(props.fields) : {};
    }
    return <Component {...componentProps} />;
  }
}
