import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {switchMap, map, tap} from 'rxjs/operators'
import {StoreAction} from '../../core/action.enum'
import {AlertService} from '@digital_brand_work/services/alert.service'
import {ManageSchoolAdminModal} from 'app/modules/modals/manage-school-admin/manage-school-admin.service'
import {SchoolAdminService} from './school-admins.service'
import {AppState} from '../../core/app.state'
import {Store} from '@ngrx/store'

@Injectable({
    providedIn: 'root',
})
export class SchoolAdminEffects {
    constructor(
        private _actions$: Actions,
        private _store: Store<AppState>,
        private _alertService: AlertService,
        private _manageSchoolAdminModal: ManageSchoolAdminModal,
        private _schoolAdminService: SchoolAdminService,
    ) {}

    get$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.SCHOOL_ADMINS.load.request),
            switchMap(() =>
                this._schoolAdminService.get().pipe(
                    map((response) =>
                        StoreAction.SCHOOL_ADMINS.load.onSuccess({
                            schoolAdmins: response,
                        }),
                    ),
                ),
            ),
        ),
    )

    yearbook$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.SCHOOL_ADMINS.yearbook.request),
            switchMap((action) =>
                this._schoolAdminService.yearbook(action.filter).pipe(
                    tap((response) => {
                        this._store.dispatch(
                            StoreAction.SCHOOL_ADMINS.yearbook.setLinks({
                                links: response.links,
                            }),
                        )
                    }),
                    map((response) => {
                        return StoreAction.SCHOOL_ADMINS.load.onSuccess({
                            schoolAdmins: response.data,
                        })
                    }),
                ),
            ),
        ),
    )

    filter$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.SCHOOL_ADMINS.filter.request),
            switchMap((action) =>
                this._schoolAdminService.filter(action.filter).pipe(
                    map((response) =>
                        StoreAction.SCHOOL_ADMINS.load.onSuccess({
                            schoolAdmins: response,
                        }),
                    ),
                ),
            ),
        ),
    )

    show$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.SCHOOL_ADMINS.show.request),
            switchMap((action) =>
                this._schoolAdminService.show(action.id).pipe(
                    map((response) =>
                        StoreAction.SCHOOL_ADMINS.show.onSuccess({
                            schoolAdmin: response,
                        }),
                    ),
                ),
            ),
        ),
    )

    add$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.SCHOOL_ADMINS.add.request),
            switchMap((action) =>
                this._schoolAdminService.add(action.schoolAdmin).pipe(
                    tap(() => {
                        this._manageSchoolAdminModal.opened$.next(false)

                        this._alertService.addAlert({
                            type: 'success',
                            title: 'Successfully Added',
                            message: 'List has been successfully added.',
                        })
                    }),
                    map((response) =>
                        StoreAction.SCHOOL_ADMINS.add.onSuccess({
                            schoolAdmin: response,
                        }),
                    ),
                ),
            ),
        ),
    )

    update$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.SCHOOL_ADMINS.update.request),
            switchMap((action) =>
                this._schoolAdminService.update(action.schoolAdmin).pipe(
                    tap(() => {
                        this._manageSchoolAdminModal.opened$.next(false)

                        this._alertService.addAlert({
                            type: 'success',
                            title: 'Successfully Updated',
                            message: 'List has been successfully updated.',
                        })
                    }),
                    map((response) =>
                        StoreAction.SCHOOL_ADMINS.update.onSuccess({
                            schoolAdmin: response,
                        }),
                    ),
                ),
            ),
        ),
    )

    remove$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.SCHOOL_ADMINS.remove.request),
            switchMap((action) =>
                this._schoolAdminService.remove(action.id).pipe(
                    map(() =>
                        StoreAction.SCHOOL_ADMINS.remove.onSuccess({
                            id: action.id,
                        }),
                    ),
                ),
            ),
        ),
    )
}
