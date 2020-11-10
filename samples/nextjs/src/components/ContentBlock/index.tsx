import { Text, RichText, Field } from '@sitecore-jss/sitecore-jss-nextjs';

interface ContentBlockProps {
  fields: {
    heading: Field<string>;
    content: Field<string>;
  };
}

/**
 * A simple Content Block component, with a heading and rich text block.
 * This is the most basic building block of a content site, and the most basic
 * JSS component that's useful.
 */
const ContentBlock: React.FC<ContentBlockProps> = ({ fields }) => (
  <>
    <Text tag="h2" className="display-4" field={fields.heading} />

    <RichText className="contentDescription" field={fields.content} />
  </>
);

export default ContentBlock;
