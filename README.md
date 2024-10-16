# ts-kit

> Common boilerplate for TypeScript projects

## Setup

**Install NVM** 

- [OSX / Linux](https://github.com/nvm-sh/nvm#installing-and-updating)
- [Windows](https://github.com/coreybutler/nvm-windows)

```sh
nvm use
npm i
npm start
```

## Usage

**Run typescript compiler**

```sh
npm start
```

**Run unit tests**
```sh
npm test
```

**Installing packages**
```sh
npm install <package> | npm install --save-dev <package>
```

### Workspaces
The kit uses `vscode workspaces` for vscode project settings:

### Format on Save (optional)
Add the following code to your `.vscode/settings.json` will automatically fix all eslint errors whenever you save a file.
```json
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
```