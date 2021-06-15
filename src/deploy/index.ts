import {
    BuilderContext,
    BuilderOutput,
    createBuilder,
} from "@angular-devkit/architect";
import { json } from "@angular-devkit/core";
import { Schema } from "./schema";
const NetlifyAPI = require("netlify");

export default createBuilder(
    async (
        builderConfig: Schema,
        context: BuilderContext
    ): Promise<BuilderOutput> => {
        context.reportStatus(`Executing deploy...`);
        context.logger.info(`Executing netlify deploy command ...... `);

        if (builderConfig.noBuild) {
            context.logger.info(`📦 Skipping build`);
        } else {
            const configuration = builderConfig.configuration || "production";

            const withDeps = {
                ...{ withDeps: builderConfig.withDeps },
            };

            let overrides: any = {
                // this is an example how to override the workspace set of options
                ...(builderConfig.baseHref && {
                    baseHref: builderConfig.baseHref,
                }),
            };

            if (builderConfig.withDeps) {
                overrides = {
                    ...(builderConfig.baseHref && {
                        baseHref: builderConfig.baseHref,
                    }),
                    withDeps: builderConfig.withDeps,
                };
            }

            if (!context.target) {
                throw new Error(
                    "Cannot build the application without a target"
                );
            }

            const baseHref = builderConfig.baseHref
                ? `Your base-href: "${builderConfig.baseHref}`
                : "";
            const buildTarget = builderConfig.buildTarget
                ? builderConfig.buildTarget
                : "build";
            context.logger.info(
                `📦 Building "${context.target.project}". Configuration: "${configuration}". Build Command: ${buildTarget}. ${baseHref}`
            );

            const build = await context.scheduleTarget(
                {
                    target: buildTarget,
                    project: context.target.project || "",
                    configuration,
                },
                overrides as json.JsonObject
            );

            const buildResult = await build.result;

            if (buildResult.success !== true) {
                context.logger.error(`❌ Application build failed`);
                return {
                    error: `❌ Application build failed`,
                    success: false,
                };
            }

            context.logger.info(`✔ Build Completed`);
        }

        const netlifyToken =
            process.env.NETLIFY_TOKEN || builderConfig.netlifyToken;
        if (netlifyToken === "" || netlifyToken === undefined) {
            context.logger.error("🚨 Netlify Token not found !");
            return { success: false };
        }

        let siteId = process.env.NETLIFY_API_ID || builderConfig.siteId;
        if (siteId === "" || siteId === undefined) {
            // site id is needed if the create option is false
            if (builderConfig.create === false) {
                context.logger.error("🚨 API ID (Site ID) not found !");
                return { success: false };
            }
        }

        const client = new NetlifyAPI(netlifyToken, {
            userAgent: "netlify/js-client",
            scheme: "https",
            host: "api.netlify.com",
            pathPrefix: "/api/v1",
            globalParams: {},
        });

        // let check if the site exists
        let site;
        try {
            // only when the site id is set
            if (siteId) {
                site = await client.getSite({ site_id: siteId });
            }
        } catch (e) {
            switch (e.status) {
                case 404:
                    context.logger.error(`❌ Site "${siteId}" : Not found`);
                    // if the create is false - just return the error
                    if (builderConfig.create !== true) {
                        return {
                            success: false,
                        };
                    }
                    break;
                case 401:
                    context.logger.fatal("🚨 Netlify: Unauthorized Token");
                    return {
                        success: false,
                    };
                default:
                    // for all other errors
                    return {
                        error: e.message,
                        success: false,
                    };
            }
        }

        // lets create the site
        if (!site && builderConfig.create) {
            try {
                context.logger.info(`Creating new site for the application`);
                site = await client.createSite();
                siteId = site.id as string;
                context.logger.info(
                    `✔ Site "${site.name}" (${siteId}) created. Please update the angular.json so on the next run we can re-deploy on the same site`
                );
            } catch (e) {
                context.logger.error("🚨 Unable to create the site");
                return {
                    error: e.message,
                    success: false,
                };
            }
        }

        // if we still don't have the site return with error
        if (!site) {
            context.logger.error(
                "🚨 Unable to deploy as we don't have any context about the site"
            );
            return {
                error: "🚨 Unable to deploy as we don't have any context about the site",
                success: false,
            };
        }

        // lets deploy the application to the site
        try {
            context.logger.info(
                `Deploying project from 📂 ./${builderConfig.outputPath}`
            );

            let config = {};

            if (builderConfig.functionsPath) {
                console.log(
                    `Deploying functions from 📂 ./${builderConfig.functionsPath}`
                );
                config = { ...config, fnDir: builderConfig.functionsPath };
            }

            const response = await client.deploy(
                siteId,
                builderConfig.outputPath,
                config
            );
            context.logger.info(
                `✔ Your updated site 🕸  is running at ${response.deploy.ssl_url}`
            );
            return { success: true };
        } catch (e) {
            context.logger.error(`❌ Deployment failed: ${e.message}`);
            return {
                error: e.message,
                success: false,
            };
        }
    }
);
