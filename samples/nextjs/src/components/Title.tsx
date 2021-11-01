import React from 'react';
import {
  RenderingVariants,
  RenderingVariantProps,
  RenderingVariantParameters,
  Field,
  ComponentRendering,
  Link as JssLink,
  LinkFieldValue,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  data: Object & {
    datasource: Object & {
      url: Object & {
        path: string;
      };
      title: Field<string>;
    };
    contextItem: Object & {
      url: Object & {
        path: string;
      };
      title: Field<string>;
    };
  };
}

interface ComponentProps {
  rendering: ComponentRendering & { params: RenderingVariantParameters };
  params: RenderingVariantParameters;
  fields: Fields;
}

const Title = (props: ComponentProps): JSX.Element => {
  return (
    <RenderingVariants
      fields={props.fields}
      componentName={props.rendering.componentName}
      params={props.rendering.params}
    />
  );
};

const ComponentContent = (props: any) => {
  return (
    <div className={`component title ${props.styles?.replace(/\|/g, ' ')}`}>
      <div className="component-content">
        <div className="field-title">{props.children}</div>
      </div>
    </div>
  );
};

export const Default = (props: RenderingVariantProps<Fields>): JSX.Element => {
  let link: LinkFieldValue = {};
  if (props.fields?.data?.datasource) {
    link.href = props.fields.data.datasource.url.path;
    link.title = props.fields.data.datasource.title.value;
    link.text = props.fields.data.datasource.title.value;
  } else {
    link.href = props.fields.data.contextItem.url.path;
    link.title = props.fields.data.contextItem.title.value;
    link.text = props.fields.data.contextItem.title.value;
  }
  return (
    <ComponentContent styles={props.styles}>
      <JssLink field={link} />
    </ComponentContent>
  );
};

export default Title;
