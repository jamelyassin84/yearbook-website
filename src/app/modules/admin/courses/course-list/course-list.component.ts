import {Component, Input} from '@angular/core'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'
import {Store} from '@ngrx/store'
import {Course} from 'app/app-core/models/course.model'
import {StoreAction} from 'app/app-core/store/core/action.enum'
import {AppState} from 'app/app-core/store/core/app.state'
import {ManageCourseModal} from 'app/modules/modals/manage-course/manage-course.service'

@Component({
    selector: 'course-list',
    templateUrl: './course-list.component.html',
    animations: [...dbwAnimations],
})
export class CourseListComponent {
    constructor(
        private _store: Store<AppState>,
        private _manageCourseModal: ManageCourseModal,
    ) {}

    @Input({required: true})
    courses: Course[]

    edit(course: Course): void {
        this._manageCourseModal.course$.next(course)
        this._manageCourseModal.opened$.next(true)
    }

    remove(course: Course): void {
        const confirmed = confirm(
            `Are you sure you want to remove ${course.name}`,
        )

        if (confirmed) {
            this._store.dispatch(
                StoreAction.COURSES.remove.request({id: course.id}),
            )
        }
    }

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
