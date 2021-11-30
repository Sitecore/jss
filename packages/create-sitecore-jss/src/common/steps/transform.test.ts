import { expect } from 'chai';
import sinon from 'sinon';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { transformFilename, merge, diffFiles } from './transform';
import { currentPkg, partialPkg } from '../test-data/pkg';
import path from 'path';
import fs from 'fs';

let answers;

const getAnswers = () => {
  answers = {
    yes: true,
    initialized: false,
    silent: true,
    appPrefix: true,
    appName: 'test',
    destination: '.\\test-data\\test',
    fetchWith: 'GraphQL',
    prerender: 'SSG',
    hostName: 'https://cm.jss.localhost',
  };
  return answers;
};

describe('transformFilename', () => {
  it('should replace placeholder filename with appropriate key', () => {
    const fileName = '{{appName}}.config';

    const transformedFileName = transformFilename(fileName, getAnswers());

    expect(transformedFileName).to.equal('test.config');
  });
});

describe('merge', () => {
  it('should merge the contents of a partial package.json with the target package.json', () => {
    const expected = {
      name: 'test',
      version: '2.0.0',
      description: 'Updated package.json',
      scripts: {
        start:
          'cross-env-shell JSS_MODE=disconnected "npm-run-all --serial bootstrap --parallel next:dev start:disconnected-proxy start:watch-components"',
        test: 'tests are good',
      },
      files: ['dist'],
      dependencies: {
        bootstrap: '^4.3.1',
        chalk: '^4.1.2',
        nprogress: '~0.2.0',
      },
      devDependencies: {
        '@sitecore-jss/sitecore-jss-dev-tools': '^20.0.0-canary',
        '@types/node': '^16.11.7',
        typescript: '~4.3.5',
      },
      foo: {
        bar: [4, 5, 6, 1, 2, 3],
        x: {
          y: {
            bar: [1, 2, 3, 7, 8, 9],
            x: '20',
            y: 15,
            z: ['1', '2', '3', '9', '10', '11'],
          },
        },
      },
    };

    const result = merge(currentPkg, partialPkg);

    expect(result).to.equal(JSON.stringify(expected, null, 2));
  });
});

describe('diffFiles', () => {
  it('should return empty string when target file is not found', async () => {
    const result = await diffFiles('test', 'not/existing/path');

    expect(result).to.equal('');
  });

  it('should return empty string when source and target files are equal', async () => {
    const source = fs.readFileSync(
      path.resolve('src', 'common', 'test-data', 'transform', 'source.ts'),
      'utf-8'
    );
    const result = await diffFiles(
      source,
      path.resolve('src', 'common', 'test-data', 'transform', 'source.ts')
    );

    expect(result).to.equal('');
  });

  it('should show diff using text regular file', async () => {
    const log = sinon.stub(console, 'log');
    const prompt = sinon.stub(inquirer, 'prompt').returns({ choice: true } as any);
    const targetFilePath = path.resolve('src', 'common', 'test-data', 'transform', 'target.ts');

    const source = fs.readFileSync(
      path.resolve('src', 'common', 'test-data', 'transform', 'source.ts'),
      'utf-8'
    );
    const result = await diffFiles(source, targetFilePath);

    expect(log.getCalls().length).to.equal(12);

    const calls = [
      chalk.grey('= '),
      chalk.red('- const a = 10;'),
      chalk.green('+ const x = 15;'),
      chalk.grey('= const b = 20;'),
      chalk.grey('= '),
      chalk.grey('= console.log(10 + 20);'),
      chalk.grey('= '),
      chalk.red('- console.log(20 + 30);'),
      chalk.green('+ console.log(40 + 10);'),
      chalk.grey('= '),
      chalk.grey('= console.log(a + b);'),
    ];

    calls.forEach((arg, i) => {
      expect(log.getCall(i).args[0].replace('\r', '')).to.equal(arg);
    });

    expect(log.getCall(calls.length).args[0]).to.equal(
      `Showing potential changes in ${chalk.yellow(targetFilePath.replace('/', '\\'))}`
    );

    expect(
      prompt.calledOnceWith({
        type: 'list',
        name: 'choice',
        choices: ['yes', 'skip', 'yes to all', 'abort'],
        message: `File ${chalk.yellow(
          targetFilePath.replace('/', '\\')
        )} is about to be overwritten with the above changes. Are you sure you want to continue?`,
      })
    ).to.equal(true);

    expect(result).equal(true);

    log.restore();
    prompt.restore();
  });

  it('should show diff using json file', async () => {
    const log = sinon.stub(console, 'log');
    const prompt = sinon.stub(inquirer, 'prompt').returns({ choice: true } as any);
    const targetFilePath = path.resolve('src', 'common', 'test-data', 'transform', 'target.json');

    const source = fs.readFileSync(
      path.resolve('src', 'common', 'test-data', 'transform', 'source.json'),
      'utf-8'
    );
    const result = await diffFiles(source, targetFilePath);

    expect(log.getCalls().length).to.equal(16);

    const calls = [
      chalk.grey('= {'),
      chalk.green('+   "a": ['),
      chalk.green('+     1,'),
      chalk.green('+     2'),
      chalk.green('+   ],'),
      chalk.grey('=   "foo": {'),
      chalk.red('-     "bar": false,'),
      chalk.green('+     "b": 50,'),
      chalk.green('+     "bar": true,'),
      chalk.grey('=     "y": 15'),
      chalk.grey('=   },'),
      chalk.grey('=   "x": 10,'),
      chalk.red('-   "z": "30"'),
      chalk.green('+   "z": "40"'),
      chalk.grey('= }'),
    ];

    calls.forEach((arg, i) => {
      expect(log.getCall(i).args[0]).to.equal(arg);
    });

    expect(log.getCall(calls.length).args[0]).to.equal(
      `Showing potential changes in ${chalk.yellow(targetFilePath.replace('/', '\\'))}`
    );

    expect(
      prompt.calledOnceWith({
        type: 'list',
        name: 'choice',
        choices: ['yes', 'skip', 'yes to all', 'abort'],
        message: `File ${chalk.yellow(
          targetFilePath.replace('/', '\\')
        )} is about to be overwritten with the above changes. Are you sure you want to continue?`,
      })
    ).to.equal(true);

    expect(result).equal(true);

    log.restore();
    prompt.restore();
  });
});
