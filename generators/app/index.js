'use strict'

const Generator = require('yeoman-generator');
const chalk = require('chalk');

const required = x => !!x.length || 'Input required'
const isName = x => {
  const pattern = new RegExp(/^\S+$/)
  return pattern.test(x) ? true : 'Service name may not contain spaces'
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
        type: 'input',
        name: 'nodeVersion',
        message: 'Node runtime',
        default: '16.16.0',
        validate: required
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
      serviceName: this.props.name
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
      '@types/chai@4.2.14',
      '@types/chai-as-promised@7.1.3',
      '@types/glob@7.1.3',
      '@types/mocha@8.0.3',
      '@types/node@16',
      '@types/sinon@9.0.8',
      '@types/sinon-chai@3.2.5',
      'chai@4.2.0',
      'chai-as-promised@7.1.1',
      'mocha@6.2.3',
      'nyc@15.1.0',
      'sinon@9.2.0',
      'sinon-chai@3.5.0',
      'source-map-support@0.5.19',
      'ts-node@9.0.0',
      'tslint@6.1.3',
      'tslint-config-security@1.16.0',
      'typescript@4.9.5',
      'typescript-tslint-plugin@0.5.5'
    ]

    const dependencies = [
    ]

    this.npmInstall(devDependencies, { 'save-exact': true, 'save-dev': true })
    this.npmInstall(dependencies, { 'save-exact': true, 'save': true })
  }
}