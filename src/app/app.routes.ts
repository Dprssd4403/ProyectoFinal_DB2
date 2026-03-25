import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Explorador } from './pages/explorador/explorador';
import { Tendencias } from './pages/tendencias/tendencias';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'tendencias', component: Tendencias },
    { path: 'explorador', component: Explorador },
];
