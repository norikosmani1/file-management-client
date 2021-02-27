import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, PrimeNGConfig } from 'primeng/api';
import { AppConstants } from '../constants/appconstants';
import { IFiles } from '../interfaces/IFiles';
import { IPaginated } from '../interfaces/IPaginated';
import { ISettings } from '../interfaces/ISettings';
import { FilesService } from '../services/files.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-view-files',
  templateUrl: './view-files.component.html',
  styleUrls: ['./view-files.component.scss']
})
export class ViewFilesComponent implements OnInit {

  fileTypes: string[] = [];
  uploadedFiles: IPaginated<IFiles[]>[] = [];
  loading: boolean = false;

  constructor(private primengConfig: PrimeNGConfig, private filesService: FilesService,
    private sharedService: SharedService) {
    this.sharedService.addedFilesSource.subscribe((files: IFiles[]) => {
      this.addedFiles(files);
    });
  }

  ngOnInit() {
    this.loading = true;
    this.getSettings();
  }

  loadUploadedFiles(event: LazyLoadEvent, fileType: string) {
    this.filesService.getUploadedFiles(event, fileType).subscribe((res: IPaginated<IFiles[]>) => {
      var index = this.uploadedFiles.findIndex(x => x.type == res.type);
      if (index != -1) {
        this.uploadedFiles[index].results = res.results;
      }
      else {
      this.uploadedFiles.push(res);
      }
      this.loading = false;
    });
  }

  addedFiles(files: IFiles[]) {
    for (var i = 0; i < files.length; i++) {
      var index = this.uploadedFiles.findIndex(x => x.type == files[i].type);
      if (index != -1) {
        if (this.uploadedFiles[index].results.length == 10) {
          this.uploadedFiles[index].results.pop();
        }
        this.uploadedFiles[index].results.unshift(files[i]);
        this.uploadedFiles[index].totalRecords++;
      }
    }
  }

  getSettings() {
    return this.sharedService.getSettings().subscribe((res: ISettings[]) => {
      if (res) {
        var setting = res.filter(x => x.key == AppConstants.AcceptableFiles);
        if (setting.length > 0) {
          this.fileTypes = setting[0].value.split(',');
        }
      }
    })
  }
}
