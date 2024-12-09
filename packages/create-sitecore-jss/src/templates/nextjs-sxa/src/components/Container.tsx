import {
  ComponentParams,
  ComponentRendering,
  Placeholder,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import React from 'react';

interface ComponentProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

const BACKGROUND_REG_EXP = /[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/gi;
const MEDIA_URL_PATTERN = /mediaurl="([^"]*)"/i;
const SITECORE_MEDIA_PREFIX = '/sitecore/shell/-/media/';

const getBackgroundStyle = (
  backgroundImage: string,
  isEditMode: boolean
): { [key: string]: string } => {
  if (!backgroundImage) return {};

  if (isEditMode) {
    const processedImage = backgroundImage
      .match(BACKGROUND_REG_EXP)
      ?.pop()
      ?.replace(/-/gi, '');
    return processedImage
      ? { backgroundImage: `url('${SITECORE_MEDIA_PREFIX}${processedImage}')` }
      : {};
  }

  const mediaUrl = backgroundImage.match(MEDIA_URL_PATTERN)?.[1] || '';
  return mediaUrl ? { backgroundImage: `url('${mediaUrl}')` } : {};
};

const DefaultContainer: React.FC<ComponentProps> = ({ params, rendering }): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const {
    Styles: containerStyles = '',
    GridParameters = '',
    DynamicPlaceholderId,
    RenderingIdentifier,
    BackgroundImage,
  } = params;

  const styles = `${GridParameters} ${containerStyles}`.trimEnd();
  const placeholderKey = `container-${DynamicPlaceholderId}`;
  const backgroundStyle = getBackgroundStyle(
    BackgroundImage as string,
    sitecoreContext.pageState === 'edit'
  );

  return (
    <div className={`component container-default ${styles}`} id={RenderingIdentifier || undefined}>
      <div className="component-content" style={backgroundStyle}>
        <div className="row">
          <Placeholder name={placeholderKey} rendering={rendering} />
        </div>
      </div>
    </div>
  );
};

export const Default: React.FC<ComponentProps> = (props): JSX.Element => {
  const { Styles = '' } = props.params;
  const hasContainerStyle = Styles.split(' ').includes('container');

  return hasContainerStyle ? (
    <div className="container-wrapper">
      <DefaultContainer {...props} />
    </div>
  ) : (
    <DefaultContainer {...props} />
  );
};
