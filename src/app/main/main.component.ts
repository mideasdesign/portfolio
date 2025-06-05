import { Component } from '@angular/core';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';
import { FormsModule } from '@angular/forms';
import {TranslatePipe, TranslateDirective} from "@ngx-translate/core";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ProjectsComponent, ContactComponent, FormsModule, TranslatePipe, TranslateDirective],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
