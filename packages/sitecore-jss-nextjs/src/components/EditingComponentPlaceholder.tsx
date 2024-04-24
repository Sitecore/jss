import React from 'react';
import {
  EDITING_COMPONENT_ID,
  EDITING_COMPONENT_PLACEHOLDER,
  RouteData,
} from '@sitecore-jss/sitecore-jss/layout';
import { Placeholder } from './Placeholder';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-react';

export const EditingComponentPlaceholder = ({
  rendering,
}: {
  rendering: RouteData;
}): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  return (
    <div id={EDITING_COMPONENT_ID}>
      <Placeholder
        name={EDITING_COMPONENT_PLACEHOLDER}
        rendering={rendering}
        sitecoreContext={sitecoreContext}
      />
    </div>
  );
};
