import { Injectable } from "@angular/core";
import { MoreProjectsComponent } from "../../more-projects/more-projects.components";
import projects from "../../../assets/data/projects.json";

@Injectable({ providedIn: "root" })
export class ProjectsService {
  projects = projects;
}
