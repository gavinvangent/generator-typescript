# generator-typescript

Codebase for scaffolding new projects with typescript and common tools for testing, compilation, etc.

## Local Dev

Change directory to the base folder of this project, and ensure you are using the version of node that you want the generated code to use (assuming you are using [nvm](https://github.com/nvm-sh/nvm)):

```sh
nvm current
```

To change your version of node, use:

```sh
nvm install xx.xx.xx
# ie
nvm install 12.19.0
```

Then link this code base to your local npm repo:

```sh
npm link
```

Change directory to a new directory:

```sh
cd ~/some-dir
```

Now ensure you are using the same version of node in this output directory:

```sh
nvm use xx.xx.xx
# ie
nvm use 12.19.0
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
