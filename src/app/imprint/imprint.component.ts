import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { NavComponent } from '../shared/nav/nav.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [CommonModule, TranslatePipe, NavComponent, RouterModule],
  templateUrl: './imprint.component.html',
  styleUrl: './imprint.component.css'
})
export class ImprintComponent {
   constructor(private translate: TranslateService){}
  switchLang(language: string){
   this.translate.use(language);
   // Save language to LocalStorage
   localStorage.setItem('userLanguage', language);
}
}
