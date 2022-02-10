import React from 'react';
import { Field } from "..";

interface Fields {
  Text: Field<string>;
  Title: Field<string>;
}

type RichTextProps = {
	params: { [key: string]: string }
  fields: Fields;
};

export const Default = (props: RichTextProps): JSX.Element => {
  return (
    <div className={`rendering-variant ${props.params.styles}`}>
      <span className="default">Rich text</span>
    </div>
  );
};

export const WithTitle = (props: RichTextProps): JSX.Element => {
  return (
    <div className={`rendering-variant ${props.params.styles}`}>
      <div className="title">
        {props.fields.Title.value}
      </div>
      <span className="text">
        {props.fields.Text.value}
      </span>
    </div>
  );
};
