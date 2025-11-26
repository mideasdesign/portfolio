import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ImprintComponent } from './imprint/imprint.component';
import { MoreProjectsComponent } from './more-projects/more-projects.components';

export const routes: Routes = [
  // Redirect root to default language
  { path: '', component:MainComponent},
  { path: 'imprint', component:ImprintComponent},
  { path: 'privacy', component:PrivacyComponent},
   { path: 'more-projects', component:MoreProjectsComponent},

];
