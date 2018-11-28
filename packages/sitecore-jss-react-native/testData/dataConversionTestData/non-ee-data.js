export const rawData = {
  context: {
    pageEditing: false,
    site: {
      name: 'jssadvancedapp',
    },
    navigation: [
      {
        name: 'Home',
        path: '/',
        children: [
          {
            name: 'About',
            path: '/about',
          },
          {
            name: 'Portfolio',
            path: '/portfolio',
          },
          {
            name: 'Services',
            path: '/services',
          },
        ],
      },
    ],
  },
  name: 'portfolio',
  displayName: 'Portfolio',
  fields: {
    metaTitle: {
      value: '',
      editable: '',
    },
  },
  placeholders: [
    {
      name: 'main',
      path: 'main',
      elements: [
        {
          componentName: 'Portfolio',
          renderingName: 'Portfolio',
          renderingParams: {},
          uid: '0a44b6e4-67a9-4e82-8246-a17e048b9eb8',
          placeholders: [
            {
              name: 'page-header',
              path: '/main/page-header_0A44B6E4-67A9-4E82-8246-A17E048B9EB8',
              elements: [
                {
                  renderingName: 'Jumbotron',
                  componentName: 'Jumbotron',
                  renderingParams: {
                    shade: 'light',
                    titleSize: '2',
                  },
                  uid: '8a0d4795-c7d0-4fec-9369-0b89f3162073',
                  placeholders: [],
                  name: 'code',
                  type: 'data/json',
                  contents: {
                    titleText: {
                      value: 'Portfolio',
                      editable: 'Portfolio',
                    },
                    body: {
                      value: '',
                      editable: '',
                    },
                  },
                  attributes: {
                    type: 'data/json',
                  },
                },
              ],
            },
            {
              name: 'page-content',
              path: '/main/page-content_0A44B6E4-67A9-4E82-8246-A17E048B9EB8',
              elements: [
                {
                  componentName: 'Carousel',
                  renderingName: 'Carousel',
                  renderingParams: {},
                  uid: 'd28a2e1f-866e-475c-9ed6-246ee5cc7aea',
                  placeholders: [],
                  name: 'code',
                  type: 'data/json',
                  contents: {
                    items: [
                      {
                        body: {
                          value:
                            '<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>',
                          editable:
                            '<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>',
                        },
                        title: {
                          value: 'First slide label!',
                          editable: 'First slide label!',
                        },
                        image: {
                          value: {
                            src:
                              'http://jssadvancedapp/-/media/JssAdvancedApp/assets/img/portfolio/1.ashx?h=350&amp;la=en&amp;w=650&amp;hash=D9645D0B6D48932543B9C64AA0B07A94ECA7CAFC',
                            alt: '',
                            width: '650',
                            height: '350',
                          },
                          editable:
                            '<img src="http://jssadvancedapp/-/media/JssAdvancedApp/assets/img/portfolio/1.ashx?h=350&amp;la=en&amp;w=650&amp;hash=D9645D0B6D48932543B9C64AA0B07A94ECA7CAFC" alt="" width="650" height="350" />',
                        },
                      },
                      {
                        body: {
                          value: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>',
                          editable:
                            '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>',
                        },
                        title: {
                          value: 'Second slide label',
                          editable: 'Second slide label',
                        },
                        image: {
                          value: {
                            src:
                              'http://jssadvancedapp/-/media/JssAdvancedApp/assets/img/portfolio/2.ashx?h=350&amp;la=en&amp;w=650&amp;hash=BB17661D73167EDD997A6996989D97677E7C6062',
                            alt: '',
                            width: '650',
                            height: '350',
                          },
                          editable:
                            '<img src="http://jssadvancedapp/-/media/JssAdvancedApp/assets/img/portfolio/2.ashx?h=350&amp;la=en&amp;w=650&amp;hash=BB17661D73167EDD997A6996989D97677E7C6062" alt="" width="650" height="350" />',
                        },
                      },
                      {
                        body: {
                          value:
                            '<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>',
                          editable:
                            '<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>',
                        },
                        title: {
                          value: 'Third slide label',
                          editable: 'Third slide label',
                        },
                        image: {
                          value: {
                            src:
                              'http://jssadvancedapp/-/media/JssAdvancedApp/assets/img/portfolio/3.ashx?h=350&amp;la=en&amp;w=650&amp;hash=2FEA0ACA02C78CA450F195E520B8C8A38E4F2E93',
                            alt: '',
                            width: '650',
                            height: '350',
                          },
                          editable:
                            '<img src="http://jssadvancedapp/-/media/JssAdvancedApp/assets/img/portfolio/3.ashx?h=350&amp;la=en&amp;w=650&amp;hash=2FEA0ACA02C78CA450F195E520B8C8A38E4F2E93" alt="" width="650" height="350" />',
                        },
                      },
                    ],
                  },
                  attributes: {
                    type: 'data/json',
                  },
                },
              ],
            },
          ],
          name: 'code',
          type: 'data/json',
          contents: null,
          attributes: {
            type: 'data/json',
          },
        },
      ],
    },
  ],
};

