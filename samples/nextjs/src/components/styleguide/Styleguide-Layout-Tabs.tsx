import React, { ReactElement } from 'react';
import { withPlaceholder, withSitecoreContext, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import StyleguideSpecimen from './Styleguide-Specimen';
import { StyleguideComponentWithContextProps, StyleguideSpecimenFields } from 'lib/component-props';

interface StyleguideLayoutTabsState {
  activeTabIndex: number;
}

type StyleguideLayoutTabsProps = StyleguideComponentWithContextProps &
  StyleguideSpecimenFields & {
    name: string;
    tabsPlaceholder: ReactElement[];
  };

/**
 * Demonstrates advanced component techniques in JSS.
 * This example implements a simple-looking tabs component.
 * Each tab is itself a child component added to a placeholder defined on the tabs component.
 * The tab component introspects its child components to render the tab headings (i.e. the tab children render partial content in two places).
 * When this component is edited in Sitecore Experience Editor, the tabbing behavior is turned off and each tab stacks on top of each other
 * for easy inline editing.
 */
class StyleguideLayoutTabs extends React.Component<
  StyleguideLayoutTabsProps,
  StyleguideLayoutTabsState
> {
  constructor(props: StyleguideLayoutTabsProps) {
    super(props);

    this.state = {
      activeTabIndex: 0,
    };

    this.setActiveTab = this.setActiveTab.bind(this);
  }

  setActiveTab(index: number) {
    this.setState({ activeTabIndex: index });
  }

  render() {
    const { tabsPlaceholder, sitecoreContext } = this.props;

    let validTabIndex = 0;
    const isEditing = sitecoreContext && sitecoreContext.pageEditing;

    return (
      <StyleguideSpecimen {...this.props} e2eId="styleguide-layout-tabs">
        <ul className="nav nav-tabs">
          {/*
            When the page is editing, we hide the tab headings, because they are not updated when xEditor adds or removes a tab rendering.
            Instead, we show the tab header inline with the tab contents (see Styleguide-Layout-Tabs-Tab).
          */}
          {!isEditing &&
            (tabsPlaceholder || [])
              .filter((tab: ReactElement) => tab.props && tab.props.fields)
              .map((tab: ReactElement, index: number) => (
                <li className="nav-item" key={`tab${index}`}>
                  <a
                    className={`nav-link ${index === this.state.activeTabIndex ? 'active' : null}`}
                    onClick={() => this.setActiveTab(index)}
                    href="#t"
                  >
                    <Text field={tab.props.fields.title} />
                  </a>
                </li>
              ))}
        </ul>
        <div className="p-3 border-left border-right border-bottom">
          {(tabsPlaceholder || []).map((tab: ReactElement) => {
            const isValid = tab.props && tab.props.fields;

            // allow experience editor markup components to render
            if (!isValid && isEditing) return tab;

            validTabIndex += 1;

            // we render the tab either if it's active - or we're editing,
            // in which case we stack all tabs for visual editing
            if (this.state.activeTabIndex === validTabIndex - 1 || isEditing) {
              return tab;
            }

            return null;
          })}
        </div>
      </StyleguideSpecimen>
    );
  }
}

// This is a _higher order component_ that will wrap our component and inject placeholder
// data into it as a prop (in this case, props.tabsPlaceholder).
// this another option compared to using the <Placeholder> component;
// in this case, chosen because we primarily need access to the _data_
// of the placeholder.
const tabsComponentWithPlaceholderInjected = withPlaceholder({
  placeholder: 'jss-tabs',
  prop: 'tabsPlaceholder',
})(StyleguideLayoutTabs);

// We need to know if experience editor is active, to disable the dynamic tab behavior for editing.
// Using the same technique as injecting the placeholder, we wrap the component again to inject the
// `sitecoreContext` prop.
const tabsWithPlaceholderAndSitecoreContext = withSitecoreContext()<StyleguideLayoutTabsProps>(
  tabsComponentWithPlaceholderInjected
);

export default tabsWithPlaceholderAndSitecoreContext;
