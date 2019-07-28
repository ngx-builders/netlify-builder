# Angular CLI Deployment to netlify

Deploy your Angular app to Netlify directly from the Angular CLI! 🚀

## How to use?

```
npm i @netlify-builder/deploy
ng run [PROJECT_NAME]:deploy
```

## Options

Add the below configuration on your `angular.json`:

1. netlifyToken : token provided by netlify, generate one from [netlify](https://app.netlify.com/user/applications#personal-access-tokens).
2. siteId: siteId for your application, every site has unique siteId.
3. outputPath: path where your build will be generated.

```json
   "deploy": {
          "builder": "@netlify-builder/deploy:deploy",
          "options": {
            "command": "deploy",
            "outputPath": "dist/[PROJECT_NAME]",
            "netlifyToken": "tokenValue",
            "siteId": "siteId"
          }
        }
```

## License

MIT


