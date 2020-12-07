import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseAPIClass } from '../class/baseAPI.class';
import { API_ENDPOINT } from '../constants';
import { map } from 'rxjs/operators';

@Injectable()
export class MovieService extends BaseAPIClass {
  constructor(
    protected httpClient: HttpClient
  ) {
    super(httpClient);
  }

  getListPopularMovies(params: any) {
  return this.getAll(API_ENDPOINT.MOVIES_POPULAR, params).pipe(
      map((body: any) => {
        return body;
      })
    );
  }

  getListTopratedMovies(params: any) {
  return this.getAll(API_ENDPOINT.MOVIES_TOPRATED, params).pipe(
      map((body: any) => {
        return body;
      })
    );
  }

  getListUpcomingMovies(params: any) {
  return this.getAll(API_ENDPOINT.MOVIES_UPCOMING, params).pipe(
      map((body: any) => {
        return body;
      })
    );
  }

  getListGenre(params: any) {
  return this.getAll(API_ENDPOINT.MOVIES_GENRE, params).pipe(
      map((body: any) => {
        return body;
      })
    );
  }

}
