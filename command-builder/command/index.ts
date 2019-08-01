import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect';
import { JsonObject } from '@angular-devkit/core';
const NetlifyAPI = require('netlify')

interface Options extends JsonObject {
  command: string;
  outputPath: string;
  netlifyToken: string,
  siteId: string,
  args: string[];
}

export default createBuilder<Options>(
  async (builderConfig: any, context: BuilderContext): Promise<BuilderOutput> => {
    context.reportStatus(`Executing "${builderConfig.command}"...`);
     
    console.log(`Executing ${builderConfig.command} command ...... `);
    console.log(`Deploying project from the location ./"${builderConfig.outputPath}`);
 
    const client: any = new NetlifyAPI(builderConfig.netlifyToken,
      {
        userAgent: 'netlify/js-client',
        scheme: 'https',
        host: 'api.netlify.com',
        pathPrefix: '/api/v1',
        globalParams: {}
      });

    const response = await client.deploy(builderConfig.siteId, builderConfig.outputPath);
    console.log('\x1b[32m', `Your site is ready at ${response && response.deploy && response.deploy.ssl_url}`);
    
    return { success: true };
  });