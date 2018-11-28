import { expect } from 'chai';
import sinon from 'sinon';
import { handler } from './easter-egg';

describe('handler', () => {
  it('should log to console', () => {
    const logSpy = sinon.spy(console, 'log');

    handler();
    expect(logSpy.calledOnce).to.equal(true);

    logSpy.restore();
  });
});
