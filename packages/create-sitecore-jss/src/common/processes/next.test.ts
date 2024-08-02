import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon';
import { nextSteps } from './next';
import chalk from 'chalk';

describe('next', () => {
  describe('nextSteps', () => {
    let log: SinonStub;

    beforeEach(() => {
      log = sinon.stub(console, 'log');
    });

    afterEach(() => {
      log?.restore();
    });

    it('displays appNames in output', async () => {
      const appNames = ['my-cool-app', 'second-app'];
      await nextSteps(appNames, []);

      const calls = log.getCalls();
      calls.forEach((call) => {
        console.log(call.args[0]);
      });
      expect(
        calls.some(
          (call) =>
            call.args[0] ===
            `JSS application(s) ${chalk.green('my-cool-app, second-app')} is ready!`
        )
      ).to.equal(true);
    });

    it('displays next steps in output', async () => {
      const nextStepsArr = ['first, do this', 'then, do this', 'finally, do this!'];

      await nextSteps(['my-cool-app'], nextStepsArr);

      const calls = log.getCalls();
      const fistStepIndex = calls.findIndex((call) => call.args[0] === nextStepsArr[0]);
      expect(fistStepIndex).not.equal(-1);
      nextStepsArr.forEach((step, i) => {
        expect(calls[fistStepIndex + i].args[0]).equals(step);
      });
    });
  });
});
