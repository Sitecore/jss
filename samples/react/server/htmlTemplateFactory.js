export function getHtmlTemplate(state) {
  let indexTemplate;
  if (process.env.JSS_RENDER_ENGINE && process.env.JSS_RENDER_ENGINE === 'http') {
    console.log('using jss render host html template');
    indexTemplate = require('../build/index.html');
  } else {
    console.log('using default html template');
    indexTemplate = require('../build/index.html');
  }
  return Promise.resolve(indexTemplate);
}
