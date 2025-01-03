'use strict'

const Generator = require('yeoman-generator');
const required = x => !!x.length || 'Input required'

module.exports = class extends Generator.default {
  constructor() {
    super(...arguments)
  }

  async prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'title',
        message: 'Title',
        validate: required
      }
    ]

    this.props = await this.prompt(prompts)
  }

  async writing() {
    return {
      readme: this.fs.copyTpl(
        this.templatePath('README.md'),
        this.destinationPath('README.md'),
        this.props
      )
    }
  }
}