[![Build Status](https://travis-ci.org/ngx-builders/netlify-builder.svg?branch=master)](https://travis-ci.org/nitishk72/netlify-builder)
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)
# Angular CLI Deployment to netlify

Deploy your Angular app to Netlify directly from the Angular CLI! 🚀

## Prerequisite

You will need two things in order to get started

- API ID (Site ID) : Every Netlify application has an API ID that uniquely identify the respective app. You can find it inside your project's Setting/General section.
![alt text](https://raw.githubusercontent.com/ngx-builders/netlify-builder/master/screenshots/api-id.png)
- [Personal access tokens](https://app.netlify.com/user/applications#personal-access-tokens) : Access token gives the ability to communicate with Netlify over API and helps to push the code on Netlify.
![alt text](https://raw.githubusercontent.com/ngx-builders/netlify-builder/master/screenshots/personal-access-token.png)

## Setting up this Builder

```
ng add @netlify-builder/deploy
OR 
ng add @netlify-builder/deploy --project={projectName}
```

The above command will configure everything, you just need to provide API ID and Personal access tokens when it will ask you for that.

## That's it. Now, you are good to go

Now, Whenever you want to deploy your angular project just run a command `ng run [YOUR_PROJECT_NAME]:deploy` and your project will be deployed with new updates.


## 📦 Options <a name="options"></a>

#### --configuration <a name="configuration"></a>
 * __optional__
 * Alias: `-c`
 * Default: `production` (string)
 * Example:
    * `ng deploy` – Angular project is build in production mode
    * `ng deploy --configuration=test` – Angular project is using the configuration `test` (this configuration must exist in the `angular.json` file)

A named build target, as specified in the `configurations` section of `angular.json`.
Each named target is accompanied by a configuration of option defaults for that target.
Same as `ng build --configuration=XXX`.
This command has no effect if the option `--no-build` option is active.


#### --no-build <a name="no-build"></a>
- **optional**
- Default: `false` (string)
- Example:
  - `ng deploy` – Angular project is build in production mode before the deployment
  - `ng deploy --no-build` – Angular project is NOT build

Skip build process during deployment.
This can be used when you are sure that you haven't changed anything and want to deploy with the latest artifact.
This command causes the `--configuration` setting to have no effect.

#### --create <a name="create"></a>
- **optional**
- Default: `false` (string)
- Example:
  - `ng deploy --create` – The command will create a new site if there is no site id or the site id does not exists on netlify

#### --base-href <a name="base-href"></a>

- **optional**
- Default: `undefined` (string)
- Example:
  - `ng deploy` – The tag `<base href="/">` remains unchanged in your `index.html`
  - `ng deploy --base-href=/the-repositoryname/` – The tag `<base href="/the-repositoryname/">` is added to your `index.html`

Specifies the base URL for the application being built.
Same as `ng build --base-href=/XXX/`

#### --with-deps <a name="withDeps"></a>
- **optional**
- Default: `false` (string)
- Example:
  - `ng deploy --with-deps` – Use this flag with Nx, to build your app withDeps.
## License

MIT


