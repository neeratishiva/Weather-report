import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private httpClient: HttpClient) { }
  endpoint_url = 'http://api.openweathermap.org/data/2.5/';
  access_token = '5a4b2d457ecbef9eb2a71e480b947604';

  getWetherDataByZipCode(zipCode:string){
    return this.httpClient.get(this.endpoint_url + 'weather?zip='+zipCode+',in&appid='+this.access_token);
  }
  
  get5daysData(zipCode:string) {
    return this.httpClient.get(this.endpoint_url + 'forecast/daily?zip='+zipCode+',in&appid='+this.access_token);
  }
}
