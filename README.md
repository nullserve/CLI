# nullserve-cli

Command line tool to interact with the NullServe API

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/nullserve-cli.svg)](https://npmjs.org/package/nullserve-cli)
[![Downloads/week](https://img.shields.io/npm/dw/nullserve-cli.svg)](https://npmjs.org/package/nullserve-cli)
[![License](https://img.shields.io/npm/l/nullserve-cli.svg)](https://github.com/nullserve/nullserve-cli/blob/master/package.json)

<!-- toc -->

- [Usage](#usage)
- [Commands](#commands)
  <!-- tocstop -->

# Usage

<!-- usage -->

```sh-session
$ npm install -g nullserve-cli
$ nullserve-cli COMMAND
running command...
$ nullserve-cli (-v|--version|version)
nullserve-cli/0.0.0 darwin-x64 node-v11.15.0
$ nullserve-cli --help [COMMAND]
USAGE
  $ nullserve-cli COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [`nullserve-cli hello [FILE]`](#nullserve-cli-hello-file)
- [`nullserve-cli help [COMMAND]`](#nullserve-cli-help-command)

## `nullserve-cli hello [FILE]`

describe the command here

```
USAGE
  $ nullserve-cli hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ nullserve-cli hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/nullserve/nullserve-cli/blob/v0.0.0/src/commands/hello.ts)_

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
