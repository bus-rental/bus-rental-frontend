import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MietenComponent } from './components/mieten/mieten.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'user-settings', component: HomeComponent }, // TODO: Change this to UserSettingsComponent
    { path: 'mieten', component: MietenComponent },
    { path: '**', redirectTo: '' }
];
