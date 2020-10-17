# generator-typescript

Codebase for scaffolding new projects with typescript and common tools for testing, compilation, etc.

## Local Dev

cd to the base folder of this project

```sh
npm link
```

cd to a new directory

```sh
cd ~/some-dir
```

Its advisable to be using the version of node you intend your app to use:

eg:

```sh
nvm install 12
# or if already installed
nvm use 12
```

## Long Running Service

```sh
npx yo typescript:app
```

This will ask you a few questions used to configure your new app and then install all the required node modules. Your based structure is now ready to be used, or extended (See [plugins](#plugins)).

## Serverless with AWS Lambda

Available node runtimes are:

- 12
- 10

```sh
npx yo typescript:serverless
```

This will populate your folder with the files required for [Serverless](https://www.serverless.com) development using [AWS' Lambda](https://aws.amazon.com/lambda/): see [Serverless's AWS integration](https://www.serverless.com/framework/docs/providers/aws/).

This will ask you a few questions used to configure your new app and then install all the required node modules. Your based structure is now ready to be used, or extended (See [plugins](#plugins)).

## Plugins

All available plugins:

- [git](#git)
- [README.md](#readme)

### git

```sh
npx yo typescript:git
```

This still needs more work, but will add a .gitignore file to your app to ensure the default files are not pushed to your git repo.

It will add `pre-commit` to your devDependencies, and update the package.json with the pre-commit config. When asked if you want to overwrite the package.json file, select `y`.

### ReadMe

```sh
npx yo typescript:readme
```

This will add a README.md file to your app after asking you a few questions; the answers of which will be used to generate the README.md file.
