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

  dashboardAgent(emailCopy: string): Observable<any> {

    //add headers to httpclient call
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    });

    return this.httpClient.get(API_BASE_URL + AGENT_API_URL + emailCopy , { headers });

  }

  analyzeImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    const headers = new HttpHeaders({
      'accept': 'application/json'
      // Don't set Content-Type - browser will set it automatically with boundary
    });

    return this.httpClient.post(
      'https://merkledpai01-eus-enhancements-app.azurewebsites.net/analyze-image',
      formData,
      { headers }
    );
  }

}
