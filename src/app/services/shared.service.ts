import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IFiles } from '../interfaces/IFiles';
import { IIcons } from '../interfaces/IIcons';
import { ISettings } from '../interfaces/ISettings';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  baseUrl = environment.apiEndpoint + '/api/';

  addedFilesSource: BehaviorSubject<IFiles[]> = new BehaviorSubject<IFiles[]>([]);

  constructor(private httpClient: HttpClient) { }

  getSettings(): Observable<ISettings[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.httpClient.get<ISettings[]>(this.baseUrl + 'settings', { headers: httpOptions.headers });
  }

  getIcons() {
    return this.httpClient.get<any>('assets/icons-list.json')
      .toPromise()
      .then(res => <IIcons[]>res.data)
      .then(data => { return data; });
  }
}
