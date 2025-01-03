'use strict'

const Generator = require('yeoman-generator');
const chalk = require('chalk');

const required = x => !!x.length || 'Input required'
const isName = x => {
  const pattern = new RegExp(/^\S+$/)
  return pattern.test(x) ? true : 'Service name may not contain spaces'
}
const getRuntimeFromProps = props => {
  switch (props.nodeVersion) {
    case '22.x':
      return 'nodejs22.x'
    case '20.x':
      return 'nodejs20.x'
    case '18.x':
      return 'nodejs18.x'
    default:
      throw new Error('Runtime has not be catered for')
  }
}

module.exports = class extends Generator.default {
  constructor() {
    super(...arguments)
  }

  async prompting() {
    this.log(`Generating project using ${chalk.red('generator-typescript')}`)
    const appname = this.appname.trim().replace(/\s/g, '-')

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Package name',
        default: appname,
        validate: isName
      },
      {
        type: 'input',
        name: 'description',
        message: 'Description of the package',
        validate: required
      },
      {
        type: 'input',
        name: 'authorName',
        message: 'Author\'s name',
        validate: required
      },
      {
        type: 'list',
        name: 'nodeVersion',
        message: 'Node runtime',
        choices: ['14.x', '10.x', '8.10'],
        default: 0
      },
      {
        type: 'list',
        name: 'license',
        message: 'License',
        choices: ['UNLICENSED', 'MIT'],
        default: 0
      },
      {
        type: 'input',
        name: 'stackName',
        message: 'Cloudformation stack name',
        default: appname,
        validate: isName
      },
      {
        type: 'input',
        name: 'bucketName',
        message: 'Default bucket name for CloudFormation packages',
        default: appname,
        validate: isName
      }
    ]

    this.props = await this.prompt(prompts)
  }

  async writing() {
    const properties = {
      ...this.props,
      serviceName: this.props.name,
      runtime: getRuntimeFromProps(this.props)
    }

    return {
      npm: this.fs.copyTpl(
        this.templatePath('.npmrc'),
        this.destinationPath('.npmrc')
      ),

      nvmrc: this.fs.copyTpl(
        this.templatePath('.nvmrc'),
        this.destinationPath('.nvmrc'),
        properties
      ),

      templates: this.fs.copyTpl(
        this.templatePath('**'),
        this.destinationPath(),
        properties
      )
    }
  }

  async installDependencies() {
    const baseNodeVersion = this.props.nodeVersion.replace('.x', '');

    const devDependencies = [
      `@types/aws-lambda`,
      "@types/chai@^4",
      "@types/chai-as-promised@^7",
      "@types/mocha@^5",
      `@types/node@^${baseNodeVersion}`,
      "@types/sinon-chai@^3",
      "chai@^4",
      "chai-as-promised@^7",
      "merge-yaml-cli@^1.1.2",
      "mocha@^6",
      "mockdate@^2",
      "nyc@^14",
      "serverless@^2",
      "serverless-localstack@^0.4",
      "serverless-offline@^8",
      "serverless-webpack@^5",
      "sinon-chai@^3",
      "ts-loader@^5",
      `ts-node`,
      "ts-sinon@^1",
      "tslint@^6",
      "tslint-config-security@^1",
      "typescript@^4",
      "typescript-tslint-plugin@^0.5",
      "webpack@^4",
      "webpack-node-externals@^1"
    ]

    const dependencies = [
      "aws-sdk@^2",
      "source-map-support@^0.5"
    ]

    await this.installDevDependencies(devDependencies)
    await this.installDependencies(dependencies)
  }

  async install() {
    return this.installDependencies({
      bower: false,
      npm: true
    })
  }
}
