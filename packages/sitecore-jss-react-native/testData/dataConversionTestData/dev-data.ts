export const devRouteData = {
  name: 'portfolio',
  displayName: 'Portfolio',
  fields: {
    metaTitle: {
      value: 'Portfolio',
    },
    titleText: {
      value: 'Portfolio',
    },
    body: {
      value: "You'll be amazed by all our good work.",
    },
  },
  placeholders: {
    main: [
      {
        componentName: 'Portfolio',
        fields: {},
        params: {},
        dataSource: '',
        placeholders: {
          'page-header': [
            {
              componentName: 'Jumbotron',
              dataSource: '',
              params: {
                shade: 'light',
                titleSize: '2',
              },
            },
          ],
          'page-content': [
            {
              componentName: 'Carousel',
              dataSource: '',
              fields: {
                items: [
                  {
                    fields: {
                      image: {
                        value: {
                          src: '/assets/img/portfolio/1.jpg',
                        },
                      },
                      title: {
                        value: 'First slide label!',
                      },
                      body: {
                        value: '<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>',
                      },
                    },
                  },
                  {
                    fields: {
                      image: {
                        value: {
                          src: '/assets/img/portfolio/2.jpg',
                        },
                      },
                      title: {
                        value: 'Second slide label',
                      },
                      body: {
                        value: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>',
                      },
                    },
                  },
                  {
                    fields: {
                      image: {
                        value: {
                          src: '/assets/img/portfolio/3.jpg',
                        },
                      },
                      title: {
                        value: 'Third slide label',
                      },
                      body: {
                        value:
                          '<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>',
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    ],
  },
};

export const convertedDevRouteData = {
  name: 'portfolio',
  displayName: 'Portfolio',
  fields: {
    metaTitle: {
      value: 'Portfolio',
      editable: 'Portfolio',
    },
    body: {
      value: "You'll be amazed by all our good work.",
      editable: "You'll be amazed by all our good work.",
    },
    titleText: {
      value: 'Portfolio',
      editable: 'Portfolio',
    },
  },
  placeholders: {
    main: [
      {
        componentName: 'Portfolio',
        dataSource: '',
        fields: {},
        params: {},
        placeholders: {
          'page-header': [
            {
              componentName: 'Jumbotron',
              dataSource: '',
              params: {
                shade: 'light',
                titleSize: '2',
              },
            },
          ],
          'page-content': [
            {
              componentName: 'Carousel',
              dataSource: '',
              fields: {
                items: [
                  {
                    fields: {
                      image: {
                        value: {
                          src: '/assets/img/portfolio/1.jpg',
                        },
                        editable: '',
                      },
                      title: {
                        value: 'First slide label!',
                        editable: 'First slide label!',
                      },
                      body: {
                        value: '<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>',
                        editable:
                          '<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>',
                      },
                    },
                  },
                  {
                    fields: {
                      image: {
                        value: {
                          src: '/assets/img/portfolio/2.jpg',
                        },
                        editable: '',
                      },
                      title: {
                        value: 'Second slide label',
                        editable: 'Second slide label',
                      },
                      body: {
                        value: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>',
                        editable: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>',
                      },
                    },
                  },
                  {
                    fields: {
                      image: {
                        value: {
                          src: '/assets/img/portfolio/3.jpg',
                        },
                        editable: '',
                      },
                      title: {
                        value: 'Third slide label',
                        editable: 'Third slide label',
                      },
                      body: {
                        value:
                          '<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>',
                        editable:
                          '<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>',
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    ],
  },
};
