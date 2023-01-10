/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import spawn from 'cross-spawn';
import sinon from 'sinon';
import * as scriptSpawn from './spawn';

describe('spawn script', () => {
  afterEach(() => {
    sinon.restore();
  });

  const defaultSpawnReturn = {
    pid: 0,
    output: [],
    stdout: '',
    stderr: '',
    status: null,
    signal: null,
  };

  it('should log and exit on SIGKILL', () => {
    const consoleSpy = sinon.spy(console, 'log');
    const exitStub = sinon.stub(process, 'exit');
    sinon.stub(spawn, 'sync').returns({
      ...defaultSpawnReturn,
      signal: 'SIGKILL',
    });
    const errorMsg =
      'The operation failed because the process exited too early. ' +
      'This probably means the system ran out of memory or someone called ' +
      '`kill -9` on the process.';
    scriptSpawn.default('test', []);

    expect(consoleSpy.calledWith(errorMsg)).to.be.true;
    expect(exitStub.calledWith(1)).to.be.true;
  });

  it('should log and exit on SIGTERM', () => {
    const consoleSpy = sinon.spy(console, 'log');
    const exitStub = sinon.stub(process, 'exit');
    sinon.stub(spawn, 'sync').returns({
      ...defaultSpawnReturn,
      signal: 'SIGTERM',
    });
    const errorMsg =
      'The operation failed because the process exited too early. ' +
      'Someone might have called `kill` or `killall`, or the system could ' +
      'be shutting down.';
    scriptSpawn.default('test', []);
    expect(consoleSpy.calledWith(errorMsg)).to.be.true;
    expect(exitStub.calledWith(1)).to.be.true;
  });

  it('should exit with returned status code, when its not 0', () => {
    const exitStatus = 42;
    sinon.stub(spawn, 'sync').returns({
      ...defaultSpawnReturn,
      status: exitStatus,
    });
    const exitStub = sinon.stub(process, 'exit');
    scriptSpawn.default('test', []);
    expect(exitStub.calledWith(exitStatus)).to.be.true;
  });
});
