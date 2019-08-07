'use strict'

const Generator = require('yeoman-generator');
const required = x => !!x.length || 'Input required'

module.exports = class extends Generator {
  constructor() {
    super(...arguments)
  }

  prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'title',
        message: 'Title',
        validate: required
      }
    ]

    return this.prompt(prompts)
      .then(props => {
        this.props = props
      })
  }

  writing() {
    return {
      readme: this.fs.copyTpl(
        this.templatePath('README.md'),
        this.destinationPath('README.md'),
        this.props
      )
    }
  }
}