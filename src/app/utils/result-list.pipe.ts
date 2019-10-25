import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'resultList'
})
export class ResultListPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (value && value.results) {
      return value.results;
    }
    return null;
  }

}
