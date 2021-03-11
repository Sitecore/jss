/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect } from 'chai';
import chalk from 'chalk';
import { spy } from 'sinon';
import { ClientRequest } from 'http';
import nock from 'nock';
import {
  extractProxy,
  getHttpsTransport,
  doFingerprintsMatch,
  normalizeFingerprint,
  applyCertPinning,
  finishWatchJobStatusTask,
  logJobStatus,
} from './package-deploy';
import { Socket } from 'net';

describe('package-deploy', () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  describe('finishWatchJobStatusTask', () => {
    it('with warnings', (done) => {
      const consoleWarnSpy = spy(console, 'warn');
      const consoleErrSpy = spy(console, 'error');
      const warnings = ['w1', 'w2'];
      const errors: string[] = [];
      new Promise((resolve, reject) =>
        finishWatchJobStatusTask({ warnings, errors, resolve, reject })
      ).then(() => {
        expect(consoleWarnSpy.callCount).to.equal(1);
        expect(consoleWarnSpy.getCall(0).args[0]).to.equal(
          chalk.yellow('IMPORT WARNING(S) OCCURRED!')
        );
        expect(consoleErrSpy.callCount).to.equal(2);
        expect(consoleErrSpy.getCall(0).args[0]).to.equal(chalk.yellow('w1'));
        expect(consoleErrSpy.getCall(1).args[0]).to.equal(chalk.yellow('w2'));
        consoleWarnSpy.restore();
        consoleErrSpy.restore();
        done();
      });
    });

    it('with warnings and errors', (done) => {
      const consoleWarnSpy = spy(console, 'warn');
      const consoleErrSpy = spy(console, 'error');
      const warnings = ['w1', 'w2'];
      const errors = ['e1', 'e2'];
      new Promise((resolve, reject) =>
        finishWatchJobStatusTask({ warnings, errors, resolve, reject })
      ).catch(() => {
        expect(consoleWarnSpy.callCount).to.equal(1);
        expect(consoleWarnSpy.getCall(0).args[0]).to.equal(
          chalk.yellow('IMPORT WARNING(S) OCCURRED!')
        );
        expect(consoleErrSpy.callCount).to.equal(5);
        expect(consoleErrSpy.getCall(0).args[0]).to.equal(chalk.yellow('w1'));
        expect(consoleErrSpy.getCall(1).args[0]).to.equal(chalk.yellow('w2'));
        expect(consoleErrSpy.getCall(2).args[0]).to.equal(chalk.red('IMPORT ERROR(S) OCCURRED!'));
        expect(consoleErrSpy.getCall(3).args[0]).to.equal(chalk.red('e1'));
        expect(consoleErrSpy.getCall(4).args[0]).to.equal(chalk.red('e2'));

        consoleWarnSpy.restore();
        consoleErrSpy.restore();
        done();
      });
    });
  });

  describe('logJobStatus', () => {
    it('debug', () => {
      const consoleSpy = spy(console, 'log');
      const errors: string[] = [];
      const warnings: string[] = [];
      const entryLevel = 'DEBUG';
      const message = 'Hello, I am debug message';

      logJobStatus({ message, entryLevel, warnings, errors });

      expect(errors.length).to.equal(0);
      expect(warnings.length).to.equal(0);
      expect(consoleSpy.callCount).to.equal(1);
      expect(consoleSpy.getCall(0).args[0]).to.equal(chalk.white('Hello, I am debug message'));

      consoleSpy.restore();
    });

    it('warning', () => {
      const consoleSpy = spy(console, 'warn');
      const errors: string[] = [];
      const warnings: string[] = [];
      const entryLevel = 'WARN';
      const message = 'Hello, I am warning message';

      logJobStatus({ message, entryLevel, warnings, errors });

      expect(errors.length).to.equal(0);
      expect(warnings).to.deep.equal(['Hello, I am warning message']);
      expect(consoleSpy.callCount).to.equal(1);
      expect(consoleSpy.getCall(0).args[0]).to.equal(chalk.yellow('Hello, I am warning message'));

      consoleSpy.restore();
    });

    it('error', () => {
      const consoleSpy = spy(console, 'error');
      const errors: string[] = [];
      const warnings: string[] = [];
      const entryLevel = 'ERROR';
      const message = 'Hello, I am error message';

      logJobStatus({ message, entryLevel, warnings, errors });

      expect(warnings.length).to.equal(0);
      expect(errors).to.deep.equal(['Hello, I am error message']);
      expect(consoleSpy.callCount).to.equal(1);
      expect(consoleSpy.getCall(0).args[0]).to.equal(chalk.red('Hello, I am error message'));

      consoleSpy.restore();
    });

    it('default', () => {
      const consoleSpy = spy(console, 'log');
      const errors: string[] = [];
      const warnings: string[] = [];
      const entryLevel = '';
      const message = 'Hello, I am default message';

      logJobStatus({ message, entryLevel, warnings, errors });

      expect(errors.length).to.equal(0);
      expect(warnings.length).to.equal(0);
      expect(consoleSpy.callCount).to.equal(1);
      expect(consoleSpy.getCall(0).args[0]).to.equal(chalk.green('Hello, I am default message'));

      consoleSpy.restore();
    });
  });

  describe('extractProxy', () => {
    it('should return proxy object', () => {
      expect(extractProxy('https://localhost:9999')).to.deep.equal({
        protocol: 'https',
        port: 9999,
        host: 'localhost',
      });

      expect(extractProxy('http://myhostname:1234')).to.deep.equal({
        protocol: 'http',
        port: 1234,
        host: 'myhostname',
      });
    });

    it('should return undefined if proxy not provided', () => {
      expect(extractProxy()).to.equal(undefined);
    });

    it('should return undefined if proxy is not valid url', () => {
      process.exit = () => [] as never;
      expect(extractProxy('test')).to.equal(undefined);
    });
  });

  describe('applyCertPinning', () => {
    it('should skip certs comparison', (done) => {
      const req = ({
        emit: spy(),
        abort: spy(),
        on: spy((ev: string, cb: (socket: Socket) => void) => {
          expect(ev).to.equal('socket');

          const socket = ({
            on: spy((event: string, cb: () => void) => {
              expect(event).to.equal('secureConnect');

              // execute `secureConnect` event callback
              cb();

              expect((req.emit as any).called).to.equal(false);
              expect((req.abort as any).called).to.equal(false);
              expect((socket as any).getPeerCertificate.called).to.equal(true);

              done();
            }),
            getPeerCertificate: spy(() => ({ fingerprint: 'TEST:TEST2:TEST3' })),
          } as unknown) as Socket;

          // execute `socket` event callback
          cb(socket);
        }),
      } as unknown) as ClientRequest;

      applyCertPinning(req, {
        packagePath: 'aaa',
        appName: 'bbb',
        importServiceUrl: 'ccc',
        secret: 'ddd',
      });
    });

    it('should compare same certificates', (done) => {
      const req = ({
        emit: spy(),
        abort: spy(),
        on: spy((ev: string, cb: (socket: Socket) => void) => {
          expect(ev).to.equal('socket');

          const socket = ({
            on: spy((event: string, cb: () => void) => {
              expect(event).to.equal('secureConnect');

              // execute `secureConnect` event callback
              cb();

              expect((req.emit as any).called).to.equal(false);
              expect((req.abort as any).called).to.equal(false);
              expect((socket as any).getPeerCertificate.called).to.equal(true);

              done();
            }),
            getPeerCertificate: spy(() => ({ fingerprint: 'MY:SECRET:KEY' })),
          } as unknown) as Socket;

          // execute `socket` event callback
          cb(socket);
        }),
      } as unknown) as ClientRequest;

      applyCertPinning(req, {
        packagePath: 'aaa',
        appName: 'bbb',
        importServiceUrl: 'ccc',
        secret: 'ddd',
        acceptCertificate: 'MY:SECRET:KEY',
      });
    });

    it('should compare different certificates', (done) => {
      const req = ({
        emit: spy(),
        abort: spy(),
        on: spy((ev: string, cb: (socket: Socket) => void) => {
          expect(ev).to.equal('socket');

          const socket = ({
            on: spy((event: string, cb: () => void) => {
              expect(event).to.equal('secureConnect');

              // execute `secureConnect` event callback
              cb();

              expect((req.emit as any).called).to.equal(true);
              expect((req.emit as any).args[0][0]).to.equal('error');
              expect((req.emit as any).args[0][1].message).to.deep.equal(
                'Expected server SSL certificate to have thumbprint MY:SECRET:KEY111 from acceptCertificate, but got MY:SECRET:KEY222 from server. This may mean the certificate has changed, or that a malicious certificate is present.'
              );
              expect((req.abort as any).called).to.equal(true);
              expect((socket as any).getPeerCertificate.called).to.equal(true);

              done();
            }),
            getPeerCertificate: spy(() => ({ fingerprint: 'MY:SECRET:KEY222' })),
          } as unknown) as Socket;

          // execute `socket` event callback
          cb(socket);
        }),
      } as unknown) as ClientRequest;

      applyCertPinning(req, {
        packagePath: 'aaa',
        appName: 'bbb',
        importServiceUrl: 'ccc',
        secret: 'ddd',
        acceptCertificate: 'MY:SECRET:KEY111',
      });
    });
  });

  describe('getHttpsTransport', () => {
    it('should execute request', (done) => {
      nock('https://superhost')
        .get('/test')
        .reply(200, {
          success: true,
          text: 'test',
        });

      const transport = getHttpsTransport({
        packagePath: 'xxx',
        appName: 'jssapp',
        importServiceUrl: 'xxx',
        secret: 'yyy',
      });

      const req = transport.request(
        { method: 'GET', hostname: 'superhost', path: '/test' },
        (response) => {
          let result = '';

          response.on('data', (data) => {
            result += data;
          });

          response.on('end', () => {
            expect(result).to.equal('{"success":true,"text":"test"}');
            done();
          });
        }
      );

      req.end();
    });
  });

  describe('doFingerprintsMatch', () => {
    it('should match', () => {
      const fp = '5E:D1:5E:D4:D4:42:71:CC:30:A5:B6:A2:DA:A4:79:06:67:CB:F6:36';

      expect(doFingerprintsMatch(fp, fp)).to.equal(true);
    });

    it('should not match', () => {
      const fp1 = '11:D1:5E:D4:D4:42:71:CC:30:A5:B6:A2:DA:A4:79:06:67:CB:F6:36';
      const fp2 = '5E:D1:5E:D4:D4:42:71:CC:30:A5:B6:A2:DA:A4:79:06:67:CB:F6:36';

      expect(doFingerprintsMatch(fp1, fp2)).to.equal(false);
    });
  });

  it('normalizeFingerprint', () => {
    expect(
      normalizeFingerprint('5E:D1:5E:D4:D4:42:71:CC:30:A5:B6:A2:DA:A4:79:06:67:CB:F6:36')
    ).to.equal('5ed15ed4d44271cc30a5b6a2daa4790667cbf636');

    expect(
      normalizeFingerprint('5e:d1:5e:d4:d4:42:71:cc:30:a5:b6:a2:da:a4:79:06:67:cb:F6:36')
    ).to.equal('5ed15ed4d44271cc30a5b6a2daa4790667cbf636');

    expect(normalizeFingerprint('5ed15ed4d44271cc30a5b6a2daa4790667cbf636')).to.equal(
      '5ed15ed4d44271cc30a5b6a2daa4790667cbf636'
    );
  });
});
