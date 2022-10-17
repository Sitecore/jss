import React from 'react';
import {
  EDITING_COMPONENT_ID,
  EDITING_COMPONENT_PLACEHOLDER,
  RouteData,
} from '@sitecore-jss/sitecore-jss/layout';
import { Placeholder } from './Placeholder';

export const EditingComponentPlaceholder = ({
  rendering,
}: {
  rendering: RouteData;
}): JSX.Element => (
  <div id={EDITING_COMPONENT_ID}>
    <Placeholder name={EDITING_COMPONENT_PLACEHOLDER} rendering={rendering} />
  </div>
);
