/* eslint-disable no-throw-literal */
import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';
import matter from 'gray-matter';
import { mergeFs } from '@sitecore-jss/sitecore-jss-dev-tools';
import {
  addRoute,
  addRouteType,
  SitecoreIcon,
  CommonFieldTypes,
} from '@sitecore-jss/sitecore-jss-manifest';
import showdown from 'showdown';

const routeTypeName = 'Docs Route';

const ensureLeadingCharacter = (val, char = '/') => {
  if (!val) {
    return char;
  }
  return val.indexOf(char) > 0 ? `${char}${val}` : val;
};

export default function(manifest) {
  addRouteType(manifest, {
    name: routeTypeName,
    icon: SitecoreIcon.DocumentHeart,
    fields: [
      {
        name: 'title',
        displayName: 'Page Title',
        type: CommonFieldTypes.SingleLineText,
      },
      {
        name: 'editLink',
        type: CommonFieldTypes.GeneralLink,
      },
    ],
  });

  return mergeFs('./data/routes', (path, contents) => {
    if (path.endsWith('.md')) {
      return { markdown: contents };
    }
    return null;
  })
    .then((result) => convertToRoutes({ data: result, language: manifest.language }))
    .then((routeData) => {
      addRoute(manifest, routeData);
    });
}

const parseRouteData = (sourceRouteData, file) => {
  if (!sourceRouteData) {
    throw `sourceRouteData is undefined while processing '${file}'`;
  }

  const parsedMatter = matter(sourceRouteData);

  const markdownContent = parsedMatter.content;
  if (!markdownContent) {
    throw `unable to parse markdown content for '${file}'`;
  }

  const converter = new showdown.Converter();
  converter.setOption('tables', true);
  converter.setOption('ghCompatibleHeaderId', true);
  converter.setOption('disableForced4SpacesIndentedSublists', true);
  const htmlContent = converter.makeHtml(markdownContent);

  const name = parsedMatter.data.name;
  if (!name) {
    throw `name is undefined on '${file}'`;
  }

  const routeTemplate = parsedMatter.data.routeTemplate;
  if (!routeTemplate) {
    throw `routeTemplate is undefined on '${file}'`;
  }
  if (!fs.existsSync(routeTemplate)) {
    throw `Specified routeTemplate doesn't exist: '${routeTemplate}'`;
  }
  const template = fs.readFileSync(routeTemplate, 'utf8');
  const routeData = yaml.safeLoad(template);

  const tokenReplacements = new Map();
  tokenReplacements.set('$name$', name);
  tokenReplacements.set('$html$', htmlContent);

  processTokenReplacements(routeData, tokenReplacements);

  if (parsedMatter.data.title) {
    routeData.fields.title.value = parsedMatter.data.title;

    const rootPath = path.resolve(path.join(__dirname, '..', '..'));
    const relativePath = path.relative(rootPath, file).replace(/\\/g, '/');
    routeData.fields.editLink = {
      text: 'Edit this on GitHub',
      href: `https://github.com/Sitecore/jss/edit/release/18.0.0/docs/${relativePath}`,
    };
  }

  return routeData;
};

const processTokenReplacements = (obj, replaceMap) => {
  for (var k in obj) {
    if (typeof obj[k] == 'object' && obj[k] !== null) {
      processTokenReplacements(obj[k], replaceMap);
    } else {
      for (const [key, value] of replaceMap.entries()) {
        obj[k] = obj[k].replace(key, value);
      }
    }
  }
};

const convertToRoutes = ({ data, language }) => {
  const itemPath = ensureLeadingCharacter(data.path.replace(/\\/g, '/'), '/');
  const name = itemPath.substr(itemPath.lastIndexOf('/') + 1);

  // assume it's a folder if we don't find an item file
  let result = {
    path: itemPath,
    name: name,
    displayName: name,
    template: 'Folder',
    children: [],
  };

  const match = new RegExp(`^${language}\\.(yaml|yml|md|json)$`, 'i');
  const file = data.files.find((f) => match.test(f.filename));

  if (file && file.contents) {
    const extension = file.path ? path.extname(file.path) : undefined;
    const markdown = file.contents.markdown;
    if (extension.toLowerCase() === '.md' && markdown) {
      result = parseRouteData(markdown, file.path);
    } else {
      result = file.contents;
    }

    result.template = routeTypeName;
  }

  if (result && data.folders.length > 0) {
    result.children = data.folders
      .map((folder) => convertToRoutes({ data: folder, language }))
      .filter((route) => route); // remove null results
  }

  return result;
};
