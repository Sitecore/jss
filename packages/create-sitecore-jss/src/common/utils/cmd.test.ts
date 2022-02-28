/* eslint-disable no-unused-expressions */
import { expect, use } from 'chai';
import sinon, { SinonStub } from 'sinon';
import spawn from 'cross-spawn';
import * as cmd from './cmd';
import sinonChai from 'sinon-chai';

use(sinonChai);

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
    let logStub: SinonStub;

    const mockProcess = (isTTY: boolean) => {
      const p = {} as NodeJS.Process;
      p.exit = sinon.stub();
      p.stdin = {
        isTTY: isTTY,
      } as NodeJS.ReadStream & { fd: 0 };
      p.stdout = {
        isTTY: isTTY,
      } as NodeJS.WriteStream & { fd: 1 };
      p.stderr = {
        isTTY: isTTY,
      } as NodeJS.WriteStream & { fd: 2 };
      return p;
    };

    beforeEach(() => {
      logStub = sinon.stub(console, 'log');
    });

    afterEach(() => {
      spawnStub?.restore();
      logStub?.restore();
    });

    it('should exit when result has status > 0', () => {
      spawnStub = sinon
        .stub(spawn, 'sync')
        .returns({ output: [], pid: 1, stderr: '', stdout: '', status: 5, signal: 'SIGINFO' });
      const parent = mockProcess(true);

      cmd.spawnFunc(
        'jss',
        ['start', 'production'],
        { cwd: 'samples/next', encoding: 'utf-8' },
        parent
      );

      expect(parent.exit).to.have.been.calledOnce;
      expect(parent.exit).to.have.been.calledWith(5);
    });

    it('should not exit when result has status = 0', () => {
      spawnStub = sinon
        .stub(spawn, 'sync')
        .returns({ output: [], pid: 1, stderr: '', stdout: '', status: 0, signal: 'SIGINFO' });
      const parent = mockProcess(true);

      cmd.spawnFunc(
        'jss',
        ['start', 'production'],
        { cwd: 'samples/next', encoding: 'utf-8' },
        parent
      );

      expect(parent.exit).to.not.have.been.called;
    });

    it('should log message when process is killed', () => {
      spawnStub = sinon
        .stub(spawn, 'sync')
        .returns({ output: [], pid: 1, stderr: '', stdout: '', status: 5, signal: 'SIGKILL' });
      const parent = mockProcess(true);

      cmd.spawnFunc(
        'jss',
        ['start', 'production'],
        { cwd: 'samples/next', encoding: 'utf-8' },
        parent
      );

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
      const parent = mockProcess(true);

      cmd.spawnFunc(
        'jss',
        ['start', 'production'],
        { cwd: 'samples/next', encoding: 'utf-8' },
        parent
      );

      expect(
        logStub.calledOnceWith(
          'The operation failed because the process exited too early. ' +
            'Someone might have called `kill` or `killall`, or the system could ' +
            'be shutting down.'
        )
      ).to.equal(true);
    });

    it('should use inherit for stdio if tty', () => {
      spawnStub = sinon
        .stub(spawn, 'sync')
        .returns({ output: [], pid: 1, stderr: '', stdout: '', status: 1, signal: 'SIGINFO' });
      const parent = mockProcess(true);

      cmd.spawnFunc('npm', ['install'], { cwd: 'samples/next', encoding: 'utf-8' }, parent);

      expect(
        spawnStub.calledOnceWith('npm', ['install'], {
          cwd: 'samples/next',
          encoding: 'utf-8',
          stdio: ['inherit', 'inherit', 'inherit'],
        })
      ).to.equal(true);
    });

    it('should use pipe for stdio if not tty', () => {
      spawnStub = sinon
        .stub(spawn, 'sync')
        .returns({ output: [], pid: 1, stderr: '', stdout: '', status: 1, signal: 'SIGINFO' });
      const parent = mockProcess(false);

      cmd.spawnFunc('npm', ['install'], { cwd: 'samples/next', encoding: 'utf-8' }, parent);

      expect(
        spawnStub.calledOnceWith('npm', ['install'], {
          cwd: 'samples/next',
          encoding: 'utf-8',
          stdio: ['pipe', 'pipe', 'pipe'],
        })
      ).to.equal(true);
    });
  });
});
