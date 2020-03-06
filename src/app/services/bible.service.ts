import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class BibleService {
  constructor(private http: HttpClient) {}

    configUrl = 'http://localhost:3000/populate/06125adad2d5898a-01';

    

    getConfig() {
        // Set expected return type 
        const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
        return this.http.get(this.configUrl, { headers, responseType: 'text'});
    }

}