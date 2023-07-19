import {Component, EventEmitter, Input, Output} from '@angular/core'
import {Faculty} from 'app/app-core/models/faculty.model'
import {SchoolAdmin} from 'app/app-core/models/school-admin.model'
import {SchoolYear} from 'app/app-core/models/school-year.model'
import {Staff} from 'app/app-core/models/staff.model'
import {Student} from 'app/app-core/models/student.model'

@Component({
    selector: 'bond-paper',
    templateUrl: './bond-paper.component.html',
})
export class BondPaperComponent {
    @Output()
    onFirst = new EventEmitter<string>()

    @Output()
    onSecond = new EventEmitter<string>()

    @Output()
    onThird = new EventEmitter<string>()

    @Input()
    type: string = undefined

    @Input({required: true})
    entities: Faculty[] | Staff[] | SchoolAdmin[] | Student[] = []

    @Input({required: true})
    reversed: boolean

    @Input({required: true})
    headerTitle: string = ''

    @Input({required: true})
    schoolYear: SchoolYear

    @Input({required: true})
    template: any

    @Input({required: true})
    firstTextColor: string

    @Input({required: true})
    secondTextColor: string

    @Input({required: true})
    thirdTextColor: string

    headerTextColor: string = '#FFFFFF' // White
    headerBackgroundColor: string = '#000000' // Black
    backgroundColor: string = '#FFFFFF' // White
}
