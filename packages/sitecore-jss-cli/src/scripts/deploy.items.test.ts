/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect } from 'chai';
import sinon from 'sinon';
import { handler } from './deploy.items';
import * as resolvePkg from '../resolve-package';
import * as deployTools from '@sitecore-jss/sitecore-jss-dev-tools/dist/cjs/package-deploy';
import * as verify from '@sitecore-jss/sitecore-jss-dev-tools/dist/cjs/setup/verify-setup';
import * as scJssConfigTool from '@sitecore-jss/sitecore-jss-dev-tools/dist/cjs/resolve-scjssconfig';

describe('deploy.items script', () => {
  afterEach(() => {
    sinon.restore();
  });

  const expectedDeployArgs = (argv: any) => ({
    appName: argv.appName,
    packagePath: argv.packageOutputPath,
    importServiceUrl: argv.deployUrl,
    secret: argv.deploySecret,
    debugSecurity: argv.debugSecurity,
    proxy: argv.proxy,
    acceptCertificate: argv.acceptCertificate,
  });

  const packageJson = {
    config: {
      sitecoreConfigPath: 'Santiago',
      sitecoreDistPath: 'C:/SanFrancisco',
      appName: 'jss-unit-package',
      deploySecret: 'you-are-85%-water',
      deployUrl: 'deploy.jss.com',
    },
  };
  const scJssConfig = {
    sitecore: {
      instancePath: 'S:/',
      deploySecret: 'you-are-85%-water',
      deployUrl: 'deploy.jss.com',
    },
  };

  it('should call deployPackage with parsed deployArgs', async () => {
    const argv = {
      appName: 'jss-unit',
      packageOutputPath: 'mock',
      deployUrl: 'customs.jss.com',
      deploySecret: 'snape-kills-dumbledore',
      debugSecurity: true,
      proxy: 'localhost:3000',
      acceptCertificate: 'yes',
      destination: 'S:/Santiago',
      source: 'F:/Biarritz',
      exclude: ['this one', 'that one'],
      clean: false,
      skipPackage: true,
    };

    const deployStub = sinon.stub(deployTools, 'packageDeploy').resolves();
    sinon.stub(verify, 'verifySetup');
    sinon.stub(resolvePkg, 'default').resolves(packageJson);
    sinon.stub(scJssConfigTool, 'resolveScJssConfig').resolves(scJssConfig);

    await handler(argv);

    expect(deployStub.calledWith(expectedDeployArgs(argv))).to.be.true;
  });

  it('should use fallback appName, deploySecret, deployUrl when missing', async () => {
    const argv = {
      packageOutputPath: 'mock',
      debugSecurity: true,
      proxy: 'localhost:3000',
      acceptCertificate: 'yes',
      destination: 'S:/Santiago',
      source: 'F:/Biarritz',
      exclude: ['this one', 'that one'],
      clean: false,
      skipPackage: true,
    };

    const expectedArgs = {
      ...expectedDeployArgs(argv),
      appName: packageJson.config.appName,
      importServiceUrl: scJssConfig.sitecore.deployUrl,
      secret: scJssConfig.sitecore.deploySecret,
    };

    const deployStub = sinon.stub(deployTools, 'packageDeploy').resolves();
    sinon.stub(verify, 'verifySetup');
    sinon.stub(resolvePkg, 'default').resolves(packageJson);
    sinon.stub(scJssConfigTool, 'resolveScJssConfig').resolves(scJssConfig);

    await handler(argv);

    expect(deployStub.calledWith(expectedArgs)).to.be.true;
  });
});
