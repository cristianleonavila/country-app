import { Routes } from '@angular/router';
import { AppLayoutComponent } from '../layout/app-layout/app-layout.component';
import ByCapitalPageComponent from './pages/by-capital-page/by-capital-page.component';
import { ByCountryComponent } from './pages/by-country/by-country.component';
import { ByRegionComponent } from './pages/by-region/by-region.component';
import { CountryComponent } from './pages/country/country.component';

export const countryRoutes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: 'by-capital',
        component: ByCapitalPageComponent
      },
      {
        path: 'by-country',
        component: ByCountryComponent
      },
      {
        path: 'by-region',
        component: ByRegionComponent
      },
      {
        path: 'by/:code',
        component: CountryComponent
      },
      {
        path: '**',
        redirectTo: 'by-capital'
      }
    ]
  }
];

export default countryRoutes;
