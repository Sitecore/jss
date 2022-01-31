import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon';
import spawn from 'cross-spawn';
import * as cmd from './cmd';

describe('cmd', () => {
  let spawnFuncStub: SinonStub;
  let logStub: SinonStub;
  afterEach(() => {
    spawnFuncStub?.restore();
    logStub?.restore();
  });

  it('run', () => {
    spawnFuncStub = sinon.stub(cmd, 'spawnFunc');
    logStub = sinon.stub(console, 'log');

    cmd.run('jss', ['start', 'production'], { cwd: 'samples/next', encoding: 'utf-8' });

    expect(
      spawnFuncStub.calledOnceWith('jss', ['start', 'production'], {
        cwd: 'samples/next',
        encoding: 'utf-8',
      })
    ).to.equal(true);

    expect(logStub.calledOnceWith('> jss start production'));
  });

  describe('spawnFunc', () => {
    let spawnStub: SinonStub;
    let exitStub: SinonStub;
    let logStub: SinonStub;

    afterEach(() => {
      spawnStub?.restore();
      exitStub?.restore();
      logStub?.restore();
    });

    it('should exit when result has status', () => {
      spawnStub = sinon
        .stub(spawn, 'sync')
        .returns({ output: [], pid: 1, stderr: '', stdout: '', status: 5, signal: 'SIGINFO' });

      exitStub = sinon.stub(process, 'exit');

      cmd.spawnFunc('jss', ['start', 'production'], { cwd: 'samples/next', encoding: 'utf-8' });

      expect(exitStub.getCall(0).args[0]).to.equal(5);

      expect(
        spawnStub.calledOnceWith('jss', ['start', 'production'], {
          cwd: 'samples/next',
          encoding: 'utf-8',
        })
      ).to.equal(true);
    });

    it('should log message when process is killed', () => {
      spawnStub = sinon
        .stub(spawn, 'sync')
        .returns({ output: [], pid: 1, stderr: '', stdout: '', status: 5, signal: 'SIGKILL' });

      exitStub = sinon.stub(process, 'exit');

      logStub = sinon.stub(console, 'log');

      cmd.spawnFunc('jss', ['start', 'production'], { cwd: 'samples/next', encoding: 'utf-8' });

      expect(exitStub.getCall(0).args[0]).to.equal(5);

      expect(
        spawnStub.calledOnceWith('jss', ['start', 'production'], {
          cwd: 'samples/next',
          encoding: 'utf-8',
        })
      ).to.equal(true);

      expect(
        logStub.calledOnceWith(
          'The operation failed because the process exited too early. ' +
            'This probably means the system ran out of memory or someone called ' +
            '`kill -9` on the process.'
        )
      ).to.equal(true);
    });

    it('should log message when process is down', () => {
      spawnStub = sinon
        .stub(spawn, 'sync')
        .returns({ output: [], pid: 1, stderr: '', stdout: '', status: 5, signal: 'SIGTERM' });
      exitStub = sinon.stub(process, 'exit');
      logStub = sinon.stub(console, 'log');

      cmd.spawnFunc('jss', ['start', 'production'], { cwd: 'samples/next', encoding: 'utf-8' });

      expect(exitStub.getCall(0).args[0]).to.equal(5);

      expect(
        spawnStub.calledOnceWith('jss', ['start', 'production'], {
          cwd: 'samples/next',
          encoding: 'utf-8',
        })
      ).to.equal(true);

      expect(
        logStub.calledOnceWith(
          'The operation failed because the process exited too early. ' +
            'Someone might have called `kill` or `killall`, or the system could ' +
            'be shutting down.'
        )
      ).to.equal(true);
    });
  });
});
