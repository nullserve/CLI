# nullserve-cli

Command line tool to interact with the NullServe API

[![oclif](https://img.shields.io/badge/cli-oclif-informational.svg?style=for-the-badge)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@nullserve/cli.svg?style=for-the-badge&logo=npm)](https://npmjs.org/package/nullserve-cli)
[![Downloads/week](https://img.shields.io/npm/dw/@nullserve/cli.svg?style=for-the-badge&logo=npm)](https://npmjs.org/package/nullserve-cli)
[![License](https://img.shields.io/npm/l/@nullserve/cli.svg?style=for-the-badge&logo=apache)](https://github.com/nullserve/nullserve-cli/blob/master/package.json)

<!-- prettier-ignore-start -->
<!-- toc -->
* [nullserve-cli](#nullserve-cli)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
<!-- prettier-ignore-end -->

# Usage

<!-- prettier-ignore -->
<!-- usage -->
```sh-session
$ npm install -g @nullserve/cli
$ nullserve COMMAND
running command...
$ nullserve (-v|--version|version)
@nullserve/cli/0.0.6 darwin-x64 node-v13.11.0
$ nullserve --help [COMMAND]
USAGE
  $ nullserve COMMAND
...
```
<!-- usagestop -->
<!-- prettier-ignore-end -->

# Commands

<!-- prettier-ignore-start -->
<!-- commands -->
* [`nullserve deploy DIRECTORY`](#nullserve-deploy-directory)
* [`nullserve help [COMMAND]`](#nullserve-help-command)
* [`nullserve init`](#nullserve-init)
* [`nullserve login [FILE]`](#nullserve-login-file)

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

_See code: [src/commands/deploy.ts](https://github.com/nullserve/nullserve-cli/blob/v0.0.6/src/commands/deploy.ts)_

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

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_

## `nullserve init`

initialize a nullserve project

```
USAGE
  $ nullserve init

OPTIONS
  -a, --token=token          the api token used to deploy
  -h, --help                 show CLI help
  -s, --site-slug=site-slug  the site that is being deployed to

EXAMPLE
  $ nullserve init
```

_See code: [src/commands/init.ts](https://github.com/nullserve/nullserve-cli/blob/v0.0.6/src/commands/init.ts)_

## `nullserve login [FILE]`

describe the command here

```
USAGE
  $ nullserve login [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/login.ts](https://github.com/nullserve/nullserve-cli/blob/v0.0.6/src/commands/login.ts)_
<!-- commandsstop -->
<!-- prettier-ignore-end -->
