import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect';
import { JsonObject } from '@angular-devkit/core';

interface Options extends JsonObject {
  command: string;
  args: string[];
}

export default createBuilder<Options>(
  async (builderConfig: any, context: BuilderContext): Promise<BuilderOutput> => {
    context.reportStatus(`Executing "${builderConfig.command}"...`);
    console.log(builderConfig.command);
    return { success: true };
  });