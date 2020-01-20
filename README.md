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
$ nullserve-cli COMMAND
running command...
$ nullserve-cli (-v|--version|version)
@nullserve/cli/0.0.0 darwin-x64 node-v11.15.0
$ nullserve-cli --help [COMMAND]
USAGE
  $ nullserve-cli COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [`nullserve-cli deploy DIRECTORY`](#nullserve-cli-deploy-directory)
- [`nullserve-cli help [COMMAND]`](#nullserve-cli-help-command)

## `nullserve-cli deploy DIRECTORY`

deploy to nullserve

```
USAGE
  $ nullserve-cli deploy DIRECTORY

OPTIONS
  -a, --token=token            the api token used to deploy
  -d, --deployment=deployment  the deployment id to use (skips deployment creation)
  -h, --help                   show CLI help
  -s, --site-slug=site-slug    (required) the site that is being deployed to

EXAMPLE
  $ nullserve deploy
```

_See code: [src/commands/deploy.ts](https://github.com/nullserve/nullserve-cli/blob/v0.0.0/src/commands/deploy.ts)_

## `nullserve-cli help [COMMAND]`

display help for nullserve-cli

```
USAGE
  $ nullserve-cli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.1/src/commands/help.ts)_

<!-- commandsstop -->
