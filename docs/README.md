# Docs for Sitecore JSS

# Setup

**First** run `npm i` to install dependencies.

**Second**, if you have not already, install the JSS CLI: `npm install -g @sitecore-jss/sitecore-jss-cli`.

## Development

Use `jss start` to run a local development server. It will start by default on `http://localhost:3001`.

## Contributing

The JSS docs are a JSS site, with a markdown-to-routes parser added. This means the documentation is authored in Markdown, and served via SSR'ed JSS in production using disconnected mode.

* `/data/routes/docs` -> the main documentation content area
* `src/app/Navigation` -> registers the structure of the docs navigation

## Limitations/Known Issues

* **This site is not intended to be deployed to Sitecore and is expected to function in disconnected mode only.**
