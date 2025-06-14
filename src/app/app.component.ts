import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { TranslateService } from "@ngx-translate/core";
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { filter } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ TranslateModule, CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'portfolio';
  private initialNavigation = true;
  
  constructor(
private route: ActivatedRoute,
private translate: TranslateService,
private router: Router
) {
this.router.events.pipe(
filter(event => event instanceof NavigationEnd)
).subscribe(() => {
const lang = this.route.snapshot.firstChild?.paramMap.get('lang') || 'de';
this.translate.use(lang);
});
}

  

}