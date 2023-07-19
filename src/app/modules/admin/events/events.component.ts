import {Component} from '@angular/core'
import {State} from '@digital_brand_work/decorators/ngrx-state.decorator'
import {unfreeze} from '@digital_brand_work/helpers/helpers'
import {Store} from '@ngrx/store'
import {SchoolEvent} from 'app/app-core/models/event.model'
import {SchoolYear} from 'app/app-core/models/school-year.model'
import {StoreAction} from 'app/app-core/store/core/action.enum'
import {AppState} from 'app/app-core/store/core/app.state'
import {StateEnum} from 'app/app-core/store/core/state.enum'
import {schoolEventLoaders} from 'app/app-core/store/ngrx/events/events.selectors'
import {ManageSchoolEventModal} from 'app/modules/modals/manage-event/manage-event.service'
import {Observable, map} from 'rxjs'

@Component({
    selector: 'events',
    templateUrl: './events.component.html',
})
export class EventsComponent {
    constructor(
        private _store: Store<AppState>,
        private _manageSchoolEventModal: ManageSchoolEventModal,
    ) {}

    @State({selector: StateEnum.EVENTS, type: 'array'})
    readonly schoolEvents$: Observable<SchoolEvent[]>

    @State({selector: StateEnum.SCHOOL_YEARS, type: 'array'})
    readonly schoolYears$: Observable<SchoolYear[]>

    readonly loader$ = this._store
        .select(schoolEventLoaders)
        .pipe(map((loader) => loader.getLoader))

    filters: any = {school_year_id: undefined}
    mutableFilters: any = {}

    ngOnInit(): void {
        this._store.dispatch(StoreAction.SCHOOL_YEARS.load.request())
        this._store.dispatch(StoreAction.EVENTS.load.request())
    }

    filter() {
        this.mutableFilters = {...unfreeze(this.filters)}
        this._store.dispatch(
            StoreAction.EVENTS.filter.request({filter: this.mutableFilters}),
        )
    }

    add() {
        this._manageSchoolEventModal.opened$.next(true)
    }

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
