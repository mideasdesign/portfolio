import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { NavComponent } from '../shared/nav/nav.component';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule, TranslatePipe, NavComponent, RouterModule],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.css'
})
  export class PrivacyComponent {
      constructor(private translate: TranslateService){}
    switchLang(language: string){
    this.translate.use(language);
    }
}