/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import { expect } from 'chai';
import sinon from 'sinon';
import * as resolvePackage from '../resolve-package';
import { handler } from './clean';

import * as devTools from '@sitecore-jss/sitecore-jss-dev-tools/dist/cjs/clean';

describe('clean script', () => {

  afterEach(() => {
    sinon.restore();
  });

  it('clean should be called with path from argv', async () => {
    const stub = sinon.stub(devTools, 'clean');
    const argv = {
      path: 'C:/The-Curious-Case-of-Benjamin-Button',
    };

    await handler(argv);
    expect(stub.calledWith(argv)).to.equal(true);
  });

  it('should exit on missing path', async () => {
    const processStub = sinon.stub(process, 'exit');
    const logSpy = sinon.spy(console, 'error');
    const errorMsg = 'Path argument was not specified and no \'buildArtifactsPath\' in package.json.';
    const argv = { path: '' };

    // ensure clean is not executed - since we stub process.exit - and the script execution will continue
    const stub = sinon.stub(devTools, 'clean');
    sinon.stub(resolvePackage, 'default').resolves({ config: { buildArtifactsPath: '' } });
    const cleanImpl = require('./clean');

    await cleanImpl.handler(argv);

    expect(processStub.calledWith(1)).to.be.true;
    expect(logSpy.getCall(0).args[0].toString()).to.contain(errorMsg);
  });
});
