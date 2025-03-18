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
        default: '16.20.2',
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
      mocharc: this.fs.copyTpl(
        this.templatePath('.mocharc.yml'),
        this.destinationPath('.mocharc.yml')
      ),

      npm: this.fs.copyTpl(
        this.templatePath('.npmrc'),
        this.destinationPath('.npmrc')
      ),

      nvmrc: this.fs.copyTpl(
        this.templatePath('.nvmrc'),
        this.destinationPath('.nvmrc'),
        properties
      ),

      nycrc: this.fs.copyTpl(
        this.templatePath('.nycrc.yml'),
        this.destinationPath('.nycrc.yml'),
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
      '@eslint/js@9',
      '@types/chai@4',
      '@types/chai-as-promised@7',
      '@types/glob@7',
      '@types/mocha@8',
      '@types/node@22', // TODO - this needs to use the version of node selected in the generate prompts
      '@types/sinon-chai@3',
      'chai@4',
      'chai-as-promised@7',
      'eslint@9',
      'mocha@10',
      'nyc@17',
      'sinon-chai@3',
      'ts-sinon@1',
      'tsx@4',
      'typescript@5',
      'typescript-eslint@8'
    ]

    const dependencies = [
    ]

    this.npmInstall(devDependencies, { 'save-exact': true, 'save-dev': true })
    this.npmInstall(dependencies, { 'save-exact': true, 'save': true })
  }
}