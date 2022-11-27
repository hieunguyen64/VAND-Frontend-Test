import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  constructor(
    private http: HttpClient,
) { }

getCountry(): Observable <{}> {
  return this.http.get<{}>('https://api.covid19api.com/summary').pipe();
}
}
