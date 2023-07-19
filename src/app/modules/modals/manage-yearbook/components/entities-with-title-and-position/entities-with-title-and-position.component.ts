import {Component, Input} from '@angular/core'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'
import {Faculty} from 'app/app-core/models/faculty.model'
import {SchoolAdmin} from 'app/app-core/models/school-admin.model'
import {Staff} from 'app/app-core/models/staff.model'
import {Student} from 'app/app-core/models/student.model'

@Component({
    selector: 'entities-with-title-and-position',
    templateUrl: './entities-with-title-and-position.component.html',
    animations: [...dbwAnimations],
})
export class EntitiesWithTitleAndPositionComponent {
    @Input({required: true})
    reversed: boolean

    @Input({required: true})
    entities: Faculty[] | Staff[] | SchoolAdmin[] | Student[] = []

    @Input()
    type: string = undefined

    @Input({required: true})
    firstTextColor: string

    @Input({required: true})
    secondTextColor: string

    @Input({required: true})
    thirdTextColor: string

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
