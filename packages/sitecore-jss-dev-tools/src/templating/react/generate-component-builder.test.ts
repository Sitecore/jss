/* eslint-disable no-unused-expressions */
/* eslint-disable quotes */
import fs from 'fs';
import path from 'path';
import sinon from 'sinon';
import { expect } from 'chai';
import * as componentUtils from '../components';
import * as commonUtils from '../utils';
import { generateComponentBuilder } from './generate-component-builder';
import { ComponentFile } from '../components';

describe('generate-component-builder', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('generateComponentBuilder', () => {
    afterEach(() => {
      sinon.restore();
    });

    it('default', () => {
      const componentsPath = 'src/components';
      const writeFileStub = sinon.stub(fs, 'writeFileSync');
      const getComponentStub = sinon.stub(componentUtils, 'getComponentList');
      const components: ComponentFile[] = [
        {
          path: 'bar',
          moduleName: 'barModule',
          componentName: 'BarComponent',
        },
      ];
      getComponentStub.withArgs(componentsPath).returns(components);
      sinon.stub(path, 'resolve').callsFake((path) => path);
      sinon.stub(path, 'relative').callsFake((_, path) => path);
      const expectedOutput = [
        '/* eslint-disable */\n' +
          '// Do not edit this file, it is auto-generated at build time!\n' +
          '// See scripts/generate-component-builder/index.js to modify the generation of this file.\n' +
          '\n' +
          "import { ComponentBuilder } from '@sitecore-jss/sitecore-jss-react';\n" +
          "import { Foo } from 'custom-module';\n" +
          '\n' +
          "import barModule from 'bar';\n" +
          '\n' +
          'const components = new Map();\n' +
          "components.set('Foo', Foo);\n" +
          '\n' +
          "components.set('BarComponent', barModule);\n" +
          '\n' +
          'const componentBuilder = new ComponentBuilder({ components });\n' +
          '\n' +
          'export const componentFactory = componentBuilder.getComponentFactory();\n',
      ].join('');

      generateComponentBuilder({
        componentRootPath: componentsPath,
        packages: [
          {
            name: 'custom-module',
            components: [
              {
                componentName: 'Foo',
                moduleName: 'Foo',
              },
            ],
          },
        ],
      });

      expect(writeFileStub.getCall(0).args[1]).to.equal(expectedOutput);

      expect(
        writeFileStub.calledWith('src/temp/componentBuilder.js', expectedOutput, {
          encoding: 'utf8',
        })
      ).to.be.true;
    });

    it('watch', () => {
      const watchItemsStub = sinon.stub(commonUtils, 'watchItems');

      generateComponentBuilder({ watch: true });

      expect(watchItemsStub.calledWith(['src/components'])).to.be.true;
    });
  });
});
