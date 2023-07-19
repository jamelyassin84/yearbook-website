import {Component, HostListener} from '@angular/core'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'
import {Store} from '@ngrx/store'
import {AppState} from 'app/app-core/store/core/app.state'
import {ManageAdminModal} from './manage-admin.service'
import {take} from 'rxjs'
import {AdminForm} from 'app/app-core/store/ngrx/admins/admins.form'

@Component({
    selector: 'manage-admin',
    templateUrl: './manage-admin.component.html',
    animations: [...dbwAnimations],
})
export class ManageAdminComponent {
    constructor(
        private _adminForm: AdminForm,
        private _store: Store<AppState>,
        private _manageAdminModal: ManageAdminModal,
    ) {}

    @HostListener('document:keydown.escape')
    onEscapePress() {
        this.opened$.next(false)
    }

    readonly opened$ = this._manageAdminModal.opened$

    readonly admin$ = this._manageAdminModal.admin$

    form = this._adminForm.get()

    ngOnInit(): void {
        this.admin$.pipe(take(2)).subscribe((admin) => {
            if (admin) {
                this._adminForm.set(admin)
            }
        })
    }

    save() {
        if (this.form.invalid) {
            return
        }

        // this._store.dispatch()
    }
}
