import { usePersonalization, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import { layoutPersonalizationService } from 'lib/layout-personalization-service-factory';
import { useI18n } from 'next-localization';

const PersonalizationLoadingComponent = (props: {
  rendering: ComponentRendering;
}): JSX.Element | null => {
  const { t } = useI18n();
  const { personalizedComponent, isLoading } = usePersonalization({
    uid: props.rendering.uid as string,
    layoutPersonalizationService,
  });

  return isLoading ? <div>{t('Loading')}</div> : personalizedComponent;
};

export default PersonalizationLoadingComponent;
