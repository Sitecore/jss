/* eslint no-underscore-dangle: "off" */
/* eslint global-require: "off" */

import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';

describe('runProcessors', () => {
  const functionProcessors = () => [
    {
      name: 'proc0',
      process: (args: any) => ({ ...args, proc0result: true }),
      args: {
        functionArg0: 'functionArg0',
      },
    },
    {
      name: 'proc1',
      process: (args: any) => ({ ...args, proc1result: true }),
    },
  ];

  const fileProcessors = () => [
    {
      name: 'proc0',
      modulePath: './src/pipelines/test/pipelines/pipeline0/proc0',
      args: {
        fileArg0: 'fileArg0',
      },
    },
    {
      name: 'proc1',
      modulePath: './src/pipelines/test/pipelines/pipeline0/proc1.ts',
    },
    {
      name: 'proc2',
      modulePath: './src/pipelines/test/pipelines/pipeline0/proc2.ts',
    },
  ];

  it('should execute function-based processors', () => {
    const pipeline = require('./pipeline');
    return pipeline
      .runProcessors({ processors: functionProcessors(), pipelineArgs: { arg0: 'testArg' } })
      .then((result: any) => {
        expect(result.arg0, 'arg0').to.equal('testArg');
        expect(result.proc0result, 'proc0result').to.equal(true);
        expect(result.proc1result, 'proc1result').to.equal(true);
      });
  });

  it('should execute file-based processors', () => {
    const pipeline = require('./pipeline');
    return pipeline
      .runProcessors({ processors: fileProcessors(), pipelineArgs: { arg0: 'testArg' } })
      .then((result: any) => {
        expect(result.arg0, 'arg0').to.equal('testArg');
        expect(result.proc0result, 'proc0result').to.equal(true);
        expect(result.proc1result, 'proc1result').to.equal(true);
        expect(result.proc2result, 'proc2result').to.equal(true);
      });
  });

  it('should execute function-based processors in order', () => {
    const processors = functionProcessors();
    const spy = sinon.spy();
    processors[0].process = spy;
    processors[1].process = spy;

    const pipeline = require('./pipeline');
    return pipeline.runProcessors({ processors, pipelineArgs: { arg0: 'testArg' } }).then(() => {
      expect(spy.getCall(0).args[0].processor.name).to.equal('proc0');
      expect(spy.getCall(1).args[0].processor.name).to.equal('proc1');
    });
  });

  it('should resolve a processor returning a promise before executing the next processor', () => {
    const processors = functionProcessors();
    const spy = sinon.spy();
    processors[0].process = (args) =>
      Promise.resolve(args).then((result) => ({ ...result, arg0: 'testArgPromise' }));
    processors[1].process = spy;

    const pipeline = require('./pipeline');
    return pipeline.runProcessors({ processors, pipelineArgs: { arg0: 'testArg' } }).then(() => {
      expect(spy.getCall(0).args[0].arg0).to.equal('testArgPromise');
    });
  });

  it('function-based processors should receive args defined in config', () => {
    const processors = functionProcessors();
    const spy = sinon.spy();
    processors[0].process = spy;

    const pipeline = require('./pipeline');
    return pipeline.runProcessors({ processors, pipelineArgs: { arg0: 'testArg' } }).then(() => {
      const spyCallArgs = spy.getCall(0).args[0];
      expect(spyCallArgs.functionArg0).to.equal('functionArg0');
      expect(spyCallArgs.arg0).to.equal('testArg');
    });
  });

  it('file-based processors should receive args defined in config', () => {
    const processors = fileProcessors();
    const spy = sinon.spy();
    (processors[0] as any).process = spy;

    const pipeline = require('./pipeline');
    return pipeline.runProcessors({ processors, pipelineArgs: { arg0: 'testArg' } }).then(() => {
      const spyCallArgs = spy.getCall(0).args[0];
      expect(spyCallArgs.fileArg0).to.equal('fileArg0');
      expect(spyCallArgs.arg0).to.equal('testArg');
    });
  });
});
