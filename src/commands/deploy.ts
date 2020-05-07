import fs from 'fs'
import path from 'path'
import process from 'process'
import {Command, flags} from '@oclif/command'
import axios, {AxiosResponse} from 'axios'
import mime from 'mime-types'

interface CreateSiteDeploymentResponse {
  data: {
    createSiteDeployment: {
      id: string
    }
  }
}

interface GetFileUploadUrlsResponse {
  data: {
    siteDeployment: {
      uploadUrls: {
        url: string
        fileName: string
      }[]
    }
  }
}

export default class Deploy extends Command {
  static description = 'deploy to nullserve'

  static examples = [`$ nullserve deploy`]

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
      required: true,
      env: 'NULLSERVE_SITE_SLUG',
    }),
    deployment: flags.string({
      char: 'd',
      description: 'the deployment id to use (skips deployment creation)',
    }),
  }

  static args = [{name: 'directory', required: true}]

  async run() {
    const {args, flags} = this.parse(Deploy)
    const absolutePath = path.resolve(process.cwd(), args.directory)
    const files = walkDirSync(absolutePath)
    const fileMap = files
      .map(fileName => [path.relative(args.directory, fileName), fileName])
      .reduce((obj: {[key: string]: string}, [key, val]) => {
        obj[key] = val
        return obj
      }, {})

    let deploymentId: string
    if (flags.deployment !== undefined) {
      deploymentId = flags.deployment
    } else {
      const createSiteDeployment = await axios.post(
        `https://api.nullserve.com/graph`,
        {
          query: `mutation {createSiteDeployment(siteSlug: "${flags['site-slug']}") {id}}`,
          variables: {},
        },
        {headers: {Authorization: `Bearer ${flags.token}`}},
      )
      deploymentId = ((createSiteDeployment as AxiosResponse)
        .data as CreateSiteDeploymentResponse).data.createSiteDeployment.id
    }

    const getFileUploadUrls = await axios.post(
      `https://api.nullserve.com/graph`,
      {
        query: `query {siteDeployment(id: "${deploymentId}") {uploadUrls(fileNames: [${Object.keys(
          fileMap,
        )
          .map(fileName => `"${fileName}"`)
          .join(',')}]) {url, fileName}}}`,
        variables: {},
      },
      {headers: {Authorization: `Bearer ${flags.token}`}},
    )
    const uploadUrls = ((getFileUploadUrls as AxiosResponse)
      .data as GetFileUploadUrlsResponse).data.siteDeployment.uploadUrls
    await Promise.all([
      uploadUrls.map(({url, fileName}) => {
        const absolutePath = fileMap[fileName]
        return uploadFile(url, absolutePath)
      }),
    ])

    await axios.post(
      `https://api.nullserve.com/graph`,
      {
        query: `mutation {updateCurrentSiteDeployment(siteSlug: "${flags['site-slug']}", siteDeploymentId: "${deploymentId}")}`,
      },
      {headers: {Authorization: `Bearer ${flags.token}`}},
    )
  }
}

function walkDirSync(dir: string): string[] {
  return fs
    .readdirSync(dir)
    .flatMap(file =>
      fs.statSync(path.join(dir, file)).isDirectory()
        ? walkDirSync(path.join(dir, file))
        : [path.join(dir, file)],
    )
}

async function uploadFile(url: string, absolutePath: string) {
  const contentType =
    mime.contentType(path.extname(absolutePath)) || 'application/octet-stream'
  console.log(`Uploading: [${absolutePath}] as [${contentType}]`)
  await axios.put(url, fs.readFileSync(absolutePath), {
    headers: {
      'Content-Type': contentType,
    },
  })
}
