import fs from 'fs'
import path from 'path'
import process from 'process'

import axios from 'axios'

// FIXME: token needs a better way to be defined
const NULLSERVE_TOKEN = process.env.NULLSERVE_TOKEN

async function main() {
  const {directory} = parseArgs()
  console.log(`dir: ${directory}`)
  const absolutePath = path.resolve(process.cwd(), directory)
  console.log(`${absolutePath}`)
  const files = walkDirSync(absolutePath)
  const relFiles = files.map(file => path.relative(directory, file))
  if (process.env.FIRE) {
    getPresignedUrl({uploadId: '1', relativeFileName: '1'})
  }
  console.log(files)
  console.log(relFiles)
  return
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

interface GetPresignedUrlParams {
  uploadId: string
  relativeFileName: string
}
async function getPresignedUrl({
  uploadId,
  relativeFileName,
}: GetPresignedUrlParams): Promise<string> {
  return await axios.post(
    `https://api.nullserve.com/uploads/${uploadId}`,
    {
      relativeFileName,
    },
    {headers: {Authorization: `Bearer ${NULLSERVE_TOKEN}`}},
  )
}

interface UploadFileParams {
  presignedUrl: string
  file: Buffer
}
async function uploadFile({
  presignedUrl,
  file,
}: UploadFileParams): Promise<void> {
  await axios.post(presignedUrl, file)
}

interface Args {
  directory: string
}
function parseArgs(): Args {
  if (process.argv.length < 3) {
    throw new Error('Not enough arguments. Specify a path')
  }
  console.log(process.argv)
  return {directory: process.argv[2]}
}

;(async () => {
  return await main()
})()

export {run} from '@oclif/command'
