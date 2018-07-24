import React from 'react';

// Component that renders a wrapper around a Sitecore component when rendering on a Node server (SSR).
// Necessary because ReactDOM.render() or .hydrate() needs a DOM element in which to mount the component.

const ServerHtml = ({ componentName, renderingId, componentProps, children }) => {
  return [
    componentProps && (
      <script
        dangerouslySetInnerHTML={{
          __html: `
            if (!window.__jss_components__) { window.__jss_components__ = []; }
            window.__jss_components__.push({
              name: '${componentName}',
              id: '${renderingId}',
              data: ${JSON.stringify(componentProps)},
            });
          `,
        }}
      />
    ),
    <div key="content" id={renderingId}>
      {children}
    </div>,
  ];
};

export default ServerHtml;
