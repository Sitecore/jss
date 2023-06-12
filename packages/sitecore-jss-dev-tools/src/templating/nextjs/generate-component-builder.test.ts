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
      const outputPath = 'src/foo/componentBuilder.ts';
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
      const expectedOutput = [
        '/* eslint-disable */\n',
        '// Do not edit this file, it is auto-generated at build time!\n',
        '// See scripts/generate-component-builder/index.ts to modify the generation of this file.\n\n\n',
        "import { ComponentBuilder } from '@sitecore-jss/sitecore-jss-nextjs';\n\n",
        "import { Foo } from 'custom-module'\n",
        "import * as barModule from 'bar';\n\n",
        'const components = new Map();\n',
        "components.set('Foo', Foo)\n",
        "components.set('BarComponent', barModule);\n\n",
        'export const componentBuilder = new ComponentBuilder({ components });\n\n',
        'export const moduleFactory = componentBuilder.getModuleFactory();\n',
      ].join('');

      generateComponentBuilder({
        componentRootPath: componentsPath,
        componentBuilderOutputPath: outputPath,
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

      expect(
        writeFileStub.calledWith(outputPath, expectedOutput, {
          encoding: 'utf8',
        })
      ).to.be.true;
    });

    it('dynamic components', () => {
      const componentsPath = 'src/components';
      const outputPath = 'src/foo/componentBuilder.ts';
      const writeFileStub = sinon.stub(fs, 'writeFileSync');
      const getComponentStub = sinon.stub(componentUtils, 'getComponentList');
      const components: ComponentFile[] = [
        {
          path: 'bar',
          moduleName: 'barModule',
          componentName: 'BarComponent',
        },
        {
          path: 'car.dynamic',
          moduleName: 'carModule',
          componentName: 'CarComponent',
        },
      ];
      getComponentStub.withArgs(componentsPath).returns(components);
      sinon.stub(path, 'resolve').callsFake((path) => path);
      const expectedOutput = [
        '/* eslint-disable */\n',
        '// Do not edit this file, it is auto-generated at build time!\n',
        '// See scripts/generate-component-builder/index.ts to modify the generation of this file.\n\n',
        "import dynamic from 'next/dynamic';\n",
        "import { ComponentBuilder } from '@sitecore-jss/sitecore-jss-nextjs';\n\n",
        "import { Foo } from 'custom-module'\n",
        "import * as barModule from 'bar';\n",
        'const carModule = {\n',
        "  module: () => import('car.dynamic'),\n",
        "  element: (isEditing?: boolean) => isEditing ? require('car.dynamic')?.default : dynamic(carModule.module)\n",
        '}\n\n',
        'const components = new Map();\n',
        "components.set('Foo', Foo)\n",
        "components.set('BarComponent', barModule);\n",
        "components.set('CarComponent', carModule);\n\n",
        'export const componentBuilder = new ComponentBuilder({ components });\n\n',
        'export const moduleFactory = componentBuilder.getModuleFactory();\n',
      ].join('');

      generateComponentBuilder({
        componentRootPath: componentsPath,
        componentBuilderOutputPath: outputPath,
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

      expect(
        writeFileStub.calledWith(outputPath, expectedOutput, {
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
