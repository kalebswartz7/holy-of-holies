import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class BibleService {
  constructor(private http: HttpClient) {}

    populateMongoconfigUrl = 'http://localhost:3000/populate/06125adad2d5898a-01'
    getTranslationsUrl = 'http://localhost:3000/translations'
    getBooksUrl = 'http://localhost:3000/books/06125adad2d5898a-01'

    populateMongoConfig() {
        // Set expected return type 
        const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8')
        return this.http.get(this.populateMongoconfigUrl, { headers, responseType: 'text'})
    }

    getAvailableTranslations() {
        const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8')
        return this.http.get(this.getTranslationsUrl, { headers, responseType: 'json'})
    }

    getAvailableBooks() {
        const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8')
        return this.http.get(this.getBooksUrl, { headers, responseType: 'json'})

    }

}