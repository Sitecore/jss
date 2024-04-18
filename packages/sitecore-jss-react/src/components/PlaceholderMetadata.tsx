import React from 'react';
import { ComponentRendering } from '@sitecore-jss/sitecore-jss/layout';

export interface PlaceholderMetadataProps {
  component: ComponentRendering;
}

export const PlaceholderMetadata: React.FC<PlaceholderMetadataProps> = ({ component }) => {
  const defaultAttributes = {
    type: 'text/sitecore',
    chrometype: 'field',
    className: 'scpm',
  };

  const codeOpenAttributes = { ...defaultAttributes, kind: 'open' };
  const codeCloseAttributes = { ...defaultAttributes, kind: 'close' };

  const renderComponent = (component: ComponentRendering): JSX.Element => {
    const ComponentName = component.componentName as React.ElementType;
    return (
      <>
        <code {...codeOpenAttributes}>{`{uid: "${component.uid}"}`}</code>
        <ComponentName />
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
    return Object.entries(placeholders).flatMap(([key, nestedComponents]) => [
      <React.Fragment key={`${parentUid}-${key}`}>
        <code
          {...codeOpenAttributes}
        >{`{placeholderName: "${key}", parentRendering: "${parentUid}"}`}</code>
        {renderNestedComponents(nestedComponents)}
        <code {...codeCloseAttributes} />
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
