import React from 'react';
import { Field, RichText as JssRichText } from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Text: Field<string>;
}

type RichTextProps = {
  params: { [key: string]: string };
  fields: Fields;
};

export const RichText = (props: RichTextProps): JSX.Element => {
  const text = props.fields ? <JssRichText field={props.fields.Text} /> : <span className="is-empty-hint">Rich text</span>;

  return (
    <div className={`component rich-text ${props.params.styles?.replace(/\|/g, ' ')}`}>
      <div className="component-content">
        {text}
      </div>
    </div>
  );
};
