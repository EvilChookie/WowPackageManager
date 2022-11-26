import init from './commands/init.ts';
import link from './commands/link.ts';

import { Command } from 'npm:commander@^9.4.1';
import { checkConfigFileExists, getConfig, listConfig, printConfig, setConfig, setToken, unsetConfig } from './commands/config.ts';
import log from './util/log.ts';
const program = new Command();

const doesTokenExist = await checkConfigFileExists();
const curseToken = await getConfig('curseforgeAPIToken');

if (!doesTokenExist || !curseToken) {
    // We need a token to be able to do anything - so let's set that on our first run.
    setToken();
} else {
    program.command('init')
        .description('Initialise the current directory as a new World of Warcraft Addon')
        .option('-n, --name <name>', 'The name of your addon. If the name has spaces, wrap in quotes.')
        .option('-a, --author <author>', 'The author of your addon. If the author has spaces, wrap in quotes.')
        .option('-p, --path <path>', 'The folder on your filesystem. If it contains spaces, wrap in quotes. If this is not specified, the current directory will be used.')
        .action((options) => init(options));

    program.command('link')
        .description('Creates a symlink between your addon and your World of Warcraft directory')
        .option('-a, --addon-path <path>', 'The path to your addon source folder on your file system - where your dev work is done')
        .option('-w, --wow-path <path>')
        .action((options) => link(options));

    const config = program.command('config')
        .description('Gets, Sets or Unsets a given configuration key from the WowPackageManager.json file in your home directory')
        .alias('c');

    config.command('list')
        .description('List all currently set configuration')
        .alias('l')
        .action(() => listConfig());

    config.command('set')
        .description('Set a configuration, providing a key and value')
        .alias('s')
        .argument('<key>', 'The configuration key')
        .argument('<value>', 'The value to set')
        .action((theKey, value) => setConfig(theKey, value));

    config.command('get')
        .description('Get a configuration, providing a key')
        .alias('g')
        .argument('<key>', 'The configuration key')
        .action((theKey) => printConfig(theKey));

    config.command('delete')
        .description('Remove a configuration specified by a key')
        .alias('d')
        .argument('<key>', 'The configuration key to remove')
        .action((theKey) => unsetConfig(theKey));

    program.parse();
}
