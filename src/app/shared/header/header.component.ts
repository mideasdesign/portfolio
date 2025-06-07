import { Component, ElementRef, ViewChild } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @ViewChild('togglemenu') menuRef!: ElementRef<HTMLElement>;
  @ViewChild('burger', {static:false}) burgerRef!: ElementRef<HTMLElement>;

  constructor(
    private translate: TranslateService,
    private router: Router
  ) {}

  switchLang(lang: string) {
    this.translate.use(lang);
    
    // Get current URL without language prefix
    const currentUrl = this.router.url;
    let newUrl = currentUrl;
    
    // Remove any existing language prefix
    newUrl = newUrl.replace(/^\/(en|de)\//, '/');
    
    // Add the new language prefix
    newUrl = `/${lang}${newUrl}`;
    
    // Navigate to the new URL
    this.router.navigateByUrl(newUrl);
  }

  burgermenu(): void {
    const menu = this.menuRef.nativeElement;
    const burger = this.burgerRef?.nativeElement;

    menu.classList.toggle('active');
    burger?.classList.toggle('active');

    if (menu.classList.contains('active')) {
      menu.classList.remove('hidden');
    } else {
      setTimeout(() => menu.classList.add('hidden'), 125);
    }
  }
}
