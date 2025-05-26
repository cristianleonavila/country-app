import { Component, inject, signal, resource } from '@angular/core';
import { SearchComponent } from "../../shared/search/search.component";
import { SearchResultsComponent } from "../../shared/search-results/search-results.component";
import { CountryService } from '../../services/country.service';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';

@Component({
  selector: 'app-by-country',
  imports: [SearchComponent, SearchResultsComponent],
  templateUrl: './by-country.component.html',
  styles: ``
})
export class ByCountryComponent {

  query = signal<string>("");

  countryService = inject(CountryService);

  resource = resource({
    request: () => ({query: this.query()}),
    loader: async ({request}) => {
      if ( !request.query ) return [];
      return await firstValueFrom(this.countryService.searchByCountry(request.query));
    }
  });

}
