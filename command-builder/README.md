# Angular CLI Deployment to netlify

Deploy your Angular app to Netlify directly from the Angular CLI! 🚀

## Prerequisite

You will need two things in order to get started

- API ID (Site ID) : Every netlify app have a API ID which uniquly identify that app. You can find this inside your project's Setting/General section.
![alt text](./screenshots/api-id.png)
- [Personal access tokens](https://app.netlify.com/user/applications#personal-access-tokens) : Acess token give you the ability to communicate with netlify over API. This will help you in pushing the code on Netlify.
![alt text](./screenshots/personal-access-token.png)

## Setting up this Builder

```
ng add @netlify-builder/deploy
```

This command will configure everything, you just need to provide API ID and Personal access tokens when it will ask you for that.

## That's it. Now, you are good to go

Now whenever you want to deploy your angular project just run a command `ng run [YOUR_PROJECT_NAME]:deploy` and your project got live with new update.

## License

MIT


