import {Component} from '@angular/core'
import {State} from '@digital_brand_work/decorators/ngrx-state.decorator'
import {unfreeze} from '@digital_brand_work/helpers/helpers'
import {Store} from '@ngrx/store'
import {SchoolYear} from 'app/app-core/models/school-year.model'
import {Staff} from 'app/app-core/models/staff.model'
import {StoreAction} from 'app/app-core/store/core/action.enum'
import {AppState} from 'app/app-core/store/core/app.state'
import {StateEnum} from 'app/app-core/store/core/state.enum'
import {staffLoaders} from 'app/app-core/store/ngrx/staffs/staffs.selectors'
import {ManageStaffModal} from 'app/modules/modals/manage-staff/manage-staff.service'
import {Observable, map} from 'rxjs'

@Component({
    selector: 'staffs',
    templateUrl: './staffs.component.html',
})
export class StaffsComponent {
    constructor(
        private _store: Store<AppState>,
        private _manageStaffModal: ManageStaffModal,
    ) {}

    @State({selector: StateEnum.STAFFS, type: 'array'})
    readonly staffs$: Observable<Staff[]>

    @State({selector: StateEnum.SCHOOL_YEARS, type: 'array'})
    readonly schoolYears$: Observable<SchoolYear[]>

    readonly loader$ = this._store
        .select(staffLoaders)
        .pipe(map((loader) => loader.getLoader))

    filters: any = {school_year_id: undefined}
    mutableFilters: any = {}

    ngOnInit(): void {
        this._store.dispatch(StoreAction.SCHOOL_YEARS.load.request())
        this._store.dispatch(StoreAction.STAFFS.load.request())
    }

    filter() {
        this.mutableFilters = {...unfreeze(this.filters)}
        this._store.dispatch(
            StoreAction.STAFFS.filter.request({filter: this.mutableFilters}),
        )
    }

    add() {
        this._manageStaffModal.opened$.next(true)
    }

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
