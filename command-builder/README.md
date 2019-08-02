# Angular CLI Deployment to netlify

Deploy your Angular app to Netlify directly from the Angular CLI! 🚀

## How to use ?

It's a small two step JOB ?
- Install the @netlify-builder/deploy
- Configure the Angular project with your netlify account

## Step 1

```
npm i @netlify-builder/deploy
```

## Step 2

Open the `angular.json` and add this code inside the **architect** object.

```json
   "deploy": {
          "builder": "@netlify-builder/deploy:deploy",
          "options": {
            "command": "deploy",
            "outputPath": "dist/[YOUR_PROJECT_NAME]",
            "netlifyToken": "[YOUR_NETLIFY_TOKEN]",
            "siteId": "[YOUR_SITE_ID]"
          }
        }
```
- *We need to update 3 data in this code.*

   - YOUR_PROJECT_NAME
   - YOUR_NETLIFY_TOKEN
   - YOUR_SITE_ID

1.  netlifyToken : token provided by netlify, generate one from [netlify](https://app.netlify.com/user/applications#personal-access-tokens).

2. siteId: siteId for your application, every site has unique siteId. Site ID is also known as **API ID** . You can find this inside your project's Setting/General section.

3. outputPath: By default output path of any angular project is `dist/[YOUR_PROJECT_NAME]`. This is the path where your project get build.

## That's it. Now, you are good to go

Now whenever you want to deploy your angular project just run a command `ng run [YOUR_PROJECT_NAME]:deploy` and your project got live with new update.

## License

MIT


