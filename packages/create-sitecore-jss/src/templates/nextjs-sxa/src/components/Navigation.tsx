import React, { useState } from 'react';
import { Link, LinkField, Text, TextField } from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Id: string;
  DisplayName: string;
  Title: TextField;
  NavigationTitle: TextField;
  Href: string;
  Querystring: string;
  Children: Array<Fields>;
  Styles: string[];
}

type NavigationProps = {
  params?: { [key: string]: string };
  fields: Fields;
  handleClick: () => void;
  relativeLevel: number;
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
    querystring: props.fields.Querystring,
  },
});

export const Default = (props: NavigationProps): JSX.Element => {
  const [isOpenMenu, openMenu] = useState(false);

  if (!Object.values(props.fields).length) {
    return (
      <div className={`component navigation`}>
        <div className="component-content">[Navigation]</div>
      </div>
    );
  }

  const handleToggleMenu = (flag?: boolean): void => {
    if (flag !== undefined) {
      return openMenu(flag);
    }

    openMenu(!isOpenMenu);
  };
  const list = Object.values(props.fields)
    .filter((element) => element)
    .map((element: Fields, key: number) => (
      <NavigationList
        key={`${key}${element.Id}`}
        fields={element}
        handleClick={() => handleToggleMenu(false)}
        relativeLevel={1}
      />
    ));
  const styles =
    props.params != null ? `${props.params.GridParameters} ${props.params.Styles}` : null;

  return (
    <div className={`component navigation ${styles}`}>
      <label className="menu-mobile-navigate-wrapper">
        <input
          type="checkbox"
          className="menu-mobile-navigate"
          checked={isOpenMenu}
          onChange={() => handleToggleMenu()}
        />
        <div className="menu-humburger" />
        <div className="component-content">
          <nav>
            <ul className="clearfix">{list}</ul>
          </nav>
        </div>
      </label>
    </div>
  );
};

const NavigationList = (props: NavigationProps) => {
  let title;
  if (props.fields.NavigationTitle) {
    title = props.fields.NavigationTitle.value?.toString();
  } else if (props.fields.Title) {
    title = props.fields.Title.value?.toString();
  } else {
    title = props.fields.DisplayName;
  }

  let children: JSX.Element[] = [];
  if (props.fields.Children && props.fields.Children.length) {
    children = props.fields.Children.map((element: Fields, index: number) => (
      <NavigationList
        key={`${index}${element.Id}`}
        fields={element}
        handleClick={props.handleClick}
        relativeLevel={props.relativeLevel + 1}
      />
    ));
  }

  return (
    <li className={props.fields.Styles.concat('rel-level' + props.relativeLevel).join(' ')} key={props.fields.Id}>
      <div className="navigation-title">
        <Link field={getLinkField(props)} title={title} onClick={props.handleClick}>
          {getNavigationText(props)}
        </Link>
      </div>
      {children.length > 0 ? <ul className="clearfix">{children}</ul> : null}
    </li>
  );
};

