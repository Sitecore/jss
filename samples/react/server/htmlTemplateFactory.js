export function getHtmlTemplate(state) {
  let indexTemplate;
  if (process.env.JSS_RENDER_ENGINE && process.env.JSS_RENDER_ENGINE === 'http') {
    indexTemplate = require('../build/index.html');
  } else {
    indexTemplate = require('../build/index.html');
  }
  return Promise.resolve(indexTemplate);
}
