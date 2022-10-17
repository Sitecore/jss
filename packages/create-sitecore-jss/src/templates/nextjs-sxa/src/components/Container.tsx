import React from 'react';
import {
  ComponentParams,
  ComponentRendering,
  Placeholder,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';

const BACKGROUND_REG_EXP = new RegExp(
  /[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/gi
);

interface ComponentProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

export const Default = (props: ComponentProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const containerStyles = props.params && props.params.Styles ? props.params.Styles : '';
  const styles = `${props.params.GridParameters} ${containerStyles}`.trimEnd();
  const phKey = `container-${props.params.DynamicPlaceholderId}`;
  const id = props.params.RenderingIdentifier;
  let backgroundImage = props.params.BackgroundImage as string;
  let backgroundStyle: { [key: string]: string } = {};

  if (backgroundImage) {
    const prefix = `${sitecoreContext.pageState !== 'normal' ? '/sitecore/shell' : ''}/-/media/`;
    backgroundImage = `${backgroundImage?.match(BACKGROUND_REG_EXP)?.pop()?.replace(/-/gi, '')}`;

    // TODO: here uses ${config.sitecoreApiHost} it's temporary solutions - it will be removed when be fix bug - UNABLE_TO_VERIFY_LEAF_SIGNATUE
    // TODO: this fix https://doc.sitecore.com/xp/en/developers/hd/200/sitecore-headless-development/walkthrough--configuring-sitecore-ca-certificates-for-node-js.html doesn't help
    backgroundStyle = {
      backgroundImage: `url('${config.sitecoreApiHost}${prefix}${backgroundImage}')`,
    };
  }

  return (
    <div className="container-wrapper" id={id ? id : undefined}>
      <div className={`component container ${styles}`}>
        <div className="component-content" style={backgroundStyle}>
          <div className="row">
            <Placeholder name={phKey} rendering={props.rendering} />
          </div>
        </div>
      </div>
    </div>
  );
};
