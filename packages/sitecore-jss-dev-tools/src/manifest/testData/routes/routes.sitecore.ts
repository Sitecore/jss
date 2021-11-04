import { Manifest } from './../../../index';
import json from './children.json';
import data from './route';

export default (manifest: Manifest) => {
  json.children = [data];
  manifest.addRoute(json);
};
