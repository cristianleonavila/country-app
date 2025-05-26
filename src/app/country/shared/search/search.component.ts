import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.component.html',
  styles: ``
})
export class SearchComponent {

  value = output<string>();

  placeholder = input<string>("Buscar...");

}
