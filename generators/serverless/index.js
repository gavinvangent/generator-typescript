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
    case '10.16.3':
      return 'nodejs10.x'
    case '8.10':
      return 'nodejs8.10'
    default:
      throw new Error('Runtime has not be catered for')
  }
}

module.exports = class extends Generator {
  constructor() {
    super(...arguments)
  }

  prompting() {
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
        choices: [ '10.16.3', '8.10' ],
        default: 0
      },
      {
        type: 'list',
        name: 'license',
        message: 'License',
        choices: [ 'UNLICENSED', 'MIT' ],
        default: 0
      }
    ]

    return this.prompt(prompts)
      .then(props => {
        this.props = props
      })
  }

  writing () {
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

  installDependencies () {
    const devDependencies = [
      "@types/aws-lambda",
      "@types/chai",
      "@types/chai-as-promised",
      "@types/mocha",
      "@types/node",
      "@types/sinon",
      "@types/sinon-chai",
      "chai",
      "chai-as-promised",
      "mocha",
      "mockdate",
      "nyc",
      "pre-commit",
      "serverless",
      "serverless-dependson-plugin",
      "serverless-localstack",
      "serverless-prune-plugin",
      "serverless-webpack",
      "sinon",
      "sinon-chai",
      "ts-loader",
      "ts-node",
      "ts-sinon",
      "tslint",
      "tslint-config-security",
      "tslint-config-standard",
      "typescript",
      "typescript-tslint-plugin",
      "webpack"
    ]

    const dependencies = [
      "aws-sdk",
      "source-map-support"
    ]

    this.npmInstall(devDependencies, { 'save-exact': true, 'save-dev': true })
    this.npmInstall(dependencies, { 'save-exact': true, 'save': true })
  }

  install () {
    this.installDependencies({
      bower: false,
      npm: true
    })
  }

  // lint () {
  //   this.spawnCommand('npm', ['run', 'lint'])
  // }
}
