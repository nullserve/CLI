import {Command, flags} from '@oclif/command'
import {existsSync, mkdirSync, writeFileSync} from 'fs'
import {prompt} from 'inquirer'

export default class Init extends Command {
  static description = 'init a nullserve project'

  static examples = [`$ nullserve init`]

  static flags = {
    help: flags.help({char: 'h'}),
    token: flags.string({
      char: 'a',
      description: 'the api token used to deploy',
      env: 'NULLSERVE_API_TOKEN',
      required: false,
    }),
    'site-slug': flags.string({
      char: 's',
      description: 'the site that is being deployed to',
      required: false,
      env: 'NULLSERVE_SITE_SLUG',
    }),
  }

  static args = []

  defaultRoutes = {
    routes: [
      {useFilesystem: true},
      {
        source: '.*',
        destination: '/index.html',
      },
    ],
  }

  async run() {
    const {args, flags} = this.parse(Init)

    let promptResponses = await prompt([
      {
        name: 'shouldCreateProject',
        message: 'Create a new NullServe project?',
        default: 'yes',
        type: 'list',
        choices: [
          'yes',
          'no (will still generate local configuration)',
          'cancel',
        ],
      },
    ])

    if (promptResponses.shouldCreateProject === 'cancel') {
      console.log('Cancelled init.')
      return
    }

    const shouldCreateProject = promptResponses.shouldCreateProject === 'yes'

    if (!existsSync('./.nullserve')) {
      mkdirSync('./.nullserve')
    }

    if (!existsSync('./.nullserve/routes.json')) {
      writeFileSync(
        './.nullserve/routes.json',
        JSON.stringify(this.defaultRoutes),
      )
    }
  }
}
