import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'projectFilter'
})
export class ProjectFilterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
