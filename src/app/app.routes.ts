import { Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'country',
    loadChildren: () => import('./country/country.routes')
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
