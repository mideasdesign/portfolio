import { Component } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';


@Component({
    selector: 'app-projects',
    imports: [TranslateModule],
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  activeTab: string = 'join';

  constructor(private translate: TranslateService) {}

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  isActive(tab: string): boolean {
    return this.activeTab === tab;
  }
}
