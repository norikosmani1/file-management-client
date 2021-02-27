import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IFiles } from '../interfaces/IFiles';
import { IPaginated } from '../interfaces/IPaginated';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private httpClient: HttpClient) { }

  baseUrl = environment.apiEndpoint + '/api/FilesMetaData/';
  
  addFiles(files: IFiles[]) {
    
    const formData = new FormData();
    
    for (let file of files) {
        formData.append(file.name, file.file);
    }                             

    return this.httpClient.post<IFiles[]>(this.baseUrl + 'addFiles', formData);
  }


  getUploadedFiles(event: any | null, fileType: string): Observable<IPaginated<IFiles[]>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let httpParams = new HttpParams();
    httpParams = httpParams.append('first', event.first);
    httpParams = httpParams.append('rows', event.rows);
    httpParams = httpParams.append('sortOrder', event.sortOrder);
    httpParams = httpParams.append('sortField', event.sortField == undefined ? "" : event.sortField);
    httpParams = httpParams.append('fileType', fileType);

    return this.httpClient.get<IPaginated<IFiles[]>>(this.baseUrl, { headers: httpOptions.headers, params: httpParams });
  }
}
