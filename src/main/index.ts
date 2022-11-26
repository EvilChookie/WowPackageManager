import { Command } from 'npm:commander@^9.4.1';
import { checkConfigFileExists, getConfig, listConfig, printConfig, setConfig, setToken, unsetConfig } from './commands/config.ts';

const program = new Command();

const doesTokenExist = await checkConfigFileExists();
const curseToken = await getConfig('CurseForgeAPIToken');

if (!doesTokenExist || !curseToken) {
    // We need a token to be able to do anything - so let's set that on our first run.
    setToken();
} else {
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
