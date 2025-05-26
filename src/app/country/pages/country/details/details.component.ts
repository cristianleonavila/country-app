import { Component, input } from '@angular/core';
import { Country } from '../../../interfaces/country';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'country-details',
  imports: [DecimalPipe],
  templateUrl: './details.component.html',
  styles: ``
})
export class DetailsComponent {

  country = input<Country>();

  get currentYear() {
    return new Date().getFullYear();
  }
}
