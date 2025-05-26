import { Component, input } from '@angular/core';
import { Country } from '../../interfaces/country';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-search-results',
  imports: [DecimalPipe],
  templateUrl: './search-results.component.html',
  styles: ``
})
export class SearchResultsComponent {
  results = input.required<Country[]>();
}
