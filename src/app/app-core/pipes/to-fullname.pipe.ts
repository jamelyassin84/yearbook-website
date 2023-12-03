import { Pipe, PipeTransform } from '@angular/core';
import { Information } from '../models/information.model';

@Pipe({ name: 'to_full_name' })
export class ToFullNamePipe implements PipeTransform {
  transform(information: Information) {
    const { suffix, last_name, first_name, middle_name } = information;
    let fullName = `${last_name}, ${first_name} ${middle_name}`;
    
    if (suffix !== null && suffix !== undefined) {
      fullName += ` ${suffix}`;
    }

    return fullName;
  }
}

