import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {switchMap, map, tap} from 'rxjs/operators'
import {StoreAction} from '../../core/action.enum'
import {AlertService} from '@digital_brand_work/services/alert.service'

import {ManageDepartmentModal} from 'app/modules/modals/manage-department/manage-department.service'
import {DepartmentService} from './departments.service'

@Injectable({
    providedIn: 'root',
})
export class DepartmentEffects {
    constructor(
        private _actions$: Actions,
        private _alertService: AlertService,
        private _manageDepartmentModal: ManageDepartmentModal,
        private _departmentService: DepartmentService,
    ) {}

    get$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.DEPARTMENTS.load.request),
            switchMap(() =>
                this._departmentService.get().pipe(
                    map((response) =>
                        StoreAction.DEPARTMENTS.load.onSuccess({
                            departments: response,
                        }),
                    ),
                ),
            ),
        ),
    )

    filter$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.DEPARTMENTS.filter.request),
            switchMap((action) =>
                this._departmentService.filter(action.filter).pipe(
                    map((response) =>
                        StoreAction.DEPARTMENTS.load.onSuccess({
                            departments: response,
                        }),
                    ),
                ),
            ),
        ),
    )

    show$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.DEPARTMENTS.show.request),
            switchMap((action) =>
                this._departmentService.show(action.id).pipe(
                    map((response) =>
                        StoreAction.DEPARTMENTS.show.onSuccess({
                            department: response,
                        }),
                    ),
                ),
            ),
        ),
    )

    add$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.DEPARTMENTS.add.request),
            switchMap((action) =>
                this._departmentService.add(action.department).pipe(
                    tap(() => {
                        this._manageDepartmentModal.opened$.next(false)

                        this._alertService.addAlert({
                            type: 'success',
                            title: 'Successfully Added',
                            message: 'List has been successfully added.',
                        })
                    }),
                    map((response) =>
                        StoreAction.DEPARTMENTS.add.onSuccess({
                            department: response,
                        }),
                    ),
                ),
            ),
        ),
    )

    update$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.DEPARTMENTS.update.request),
            switchMap((action) =>
                this._departmentService.update(action.department).pipe(
                    tap(() => {
                        this._manageDepartmentModal.opened$.next(false)

                        this._alertService.addAlert({
                            type: 'success',
                            title: 'Successfully Updated',
                            message: 'List has been successfully updated.',
                        })
                    }),
                    map((response) =>
                        StoreAction.DEPARTMENTS.update.onSuccess({
                            department: response,
                        }),
                    ),
                ),
            ),
        ),
    )

    remove$ = createEffect(() =>
        this._actions$.pipe(
            ofType(StoreAction.DEPARTMENTS.remove.request),
            switchMap((action) =>
                this._departmentService.remove(action.id).pipe(
                    map(() =>
                        StoreAction.DEPARTMENTS.remove.onSuccess({
                            id: action.id,
                        }),
                    ),
                ),
            ),
        ),
    )
}
