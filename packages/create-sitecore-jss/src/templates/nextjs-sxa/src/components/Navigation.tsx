import React from 'react';
import {
  Link,
  LinkField,
  Text
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Id: string;
  DisplayName: string;
  Title: Text;
  NavigationTitle: Text;
  Href: string;
  Children: Array<Fields>;
  Styles: string[];
}

type NavigationProps = {
  params: { [key: string]: string };
  fields: Fields;
};

let getNavigationText = function (props: any): string {
  let text;
  if (props.fields.NavigationTitle) {
    text = <Text field={props.fields.NavigationTitle.NavigationTitle} />
  } else if (props.fields.Title) {
    text = <Text field={props.fields.Title.Title} />
  } else {
    text = props.fields.DisplayName;
  }
  return text;
};

let getLinkField = function (props: any): LinkField {
  let link: LinkField = {
    value: {
      href: props.fields.Href,
      title: props.fields.DisplayName,
    },
  }
  return link;
}

const Navigation = (props: NavigationProps): JSX.Element => {

  if (Object.values(props.fields).length === 0) {
    return (
      <div className={`component navigation`}>
        <div className="component-content">
          [Navigation]
        </div>
      </div>
    );
  }  

  const list = [];
  for (let i = 0; i < Object.values(props.fields).length; i++) {
    const element = props.fields[i]; 
    if (element) {
      list.push(<NavigationList key={i} fields={element} />);
    }
  }

  return (
    <div className={`component navigation`}>
      <div className="component-content">
        <nav>
          <ul className="clearfix">
            {list}
          </ul>
        </nav>
      </div>
    </div>
  );
};

const NavigationList = (props: any) => {
  if (props.fields.Children && props.fields.Children.length > 0) {

    let children: JSX.Element[] = [];

    props.fields.Children.map((element:Fields, index:Number) => {
      children.push(<NavigationList key={index} fields={element} />);
    });

    return (
      <li className={props.fields.Styles.join(" ")} key={props.fields.Id}>
          <div className="navigation-title">
            <Link field={getLinkField(props)}>{getNavigationText(props)}</Link>
          </div>
          <ul className="clearfix">
            {children}
          </ul>
      </li>
    )
  } else {
    return (
      <li className={props.fields.Styles.join(" ")} key={props.fields.Id}>
          <div className="navigation-title">
          <Link field={getLinkField(props)}>{getNavigationText(props)}</Link>
          </div>
      </li>
    )
  }
}

export default Navigation;
