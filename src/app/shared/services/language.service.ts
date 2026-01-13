import { Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  // Signal for the current language
  currentLanguage = signal<string>('en');

  constructor(private translate: TranslateService) {
    this.initializeLanguage();
  }

  /**
   * Initializes the language on app startup
   */
  private initializeLanguage(): void {
    const browserLang = this.translate.getBrowserLang() || 'en';
    const savedLang = localStorage.getItem('userLanguage') || browserLang;
    const finalLang = savedLang.match(/en|de/) ? savedLang : 'en';

    this.translate.setDefaultLang('en');
    this.translate.use(finalLang).subscribe(() => {
      this.currentLanguage.set(finalLang);
    });
  }

  /**
   * Switches the language and saves it to LocalStorage
   * @param language - The new language ('en' or 'de')
   */
  switchLanguage(language: string): void {
    if (language.match(/en|de/)) {
      this.translate.use(language).subscribe(() => {
        this.currentLanguage.set(language);
        localStorage.setItem('userLanguage', language);
      });
    }
  }

  /**
   * Returns the currently saved language
   * @returns The current language from LocalStorage or 'en' as default
   */
  getCurrentLanguage(): string {
    return localStorage.getItem('userLanguage') || 'en';
  }

  /**
   * Checks if a specific language is active
   * @param language - The language to check
   * @returns True if the language is active
   */
  isCurrentLanguage(language: string): boolean {
    return this.currentLanguage() === language;
  }
}
