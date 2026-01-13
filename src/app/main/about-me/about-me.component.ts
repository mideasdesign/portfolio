import { Component } from '@angular/core';
import {TranslateModule, TranslateService} from "@ngx-translate/core";


@Component({
    selector: 'app-about-me',
    imports: [TranslateModule],
    templateUrl: './about-me.component.html',
    styleUrl: './about-me.component.css'
})
export class AboutMeComponent {
      constructor(private translate: TranslateService){}
}
