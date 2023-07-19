import {Pipe, PipeTransform} from '@angular/core'

@Pipe({name: 'item_length'})
export class ItemLengthPipe implements PipeTransform {
    transform(items: any[]): number {
        return items.length
    }
}

export function item_length(items: any[]): number {
    return items.length
}
