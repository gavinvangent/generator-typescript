'use strict'

const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor() {
    super(...arguments)
  }

  init() {
    this.spawnCommandSync('git', ['init', '--quiet'])
  }

  writing() {
    return {
      gitignore: this.fs.copyTpl(
        this.templatePath('.gitignore'),
        this.destinationPath('.gitignore')
      )
    }
  }
}