import {Component, Input} from '@angular/core'
import {State} from '@digital_brand_work/decorators/ngrx-state.decorator'
import {unfreeze} from '@digital_brand_work/helpers/helpers'
import {Store} from '@ngrx/store'
import {Department} from 'app/app-core/models/department.model'
import {Faculty} from 'app/app-core/models/faculty.model'
import {SchoolYear} from 'app/app-core/models/school-year.model'
import {StoreAction} from 'app/app-core/store/core/action.enum'
import {AppState} from 'app/app-core/store/core/app.state'
import {StateEnum} from 'app/app-core/store/core/state.enum'
import {facultyPageLinks} from 'app/app-core/store/ngrx/faculties/faculties.selectors'
import {studentPageLinks} from 'app/app-core/store/ngrx/students/students.selectors'
import {Observable} from 'rxjs'

@Component({
    selector: 'manage-yearbook-faculty',
    templateUrl: './manage-yearbook-faculty.component.html',
})
export class ManageYearbookFacultyComponent {
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

    @Input()
    printing: boolean = false

    @State({selector: StateEnum.FACULTIES, type: 'array'})
    readonly faculties$: Observable<Faculty[]>

    @State({selector: StateEnum.DEPARTMENTS, type: 'array'})
    readonly departments$: Observable<Department[]>

    readonly pageLinks$ = this._store.select(facultyPageLinks)

    reversed: boolean = false

    firstTextColor: string = '#000000' // Black
    secondTextColor: string = '#808080' // gray
    thirdTextColor: string = '#D3D3D3' // lightgray

    filters: any = {
        school_year_id: undefined,
    }
    mutableFilters: any = {}

    paginate(page: 'next' | 'prev' | undefined) {
        this.mutableFilters = {...unfreeze(this.filters), page: page}
        this._store.dispatch(
            StoreAction.FACULTIES.yearbook.request({
                filter: this.mutableFilters,
            }),
        )
    }

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
