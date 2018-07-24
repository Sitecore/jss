// You do not have to follow this recipe for route data retrieval.
// This is simply to show that there are many ways to store/retrieve data for routes and for Sitecore manifest generation.
// For instance, you may to wish to have data stored in static files, or in separate .js functions, or whatever...

/* eslint-disable import/no-extraneous-dependencies */
import { convertRouteToLayoutServiceFormat } from '@sitecore-jss/sitecore-jss-react-native';
// eslint-disable-next-line
import { images } from 'static-assets';
import routeData from '../../data/routes/en.json';
import { mapNestedJson } from './util';

// In react-native, you need to "import" static assets via `require` statements
// When the packager builds your app, it (presumably) statically analyzes your code, extracts
// the assets that are `require`d into an array/map, then assigns them a numerical value.
// This doesn't really work well with "disconnected" JSS data, as the URLs for images are typically relative path strings.
// So, we create an `images` map in the assets folder with statically `require`d images.
// The `mapNestedJson` function traverses route, using `processObjectMember` to modify `src` values with values from the images map.
const processObjectProperty = (key, value) => (key === 'src' ? images[value] : value);

const getRouteData = (route) =>
  new Promise((resolve, reject) => {
    switch (route) {
      case '/': {
        const formattedData = convertRouteToLayoutServiceFormat(routeData);
        resolve(mapNestedJson(formattedData, processObjectProperty));
        break;
      }
      default: {
        reject(new Error(`no data for route "${route}"`));
      }
    }
  });

export { getRouteData };
