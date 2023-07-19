import {unfreeze} from '@digital_brand_work/helpers/helpers'
import {empty} from '@digital_brand_work/pipes/is-empty.pipe'
import {Pipe, PipeTransform} from '@angular/core'

@Pipe({
    name: 'sort_by',
})
export class SortByPipe implements PipeTransform {
    transform(items: any[], column: any): any[] {
        return sort_by(items, column)
    }
}

export function sort_by(array: any[], column: any): any[] {
    const items = [...unfreeze(array)]

    if (items.length === 0 || empty(items[0][column])) {
        return items
    }

    return items.sort((a, b) => {
        return a[column].localeCompare(b[column])
    })
}
