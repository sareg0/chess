# Table of Contents
[Format/Lint on save with VSCode](#formatlint-on-save-with-vscode)


# vue-chess

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run build
npm run test:e2e # or `npm run test:e2e:ci` for headless testing
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Format/Lint on save with VSCode 

To make sure the code adheres to the format of the repository, you can edit the settings in VSCode to use the `eslint` configuration for formatting the linting the code.

### Step 1: Install the ESLint Extension for VSCode

[ESLint by Microsoft](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

ESLint will use the configuration specified in the [`.eslintrc` file in the root of this project]("./.eslintrc.cjs") to understand the type of formatting standard and linting rules it should use.


### Step 2: Edit VSCode Workspace settings.

The ESLint extension adds variables to the settings for VSCode, which can be used to tell VSCode how to lint the project.

Update the "Workspace" settings with the following options:


```json
{
    "eslint.format.enable": true,
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true,
    }
}
```


> `eslint.format.enable`: enables ESLint as a formatter for validated files. Although you can also use the formatter on save using the setting `editor.formatOnSave` it is recommended to use the `editor.codeActionsOnSave` feature since it allows for better configurability. - _ESLint GitHub Repo, ["Settings Options"](https://github.com/Microsoft/vscode-eslint#settings-options)_


Need help finding your VSCode settings, or understanding the difference between the `User` and `Workspace` settings? Check out the documentation on [User and Workspace Settings](https://code.visualstudio.com/docs/getstarted/settings).
