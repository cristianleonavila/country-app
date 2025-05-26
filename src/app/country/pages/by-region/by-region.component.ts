import { Component } from '@angular/core';
import { SearchComponent } from "../../shared/search/search.component";
import { SearchResultsComponent } from "../../shared/search-results/search-results.component";

@Component({
  selector: 'app-by-region',
  imports: [SearchComponent, SearchResultsComponent],
  templateUrl: './by-region.component.html',
  styles: ``
})
export class ByRegionComponent {

}
