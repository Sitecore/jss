import { Placeholder, getChildPlaceholder, getFieldValue, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';

interface StyleguideLayoutProps {
  rendering: ComponentRendering;
}

/**
 * The main layout (columns) of the styleguide.
 * Navigation is automatically generated based on the components added to the layout,
 * and does not need to be manually maintained.
 */
const StyleguideLayout: React.FC<StyleguideLayoutProps> = (props) => {
  const getRendering = (section: any) => section as ComponentRendering

  const convertUID = (uid?: string) => {
    if (!uid) return '';
    return uid.replace(/[{}]/g, '');
  }

  // this code reads the components in the child placeholders of this component,
  // and projects them into the left navigation column for the styleguide
  const sections = getChildPlaceholder(props.rendering, 'jss-styleguide-layout')
    .filter((section) => getFieldValue(getRendering(section), 'heading'))
    .map((section) => ({
      heading: getFieldValue<string>(getRendering(section), 'heading'),
      id: `i${convertUID(getRendering(section).uid)}`,
      children: getChildPlaceholder(getRendering(section), 'jss-styleguide-section')
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
        <Placeholder name="jss-styleguide-layout" rendering={props.rendering} />
      </div>
      <div className="col-sm-4 col-lg-2 order-sm-first pt-2">{sections}</div>
    </div>
  );
};

export default StyleguideLayout;
