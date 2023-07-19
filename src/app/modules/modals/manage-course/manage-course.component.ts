import {Component, HostListener} from '@angular/core'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'
import {Store} from '@ngrx/store'
import {AppState} from 'app/app-core/store/core/app.state'
import {ManageCourseModal} from './manage-course.service'
import {CourseForm} from 'app/app-core/store/ngrx/courses/courses.form'
import {Observable, map, take} from 'rxjs'
import {courseLoaders} from 'app/app-core/store/ngrx/courses/courses.selectors'
import {StoreAction} from 'app/app-core/store/core/action.enum'
import {StateEnum} from 'app/app-core/store/core/state.enum'
import {State} from '@digital_brand_work/decorators/ngrx-state.decorator'
import {Department} from 'app/app-core/models/department.model'
import {SchoolYear} from 'app/app-core/models/school-year.model'

@Component({
    selector: 'manage-course',
    templateUrl: './manage-course.component.html',
    animations: [...dbwAnimations],
})
export class ManageCourseComponent {
    constructor(
        private _courseForm: CourseForm,
        private _store: Store<AppState>,
        private _manageCourseModal: ManageCourseModal,
    ) {}

    @HostListener('document:keydown.escape')
    onEscapePress() {
        this.opened$.next(false)
    }

    @State({selector: StateEnum.DEPARTMENTS, type: 'array'})
    readonly departments$: Observable<Department[]>

    @State({selector: StateEnum.SCHOOL_YEARS, type: 'array'})
    readonly schoolYears$: Observable<SchoolYear[]>

    readonly loader$ = this._store
        .select(courseLoaders)
        .pipe(map((loader) => loader.createLoader))

    readonly opened$ = this._manageCourseModal.opened$

    readonly course$ = this._manageCourseModal.course$

    form = this._courseForm.get()

    ngOnInit(): void {
        this.course$.pipe(take(2)).subscribe((course) => {
            if (course) {
                this.form = this._courseForm.set(course)
            }
        })
    }

    ngOnDestroy(): void {
        this._manageCourseModal.course$.next(null)
    }

    save() {
        if (this.form.invalid) {
            return
        }

        this.course$.pipe(take(1)).subscribe((course) => {
            if (course) {
                this._store.dispatch(
                    StoreAction.COURSES.update.request({
                        course: {
                            ...this.form.value,
                            id: course.id,
                        } as any,
                    }),
                )

                return
            }

            this._store.dispatch(
                StoreAction.COURSES.add.request({
                    course: this.form.value as any,
                }),
            )
        })
    }

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
