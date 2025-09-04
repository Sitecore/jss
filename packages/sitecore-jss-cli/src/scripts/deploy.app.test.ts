/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect } from 'chai';
import sinon from 'sinon';
import * as deployFiles from './deploy.files';
import * as deployItems from './deploy.items';
import { handler } from './deploy.app';

describe('deploy.app script', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should deploy both items and files', async () => {
    const deployFilesStub = sinon.stub(deployFiles, 'handler').resolves();
    const deployItemsStub = sinon.stub(deployItems, 'handler').resolves();
    const argv = {};
    await handler(argv);

    expect(deployItemsStub.calledWith(argv)).to.be.true;
    expect(deployFilesStub.calledWith(argv)).to.be.true;
  });

  it('should log error and exit on deployItems error', async () => {
    const errorMsg = 'Cant connect to Sitecore if youre a unit test :(';
    const deployItemsStub = sinon.stub(deployItems, 'handler').rejects(errorMsg);
    const processStub = sinon.stub(process, 'exit');
    const logSpy = sinon.spy(console, 'log');
    await handler({});

    expect(deployItemsStub.called).to.be.true;
    expect(processStub.calledWith(1)).to.be.true;
    expect(logSpy.getCall(0).args[0].toString()).to.contain(errorMsg);
  });
});
