import { Route } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { Component, OnInit, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TranslateModule, FooterComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'portfolio';
  
  // Signal für die Sichtbarkeit des Arrow-Up Buttons
  showScrollButton = signal(false);
  
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');
  }

  ngOnInit() {
    const browserLang = this.translate.getBrowserLang() || 'en';
    const savedLang = localStorage.getItem('userLanguage') || browserLang;
    this.translate.use(savedLang.match(/en|de/) ? savedLang : 'en');
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