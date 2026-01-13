import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-projects',
    standalone: true,
    imports: [TranslateModule, RouterModule],
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  constructor(private translate: TranslateService) {}
}
