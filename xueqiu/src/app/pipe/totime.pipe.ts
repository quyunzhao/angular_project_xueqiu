import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'totime',
})
export class TotimePipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): Date {
    const time = new Date();
    time.setTime(value);
    return time;
  }
}
