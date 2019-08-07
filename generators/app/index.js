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
        name: 'nodeVersion',
        message: 'Node runtime',
        default: '10.15.3',
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
      "@types/chai",
      "@types/chai-as-promised",
      "@types/glob",
      "@types/mocha",
      "@types/node",
      "@types/sinon",
      "@types/sinon-chai",
      "chai",
      "chai-as-promised",
      "mocha",
      "nyc",
      "sinon",
      "sinon-chai",
      "source-map-support",
      "ts-node",
      "tslint",
      "tslint-config-security",
      "tslint-config-standard",
      "typescript"
    ]

    const dependencies = [
      "port-me"
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
}