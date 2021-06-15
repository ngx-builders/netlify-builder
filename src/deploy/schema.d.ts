export interface Schema {
    buildTarget?: string;
    configuration?: string;
    noBuild?: boolean;
    outputPath?: boolean;
    functionsPath?: boolean;
    netlifyToken?: string;
    siteId?: string;
    baseHref?: string;
    create?: boolean;
    withDeps?: boolean;
}
