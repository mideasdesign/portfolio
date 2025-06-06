import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ImprintComponent } from './imprint/imprint.component';

export const routes: Routes = [
    { path: '', component: MainComponent},
    { path: 'privacy', component: PrivacyComponent},
    { path: 'imprint', component: ImprintComponent}
];
