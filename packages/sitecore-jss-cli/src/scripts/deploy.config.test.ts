/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect } from 'chai';
import sinon from 'sinon';

describe('deploy.config script', () => {
  const quibble = require('quibble');

  afterEach(() => {
    sinon.restore();
    quibble.reset();
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
    const deployStub = sinon.stub();

    quibble('@sitecore-jss/sitecore-jss-dev-tools', {
      deploy: deployStub,
      verifySetup: sinon.stub(),
    });

    const deployConfig = require('./deploy.config');

    await deployConfig.handler(argv);

    expect(deployStub.calledWith(expectedOptions)).to.be.true;
  });

  it('should attempt to resolve destination when not provided', async () => {
    const argv = {
      destination: '',
      source: 'F:/Biarritz',
    };
    const expectedOptions = {
      destinationPath: 'S:\\Santiago',
      sourcePath: argv.source,
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
      },
    };
    const deployStub = sinon.stub();

    quibble('@sitecore-jss/sitecore-jss-dev-tools', {
      deploy: deployStub,
      resolveScJssConfig: sinon.stub().resolves(scJssConfig),
      verifySetup: sinon.stub(),
    });

    quibble('../resolve-package', sinon.stub().resolves(packageJson));

    const deployConfig = require('./deploy.config');

    await deployConfig.handler(argv);

    expect(deployStub.calledWith(expectedOptions)).to.be.true;
  });
});
