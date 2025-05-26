import { Component, inject, resource } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { NotFoundComponent } from "../../../shared/not-found/not-found.component";
import { DetailsComponent } from "./details/details.component";

@Component({
  selector: 'app-country',
  imports: [NotFoundComponent, DetailsComponent],
  templateUrl: './country.component.html',
  styles: ``
})
export class CountryComponent {

  code = inject(ActivatedRoute).snapshot.params['code'];

  countryService = inject(CountryService);

  resource = rxResource({
    request: () => ({code: this.code}),
    loader: ({request}) => this.countryService.searchBy(request.code)
  });
}
