import { Pipe, PipeTransform } from '@angular/core';
import { TableColumnsTranslate } from '../enum/table-columns';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    const result = Object.entries(TableColumnsTranslate).find(([key, val]) => key === value)?.[1];
    return result ? result : value;
  }

}
