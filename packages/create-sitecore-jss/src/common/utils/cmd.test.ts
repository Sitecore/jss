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
    let stdinTTYStub: SinonStub;
    let stdoutTTYStub: SinonStub;
    let stderrTTYStub: SinonStub;

    beforeEach(() => {
      exitStub = sinon.stub(process, 'exit');
      logStub = sinon.stub(console, 'log');
      stdinTTYStub = sinon.stub(process.stdin, 'isTTY').value(true);
      stdoutTTYStub = sinon.stub(process.stdout, 'isTTY').value(true);
      stderrTTYStub = sinon.stub(process.stderr, 'isTTY').value(true);
    });

    afterEach(() => {
      spawnStub?.restore();
      exitStub?.restore();
      logStub?.restore();
      stdinTTYStub?.restore();
      stdoutTTYStub?.restore();
      stderrTTYStub?.restore();
    });

    it('should exit when result has status', () => {
      spawnStub = sinon
        .stub(spawn, 'sync')
        .returns({ output: [], pid: 1, stderr: '', stdout: '', status: 5, signal: 'SIGINFO' });

      cmd.spawnFunc('jss', ['start', 'production'], { cwd: 'samples/next', encoding: 'utf-8' });

      expect(exitStub.getCall(0).args[0]).to.equal(5);

      expect(
        spawnStub.calledOnceWith('jss', ['start', 'production'], {
          cwd: 'samples/next',
          encoding: 'utf-8',
          stdio: ['inherit', 'inherit', 'inherit'],
        })
      ).to.equal(true);
    });

    it('should log message when process is killed', () => {
      spawnStub = sinon
        .stub(spawn, 'sync')
        .returns({ output: [], pid: 1, stderr: '', stdout: '', status: 5, signal: 'SIGKILL' });

      cmd.spawnFunc('jss', ['start', 'production'], { cwd: 'samples/next', encoding: 'utf-8' });

      expect(exitStub.getCall(0).args[0]).to.equal(5);

      expect(
        spawnStub.calledOnceWith('jss', ['start', 'production'], {
          cwd: 'samples/next',
          encoding: 'utf-8',
          stdio: ['inherit', 'inherit', 'inherit'],
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

      cmd.spawnFunc('jss', ['start', 'production'], { cwd: 'samples/next', encoding: 'utf-8' });

      expect(exitStub.getCall(0).args[0]).to.equal(5);

      expect(
        spawnStub.calledOnceWith('jss', ['start', 'production'], {
          cwd: 'samples/next',
          encoding: 'utf-8',
          stdio: ['inherit', 'inherit', 'inherit'],
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

    it('should use pipe for stdio if not tty', () => {
      spawnStub = sinon
        .stub(spawn, 'sync')
        .returns({ output: [], pid: 1, stderr: '', stdout: '', status: 1, signal: 'SIGINFO' });

      stderrTTYStub = sinon.stub(process.stderr, 'isTTY').value(false);

      cmd.spawnFunc('npm', ['install'], { cwd: 'samples/next', encoding: 'utf-8' });

      expect(
        spawnStub.calledOnceWith('npm', ['install'], {
          cwd: 'samples/next',
          encoding: 'utf-8',
          stdio: ['inherit', 'inherit', 'pipe'],
        })
      ).to.equal(true);
    });
  });
});
