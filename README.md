# Joi Polloi Electron React Skeleton

This project is built from Create React App - see the README-CRA.md for the full documentation of the package.

## Setup

Clone down this repo, run `nvm use` to ensure the correct Node version is loaded, and then run `npm install`. If you do not have nvm installed, you can find it [here](https://github.com/nvm-sh/nvm).

## Development

The core of this project is create from Create React App, and so should behave no differently to usual. You can develop as normal in the browser by running `npm run start`.

Hygen is present to allow quick scaffolding of components - run `npm run new:component` to trigger it, with included SCSS module for styling. The command will prompt for options as to type of component, name, and optional directory - if you wish to configure this further, the settings are found in the `.hygen` folder.

This repo also has linting settings included if you are using VSCode - the extensions "Prettier - Code formatter" and "ESLint" will need to be installed if you do not have them already. They should appear in the recommended extensions for this project automatically, if not simply search for them.

## Electron

The main feature of this repository is to allow Electron bundling, with the loading of external resources to allow for configuration and asset changes without needing a rebuild. These are the `config` and `asset` folders in the `public` folder. The root `App.tsx` file is passed the `config.json` file if it is present, and a path to the asset folder. This path will be automatically configured depending on the level that the project is running on, so there should be no adjustment needed between the different environments. If you have assets that are static, such as images required for CSS (icons, backgrounds, etc), these do not need to go in the asset folder - you can add them in as you normally would.

If you need to make any changes to the Electron setup, or add new features, you'll need to edit the 'public/electron.js' file.

There are 3 types of Electron environment in this project, with associated scripts to start them. The `electron-local` and `electron-build` scripts have extra flags for windowed mode and debug mode. Simply add either or both of `windowed` and `debug` to the script - `windowed` will make the Electron window load normally, rather than fullscreen, and `debug` will open DevTools automatically.

If you need to open DevTools otherwise, use the shortcut `Command-Shift-D`.

### Local Electron

Command(s):

-   `npm run electron-local`

This will open an Electron window that mirrors the normal `localhost` page from `npm run start`. You will need to run this script concurrently with `npm run start` - otherwise you won't see anything.

### Build + Electron

Command(s):

-   `npm run electron-build`

This will build the React files, then run Electron from the `index.html` in the `build` folder.

### Packaging

Command(s):

-   `npm run package-mac`
-   `npm run package-win`
-   `npm run build-package-mac`
-   `npm run build-package-win`
-   `npm run build-packages`

This will fully package up the Electron app into the `packages` folder. Mac packages will go to the `mas` subfolder, and Windows packages will be created as both an archive `.zip` file and and unzipped `win-unpacked` folder. The commands break down like so:

-   `npm run package-mac` and `npm run package-win` will package the current `build` folder
-   `npm run build-package-mac` and `npm run build-package-win` will run a new build of the React code, then package up. The Windows package command includes a rebuild of `node-sass`, as otherwise the bindings are incorrect if you try to continue development afterwards.
-   `npm run build-packages` - this simply runs both Mac and Windows build commands consecutively.

## Editing Packaged Config/Assets

The externally loaded files are located in slightly different places for Mac and Windows.

Mac:

-   Open the `packages/mas` folder in Finder - it should contain the Electron-React-Boilerplate.app file.
-   Right click, then select "Show package contents"
-   Navigate to `Contents/Resources` - this folder will contain both a `config` and `assets` folder. Make any changes inside the relevant folder, then restart the app to view.

Windows:

-   Unzip the folder, then open the resulting directory
-   Navigate to `resources` - this folder will contain both a `config` and `assets` folder. Make any changes inside the relevant folder, then restart the app to view.

## Known issues and solutions

The package build process for Mac will always error at the finish - this is because we do not have a proper Developer account to setup code signing. It does not affect the functionality of the app.

If you get a "Permission denied" when the npm scripts try to execute the electron-build.sh file, you will need to run `chmod u+r+x ./electron-build.sh` from the root of the project.
