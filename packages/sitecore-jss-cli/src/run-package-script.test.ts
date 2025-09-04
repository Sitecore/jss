/* eslint-disable no-unused-expressions */
import * as spawn from './spawn';
import sinon from 'sinon';
import runPackageScript, { transformPackageArgs } from './run-package-script';
import { expect } from 'chai';

describe('run-package-script', () => {
  it('runPackageScript should invoke spawn with args', () => {
    const spawnMock = sinon.stub(spawn, 'default');

    const mockArgs = ['arg1', 'arg2'];

    runPackageScript(mockArgs);

    expect(spawnMock.calledWith('npm', transformPackageArgs(mockArgs))).to.be.true;
  });
});
