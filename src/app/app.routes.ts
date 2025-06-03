import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { PrivacyPoliceComponent } from './privacy-police/privacy-police.component';
import { ImprintComponent } from './imprint/imprint.component';

export const routes: Routes = [
    { path: '', component: MainComponent},
    { path: 'privacy-police', component: PrivacyPoliceComponent},
    { path: 'imprint', component: ImprintComponent}
];
