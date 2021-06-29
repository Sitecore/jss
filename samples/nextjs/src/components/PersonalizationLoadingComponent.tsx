import {
  isServer,
  usePersonalization,
  withComponentFactory,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { useI18n } from 'next-localization';
import { StyleguideComponentProps } from 'lib/component-props';

const PersonalizationLoadingComponent = (props: StyleguideComponentProps): JSX.Element | null => {
  const { t } = useI18n();
  const { personalizedComponent, isLoading } = usePersonalization({
    uid: props.rendering.uid as string,
    componentFactory: props.componentFactory,
  });

  return isServer() || isLoading ? <div>{t('Loading')}</div> : personalizedComponent;
};

export default withComponentFactory(PersonalizationLoadingComponent);
