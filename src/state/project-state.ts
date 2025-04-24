import { Project, ProjectStatus } from "../models/project.js";

// Project State Management
type Listener<T> = (items: T[]) => void;

class State<T> {
  protected Listeners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
    this.Listeners.push(listenerFn);
  }
}

export class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addProject(title: string, description: string, numOfPeolpe: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeolpe,
      ProjectStatus.Active
    );
    this.projects.push(newProject);
    this.updateListerners();
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find((prj) => prj.id === projectId);
    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateListerners();
    }
  }

  private updateListerners() {
    for (const listenerFn of this.Listeners) {
      listenerFn(this.projects.slice());
    }
  }
}

export const projectState = ProjectState.getInstance();
