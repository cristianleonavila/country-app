import { Component, effect, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.component.html',
  styles: ``
})
export class SearchComponent {

  value = output<string>();

  placeholder = input<string>("Buscar...");

  debouceTime = input<number>(500);

  inputValue = signal<string>("");

  debounceEffect = effect((onCleanUp) => {
    const value = this.inputValue();
    const timeOut = setTimeout(() => {
      this.value.emit(value);
    }, this.debouceTime());

    onCleanUp(() => clearTimeout(timeOut));

  });

}
