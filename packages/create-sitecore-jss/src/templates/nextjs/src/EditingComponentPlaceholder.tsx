import {
  RouteData,
  EDITING_COMPONENT_PLACEHOLDER,
  EDITING_COMPONENT_ID,
  Placeholder,
} from '@sitecore-jss/sitecore-jss-nextjs';

const EditingComponentPlaceholder = ({ rendering }: { rendering: RouteData }): JSX.Element => (
  <div id={EDITING_COMPONENT_ID}>
    <Placeholder name={EDITING_COMPONENT_PLACEHOLDER} rendering={rendering} />
  </div>
);

export default EditingComponentPlaceholder;
