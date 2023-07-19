import {Component, Input} from '@angular/core'
import {State} from '@digital_brand_work/decorators/ngrx-state.decorator'
import {unfreeze} from '@digital_brand_work/helpers/helpers'
import {Store} from '@ngrx/store'
import {SchoolYear} from 'app/app-core/models/school-year.model'
import {Staff} from 'app/app-core/models/staff.model'
import {StoreAction} from 'app/app-core/store/core/action.enum'
import {AppState} from 'app/app-core/store/core/app.state'
import {StateEnum} from 'app/app-core/store/core/state.enum'
import {staffPageLinks} from 'app/app-core/store/ngrx/staffs/staffs.selectors'
import {Observable} from 'rxjs'

@Component({
    selector: 'manage-yearbook-staff',
    templateUrl: './manage-yearbook-staff.component.html',
})
export class ManageYearbookStaffComponent {
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

    @State({selector: StateEnum.STAFFS, type: 'array'})
    readonly staffs$: Observable<Staff[]>

    readonly pageLinks$ = this._store.select(staffPageLinks)

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
            StoreAction.STAFFS.yearbook.request({
                filter: this.mutableFilters,
            }),
        )
    }

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
