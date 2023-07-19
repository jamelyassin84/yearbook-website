import {Component} from '@angular/core'
import {State} from '@digital_brand_work/decorators/ngrx-state.decorator'
import {unfreeze} from '@digital_brand_work/helpers/helpers'
import {Store} from '@ngrx/store'
import {SchoolAdmin} from 'app/app-core/models/school-admin.model'
import {SchoolYear} from 'app/app-core/models/school-year.model'
import {StoreAction} from 'app/app-core/store/core/action.enum'
import {AppState} from 'app/app-core/store/core/app.state'
import {StateEnum} from 'app/app-core/store/core/state.enum'
import {schoolAdminLoaders} from 'app/app-core/store/ngrx/school-admins/school-admins.selectors'
import {ManageSchoolAdminModal} from 'app/modules/modals/manage-school-admin/manage-school-admin.service'
import {Observable, map} from 'rxjs'

@Component({
    selector: 'school-admins',
    templateUrl: './school-admins.component.html',
})
export class SchoolAdminsComponent {
    constructor(
        private _store: Store<AppState>,
        private _manageSchoolAdminModal: ManageSchoolAdminModal,
    ) {}

    @State({selector: StateEnum.SCHOOL_ADMINS, type: 'array'})
    readonly schoolAdmins$: Observable<SchoolAdmin[]>

    @State({selector: StateEnum.SCHOOL_YEARS, type: 'array'})
    readonly schoolYears$: Observable<SchoolYear[]>

    readonly loader$ = this._store
        .select(schoolAdminLoaders)
        .pipe(map((loader) => loader.getLoader))

    filters: any = {school_year_id: undefined}
    mutableFilters: any = {}

    ngOnInit(): void {
        this._store.dispatch(StoreAction.SCHOOL_ADMINS.load.request())
        this._store.dispatch(StoreAction.SCHOOL_YEARS.load.request())
    }

    filter() {
        this.mutableFilters = {...unfreeze(this.filters)}
        this._store.dispatch(
            StoreAction.SCHOOL_ADMINS.filter.request({
                filter: this.mutableFilters,
            }),
        )
    }

    add() {
        this._manageSchoolAdminModal.opened$.next(true)
    }

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
