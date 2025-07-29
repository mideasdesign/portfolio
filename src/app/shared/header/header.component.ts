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

  // Signal für die Bildschirmgröße
  isMobile = signal(false);
  
  // Computed Signal für das passende Bild
  personImage = computed(() => 
    this.isMobile() 
      ? './assets/images/markus-fischer-mobile.webp' 
      : './assets/images/person.webp'
  );

  constructor(
    private translate: TranslateService) {
    // Initiale Prüfung der Bildschirmgröße
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    // Tailwind's md breakpoint ist 768px
    this.isMobile.set(window.innerWidth < 768);
  }
}
