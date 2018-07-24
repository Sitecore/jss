import React from 'react';
import ReactDOMServer from 'react-dom/server';
import ServerHtml from './ServerHtml';
import componentFactory from './componentFactory';

export function serverRenderer(renderingData, viewBag) {
  const { componentName, uid: renderingUid } = renderingData.rendering;
  const ComponentInstance = componentFactory(componentName);
  const componentProps = {
    ...renderingData,
    viewBag,
  };

  // <ServerHtml> is the HTML wrapper (div) around the component contents when SSR-ing
  // Necessary because ReactDOM.render() or .hydrate() needs a DOM element in which to mount the component.
  const result = ReactDOMServer.renderToString(
    <ServerHtml
      componentProps={componentProps}
      componentName={componentName}
      renderingId={renderingUid}
    >
      <ComponentInstance {...componentProps} />
    </ServerHtml>
  );

  return result;
}
