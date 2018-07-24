import fsExtra from 'fs-extra';
import path from 'path';

/*
  CREATE STATIC INDEX

  Generates a static index.html file from the site's ServerHtml wrapper component.
  This is used as the HTML shell for client-side rendering.
*/

export function writeIndexFile(outputPath, publicPath, bodyContents) {
  fsExtra.ensureDirSync(outputPath);

  fsExtra.writeFileSync(
    path.join(outputPath, 'index.html'),
    getIndexContents(publicPath, bodyContents)
  );
}

function getIndexContents(publicPath, bodyContents) {
  const output = `
    <html>
      <head>
        <link rel="stylesheet" href="/assets/css/catalog-theme.css" />
        <link rel="stylesheet" href="${publicPath}client.css" />
      </head>
      <body>
        ${bodyContents}
        <script src="${publicPath}vendor-client.bundle.js"></script>
        <script src="${publicPath}client.bundle.js"></script>
      </body>
    </html>`;
  return output;
}
