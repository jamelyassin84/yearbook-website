import {Component} from '@angular/core'
import {State} from '@digital_brand_work/decorators/ngrx-state.decorator'
import {Store} from '@ngrx/store'
import {Course} from 'app/app-core/models/course.model'
import {SchoolYear} from 'app/app-core/models/school-year.model'
import {StoreAction} from 'app/app-core/store/core/action.enum'
import {AppState} from 'app/app-core/store/core/app.state'
import {StateEnum} from 'app/app-core/store/core/state.enum'
import {schoolYearLoaders} from 'app/app-core/store/ngrx/school-years/school-years.selectors'
import {ManageYearbookModal} from 'app/modules/modals/manage-yearbook/manage-yearbook.service'
import {Observable, map} from 'rxjs'

@Component({
    selector: 'yearbook',
    templateUrl: './yearbook.component.html',
})
export class YearbookComponent {
    constructor(
        private _store: Store<AppState>,
        private _manageYearbookModal: ManageYearbookModal,
    ) {}

    @State({selector: StateEnum.SCHOOL_YEARS, type: 'array'})
    readonly schoolYears$: Observable<SchoolYear[]>

    @State({selector: StateEnum.COURSES, type: 'array'})
    readonly courses$: Observable<Course[]>

    readonly loader$ = this._store
        .select(schoolYearLoaders)
        .pipe(map((loader) => loader.getLoader))

    ngOnInit(): void {
        this._store.dispatch(StoreAction.SCHOOL_YEARS.load.request())
        this._store.dispatch(StoreAction.COURSES.load.request())
        this._store.dispatch(StoreAction.DEPARTMENTS.load.request())
    }

    viewYearbook(schoolYear: SchoolYear) {
        this._manageYearbookModal.schoolYear$.next(schoolYear)
        this._manageYearbookModal.opened$.next(true)
    }
}
