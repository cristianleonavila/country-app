import { Component, input } from '@angular/core';
import { Country } from '../../interfaces/country';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search-results',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './search-results.component.html',
  styles: ``
})
export class SearchResultsComponent {

  results = input.required<Country[]>();

  errorMessage = input<string|unknown|null>("");

  isLoading = input<boolean>(false);

  isEmpty = input<boolean>(false);
}
