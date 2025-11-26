import { Component, OnInit } from "@angular/core";
import {
  TranslateService,
  TranslatePipe,
} from "@ngx-translate/core";
import { CommonModule } from "@angular/common";
import { NavComponent } from "../shared/nav/nav.component";
import { RouterModule } from "@angular/router";
import { ProjectsService } from "../shared/services/projects.service";

interface Project {
  id: number;
  titleKey: string;
  aboutTitleKey: string;
  aboutTextKey: string;
  processTitleKey: string;
  processTextKey: string;
  teamTitleKey?: string;
  teamTextKey?: string;
  image: string;
  liveUrl: string;
  githubUrl: string;
}

@Component({
  selector: "app-more-projects",
  standalone: true,
  imports: [CommonModule, TranslatePipe, NavComponent, RouterModule],
  templateUrl: "./more-projects.components.html",
  styleUrls: ["./more-projects.components.css"],
})
export class MoreProjectsComponent implements OnInit {
  activeTab: string = "join";
  projects: Project[] = [];

  constructor(
    private translate: TranslateService,
    private projectsService: ProjectsService,
  ) {}

  switchLang(language: string) {
    this.translate.use(language);
  }
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  isActive(tab: string): boolean {
    return this.activeTab === tab;
  }
  ngOnInit() {
    this.projects = this.projectsService.projects;
  }
}
