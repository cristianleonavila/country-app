import { Country } from '../interfaces/country';
import { RESTCountryResponse } from '../interfaces/rest-country-response';
export class CountryMapper {

  static toCountry(from: RESTCountryResponse):Country {
    return {
      cca2: from.cca2,
      capital: from.capital?.join(', '),
      icon: from.flag,
      svg: from.flags.svg,
      population: from.population,
      name: from.translations['spa'].common ?? 'No spanis name',
      region: from.region,
      subregion: from.subregion
    };
  }

  static toCountryArray(from:RESTCountryResponse[]):Country[] {
    return from.map(this.toCountry);
  }
}
