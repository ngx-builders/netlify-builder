import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect';
import { JsonObject } from '@angular-devkit/core';
const NetlifyAPI = require('netlify')

interface Options extends JsonObject {
  command: string;
  outputPath: string;
  netlifyToken: string,
  siteId: string,
  configuration: string;
}

export default createBuilder<Options>(
  async (builderConfig: Options, context: BuilderContext): Promise<BuilderOutput> => {
    context.reportStatus(`Executing "${builderConfig.command}"...`);
    context.logger.info(`Executing ${builderConfig.command} command ...... `);

    const configuration = builderConfig.configuration ? builderConfig.configuration : 'production';

    const build = await context.scheduleTarget({
      target: 'build',
      project: context.target !== undefined ? context.target.project : '',
      configuration
    });

    let buildResult = await build.result;

    if (buildResult.success) {
      context.logger.info(`✔ Build Completed`);
      const client = new NetlifyAPI(builderConfig.netlifyToken,
        {
          userAgent: 'netlify/js-client',
          scheme: 'https',
          host: 'api.netlify.com',
          pathPrefix: '/api/v1',
          globalParams: {}
        });
      let sites;
      try {
        sites = await client.listSites();
      } catch (e) {
        context.logger.error("🚨 Netlify Token Rejected");
        return { success: false };
      }
      context.logger.info(`✔ User Verified`);
      const isSiteValid = sites.find(site => builderConfig.siteId === site.site_id);
      if (isSiteValid) {
        context.logger.info(`✔ Site ID Confirmed`);

        const response = await client.deploy(builderConfig.siteId, builderConfig.outputPath);
        context.logger.info(`Deploying project from the location 📂  ./"${builderConfig.outputPath}`);
        context.logger.info(`\n ✔ Your updated site 🕸 is running at ${response && response.deploy && response.deploy.ssl_url}`);

        return { success: true };
      }
      else {
        context.logger.error(`❌ Site ID not found`);
        return { success: false };
      }
    } else {
      context.logger.error(`❌ Application build failed`);
      return {
        error: `❌ Application build failed`,
        success: false
      };
    }

  });