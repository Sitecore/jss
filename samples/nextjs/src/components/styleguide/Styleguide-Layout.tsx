import {
  Placeholder,
  getChildPlaceholder,
  getFieldValue,
  ComponentRendering,
  HtmlElementRendering,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { StyleguideComponentProps } from 'lib/component-props';

/**
 * The main layout (columns) of the styleguide.
 * Navigation is automatically generated based on the components added to the layout,
 * and does not need to be manually maintained.
 */
const StyleguideLayout = (props: StyleguideComponentProps): JSX.Element => {
  const getRendering = (section: ComponentRendering | HtmlElementRendering) =>
    section as ComponentRendering;

  const convertUID = (uid?: string) => {
    if (!uid) return '';
    return uid.replace(/[{}]/g, '');
  };

  // this code reads the components in the child placeholders of this component,
  // and projects them into the left navigation column for the styleguide
  const sections = getChildPlaceholder(props.rendering, 'JssNextWeb-styleguide-layout')
    .filter((section) => getFieldValue(getRendering(section), 'heading'))
    .map((section) => ({
      heading: getFieldValue<string>(getRendering(section), 'heading'),
      id: `i${convertUID(getRendering(section).uid)}`,
      children: getChildPlaceholder(getRendering(section), 'JssNextWeb-styleguide-section')
        .filter((component) => getFieldValue(getRendering(component), 'heading'))
        .map((component) => ({
          heading: getFieldValue<string>(getRendering(component), 'heading'),
          id: `i${convertUID(getRendering(component).uid)}`,
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
        <Placeholder name="JssNextWeb-styleguide-layout" rendering={props.rendering} />
      </div>
      <div className="col-sm-4 col-lg-2 order-sm-first pt-2">{sections}</div>
    </div>
  );
};

export default StyleguideLayout;
