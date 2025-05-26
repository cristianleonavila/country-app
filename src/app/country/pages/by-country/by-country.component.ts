import { Component } from '@angular/core';
import { SearchComponent } from "../../shared/search/search.component";
import { SearchResultsComponent } from "../../shared/search-results/search-results.component";

@Component({
  selector: 'app-by-country',
  imports: [SearchComponent, SearchResultsComponent],
  templateUrl: './by-country.component.html',
  styles: ``
})
export class ByCountryComponent {

}
