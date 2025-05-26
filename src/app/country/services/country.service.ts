import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RESTCountryResponse } from '../interfaces/rest-country-response';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';
import { Country } from '../interfaces/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);
  private cache = new Map<string, Country[]>;


  constructor() { }

  searchByCapital(query:string): Observable<Country[]> {
    const queryToLower = query.toLowerCase();
    if ( this.cache.has(queryToLower) ) {
      return of(this.cache.get(queryToLower)!).pipe(
        delay(1000)
      );
    }
    return this.http.get<RESTCountryResponse[]>(`${environment.endpoint}/capital/${queryToLower}`).pipe(
      map( response => CountryMapper.toCountryArray( response )),
      tap(countries => this.cache.set(queryToLower, countries)),
      catchError((error) => {
        return throwError(() =>  new Error(`Ocurrió un error al consultar ${query}`));
      })
    );
  }

  searchByCountry(query:string): Observable<Country[]> {
    const queryToLower = query.toLowerCase();
    if ( this.cache.has(queryToLower) ) {
      return of(this.cache.get(queryToLower)!);
    }
    return this.http.get<RESTCountryResponse[]>(`${environment.endpoint}/name/${queryToLower}`).pipe(
      map( response => CountryMapper.toCountryArray( response )),
      tap( countries => this.cache.set(queryToLower, countries)),
      delay(2000),
      catchError((error) => {
        return throwError(() =>  new Error(`Ocurrió un error al consultar ${query}`));
      })
    );
  }

  searchByRegion(query:string): Observable<Country[]> {
    const queryToLower = query.toLowerCase();
    if ( this.cache.has(queryToLower) ) {
      return of(this.cache.get(queryToLower)!);
    }
    return this.http.get<RESTCountryResponse[]>(`${environment.endpoint}/region/${queryToLower}`).pipe(
      map( response => CountryMapper.toCountryArray( response )),
      tap(countries => this.cache.set(queryToLower, countries)),
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
