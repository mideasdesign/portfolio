import { Component } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-footer',
    imports: [TranslateModule, RouterModule],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.css'
})
export class FooterComponent {
    constructor(private translate: TranslateService){}
}
