import { JSX } from 'react';
import {
  Link,
  LinkField,
  Text,
  TextField,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  data: {
    datasource: {
      url: {
        path: string;
        siteName: string;
      };
      field: {
        jsonValue: {
          value: string;
          editable?: string;
          metadata?: { [key: string]: unknown };
        };
      };
    };
    contextItem: {
      url: {
        path: string;
        siteName: string;
      };
      field: {
        jsonValue: {
          value: string;
          editable?: string;
          metadata?: { [key: string]: unknown };
        };
      };
    };
  };
}

type TitleProps = {
  params: { [key: string]: string };
  fields: Fields;
};

type ComponentContentProps = {
  id: string;
  styles: string;
  children: JSX.Element;
};

const ComponentContent = (props: ComponentContentProps) => {
  const id = props.id;
  return (
    <div className={`component title ${props?.styles}`} id={id ? id : undefined}>
      <div className="component-content">
        <div className="field-title">{props.children}</div>
      </div>
    </div>
  );
};

export const Default = (props: TitleProps): JSX.Element => {
  const datasource = props.fields?.data?.datasource || props.fields?.data?.contextItem;
  const { sitecoreContext } = useSitecoreContext();
  const text: TextField = datasource?.field?.jsonValue || {};
  const linkValue: NonNullable<LinkField['value']> = {
    value: {
      href: datasource?.url?.path,
      title: datasource?.field?.jsonValue?.value,
    },
  }.value;

  const displayText: TextField =
    sitecoreContext.pageState !== 'normal' && !text?.value ? { ...text, value: 'Title field' } : text;

  if (sitecoreContext.pageState !== 'normal') {
    linkValue.querystring = `sc_site=${datasource?.url?.siteName}`;
    if (!displayText?.value) linkValue.href = '#';
  }
  const link: LinkField = { value: linkValue };

  return (
    <ComponentContent styles={props?.params?.styles} id={props?.params?.RenderingIdentifier}>
      <>
        {sitecoreContext.pageEditing ? (
          <Text field={displayText} />
        ) : (
          <Link field={link}>
            <Text field={displayText} />
          </Link>
        )}
      </>
    </ComponentContent>
  );
};
