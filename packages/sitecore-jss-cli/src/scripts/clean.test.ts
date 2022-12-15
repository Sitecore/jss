/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import { expect } from 'chai';
import sinon from 'sinon';
import * as resolvePackage from '../resolve-package';

describe('clean script', () => {
  const quibble = require('quibble');

  afterEach(() => {
    quibble.reset();
    sinon.restore();
  });
  it('clean should be called with path from argv', async () => {
    const stub = sinon.stub();
    quibble('@sitecore-jss/sitecore-jss-dev-tools', { clean: stub });
    const cleanImpl = require('./clean');
    const argv = {
      path: 'C:/The-Curious-Case-of-Benjamin-Button',
    };

    await cleanImpl.handler(argv);
    expect(stub.called).to.equal(true);
  });

  it('should exit on missing path', async () => {
    const processStub = sinon.stub(process, 'exit');
    const logSpy = sinon.spy(console, 'error');
    const errorMsg = 'Path argument was not specified and no \'buildArtifactsPath\' in package.json.';
    const argv = { path: '' };
    // ensure clean is not called - since we stub process.exit
    quibble('@sitecore-jss/sitecore-jss-dev-tools', { clean: sinon.stub() });
    sinon.stub(resolvePackage, 'default').resolves({ config: { buildArtifactsPath: '' } });
    const cleanImpl = require('./clean');

    await cleanImpl.handler(argv);

    expect(processStub.calledWith(1)).to.be.true;
    expect(logSpy.getCall(0).args[0].toString()).to.contain(errorMsg);
  });
});
