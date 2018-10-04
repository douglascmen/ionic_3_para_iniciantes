import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the MovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MovieProvider {

  private baseUrl:string = "https://api.themoviedb.org/3";
  private apiKey:string = "1329d24d317484c17083c19f17b2f708";

  constructor(public http: Http) {
    console.log('Hello MovieProvider Provider');
  }

  getLatestMovies() {
    return this.http.get(this.baseUrl + "/movie/latest?api_key=" + this.apiKey);
  }

  getPopularMovies() {
    return this.http.get(this.baseUrl + "/movie/popular?api_key=" + this.apiKey);
  }

}
