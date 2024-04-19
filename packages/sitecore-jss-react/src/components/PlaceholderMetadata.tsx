import React from 'react';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss/layout';

/**
 *  Props containing the component data to render.
 */
export interface PlaceholderMetadataProps {
  component: ComponentRendering;
}

/**
 * This component supports the chrome's hydration process in Pages by rendering the required metadata.
 * This component handles recursive rendering of components and their placeholders, encapsulating
 * each part within specific code tags to outline their structure and metadata attributes.
 *
 * @param {PlaceholderMetadataProps} props - The props containing the component data to render.
 * @returns {JSX.Element} - The rendered component with all nested components and placeholders.
 */
export const PlaceholderMetadata = ({ component }: PlaceholderMetadataProps): JSX.Element => {
  const codeAttributes = (chromeType: string, kind: string) => {
    return {
      type: 'text/sitecore',
      chrometype: `${chromeType}`,
      className: 'scpm',
      kind: `${kind}`,
    };
  };

  const renderComponent = (component: ComponentRendering): JSX.Element => {
    const ComponentName = component.componentName as React.ElementType;
    return (
      <>
        <code {...codeAttributes('rendering', 'open')}>{`{uid: "${component.uid}"}`}</code>
        <ComponentName />
        <code {...codeAttributes('rendering', 'close')}></code>
      </>
    );
  };

  const renderNestedComponents = (components: ComponentRendering[]): JSX.Element[] => {
    return components.flatMap((component) => {
      const rendered = [renderComponent(component)];
      if (
        'placeholders' in component &&
        component.placeholders &&
        Object.keys(component.placeholders).length > 0
      ) {
        // Additionally render any nested components inside the placeholders
        const nested = renderComponentsInPlaceholder(
          component.placeholders as { [key: string]: ComponentRendering[] },
          component.uid
        );
        return [...rendered, ...nested];
      }
      return rendered;
    });
  };

  const renderComponentsInPlaceholder = (
    placeholders: { [key: string]: ComponentRendering[] },
    parentUid: string
  ): JSX.Element[] => {
    return Object.entries(placeholders).flatMap(([key, nestedComponents]) => [
      <React.Fragment key={`${parentUid}-${key}`}>
        <code
          {...codeAttributes('placeholder', 'open')}
        >{`{placeholderName: "${key}", parentRendering: "${parentUid}"}`}</code>
        {renderNestedComponents(nestedComponents)}
        <code {...codeAttributes('placeholder', 'close')} />
      </React.Fragment>,
    ]);
  };

  // check if the component has nested placeholders
  return (
    <>
      {component.placeholders && Object.keys(component.placeholders).length > 0
        ? renderComponentsInPlaceholder(
            component.placeholders as { [key: string]: ComponentRendering[] },
            component.uid
          )
        : renderComponent(component)}
    </>
  );
};
