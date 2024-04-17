import React from 'react';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss/layout';

export interface PlaceholderWithMetadataProps {
  component: ComponentRendering;
}

export const PlaceholderWithMetadata: React.FC<PlaceholderWithMetadataProps> = ({ component }) => {
  const defaultAttributes = {
    type: 'text/sitecore',
    chrometype: 'field',
    className: 'scpm',
  };

  const codeOpenAttributes = { ...defaultAttributes, kind: 'open' };
  const codeCloseAttributes = { ...defaultAttributes, kind: 'close' };

  const renderComponent = (component: ComponentRendering): JSX.Element => {
    const Tag = component.componentName;
    return (
      <>
        <code {...codeOpenAttributes}>{`{uid: "${component.uid}"}`}</code>
        <Tag />
        <code {...codeCloseAttributes}></code>
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
    return Object.entries(placeholders).map(([key, nestedComponents]) => (
      <>
        <code
          {...codeOpenAttributes}
        >{`{placeholderName: "${key}", parentRendering: "${parentUid}"}`}</code>
        {renderNestedComponents(nestedComponents)}
        <code {...codeCloseAttributes}></code>
      </>
    ));
  };

  // check if the component has nested placeholders
  if (component.placeholders && Object.keys(component.placeholders).length > 0) {
    return renderComponentsInPlaceholder(
      component.placeholders as { [key: string]: ComponentRendering[] },
      component.uid
    );
  } else {
    return renderComponent(component);
  }
};
