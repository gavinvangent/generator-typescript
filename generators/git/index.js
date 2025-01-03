'use strict'

var Generator = require('yeoman-generator');

module.exports = class extends Generator.default {
  constructor() {
    super(...arguments)
  }

  async init() {
    return this.spawnCommandSync('git', ['init', '--quiet'])
  }

  async install() {
    const devDependencies = [
      'pre-commit@1'
    ]

    const dependencies = [
    ]

    await this.addDevDependencies(devDependencies);
    await this.addDependencies(dependencies);
  }

  async modifyPackageJson() {
    return this.fs.copy('package.json', 'package.json', {
      process: content => {
        const json = JSON.parse(content);
        json['pre-commit'] = [
          "lint",
          "coverage",
          "build"
        ];

        return JSON.stringify(json, null, 2);
      }
    });

    console.log('modifyPackageJson', 'end');
  }

  async writing() {
    return {
      gitignore: this.fs.copyTpl(
        this.templatePath('.gitignore'),
        this.destinationPath('.gitignore')
      )
    }
  }
}