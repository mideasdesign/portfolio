import { Component } from '@angular/core';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';
import { FormsModule } from '@angular/forms';
import {TranslateModule} from "@ngx-translate/core";
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { SkillsComponent } from './skills/skills.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [SkillsComponent, ProjectsComponent, ContactComponent, TestimonialsComponent, FormsModule, TranslateModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
