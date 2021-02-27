import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { UploadFilesComponent } from './upload-files/upload-files.component';
import { ViewFilesComponent } from './view-files/view-files.component';
import { HomeComponent } from './home/home.component';

import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { FilesTypeFilterPipe } from './pipes/files-type-filter.pipe';
import { TotalRecordsFilterPipe } from './pipes/total-records-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    UploadFilesComponent,
    ViewFilesComponent,
    HomeComponent,
    FilesTypeFilterPipe,
    TotalRecordsFilterPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TableModule,
    ProgressSpinnerModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
