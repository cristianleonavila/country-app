import { Component, effect, input, linkedSignal, output, signal } from '@angular/core';

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

  initialValue = input<string>("");

  inputValue = linkedSignal<string>(() => this.initialValue() ?? '');

  debounceEffect = effect((onCleanUp) => {
    const value = this.inputValue();
    const timeOut = setTimeout(() => {
      this.value.emit(value);
    }, this.debouceTime());

    onCleanUp(() => clearTimeout(timeOut));

  });

}
