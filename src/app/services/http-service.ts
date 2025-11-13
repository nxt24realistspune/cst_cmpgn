import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AGENT_API_URL, API_BASE_URL } from '../constants/api-constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {

  /**
   *
   */
  constructor(private httpClient: HttpClient) {

  }

  dashboardAgent(): Observable<any> {

    //add headers to httpclient call
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    });

    return this.httpClient.get(API_BASE_URL + AGENT_API_URL, { headers });

  }

}
