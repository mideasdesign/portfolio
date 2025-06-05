import { Component } from '@angular/core';
import {TranslatePipe, TranslateDirective} from "@ngx-translate/core";
@Component({
  selector: 'app-privacy-police',
  standalone: true,
  imports: [TranslatePipe, TranslateDirective, CommonModule],
  templateUrl: './privacy-police.component.html',
  styleUrl: './privacy-police.component.css'
})
export class PrivacyPoliceComponent {

}
