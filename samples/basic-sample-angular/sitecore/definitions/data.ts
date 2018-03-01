// You do not have to follow this recipe for route data retrieval.
// This is simply to show that there are many ways to store/retrieve data for routes and for Sitecore manifest generation.
// For instance, you may to wish to have data stored in static files, or in separate .js functions, or whatever...

import { convertRouteToLayoutServiceFormat } from '@sitecore-jss/sitecore-jss';
import { DataModels } from '@sitecore-jss/sitecore-jss/types/customTypes/dataModels';

export const routes: { home: DataModels.LayoutService.RouteData } = {
  home: {
    name: 'home',
    displayName: 'Home', // For Sitecore purposes only, will be used as the DisplayName of the route item
    placeholders: {
      main: [
        {
          componentName: 'Welcome',
          fields: {
            title: {
              value: 'Sitecore Experience Platform + JSS + Angular',
            },
            text: {
              // tslint:disable-next-line:max-line-length
              value: '<p>From a single connected platform that also integrates with other customer-facing platforms, to a single view of the customer in a big data marketing repository, to completely eliminating much of the complexity that has previously held marketers back, the latest version of Sitecore makes customer experience highly achievable. Learn how the latest version of Sitecore gives marketers the complete data, integrated tools, and automation capabilities to engage customers throughout an iterative lifecycle – the technology foundation absolutely necessary to win customers for life.</p><p>For further information, please go to the <a href="https://doc.sitecore.net/" target="_blank" title="Sitecore Documentation site">Sitecore Documentation site</a></p>',
            },
            logoImage: {
              value: {
                src: '/sitecore/assets/sc_logo.png',
                alt: 'Logo'
              },
            },
          }
        }
      ]
    }
  }
};

export const getRouteData = (route) => {
  switch (route) {
    case '/': {
      return convertRouteToLayoutServiceFormat(routes.home);
    }
  }
};
