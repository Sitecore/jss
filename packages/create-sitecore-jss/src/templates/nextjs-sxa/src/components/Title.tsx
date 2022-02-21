import React from 'react';
import {
  Link,
  Text,
  useSitecoreContext,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import {
  TextField,
} from '@sitecore-jss/sitecore-jss-react';  

interface Fields {
  data: Object & {
    datasource: Object & {
      url: Object & {
        path: string;
        siteName: string;
      };
      field: Object & {
        jsonValue: Object & {
          value: string;
          editable: string;
        }
      };
    };
    contextItem: Object & {
      url: Object & {
        path: string;
        siteName: string;
      };
      field: Object & {
        jsonValue: Object & {
          value: string;
          editable: string;
        }
      };
    };
  };
}

type TitleProps = {
  params: { [key: string]: string };
  fields: Fields;
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

export const Title = (props: TitleProps): JSX.Element => {
  let datasource = props.fields?.data?.datasource || props.fields?.data?.contextItem;
  let text: TextField = {
    value: datasource?.field?.jsonValue?.value,
    editable: datasource?.field?.jsonValue?.editable,
  };
  let link: LinkField = {
    value: {
      href: datasource?.url?.path,
      title: datasource?.field?.jsonValue?.value,
      editable: true,
    },
  };
  if (useSitecoreContext().sitecoreContext.pageState !== 'normal') {
    link.value.href += `?sc_site=${datasource?.url?.siteName}`;
    if (!text.value) {
      text.value = "Title field";
      link.value.href = "#";
    }
  }
  return (
    <ComponentContent styles={props.params.styles}>
      <Link field={link}>
        <Text field={text} />
      </Link>
    </ComponentContent>
  );
};
