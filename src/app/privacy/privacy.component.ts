
import { Component } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { NavComponent } from '../shared/nav/nav.component';
import { RouterModule } from '@angular/router';


@Component({
    selector: 'app-privacy',
    imports: [TranslateModule, NavComponent, RouterModule],
    templateUrl: './privacy.component.html',
    styleUrl: './privacy.component.css'
})
  export class PrivacyComponent {
      constructor(private translate: TranslateService){}
}
