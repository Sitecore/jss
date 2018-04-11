// Component that renders the HTML shell around the application
// when rendering on a Node server (SSR) or using webpack-dev-server or a static build

// Note: in certain build scenarios, this file is NOT compiled using webpack loaders.
// Currently, there aren't any great options for compiling single-file components without webpack.
// Therefore this component is written with a render method and JSX.

const ServerHtml = {
  name: 'ServerHtml',
  props: {
    initialState: {
      type: Object,
      default: null,
    },
    distPath: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
  },
  render() {
    return (
      <html>
        <head>
          {/* enable if you require CSS from npm packages <link rel="stylesheet" href={`${distPath}vendor-client.css`} /> */}
          <link rel="stylesheet" href={`${this.distPath}client.css`} />
        </head>
        <body>
          <div id="app" domPropsInnerHTML={this.content} />
          {this.initialState && (
            <script domPropsInnerHTML={`window.__data=${JSON.stringify(this.initialState)};`} />
          )}
          <script src={`${this.distPath}vendor-client.bundle.js`} />
          <script src={`${this.distPath}client.bundle.js`} />
        </body>
      </html>
    );
  },
};

export default ServerHtml;
