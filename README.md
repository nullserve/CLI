# nullserve-cli

Command line tool to interact with the NullServe API

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/nullserve-cli.svg)](https://npmjs.org/package/nullserve-cli)
[![Downloads/week](https://img.shields.io/npm/dw/nullserve-cli.svg)](https://npmjs.org/package/nullserve-cli)
[![License](https://img.shields.io/npm/l/nullserve-cli.svg)](https://github.com/nullserve/nullserve-cli/blob/master/package.json)

<!-- toc -->

- [nullserve-cli](#nullserve-cli)
- [Usage](#usage)
- [Commands](#commands)
  <!-- tocstop -->

# Usage

<!-- usage -->

```sh-session
$ npm install -g @nullserve/cli
$ nullserve COMMAND
running command...
$ nullserve (-v|--version|version)
@nullserve/cli/0.0.3 darwin-x64 node-v11.15.0
$ nullserve --help [COMMAND]
USAGE
  $ nullserve COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [`nullserve deploy DIRECTORY`](#nullserve-deploy-directory)
- [`nullserve help [COMMAND]`](#nullserve-help-command)

## `nullserve deploy DIRECTORY`

deploy to nullserve

```
USAGE
  $ nullserve deploy DIRECTORY

OPTIONS
  -a, --token=token            the api token used to deploy
  -d, --deployment=deployment  the deployment id to use (skips deployment creation)
  -h, --help                   show CLI help
  -s, --site-slug=site-slug    (required) the site that is being deployed to

EXAMPLE
  $ nullserve deploy
```

_See code: [src/commands/deploy.ts](https://github.com/nullserve/nullserve-cli/blob/v0.0.3/src/commands/deploy.ts)_

## `nullserve help [COMMAND]`

display help for nullserve

```
USAGE
  $ nullserve help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.1/src/commands/help.ts)_

<!-- commandsstop -->
