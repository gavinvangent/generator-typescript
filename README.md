# generator-typescript
Codebase for scaffolding new projects with typescript and common tools for testing, compilation, etc


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
```
nvm install 10.16.3
# or if already installed
nvm use 10.16.3
```

generate app:
```sh
npx yo typescript:app
npx yo typescript:git
npx yo typescript:readme
npx yo typescript:serverless
```

## typescript:serverless

available node runtimes are:
 - 10.16.3
 - 10.8

 make sure you are already installed with the desired version before running the generator