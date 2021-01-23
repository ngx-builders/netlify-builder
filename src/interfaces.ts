
export interface WorkspaceProject {
    projectType?: string;
    architect?: Record<
        string,
        { builder: string; options?: Record<string, any> }
    >;
}

export interface Workspace {
    defaultProject?: string;
    projects: Record<string, WorkspaceProject>;
}
