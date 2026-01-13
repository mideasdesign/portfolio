import { Component } from '@angular/core';
import {TranslateModule, TranslateService} from "@ngx-translate/core";


@Component({
    selector: 'app-skills',
    imports: [TranslateModule],
    templateUrl: './skills.component.html',
    styleUrl: './skills.component.css'
})
export class SkillsComponent {
  constructor(private translate: TranslateService) {
  }
}
