import yargs, { Argv, CommandModule } from 'yargs';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', (err) => {
  throw err;
});

export default function cli(commands: { [key: string]: CommandModule & { disableStrictArgs?: boolean} }) {
  let appCommands = yargs.usage('$0 <command>');

  // this prevents yargs from showing help with 'jss.js' as the base command
  // when the command is just 'jss' as a global bin
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (appCommands as any).$0 = 'jss';

  for (const cmd of Object.keys(commands)) {
    const commandObject = commands[cmd];

    // command is a yargs builder function that takes a yargs and returns a yargs
    // YARRRRRGS :D
    if (typeof commandObject.builder === 'function') {
      appCommands = commandObject.builder(appCommands);
    }

    // command is a yargs 'command module' (https://github.com/yargs/yargs/blob/master/docs/advanced.md#providing-a-command-module)
    if (typeof commandObject.builder === 'object') {
      const ogBuilder = commandObject.builder;

      // apply strict-ness to the args of each command
      const builderFunc = commandObject.disableStrictArgs
        ? (yarrrrg: Argv) => yarrrrg.options(ogBuilder)
        : (yarrrrg: Argv) => yarrrrg.options(ogBuilder).strict();

      commandObject.builder = builderFunc;

      appCommands = appCommands.command(commandObject);
    }
  }

  const argv = appCommands.demandCommand(1).help().argv;

  if (!argv._[0]) {
    console.log('Missing command. Use --help to see all available options.');
  }
}
