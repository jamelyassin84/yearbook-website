import {Component} from '@angular/core'
import {State} from '@digital_brand_work/decorators/ngrx-state.decorator'
import {unfreeze} from '@digital_brand_work/helpers/helpers'
import {Store} from '@ngrx/store'
import {Course} from 'app/app-core/models/course.model'
import {Department} from 'app/app-core/models/department.model'
import {SchoolYear} from 'app/app-core/models/school-year.model'
import {Section} from 'app/app-core/models/section.model'
import {StoreAction} from 'app/app-core/store/core/action.enum'
import {AppState} from 'app/app-core/store/core/app.state'
import {StateEnum} from 'app/app-core/store/core/state.enum'
import {sectionLoaders} from 'app/app-core/store/ngrx/sections/sections.selectors'
import {ManageSectionModal} from 'app/modules/modals/manage-section/manage-section.service'
import {Observable, map} from 'rxjs'

@Component({
    selector: 'sections',
    templateUrl: './sections.component.html',
})
export class SectionsComponent {
    constructor(
        private _store: Store<AppState>,
        private _manageSectionModal: ManageSectionModal,
    ) {}

    @State({selector: StateEnum.SECTIONS, type: 'array'})
    readonly sections$: Observable<Section[]>

    @State({selector: StateEnum.DEPARTMENTS, type: 'array'})
    readonly departments$: Observable<Department[]>

    @State({selector: StateEnum.SCHOOL_YEARS, type: 'array'})
    readonly schoolYears$: Observable<SchoolYear[]>

    @State({selector: StateEnum.COURSES, type: 'array'})
    readonly courses$: Observable<Course[]>

    readonly loader$ = this._store
        .select(sectionLoaders)
        .pipe(map((loader) => loader.getLoader))

    filters: any = {
        school_year_id: undefined,
        department_id: undefined,
        course_id: undefined,
    }
    mutableFilters: any = {}

    ngOnInit(): void {
        this._store.dispatch(StoreAction.SCHOOL_YEARS.load.request())
        this._store.dispatch(StoreAction.DEPARTMENTS.load.request())
        this._store.dispatch(StoreAction.COURSES.load.request())
        this._store.dispatch(StoreAction.SECTIONS.load.request())
    }

    filter() {
        this.mutableFilters = {...unfreeze(this.filters)}
        this._store.dispatch(
            StoreAction.SECTIONS.filter.request({filter: this.mutableFilters}),
        )
    }

    add() {
        this._manageSectionModal.opened$.next(true)
    }

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
