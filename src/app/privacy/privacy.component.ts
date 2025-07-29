import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { FooterComponent } from '../shared/footer/footer.component';
import { NavComponent } from '../shared/nav/nav.component';


@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule, TranslatePipe, NavComponent, FooterComponent],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.css'
})
  export class PrivacyComponent {
      constructor(private translate: TranslateService){}
    switchLang(language: string){
    this.translate.use(language);
    }
}