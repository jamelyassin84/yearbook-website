import {Component, Input} from '@angular/core'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'
import {Store} from '@ngrx/store'
import {Department} from 'app/app-core/models/department.model'
import {StoreAction} from 'app/app-core/store/core/action.enum'
import {AppState} from 'app/app-core/store/core/app.state'
import {ManageDepartmentModal} from 'app/modules/modals/manage-department/manage-department.service'

@Component({
    selector: 'department-list',
    templateUrl: './department-list.component.html',
    animations: [...dbwAnimations],
})
export class DepartmentListComponent {
    constructor(
        private _store: Store<AppState>,
        private _manageDepartmentModal: ManageDepartmentModal,
    ) {}

    @Input({required: true})
    departments: Department[]

    edit(department: Department): void {
        this._manageDepartmentModal.department$.next(department)
        this._manageDepartmentModal.opened$.next(true)
    }

    remove(department: Department): void {
        const confirmed = confirm(
            `Are you sure you want to remove ${department.name}`,
        )

        if (confirmed) {
            this._store.dispatch(
                StoreAction.DEPARTMENTS.remove.request({id: department.id}),
            )
        }
    }

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
