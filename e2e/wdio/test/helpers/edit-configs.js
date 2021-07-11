const fs = require('fs');

class EditConfigs {
  editWebConfig(filepath, serverSideRenderingEndpointUrl) {
    let webConfig = fs.readFileSync(filepath, 'utf8');
    let serverSideRenderingEndpoint = webConfig.match(
      /(?<=serverSideRenderingEngineEndpointUrl=")(.*)(?=")/g
    )[0];
    webConfig = webConfig.replace(serverSideRenderingEndpoint, serverSideRenderingEndpointUrl);
    fs.writeFileSync(filepath, webConfig);
  }

  editDotEnv({ filepath, jssEditingSecret, apiKey, graphQLEndpoint, rootItemPath } = {}) {
    let dotEnv = fs.readFileSync(filepath, 'utf8');
    let currentJssEditingSecret = dotEnv.match(/(?<=JSS_EDITING_SECRET=)(.*)(?=)/g);
    dotEnv = dotEnv.replace(
      `JSS_EDITING_SECRET=${currentJssEditingSecret}`,
      `JSS_EDITING_SECRET=${jssEditingSecret}`
    );
    let currentApiKey = dotEnv.match(/(?<=SITECORE_API_KEY=)(.*)(?=)/g);
    dotEnv = dotEnv.replace(`SITECORE_API_KEY=${currentApiKey}`, `SITECORE_API_KEY=${apiKey}`);
    let currentGraphQLEndpoint = dotEnv.match(/(?<=GRAPH_QL_ENDPOINT=)(.*)(?=)/g);
    dotEnv = dotEnv.replace(
      `GRAPH_QL_ENDPOINT=${currentGraphQLEndpoint}`,
      `GRAPH_QL_ENDPOINT=${graphQLEndpoint}`
    );
    let currentRootItemPath = dotEnv.match(/(?<=ROOT_ITEM_PATH=)(.*)(?=)/g);
    if (currentRootItemPath) {
      dotEnv = dotEnv.replace(
        `ROOT_ITEM_PATH=${currentRootItemPath}`,
        `ROOT_ITEM_PATH=${rootItemPath}`
      );
      fs.writeFileSync(filepath, dotEnv);
    } else {
      fs.writeFileSync(filepath, dotEnv);
      fs.appendFileSync(filepath, `\nROOT_ITEM_PATH=${rootItemPath}`);
    }
  }
}
module.exports = new EditConfigs();
