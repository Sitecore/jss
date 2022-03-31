import React from 'react';
import { Link, LinkField, Text, TextField } from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Id: string;
  DisplayName: string;
  Title: TextField;
  NavigationTitle: TextField;
  Href: string;
  Children: Array<Fields>;
  Styles: string[];
}

type NavigationProps = {
  params?: { [key: string]: string };
  fields: Fields;
};

const getNavigationText = function (props: NavigationProps): JSX.Element | string {
  let text;

  if (props.fields.NavigationTitle) {
    text = <Text field={props.fields.NavigationTitle} />;
  } else if (props.fields.Title) {
    text = <Text field={props.fields.Title} />;
  } else {
    text = props.fields.DisplayName;
  }

  return text;
};

const getLinkField = (props: NavigationProps): LinkField => ({
  value: {
    href: props.fields.Href,
    title: props.fields.DisplayName,
  },
});

const Navigation = (props: NavigationProps): JSX.Element => {
  if (!Object.values(props.fields).length) {
    return (
      <div className={`component navigation`}>
        <div className="component-content">[Navigation]</div>
      </div>
    );
  }

  const list = Object.values(props.fields)
    .filter((element) => element)
    .map((element: Fields, key: number) => (
      <NavigationList key={`${key}${element.Id}`} fields={element} />
    ));

  return (
    <div className={`component navigation`}>
      <div className="component-content">
        <nav>
          <ul className="clearfix">{list}</ul>
        </nav>
      </div>
    </div>
  );
};

const NavigationList = (props: NavigationProps) => {
  if (props.fields.Children && props.fields.Children.length) {
    const children: JSX.Element[] = props.fields.Children.map((element: Fields, index: number) => (
      <NavigationList key={`${index}${element.Id}`} fields={element} />
    ));

    return (
      <li className={props.fields.Styles.join(' ')} key={props.fields.Id}>
        <div className="navigation-title">
          <Link field={getLinkField(props)}>{getNavigationText(props)}</Link>
        </div>
        <ul className="clearfix">{children}</ul>
      </li>
    );
  }

  return (
    <li className={props.fields.Styles.join(' ')} key={props.fields.Id}>
      <div className="navigation-title">
        <Link field={getLinkField(props)}>{getNavigationText(props)}</Link>
      </div>
    </li>
  );
};

export default Navigation;
