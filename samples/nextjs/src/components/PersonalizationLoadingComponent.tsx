import { usePersonalization, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import { layoutPersonalizationService } from 'lib/layout-personalization-service-factory';

const PersonalizationLoadingComponent = (props: {
  rendering: ComponentRendering;
}): JSX.Element | null => {
  const { personalizedComponent, isLoading } = usePersonalization({
    uid: props.rendering.uid as string,
    layoutPersonalizationService,
  });

  if (isLoading) {
    return <div>Loading</div>;
  } else {
    return personalizedComponent;
  }
};

export default PersonalizationLoadingComponent;
