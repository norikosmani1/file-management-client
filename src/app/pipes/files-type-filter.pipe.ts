import { Pipe, PipeTransform } from '@angular/core';
import { IFiles } from '../interfaces/IFiles';
import { IPaginated } from '../interfaces/IPaginated';

@Pipe({
  name: 'filesTypeFilter',
  pure: false
})
export class FilesTypeFilterPipe implements PipeTransform {

  transform(arr: IPaginated<IFiles[]>[], type: string): IFiles[] {
    if (arr.length > 0) {
      var result = arr.filter(x => x.type == type);
      if (result.length > 0) {
        return result[0].results;
      }
    }

    return [];
  }
}
