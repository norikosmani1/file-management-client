import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IIcons } from '../interfaces/IIcons';

@Injectable()
export class SharedServiceMock {
  constructor(private httpClient: HttpClient) { }

  getSettings(): Observable<Array<{}>> {
      var mockedData = [
            {
                id: "1",
                key: 'AcceptableFiles',
                value: 'png,jpg,pptx,docx,xlsx'
            },
            {
                id: "2",
                key: 'MaxFileSize',
                value: '10485760'
            },
            {
                id: "3",
                key: 'MaxFilesLength',
                value: '5'
            }
      ];

      return of(mockedData);
  }

  getIcons() {
    return this.httpClient.get<any>('assets/icons-list.json')
      .toPromise()
      .then(res => <IIcons[]>res.data)
      .then(data => { return data; });
  }
}