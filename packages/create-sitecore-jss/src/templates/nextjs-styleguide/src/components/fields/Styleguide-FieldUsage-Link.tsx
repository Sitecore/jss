import { Link, LinkField, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import StyleguideSpecimen from 'components/styleguide/Styleguide-Specimen';
import { ComponentProps } from 'lib/component-props';
import { StyleguideSpecimenFields } from 'lib/component-props/styleguide';

type StyleguideFieldUsageLinkProps = ComponentProps &
  StyleguideSpecimenFields & {
    fields: {
      externalLink: LinkField;
      internalLink: LinkField;
      emailLink: LinkField;
      paramsLink: LinkField;
    };
  };

/**
 * Demonstrates usage of a General Link (hyperlink) content field within JSS.
 */
const StyleguideFieldUsageLink = (props: StyleguideFieldUsageLinkProps): JSX.Element => (
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

export default withDatasourceCheck()<StyleguideFieldUsageLinkProps>(StyleguideFieldUsageLink);
