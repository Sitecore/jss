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
  if (props.fields) {
    return (
      <div className={`component rich-text ${props.params.styles?.replace(/\|/g, ' ')}`}>
        <div className="component-content">
          <JssRichText field={props.fields.Text} />
        </div>
      </div>
    );
  } else {
    return (
      <div className={`component rich-text ${props.params.styles?.replace(/\|/g, ' ')}`}>
        <div className="component-content"> 
          <span className="is-empty-hint">Rich text</span>
        </div>
      </div>
    )
  }
};
