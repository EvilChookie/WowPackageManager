import { SEP } from 'https://deno.land/std@0.110.0/path/separator.ts';
import log from '../util/log.ts';

const configFileName = Deno.env.get('HOME') ? `${Deno.env.get('HOME')}${SEP}WowPackageManager.json` : `${Deno.env.get('USERPROFILE')}${SEP}WowPackageManager.json`;

async function setToken() {
    if (await checkConfigFileExists()) {
        log.info(`Your configuration file exists, but doesn't have your CurseForge API Token. Let's set it.`, `Visit https://authors.curseforge.com/account/api-tokens to generate a token if you haven't already, and generate a key.`);
    } else {
        log.info(`This looks like your first time running WowPackageManager! Let's get you set up!`, `Visit https://authors.curseforge.com/account/api-tokens to generate a token if you haven't already, and generate a key.`);
    }

    // Collect the token:
    const token = prompt('Enter your CurseForge API Token:');

    // Set the token:
    try {
        await setConfig('CurseForgeAPIToken', token);
        log.success(`Your CurseForge API Token has been saved successfully. Run WowPackageManager again to see what the program can do!`);
    } catch (_err) {
        log.error(`The token couldn't be saved to the configuration file. See any previous messages for clues as to what went wrong.`);
    }
}

async function setConfig(key: string, value: any) {
    const config = await loadConfig();
    try {
        config[key] = value;
        await writeConfig(config);
        log.success(`The key ${key} with a value of ${value} has been successfully written to ${configFileName}.`);
    } catch (_err) {
        log.error(`The configuration couldn't be saved the configuration file. See any previous messages for clues as to what went wrong.`);
    }
}

async function unsetConfig(key: string) {
    const config = await loadConfig();
    try {
        delete config[key];
        await writeConfig(config);
        log.success(`The configuration key ${key} has been successfully unset.`);
    } catch (_err) {
        log.info(`No such configuration key ${key} could be found in the configuration.`);
    }
}

async function getConfig(key: string) {
    const config = await loadConfig();
    return config[key] ? config[key] : false;
}

async function printConfig(key: string) {
    const config = await loadConfig();

    if (config[key]) {
        log.success(`The value of ${key} is ${config[key]}`);
    } else {
        log.info(`No such configuration key ${key} could be found in the configuration.`);
    }
}

async function listConfig() {
    const config = await loadConfig();

    if (Object.keys(config).length > 0) {
        log.info('The following configuration items are set:');
        for (const key in config) {
            log.config(key, config[key]);
        }
    } else {
        log.error('The configuration file is present, but there are no configuration items in it.');
    }
}

async function writeConfig(config: Record<string, unknown>) {
    try {
        await Deno.writeTextFile(configFileName, JSON.stringify(config));
    } catch (err) {
        log.error(`There was an error attempting to write the configuration file. The error was:`, err);
    }
}

async function loadConfig() {
    try {
        return JSON.parse(await Deno.readTextFile(configFileName));
    } catch (_err) {
        // If the file doesn't exist, we'll fail silently here...
    }

    // ... and just return an empty object:
    return {};
}

async function checkConfigFileExists(): Promise<boolean> {
    try {
        await Deno.readTextFile(configFileName);
        return true;
    } catch (_err) {
        // We'll just fail silently here
    }

    return false;
}

export { checkConfigFileExists, getConfig, listConfig, loadConfig, printConfig, setConfig, setToken, unsetConfig, writeConfig };
