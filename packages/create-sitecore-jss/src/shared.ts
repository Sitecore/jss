import glob from 'glob';
import { Answers, prompt } from 'inquirer';
import path from 'path';
import { renderFile } from 'ejs';
import fs from 'fs-extra';
import chalk from 'chalk';
import { diffLines, Change } from 'diff';

export const getPascalCaseName = (name: string): string => {
  // handle underscores by converting them to hyphens
  const temp: string[] = name.replace(/_/g, '-').split('-');
  name = temp.map((item: string) => (item = item.charAt(0).toUpperCase() + item.slice(1))).join('');
  return name;
};

const transformFilename = (file: string, answers: Answers): string => {
  // eslint-disable-next-line guard-for-in
  for (const key in answers) {
    file = file.replace(`{{${key}}}`, answers[key]);
  }
  return file;
};

export const diffFiles = async (/*transformed version of our template*/sourceFileContent: string, /*user's file*/ targetFilePath: string): Promise<string> => {
  // return early with empty string if...
  // * the target file path doesn't exist yet,
  // * there is no diff
  // *
  // don't diff pdfs or pngs
  if (sourceFileContent.endsWith('.pdf') || sourceFileContent.endsWith('.png')) return '';

  if (!fs.pathExistsSync(targetFilePath)) return '';

    const targetFileContents = fs.readFileSync(path.resolve(process.cwd(), targetFilePath), 'utf8');

    if (targetFileContents === sourceFileContent) return '';

    const diff = diffLines(targetFileContents, sourceFileContent);
    if (!diff) return '';

    const count = diff.reduce((acc, curr) => acc += curr.count || 0, 0);    
    if (!count) return '';

    // log the diff
    // from the jsdiff docs
    diff.forEach(async (change: Change) => {
      // green for additions, red for deletions
      // grey for common parts
      const color = change.added ? chalk.green :
      change.removed ? chalk.red : chalk.gray;
      console.log(color(change.value));
    });
  
    // filename will appear at bottom of diff, then prompt
    console.log(`Showing potential changes in ${targetFilePath.replace('/', '\\')}`)

    const answer = await prompt({
      type: 'list',
      name: 'choice',
      choices: ['yes', 'skip', 'yes to all', 'abort'],
      message: `File ${chalk.yellow(targetFilePath)} is about to be overwritten with the above changes. Are you sure you want to continue?`,
    });

    console.log('answer.choice: ', answer.choice)

    return answer.choice;
};

export const transformFiles = async (templatePath: string, answers: Answers) => {
  // get absolute path for destination of app
  const destinationPath = path.resolve(answers.destination);
  
  // pass in helper to answers object
  const ejsData = {
    ...answers,
    helper: {
      getPascalCaseName: getPascalCaseName,
    },
  };
  
  const files = glob.sync('**/*', { cwd: templatePath, dot: true, nodir: true });

  for (const file of files) {
    try {      
      const pathToNewFile = `${destinationPath}\\${file}`
      const pathToTemplate = path.join(templatePath, file);
      
      // if the directory doesn't exist, create it
      fs.mkdirsSync(path.dirname(pathToNewFile));
  
      if (!answers.appPrefix) {
        answers.appPrefix = false;
      };
      
      if (file.endsWith('.pdf')) {
        // pdfs may have <% encoded, which throws an error for ejs.
        // we simply want to copy file if it's a pdf, not render it with ejs.
        fs.copySync(pathToTemplate, pathToNewFile);
        continue;
      };
            
      const str = await renderFile(pathToTemplate, ejsData);

      // if it's a post-initializer, run diffFiles()
      if (answers._?.includes('add')) {
        let choice: string;
        choice = await diffFiles(str, transformFilename(pathToNewFile, answers));
        switch (choice) {
          case 'yes':
            fs.writeFileSync(`${destinationPath}\\${transformFilename(file, answers)}`, str, 'utf-8');
            continue;
          case 'yes to all':
            // empty answers so diffFiles() won't be run again
            answers._ = [];
            fs.writeFileSync(`${destinationPath}\\${transformFilename(file, answers)}`, str, 'utf-8');
            continue;
          case 'skip':
            continue;
          case 'abort':
            console.log(chalk.yellow('Goodbye!'));
            process.exit();
          default: 
            fs.writeFileSync(`${destinationPath}\\${transformFilename(file, answers)}`, str, 'utf-8');
            continue;
        }
      } else {
        fs.writeFileSync(`${destinationPath}\\${transformFilename(file, answers)}`, str, 'utf-8');
      }
  
    } catch (error) {
      console.log(chalk.red(error));
    }
  };
};

