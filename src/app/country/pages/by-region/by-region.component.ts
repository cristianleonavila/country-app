import { Component, inject, resource, signal } from '@angular/core';
import { SearchComponent } from "../../shared/search/search.component";
import { SearchResultsComponent } from "../../shared/search-results/search-results.component";
import { firstValueFrom } from 'rxjs';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-region',
  imports: [SearchComponent, SearchResultsComponent],
  templateUrl: './by-region.component.html',
  styles: ``
})
export class ByRegionComponent {

  query = signal<string>("");

  countryService = inject(CountryService);

  resource = resource({
    request: () => ({query: this.query()}),
    loader: async ({request}) => {
      if ( !request.query ) return [];
      return await firstValueFrom(this.countryService.searchByRegion(request.query));
    }
  });
}
