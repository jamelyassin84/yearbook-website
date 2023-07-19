import {Component} from '@angular/core'
import {State} from '@digital_brand_work/decorators/ngrx-state.decorator'
import {Store} from '@ngrx/store'
import {SchoolYear} from 'app/app-core/models/school-year.model'
import {StoreAction} from 'app/app-core/store/core/action.enum'
import {AppState} from 'app/app-core/store/core/app.state'
import {StateEnum} from 'app/app-core/store/core/state.enum'
import {schoolYearLoaders} from 'app/app-core/store/ngrx/school-years/school-years.selectors'
import {ManageSchoolEventModal} from 'app/modules/modals/manage-event/manage-event.service'
import {ManageSchoolYearModal} from 'app/modules/modals/manage-school-year/manage-school-year.service'
import {Observable, map} from 'rxjs'

@Component({
    selector: 'school-years',
    templateUrl: './school-years.component.html',
})
export class SchoolYearsComponent {
    constructor(
        private _store: Store<AppState>,
        private _manageSchoolYearModal: ManageSchoolYearModal,
    ) {}

    @State({selector: StateEnum.SCHOOL_YEARS, type: 'array'})
    readonly schoolYears$: Observable<SchoolYear[]>

    readonly loader$ = this._store
        .select(schoolYearLoaders)
        .pipe(map((loader) => loader.getLoader))

    ngOnInit(): void {
        this._store.dispatch(StoreAction.SCHOOL_YEARS.load.request())
    }

    add() {
        this._manageSchoolYearModal.opened$.next(true)
    }
}
