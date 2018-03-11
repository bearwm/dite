import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'successResults'
})
export class SuccessResultsPipe implements PipeTransform {

  transform(value: boolean[], args?: any): any {
    return value.filter(item => item).length;
  }

}
