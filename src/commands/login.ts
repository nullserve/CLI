import {Command, flags} from '@oclif/command'
import puppeteer from 'puppeteer'

export default class Login extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  }

  static args = [{name: 'file'}]

  async run() {
    const {args, flags} = this.parse(Login)

    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ['--app'],
    })
    const [page] = await browser.pages()
    await page.goto('https://app.nullserve.com')
  }
}
