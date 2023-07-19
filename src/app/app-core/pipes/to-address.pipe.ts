import {Pipe, PipeTransform} from '@angular/core'
import {Information} from '../models/information.model'

@Pipe({name: 'to_address'})
export class ToAddressPipe implements PipeTransform {
    transform(information: Information) {
        const {province, barangay, municipality} = information
        return `${barangay}, ${municipality}, ${province} `
    }
}
