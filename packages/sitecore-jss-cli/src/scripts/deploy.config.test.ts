/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect } from 'chai';
import sinon from 'sinon';
import { handler } from './deploy.config';
import path from 'path';
import * as resolvePkg from '../resolve-package';
import * as deployTools from '@sitecore-jss/sitecore-jss-dev-tools/dist/cjs/deploy';
import * as verify from '@sitecore-jss/sitecore-jss-dev-tools/dist/cjs/setup/verify-setup';
import * as scJssConfigTool from '@sitecore-jss/sitecore-jss-dev-tools/dist/cjs/resolve-scjssconfig';

describe('deploy.config script', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should call deploy with parsed options', async () => {
    const argv = {
      destination: 'S:/Santiago',
      source: 'F:/Biarritz',
    };
    const expectedOptions = {
      destinationPath: argv.destination,
      sourcePath: argv.source,
      clean: false,
    };
    const deployStub = sinon.stub(deployTools, 'deploy');
    sinon.stub(verify, 'verifySetup');

    await handler(argv);

    expect(deployStub.calledWith(expectedOptions)).to.be.true;
  });

  it('should attempt to resolve destination when not provided', async () => {
    const argv = {
      destination: '',
      source: 'F:/Biarritz',
    };

    const scJssConfig = {
      sitecore: {
        instancePath: 'S:/',
      },
    };
    const packageJson = {
      config: {
        sitecoreConfigPath: 'Santiago',
      },
    };

    const expectedOptions = {
      destinationPath: path.join(
        scJssConfig.sitecore.instancePath,
        packageJson.config.sitecoreConfigPath
      ),
      sourcePath: argv.source,
      clean: false,
    };

    const deployStub = sinon.stub(deployTools, 'deploy');
    sinon.stub(verify, 'verifySetup');
    sinon.stub(scJssConfigTool, 'resolveScJssConfig').resolves(scJssConfig);

    sinon.stub(resolvePkg, 'default').resolves(packageJson);

    await handler(argv);

    expect(deployStub.calledWith(expectedOptions)).to.be.true;
  });
});
