import { withExperienceEditorChromes } from '@sitecore-jss/sitecore-jss-react';
import extendStyles from './extendStyles';

const commonComponent = WrappedComponent => {
  const ExperienceEditorComponent = withExperienceEditorChromes(
    extendStyles(WrappedComponent, WrappedComponent.styles)
  );

  ExperienceEditorComponent.displayName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';

  return ExperienceEditorComponent;
};

export default commonComponent;
