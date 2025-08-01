import { Component, ElementRef, ViewChild, signal, computed, inject, HostListener } from '@angular/core';
import { TranslateService, TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule, TranslatePipe],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @ViewChild('togglemenu') menuRef!: ElementRef<HTMLElement>;
  @ViewChild('burger', {static:false}) burgerRef!: ElementRef<HTMLElement>;

  // Signal for screen size
  isMobile = signal(false);
  
  // Computed signal for the appropriate image
  personImage = computed(() => 
    this.isMobile() 
      ? './assets/images/person-mobile.webp' 
      : './assets/images/person.webp'
  );

  constructor(
    private translate: TranslateService) {
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
}
