// extends the Disconnected Sitecore Layout Service to
// mock custom context navigation data. This mocks the server-side
// navigation extensions added by `AppNavigationProcessor` to LS.
// See the sitecore/config/*.config file for more on the server-side of this.

export function navigationMockContext(request) {
  let navigation = [
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
  ];

  if (request.query.sc_lang && request.query.sc_lang.startsWith('es-mx')) {
    navigation = [
      {
        name: 'Inicio',
        path: '/',
        children: [
          {
            name: 'Acera De',
            path: '/about',
          },
          {
            name: 'Portafolio',
            path: '/portfolio',
          },
          {
            name: 'Servicios',
            path: '/services',
          },
        ],
      },
    ];
  }

  return navigation;
}