export const openPackageJson = () => {
  const data = fs.readFileSync(path.resolve('./', 'package.json'), 'utf8');
  return JSON.parse(data);
};

export const nextSteps = (appName: string) => {
  console.log(chalk.red('                 -/oyhdmNNNNmdhyo/-                '));
  console.log(chalk.red('             :sdMMMMMMMMMMMMMMMMMMMMds:            '));
  console.log(chalk.red('          :yNMMMMMMMMMMMMMMMMMMMMMMMMMMNy:         '));
  console.log(chalk.red('        /mMMMMMMMMMNdyo+//://+shmMMMMMMMMMm/       '));
  console.log(chalk.red('      :mMMMMMMMMh+.              `:smMMMMMMMm:     '));
  console.log(chalk.red('    `yMMMMMMMm+`                     :yMMMMMMMs`   '));
  console.log(chalk.red('   `dMMMMMMN/                          .hMMMMMMd`  '));
  console.log(chalk.red('  `mMMMMMMh`                          -s/+MMMMMMd` '));
  console.log(chalk.red('  yMMMMMMh                        `:yNMMMs/MMMMMMy '));
  console.log(chalk.red(' :MMMMMMm`                       `hMMMMMMMsoMMMMMM-'));
  console.log(chalk.red(' yMMMMMM/                          dMMMMMMM:mMMMMMy'));
  console.log(chalk.red(' NMMMMMN`                          oMyossss:sMMMMMm'));
  console.log(chalk.red(' MMMMMMN                           yM:NMMMMyoMMMMMN'));
  console.log(chalk.red(' mMMMMMM`                         :Md+MMMMMoyMMMMMm'));
  console.log(chalk.red(' yMMMMMM+                        :NN+NMMMMM-NMMMMMy'));
  console.log(chalk.red(' :MMMMMMN:-                    `sMdyMNymMMosMMMMMM-'));
  console.log(chalk.red('  yMMMMMMd/o`                .oNdhmMhhMmh++MMMMMMy '));
  console.log(chalk.red('  `dMMMMMMm+do.-         ./oyhhhNNhyNMMNosMMMMMMd` '));
  console.log(chalk.red('   `dMMMMMMMssNdhsoo+/+oyyyydMmhhhMMMNs+mMMMMMMd`  '));
  console.log(chalk.red('    `yMMMMMMMNyydMNddddddddddhmMMMMho+dMMMMMMMy`   '));
  console.log(chalk.red('      :mMMMMMMMMmhhhdNMMMMMMMMmhssohMMMMMMMMm:     '));
  console.log(chalk.red('        /mMMMMMMMMMMNdhyyyyyyyhmMMMMMMMMMMm/       '));
  console.log(chalk.red('          :yNMMMMMMMMMMMMMMMMMMMMMMMMMMNy:         '));
  console.log(chalk.red('             :sdMMMMMMMMMMMMMMMMMMMMds:            '));
  console.log(chalk.red('                `-/oyhdmNNNNmdhyo/-                '));
  console.log();
  console.log(chalk.white('                      __________'));
  console.log(chalk.white('                  __ / / __/ __/'));
  console.log(chalk.white('                 / // /\\ \\_\\ \\  '));
  console.log(chalk.white('                 \\___/___/___/'));
  console.log();
  console.log(`JSS application ${chalk.green(appName)} is ready!`);
  console.log();
  console.log(chalk.yellow('Next steps:'));
  console.log('* npm install (or yarn install, etc)');
  console.log(`* Try out your application with ${chalk.green('jss start')}`);
  console.log(`* Connect to Sitecore with ${chalk.green('jss setup')} (optional)`);
  console.log('* Enable source control (i.e. git init) (optional)');
  console.log('* Check out the JSS documentation at https://jss.sitecore.com');
  console.log();
  console.log(chalk.green('Enjoy!'));
};
