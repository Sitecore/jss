import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { PlaceholderMetadata } from './PlaceholderMetadata';
import { Placeholder } from './placeholder';
import { ComponentFactory } from './sharedTypes';
import { EditMode } from '@sitecore-jss/sitecore-jss/layout';
import { SitecoreContext } from './SitecoreContext';

const layoutDataForNestedPlaceholder = {
  sitecore: {
    context: {
      pageEditing: true,
      editMode: EditMode.Metadata,
    },
    route: {
      name: 'main',
      placeholders: {
        main: [
          {
            uid: 'root123',
            componentName: 'Layout',
            placeholders: {
              header: [
                {
                  uid: 'nested123',
                  componentName: 'Header',
                  placeholders: {
                    logo: [
                      {
                        uid: 'deep123',
                        componentName: 'Logo',
                      },
                      {
                        uid: 'richtextuid',
                        componentName: 'RichText',
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  },
};

const componentFactory: ComponentFactory = (componentName: string) => {
  const components = new Map<string, React.FC>();

  components.set('RichText', () => <div className="richtext-mock" />);
  components.set('Header', () => (
    <SitecoreContext
      componentFactory={componentFactory}
      layoutData={layoutDataForNestedPlaceholder}
    >
      <div className="header-wrapper">
        <h2>This is the heading of the header component</h2>
        <Placeholder
          name="logo"
          rendering={
            layoutDataForNestedPlaceholder.sitecore.route.placeholders.main[0].placeholders
              .header[0]
          }
        />
        <Placeholder
          name="buttons"
          rendering={
            layoutDataForNestedPlaceholder.sitecore.route.placeholders.main[0].placeholders
              .header[0]
          }
        />
        <p>this is the footer of the header component</p>
      </div>
    </SitecoreContext>
  ));
  components.set('Logo', () => <div className="Logo-mock" />);

  return components.get(componentName) || null;
};

describe('PlaceholderWithMetadata', () => {
  it('renders a single component without placeholders', () => {
    const component = {
      uid: '123',
      componentName: 'RichText',
    };

    const children = <div className="richtext-class"></div>;

    const wrapper = shallow(
      <PlaceholderMetadata uid={component.uid} metadataType="rendering">
        {children}
      </PlaceholderMetadata>
    );

    expect(wrapper.html()).to.equal(
      [
        '<code type="text/sitecore" chrometype="rendering" class="scpm" kind="open" id="123"></code>',
        '<div class="richtext-class"></div>',
        '<code type="text/sitecore" chrometype="rendering" class="scpm" kind="close" id="123"></code>',
      ].join('')
    );
  });

  it('renders a component with placeholders', () => {
    const layoutData = {
      sitecore: {
        context: {
          pageEditing: true,
          editMode: EditMode.Metadata,
        },
        route: {
          name: 'main',
          placeholders: {
            main: [
              {
                uid: '123',
                componentName: 'Layout',
                placeholders: {
                  header: [
                    {
                      uid: '456',
                      componentName: 'RichText',
                    },
                  ],
                },
              },
            ],
          },
        },
      },
    };

    const children = (
      <SitecoreContext componentFactory={componentFactory} layoutData={layoutData}>
        <Placeholder name="header" rendering={layoutData.sitecore.route.placeholders.main[0]} />
      </SitecoreContext>
    );

    const wrapper = shallow(
      <PlaceholderMetadata uid={layoutData.sitecore.route.placeholders.main[0].uid}>
        {children}
      </PlaceholderMetadata>
    );

    expect(wrapper.html()).to.equal(
      [
        '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="open" id="header_123"></code>',
        '<code type="text/sitecore" chrometype="rendering" class="scpm" kind="open" id="456"></code>',
        '<div class="richtext-mock"></div>',
        '<code type="text/sitecore" chrometype="rendering" class="scpm" kind="close" id="456"></code>',
        '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="close" id="header_123"></code>',
      ].join('')
    );
  });

  it('renders nested placeholder components', () => {
    const children = (
      <SitecoreContext
        componentFactory={componentFactory}
        layoutData={layoutDataForNestedPlaceholder}
      >
        <Placeholder
          name="header"
          rendering={layoutDataForNestedPlaceholder.sitecore.route.placeholders.main[0]}
        />
      </SitecoreContext>
    );

    const wrapper = shallow(
      <PlaceholderMetadata
        uid={layoutDataForNestedPlaceholder.sitecore.route.placeholders.main[0].uid}
      >
        {children}
      </PlaceholderMetadata>
    );

    expect(wrapper.html()).to.equal(
      [
        '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="open" id="header_root123"></code>',
        '<code type="text/sitecore" chrometype="rendering" class="scpm" kind="open" id="nested123"></code>',
        '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="open" id="logo_nested123"></code>',
        '<code type="text/sitecore" chrometype="rendering" class="scpm" kind="open" id="deep123"></code>',
        '<div class="Logo-mock"></div>',
        '<code type="text/sitecore" chrometype="rendering" class="scpm" kind="close" id="deep123"></code>',
        '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="close" id="logo_nested123"></code>',
        '<code type="text/sitecore" chrometype="rendering" class="scpm" kind="close" id="nested123"></code>',
        '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="close" id="header_root123"></code>',
      ].join('')
    );
  });

  it('should render code blocks if placeholder is empty', () => {
    const layoutData = {
      sitecore: {
        context: {
          pageEditing: true,
          editMode: EditMode.Metadata,
        },
        route: {
          name: 'main',
          placeholders: {
            main: [
              {
                uid: '123',
                componentName: 'Layout',
                placeholders: {
                  header: [],
                },
              },
            ],
          },
        },
      },
    };

    const children = (
      <SitecoreContext componentFactory={componentFactory} layoutData={layoutData}>
        <Placeholder name="header" rendering={layoutData.sitecore.route.placeholders.main[0]} />
      </SitecoreContext>
    );

    const wrapper = shallow(
      <PlaceholderMetadata uid={layoutData.sitecore.route.placeholders.main[0].uid}>
        {children}
      </PlaceholderMetadata>
    );

    expect(wrapper.html()).to.equal(
      [
        '<div class="sc-jss-empty-placeholder">',
        '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="open" id="header_123"></code>',
        '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="close" id="header_123"></code>',
        '</div>',
      ].join('')
    );
  });

  it('should render missing component with chromes if component is not registered', () => {
    const layoutData = {
      sitecore: {
        context: {
          pageEditing: true,
          editMode: EditMode.Metadata,
        },
        route: {
          name: 'main',
          placeholders: {
            main: [
              {
                uid: '123',
                componentName: 'Layout',
                placeholders: {
                  header: [
                    {
                      uid: '456',
                      componentName: 'Unknown',
                    },
                  ],
                },
              },
            ],
          },
        },
      },
    };

    const children = (
      <SitecoreContext componentFactory={componentFactory} layoutData={layoutData}>
        <Placeholder name="header" rendering={layoutData.sitecore.route.placeholders.main[0]} />
      </SitecoreContext>
    );

    const wrapper = shallow(
      <PlaceholderMetadata uid={layoutData.sitecore.route.placeholders.main[0].uid}>
        {children}
      </PlaceholderMetadata>
    );

    expect(wrapper.html()).to.equal(
      [
        '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="open" id="header_123"></code>',
        '<code type="text/sitecore" chrometype="rendering" class="scpm" kind="open" id="456"></code>',
        '<div style="background:darkorange;outline:5px solid orange;padding:10px;color:white;max-width:500px"><h2>Unknown</h2><p>JSS component is missing React implementation. See the developer console for more information.</p></div>',
        '<code type="text/sitecore" chrometype="rendering" class="scpm" kind="close" id="456"></code>',
        '<code type="text/sitecore" chrometype="placeholder" class="scpm" kind="close" id="header_123"></code>',
      ].join('')
    );
  });
});
