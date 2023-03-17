import { expect } from 'chai';
import { FEAAS_SERVER_URL, getFEAASLibraryStylesheetURLs, getStylesheetUrl } from './themes';

describe('utils', () => {
  describe('getFEAASLibraryStylesheetURLs', () => {
    it('should return empty array route data is not provided', () => {
      expect(
        getFEAASLibraryStylesheetURLs({
          sitecore: {
            context: {},
            route: null,
          },
        })
      ).to.deep.equal([]);
    });

    describe('normal mode', () => {
      it('should return urls using CSSStyles field', () => {
        expect(
          getFEAASLibraryStylesheetURLs({
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
                placeholders: {},
              },
            },
          })
        ).to.deep.equal([{ href: getStylesheetUrl('foo'), rel: 'style' }]);
      });

      it('should return urls using LibraryId field', () => {
        expect(
          getFEAASLibraryStylesheetURLs({
            sitecore: {
              context: {},
              route: {
                name: 'home',
                fields: {
                  LibraryId: {
                    value: 'bar',
                  },
                },
                placeholders: {},
              },
            },
          })
        ).to.deep.equal([{ href: getStylesheetUrl('bar'), rel: 'style' }]);
      });

      it('should return urls using custom server url', () => {
        expect(
          getFEAASLibraryStylesheetURLs(
            {
              sitecore: {
                context: {},
                route: {
                  name: 'home',
                  fields: {
                    LibraryId: {
                      value: 'bar',
                    },
                  },
                  placeholders: {},
                },
              },
            },
            'https://foo.net'
          )
        ).to.deep.equal([{ href: getStylesheetUrl('bar', 'https://foo.net'), rel: 'style' }]);
      });

      it('should return empty urls array when required fields are not provided', () => {
        expect(
          getFEAASLibraryStylesheetURLs({
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

      it('should traverse nested nodes and return only unique urls', () => {
        expect(
          getFEAASLibraryStylesheetURLs({
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
            rel: 'style',
          }))
        );
      });
    });

    describe('editing mode', () => {
      it('should return urls using class attribute', () => {
        expect(
          getFEAASLibraryStylesheetURLs({
            sitecore: {
              context: {},
              route: {
                name: 'home',
                placeholders: {
                  foo: [
                    {
                      name: 'foo-component',
                      contents: null,
                      attributes: {
                        class: '-library--bar',
                      },
                    },
                  ],
                },
              },
            },
          })
        ).to.deep.equal([{ href: getStylesheetUrl('bar'), rel: 'style' }]);
      });

      it('should return urls using custom server url', () => {
        expect(
          getFEAASLibraryStylesheetURLs(
            {
              sitecore: {
                context: {},
                route: {
                  name: 'home',
                  placeholders: {
                    foo: [
                      {
                        name: 'foo-component',
                        contents: null,
                        attributes: {
                          class: '-library--bar',
                        },
                      },
                    ],
                  },
                },
              },
            },
            'https://foo.net'
          )
        ).to.deep.equal([{ rel: 'style', href: getStylesheetUrl('bar', 'https://foo.net') }]);
      });

      it('should not return id when class does not match pattern', () => {
        expect(
          getFEAASLibraryStylesheetURLs({
            sitecore: {
              context: {},
              route: {
                name: 'home',
                placeholders: {
                  foo: [
                    {
                      name: 'foo-component',
                      contents: null,
                      attributes: {
                        class: 'bar',
                      },
                    },
                  ],
                },
              },
            },
          })
        ).to.deep.equal([]);
      });

      it('should return only unique urls', () => {
        expect(
          getFEAASLibraryStylesheetURLs({
            sitecore: {
              context: {},
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
          ['x1', 'y1', 'z1', 'z2'].map((id) => ({ rel: 'style', href: getStylesheetUrl(id) }))
        );
      });
    });
  });

  describe('getStylesheetUrl', () => {
    it('should return stylesheet url using default server url', () => {
      expect(getStylesheetUrl('foo')).to.equal(`${FEAAS_SERVER_URL}/styles/foo/published.css`);
    });

    it('should return stylesheet url using custom server url', () => {
      expect(getStylesheetUrl('foo', 'https://bar.net')).to.equal(
        'https://bar.net/styles/foo/published.css'
      );
    });
  });
});
