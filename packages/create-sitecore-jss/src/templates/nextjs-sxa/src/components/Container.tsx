import React from 'react';
import {
  ComponentParams,
  ComponentRendering,
  Placeholder,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';

const BACKGROUND_REG_EXP = new RegExp(
  /[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/gi
);

interface ComponentProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

const Container = (props: ComponentProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const styles = `${props.params.GridParameters} ${props.params.Styles}`;
  const phKey = `container-${props.params.DynamicPlaceholderId}`;
  const backgroundImage = props.params.BackgroundImage as string;
  let backgroundStyle: { [key: string]: string };

  if (backgroundImage) {
    const prefix = `${sitecoreContext.pageState !== 'normal' ? '/sitecore/shell' : ''}/-/media/`;
    backgroundStyle = {
      backgroundImage: `url('${prefix}${backgroundImage?.match(BACKGROUND_REG_EXP)?.pop()}')`,
    };
  }

  return (
    <div className={`component container ${styles}`}>
      <div className="component-content" style={backgroundStyle}>
        <div className="row">
          <Placeholder name={phKey} rendering={props.rendering} />
        </div>
      </div>
    </div>
  );
};

export default Container;
