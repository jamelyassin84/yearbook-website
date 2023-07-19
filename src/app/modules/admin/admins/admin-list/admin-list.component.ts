import {Component, Input} from '@angular/core'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'
import {Store} from '@ngrx/store'
import {Admin} from 'app/app-core/models/admin.model'
import {StoreAction} from 'app/app-core/store/core/action.enum'
import {AppState} from 'app/app-core/store/core/app.state'
import {ManageAdminModal} from 'app/modules/modals/manage-admin/manage-admin.service'

@Component({
    selector: 'admin-list',
    templateUrl: './admin-list.component.html',
    animations: [...dbwAnimations],
})
export class AdminListComponent {
    constructor(
        private _store: Store<AppState>,
        private _manageAdminModal: ManageAdminModal,
    ) {}

    @Input({required: true})
    admins: Admin[]

    edit(admin: Admin): void {
        this._manageAdminModal.admin$.next(admin)
        this._manageAdminModal.opened$.next(true)
    }

    remove(admin: Admin): void {
        const confirmed = confirm(
            `Are you sure you want to remove ${admin.name}`,
        )

        if (confirmed) {
            this._store.dispatch(
                StoreAction.ADMIN.remove.request({id: admin.id}),
            )
        }
    }

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
