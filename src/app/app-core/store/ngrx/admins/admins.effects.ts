import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {switchMap, map, tap} from 'rxjs/operators'
import {StoreAction} from '../../core/action.enum'
import {AlertService} from '@digital_brand_work/services/alert.service'
import {ManageAdminModal} from 'app/modules/modals/manage-admin/manage-admin.service'
import {AdminService} from './admins.service'

@Injectable({
    providedIn: 'root',
})
export class AdminEffects {
    constructor(
        private _actions$: Actions,
        private _alertService: AlertService,
        private _manageAdminModal: ManageAdminModal,
        private _adminService: AdminService,
    ) {}

    get$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.ADMIN.load.request),
            switchMap(() =>
                this._adminService.get().pipe(
                    map((response) =>
                        StoreAction.ADMIN.load.onSuccess({
                            admins: response,
                        }),
                    ),
                ),
            ),
        ),
    )

    show$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.ADMIN.show.request),
            switchMap((action) =>
                this._adminService.show(action.id).pipe(
                    map((response) =>
                        StoreAction.ADMIN.show.onSuccess({
                            admin: response,
                        }),
                    ),
                ),
            ),
        ),
    )

    add$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.ADMIN.add.request),
            switchMap((action) =>
                this._adminService.add(action.admin).pipe(
                    tap(() => {
                        this._manageAdminModal.opened$.next(false)

                        this._alertService.addAlert({
                            type: 'success',
                            title: 'Successfully Added',
                            message: 'List has been successfully added.',
                        })
                    }),
                    map((response) =>
                        StoreAction.ADMIN.add.onSuccess({
                            admin: response,
                        }),
                    ),
                ),
            ),
        ),
    )

    update$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.ADMIN.update.request),
            switchMap((action) =>
                this._adminService.update(action.admin).pipe(
                    tap(() => {
                        this._manageAdminModal.opened$.next(false)

                        this._alertService.addAlert({
                            type: 'success',
                            title: 'Successfully Updated',
                            message: 'List has been successfully updated.',
                        })
                    }),
                    map((response) =>
                        StoreAction.ADMIN.update.onSuccess({
                            admin: response,
                        }),
                    ),
                ),
            ),
        ),
    )

    remove$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.ADMIN.remove.request),
            switchMap((action) =>
                this._adminService.remove(action.id).pipe(
                    map(() =>
                        StoreAction.ADMIN.remove.onSuccess({
                            id: action.id,
                        }),
                    ),
                ),
            ),
        ),
    )
}
