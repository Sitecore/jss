/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import path, { sep } from 'path';
import { FALLBACK_PROXYNAME, ProxyArgs, proxyPrompts } from './proxy';
import { cwd } from 'process';

describe('Proxy related prompts', () => {
  const fallbackPrompt = {
    type: 'input',
    name: 'stubPrompt',
    message: 'Prevent possible undefined when getting individual prompts',
    default: () => 'empty-stub-value',
    when: (): boolean => {
      return false;
    },
    validate: () => false,
  };
  describe('proxyAppDestination input', () => {
    const defaultArgs = {
      yes: false,
      destination: 'stub',
      proxyName: 'stub',
    };

    const proxyPathPrompt =
      proxyPrompts.find((prompt) => prompt.name === 'proxyAppDestination') || fallbackPrompt;

    describe('when', () => {
      it('should return true when proxyAppDestination not populated', () => {
        const answers: ProxyArgs = defaultArgs;
        // when() type can be bool or function, ergo this weird hoop jump with call()
        expect(
          proxyPathPrompt.when !== undefined &&
            (proxyPathPrompt.when as (answers: ProxyArgs) => boolean).call(proxyPathPrompt, answers)
        ).to.equal(true);
      });

      it('should return false and populate proxyAppDestination when args.yes is true', () => {
        const answers: ProxyArgs = {
          ...defaultArgs,
          destination: 'my/main',
          proxyAppDestination: 'my/path',
          yes: true,
        };
        expect(
          proxyPathPrompt.when &&
            (proxyPathPrompt.when as (answers: ProxyArgs) => boolean).call(proxyPathPrompt, answers)
        ).to.equal(false);
        expect(answers.proxyAppDestination).to.not.be.undefined;
      });
    });

    describe('default', () => {
      it('should return default proxy path with proxyName', () => {
        const answers = {
          ...defaultArgs,
          destination: 'my/main',
          proxyName: 'myproxy',
        };
        expect(proxyPathPrompt.default(answers)).to.equal(`my${sep}myproxy`);
      });

      it('should return default proxy path with fallback proxyName', () => {
        const answers = {
          destination: 'my/main',
        };
        expect(proxyPathPrompt.default(answers)).to.equal(`my${sep}${FALLBACK_PROXYNAME}`);
      });
    });

    describe('validate', () => {
      it('should return error msg when input string is the same as answers.destination', () => {
        const answers: ProxyArgs = {
          ...defaultArgs,
          destination: 'my/main',
          proxyName: 'myproxy',
        };
        const input = 'my/main';
        expect(proxyPathPrompt.validate && proxyPathPrompt.validate(input, answers)).to.equal(
          'Paths for main app and proxy cannot match. Please choose another destination'
        );
      });

      it('should return error msg when input string differs but points to same folder as answers.destination', () => {
        const answers: ProxyArgs = {
          ...defaultArgs,
          destination: 'my/main',
          proxyName: 'myproxy',
        };
        const input = path.join(cwd(), 'my/main');
        expect(proxyPathPrompt.validate && proxyPathPrompt.validate(input, answers)).to.equal(
          'Paths for main app and proxy cannot match. Please choose another destination'
        );
      });
    });
  });
});
