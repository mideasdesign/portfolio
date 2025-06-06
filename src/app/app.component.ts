import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from "@ngx-translate/core";
import { TranslatePipe } from '@ngx-translate/core';
import { TranslateDirective } from '@ngx-translate/core';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ TranslatePipe, TranslateDirective, CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'portfolio';
  
  constructor(
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.translate.addLangs(['de', 'en']);
    this.translate.setDefaultLang('en');
    
    // Set the language based on URL or browser settings
    if (isPlatformBrowser(this.platformId)) {
      // Check URL for language parameter first
      const urlLang = this.getLanguageFromUrl();
      if (urlLang) {
        this.translate.use(urlLang);
      } else {
        // Otherwise use browser language or fallback to English
        const browserLang = this.translate.getBrowserLang() || 'en';
        const useLang = ['de', 'en'].includes(browserLang) ? browserLang : 'en';
        this.translate.use(useLang);
      }
    } else {
      // Default fallback for server-side rendering
      this.translate.use('en');
    }
  }

  private getLanguageFromUrl(): string | null {
    if (typeof window === 'undefined') return null;
    
    const path = window.location.pathname;
    if (path.startsWith('/de/') || 
        path === '/datenschutz' || 
        path === '/impressum') {
      return 'de';
    } else if (path.startsWith('/en/') || 
               path === '/privacy' || 
               path === '/imprint') {
      return 'en';
    }
    return null;
  }
}