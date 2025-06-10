import { expect } from 'chai';
import sinon from 'sinon';
import chalk from 'chalk';
import * as path from 'path';
import nock from 'nock';
import fs from 'fs';
import * as codegenUtils from './utils';
import { constants } from '@sitecore-jss/sitecore-jss';

describe('codegen-utils', () => {
  const sandbox = sinon.createSandbox();
  afterEach(() => {
    sandbox.restore();
    nock.cleanAll();
  });

  describe('sendCode', () => {
    const meshEndpoint = constants.SITECORE_EDGE_URL_DEFAULT;
    const componentName = 'component';

    it('should read file from componentPath and send code to meshEndpoint', async () => {
      const componentPath = '/path/to/component.ts';
      const token = 'test-token';
      const fileContent = 'export const test = () => {};';

      sandbox
        .stub(fs, 'existsSync')
        .withArgs(componentPath)
        .returns(true);
      sandbox
        .stub(fs, 'readFileSync')
        .withArgs(componentPath)
        .returns(fileContent);

      const file = {
        name: componentName,
        path: componentPath,
        type: codegenUtils.ExtractedFileType.Component,
      };

      nock(meshEndpoint)
        .post(
          '/api/v1/contentsdk/code/extracted',
          JSON.stringify({
            EnvironmentId: 'JSS',
            name: file.name,
            content: fileContent,
            labels: {
              type: file.type,
            },
          })
        )
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200);

      const result = await codegenUtils.sendCode(file, token);

      expect(result).to.equal(componentPath);
    });

    it('should log when componentPath file is not found', async () => {
      const componentPath = '/path/to/nonexistent-component.ts';
      const token = 'test-token';

      sandbox
        .stub(fs, 'existsSync')
        .withArgs(componentPath)
        .returns(false);

      const consoleErrorStub = sandbox.stub(console, 'error');

      const file = {
        name: componentName,
        path: componentPath,
        type: codegenUtils.ExtractedFileType.Component,
      };

      await codegenUtils.sendCode(file, token);

      expect(consoleErrorStub.calledOnce).to.be.true;
      expect(consoleErrorStub.firstCall.args[0]).to.equal(
        chalk.red(`File planned for code extraction not found: ${componentPath}`)
      );
    });

    it('should log when meshEndpoint returns an error', async () => {
      const componentPath = '/path/to/component.ts';
      const token = 'test-token';
      const fileContent = 'export const test = () => {};';

      const file = {
        name: componentName,
        path: componentPath,
        type: codegenUtils.ExtractedFileType.Component,
      };

      sandbox
        .stub(fs, 'existsSync')
        .withArgs(componentPath)
        .returns(true);
      sandbox
        .stub(fs, 'readFileSync')
        .withArgs(componentPath)
        .returns(fileContent);

      nock(meshEndpoint)
        .post(
          '/api/v1/contentsdk/code/extracted',
          JSON.stringify({
            EnvironmentId: 'JSS',
            name: file.name,
            content: fileContent,
            labels: {
              type: file.type,
            },
          })
        )
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(500, 'Internal Server Error');

      const consoleErrorStub = sandbox.stub(console, 'error');

      await codegenUtils.sendCode(file, token);

      expect(consoleErrorStub.calledOnce).to.be.true;
      expect(consoleErrorStub.firstCall.args[0]).to.equal(
        chalk.red('Failed to send extracted code from /path/to/component.ts: Internal Server Error')
      );
    });
  });

  describe('resolveComponentImportFiles', () => {
    it('should throw when tsconfig.json is not found under baseApp path', () => {
      const appPath = './path/to/app/that/not/exist';

      expect(() => codegenUtils.resolveComponentImportFiles(appPath)).to.throw(
        Error,
        // eslint-disable-next-line
        `Error reading tsconfig.json from JSS app root: Cannot read file '${path.resolve(
          process.cwd(),
          './path/to/app/that/not/exist/tsconfig.json'
        )}'`
      );
    });

    it('should throw when src/temp/componentBuilder.ts is not found', () => {
      const appPath = './src/test-data/extract-components/no-componentBuilder';
      const appRoot = process.cwd();
      const expectedPath = path.resolve(
        appRoot,
        './src/test-data/extract-components/no-componentBuilder/src/temp/componentBuilder.ts'
      );
      expect(() => codegenUtils.resolveComponentImportFiles(appPath)).to.throw(
        ReferenceError,
        `Failed to find file ${expectedPath}`
      );
    });

    it('should accept custom componentBuilder path and work with js', () => {
      const appPath = './src/test-data/extract-components/regular-imports';
      const builderPath = './src/non-standard-path/componentBuilder.js';
      const imports = codegenUtils.resolveComponentImportFiles(appPath, builderPath);
      expect(Array.from(imports)).to.deep.equal([
        [
          'TestComponentNonStandard',
          path.resolve(
            process.cwd(),
            './src/test-data/extract-components/regular-imports/src/components/TestComponent.tsx'
          ),
        ],
      ]);
    });

    it('should return TS imports with absolute paths from componentBuilder.ts', () => {
      const appPath = './src/test-data/extract-components/regular-imports';

      const imports = codegenUtils.resolveComponentImportFiles(appPath);
      expect(Array.from(imports)).to.deep.equal([
        [
          'TestComponent',
          path.resolve(
            process.cwd(),
            './src/test-data/extract-components/regular-imports/src/components/TestComponent.tsx'
          ),
        ],
      ]);
    });

    it('should return JS imports with absolute paths from componentBuilder.ts', () => {
      const appPath = './src/test-data/extract-components/js-imports';

      const imports = codegenUtils.resolveComponentImportFiles(appPath);
      expect(Array.from(imports)).to.deep.equal([
        [
          'TestComponent',
          path.resolve(
            process.cwd(),
            './src/test-data/extract-components/js-imports/src/components/TestComponent.jsx'
          ),
        ],
      ]);
    });

    it('should return imports with absolute paths from componentBuilder.ts with named imports', () => {
      const appPath = './src/test-data/extract-components/named-imports';

      const imports = codegenUtils.resolveComponentImportFiles(appPath);
      expect(Array.from(imports)).to.deep.equal([
        [
          'TestComponent',
          path.resolve(
            process.cwd(),
            './src/test-data/extract-components/named-imports/src/components/TestComponent.tsx'
          ),
        ],
        [
          'Component1',
          path.resolve(
            process.cwd(),
            './src/test-data/extract-components/named-imports/src/components/TestComponent2.tsx'
          ),
        ],
        [
          'Component2',
          path.resolve(
            process.cwd(),
            './src/test-data/extract-components/named-imports/src/components/TestComponent2.tsx'
          ),
        ],
      ]);
    });

    it('should return imports with absolute paths from componentBuilder.ts when paths aliases are used', () => {
      const appPath = './src/test-data/extract-components/with-path-aliases';

      const imports = codegenUtils.resolveComponentImportFiles(appPath);

      expect(Array.from(imports)).to.deep.equal([
        [
          'TestComponent',
          path.resolve(
            process.cwd(),
            './src/test-data/extract-components/with-path-aliases/src/components/TestComponent.tsx'
          ),
        ],
      ]);
    });

    it('should ignore imports starting with "node:" and containing "node_modules"', () => {
      const appPath = './src/test-data/extract-components/node-modules-imports';

      const imports = codegenUtils.resolveComponentImportFiles(appPath);

      expect(Array.from(imports)).to.deep.equal([
        [
          'TestComponent',
          path.resolve(
            process.cwd(),
            './src/test-data/extract-components/node-modules-imports/src/components/TestComponent.tsx'
          ),
        ],
      ]);
    });
  });

  describe('validateConsent', () => {
    it('should return false when EXTRACT_CONSENT is set to false', () => {
      process.env.EXTRACT_CONSENT = 'false';
      expect(codegenUtils.validateConsent()).to.be.false;
    });

    it('should return true when EXTRACT_CONSENT is set to true', () => {
      process.env.EXTRACT_CONSENT = 'true';

      expect(codegenUtils.validateConsent()).to.be.true;
    });
  });

  describe('validateDeployContext', () => {
    afterEach(() => {
      delete process.env.NETLIFY;
      delete process.env.VERCEL;
      delete process.env.SITECORE;
      delete process.env.BUILD_ID;
      delete process.env.VERCEL_REGION;
      delete process.env.SITECORE_BUILD;
    });

    it('should return true when in Netlify build context', () => {
      process.env.NETLIFY = 'true';
      process.env.BUILD_ID = '12345';
      const result = codegenUtils.validateDeployContext();
      expect(result).to.be.true;
    });
    it('should return true when in Vercel build context', () => {
      process.env.VERCEL = 'true';
      const result = codegenUtils.validateDeployContext();
      expect(result).to.be.true;
    });
    it('should return false in Vercel runtime', () => {
      process.env.VERCEL = 'true';
      process.env.VERCEL_REGION = 'region';
      expect(codegenUtils.validateDeployContext()).to.be.false;
    });

    it('should return true when in Sitecore build context', () => {
      process.env.SITECORE = 'true';
      process.env.SITECORE_BUILD = 'true';

      const result = codegenUtils.validateDeployContext();

      expect(result).to.be.true;
    });

    it('should return false when not in a recognized build context', () => {
      expect(codegenUtils.validateDeployContext()).to.be.false;
    });
  });
});
