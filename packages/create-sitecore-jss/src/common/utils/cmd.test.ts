import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon';
import spawn from 'cross-spawn';
import * as cmd from './cmd';

describe('cmd', () => {
  it('run', () => {
    const spawnFuncStub = sinon.stub(cmd, 'spawnFunc');
    const logStub = sinon.stub(console, 'log');

    cmd.run('jss', ['start', 'production'], { cwd: 'samples/next', encoding: 'utf-8' });

    expect(
      spawnFuncStub.calledOnceWith('jss', ['start', 'production'], {
        cwd: 'samples/next',
        encoding: 'utf-8',
      })
    ).to.equal(true);

    expect(logStub.calledOnceWith('> jss start production'));

    spawnFuncStub.restore();
    logStub.restore();
  });

  describe('spawnFunc', () => {
    let spawnStub: SinonStub;

    afterEach(() => {
      spawnStub?.restore();
    });

    it('should exit when result has status', () => {
      spawnStub = sinon
        .stub(spawn, 'sync')
        .returns({ output: [], pid: 1, stderr: '', stdout: '', status: 5, signal: 'SIGINFO' });

      const exitStub = sinon.stub(process, 'exit');

      cmd.spawnFunc('jss', ['start', 'production'], { cwd: 'samples/next', encoding: 'utf-8' });

      expect(exitStub.getCall(0).args[0]).to.equal(5);

      expect(
        spawnStub.calledOnceWith('jss', ['start', 'production'], {
          cwd: 'samples/next',
          encoding: 'utf-8',
          stdio: 'inherit',
        })
      ).to.equal(true);

      exitStub.restore();
    });

    it('should exit with status 0 when result does not have status', () => {
      spawnStub = sinon
        .stub(spawn, 'sync')
        .returns({ output: [], pid: 1, stderr: '', stdout: '', status: -1, signal: 'SIGINFO' });

      const exitStub = sinon.stub(process, 'exit');

      cmd.spawnFunc('jss', ['start', 'production'], { cwd: 'samples/next', encoding: 'utf-8' });

      expect(exitStub.getCall(0).args[0]).to.equal(1);

      expect(
        spawnStub.calledOnceWith('jss', ['start', 'production'], {
          cwd: 'samples/next',
          encoding: 'utf-8',
          stdio: 'inherit',
        })
      ).to.equal(true);

      exitStub.restore();
    });

    it('should log message when process is killed', () => {
      spawnStub = sinon
        .stub(spawn, 'sync')
        .returns({ output: [], pid: 1, stderr: '', stdout: '', status: 5, signal: 'SIGKILL' });

      const exitStub = sinon.stub(process, 'exit');

      const logStub = sinon.stub(console, 'log');

      cmd.spawnFunc('jss', ['start', 'production'], { cwd: 'samples/next', encoding: 'utf-8' });

      expect(exitStub.getCall(0).args[0]).to.equal(5);

      expect(
        spawnStub.calledOnceWith('jss', ['start', 'production'], {
          cwd: 'samples/next',
          encoding: 'utf-8',
          stdio: 'inherit',
        })
      ).to.equal(true);

      expect(
        logStub.calledOnceWith(
          'The operation failed because the process exited too early. ' +
            'This probably means the system ran out of memory or someone called ' +
            '`kill -9` on the process.'
        )
      ).to.equal(true);

      exitStub.restore();
      logStub.restore();
    });

    it('should log message when process is down', () => {
      spawnStub = sinon
        .stub(spawn, 'sync')
        .returns({ output: [], pid: 1, stderr: '', stdout: '', status: 5, signal: 'SIGTERM' });

      const exitStub = sinon.stub(process, 'exit');

      const logStub = sinon.stub(console, 'log');

      cmd.spawnFunc('jss', ['start', 'production'], { cwd: 'samples/next', encoding: 'utf-8' });

      expect(exitStub.getCall(0).args[0]).to.equal(5);

      expect(
        spawnStub.calledOnceWith('jss', ['start', 'production'], {
          cwd: 'samples/next',
          encoding: 'utf-8',
          stdio: 'inherit',
        })
      ).to.equal(true);

      expect(
        logStub.calledOnceWith(
          'The operation failed because the process exited too early. ' +
            'Someone might have called `kill` or `killall`, or the system could ' +
            'be shutting down.'
        )
      ).to.equal(true);

      exitStub.restore();
      logStub.restore();
    });
  });
});
