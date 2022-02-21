import React from 'react';
import {
  ComponentParams,
  ComponentRendering,
  Placeholder,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
}

interface ComponentProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: Fields;
}

const Container = (props: ComponentProps): JSX.Element => {
  var styles = `${props.params.GridParameters} ${props.params.Styles}`.replace(/\|/g, ' ');
  var phKey = `container-${props.params.DynamicPlaceholderId}`;
  var backgroundStyle:  { [key: string]: string; } ;
  var backgroundImage = props.params.BackgroundImage as string;
  if (backgroundImage) {
    var prefix = `${useSitecoreContext().sitecoreContext.pageState !== 'normal' ? '/sitecore/shell' : ''}/-/media/`
    backgroundStyle = { backgroundImage: `url('${prefix}${backgroundImage?.match(/[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/gi)?.pop()?.replace(/\-/g,'')}')` };
  }
  if (props.rendering.placeholders && props.rendering.placeholders["container-{*}"]) {
    props.rendering.placeholders[phKey] = props.rendering.placeholders["container-{*}"];
    delete props.rendering.placeholders["container-{*}"];
  }
  return (
    <div className={`component container ${styles}`}>
      <div className="component-content" style={backgroundStyle}>
        <div className="row">
          <Placeholder name={phKey} rendering={props.rendering} />
        </div>
      </div>
    </div>
  )
};

export default Container;
