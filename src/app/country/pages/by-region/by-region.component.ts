import { Component, inject, resource, signal } from '@angular/core';
import { SearchResultsComponent } from "../../shared/search-results/search-results.component";
import { firstValueFrom, of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { Region } from '../../types/region';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-region',
  imports: [SearchResultsComponent, RouterLink],
  templateUrl: './by-region.component.html',
  styles: ``
})
export class ByRegionComponent {

  regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  selectedRegion = signal<Region | null>(null);

  countryService = inject(CountryService);

  resource = rxResource({
    request: () => ({query: this.selectedRegion()}),
    loader: ({request}) => {
      if ( !request.query ) return of([]);
      return this.countryService.searchByRegion(request.query);
    }
  });
}
