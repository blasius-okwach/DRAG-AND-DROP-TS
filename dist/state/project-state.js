import { Project, ProjectStatus } from "../models/project.js";
class State {
    constructor() {
        this.Listeners = [];
    }
    addListener(listenerFn) {
        this.Listeners.push(listenerFn);
    }
}
export class ProjectState extends State {
    constructor() {
        super();
        this.projects = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }
    addProject(title, description, numOfPeolpe) {
        const newProject = new Project(Math.random().toString(), title, description, numOfPeolpe, ProjectStatus.Active);
        this.projects.push(newProject);
        this.updateListerners();
    }
    moveProject(projectId, newStatus) {
        const project = this.projects.find((prj) => prj.id === projectId);
        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.updateListerners();
        }
    }
    updateListerners() {
        for (const listenerFn of this.Listeners) {
            listenerFn(this.projects.slice());
        }
    }
}
export const projectState = ProjectState.getInstance();
//# sourceMappingURL=project-state.js.map