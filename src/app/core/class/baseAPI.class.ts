import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable()
export abstract class BaseAPIClass {
  // baseUrl: string;
  constructor(
    protected httpClient: HttpClient,
  ) {}
  private getOptionsJSON() {
    // HttpHeaders
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MThjNmFiZWQ2YTlkOTM4YTNmZDY5MTYyYWQ5YWVlNyIsInN1YiI6IjVmYzg0YmMwYjAwNDBhMDA0MDI0NWQ3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._dyfn1BiBeLthoN9Svia4EXHvjtOHu56Sphc-4OmPx0'
      })
    };
    return httpOptions;
  }

  getAll(baseUrl: string, filterObject?: any): Observable<any> {
    let queryString = '';
    if (filterObject) {
      const fitlerKeys: any[] = Object.keys(filterObject);
      if (fitlerKeys.length > 0) {
        queryString = '?';
      }
      fitlerKeys.forEach((key: any, index) => {
        if (filterObject[key] !== undefined && filterObject[key] !== null) {
          if (filterObject[key].toString().length) {
            queryString += `${key}=${filterObject[key]}&`;
          }
        }
      });
      if (
        fitlerKeys.length > 0 &&
        queryString[queryString.length - 1] === '&'
      ) {
        queryString = queryString.slice(0, -1);
      }
    }
    return this.httpClient
      .get(`${environment.serverUrl}${baseUrl}${queryString}`, this.getOptionsJSON())
      .pipe(
        map((body: any) => {
          return body;
        })
      );
  }

  getById(baseUrl: string, id: string, filterObject?: any): Observable<any> {
    let queryString = '';
    if (filterObject) {
      const fitlerKeys: any[] = Object.keys(filterObject);
      if (fitlerKeys.length > 0) {
        queryString = '?';
      }
      fitlerKeys.forEach((key: any, index) => {
        if (filterObject[key] !== undefined && filterObject[key] !== null) {
          if (filterObject[key].toString().length) {
            queryString += `${key}=${filterObject[key]}&`;
          }
        }
      });
      if (
        fitlerKeys.length > 0 &&
        queryString[queryString.length - 1] === '&'
      ) {
        queryString = queryString.slice(0, -1);
      }
    }
    return this.httpClient
      .get(`${environment.serverUrl}${baseUrl}/${id}${queryString}`, this.getOptionsJSON())
      .pipe(
        map((body: any) => {
          return body;
        })
      );
  }

  create(baseUrl: string, payload: any): Observable<any> {
    return this.httpClient.post(baseUrl, payload, this.getOptionsJSON()).pipe(
      map((body: any) => {
        return body;
      })
    );
  }

  update(baseUrl: string, id: string, payload: any): Observable<any> {
    const URL = id === '' || id === null ? `${baseUrl}` : `${baseUrl}/${id}`;
    return this.httpClient.put(URL, payload, this.getOptionsJSON()).pipe(
      map((body: any) => {
        return body;
      })
    );
  }

  delete(baseUrl: string, id: string): Observable<any> {
    return this.httpClient
      .delete(`${baseUrl}/${id}`, this.getOptionsJSON())
      .pipe(
        map((body: any) => {
          return body;
        })
      );
  }

  deleteAll(baseUrl: string): Observable<any> {
    return this.httpClient.delete(`${baseUrl}/all`, this.getOptionsJSON()).pipe(
      map((body: any) => {
        return body;
      })
    );
  }
}
