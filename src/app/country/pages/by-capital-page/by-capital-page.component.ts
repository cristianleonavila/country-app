import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { SearchComponent } from "../../shared/search/search.component";
import { SearchResultsComponent } from "../../shared/search-results/search-results.component";
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchComponent, SearchResultsComponent],
  templateUrl: './by-capital-page.component.html'
})
export default class ByCapitalPageComponent {

  countryService = inject(CountryService);
  activatedRoute = inject(ActivatedRoute);
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';
  query = signal<string>(this.queryParam);
  router = inject(Router);

  resource = rxResource({
    request: () => ({query: this.query()}),
    loader: ({request}) => {
      if ( !request.query ) return of([]);
      this.router.navigate(['/country/by-capital'], {
        queryParams: {
          query: request.query
        }
      });
      return this.countryService.searchByCapital(request.query);
    }
  });


  /*
  Con promesas
  countryResource = resource({
    request: () => ({query: this.query()}),
    loader: async ({request}) => {
      if ( !request.query ) return [];
      return await firstValueFrom(this.countryService.searchByCapital(request.query));
    }
  });*/



  /*
  http client tradicional
  search(query:string) {
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
