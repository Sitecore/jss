import { expect } from 'chai';
import sinon from 'sinon';
import chalk from 'chalk';
import nock from 'nock';
import fs from 'fs';
import proxyquire from 'proxyquire';
import * as ts from 'typescript';
import * as cliUtils from './extract-components';
import { constants } from '@sitecore-jss/sitecore-jss-dev-tools';

describe('extract-components', () => {
  afterEach(() => {
    sinon.restore();
    nock.cleanAll();
    process.env.M2M_CLIENT_ID = undefined;
    process.env.M2M_CLIENT_SECRET = undefined;
    process.env.M2M_AUDIENCE = undefined;
  });

  describe('handler', () => {
    it('should log when bearer is empty', async () => {
      const consoleErrorStub = sinon.stub(console, 'error');
      const resolveImportFilesStub = sinon.stub().resolves(['/path/to/component.ts']);
      const fetchBearerTokenStub = sinon.stub().resolves(null);

      sinon.replace(cliUtils, 'resolveImportFiles', resolveImportFilesStub);
      sinon.replace(cliUtils, 'fetchBearerToken', fetchBearerTokenStub);

      await cliUtils.handler({ appFolder: '/path/to/app' });

      expect(consoleErrorStub.calledOnce).to.be.true;
      expect(consoleErrorStub.firstCall.args[0]).to.equal(
        chalk.red('Failed to get bearer token, aborting code extraction')
      );
    });

    it('should catch exceptions from resolveImportFiles call', async () => {
      const consoleErrorStub = sinon.stub(console, 'error');
      const resolveImportFilesStub = sinon.stub().throws(new Error('resolveImportFiles error'));
      const fetchBearerTokenStub = sinon.stub().resolves('test-token');

      sinon.replace(cliUtils, 'resolveImportFiles', resolveImportFilesStub);
      sinon.replace(cliUtils, 'fetchBearerToken', fetchBearerTokenStub);

      await cliUtils.handler({ appFolder: '/path/to/app' });

      expect(consoleErrorStub.calledOnce).to.be.true;
      expect(consoleErrorStub.firstCall.args[0]).to.equal(
        chalk.red('Error during component extraction:')
      );
      expect(consoleErrorStub.firstCall.args[1].message).to.equal('resolveImportFiles error');
    });
  });

  describe('fetchBearerToken', () => {
    it('should send POST request to M2M_ENDPOINT url', async () => {
      nock('https://auth-staging-1.sitecore-staging.com')
        .post('/oauth/token')
        .reply(200, {
          token_type: 'Bearer',
          access_token: 'correct-token',
          expires_in: 3600,
          refresh_token: '******',
          scope: '*******',
        });

      nock('https://auth-staging-1.sitecore-staging.com')
        .intercept('/.*/', '*')
        .reply(200, {
          token_type: 'Bearer',
          access_token: 'incorrect-token',
          expires_in: 3600,
          refresh_token: '******',
          scope: '*******',
        });

      const token = await cliUtils.fetchBearerToken();

      expect(token).to.equal('correct-token');
    });

    it('should use client_id, client_secret and audience values from process.env', async () => {
      process.env.M2M_CLIENT_ID = 'test-client-id';
      process.env.M2M_CLIENT_SECRET = 'test-client-secret';
      process.env.M2M_AUDIENCE = 'test-audience';

      nock('https://auth-staging-1.sitecore-staging.com')
        .post(
          '/oauth/token',
          (body) =>
            body.client_id === 'test-client-id' &&
            body.client_secret === 'test-client-secret' &&
            body.audience === 'test-audience'
        )
        .reply(200, {
          token_type: 'Bearer',
          access_token: 'correct-token',
          expires_in: 3600,
          refresh_token: '******',
          scope: '*******',
        });

      nock('https://auth-staging-1.sitecore-staging.com')
        .intercept('/.*/', '*')
        .reply(200, {
          token_type: 'Bearer',
          access_token: 'incorrect-token',
          expires_in: 3600,
          refresh_token: '******',
          scope: '*******',
        });

      const token = await cliUtils.fetchBearerToken();

      expect(token).to.equal('correct-token');
    });

    it('should log when request to M2M_ENDPOINT fails', async () => {
      nock('https://auth-staging-1.sitecore-staging.com')
        .post('/oauth/token')
        .reply(503, 'Service Unavailable');
      const consoleErrorStub = sinon.stub(console, 'error');
      const token = await cliUtils.fetchBearerToken();

      expect(token).to.be.null;
      expect(consoleErrorStub.calledOnce).to.be.true;
      expect(consoleErrorStub.firstCall.args[0]).to.equal(
        chalk.red(
          // eslint-disable-next-line
          `Error authenticating with M2M token endpoint: SyntaxError: Unexpected token 'S', "Service Unavailable" is not valid JSON`
        )
      );
    });
  });

  describe('sendCode', () => {
    const meshEndpoint = constants.SITECORE_EDGE_URL_DEFAULT;

    it('should read file from componentPath and send code to meshEndpoint', async () => {
      const componentPath = '/path/to/component.ts';
      const token = 'test-token';
      const fileContent = 'export const test = () => {};';

      sinon
        .stub(fs, 'existsSync')
        .withArgs(componentPath)
        .returns(true);
      sinon
        .stub(fs, 'readFileSync')
        .withArgs(componentPath)
        .returns(fileContent);

      nock(meshEndpoint)
        .post('/api/v1/mesh', fileContent)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(200);

      const consoleLogStub = sinon.stub(console, 'log');

      await cliUtils.sendCode(componentPath, token);

      expect(consoleLogStub.calledOnce).to.be.true;
      expect(consoleLogStub.firstCall.args[0]).to.equal(
        chalk.green('Code extracted and sent to mesh')
      );
    });

    it('should log when componentPath file is not found', async () => {
      const componentPath = '/path/to/nonexistent-component.ts';
      const token = 'test-token';

      sinon
        .stub(fs, 'existsSync')
        .withArgs(componentPath)
        .returns(false);

      const consoleErrorStub = sinon.stub(console, 'error');

      await cliUtils.sendCode(componentPath, token);

      expect(consoleErrorStub.calledOnce).to.be.true;
      expect(consoleErrorStub.firstCall.args[0]).to.equal(
        chalk.red(`Component file not found: ${componentPath}`)
      );
    });

    it('should log when meshEndpoint returns an error', async () => {
      const componentPath = '/path/to/component.ts';
      const token = 'test-token';
      const fileContent = 'export const test = () => {};';

      sinon
        .stub(fs, 'existsSync')
        .withArgs(componentPath)
        .returns(true);
      sinon
        .stub(fs, 'readFileSync')
        .withArgs(componentPath)
        .returns(fileContent);

      nock(meshEndpoint)
        .post('/api/v1/mesh', fileContent)
        .matchHeader('Authorization', `Bearer ${token}`)
        .reply(500, 'Internal Server Error');

      const consoleErrorStub = sinon.stub(console, 'error');

      await cliUtils.sendCode(componentPath, token);

      expect(consoleErrorStub.calledOnce).to.be.true;
      expect(consoleErrorStub.firstCall.args[0]).to.equal(
        chalk.red('Failed to send extracted code: Internal Server Error')
      );
    });
  });

  describe('resolveImportFiles', () => {
    it('should throw when tsconfig.json is not found under baseApp path', () => {
      const appPath = '/path/to/app';
      const readConfigFileStub = sinon.stub().returns({ error: { messageText: 'File not found' } });
      proxyquire('./extract-components', {
        typescript: {
          readConfigFile: readConfigFileStub,
        },
      });

      expect(() => cliUtils.resolveImportFiles(appPath)).to.throw(
        Error,
        // eslint-disable-next-line
        `Error reading tsconfig.json from JSS app root: Cannot read file 'C:\\path\\to\\app\\tsconfig.json'`
      );
    });

    it('should throw when src/temp/componentBuilder.ts is not found', () => {
      const appPath = '/path/to/app';

      const readConfigFileStub = sinon.stub().returns({ config: { compilerOptions: {} } });
      const createCompilerHostStub = sinon.stub().returns(({
        getSourceFile: sinon.stub().returns(undefined),
      } as unknown) as ts.CompilerHost);

      proxyquire('./extract-components', {
        typescript: {
          readConfigFile: readConfigFileStub,
          createCompilerHost: createCompilerHostStub,
        },
      });

      expect(() => cliUtils.resolveImportFiles(appPath)).to.throw(
        ReferenceError,
        'Failed to find file /path/to/app/src/temp/componentBuilder.ts'
      );
    });

    it('should throw when componentBuilder.ts file cannot be parsed by typescript', () => {
      const appPath = '/path/to/app';
      const componentBuilderPath = '/path/to/app/src/temp/componentBuilder.ts';
      const readConfigFileStub = sinon.stub().returns({ config: { compilerOptions: {} } });
      proxyquire('./extract-components', {
        typescript: {
          readConfigFile: readConfigFileStub,
        },
      });
      const tsHostStub = {
        getSourceFile: sinon.stub().callsFake((fileName, _, onError) => {
          if (fileName === componentBuilderPath) {
            onError('Parsing error');
          }
          return undefined;
        }),
      };
      sinon.stub(ts, 'createCompilerHost').returns((tsHostStub as unknown) as ts.CompilerHost);

      expect(() => cliUtils.resolveImportFiles(appPath)).to.throw(
        Error,
        `Failed to parse ${componentBuilderPath}: Parsing error`
      );
    });

    it('should return imports with absolute paths from componentBuilder.ts', () => {
      const appPath = '/path/to/app';
      const tsConfig = { compilerOptions: {} };
      const sourceFileStub = {
        forEachChild: (callback: (node: ts.Node) => void) => {
          callback(({
            kind: ts.SyntaxKind.ImportDeclaration,
            // eslint-disable-next-line
            moduleSpecifier: { getText: () => "'./components/ComponentA'" },
          } as unknown) as ts.Node);
          callback(({
            kind: ts.SyntaxKind.ImportDeclaration,
            // eslint-disable-next-line
            moduleSpecifier: { getText: () => "'./components/ComponentB'" },
          } as unknown) as ts.Node);
        },
      };

      const readConfigFileStub = sinon.stub().returns({ config: tsConfig });
      proxyquire('./extract-components', {
        typescript: {
          readConfigFile: readConfigFileStub,
        },
      });
      const tsHostStub = {
        getSourceFile: sinon.stub().returns((sourceFileStub as unknown) as ts.SourceFile),
      };
      sinon.stub(ts, 'createCompilerHost').returns((tsHostStub as unknown) as ts.CompilerHost);
      sinon.stub(ts, 'nodeModuleNameResolver').callsFake((moduleName) => {
        return {
          resolvedModule: { extension: 'ts', resolvedFileName: `/absolute/path/to/${moduleName}` },
        };
      });

      const imports = cliUtils.resolveImportFiles(appPath);

      expect(imports).to.deep.equal([
        '/absolute/path/to/./components/ComponentA',
        '/absolute/path/to/./components/ComponentB',
      ]);
    });

    it('should ignore imports starting with "node:" and containing "node_modules"', () => {
      const appPath = '/path/to/app';
      const tsConfig = { compilerOptions: {} };
      const sourceFileStub = {
        forEachChild: (callback: (node: ts.Node) => void) => {
          callback(({
            kind: ts.SyntaxKind.ImportDeclaration,
            // eslint-disable-next-line
            moduleSpecifier: { getText: () => "'node:fs'" },
          } as unknown) as ts.Node);
          callback(({
            kind: ts.SyntaxKind.ImportDeclaration,
            // eslint-disable-next-line
            moduleSpecifier: { getText: () => "'/node_modules/some-package'" },
          } as unknown) as ts.Node);
          callback(({
            kind: ts.SyntaxKind.ImportDeclaration,
            // eslint-disable-next-line
            moduleSpecifier: { getText: () => "'./components/ComponentA'" },
          } as unknown) as ts.Node);
        },
      };

      const readConfigFileStub = sinon.stub().returns({ config: tsConfig });
      proxyquire('./extract-components', {
        typescript: {
          readConfigFile: readConfigFileStub,
        },
      });
      const tsHostStub = {
        getSourceFile: sinon.stub().returns((sourceFileStub as unknown) as ts.SourceFile),
      };
      sinon.stub(ts, 'createCompilerHost').returns((tsHostStub as unknown) as ts.CompilerHost);
      sinon.stub(ts, 'nodeModuleNameResolver').callsFake((moduleName) => {
        return {
          resolvedModule: { extension: 'ts', resolvedFileName: `/absolute/path/to/${moduleName}` },
        };
      });

      const imports = cliUtils.resolveImportFiles(appPath);

      expect(imports).to.deep.equal(['/absolute/path/to/./components/ComponentA']);
    });
  });
});
