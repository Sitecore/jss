import React from 'react';
import { Placeholder, getChildPlaceholder, getFieldValue } from '@sitecore-jss/sitecore-jss-react';

/**
 * The main layout (columns) of the styleguide.
 * Navigation is automatically generated based on the components added to the layout,
 * and does not need to be manually maintained.
 */
const StyleguideLayout = (props) => {
  // this code reads the components in the child placeholders of this component,
  // and projects them into the left navigation column for the styleguide
  const sections = getChildPlaceholder(props.rendering, 'jss-styleguide-layout')
    .filter((section) => getFieldValue(section, 'heading'))
    .map((section) => ({
      heading: getFieldValue(section, 'heading'),
      id: `i${section.uid.replace(/[{}]/g, '')}`,
      children: getChildPlaceholder(section, 'jss-styleguide-section')
        .filter((component) => getFieldValue(component, 'heading'))
        .map((component) => ({
          heading: getFieldValue(component, 'heading'),
          id: `i${component.uid.replace(/[{}]/g, '')}`,
        })),
    }))
    .map((section) => (
      <nav key={section.heading} className="nav flex-column pt-2">
        <a href={`#${section.id}`} className="nav-item font-weight-bold">
          {section.heading}
        </a>
        {section.children && (
          <nav className="nav flex-column">
            {section.children.map(
              (child) =>
                child.heading && (
                  <a key={child.id} href={`#${child.id}`}>
                    {child.heading}
                  </a>
                )
            )}
          </nav>
        )}
      </nav>
    ));

  return (
    <div className="row">
      <div className="col-sm-8 col-lg-10">
        <Placeholder name="jss-styleguide-layout" rendering={props.rendering} />
      </div>
      <div className="col-sm-4 col-lg-2 order-sm-first pt-2">{sections}</div>
    </div>
  );
};

export default StyleguideLayout;
