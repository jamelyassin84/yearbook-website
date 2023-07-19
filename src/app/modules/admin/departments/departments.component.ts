import {Component, SimpleChanges} from '@angular/core'
import {State} from '@digital_brand_work/decorators/ngrx-state.decorator'
import {unfreeze} from '@digital_brand_work/helpers/helpers'
import {Store} from '@ngrx/store'
import {Department} from 'app/app-core/models/department.model'
import {SchoolYear} from 'app/app-core/models/school-year.model'
import {StoreAction} from 'app/app-core/store/core/action.enum'
import {AppState} from 'app/app-core/store/core/app.state'
import {StateEnum} from 'app/app-core/store/core/state.enum'
import {departmentLoaders} from 'app/app-core/store/ngrx/departments/departments.selectors'
import {ManageDepartmentModal} from 'app/modules/modals/manage-department/manage-department.service'
import {Observable, map} from 'rxjs'

@Component({
    selector: 'departments',
    templateUrl: './departments.component.html',
})
export class DepartmentsComponent {
    constructor(
        private _store: Store<AppState>,
        private _manageDepartmentModal: ManageDepartmentModal,
    ) {}

    @State({selector: StateEnum.DEPARTMENTS, type: 'array'})
    readonly departments$: Observable<Department[]>

    @State({selector: StateEnum.SCHOOL_YEARS, type: 'array'})
    readonly schoolYears$: Observable<SchoolYear[]>

    readonly loader$ = this._store
        .select(departmentLoaders)
        .pipe(map((loader) => loader.getLoader))

    filters: any = {school_year_id: undefined}
    mutableFilters: any = {}

    ngOnInit(): void {
        this._store.dispatch(StoreAction.SCHOOL_YEARS.load.request())
        this._store.dispatch(StoreAction.DEPARTMENTS.load.request())
    }

    filter() {
        this.mutableFilters = {...unfreeze(this.filters)}
        this._store.dispatch(
            StoreAction.DEPARTMENTS.filter.request({
                filter: this.mutableFilters,
            }),
        )
    }

    add() {
        this._manageDepartmentModal.opened$.next(true)
    }

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
