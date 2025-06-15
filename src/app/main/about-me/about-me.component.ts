import { Component } from '@angular/core';
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css'
})
export class AboutMeComponent {
      constructor(private translate: TranslateService){}
    switchLang(language: string){
     this.translate.use(language);
  }
}