/* ************

shaped data

************** */

export const shapedData = {
  sitecore: {
    context: {
      pageEditing: false,
      site: {
        name: 'jssadvancedapp',
      },
      navigation: [
        {
          name: 'Home',
          path: '/',
          children: [
            {
              name: 'About',
              path: '/about',
            },
            {
              name: 'Portfolio',
              path: '/portfolio',
            },
            {
              name: 'Services',
              path: '/services',
            },
          ],
        },
      ],
    },
    route: {
      name: 'portfolio',
      displayName: 'Portfolio',
      fields: {
        metaTitle: {
          value: '',
          editable: '',
        },
      },
      placeholders: [
        {
          name: 'main',
          path: 'main',
          elements: [
            {
              componentName: 'Portfolio',
              renderingName: 'Portfolio',
              renderingParams: {},
              uid: '0a44b6e4-67a9-4e82-8246-a17e048b9eb8',
              placeholders: [
                {
                  name: 'page-header',
                  path: '/main/page-header_0A44B6E4-67A9-4E82-8246-A17E048B9EB8',
                  elements: [
                    {
                      componentName: 'Jumbotron',
                      renderingName: 'Jumbotron',
                      renderingParams: {
                        shade: 'light',
                        titleSize: '2',
                      },
                      uid: '8a0d4795-c7d0-4fec-9369-0b89f3162073',
                      placeholders: [],
                      name: 'code',
                      type: 'data/json',
                      contents: {
                        titleText: {
                          value: 'Portfolio',
                          editable: 'Portfolio',
                        },
                        body: {
                          value: '',
                          editable: '',
                        },
                      },
                      attributes: {
                        type: 'data/json',
                      },
                    },
                  ],
                },
                {
                  name: 'page-content',
                  path: '/main/page-content_0A44B6E4-67A9-4E82-8246-A17E048B9EB8',
                  elements: [
                    {
                      componentName: 'Carousel',
                      renderingName: 'Carousel',
                      renderingParams: {},
                      uid: 'd28a2e1f-866e-475c-9ed6-246ee5cc7aea',
                      placeholders: [],
                      name: 'code',
                      type: 'data/json',
                      contents: {
                        items: [
                          {
                            body: {
                              value:
                                '<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>',
                              editable:
                                '<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>',
                            },
                            title: {
                              value: 'First slide label!',
                              editable: 'First slide label!',
                            },
                            image: {
                              value: {
                                src:
                                  'http://jssadvancedapp/-/media/JssAdvancedApp/assets/img/portfolio/1.ashx?h=350&amp;la=en&amp;w=650&amp;hash=D9645D0B6D48932543B9C64AA0B07A94ECA7CAFC',
                                alt: '',
                                width: '650',
                                height: '350',
                              },
                              editable:
                                '<img src="http://jssadvancedapp/-/media/JssAdvancedApp/assets/img/portfolio/1.ashx?h=350&amp;la=en&amp;w=650&amp;hash=D9645D0B6D48932543B9C64AA0B07A94ECA7CAFC" alt="" width="650" height="350" />',
                            },
                          },
                          {
                            body: {
                              value:
                                '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>',
                              editable:
                                '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>',
                            },
                            title: {
                              value: 'Second slide label',
                              editable: 'Second slide label',
                            },
                            image: {
                              value: {
                                src:
                                  'http://jssadvancedapp/-/media/JssAdvancedApp/assets/img/portfolio/2.ashx?h=350&amp;la=en&amp;w=650&amp;hash=BB17661D73167EDD997A6996989D97677E7C6062',
                                alt: '',
                                width: '650',
                                height: '350',
                              },
                              editable:
                                '<img src="http://jssadvancedapp/-/media/JssAdvancedApp/assets/img/portfolio/2.ashx?h=350&amp;la=en&amp;w=650&amp;hash=BB17661D73167EDD997A6996989D97677E7C6062" alt="" width="650" height="350" />',
                            },
                          },
                          {
                            body: {
                              value:
                                '<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>',
                              editable:
                                '<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>',
                            },
                            title: {
                              value: 'Third slide label',
                              editable: 'Third slide label',
                            },
                            image: {
                              value: {
                                src:
                                  'http://jssadvancedapp/-/media/JssAdvancedApp/assets/img/portfolio/3.ashx?h=350&amp;la=en&amp;w=650&amp;hash=2FEA0ACA02C78CA450F195E520B8C8A38E4F2E93',
                                alt: '',
                                width: '650',
                                height: '350',
                              },
                              editable:
                                '<img src="http://jssadvancedapp/-/media/JssAdvancedApp/assets/img/portfolio/3.ashx?h=350&amp;la=en&amp;w=650&amp;hash=2FEA0ACA02C78CA450F195E520B8C8A38E4F2E93" alt="" width="650" height="350" />',
                            },
                          },
                        ],
                      },
                      attributes: {
                        type: 'data/json',
                      },
                    },
                  ],
                },
              ],
              name: 'code',
              type: 'data/json',
              contents: null,
              attributes: {
                type: 'data/json',
              },
            },
          ],
        },
      ],
    },
  },
};

