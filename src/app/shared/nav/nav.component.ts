import { Component, ElementRef, ViewChild, signal, computed, inject, HostListener } from '@angular/core';
import { TranslateService, TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule, TranslatePipe],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
    @ViewChild('togglemenu') menuRef!: ElementRef<HTMLElement>;
    @ViewChild('burger', {static:false}) burgerRef!: ElementRef<HTMLElement>;

  // Signal for screen size
  isMobile = signal(false);
  
  // Computed signal for the appropriate image
  personImage = computed(() => 
    this.isMobile() 
      ? './assets/images/markus-fischer-mobile.webp' 
      : './assets/images/person.webp'
  );

  constructor(
    private translate: TranslateService,
    public languageService: LanguageService
  ) {
    // Initial screen size check
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    // Tailwind's md breakpoint is 768px
    this.isMobile.set(window.innerWidth < 768);
  }

  switchLang(language: string){
   this.languageService.switchLanguage(language);
  }
  burgermenu(): void {
    const menu = this.menuRef.nativeElement;
    const burger = this.burgerRef?.nativeElement;

    menu.classList.toggle('active');
    burger?.classList.toggle('active');

    this.handleMenuVisibility(menu);
  }

  private handleMenuVisibility(menu: HTMLElement): void {
    if (menu.classList.contains('active')) {
      menu.classList.remove('hidden');
    } else {
      setTimeout(() => menu.classList.add('hidden'), 125);
    }
  }

  closeMenu(): void {
    const menu = this.menuRef.nativeElement;
    const burger = this.burgerRef?.nativeElement;

    menu.classList.remove('active');
    burger?.classList.remove('active');
    setTimeout(() => menu.classList.add('hidden'), 125);
  }
}
