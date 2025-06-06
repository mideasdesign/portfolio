import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { TranslateService } from "@ngx-translate/core";
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ TranslateModule, CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'portfolio';
  private initialNavigation = true;
  
  constructor(
    private translate: TranslateService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.translate.addLangs(['de', 'en']);
    this.translate.setDefaultLang('en');
    
    if (isPlatformBrowser(this.platformId)) {
      // Handle initial language detection
      this.detectInitialLanguage();
      
      // Listen to route changes to handle language changes
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        if (this.initialNavigation) {
          this.initialNavigation = false;
          return;
        }
        this.syncLanguageWithUrl();
      });
    }
  }
  
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Initial sync of language with URL
      this.syncLanguageWithUrl();
    }
  }
  
  private detectInitialLanguage() {
    // Check URL first
    const urlLang = this.getLanguageFromUrl();
    if (urlLang) {
      this.translate.use(urlLang);
      return;
    }
    
    // Then check browser language
    const browserLang = this.translate.getBrowserLang() || 'en';
    const useLang = ['de', 'en'].includes(browserLang) ? browserLang : 'en';
    this.translate.use(useLang);
    
    // Update URL to match the detected language
    if (useLang === 'de') {
      this.router.navigate(['/de']);
    }
  }
  
  private syncLanguageWithUrl() {
    const currentLang = this.translate.currentLang || this.translate.defaultLang;
    const path = window.location.pathname;
    
    // Don't redirect if we're already on the correct language prefix
    if ((currentLang === 'de' && path.startsWith('/de')) || 
        (currentLang === 'en' && path.startsWith('/en'))) {
      return;
    }
    
    // Handle hash fragments
    const hash = window.location.hash || '';
    const basePath = path.replace(/^\/(en|de)\//, '/');
    
    // Navigate to the correct language prefix
    if (currentLang === 'de') {
      this.router.navigate([`/de${basePath}${hash}`]);
    } else {
      this.router.navigate([`/en${basePath}${hash}`]);
    }
  }
  
  private getLanguageFromUrl(): string | null {
    if (typeof window === 'undefined') return null;
    
    const path = window.location.pathname;
    if (path.startsWith('/de/') || path === '/de' || 
        path === '/datenschutz' || path === '/impressum') {
      return 'de';
    } else if (path.startsWith('/en/') || path === '/en' || 
               path === '/privacy' || path === '/imprint') {
      return 'en';
    }
    return null;
  }
}