import { Component, ElementRef, ViewChild, signal, computed, inject, HostListener } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-header',
    imports: [TranslateModule, RouterModule],
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

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    // Tailwind's md breakpoint is 768px
    this.isMobile.set(window.innerWidth < 768);
  }
}