/* ************

raw single placeholder data

************** */

export const rawPlaceholderData = {
  name: 'main',
  path: 'main',
  elements: [
    {
      componentName: 'Home',
      renderingName: 'Home',
      renderingParams: {},
      uid: '32d8d116-af4d-493d-be2a-b1c346a517e9',
      dataSource: 'test0',
      placeholders: [
        {
          name: 'page-header',
          path: '/main/page-header_32D8D116-AF4D-493D-BE2A-B1C346A517E9',
          elements: [
            {
              componentName: 'Jumbotron',
              renderingName: 'Jumbotron',
              renderingParams: {
                shade: 'dark',
                titleSize: '1',
              },
              uid: '197ff505-a489-44d9-9062-616c258f2385',
              dataSource: 'test1',
              placeholders: [],
              name: 'code',
              type: 'data/json',
              contents: {
                titleText: {
                  value: 'Your Favorite Source of Free Bootstrap Themes!',
                  editable: 'Your Favorite Source of Free Bootstrap Themes!',
                },
                body: {
                  value:
                    '<p>Start Bootstrap can help you build better websites using the Bootstrap CSS framework! Just download your template and start going, no strings attached!</p>',
                  editable:
                    '<p>Start Bootstrap can help you build better websites using the Bootstrap CSS framework! Just download your template and start going, no strings attached!</p>',
                },
              },
              attributes: {
                type: 'data/json',
              },
            },
          ],
        },
        {
          name: 'page-content',
          path: '/main/page-content_32D8D116-AF4D-493D-BE2A-B1C346A517E9',
          elements: [
            {
              renderingName: 'DownloadCallout',
              renderingParams: {},
              uid: '833e8a58-4368-4013-aace-4e79baa56bd9',
              dataSource: 'test2',
              placeholders: [],
              name: 'code',
              type: 'data/json',
              contents: {
                linkText: {
                  value: 'Download',
                  editable: 'Download',
                },
              },
              attributes: {
                type: 'data/json',
              },
            },
          ],
        },
      ],
      name: 'code',
      type: 'data/json',
      contents: null,
      attributes: {
        type: 'data/json',
      },
    },
  ],
};

export const convertedPlaceholderData = {
  name: 'main',
  path: 'main',
  elements: [
    {
      uid: '32d8d116-af4d-493d-be2a-b1c346a517e9',
      dataSource: 'test0',
      componentName: 'Home',
      placeholders: {
        'page-header': [
          {
            uid: '197ff505-a489-44d9-9062-616c258f2385',
            componentName: 'Jumbotron',
            dataSource: 'test1',
            fields: {
              titleText: {
                value: 'Your Favorite Source of Free Bootstrap Themes!',
                editable: 'Your Favorite Source of Free Bootstrap Themes!',
              },
              body: {
                value:
                  '<p>Start Bootstrap can help you build better websites using the Bootstrap CSS framework! Just download your template and start going, no strings attached!</p>',
                editable:
                  '<p>Start Bootstrap can help you build better websites using the Bootstrap CSS framework! Just download your template and start going, no strings attached!</p>',
              },
            },
            params: {
              shade: 'dark',
              titleSize: '1',
            },
            placeholders: {},
          },
        ],
        'page-content': [
          {
            uid: '833e8a58-4368-4013-aace-4e79baa56bd9',
            componentName: 'DownloadCallout',
            dataSource: 'test2',
            fields: {
              linkText: {
                value: 'Download',
                editable: 'Download',
              },
            },
            placeholders: {},
          },
        ],
      },
    },
  ],
};
