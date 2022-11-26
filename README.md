# WowPackageManager

A package manager for Wow Addon Development written in TypeScript, and compiled with Deno. The goal of this application is to make the process of developing Wow addons easier. If you've worked with `npm` or `yarn` you'll know that a package manager makes things easier! (I'll try and avoid the _shitty_ parts of those applications).

## Note:
This package is still heavily WIP, download and run at your own risk. This message will be removed when the project is ready for prime time.

## Usage:
Run `WowPackageManager` from your terminal to see all commands.

## Running from Source
1. [Install Deno](https://deno.land/manual@v1.28.2/getting_started/installation), the TypeScript runtime
2. Clone the repository
3. In the repository directory, run:

```javascript
// Show all possible top level commands:
deno run -A src/main/index.ts
```

You'll be prompted for your CurseForge API Key on the first run. That key will be saved to your home directory.

Once your API key has been saved, you can then run other commands by appending them to the `deno run -A  ...` command. For example:

```javascript
// List configuration:
deno run -A src/main/index.ts config list

// Get the value of a specific key:
deno run -A src/main/index.ts config get curseforgeAPIToken
```

## Building from Source
Because `WowPackageManager` uses NPM modules, it cannot be compiled at this time. See https://github.com/denoland/deno/issues/16632 for details.