import { Component, ElementRef, HostListener, ViewChild, signal } from '@angular/core';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService, TranslatePipe } from "@ngx-translate/core";
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { SkillsComponent } from './skills/skills.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [AboutMeComponent, SkillsComponent, ProjectsComponent, ContactComponent, TestimonialsComponent, FormsModule, TranslateModule, HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  @ViewChild('togglemenu') menuRef!: ElementRef<HTMLElement>;
  @ViewChild('burger', {static:false}) burgerRef!: ElementRef<HTMLElement>;

  // Signal für Mobile Menu
  showMobileMenu = signal(false);
  // Signal für die Sichtbarkeit des Arrow-Up Buttons
  showScrollButton = signal(false);

  constructor(private translate: TranslateService) {}

  switchLang(language: string) {
    this.translate.use(language);
  }

  burgermenu(): void {
    this.showMobileMenu.set(!this.showMobileMenu());
  }

  closeMenu(): void {
    this.showMobileMenu.set(false);
  }
    @HostListener('window:scroll', ['$event'])
    onWindowScroll() {
      // Button anzeigen wenn mehr als 500px gescrollt wurde
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      this.showScrollButton.set(scrollTop > 500);
    }
  
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
}
