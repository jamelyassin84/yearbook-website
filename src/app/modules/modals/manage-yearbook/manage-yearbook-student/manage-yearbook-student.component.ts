import {Component, Input} from '@angular/core'
import {State} from '@digital_brand_work/decorators/ngrx-state.decorator'
import {unfreeze} from '@digital_brand_work/helpers/helpers'
import {Store} from '@ngrx/store'
import {Course} from 'app/app-core/models/course.model'
import {SchoolYear} from 'app/app-core/models/school-year.model'
import {Student} from 'app/app-core/models/student.model'
import {StoreAction} from 'app/app-core/store/core/action.enum'
import {AppState} from 'app/app-core/store/core/app.state'
import {StateEnum} from 'app/app-core/store/core/state.enum'
import {studentPageLinks} from 'app/app-core/store/ngrx/students/students.selectors'
import {Observable} from 'rxjs'

@Component({
    selector: 'manage-yearbook-student',
    templateUrl: './manage-yearbook-student.component.html',
})
export class ManageYearbookStudentComponent {
    constructor(private _store: Store<AppState>) {}

    @Input('schoolYear')
    set setSchoolYear(schoolYear: SchoolYear) {
        if (schoolYear) {
            this.filters.school_year_id = schoolYear.id
            this.paginate(undefined)
            this.schoolYear = schoolYear
        }
    }
    schoolYear: SchoolYear = undefined

    @State({selector: StateEnum.STUDENTS, type: 'array'})
    readonly students$: Observable<Student[]>

    @State({selector: StateEnum.COURSES, type: 'array'})
    readonly courses$: Observable<Course[]>

    readonly pageLinks$ = this._store.select(studentPageLinks)

    firstTextColor: string = '#000000' // Black
    secondTextColor: string = '#808080' // gray
    thirdTextColor: string = '#D3D3D3' // lightgray

    reversed: boolean = false

    filters: any = {
        school_year_id: undefined,
        course_id: undefined,
    }
    mutableFilters: any = {}

    paginate(page: 'next' | 'prev' | undefined) {
        this.mutableFilters = {...unfreeze(this.filters), page: page}
        this._store.dispatch(
            StoreAction.STUDENTS.yearbook.request({
                filter: this.mutableFilters,
            }),
        )
    }

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
