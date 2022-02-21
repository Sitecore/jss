import React from 'react';
import {
  Link as JssLink,
  Text,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { TextField } from '@sitecore-jss/sitecore-jss-react';

interface Fields {
  data: Object & {
    datasource: Object & {
      children: Object & {
        results: Array<any> & {
          field: Object & {
            link: LinkField;
          };
        };
      };
      field: Object & {
        title: TextField;
      };
    };
  };
}

type LinkListProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const LinkListItem = (props: any) => {
  let className = `item${props.index}`;
  (props.index + 1) % 2 == 0 ? (className += ' odd') : (className += ' even');
  if (props.index == 0) {
    className += ' first';
  }
  if (props.index + 1 == props.total) {
    className += ' last';
  }
  return (
    <li className={className}>
      <div className="field-link">
        <JssLink field={props.field} />
      </div>
    </li>
  );
};

export const Default = (props: LinkListProps): JSX.Element => {
  let datasource = props.fields?.data?.datasource;
  if (datasource) {
    let list = [];
    for (let i = 0; i < datasource.children.results.length; i++) {
      let element = datasource.children.results[i].field.link;
      if (element) {
        list.push(
          <LinkListItem
            index={i}
            key={i}
            total={datasource.children.results.length}
            field={element}
          />
        );
      }
    }
    return (
      <div className={`component link-list ${props.params.styles?.replace(/\|/g, ' ')}`}>
        <div className="component-content">
          <Text tag="h3" field={datasource?.field?.title} />
          <ul>{list}</ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className={`component link-list ${props.params.styles?.replace(/\|/g, ' ')}`}>
        <div className="component-content">
          <h3>Link List</h3>
        </div>
      </div>
    );
  }
};
