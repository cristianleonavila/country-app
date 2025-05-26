import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RESTCountryResponse } from '../interfaces/rest-country-response';
import { catchError, map, Observable, throwError } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';
import { Country } from '../interfaces/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  http = inject(HttpClient);

  constructor() { }

  searchByCapital(query:string): Observable<Country[]> {
    const queryToLower = query.toLowerCase();
    return this.http.get<RESTCountryResponse[]>(`${environment.endpoint}/capital/${queryToLower}`).pipe(
      map( response => CountryMapper.toCountryArray( response )),
      catchError((error) => {
        return throwError(() =>  new Error(`Ocurrió un error al consultar ${query}`));
      })
    );
  }
}
