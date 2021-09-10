import React from 'react';
import { Link } from '@sitecore-jss/sitecore-jss-react';
import StyleguideSpecimen from '../Styleguide-Specimen';

/**
 * Demonstrates usage of a General Link (hyperlink) content field within JSS.
 */
const StyleguideFieldUsageLink = (props) => (
  <StyleguideSpecimen {...props} e2eId="styleguide-fieldusage-link">
    External link:&nbsp;
    <Link field={props.fields.externalLink} />
    <br />
    Internal link:&nbsp;
    <Link field={props.fields.internalLink}>
      <em>HTML</em> or other components can be used within link renderers, for example links to
      images.
    </Link>
    <br />
    Email link:&nbsp;
    <Link field={props.fields.emailLink} />
    <br />
    All possible content params link:&nbsp;
    <Link field={props.fields.paramsLink} />
    <br />
    The link component accepts params of its own:&nbsp;
    <Link
      field={props.fields.externalLink}
      showLinkTextWithChildrenPresent={true}
      className="font-weight-bold"
      data-otherattributes="pass-through-to-anchor-tag"
    />
  </StyleguideSpecimen>
);

export default StyleguideFieldUsageLink;
