import {Student} from 'app/app-core/models/student.model'
import {Component, Input} from '@angular/core'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'
import {Store} from '@ngrx/store'
import {AppState} from 'app/app-core/store/core/app.state'
import {ManageStudentModal} from 'app/modules/modals/manage-student/manage-student.service'
import {StoreAction} from 'app/app-core/store/core/action.enum'

@Component({
    selector: 'student-list',
    templateUrl: './student-list.component.html',
    animations: [...dbwAnimations],
})
export class StudentListComponent {
    constructor(
        private _store: Store<AppState>,
        private _manageStudentModal: ManageStudentModal,
    ) {}

    @Input({required: true})
    students: Student[]

    edit(student: Student): void {
        this._manageStudentModal.student$.next(student)
        this._manageStudentModal.opened$.next(true)
    }

    remove(student: Student): void {
        const confirmed = confirm(
            `Are you sure you want to remove ${student.information.first_name}`,
        )

        if (confirmed) {
            this._store.dispatch(
                StoreAction.STUDENTS.remove.request({id: student.id}),
            )
        }
    }

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
