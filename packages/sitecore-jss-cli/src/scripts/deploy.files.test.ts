/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect } from 'chai';
import sinon from 'sinon';
import { handler } from './deploy.files';
import * as resolvePkg from '../resolve-package';
import * as deployTools from '@sitecore-jss/sitecore-jss-dev-tools/dist/cjs/deploy';
import * as verify from '@sitecore-jss/sitecore-jss-dev-tools/dist/cjs/setup/verify-setup';
import * as scJssConfigTool from '@sitecore-jss/sitecore-jss-dev-tools/dist/cjs/resolve-scjssconfig';

describe('deploy.files script', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should call deploy with parsed options', async () => {
    const argv = {
      destination: 'S:/Santiago',
      source: 'F:/Biarritz',
      exclude: ['this one', 'that one'],
      clean: false,
    };
    const expectedOptions = {
      destinationPath: argv.destination,
      sourcePath: argv.source,
      excludeFile: argv.exclude,
      clean: argv.clean,
    };

    const packageJson = {
      config: {
        sitecoreConfigPath: 'Santiago',
        sitecoreDistPath: 'C:/SanFrancisco',
      },
    };
    const deployStub = sinon.stub(deployTools, 'deploy');
    sinon.stub(verify, 'verifySetup');
    sinon.stub(resolvePkg, 'default').resolves(packageJson);

    await handler(argv);

    expect(deployStub.calledWith(expectedOptions)).to.be.true;
  });

  it('should attempt to resolve destination when not provided', async () => {
    const argv = {
      destination: '',
      source: 'F:/Biarritz',
      exclude: ['this one', 'that one'],
      clean: false,
    };
    const expectedOptions = {
      destinationPath: 'S:\\SanFrancisco',
      sourcePath: argv.source,
      excludeFile: argv.exclude,
      clean: false,
    };

    const scJssConfig = {
      sitecore: {
        instancePath: 'S:/',
      },
    };
    const packageJson = {
      config: {
        sitecoreConfigPath: 'Santiago',
        sitecoreDistPath: 'SanFrancisco',
      },
    };
    const deployStub = sinon.stub(deployTools, 'deploy');
    sinon.stub(resolvePkg, 'default').resolves(packageJson);
    sinon.stub(verify, 'verifySetup');
    sinon.stub(scJssConfigTool, 'resolveScJssConfig').resolves(scJssConfig);

    await handler(argv);

    expect(deployStub.calledWith(expectedOptions)).to.be.true;
  });

  it('should abort and log error if sitecore dist path is missing from package.json', async () => {
    const packageJson = {
      config: {
        sitecoreConfigPath: 'Santiago',
      },
    };
    const deployStub = sinon.stub(deployTools, 'deploy');
    sinon.stub(verify, 'verifySetup');
    sinon.stub(resolvePkg, 'default').resolves(packageJson);
    const logSpy = sinon.spy(console, 'error');

    await handler({});

    expect(logSpy.getCall(0).args[0].toString()).to.contain(
      'The current project does not support file deployment into the Sitecore instance. You should use an HTTP POST based integration for Experience Editor support. See SDK documentation for details.'
    );
    expect(deployStub.called).to.be.false;
  });
});
