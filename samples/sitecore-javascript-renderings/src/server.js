/** global __BUNDLE_OUTPUT_PATH__ */

import initialState from './boot/initialState';
import { serverRenderer } from './boot/componentServerRenderer';

/*
  Main entry point to the application when run on a Node server.
  The renderComponent() function will be invoked by Sitecore's view engine
  to provide the data to render with.
*/

export function renderComponent(callback, data, viewBag) {
  try {
    // parse the server-provided data for easier consumption.
    const renderContext = parseServerData(data, viewBag);

    const result = { html: null, status: 200, redirect: null };

    result.html = serverRenderer(renderContext.sitecore, renderContext.viewBag);

    callback(null, result);
  } catch (err) {
    // need to ensure the callback is always invoked no matter what
    // or else SSR will hang
    callback(err, null);
  }
}

function parseServerData(data, viewBag) {
  /*
    Data from server is double-encoded since MS JSS does not allow control
    over JSON serialization format.
  */
  const parsedData = data instanceof Object ? data : JSON.parse(data);
  const parsedViewBag = viewBag instanceof Object ? viewBag : JSON.parse(viewBag);

  const state = initialState();
  state.viewBag = parsedViewBag;

  if (parsedData) {
    state.sitecore = parsedData.sitecore;
  }

  return state;
}
