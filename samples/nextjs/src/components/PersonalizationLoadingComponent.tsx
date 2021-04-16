import { ComponentRendering } from '@sitecore-jss/sitecore-jss';
import { usePersonalization } from '@sitecore-jss/sitecore-jss-nextjs';
import { personalizationService } from 'src/Layout';

const PersonalizationLoadingComponent = (props: { rendering: ComponentRendering; }) => {
  const { personalizedComponent, isLoading } = usePersonalization({ uid: props.rendering.uid as string, personalizationService });

  if (isLoading) {
    return <div>Loading</div>;
  } else {
    return personalizedComponent;
  }
};

export default PersonalizationLoadingComponent;
