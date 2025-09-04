import { expect } from 'chai';
import sinon from 'sinon';
import { handler } from './environment';

describe('environment script', () => {
  it('should print env variable', async () => {
    process.env.FOO = 'bar';
    const logSpy = sinon.spy(console, 'log');
    const argv = {
      name: 'FOO',
    };
    handler(argv);

    expect(logSpy.calledWith(`process.env.${argv.name} = ${process.env.FOO}`));
  });
});
