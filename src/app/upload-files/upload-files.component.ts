import { Component, OnInit } from '@angular/core';
import { AppConstants } from '../constants/appconstants';
import { IFiles } from '../interfaces/IFiles';
import { IIcons } from '../interfaces/IIcons';
import { ISettings } from '../interfaces/ISettings';
import { FilesService } from '../services/files.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent implements OnInit {

  errormessage: string = '';
  filesToUpload: IFiles[];
  sizeFileError: string | null = null;
  imgLengthError: string | null = null;
  acceptableFileError: string | null = null;
  settings: ISettings[] = [];
  acceptableFiles: string[] = [];
  loading: boolean = false;
  iconsList: IIcons[] = [];

  constructor(private filesService: FilesService, private sharedService: SharedService) {
    this.filesToUpload = [];
  }

  ngOnInit(): void {
    this.getSettings();
    this.getIcons();
  }

  getSettings() {
    return this.sharedService.getSettings().subscribe((res: ISettings[]) => {
      this.settings = res;
      this.acceptableFiles = this.getSettingByKey(AppConstants.AcceptableFiles).split(',');
    })
  }

  getIcons() {
    this.sharedService.getIcons().then(icons => {
      this.iconsList = icons;
    });
  }

  addFiles(files: File[]) {

    if (files) {
      this.sizeFileError = null;
      this.imgLengthError = null;
      this.acceptableFileError = null

      var maxFileSize: number = parseInt(this.getSettingByKey(AppConstants.MaxFileSize));
      var maxFilesLength = this.getSettingByKey(AppConstants.MaxFilesLength);

      for (let file of files) {

        var fileType = file.name.split('.').pop();
        if (this.acceptableFiles.indexOf(fileType == undefined ? "" : fileType) <= -1) {
          this.acceptableFileError = "This type of file is not acceptable";
          continue;
        }

        if (file.size > maxFileSize) {
          this.sizeFileError = "The file exceeds the size allowed of " + (maxFileSize / 1024) + " KB";
          continue;
        }

        if (file.type.match(/image\/*/) != null) {
          let reader = new FileReader();
          reader.onload = (e: any) => {
            if (this.filesToUpload.length >= parseInt(maxFilesLength)) {
              this.imgLengthError = "You can't upload more than" + maxFilesLength + " files.";
              return;
            }

            this.filesToUpload.push({ file: file, name: file.name, url: e.target.result, isImage: true });
          }
          reader.readAsDataURL(file);
        }
        else {
          this.filesToUpload.push({ file: file, name: file.name, url: this.getFileIcon(file.name), isImage: false });
        }
      }
    }
  }

  removeFiles() {
    this.filesToUpload = [];
  }

  saveFiles() {
    if (this.filesToUpload.length > 0) {
      this.loading = true;
      this.filesService.addFiles(this.filesToUpload).subscribe((files: IFiles[]) => {
          this.sharedService.addedFilesSource.next(files);
          this.filesToUpload = [];
          this.loading = false;
        },
        (err) => {
          this.errormessage = err.error;
          this.loading = false;
        }, () => {
          this.loading = false;
        });
    }
  }

  getFileIcon(filename: string) {
    let ext = filename.split(".").pop();
    let obj = this.iconsList.filter(row => {
      if (row.type === ext) {
        return true;
      }
      return false;
    });

    if (obj.length > 0) {
      let icon = obj[0].icon;
      return icon;
    } else {
      return this.iconsList.filter(x => x.default == true)[0].icon;
    }
  }

  getSettingByKey(key: string): string {
    var setting = this.settings.filter(x => x.key == key);
    if (setting.length > 0) {
      return setting[0].value;
    }

    return "";
  }
}
