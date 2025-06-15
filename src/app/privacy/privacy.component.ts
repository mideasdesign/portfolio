import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.css'
})
  export class PrivacyComponent {
      constructor(private translate: TranslateService){}
    switchLang(language: string){
    this.translate.use(language);
    }
}