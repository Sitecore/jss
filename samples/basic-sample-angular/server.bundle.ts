// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { renderModuleFactory, INITIAL_CONFIG } from '@angular/platform-server';
import { enableProdMode } from '@angular/core';

import { convertRawLayoutData } from '@sitecore-jss/sitecore-jss';

import { join } from 'path';
import { readFileSync } from 'fs';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Our index.html we'll use as our template
const template = readFileSync(join(process.cwd(), 'browser', 'index.html')).toString();

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main.bundle');

const { provideModuleMap } = require('@nguniversal/module-map-ngfactory-loader');

function renderView (callback, path, data, viewBag) {
  /*
    Data from server is double-encoded since MS JSS does not allow control
    over JSON serialization format.
  */
  const parsedData = data instanceof Object ? data : JSON.parse(data);
  const parsedViewBag = viewBag instanceof Object ? viewBag : JSON.parse(viewBag);

  const state = {
    sitecore: {
      context: {
        pageEditing: false
      },
      route: {
        placeholders: {}
      }
    },
    viewBag: {},
  };

  state.viewBag = parsedViewBag;

  if (parsedData) {
    const convertedData = convertRawLayoutData(parsedData);
    state.sitecore = convertedData.sitecore;
  }
  const globalDataScript = `<script>window.__data=${JSON.stringify(state)}</script>`;
  const endBodyTagIndex = template.indexOf('</head>');
  const newTemplate = template.slice(0, endBodyTagIndex) + globalDataScript + template.slice(endBodyTagIndex);

  renderModuleFactory(AppServerModuleNgFactory, {
    // Our index.html
    document: newTemplate,
    url: path,
    // DI so that we can get lazy-loading to work differently (since we need it to just instantly render it)
    extraProviders: [
      provideModuleMap(LAZY_MODULE_MAP),
      { provide: INITIAL_CONFIG, useValue: { document: newTemplate, url: path, SC_CONFIG: state } }
    ]
  }).then(html => {
    callback(null, {
      html: html,
      status: 200,
      redirect: null,
    });
  });
}

module.exports = {
  renderView
};
