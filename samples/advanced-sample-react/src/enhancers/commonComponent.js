import { withExperienceEditorChromes } from '@sitecore-jss/sitecore-jss-react';
import extendStyles from './extendStyles';

const commonComponent = (WrappedComponent) =>
  withExperienceEditorChromes(extendStyles(WrappedComponent, WrappedComponent.styles));

export default commonComponent;
