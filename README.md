[![Build Status](https://travis-ci.org/ngx-builders/netlify-builder.svg?branch=master)](https://travis-ci.org/nitishk72/netlify-builder)
[![All Contributors](https://img.shields.io/badge/all_contributors-5-orange.svg?style=flat-square)](#contributors)

## **Deploy your Angular app to Netlify directly from the Angular CLI! 🚀**
### Pre-requisites
- Angular project created via [Angular CLI](https://github.com/angular/angular-cli) v8.3.0 or greater.

### Steps:
1. run ```ng add @netlify-builder/deploy``` to add necessary dependencies. Once, it get installed,you will be prompted to enter (a) Site Id and (b) netlfy Token
  ![Screenshot](screenshots/step-1.png)
2. run ```ng deploy``` assuming that you have [Angular CLI](https://github.com/angular/angular-cli) installed globally

    OR
    
    add below script to ```package.json```
   ```
   "deploy":"ng deploy"
   ```

   ![Screenshot](screenshots/step-2.png)


# Netlify Builder demo


This repository contains an example of the Angular CLI Architect API.

## Builder

You can find the Architect builder in the `command-builder` directory.

## Sample application

The sample application which uses the Architect builder is available under the `builder-test` directory.

## License

MIT


## Setup

1. Move to command-builder and run the below command

```sh
yarn install
```

2. Run the below command to build the package

```sh
yarn build
```

3. run the below command to link the package

```
npm link
```

## To test pacakge

1. Move to builder-test and run the below command

```sh
yarn install
```

2. Link the package

```sh
npm link @netlify-builder/deploy
```

3. Provide below config in angular.json
```json
   "deploy": {
          "builder": "@netlify-builder/deploy:deploy",
          "options": {
            "command": "deploy",
            "outputPath": "dist/builder-test",
            "netlifyToken": "[tokenValue]",
            "siteId": "[siteId]",
            "args": [
              "src/main.ts"
            ]
          }
        }
```

4. Test the command

```sh
ng run builder-test:deploy
```

## Link to [Step by Step Guide](https://www.netlify.com/blog/2019/09/17/using-the-angular-builder-for-netlify/)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center"><a href="https://www.youtube.com/c/NitishKumarSingh"><img src="https://avatars2.githubusercontent.com/u/15886737?v=4" width="100px;" alt="Nitish Kumar Singh"/><br /><sub><b>Nitish Kumar Singh</b></sub></a><br /><a href="https://github.com/ngx-builders/netlify-builder/commits?author=nitishk72" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Shaikh-Ubaid"><img src="https://avatars2.githubusercontent.com/u/43722035?v=4" width="100px;" alt="Shaikh-Ubaid"/><br /><sub><b>Shaikh-Ubaid</b></sub></a><br /><a href="https://github.com/ngx-builders/netlify-builder/commits?author=Shaikh-Ubaid" title="Documentation">📖</a></td>
    <td align="center"><a href="https://iamsurajdc.js.org"><img src="https://avatars0.githubusercontent.com/u/32074031?v=4" width="100px;" alt="Suraj Chandgude"/><br /><sub><b>Suraj Chandgude</b></sub></a><br /><a href="https://github.com/ngx-builders/netlify-builder/commits?author=iamsurajdc" title="Code">💻</a></td>
    <td align="center"><a href="https://www.santoshyadav.dev"><img src="https://avatars3.githubusercontent.com/u/11923975?v=4" width="100px;" alt="Santosh Yadav"/><br /><sub><b>Santosh Yadav</b></sub></a><br /><a href="https://github.com/ngx-builders/netlify-builder/commits?author=santoshyadav198613" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/alan-agius4"><img src="https://avatars3.githubusercontent.com/u/17563226?v=4" width="100px;" alt="Alan Agius"/><br /><sub><b>Alan Agius</b></sub></a><br /><a href="https://github.com/ngx-builders/netlify-builder/commits?author=alan-agius4" title="Code">💻</a></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
