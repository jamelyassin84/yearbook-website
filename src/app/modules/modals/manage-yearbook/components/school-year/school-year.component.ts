import {Component, Input} from '@angular/core'
import {SchoolYear} from 'app/app-core/models/school-year.model'

@Component({
    selector: 'school-year',
    templateUrl: './school-year.component.html',
})
export class SchoolYearComponent {
    @Input({required: true})
    reversed: boolean

    @Input({required: true})
    schoolYear: SchoolYear

    @Input({required: true})
    headerTextColor: string = '#FFFFFF' // White

    @Input({required: true})
    headerBackgroundColor: string = '#000000' // Black

    @Input({required: true})
    backgroundColor: string = '#FFFFFF' // White
}
