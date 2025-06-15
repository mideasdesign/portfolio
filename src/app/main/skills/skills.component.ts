import { Component } from '@angular/core';
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {
  constructor(private translate: TranslateService) {
  }

  switchLang(language: string){
   this.translate.use(language);
  }
}
