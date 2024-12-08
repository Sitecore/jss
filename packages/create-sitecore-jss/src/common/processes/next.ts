import chalk from 'chalk';

/**
 * Logs app creation completion message and next steps
 * @param {string[]} appNames application name(s) for the new app
 * @param {string[]} nextStepsArr next steps to be performed after app is created
 */
export const nextSteps = async (appNames: string[], nextStepsArr: string[]) => {
  const successMessage =
    appNames.length > 1
      ? `JSS applications ${chalk.green(appNames.join(', '))} are ready!`
      : `JSS application ${chalk.green(appNames[0])} is ready!`;
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
  console.log(successMessage);
  console.log();
  console.log(chalk.yellow('Next steps:'));
  nextStepsArr.forEach((step) => {
    console.log(step);
  });
  console.log('* Enable source control (i.e. git init) (optional)');
  console.log('* Check out the JSS documentation at https://jss.sitecore.com');
  console.log();
  console.log(chalk.green('Enjoy!'));
};
