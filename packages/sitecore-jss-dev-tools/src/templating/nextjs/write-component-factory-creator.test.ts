/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-unused-expressions */
/* eslint-disable quotes */
import sinon from 'sinon';
import fs from 'fs';
import path from 'path';
import * as utils from './component-factory-utils';
import * as commonUtils from '../utils';
import { expect } from 'chai';
import {
  writeComponentFactory,
  writeComponentFactoryCreator,
  writeProjectComponents,
} from './write-component-factory-creator';
import { projectsOutputPath } from './constants';
import { ComponentFile, PackageDefinition, Project } from '../types';

describe('writeComponentFactoryCreator', () => {
  afterEach(() => {
    sinon.restore();
  });

  const customPackages = [
    {
      name: 'myPackage',
      components: [
        {
          componentName: 'myComponent',
          moduleName: 'myModule',
        },
      ],
    },
  ];

  describe('writeComponentFactory', () => {
    afterEach(() => {
      sinon.restore();
    });

    it('should write component factory to file', () => {
      const writeFileStub = sinon.stub(fs, 'writeFileSync');
      sinon.stub(path, 'resolve').callsFake((path) => path);
      const projects: Project[] = [];
      const expectedOutput = [
        `/* eslint-disable */\n// Do not edit this file, it is auto-generated at build time!\n`,
        `// See scripts/generate-component-factory-creator.ts to modify the generation of this file.\n\n\n`,
        `import { ComponentFactoryCreator } from \'@sitecore-jss/sitecore-jss-nextjs\';\n\n\n`,
        `import { myModule } from \'myPackage\'\n\n\n`,
        `const projects = new Map();  \n\n\n`,
        `const components = new Map();\n`,
        `components.set(\'myComponent\', myModule)\n\n\n`,
        `export const componentFactoryCreator = new ComponentFactoryCreator({ components, projectComponents: projects });\n`,
      ].join('');

      writeComponentFactory(customPackages, projects);

      expect(
        writeFileStub.calledWith('src/temp/componentFactoryCreator.ts', expectedOutput, {
          encoding: 'utf8',
        })
      ).to.be.true;
    });

    it('should write component factory with projects to file', () => {
      const writeFileStub = sinon.stub(fs, 'writeFileSync');
      sinon.stub(path, 'resolve').callsFake((path) => path);
      const packages: PackageDefinition[] = [];
      const projects: Project[] = [
        {
          projectName: 'manhattan',
          componentsPath: 'US/Tennessee/OakRidge',
        },
      ];
      sinon.stub(utils, 'getProjectList').returns([]);
      const expectedOutput = [
        `/* eslint-disable */\n`,
        `// Do not edit this file, it is auto-generated at build time!\n`,
        `// See scripts/generate-component-factory-creator.ts to modify the generation of this file.\n\n\n`,
        `import { ComponentFactoryCreator } from \'@sitecore-jss/sitecore-jss-nextjs\';\n\n`,
        `import * as manhattan from \'./projects/manhattan\';\n\n\n\n`,
        `const projects = new Map();  \n`,
        `projects.set(\'manhattan\', manhattan);\n\n`,
        `const components = new Map();\n\n\n\n`,
        `export const componentFactoryCreator = new ComponentFactoryCreator({ components, projectComponents: projects });\n`,
      ].join('');

      writeComponentFactory(packages, projects);

      expect(
        writeFileStub.calledWith('src/temp/componentFactoryCreator.ts', expectedOutput, {
          encoding: 'utf8',
        })
      ).to.be.true;
    });
  });

  describe('writeProjectComponents', () => {
    it('should write component factory file for project', () => {
      const project: Project = {
        projectName: 'manhattan',
        componentsPath: 'US/Tennessee/OakRidge',
      };
      const projectComponents: ComponentFile[] = [
        {
          path: 'test',
          moduleName: 'manhat',
          componentName: 'topSecret',
        },
      ];

      const getComponentStub = sinon.stub(commonUtils, 'getComponentList');
      getComponentStub.withArgs(project.componentsPath).returns(projectComponents);
      sinon.stub(path, 'resolve').callsFake((path) => path);
      const writeFileStub = sinon.stub(fs, 'writeFileSync');

      const expectedOutput = [
        `/* eslint-disable */\n`,
        `// Do not edit this file, it is auto-generated at build time!\n`,
        `// See scripts/generate-component-factory-creator.ts to modify the generation of this file.\n`,
        `export * as topSecret from \'src/projects/manhattan/components/topSecret\';\n`,
      ].join('');

      writeProjectComponents(project);

      expect(
        writeFileStub.calledWith('src/temp/projects/manhattan.ts', expectedOutput, {
          encoding: 'utf8',
        })
      ).to.be.true;
    });
  });

  it('should create projects folder if not present', () => {
    sinon.stub(fs, 'writeFileSync');
    const existsStub = sinon.stub(fs, 'existsSync').returns(true);
    existsStub.withArgs(projectsOutputPath).returns(false);
    const mkDirStub = sinon.stub(fs, 'mkdirSync');

    sinon.stub(path, 'resolve').callsFake((path) => path);

    sinon.stub(commonUtils, 'getComponentList').returns([]);
    sinon.stub(utils, 'getProjectList').returns([]);

    writeComponentFactoryCreator('src/components', 'src/projects');
    expect(mkDirStub.calledWith(projectsOutputPath)).to.be.true;
  });
});
