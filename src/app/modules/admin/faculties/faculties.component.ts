import {Component} from '@angular/core'
import {State} from '@digital_brand_work/decorators/ngrx-state.decorator'
import {unfreeze} from '@digital_brand_work/helpers/helpers'
import {Store} from '@ngrx/store'
import {Department} from 'app/app-core/models/department.model'
import {Faculty} from 'app/app-core/models/faculty.model'
import {SchoolYear} from 'app/app-core/models/school-year.model'
import {StoreAction} from 'app/app-core/store/core/action.enum'
import {AppState} from 'app/app-core/store/core/app.state'
import {StateEnum} from 'app/app-core/store/core/state.enum'
import {facultyLoaders} from 'app/app-core/store/ngrx/faculties/faculties.selectors'
import {ManageFacultyModal} from 'app/modules/modals/manage-faculty/manage-faculty.service'
import {Observable, map} from 'rxjs'

@Component({
    selector: 'faculties',
    templateUrl: './faculties.component.html',
})
export class FacultiesComponent {
    constructor(
        private _store: Store<AppState>,
        private _manageFacultyModal: ManageFacultyModal,
    ) {}

    @State({selector: StateEnum.FACULTIES, type: 'array'})
    readonly faculties$: Observable<Faculty[]>

    @State({selector: StateEnum.SCHOOL_YEARS, type: 'array'})
    readonly schoolYears$: Observable<SchoolYear[]>

    @State({selector: StateEnum.DEPARTMENTS, type: 'array'})
    readonly departments$: Observable<Department[]>

    readonly loader$ = this._store
        .select(facultyLoaders)
        .pipe(map((loader) => loader.getLoader))

    filters: any = {school_year_id: undefined, department_id: undefined}
    mutableFilters: any = {}

    ngOnInit(): void {
        this._store.dispatch(StoreAction.DEPARTMENTS.load.request())
        this._store.dispatch(StoreAction.SCHOOL_YEARS.load.request())
        this._store.dispatch(StoreAction.FACULTIES.load.request())
    }

    filter() {
        this.mutableFilters = {...unfreeze(this.filters)}
        this._store.dispatch(
            StoreAction.FACULTIES.filter.request({filter: this.mutableFilters}),
        )
    }

    add() {
        this._manageFacultyModal.opened$.next(true)
    }

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
