# UIC Grace Shopper Template

## ------- [WORK IN PROGRESSS] -------------

## Setup

To use this as boilerplate, you'll need to take the following steps:

- Don't fork or clone this repo! Instead, create a new, empty
  directory on your machine and `git init` (or create an empty repo on
  Github and clone it to your local machine)

- Now you will have to add the fs-app-template as a remote and merge it into your own repository.

```
git remote add gs-uic-template https://github.com/FullstackAcademy/gs-uic-template.git
git fetch gs-uic-template
git merge gs-uic-template/main
git branch -m master main
```

## Customize

Now that you've got the code, follow these steps to get acclimated:

- Update project name and description in `package.json`
- `npm install`
- Create a postgres databases `grace-shopper`:

```
createdb grace-shopper
```

## Start

Sync and seed your database by running `npm run seed`. Running `npm run start:dev` will make great things happen!

- start:dev will both start your server and build your client side files using webpack
- start:react will start just the react code by itself
- start:server will start your server by itself

Windows users might have to use the solo commands to get it working :/
