import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RESTCountryResponse } from '../interfaces/rest-country-response';
import { catchError, delay, map, Observable, throwError } from 'rxjs';
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

  searchByCountry(query:string): Observable<Country[]> {
    const queryToLower = query.toLowerCase();
    return this.http.get<RESTCountryResponse[]>(`${environment.endpoint}/name/${queryToLower}`).pipe(
      map( response => CountryMapper.toCountryArray( response )),
      delay(2000),
      catchError((error) => {
        return throwError(() =>  new Error(`Ocurrió un error al consultar ${query}`));
      })
    );
  }

  searchByRegion(query:string): Observable<Country[]> {
    const queryToLower = query.toLowerCase();
    return this.http.get<RESTCountryResponse[]>(`${environment.endpoint}/subregion/${queryToLower}`).pipe(
      map( response => CountryMapper.toCountryArray( response )),
      catchError((error) => {
        return throwError(() =>  new Error(`Ocurrió un error al consultar ${query}`));
      })
    );
  }

  searchBy(code:string) {
    const queryToLower = code.toLowerCase();
    return this.http.get<RESTCountryResponse[]>(`${environment.endpoint}/alpha/${queryToLower}`).pipe(
      map( response => CountryMapper.toCountryArray( response )),
      map( countryList => countryList.at(0)),
      catchError((error) => {
        return throwError(() =>  new Error(`Ocurrió un error al consultar ${code}`));
      })
    );
  }
}
