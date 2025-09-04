/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect } from 'chai';
import sinon from 'sinon';
import fs from 'fs';
import * as microManifest from './micro-manifest';
import * as resolvePkg from './resolve-package';
import * as manifestHandler from './scripts/manifest';
import * as packageHandler from './scripts/package';

import * as packageDeploy from '@sitecore-jss/sitecore-jss-dev-tools/dist/cjs/package-deploy';
import * as verify from '@sitecore-jss/sitecore-jss-dev-tools/dist/cjs/setup/verify-setup';
import * as resolveJssConfig from '@sitecore-jss/sitecore-jss-dev-tools/dist/cjs/resolve-scjssconfig';
import tmp from 'tmp';
import path from 'path';

describe('micro-manifest script', () => {
  afterEach(() => {
    sinon.restore();
  });

  const packageJson = {
    config: {
      appName: 'jss-unit-package',
    },
  };

  const scJssConfig = {
    sitecore: {
      deploySecret: 'you-are-85%-water',
      deployUrl: 'deploy.jss.com',
    },
  };

  const argv = {
    appName: 'jss-manifest',
    deployUrl: 'customs.jss.com',
    deploySecret: 'snape-kills-dumbledore',
    debugSecurity: true,
    acceptCertificate: 'yes',
  };

  const tmpDirReturnsDefault = {
    err: false,
    tempDir: 'C:/temp',
    cleanupTempDir: sinon.stub(),
  };

  describe('verifyArgs', () => {
    it('should use fallaback for appName, deployUrl, deploySecret, if not proided', async () => {
      const localArgv = {
        ...argv,
        appName: undefined,
        deployUrl: undefined,
        deploySecret: undefined,
      };

      const expectedArgv = {
        ...argv,
        appName: packageJson.config.appName,
        deployUrl: scJssConfig.sitecore.deployUrl,
        deploySecret: scJssConfig.sitecore.deploySecret,
      };

      sinon.stub(verify, 'verifySetup');
      sinon.stub(resolveJssConfig, 'resolveScJssConfig').resolves(scJssConfig);
      sinon.stub(resolvePkg, 'default').resolves(packageJson);
      expect(await microManifest.verifyArgs(localArgv)).to.deep.equal(expectedArgv);
    });
  });

  describe('microManifest', () => {
    it('should create temp directory and finalize manifest creation', async () => {
      const tmpDirReturns = {
        ...tmpDirReturnsDefault,
        cleanUpTempDir: sinon.stub(),
      };

      sinon.stub(resolveJssConfig, 'resolveScJssConfig').resolves(scJssConfig);
      sinon.stub(resolvePkg, 'default').resolves(packageJson);
      const tmpStub = sinon
        .stub(tmp, 'dir')
        .callsArgWith(1, tmpDirReturns.err, tmpDirReturns.tempDir, tmpDirReturns.cleanupTempDir);
      const writeFileStub = sinon.stub(fs, 'writeFileSync');
      sinon.stub(fs, 'existsSync').returns(true);
      const manifestStub = sinon.stub(manifestHandler, 'handler');
      const packageStub = sinon.stub(packageHandler, 'handler');
      const deployStub = sinon.stub(packageDeploy, 'packageDeploy');

      const manifestFolder = path.join(tmpDirReturnsDefault.tempDir, 'manifest');
      const packageDir = path.join(tmpDirReturnsDefault.tempDir, 'package');
      const manifestContents = 'stub';

      const manifestArgs = {
        manifestSourceFiles: [path.join(manifestFolder, 'tempManifestSource.js')],
        manifestOutputPath: path.join(manifestFolder, 'tempManifest.json'),
        noDictionary: true,
        ...argv,
      };

      const packageArgs = {
        skipManifest: true,
        noFiles: true,
        packageOutputPath: path.join(packageDir, 'tempPackage.manifest.zip'),
        ...manifestArgs,
      };

      const deployArgs = {
        appName: argv.appName,
        packagePath: packageArgs.packageOutputPath,
        importServiceUrl: argv.deployUrl,
        secret: argv.deploySecret,
        debugSecurity: argv.debugSecurity,
        acceptCertificate: argv.acceptCertificate,
      };

      await microManifest.default(argv, manifestContents);

      expect(tmpStub.called).to.be.true;
      expect(
        writeFileStub.calledWith(manifestArgs.manifestSourceFiles[0], manifestContents, 'utf8')
      ).to.be.true;
      expect(manifestStub.calledWith(manifestArgs)).to.be.true;
      expect(packageStub.calledWith(packageArgs)).to.be.true;
      expect(deployStub.calledWith(deployArgs)).to.be.true;
      expect(tmpDirReturns.cleanupTempDir.called).to.be.true;
    });
  });
});
