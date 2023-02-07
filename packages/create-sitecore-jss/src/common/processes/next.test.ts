import chalk from 'chalk';
import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon';
import { nextSteps } from './next';

describe('next', () => {
  describe('nextSteps', () => {
    let log: SinonStub;

    beforeEach(() => {
      log = sinon.stub(console, 'log');
    });

    afterEach(() => {
      log?.restore();
    });

    it('displays appName in output', async () => {
      const appName = 'my-cool-app';

      await nextSteps(appName, []);

      const calls = log.getCalls();
      expect(
        calls.some((call) => call.args[0] === `JSS application ${chalk.green(appName)} is ready!`)
      );
    });

    it('displays next steps in output', async () => {
      const nextStepsArr = ['first, do this', 'then, do this', 'finally, do this!'];

      await nextSteps('my-cool-app', nextStepsArr);

      const calls = log.getCalls();
      const fistStepIndex = calls.findIndex((call) => call.args[0] === nextStepsArr[0]);
      expect(fistStepIndex).not.equal(-1);
      nextStepsArr.forEach((step, i) => {
        expect(calls[fistStepIndex + i].args[0]).equals(step);
      });
    });
  });
});
