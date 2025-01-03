'use strict'

const Generator = require('yeoman-generator');
const chalk = require('chalk');

const required = x => !!x.length || 'Input required'
const isName = x => {
  const pattern = new RegExp(/^\S+$/)
  return pattern.test(x) ? true : 'Service name may not contain spaces'
}

module.exports = class extends Generator.default {
  constructor() {
    super(...arguments)
  }

  async prompting() {
    this.log(`Generating project using ${chalk.default.red('generator-typescript')}`)
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
        default: '22.12.0',
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

    this.props = await this.prompt(prompts)
  }

  async writing () {
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

      nycrc: this.fs.copyTpl(
        this.templatePath('.nycrc.yml'),
        this.destinationPath('.nycrc.yml'),
        properties
      ),

      mocharc: this.fs.copyTpl(
        this.templatePath('.mocharc.yml'),
        this.destinationPath('.mocharc.yml'),
        properties
      ),

      templates: this.fs.copyTpl(
        this.templatePath('**'),
        this.destinationPath(),
        properties
      )
    }
  }

  async install() {
    const devDependencies = [
      '@types/chai@^5.0.0',
      '@types/chai-as-promised@^8.0.0',
      '@types/mocha@^10.0.0',
      '@types/node@^22.0.0',
      '@types/sinon@^17.0.0',
      '@types/sinon-chai@^4.0.0',
      'chai@^5.0.0',
      'chai-as-promised@^8.0.0',
      'eslint@^9.0.0',
      'eslint-plugin-unused-imports@^4.0.0',
      'mocha@^11.0.0',
      'nyc@^17.0.0',
      'sinon@^19.0.0',
      'sinon-chai@^4.0.0',
      'source-map-support@^0.5.0',
      'ts-sinon@^1.0.0',
      'tsx@^4.0.0',
      'typescript@^5.0.0',
      'typescript-eslint@^8.0.0'
    ]

    const dependencies = [
    ]

    await this.addDevDependencies(devDependencies)
    await this.addDependencies(dependencies)
  }
}