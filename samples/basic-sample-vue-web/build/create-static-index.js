import fsExtra from 'fs-extra';
import path from 'path';
import Vue from 'vue';
import { createRenderer } from 'vue-server-renderer';
import ServerHtml from '../src/app/ServerHtml';

/*
  CREATE STATIC INDEX

  Generates a static index.html file from the site's ServerHtml wrapper component.
  This is used as the HTML shell for client-side rendering.
*/

export function writeIndexFile(outputPath, publicPath) {
  fsExtra.ensureDirSync(outputPath);

  getIndexContents(publicPath)
    .then((html) => {
      fsExtra.writeFileSync(path.join(outputPath, 'index.html'), html);
    })
    .catch((err) => {
      console.error(err);
    });
}

function getIndexContents(publicPath) {
  const serverApp = new Vue({
    render(createElement) {
      return createElement(ServerHtml, { props: { distPath: publicPath } });
    },
  });
  const renderer = createRenderer();

  return new Promise((resolve, reject) => {
    renderer.renderToString(serverApp, (err, html) => {
      if (err) {
        reject(err);
      }
      resolve(html);
    });
  });
}
