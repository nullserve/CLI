import {Command, flags} from '@oclif/command'
import {existsSync, mkdirSync} from 'fs'

export default class Init extends Command {
  static description = 'init a nullserve project'

  static examples = [`$ nullserve init`]

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static args = []

  async run() {
    const {args, flags} = this.parse(Init)
    if (!existsSync('./.nullserve')) {
      mkdirSync('./.nullserve')
    }
  }
}
