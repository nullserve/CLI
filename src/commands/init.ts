import {Command, flags} from '@oclif/command'
import {existsSync, mkdirSync, writeFileSync, readFileSync, exists} from 'fs'
import {prompt} from 'inquirer'
import axios, {AxiosResponse} from 'axios'

import {Config} from '../config'

export default class Init extends Command {
  static description = 'initialize a nullserve project'

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
    let userConfig: Config

    if (existsSync(this.config.configDir)) {
      userConfig = JSON.parse(readFileSync(this.config.configDir, 'utf-8'))
    } else {
      userConfig = {}
    }

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
    let apiToken: string

    if (flags.token !== undefined && flags.token !== null) {
      apiToken = flags.token
    } else if (
      userConfig.apiToken !== undefined &&
      userConfig.apiToken !== null
    ) {
      apiToken = userConfig.apiToken
    } else {
      console.log('Need to create an api token')
      return
    }

    if (!existsSync('./.nullserve')) {
      mkdirSync('./.nullserve')
    }

    if (!existsSync('./.nullserve/routes.json')) {
      writeFileSync(
        './.nullserve/routes.json',
        JSON.stringify(this.defaultRoutes),
      )
    }

    if (shouldCreateProject) {
      const createSite = await axios.post(
        `https://api.nullserve.com/graph`,
        {
          query: `mutation {createSite(urlSlug: "${flags['site-slug']}") {urlSlug}}`,
          variables: {},
        },
        {headers: {Authorization: `Bearer ${apiToken}`}},
      )
      console.log(createSite.data)
    }
  }
}
