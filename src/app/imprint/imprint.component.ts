import { Component } from '@angular/core';

import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { NavComponent } from '../shared/nav/nav.component';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-imprint',
    imports: [TranslateModule, NavComponent, RouterModule],
    templateUrl: './imprint.component.html',
    styleUrl: './imprint.component.css'
})
export class ImprintComponent {
   constructor(private translate: TranslateService){}
}
