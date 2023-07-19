import {Component, Input} from '@angular/core'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'
import {Store} from '@ngrx/store'
import {Staff} from 'app/app-core/models/staff.model'
import {StoreAction} from 'app/app-core/store/core/action.enum'
import {AppState} from 'app/app-core/store/core/app.state'
import {ManageStaffModal} from 'app/modules/modals/manage-staff/manage-staff.service'

@Component({
    selector: 'staff-list',
    templateUrl: './staff-list.component.html',
    animations: [...dbwAnimations],
})
export class StaffListComponent {
    constructor(
        private _store: Store<AppState>,
        private _manageStaffModal: ManageStaffModal,
    ) {}

    @Input({required: true})
    staffs: Staff[]

    edit(staff: Staff): void {
        this._manageStaffModal.staff$.next(staff)
        this._manageStaffModal.opened$.next(true)
    }

    remove(staff: Staff): void {
        const confirmed = confirm(
            `Are you sure you want to remove ${staff.information.first_name}`,
        )

        if (confirmed) {
            this._store.dispatch(
                StoreAction.STAFFS.remove.request({id: staff.id}),
            )
        }
    }

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
