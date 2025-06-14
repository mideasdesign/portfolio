import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ImprintComponent } from './imprint/imprint.component';

export const routes: Routes = [
  // Redirect root to default language
  { path: '', redirectTo: 'de', pathMatch: 'full' },
  {
path: ':lang',
children: [
{ path: 'imprint', component: ImprintComponent },
{ path: 'privacy', component: PrivacyComponent },
{ path: '', component: MainComponent}
]
},
{ path: '', redirectTo: 'de', pathMatch: 'full' },
{ path: '**', redirectTo: 'de' }
];