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
    const Tag = component.componentName as React.ElementType;
    return (
      <>
        <code {...codeOpenAttributes}>{`{uid: "${component.uid}"}`}</code>
        <Tag />
        <code {...codeCloseAttributes}></code>
      </>
    );
  };

  const renderNestedComponents = (components: ComponentRendering[]): JSX.Element => {
    return (
      <>
        {components.map((nestedComponent) => {
          if (
            'placeholders' in nestedComponent &&
            nestedComponent.placeholders &&
            Object.keys(nestedComponent.placeholders).length > 0
          ) {
            return renderComponentsInPlaceholder(
              nestedComponent.placeholders as { [key: string]: ComponentRendering[] },
              nestedComponent.uid
            );
          }
          return renderComponent(nestedComponent);
        })}
      </>
    );
  };

  const renderComponentsInPlaceholder = (
    placeholders: { [key: string]: ComponentRendering[] },
    parentUid: string
  ): JSX.Element => {
    return (
      <>
        {Object.entries(placeholders).map(([key, nestedComponents]) => (
          <>
            <code
              {...codeOpenAttributes}
            >{`{placeholderName: "${key}", parentRendering: "${parentUid}"}`}</code>
            {renderNestedComponents(nestedComponents)}
            <code {...codeCloseAttributes} />
          </>
        ))}
      </>
    );
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
