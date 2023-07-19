import {Component, Input} from '@angular/core'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'
import {Store} from '@ngrx/store'
import {SchoolAdmin} from 'app/app-core/models/school-admin.model'
import {StoreAction} from 'app/app-core/store/core/action.enum'
import {AppState} from 'app/app-core/store/core/app.state'
import {ManageSchoolAdminModal} from 'app/modules/modals/manage-school-admin/manage-school-admin.service'

@Component({
    selector: 'school-admin-list',
    templateUrl: './school-admin-list.component.html',
    animations: [...dbwAnimations],
})
export class SchoolAdminListComponent {
    constructor(
        private _store: Store<AppState>,
        private _manageSchoolAdminModal: ManageSchoolAdminModal,
    ) {}

    @Input({required: true})
    schoolAdmins: SchoolAdmin[]

    edit(schoolAdmin: SchoolAdmin): void {
        this._manageSchoolAdminModal.schoolAdmin$.next(schoolAdmin)
        this._manageSchoolAdminModal.opened$.next(true)
    }

    remove(schoolAdmin: SchoolAdmin): void {
        const confirmed = confirm(
            `Are you sure you want to remove ${schoolAdmin.information.first_name}`,
        )

        if (confirmed) {
            this._store.dispatch(
                StoreAction.SCHOOL_ADMINS.remove.request({id: schoolAdmin.id}),
            )
        }
    }

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
