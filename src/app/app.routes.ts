import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ImprintComponent } from './imprint/imprint.component';

export const routes: Routes = [
  // Redirect root to default language
  { path: '', redirectTo: 'en', pathMatch: 'full' },
  
  // English routes
  { 
    path: 'en',
    children: [
      { path: '', component: MainComponent },
      { path: 'privacy', component: PrivacyComponent },
      { path: 'imprint', component: ImprintComponent }
    ]
  },
  
  // German routes
  { 
    path: 'de',
    children: [
      { path: '', component: MainComponent },
      { path: 'datenschutz', component: PrivacyComponent },
      { path: 'impressum', component: ImprintComponent },
      // Redirect old URLs to new structure
      { path: 'privacy', redirectTo: 'datenschutz' },
      { path: 'imprint', redirectTo: 'impressum' }
    ]
  },
  
  // Legacy route redirects for SEO
  { path: 'privacy', redirectTo: '/en/privacy' },
  { path: 'imprint', redirectTo: '/en/imprint' },
  { path: 'datenschutz', redirectTo: '/de/datenschutz' },
  { path: 'impressum', redirectTo: '/de/impressum' },
  
  // Fallback route (should be the last one)
  { path: '**', redirectTo: '/en' }
];
