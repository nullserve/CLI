import {Command, flags} from '@oclif/command'
import {existsSync, mkdirSync, writeFileSync, readFileSync} from 'fs'
import {prompt} from 'inquirer'
import axios from 'axios'
import * as Yup from 'yup'

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

    const promptResponses1 = await prompt([
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
    if (promptResponses1.shouldCreateProject === 'cancel') {
      console.log('Cancelled init.')
      return
    }
    const shouldCreateProject = promptResponses1.shouldCreateProject === 'yes'
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
      let urlSlug: string

      if (flags['site-slug'] !== undefined && flags['site-slug'] !== null) {
        urlSlug = flags['site-slug']
      } else {
        let promptResponses2 = await prompt([
          {
            name: 'urlSlug',
            message: 'What is the name of the site?',
            type: 'input',
            validate: input => {
              const schema = Yup.string()
                .required('URL slug is required')
                .min(4, 'URL slug must be at least 4 characters')
                .max(48, 'URL slug must be shorter than 48 characters')
                .notOneOf(
                  [
                    'account',
                    'accounts',
                    'api',
                    'apis',
                    'apitokens',
                    'api-tokens',
                    'app',
                    'apps',
                    'auth',
                    'authentication',
                    'authentications',
                    'authorization',
                    'authorizations',
                    'authn',
                    'auths',
                    'authz',
                    'cloud',
                    'clouds',
                    'dashboard',
                    'dashboards',
                    'db',
                    'dbs',
                    'database',
                    'databases',
                    'dns',
                    'docs',
                    'domain',
                    'domains',
                    'firewall',
                    'firewalls',
                    'fqdn',
                    'fqdns',
                    'integration',
                    'integrations',
                    'limit',
                    'limits',
                    'organization',
                    'organizations',
                    'pass',
                    'password',
                    'passwords',
                    'project',
                    'projects',
                    'quota',
                    'quotas',
                    'service',
                    'services',
                    'site',
                    'sites',
                    'team',
                    'teams',
                    'user',
                    'users',
                    'websocket',
                    'websockets',
                    'wsapi',
                    'wsapis',
                    'wss',
                  ],
                  'URL slug may not be a reserved word.',
                )
                .matches(
                  /^([A-Za-z\d])([A-Za-z\d-])+([A-Za-z\d])$/,
                  'URL slug must contain only letters a-z, numbers, and hyphens. It may not start or end with hyphens.',
                )
              try {
                schema.validateSync(input)
                return true
              } catch (e) {
                return e.message
              }
            },
          },
        ])
        urlSlug = promptResponses2.urlSlug
      }

      const createSite = await axios.post(
        `https://api.nullserve.com/graph`,
        {
          query: `mutation {createSite(urlSlug: "${urlSlug}") {urlSlug}}`,
          variables: {},
        },
        {headers: {Authorization: `Bearer ${apiToken}`}},
      )
      console.log(createSite.data)
    }
  }
}
