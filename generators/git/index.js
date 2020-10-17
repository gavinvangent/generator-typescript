'use strict'

const Generator = require('yeoman-generator');
const { installDependencies } = require('yeoman-generator/lib/actions/install');

module.exports = class extends Generator {
  constructor() {
    super(...arguments)
  }

  init() {
    this.spawnCommandSync('git', ['init', '--quiet'])
  }

  installDependencies() {
    const devDependencies = [
      'pre-commit@1.2.2'
    ]

    const dependencies = [
    ]

    this.npmInstall(devDependencies, { 'save-exact': true, 'save-dev': true })
    this.npmInstall(dependencies, { 'save-exact': true, 'save': true })
  }

  modifyPackageJson() {
    this.fs.copy('package.json', 'package.json', {
      process: content => {
        const json = JSON.parse(content);
        json['pre-commit'] = {
          "pre-commit": [
            "lint",
            "coverage",
            "build"
          ],
        };

        return JSON.stringify(json, null, 2);
      }
    });
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