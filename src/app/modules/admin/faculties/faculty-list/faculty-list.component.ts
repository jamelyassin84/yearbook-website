import {Component, Input} from '@angular/core'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'
import {Store} from '@ngrx/store'
import {Faculty} from 'app/app-core/models/faculty.model'
import {StoreAction} from 'app/app-core/store/core/action.enum'
import {AppState} from 'app/app-core/store/core/app.state'
import {ManageFacultyModal} from 'app/modules/modals/manage-faculty/manage-faculty.service'

@Component({
    selector: 'faculty-list',
    templateUrl: './faculty-list.component.html',
    animations: [...dbwAnimations],
})
export class FacultyListComponent {
    constructor(
        private _store: Store<AppState>,
        private _manageFacultyModal: ManageFacultyModal,
    ) {}

    @Input({required: true})
    faculties: Faculty[]

    edit(faculty: Faculty): void {
        this._manageFacultyModal.faculty$.next(faculty)
        this._manageFacultyModal.opened$.next(true)
    }

    remove(faculty: Faculty): void {
        const confirmed = confirm(
            `Are you sure you want to remove ${faculty.information.first_name}`,
        )

        if (confirmed) {
            this._store.dispatch(
                StoreAction.FACULTIES.remove.request({id: faculty.id}),
            )
        }
    }

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
