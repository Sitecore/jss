import React from 'react';
import { ComponentRendering, RouteData, HtmlElementRendering } from '@sitecore-jss/sitecore-jss';
import { PlaceholderProps, PlaceholderCommon } from '../components/PlaceholderCommon';
import { withComponentFactory } from './withComponentFactory';

export interface WithPlaceholderOptions {
  /**
   * Function to map incoming placeholder props into rendering data to use for the placeholder data.
   * Normally in a JSS component, props.rendering is passed the component data, and that is the default.
   * However, if your component data is in a different prop, like say 'route' in a sample app,
   * this lets you map that.
   */
  resolvePlaceholderDataFromProps?: (props: any) => ComponentRendering | RouteData;
  /**
   * Function to alter the placeholder props from within the HOC. Enables the props to be
   * transformed before being used by the placeholder/HOC, for example to customize the
   * error or missing component display
   */
  propsTransformer?: (props: PlaceholderProps) => PlaceholderProps;
}

export interface PlaceholderToPropMapping {
  /**
   * The name of the placeholder this component will expose
   */
  placeholder: string;
  /**
   * The name of the prop on your wrapped component that you would like the placeholder data injected on
   */
  prop: string;
}

export type WithPlaceholderSpec = (string | PlaceholderToPropMapping) | (string | PlaceholderToPropMapping)[];

export function withPlaceholder(placeholders: WithPlaceholderSpec, options?: WithPlaceholderOptions) {
  return (WrappedComponent: React.ComponentClass<any> | React.SFC<any>) => {
    class WithPlaceholder extends PlaceholderCommon<PlaceholderProps> {
      static propTypes = PlaceholderCommon.propTypes;

      constructor(props: any) {
        super(props);
      }

      render() {
        let childProps: any = { ...this.props };

        delete childProps.componentFactory;

        if (options && options.propsTransformer) {
          childProps = options.propsTransformer(childProps);
        }

        if (this.state.error) {
          if (childProps.errorComponent) {
            return <childProps.errorComponent error={this.state.error} />;
          }

          return (
            <div className="sc-jss-placeholder-error">
              A rendering error occurred: {this.state.error.message}.
          </div>
          );
        }

        const renderingData = options && options.resolvePlaceholderDataFromProps
          ? options.resolvePlaceholderDataFromProps(childProps)
          : childProps.rendering;

        const definitelyArrayPlacholders = !Array.isArray(placeholders)
          ? [ placeholders ] : placeholders;

        definitelyArrayPlacholders.forEach((placeholder: any) => {
          let placeholderData: (ComponentRendering | HtmlElementRendering)[];

          if (placeholder.placeholder && placeholder.prop) {
            placeholderData = PlaceholderCommon.getPlaceholderDataFromRenderingData(renderingData, placeholder.placeholder);
            if (placeholderData) {
              childProps[placeholder.prop] = this.getComponentsForRenderingData(placeholderData);
            }
          } else {
            placeholderData = PlaceholderCommon.getPlaceholderDataFromRenderingData(renderingData, placeholder);
            if (placeholderData) {
              childProps[placeholder] = this.getComponentsForRenderingData(placeholderData);
            }
          }
        });

        return <WrappedComponent {...childProps} />;
      }
    }

    return withComponentFactory(WithPlaceholder);
  };
}