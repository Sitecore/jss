import { expect } from 'chai';
import {
  FEAAS_SERVER_URL_STAGING,
  FEAAS_SERVER_URL_BETA,
  FEAAS_SERVER_URL_PROD,
  getFEAASLibraryStylesheetLinks,
  getStylesheetUrl,
} from './themes';
import { SITECORE_EDGE_URL_DEFAULT } from '../constants';
import { ComponentRendering, HtmlElementRendering, LayoutServicePageState } from '../layout';

describe('themes', () => {
  describe('getFEAASLibraryStylesheetLinks', () => {
    const setBasicLayoutData = (
      component: ComponentRendering | HtmlElementRendering,
      pageState?: LayoutServicePageState
    ) => {
      return {
        sitecore: {
          context: {
            pageState,
          },
          route: {
            name: 'home',
            placeholders: {
              main: [component],
            },
          },
        },
      };
    };

    it('should return empty array route data is not provided', () => {
      expect(
        getFEAASLibraryStylesheetLinks({
          sitecore: {
            context: {},
            route: null,
          },
        })
      ).to.deep.equal([]);
    });

    describe('normal mode', () => {
      it('should return links using CSSStyles field', () => {
        expect(
          getFEAASLibraryStylesheetLinks(
            setBasicLayoutData({
              componentName: 'test',
              fields: {
                CSSStyles: {
                  value: '-library--foo',
                },
                LibraryId: {
                  value: 'bar',
                },
              },
            })
          )
        ).to.deep.equal([{ href: getStylesheetUrl('foo'), rel: 'stylesheet' }]);
      });

      it('should return links using LibraryId field', () => {
        expect(
          getFEAASLibraryStylesheetLinks(
            setBasicLayoutData({
              componentName: 'test',
              fields: {
                LibraryId: {
                  value: 'bar',
                },
              },
            })
          )
        ).to.deep.equal([{ href: getStylesheetUrl('bar'), rel: 'stylesheet' }]);
      });

      it('should return links using CSSStyles param', () => {
        expect(
          getFEAASLibraryStylesheetLinks(
            setBasicLayoutData({
              componentName: 'styled',
              params: {
                CSSStyles: '-library--foo',
              },
            })
          )
        ).to.deep.equal([{ href: getStylesheetUrl('foo'), rel: 'stylesheet' }]);
      });

      it('should return links using LibraryId param', () => {
        expect(
          getFEAASLibraryStylesheetLinks(
            setBasicLayoutData({
              componentName: 'styled',
              params: {
                LibraryId: 'bar',
              },
            })
          )
        ).to.deep.equal([{ href: getStylesheetUrl('bar'), rel: 'stylesheet' }]);
      });

      it('should return prefer params over fields', () => {
        expect(
          getFEAASLibraryStylesheetLinks(
            setBasicLayoutData({
              componentName: 'styled',
              params: {
                CSSStyles: '-library--foo',
              },
              fields: {
                CSSStyles: {
                  value: '-library--not-foo',
                },
              },
            })
          )
        ).to.deep.equal([{ href: getStylesheetUrl('foo'), rel: 'stylesheet' }]);

        expect(
          getFEAASLibraryStylesheetLinks(
            setBasicLayoutData({
              componentName: 'styled',
              params: {
                LibraryId: 'bar',
              },
              fields: {
                LibraryId: {
                  value: 'not-bar',
                },
              },
            })
          )
        ).to.deep.equal([{ href: getStylesheetUrl('bar'), rel: 'stylesheet' }]);
      });

      it('should read LibraryId from class when matching param or field is not found', () => {
        expect(
          getFEAASLibraryStylesheetLinks(
            setBasicLayoutData({
              componentName: 'styled',
              params: {
                NotCSSStyles: '-library--not-foo',
                NotLibraryId: 'not-foo',
              },
              fields: {
                NotCSSStyles: {
                  value: '-library--not-foo',
                },
                NotLibraryId: {
                  value: 'not-foo',
                },
              },
              attributes: {
                class: '-library--foo',
              },
            })
          )
        ).to.deep.equal([{ href: getStylesheetUrl('foo'), rel: 'stylesheet' }]);
      });

      it('should return links using non-prod server url', () => {
        expect(
          getFEAASLibraryStylesheetLinks(
            setBasicLayoutData({
              componentName: 'test',
              fields: {
                LibraryId: {
                  value: 'bar',
                },
              },
            }),
            'https://edge-platform-dev.sitecorecloud.io'
          )
        ).to.deep.equal([
          {
            href: getStylesheetUrl(
              'bar',
              LayoutServicePageState.Normal,
              'https://edge-platform-dev.sitecorecloud.io'
            ),
            rel: 'stylesheet',
          },
        ]);
      });

      it('should return empty links array when required fields are not provided', () => {
        expect(
          getFEAASLibraryStylesheetLinks({
            sitecore: {
              context: {},
              route: {
                name: 'home',
                fields: {},
                placeholders: {},
              },
            },
          })
        ).to.deep.equal([]);
      });

      it('should return empty links array when required params are not provided', () => {
        expect(
          getFEAASLibraryStylesheetLinks(
            setBasicLayoutData({
              componentName: 'styled',
              params: {},
            })
          )
        ).to.deep.equal([]);
      });

      it('should traverse nested nodes and return only unique links', () => {
        expect(
          getFEAASLibraryStylesheetLinks({
            sitecore: {
              context: {},
              route: {
                name: 'home',
                fields: {
                  CSSStyles: {
                    value: '-library--foo',
                  },
                  LibraryId: {
                    value: 'bar',
                  },
                },
                placeholders: {
                  x: [
                    {
                      componentName: 'x1-component',
                      fields: {
                        LibraryId: {
                          value: 'foo',
                        },
                      },
                      placeholders: {
                        x1: [
                          {
                            componentName: 'x11-component',
                            fields: {
                              CSSStyles: {
                                value: '-library--x11',
                              },
                            },
                          },
                          {
                            componentName: 'x12-component',
                            fields: {
                              CSSStyles: {
                                value: '-library--x12',
                              },
                              LibraryId: {
                                value: 'x12-id',
                              },
                            },
                          },
                        ],
                        x2: [
                          {
                            componentName: 'x21-component',
                            fields: {
                              LibraryId: {
                                value: 'x21',
                              },
                            },
                          },
                        ],
                      },
                    },
                  ],
                  y: [
                    {
                      componentName: 'y1-component',
                      fields: {
                        LibraryId: {
                          value: 'y1',
                        },
                      },
                    },
                    {
                      componentName: 'y2-component',
                      fields: {
                        CSSStyles: {
                          value: 'custom-style',
                        },
                        LibraryId: {
                          value: 'y2',
                        },
                      },
                    },
                  ],
                  z: [
                    {
                      componentName: 'z1-component',
                      fields: {
                        CSSStyles: {
                          value: '-library--z1',
                        },
                      },
                      placeholders: {
                        z1: [
                          {
                            componentName: 'z11-component',
                            fields: {
                              CSSStyles: {
                                value: '-library--z11',
                              },
                            },
                          },
                        ],
                        z2: [
                          {
                            componentName: 'z21-component',
                            fields: {
                              LibraryId: {
                                value: 'z21',
                              },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            },
          })
        ).to.deep.equal(
          ['foo', 'x11', 'x12', 'x21', 'y1', 'y2', 'z1', 'z11', 'z21'].map((id) => ({
            href: getStylesheetUrl(id),
            rel: 'stylesheet',
          }))
        );
      });
    });

    describe('editing mode', () => {
      it('should return links using class attribute', () => {
        expect(
          getFEAASLibraryStylesheetLinks(
            setBasicLayoutData(
              {
                name: 'foo-component',
                contents: null,
                attributes: {
                  class: '-library--bar',
                },
              },
              LayoutServicePageState.Edit
            )
          )
        ).to.deep.equal([
          { href: getStylesheetUrl('bar', LayoutServicePageState.Edit), rel: 'stylesheet' },
        ]);
      });

      it('should return links using non-prod server url', () => {
        expect(
          getFEAASLibraryStylesheetLinks(
            setBasicLayoutData(
              {
                name: 'foo-component',
                contents: null,
                attributes: {
                  class: '-library--bar',
                },
              },
              LayoutServicePageState.Edit
            ),
            'https://edge-platform-dev.sitecorecloud.io'
          )
        ).to.deep.equal([
          {
            rel: 'stylesheet',
            href: getStylesheetUrl(
              'bar',
              LayoutServicePageState.Edit,
              'https://edge-platform-dev.sitecorecloud.io'
            ),
          },
        ]);
      });

      it('should not return id when class does not match pattern', () => {
        expect(
          getFEAASLibraryStylesheetLinks(
            setBasicLayoutData(
              {
                name: 'foo-component',
                contents: null,
                attributes: {
                  class: 'bar',
                },
              },
              LayoutServicePageState.Edit
            )
          )
        ).to.deep.equal([]);
      });

      it('should return only unique links', () => {
        expect(
          getFEAASLibraryStylesheetLinks({
            sitecore: {
              context: {
                pageState: LayoutServicePageState.Edit,
              },
              route: {
                name: 'home',
                placeholders: {
                  x: [
                    {
                      name: 'x1-component',
                      contents: null,
                      attributes: {
                        class: '-library--x1',
                      },
                    },
                  ],
                  y: [
                    {
                      name: 'x2-component',
                      contents: null,
                      attributes: {
                        class: '-library--x1',
                      },
                    },
                    {
                      name: 'y1-component',
                      contents: null,
                      attributes: {
                        class: '-library--y1',
                      },
                    },
                  ],
                  z: [
                    {
                      name: 'z-component',
                      contents: null,
                      attributes: {
                        class: '-library--z1',
                      },
                    },
                    {
                      name: 'z-component',
                      contents: null,
                      attributes: {
                        class: '-library--z2',
                      },
                    },
                  ],
                },
              },
            },
          })
        ).to.deep.equal(
          ['x1', 'y1', 'z1', 'z2'].map((id) => ({
            rel: 'stylesheet',
            href: getStylesheetUrl(id, LayoutServicePageState.Edit),
          }))
        );
      });
    });

    describe('getStylesheetUrl', () => {
      it('should use published css url in Normal mode', () => {
        const pageState = LayoutServicePageState.Normal;

        expect(getStylesheetUrl('foo', pageState)).to.equal(
          `${FEAAS_SERVER_URL_PROD}/styles/foo/published.css`
        );
      });

      it('should use staged css url in Edit mode', () => {
        const pageState = LayoutServicePageState.Edit;

        expect(getStylesheetUrl('foo', pageState)).to.equal(
          `${FEAAS_SERVER_URL_PROD}/styles/foo/staged.css`
        );
      });

      it('should use staged css url in Preview mode', () => {
        const pageState = LayoutServicePageState.Preview;

        expect(getStylesheetUrl('foo', pageState)).to.equal(
          `${FEAAS_SERVER_URL_PROD}/styles/foo/staged.css`
        );
      });

      ['dev', 'qa', 'staging'].map((env) => {
        it(`should use staging server url for edge ${env} url`, () => {
          const pageState = LayoutServicePageState.Normal;

          expect(
            getStylesheetUrl(
              'foo',
              pageState,
              `https://edge-platform-${env}.sitecore-staging.cloud`
            )
          ).to.equal(`${FEAAS_SERVER_URL_STAGING}/styles/foo/published.css`);
        });
      });

      it('should use beta server url for edge preprod url', () => {
        const pageState = LayoutServicePageState.Normal;

        expect(
          getStylesheetUrl(
            'foo',
            pageState,
            'https://edge-platform-pre-production.sitecorecloud.io'
          )
        ).to.equal(`${FEAAS_SERVER_URL_BETA}/styles/foo/published.css`);
      });

      it('should use prod server url for edge prod url', () => {
        const pageState = LayoutServicePageState.Normal;

        expect(getStylesheetUrl('foo', pageState, SITECORE_EDGE_URL_DEFAULT)).to.equal(
          `${FEAAS_SERVER_URL_PROD}/styles/foo/published.css`
        );
      });
    });
  });
});
