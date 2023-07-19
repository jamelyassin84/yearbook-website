import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {switchMap, map, tap} from 'rxjs/operators'
import {StoreAction} from '../../core/action.enum'
import {AlertService} from '@digital_brand_work/services/alert.service'
import {ManageStaffModal} from 'app/modules/modals/manage-staff/manage-staff.service'
import {StaffService} from './staffs.service'
import {AppState} from '../../core/app.state'
import {Store} from '@ngrx/store'

@Injectable({
    providedIn: 'root',
})
export class StaffEffects {
    constructor(
        private _actions$: Actions,
        private _store: Store<AppState>,
        private _alertService: AlertService,
        private _manageStaffModal: ManageStaffModal,
        private _staffService: StaffService,
    ) {}

    get$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.STAFFS.load.request),
            switchMap(() =>
                this._staffService.get().pipe(
                    map((response) =>
                        StoreAction.STAFFS.load.onSuccess({
                            staffs: response,
                        }),
                    ),
                ),
            ),
        ),
    )

    yearbook$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.STAFFS.yearbook.request),
            switchMap((action) =>
                this._staffService.yearbook(action.filter).pipe(
                    tap((response) => {
                        this._store.dispatch(
                            StoreAction.STAFFS.yearbook.setLinks({
                                links: response.links,
                            }),
                        )
                    }),
                    map((response) =>
                        StoreAction.STAFFS.load.onSuccess({
                            staffs: response.data,
                        }),
                    ),
                ),
            ),
        ),
    )

    filter$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.STAFFS.filter.request),
            switchMap((action) =>
                this._staffService.filter(action.filter).pipe(
                    map((response) =>
                        StoreAction.STAFFS.load.onSuccess({
                            staffs: response,
                        }),
                    ),
                ),
            ),
        ),
    )

    show$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.STAFFS.show.request),
            switchMap((action) =>
                this._staffService.show(action.id).pipe(
                    map((response) =>
                        StoreAction.STAFFS.show.onSuccess({
                            staff: response,
                        }),
                    ),
                ),
            ),
        ),
    )

    add$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.STAFFS.add.request),
            switchMap((action) =>
                this._staffService.add(action.staff).pipe(
                    tap(() => {
                        this._manageStaffModal.opened$.next(false)

                        this._alertService.addAlert({
                            type: 'success',
                            title: 'Successfully Added',
                            message: 'List has been successfully added.',
                        })
                    }),
                    map((response) =>
                        StoreAction.STAFFS.add.onSuccess({
                            staff: response,
                        }),
                    ),
                ),
            ),
        ),
    )

    update$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.STAFFS.update.request),
            switchMap((action) =>
                this._staffService.update(action.staff).pipe(
                    tap(() => {
                        this._manageStaffModal.opened$.next(false)

                        this._alertService.addAlert({
                            type: 'success',
                            title: 'Successfully Updated',
                            message: 'List has been successfully updated.',
                        })
                    }),
                    map((response) =>
                        StoreAction.STAFFS.update.onSuccess({
                            staff: response,
                        }),
                    ),
                ),
            ),
        ),
    )

    remove$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.STAFFS.remove.request),
            switchMap((action) =>
                this._staffService.remove(action.id).pipe(
                    map(() =>
                        StoreAction.STAFFS.remove.onSuccess({
                            id: action.id,
                        }),
                    ),
                ),
            ),
        ),
    )
}
