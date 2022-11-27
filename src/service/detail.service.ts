import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetailService {
  constructor(
    private http: HttpClient,
) { }

getDetail(): Observable <{}> {
  return this.http.get<{}>('https://restcountries.com/v2/all').pipe();
}
}
