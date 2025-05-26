import { Component, inject, signal, resource } from '@angular/core';
import { SearchComponent } from "../../shared/search/search.component";
import { SearchResultsComponent } from "../../shared/search-results/search-results.component";
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchComponent, SearchResultsComponent],
  templateUrl: './by-capital-page.component.html'
})
export default class ByCapitalPageComponent {

  countryService = inject(CountryService);

  query = signal<string>("");

  countryResource = resource({
    request: () => ({query: this.query()}),
    loader: async ({request}) => {
      if ( !request.query ) return [];
      return await firstValueFrom(this.countryService.searchByCapital(request.query));
    }
  });

  /*search(query:string) {
    if ( this.isLoading() ) return;
    if ( !query ) {
      this.countries.set([]);
      this.isLoading.set(false);
      this.errors.set("");
      return;
    };
    this.isLoading.set(true);
    this.errors.set(null);
    this.countryService.searchByCapital(query)
    .subscribe({
      next: ( response ) => {
        this.isLoading.set(false);
        this.countries.set(response);
      },
      error: (error) => {
        this.isLoading.set(false);
        this.countries.set([]);
        this.errors.set(error);
      }
    });
  }*/
}
