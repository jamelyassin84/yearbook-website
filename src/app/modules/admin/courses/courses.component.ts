import {Component} from '@angular/core'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'
import {State} from '@digital_brand_work/decorators/ngrx-state.decorator'
import {unfreeze} from '@digital_brand_work/helpers/helpers'
import {Store} from '@ngrx/store'
import {Course} from 'app/app-core/models/course.model'
import {Department} from 'app/app-core/models/department.model'
import {SchoolYear} from 'app/app-core/models/school-year.model'
import {StoreAction} from 'app/app-core/store/core/action.enum'
import {AppState} from 'app/app-core/store/core/app.state'
import {StateEnum} from 'app/app-core/store/core/state.enum'
import {courseLoaders} from 'app/app-core/store/ngrx/courses/courses.selectors'
import {ManageCourseModal} from 'app/modules/modals/manage-course/manage-course.service'
import {Observable, map} from 'rxjs'

@Component({
    selector: 'courses',
    templateUrl: './courses.component.html',
    animations: [...dbwAnimations],
})
export class CoursesComponent {
    constructor(
        private _store: Store<AppState>,
        private _manageCourseModal: ManageCourseModal,
    ) {}

    @State({selector: StateEnum.COURSES, type: 'array'})
    readonly courses$: Observable<Course[]>

    @State({selector: StateEnum.SCHOOL_YEARS, type: 'array'})
    readonly schoolYears$: Observable<SchoolYear[]>

    @State({selector: StateEnum.DEPARTMENTS, type: 'array'})
    readonly departments$: Observable<Department[]>

    readonly loader$ = this._store
        .select(courseLoaders)
        .pipe(map((loader) => loader.getLoader))

    filters: any = {school_year_id: undefined, department_id: undefined}
    mutableFilters: any = {}

    ngOnInit(): void {
        this._store.dispatch(StoreAction.SCHOOL_YEARS.load.request())
        this._store.dispatch(StoreAction.DEPARTMENTS.load.request())
        this._store.dispatch(StoreAction.COURSES.load.request())
    }

    filter() {
        this.mutableFilters = {...unfreeze(this.filters)}

        this._store.dispatch(
            StoreAction.COURSES.filter.request({filter: this.mutableFilters}),
        )
    }

    add() {
        this._manageCourseModal.opened$.next(true)
    }

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
